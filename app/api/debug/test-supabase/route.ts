import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    console.log('=== SUPABASE CONNECTION TEST ===');

    try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        console.log('🔍 Environment variables:');
        console.log('  - URL exists:', !!supabaseUrl);
        console.log('  - URL value:', supabaseUrl);
        console.log('  - Key exists:', !!supabaseKey);
        console.log('  - Key first 20 chars:', supabaseKey?.substring(0, 20));

        if (!supabaseUrl || !supabaseKey) {
            console.error('❌ Missing environment variables');
            return NextResponse.json(
                { error: 'Missing Supabase environment variables' },
                { status: 500 }
            );
        }

        // Create fresh Supabase client
        const supabase = createClient(supabaseUrl, supabaseKey);
        console.log('✅ Supabase client created');

        // Test 1: Try to query users table
        console.log('📋 Test 1: Query users table');
        const { data: users, error: queryError } = await supabase
            .from('users')
            .select('*')
            .limit(1);

        if (queryError) {
            console.error('❌ Query error:', queryError);
            return NextResponse.json(
                {
                    error: 'Failed to query users table',
                    details: queryError,
                },
                { status: 400 }
            );
        }

        console.log('✅ Query successful, found users:', users?.length);

        // Test 2: Get table structure
        console.log('📋 Test 2: Get table structure');
        const { data: columns, error: columnsError } = await supabase
            .from('users')
            .select('*')
            .limit(0);

        if (columnsError) {
            console.error('❌ Columns error:', columnsError);
        }

        // Test 3: Try a test insert (will be rolled back if in transaction)
        console.log('📋 Test 3: Test insert with rollback');
        const testData = {
            username: `test_${Date.now()}`,
            full_name: 'Test User',
            reg_number: `REG_${Date.now()}`,
            password_hash: 'test_hash_' + Date.now(),
        };

        console.log('Attempting insert:', testData);

        const { data: insertResult, error: insertError } = await supabase
            .from('users')
            .insert([testData])
            .select('id, username, full_name, reg_number');

        if (insertError) {
            console.error('❌ Insert error details:');
            console.error('  - Code:', insertError.code);
            console.error('  - Message:', insertError.message);
            console.error('  - Details:', insertError.details);
            console.error('  - Hint:', insertError.hint);
            console.error('  - Full error:', JSON.stringify(insertError, null, 2));

            return NextResponse.json(
                {
                    error: 'Insert operation failed',
                    code: insertError.code,
                    message: insertError.message,
                    details: insertError.details,
                    hint: insertError.hint,
                },
                { status: 400 }
            );
        }

        console.log('✅ Insert successful:', insertResult);

        // Clean up - try to delete the test record
        if (insertResult && insertResult[0]) {
            console.log('🧹 Cleaning up test record...');
            const { error: deleteError } = await supabase
                .from('users')
                .delete()
                .eq('id', insertResult[0].id);

            if (deleteError) {
                console.error('⚠️  Could not delete test record:', deleteError);
            } else {
                console.log('✅ Test record cleaned up');
            }
        }

        return NextResponse.json(
            {
                success: true,
                message: 'All Supabase connection tests passed',
                tests: {
                    connection: 'OK',
                    queryTable: 'OK',
                    insert: 'OK',
                    recordCount: users?.length || 0,
                },
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('❌ Test error:');
        console.error('  - Type:', typeof err);
        console.error('  - Message:', (err as any)?.message);
        console.error('  - Stack:', (err as any)?.stack);

        return NextResponse.json(
            {
                error: 'Test failed with exception',
                message: (err as any)?.message,
            },
            { status: 500 }
        );
    }
}
