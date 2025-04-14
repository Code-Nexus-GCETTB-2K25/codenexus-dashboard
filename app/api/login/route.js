// app/api/login/route.js
import { NextResponse } from 'next/server';

export async function POST(req) {
    const { username, password } = await req.json();

    // Replace this logic with your actual user authentication
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const response = NextResponse.json({ success: true });

        // Set cookie (adjust 'Secure' and 'SameSite' for production)
        response.cookies.set('auth_token', 'secure_dummy_token', {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    }

    return NextResponse.json({ success: false }, { status: 401 });
}
