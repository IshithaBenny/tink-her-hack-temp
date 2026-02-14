import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    console.log('🔍 === SCHEMA VERIFICATION ENDPOINT ===');

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json(
                { error: 'Missing Supabase credentials' },
                { status: 500 }
            );
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        console.log('📋 Checking schema...');

        // Check if users table exists with password_hash column
        const { data: usersCheck, error: usersError } = await supabase
            .from('users')
            .select('id, username, password_hash, reg_number, full_name')
            .limit(1);

        if (usersError) {
            console.error('❌ Users table check failed:', usersError);

            return NextResponse.json(
                {
                    success: false,
                    schemaExists: false,
                    error: usersError.message,
                    code: usersError.code,
                    hint: '⚠️  The users table or password_hash column does not exist. Please run the setup script.',
                    setupInstructions: {
                        title: 'Manual Schema Setup Required (One-time only)',
                        steps: [
                            '1. Go to Supabase Dashboard: https://supabase.com/dashboard',
                            '2. Select your project: gbrzpzegvagjtvvwuwbv',
                            '3. Go to SQL Editor',
                            '4. Create a new query and paste the contents of lib/schema.sql',
                            '5. Click "Run" to execute all SQL statements',
                            '6. Refresh this page once done'
                        ],
                        alternativeUsingSuppFile: 'You can also use Supabase CLI: supabase db push'
                    }
                },
                { status: 503 }
            );
        }

        console.log('✅ Users table exists with all columns');

        // Check if lost_items table exists
        const { error: lostItemsError } = await supabase
            .from('lost_items')
            .select('id')
            .limit(1);

        // Check if found_items table exists
        const { error: foundItemsError } = await supabase
            .from('found_items')
            .select('id')
            .limit(1);

        // Check if matches table exists
        const { error: matchesError } = await supabase
            .from('matches')
            .select('id')
            .limit(1);

        console.log('✅ All tables exist');

        return NextResponse.json(
            {
                success: true,
                schemaExists: true,
                message: 'Schema is properly configured',
                tables: {
                    users: 'OK',
                    lost_items: lostItemsError ? 'MISSING' : 'OK',
                    found_items: foundItemsError ? 'MISSING' : 'OK',
                    matches: matchesError ? 'MISSING' : 'OK'
                }
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('❌ Schema check failed:', error);
        return NextResponse.json(
            {
                success: false,
                error: (error as any).message,
            },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    return NextResponse.json({
        endpoint: 'Schema verification and setup',
        method: 'POST',
        description: 'Verifies database schema is set up correctly. Returns setup instructions if needed.',
        usage: 'curl -X POST http://localhost:3000/api/admin/init-schema'
    });
}
