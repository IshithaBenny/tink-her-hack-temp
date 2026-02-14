'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function CategorySelectionContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [intent, setIntent] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const intentParam = searchParams.get('intent');
        setIntent(intentParam);
    }, [searchParams]);

    const categories = [
        "Electronics", "Wallets/Keys", "ID Cards", "Books", "Other"
    ];

    const handleNext = () => {
        if (intent === 'lost') {
            router.push('/report-lost');
        } else if (intent === 'found') {
            router.push('/report-found');
        } else {
            // Default fallback if no intent
            router.push('/');
        }
    };

    return (
        <div className="w-full max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold text-slate-800 mb-2">Search by Category</h1>
            <p className="text-slate-500 mb-10">Select the category that matches your item</p>

            <div className="bg-white p-8 rounded-2xl card-shadow border border-gray-100">
                <div className="flex flex-col gap-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search specifically (e.g., 'Blue Dell Laptop')"
                            className="w-full px-5 py-4 pl-12 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="text-left">
                        <label className="block text-sm font-medium text-slate-700 mb-2 ml-1">Category</label>
                        <select
                            className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-slate-700 cursor-pointer appearance-none"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="" disabled>Select a category...</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!selectedCategory && !searchQuery}
                        className={`w-full font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform active:scale-95 text-lg mt-4 ${(selectedCategory || searchQuery)
                            ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CategorySelection() {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{
                backgroundImage: 'url(/credentials.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <CategorySelectionContent />
            </Suspense>
        </div>
    );
}
