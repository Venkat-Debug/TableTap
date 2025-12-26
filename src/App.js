import React, { useMemo, useState } from "react";

export default function TableAccessScanOrEnter() {
  const [tableCode, setTableCode] = useState("");
  const [currentScreen, setCurrentScreen] = useState("entry"); // "entry", "menu", or "service"
  const [guests, setGuests] = useState(2);
  const [language, setLanguage] = useState("EN");

  const normalized = useMemo(() => tableCode.trim().toUpperCase(), [tableCode]);
  const canContinue = useMemo(() => {
    // Accept examples like T12, 12, A10, TABLE12 (customize as you like)
    if (!normalized) return false;
    return /^[A-Z]{0,6}\d{1,4}$/.test(normalized) || /^T\d{1,4}$/.test(normalized);
  }, [normalized]);

  const handleContinue = () => {
    setCurrentScreen("menu");
  };

  // Second Screen - Connection Status Screen
  const MenuScreen = () => (
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
          onClick={() => setCurrentScreen("service")}
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
          onClick={() => setCurrentScreen("entry")}
          className="text-white/60 hover:text-white text-sm transition-colors"
        >
          Not your table? <span className="underline">Scan again</span>
        </button>
      </main>
    </div>
  );

  // Third Screen - Service Screen
  const ServiceScreen = () => (
    <div className="relative flex flex-col min-h-screen w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-[#101c22] shadow-2xl overflow-hidden border-x border-white/5">
      {/* Ambient Background Glow */}
      <div className="fixed top-[-10%] left-[-20%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#13a4ec]/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div className="fixed bottom-[-10%] right-[-20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none opacity-30"></div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel px-5 md:px-8 lg:px-12 py-4 md:py-5 pb-3 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-none mb-1">The Obsidian Grill</h1>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
              </span>
              <p className="text-xs md:text-sm font-medium text-[#13a4ec]/90">Staff active (~2m response)</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="px-4 md:px-5 lg:px-6 py-1.5 md:py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
              <p className="text-white text-sm md:text-base lg:text-lg font-bold tracking-wide">Table {normalized}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-8 pb-40 md:pb-48 flex flex-col gap-8 md:gap-10 lg:gap-12 z-10 overflow-y-auto no-scrollbar">
        {/* Primary Actions Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
            {/* Card 1: Call Server */}
            <button className="group btn-press relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#233038] to-[#18262e] border border-white/5 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-[#13a4ec]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-[#13a4ec] group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px] md:text-[32px] lg:text-[36px]">notifications_active</span>
              </div>
              <span className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">Call Server</span>
            </button>

            {/* Card 2: Request Water */}
            <button className="group btn-press relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#233038] to-[#18262e] border border-white/5 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-blue-300 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px] md:text-[32px] lg:text-[36px]">water_drop</span>
              </div>
              <span className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">Request Water</span>
            </button>

            {/* Card 3: Ready to Order */}
            <button className="group btn-press relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#233038] to-[#18262e] border border-white/5 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-green-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-emerald-300 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px] md:text-[32px] lg:text-[36px]">restaurant_menu</span>
              </div>
              <span className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">Ready to Order</span>
            </button>

            {/* Card 4: Need Help */}
            <button className="group btn-press relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#233038] to-[#18262e] border border-white/5 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-red-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-rose-300 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px] md:text-[32px] lg:text-[36px]">support_agent</span>
              </div>
              <span className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">Need Help</span>
            </button>

            {/* Card 5: Napkins */}
            <button className="group btn-press relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#233038] to-[#18262e] border border-white/5 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-gray-300 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px] md:text-[32px] lg:text-[36px]">dry_cleaning</span>
              </div>
              <span className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">Napkins</span>
            </button>

            {/* Card 6: Condiments */}
            <button className="group btn-press relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#233038] to-[#18262e] border border-white/5 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="p-3 md:p-4 rounded-full bg-white/5 border border-white/10 text-amber-300 group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-[28px] md:text-[32px] lg:text-[36px]">tapas</span>
              </div>
              <span className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">Condiments</span>
            </button>
          </div>
        </section>

        {/* Secondary Actions */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6 px-1 mt-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight">Payment & More</h2>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Bill Action Row */}
            <button className="btn-press flex items-center justify-between p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-[#18262e] border border-white/5 hover:bg-white/5 transition-colors">
              <div className="flex items-center gap-4 md:gap-5">
                <div className="p-2 md:p-3 rounded-lg bg-white/5 text-[#13a4ec]">
                  <span className="material-symbols-outlined text-xl md:text-2xl">receipt_long</span>
                </div>
                <span className="text-white font-medium text-base md:text-lg lg:text-xl">Request Bill</span>
              </div>
              <span className="material-symbols-outlined text-gray-500 text-xl md:text-2xl">chevron_right</span>
            </button>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
              <button className="btn-press flex items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-[#18262e] border border-white/5 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-xl md:text-2xl lg:text-3xl">call_split</span>
                <span className="text-gray-200 font-medium text-sm md:text-base lg:text-lg">Split Bill</span>
              </button>
              <button className="btn-press flex items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-[#18262e] border border-white/5 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-xl md:text-2xl lg:text-3xl">thumb_up</span>
                <span className="text-gray-200 font-medium text-sm md:text-base lg:text-lg">Feedback</span>
              </button>
            </div>

            <button className="btn-press mt-2 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4">
              <span className="material-symbols-outlined text-gray-500 text-lg md:text-xl">translate</span>
              <span className="text-gray-500 text-sm md:text-base font-medium">Change Language</span>
            </button>
          </div>
        </section>
      </main>

      {/* Active Request Status Widget */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
        <div className="bg-[#1c2a33]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 md:p-5 lg:p-6 overflow-hidden relative">
          {/* Progress Line Background */}
          <div className="absolute top-0 left-0 h-1 md:h-1.5 bg-white/10 w-full">
            <div className="h-full bg-[#13a4ec] w-2/3 shadow-[0_0_10px_rgba(19,164,236,0.5)]"></div>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3 md:gap-4">
                <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-[#13a4ec]/20 text-[#13a4ec] animate-pulse">
                  <span className="material-symbols-outlined text-xl md:text-2xl lg:text-3xl">water_drop</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm md:text-base lg:text-lg">Water Request</h3>
                  <p className="text-[#13a4ec] text-xs md:text-sm font-medium mt-0.5">On the way • 1m ago</p>
                </div>
              </div>
              <button className="text-xs md:text-sm text-gray-400 font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                Edit
              </button>
            </div>
            {/* Stepper */}
            <div className="flex items-center justify-between px-2 md:px-4 pt-1">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#13a4ec]"></div>
                <span className="text-[10px] md:text-xs text-gray-400">Sent</span>
              </div>
              <div className="h-[1px] md:h-[2px] flex-1 bg-[#13a4ec]/50 mx-1"></div>
              {/* Step 2 */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#13a4ec]"></div>
                <span className="text-[10px] md:text-xs text-gray-400">Seen</span>
              </div>
              <div className="h-[1px] md:h-[2px] flex-1 bg-[#13a4ec]/50 mx-1"></div>
              {/* Step 3 (Active) */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#13a4ec] bg-[#101c22] shadow-[0_0_8px_rgba(19,164,236,0.6)]"></div>
                <span className="text-[10px] md:text-xs text-white font-bold">On way</span>
              </div>
              <div className="h-[1px] md:h-[2px] flex-1 bg-white/10 mx-1"></div>
              {/* Step 4 */}
              <div className="flex flex-col items-center gap-1">
                <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/20"></div>
                <span className="text-[10px] md:text-xs text-gray-600">Done</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom safe area spacer */}
        <div className="h-2 md:h-4"></div>
      </div>
    </div>
  );

  // Render based on current screen
  if (currentScreen === "service") {
    return <ServiceScreen />;
  }
  if (currentScreen === "menu") {
    return <MenuScreen />;
  }

  // First Screen - Table Code Entry
  return (
    <div className="min-h-[100dvh] bg-[#101c22] text-white overflow-hidden selection:bg-[#0da6f2]/30">
      {/* Local styles for orbs */}
      <style>{`
        @keyframes pulseSlow { 0%,100%{opacity:.25} 50%{opacity:.35} }
        .gradient-orb {
          position: absolute; border-radius: 9999px; filter: blur(80px);
          opacity: 0.3; z-index: 0; pointer-events: none;
        }
        .camera-view {
          background: radial-gradient(circle at 50% 50%, #2a3b47 0%, #152028 100%);
          position: relative;
        }
        body { overscroll-behavior-y: none; }
      `}</style>

      {/* Background Orbs */}
      <div
        className="gradient-orb w-96 h-96 top-[-20%] left-[-20%]"
        style={{ backgroundColor: "rgba(13,166,242,1)", animation: "pulseSlow 4s ease-in-out infinite" }}
      />
      <div
        className="gradient-orb w-80 h-80 bottom-[-10%] right-[-20%]"
        style={{ backgroundColor: "rgba(37,99,235,1)", opacity: 0.2 }}
      />

      {/* Header */}
      <header className="relative z-20 flex flex-col items-center justify-center pt-8 pb-4 shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-cover bg-center ring-2 ring-white/10 shadow-lg"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDJbQUWOLEJWSrwd8wOaMqniv1Kmm5i8SKzI-L4rH3OFAPEEzgEJh1Fx8o-8ywA-I5DPX1GrIk4LBFrhwSJOnCRXGQy30P7md-gEKwDyuNx4IJxPJCuKwqarZXzm9YnnDWGHWR6tZQwGB4SqhYow8_fy53FIFjWvM0qv5dK2HwPNUP1BjNnBrVhVtcfJVFYjNYhDfMPR2PRNKt2z5huI5M_2N7Gpkzmxu32b2qFi5VdlvuylsS7iXDGYJzsSs0LHGyA2JaGfZ7dXY9t')",
            }}
          />
          <div className="flex flex-col">
            <span className="text-base font-extrabold leading-tight tracking-tight">
              The Velvet Fork
            </span>
            <span className="text-[10px] font-extrabold text-[#0da6f2] uppercase tracking-widest leading-none mt-0.5">
              Smart Table Service
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex flex-col w-full max-w-md mx-auto px-4 pb-6">
        {/* Display Area */}
        <div className="relative flex-1 w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl isolate mb-6 group">
          {/* Background */}
          <div className="absolute inset-0 camera-view">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className="px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
              <p className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/5 border border-white/10">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#0da6f2]"
                  >
                    <path
                      d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 13h.01M10 13h.01M13 13h.01M16 13h.01M8 16h8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Enter your table code below
              </p>
            </div>
          </div>
        </div>

        {/* Input + button */}
        <div className="w-full shrink-0 flex flex-col gap-3">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 transition-colors group-focus-within:text-[#0da6f2]">
              {/* keyboard icon */}
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7 10h.01M10 10h.01M13 10h.01M16 10h.01M7 13h.01M10 13h.01M13 13h.01M16 13h.01M8 16h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <input
              autoComplete="off"
              value={tableCode}
              onChange={(e) => setTableCode(e.target.value)}
              placeholder="Enter table code"
              className="w-full bg-[#1a262d] border border-white/10 rounded-2xl py-4 pl-12 pr-16 text-white placeholder:text-white/20 focus:ring-1 focus:ring-[#0da6f2] focus:border-[#0da6f2] transition-all outline-none font-semibold text-lg shadow-inner"
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <span className="text-xs font-semibold text-white/20">e.g. T12</span>
            </div>
          </div>

          <button
            disabled={!canContinue}
            onClick={handleContinue}
            className={[
              "w-full h-14 font-extrabold rounded-2xl flex items-center justify-center gap-2 transition-all",
              canContinue
                ? "bg-[#0da6f2] hover:bg-[#0da6f2]/90 active:scale-[0.98] text-white shadow-lg shadow-[#0da6f2]/25"
                : "bg-white/5 text-white/30 border border-white/5 cursor-not-allowed",
            ].join(" ")}
          >
            <span>Continue</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
              <path
                d="M10 17l5-5-5-5"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
