import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
    console.log('🧪 === SCHEMA DIAGNOSTIC TEST ===');

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        if (!supabaseUrl || !supabaseKey) {
            return NextResponse.json({ error: 'Missing env vars' }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseKey);

        // Test 1: Can we query users table at all?
        console.log('TEST 1: Query users table');
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Error:', error.code, error.message);

            if (error.code === 'PGRST116') {
                return NextResponse.json({
                    status: 'SCHEMA_NOT_CREATED',
                    problem: 'Users table does not exist',
                    solution: 'Run the SQL schema in Supabase Dashboard',
                    steps: [
                        '1. Go to https://supabase.com/dashboard',
                        '2. Select project gbrzpzegvagjtvvwuwbv',
                        '3. Click SQL Editor',
                        '4. Click "New Query"',
                        '5. Copy all of lib/schema.sql',
                        '6. Paste into editor',
                        '7. Click Run button',
                        '8. Wait for success message',
                        '9. Refresh this page'
                    ]
                }, { status: 503 });
            }

            if (error.code === 'PGRST204') {
                return NextResponse.json({
                    status: 'COLUMN_MISSING',
                    problem: 'password_hash column does not exist in users table',
                    solution: 'Re-run the updated schema.sql (now has DROP IF EXISTS statements)',
                    steps: [
                        '1. Go to https://supabase.com/dashboard/project/gbrzpzegvagjtvvwuwbv',
                        '2. Click SQL Editor',
                        '3. Click "New Query"',
                        '4. Copy all of lib/schema.sql (with DROP statements)',
                        '5. Paste and Run',
                        '6. If you get "policy already exists", that\'s GOOD - it\'s idempotent',
                        '7. Wait for completion',
                        '8. Refresh this page'
                    ]
                }, { status: 503 });
            }

            return NextResponse.json({
                status: 'UNKNOWN_ERROR',
                error: error.message,
                code: error.code,
                details: error.details
            }, { status: 400 });
        }

        // Can query successfully
        return NextResponse.json({
            status: 'OK',
            message: 'Schema is properly configured!',
            usersFound: data?.length || 0,
            readyToUse: true,
            nextSteps: [
                '✅ Schema is set up correctly',
                '✅ Database tables exist',
                '✅ You can now register users',
                '🎉 Visit /signup to test'
            ]
        }, { status: 200 });

    } catch (err) {
        console.error('❌ Error:', err);
        return NextResponse.json({
            error: (err as any).message
        }, { status: 500 });
    }
}
