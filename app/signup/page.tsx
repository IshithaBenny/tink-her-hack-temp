'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

function SignupForm() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        // Validation
        if (!fullName.trim()) {
            setError('Please enter your full name.');
            setIsLoading(false);
            return;
        }

        if (!username.trim()) {
            setError('Please enter a username.');
            setIsLoading(false);
            return;
        }

        if (username.length < 3) {
            setError('Username must be at least 3 characters.');
            setIsLoading(false);
            return;
        }

        if (!regNumber.trim()) {
            setError('Please enter your registration number.');
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/simple-register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username,
                    password,
                    confirmPassword,
                    regNumber,
                    fullName,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Registration failed. Please try again.');
                setIsLoading(false);
                return;
            }

            setSuccess('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (err) {
            console.error('Signup error:', err);
            setError('An error occurred during signup. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white w-full max-w-md rounded-2xl p-8 card-shadow shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-slate-800 mb-2 text-center">
                Create Account
            </h2>
            <p className="text-slate-500 text-center mb-6 text-sm">
                Join CampusFind to report or find items
            </p>

            <form onSubmit={handleSignup} className="space-y-4">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => {
                            setFullName(e.target.value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        disabled={isLoading}
                    />
                </div>

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
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label htmlFor="regNumber" className="block text-sm font-medium text-slate-700 mb-2">
                        Registration Number
                    </label>
                    <input
                        type="text"
                        id="regNumber"
                        placeholder="Enter your registration number"
                        value={regNumber}
                        onChange={(e) => {
                            setRegNumber(e.target.value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
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
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        disabled={isLoading}
                    />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError('');
                        }}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                        disabled={isLoading}
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded border border-red-200">
                        <p className="font-semibold mb-1">Error:</p>
                        <p>{error}</p>
                    </div>
                )}

                {success && (
                    <div className="text-green-600 text-sm bg-green-50 p-3 rounded">
                        {success}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-blue-200 transition-all transform active:scale-95"
                >
                    {isLoading ? 'Creating Account...' : 'Sign Up'}
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
                Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Login</Link>
            </p>
        </div>
    );
}

export default function Signup() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4">
            {/* Full screen background image */}
            <Image
                src="/hero.svg"
                alt="Background"
                fill
                priority
                style={{ objectFit: 'cover' }}
                className="-z-20"
            />

            {/* Dark overlay to keep white text readable */}
            <div className="absolute inset-0 bg-black/40 -z-10" />

            <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
                <div className="mb-8 text-center text-white">
                    <div className="flex items-center justify-center gap-2 mb-2">
                        <div className="text-white">
                            <Image src="/hero.svg" alt="logo" width={40} height={40} />
                        </div>
                        <h1 className="text-3xl font-bold">CampusFind</h1>
                    </div>
                    <p className="text-white/90">Report or find lost items on campus</p>
                </div>

                <Suspense fallback={<div>Loading...</div>}>
                    <SignupForm />
                </Suspense>
            </div>
        </div>
    );
}
