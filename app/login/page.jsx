'use client';
import { useState } from 'react';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            window.location.href = '/';
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl shadow-xl w-80">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                {error && <p className="text-red-400 mb-4">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mb-4 rounded bg-gray-700 focus:outline-none"
                />
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded cursor-pointer">
                    Login
                </button>
            </form>
        </div>
    );
}
