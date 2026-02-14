import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

// Use service role key for elevated privileges
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export async function POST(request: NextRequest) {
    try {
        const { email, password, regNumber, fullName } = await request.json();

        if (!email || !password || !regNumber || !fullName) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Create auth user
        const { data: authData, error: authError } = await supabaseAdmin.auth.signUp({
            email,
            password,
        });

        if (authError) {
            const errorMessage = authError.message || 'Failed to create account';

            // Provide helpful messages for common errors
            if (errorMessage.includes('rate limit')) {
                return NextResponse.json(
                    {
                        error: 'Too many sign-up attempts. Please wait 1 hour or try a different email address. If issue persists, disable "Confirm email" in Supabase Authentication settings.'
                    },
                    { status: 429 }
                );
            }

            if (errorMessage.includes('already registered')) {
                return NextResponse.json(
                    { error: 'Email already registered. Please try logging in or use a different email.' },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { error: errorMessage },
                { status: 400 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: 'User creation failed' },
                { status: 400 }
            );
        }

        // Create user profile with admin client
        const { data: userData, error: userError } = await supabaseAdmin
            .from('users')
            .insert([
                {
                    id: authData.user.id,
                    email,
                    reg_number: regNumber,
                    full_name: fullName,
                },
            ])
            .select();

        if (userError) {
            // Delete the auth user if profile creation fails
            await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
            return NextResponse.json(
                { error: userError.message || 'Failed to create user profile' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: true, user: userData, message: 'Account created successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
