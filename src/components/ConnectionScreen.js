import React from "react";

export default function ConnectionScreen({ 
  normalized, 
  guests, 
  setGuests, 
  language, 
  setLanguage, 
  onStartOrder, 
  onBack 
}) {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-[#0a1519] to-[#081014] text-white flex flex-col">
      {/* Language Selector - Top Right */}
      <div className="absolute top-6 right-4 z-30">
        <div className="flex bg-white/10 backdrop-blur-md rounded-full p-1 border border-white/20">
          <button
            onClick={() => setLanguage("EN")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              language === "EN"
                ? "bg-[#0da6f2] text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            EN
          </button>
          <button
            onClick={() => setLanguage("ES")}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              language === "ES"
                ? "bg-[#0da6f2] text-white"
                : "text-white/60 hover:text-white"
            }`}
          >
            ES
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-8 relative z-10">
        {/* Restaurant Logo and Branding */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-amber-900">
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a1519]"></div>
          </div>
          <h1 className="text-3xl font-extrabold mb-1">The Velvet Fork</h1>
          <p className="text-white/60 text-sm font-medium">PREMIUM DINING</p>
        </div>

        {/* Connection Status Card */}
        <div className="w-full max-w-md bg-[#1a262d]/80 backdrop-blur-md rounded-3xl border border-white/10 p-6 mb-8 shadow-2xl">
          {/* VERIFIED Status */}
          <div className="flex items-center gap-2 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#0da6f2]">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[#0da6f2] font-bold text-sm">VERIFIED</span>
          </div>

          {/* Connection Message */}
          <h2 className="text-2xl font-extrabold mb-2">You're connected</h2>
          <p className="text-white/60 text-sm mb-6">Your table is ready for service.</p>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-6"></div>

          {/* Table and Guest Info */}
          <div className="flex items-center justify-between">
            {/* Table Location */}
            <div className="flex flex-col">
              <span className="text-xs text-white/60 mb-1">LOCATION</span>
              <div className="flex items-center gap-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path
                    d="M4 6H20M4 6C2.89543 6 2 6.89543 2 8V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V8C22 6.89543 21.1046 6 20 6M4 6V4C4 2.89543 4.89543 2 6 2H8C9.10457 2 10 2.89543 10 4V6M20 6V4C20 2.89543 19.1046 2 18 2H16C14.8954 2 14 2.89543 14 4V6M10 12H14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-xl font-extrabold">Table {normalized}</span>
              </div>
            </div>

            {/* Guest Counter */}
            <div className="flex flex-col items-end">
              <span className="text-xs text-white/60 mb-1">GUESTS</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold transition-all ${
                    guests > 1
                      ? "bg-white/20 hover:bg-white/30 text-white"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  }`}
                >
                  −
                </button>
                <span className="text-xl font-extrabold w-8 text-center">{guests}</span>
                <button
                  onClick={() => setGuests(guests + 1)}
                  className="w-8 h-8 rounded-full bg-[#0da6f2] hover:bg-[#0da6f2]/90 text-white flex items-center justify-center font-bold transition-all"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Start Order Button */}
        <button
          onClick={onStartOrder}
          className="w-full max-w-md bg-[#0da6f2] hover:bg-[#0da6f2]/90 text-white font-extrabold text-lg rounded-2xl py-4 flex items-center justify-center gap-2 shadow-lg shadow-[#0da6f2]/25 transition-all active:scale-[0.98] mb-4"
        >
          <span>Start Order</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M10 17l5-5-5-5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Not your table link */}
        <button
          onClick={onBack}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          Not your table? <span className="underline">Scan again</span>
        </button>
      </main>
    </div>
  );
}

