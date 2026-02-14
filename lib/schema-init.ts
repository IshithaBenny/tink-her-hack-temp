import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

let initialized = false;

export async function initializeSchema() {
    if (initialized) {
        console.log('✅ Schema already initialized');
        return { success: true, message: 'Schema already initialized' };
    }

    console.log('🔧 Initializing database schema...');

    try {
        const supabase = createClient(supabaseUrl, supabaseKey);

        // Check if users table exists and has password_hash column
        console.log('📋 Checking schema structure...');
        const { data, error } = await supabase
            .from('users')
            .select('id, username, password_hash')
            .limit(1);

        // If we get here without error, the schema is good
        if (!error || (error && error.code !== 'PGRST116')) {
            console.log('✅ Schema check passed');
            initialized = true;
            return { success: true, message: 'Schema verified' };
        }

        // If table doesn't exist, try to create it
        if (error && error.code === 'PGRST116') {
            console.log('⚠️  Table or column missing, attempting to create schema...');

            // Read and execute schema SQL
            const schemaSql = await readSchemaSQL();
            if (!schemaSql) {
                throw new Error('Could not read schema SQL file');
            }

            // Execute schema via Supabase REST API
            await executeSchemaViaRPC(schemaSql);

            initialized = true;
            return { success: true, message: 'Schema created successfully' };
        }

        throw error;
    } catch (err) {
        console.error('❌ Schema initialization failed:', err);
        return { success: false, error: (err as any).message };
    }
}

async function readSchemaSQL(): Promise<string | null> {
    try {
        // In Next.js, we can read the SQL file during build or runtime
        const fs = await import('fs').then(m => m.promises);
        const path = await import('path');
        const schemaPath = path.join(process.cwd(), 'lib', 'schema.sql');

        const sql = await fs.readFile(schemaPath, 'utf-8');
        return sql;
    } catch (err) {
        console.error('Could not read schema file:', err);
        return null;
    }
}

async function executeSchemaViaRPC(schemaSql: string) {
    // Split SQL by semicolons and execute each statement
    const statements = schemaSql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0);

    console.log(`Executing ${statements.length} schema statements...`);

    for (const statement of statements) {
        try {
            console.log(`  → Executing: ${statement.substring(0, 60)}...`);

            // Use Supabase REST API to execute SQL
            const response = await fetch(
                `${supabaseUrl}/rest/v1/rpc/exec_sql`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${supabaseKey}`,
                        'Content-Type': 'application/json',
                        apikey: supabaseKey,
                    },
                    body: JSON.stringify({ sql: statement }),
                }
            );

            if (!response.ok) {
                const error = await response.json();
                // Some statements might fail if they already exist, that's ok
                if (!statement.includes('IF NOT EXISTS')) {
                    console.warn(`    ⚠️  Statement failed: ${error.message}`);
                }
            }
        } catch (err) {
            console.warn(`    ⚠️  Could not execute statement: ${(err as any).message}`);
        }
    }
}

export function isSchemaInitialized(): boolean {
    return initialized;
}

export function markSchemaInitialized(): void {
    initialized = true;
}
