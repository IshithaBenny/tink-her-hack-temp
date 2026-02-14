import Image from "next/image";
import Link from "next/link";

export default function Results() {
    return (
        <div
            className="min-h-screen p-8"
            style={{
                backgroundImage: 'url(/background5.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <header className="max-w-6xl mx-auto mb-8">
                <div className="flex items-center gap-3">
                    <Image src="/hero.svg" alt="logo" width={48} height={48} />
                    <h1 className="text-2xl font-bold">Potential Match</h1>
                </div>
            </header>

            <main className="max-w-4xl mx-auto bg-white rounded-2xl p-8 card-shadow border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                    <div className="col-span-1 flex items-center justify-center">
                        <Image src="/sample-match.svg" alt="sample match" width={260} height={200} />
                    </div>

                    <div className="col-span-2">
                        <h2 className="text-xl font-bold mb-2">Black Sunglasses — Library</h2>
                        <p className="text-sm text-slate-600 mb-4">Match confidence: <strong>82%</strong></p>

                        <p className="text-slate-700 mb-6">This is a simulated match to demonstrate the flow. To claim, answer the secret question provided by the reporter and then connect via the provided contact details.</p>

                        <div className="flex gap-4">
                            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Answer Secret Question</button>
                            <Link href="/" className="text-blue-600 font-semibold self-center">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
