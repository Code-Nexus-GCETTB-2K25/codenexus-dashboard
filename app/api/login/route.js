import { NextResponse } from 'next/server';

export async function POST(req) {
    const { username, password } = await req.json();

    // Replace this logic with your actual user authentication
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });

        response.cookies.set('auth_token', 'secure_dummy_token', {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
