'use client';

import { useState, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [intent, setIntent] = useState<string | null>(null);

    useEffect(() => {
        setIntent(searchParams.get('intent'));
    }, [searchParams]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (!username.trim()) {
            setError('Please enter your username.');
            setIsLoading(false);
            return;
        }

        if (!password) {
            setError('Please enter your password.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/simple-login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed. Please try again.');
                setIsLoading(false);
                return;
            }

            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            // Pass the intent to the category selection page
            const nextUrl = intent
                ? `/category-selection?intent=${intent}`
                : '/category-selection';

            router.push(nextUrl);
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white w-full max-w-md rounded-2xl p-8 card-shadow shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
                {intent === 'lost' ? 'Login to Report Lost Item' : intent === 'found' ? 'Login to Report Found Item' : 'Welcome Back'}
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-2">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        placeholder="john_doe123"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        required
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        required
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                New here? <a href="/signup" className="text-blue-600 font-semibold hover:underline">Create an account</a>
            </p>
        </div>
    );
}

export default function Login() {
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center p-4"
            style={{
                backgroundImage: 'url(/blue-texture.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-blue-600">
                        <Image src="/lock.svg" alt="secure login" width={40} height={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">CampusFind</h1>
                </div>
                <p className="text-slate-500">Sign in to report or find items</p>
            </div>

            <Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
            </Suspense>
        </div>
    );
}
