import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div 
      className="text-slate-800 min-h-screen relative"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
      <div className="relative z-10">
      <header className="bg-white border-b border-gray-100 py-4 px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-slate-700">
              CampusFind
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-blue-600">
            <Link href="/" className="hover:text-blue-800">
              Home
            </Link>
            <a href="#how-it-works" className="hover:text-blue-800">
              How It Works
            </a>
            <a href="#contact" className="hover:text-blue-800">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className="text-center py-20 px-4">
        <div className="flex justify-center mb-6">
          <Image src="/hero.svg" alt="student finding lost item" width={360} height={180} priority />
        </div>
        <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
          CampusFind
        </h1>
        <p className="text-lg text-white drop-shadow-md mb-6">
          Lost Something? Let the campus find it.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-10 text-sm text-slate-600">
          <div className="bg-white px-6 py-3 rounded-lg shadow card-shadow">
            🏆 <span className="font-semibold">Top Contributor:</span> Alex
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow card-shadow">
            📊 <span className="font-semibold">23 Items Matched</span> Last
            Month
          </div>
          <div className="bg-white px-6 py-3 rounded-lg shadow card-shadow">
            🔄 <span className="font-semibold">120 Total Recoveries</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <Link
            href="/login?intent=lost"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-blue-200 transition-all text-center"
          >
            Report Lost Item
          </Link>
          <Link
            href="/login?intent=found"
            className="bg-white border-2 border-blue-400 text-blue-600 hover:bg-blue-50 font-bold py-4 px-8 rounded-lg transition-all text-center"
          >
            Report Found Item
          </Link>
        </div>
        <hr className="max-w-4xl mx-auto border-gray-200" />
      </section>

      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold text-slate-700 mb-6 text-center">
              Recently Lost Items
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-blue-100 rounded-xl p-4 card-shadow hover:border-blue-300 transition-colors">
                <div className="bg-gray-100 h-32 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-4xl">
                  👓
                </div>
                <h3 className="font-bold text-sm">Black Glasses</h3>
                <p className="text-xs text-gray-400">Library - 2h ago</p>
              </div>
              <div className="bg-white border border-blue-100 rounded-xl p-4 card-shadow hover:border-blue-300 transition-colors">
                <div className="bg-gray-100 h-32 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-4xl">
                  🪪
                </div>
                <h3 className="font-bold text-sm">Student ID</h3>
                <p className="text-xs text-gray-400">Cafeteria - 5h ago</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-700 mb-6 text-center">
              Recently Found Items
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border border-blue-100 rounded-xl p-4 card-shadow hover:border-blue-300 transition-colors">
                <div className="bg-gray-100 h-32 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-4xl">
                  🔑
                </div>
                <h3 className="font-bold text-sm">Set of Keys</h3>
                <p className="text-xs text-gray-400">Gym - 1h ago</p>
              </div>
              <div className="bg-white border border-blue-100 rounded-xl p-4 card-shadow hover:border-blue-300 transition-colors">
                <div className="bg-gray-100 h-32 rounded-lg mb-3 flex items-center justify-center text-gray-400 text-4xl">
                  🧴
                </div>
                <h3 className="font-bold text-sm">Water Bottle</h3>
                <p className="text-xs text-gray-400">Main Quad - 3h ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <section id="how-it-works" className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">How It Works</h2>
        <div className="bg-white rounded-xl shadow card-shadow overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 font-semibold border-b">Step</th>
                <th className="p-4 font-semibold border-b">Action</th>
                <th className="p-4 font-semibold border-b">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="p-4 align-top border-b">1</td>
                <td className="p-4 align-top border-b font-semibold">Report</td>
                <td className="p-4 align-top border-b">Snap & Upload: Upload a photo of what you lost or found in seconds.</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="p-4 align-top border-b">2</td>
                <td className="p-4 align-top border-b font-semibold">Match</td>
                <td className="p-4 align-top border-b">Smart Scan: Our system compares images to find a potential match.</td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-50">
                <td className="p-4 align-top border-b">3</td>
                <td className="p-4 align-top border-b font-semibold">Claim</td>
                <td className="p-4 align-top border-b">Answer & Connect: Answer the "Secret Question" to prove ownership and get your item back.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <footer id="contact" className="mt-12 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-slate-600">
          For assistance, please contact Janet Jiju (janet@college.edu) and Ishitha Benny (ishitha@college.edu).
        </div>
      </footer>
      </div>
    </div>
  );
}
