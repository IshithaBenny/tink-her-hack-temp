'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReportLostWrapper() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <header className="bg-white border-b border-gray-100 py-4 px-8 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="text-blue-600">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-slate-700">CampusFind</span>
                    </div>
                    <div className="font-semibold text-slate-500">Report Lost Item</div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Column: Input */}
                    <div className="space-y-8">
                        <div className="bg-white p-6 rounded-2xl card-shadow border border-gray-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">1. Upload Image</h2>
                            <div className="border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50 min-h-[250px] flex flex-col items-center justify-center p-8 group hover:border-blue-400 transition-colors cursor-pointer">
                                <div className="mb-4">
                                    <Image src="/upload.svg" alt="upload placeholder" width={72} height={72} />
                                </div>
                                <p className="text-slate-600 font-medium">Click to upload or drag & drop</p>
                                <p className="text-slate-400 text-sm mt-1">SVG, PNG, JPG (Max 5MB)</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl card-shadow border border-gray-100">
                            <h2 className="text-xl font-bold text-slate-800 mb-4">2. Security Verification</h2>
                            <p className="text-slate-500 text-sm mb-6">Create a question that only you know the answer to. This will be used to verify ownership.</p>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Security Question</label>
                                    <input
                                        type="text"
                                        placeholder="e.g., What sticker is on the back?"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={question}
                                        onChange={(e) => setQuestion(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Security Answer</label>
                                    <input
                                        type="text"
                                        placeholder="Type the answer"
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all">
                            Submit Report
                        </button>
                    </div>

                    {/* Right Column: Matches */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl card-shadow border border-gray-100 h-full min-h-[400px] flex flex-col">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold text-slate-800">Potential Matches</h2>
                                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">AI Powered</span>
                            </div>

                            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                                <div className="text-5xl mb-4 opacity-20">🔍</div>
                                <h3 className="text-lg font-semibold text-slate-600 mb-2">No matches yet</h3>
                                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                                    Once you upload an image, we'll use perceptual hashing (pHash) to find visually similar items in our database.
                                </p>
                            </div>

                            <div className="mt-6">
                                <Link href="/results" className="w-full inline-block bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold py-3 px-6 rounded-lg transition-all border border-blue-200 text-center">
                                    View Matches
                                </Link>
                            </div>
                        </div>

                        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg shadow-blue-200">
                            <h3 className="font-bold text-lg mb-2">How Matching Works</h3>
                            <p className="text-blue-100 text-sm opacity-90">
                                We use <strong>pHash (Perceptual Hashing)</strong> technology to analyze the visual fingerprints of uploaded images. This allows us to match lost items even if the photos are taken from different angles or lighting conditions.
                            </p>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
