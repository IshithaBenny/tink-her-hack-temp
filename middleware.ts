import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Middleware is deprecated in favor of proxy
    // This file can be removed in future versions
    return NextResponse.next();
}

export const config = {
    matcher: '/api/:path*',
};
