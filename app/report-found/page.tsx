'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ReportFoundWrapper() {
    const [contactInfo, setContactInfo] = useState('');

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
                    <div className="font-semibold text-slate-500">Report Found Item</div>
                </div>
            </header>

            <main className="max-w-3xl mx-auto px-4 py-12">
                <div className="bg-white p-8 rounded-2xl card-shadow border border-gray-100">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-slate-800 mb-2">You found something!</h1>
                        <p className="text-slate-500">Thank you for helping return lost items to their owners.</p>
                    </div>

                    <div className="space-y-8">
                        {/* Upload Section */}
                        <div>
                            <label className="block text-lg font-bold text-slate-800 mb-4">1. Upload Image</label>
                            <div className="border-2 border-dashed border-green-200 rounded-xl bg-green-50/30 min-h-[250px] flex flex-col items-center justify-center p-8 group hover:border-green-400 transition-colors cursor-pointer">
                                <div className="mb-4">
                                    <Image src="/upload.svg" alt="upload placeholder" width={72} height={72} />
                                </div>
                                <p className="text-slate-600 font-medium">Click to upload photo of the item</p>
                                <p className="text-slate-400 text-sm mt-1">Make sure the image is clear</p>
                            </div>
                        </div>

                        {/* Contact Info Section */}
                        <div>
                            <label className="block text-lg font-bold text-slate-800 mb-4">2. Where can the owner find it?</label>
                            <textarea
                                className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 outline-none transition-all min-h-[150px] resize-y"
                                placeholder="e.g., I left it at the main reception desk, or contact me at 555-0123..."
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}
                            ></textarea>
                        </div>

                        <hr className="border-gray-100" />

                        <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-200 transition-all transform active:scale-[0.98]">
                            Submit Found Report
                        </button>
                        <div className="mt-3 text-center">
                            <Link href="/results" className="text-sm text-blue-600 font-semibold">View Matches (sample)</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
