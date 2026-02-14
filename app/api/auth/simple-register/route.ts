import { supabase } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    console.log('=== REGISTRATION ENDPOINT CALLED ===');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    try {
        const body = await request.json();
        const { username, regNumber, fullName, password, confirmPassword } = body;

        console.log('📝 Request body:', {
            username,
            regNumber,
            fullName,
            passwordLength: password?.length,
            hasConfirmPassword: !!confirmPassword
        });

        // Validation
        if (!username || !regNumber || !fullName || !password) {
            console.log('❌ Missing required fields');
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            console.log('❌ Password too short');
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        if (password !== confirmPassword) {
            console.log('❌ Passwords do not match');
            return NextResponse.json(
                { error: 'Passwords do not match' },
                { status: 400 }
            );
        }

        console.log('✅ Basic validation passed');

        // Check if username already exists
        console.log('🔍 Checking if username exists:', username);
        const { data: existingUser, error: userCheckError } = await supabase
            .from('users')
            .select('id')
            .eq('username', username)
            .single();

        if (userCheckError && userCheckError.code !== 'PGRST116') {
            console.error('❌ Error checking username:', userCheckError);
        }

        if (existingUser) {
            console.log('❌ Username already taken');
            return NextResponse.json(
                { error: 'Username already taken' },
                { status: 400 }
            );
        }

        console.log('✅ Username is available');

        // Check if registration number already exists
        console.log('🔍 Checking if regNumber exists:', regNumber);
        const { data: existingReg, error: regCheckError } = await supabase
            .from('users')
            .select('id')
            .eq('reg_number', regNumber)
            .single();

        if (regCheckError && regCheckError.code !== 'PGRST116') {
            console.error('❌ Error checking reg number:', regCheckError);
        }

        if (existingReg) {
            console.log('❌ Registration number already registered');
            return NextResponse.json(
                { error: 'Registration number already registered' },
                { status: 400 }
            );
        }

        console.log('✅ Registration number is available');

        // Hash password
        console.log('🔐 Hashing password...');
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        console.log('✅ Password hashed, hash length:', passwordHash.length);

        // Create user
        console.log('💾 Creating user in database...');
        console.log('📊 User data:', {
            username,
            full_name: fullName,
            reg_number: regNumber,
            password_hash_length: passwordHash.length
        });

        const { data: newUser, error } = await supabase
            .from('users')
            .insert([
                {
                    username,
                    full_name: fullName,
                    reg_number: regNumber,
                    password_hash: passwordHash,
                },
            ])
            .select('id, username, full_name, reg_number');

        if (error) {
            console.error('❌ Database error details:');
            console.error('  - Code:', error.code);
            console.error('  - Message:', error.message);
            console.error('  - Details:', error.details);
            console.error('  - Hint:', error.hint);
            console.error('  - Full error:', JSON.stringify(error, null, 2));

            return NextResponse.json(
                {
                    error: `Database error: ${error.message}`,
                    code: error.code,
                    details: error.details
                },
                { status: 400 }
            );
        }

        console.log('✅ User created successfully');
        console.log('📦 New user:', newUser);

        return NextResponse.json(
            { success: true, user: newUser[0] },
            { status: 201 }
        );
    } catch (err) {
        console.error('❌ Registration error:');
        console.error('  - Type:', typeof err);
        console.error('  - Message:', (err as any)?.message);
        console.error('  - Stack:', (err as any)?.stack);
        console.error('  - Full error:', JSON.stringify(err, null, 2));

        return NextResponse.json(
            {
                error: `Internal server error: ${(err as any)?.message || 'Unknown error'}`,
                details: (err as any)?.message
            },
            { status: 500 }
        );
    }
}
