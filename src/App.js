import React, { useMemo, useState } from "react";

export default function TableAccessScanOrEnter() {
  const [tableCode, setTableCode] = useState("");
  const [currentScreen, setCurrentScreen] = useState("entry"); // "entry" or "menu"

  const normalized = useMemo(() => tableCode.trim().toUpperCase(), [tableCode]);
  const canContinue = useMemo(() => {
    // Accept examples like T12, 12, A10, TABLE12 (customize as you like)
    if (!normalized) return false;
    return /^[A-Z]{0,6}\d{1,4}$/.test(normalized) || /^T\d{1,4}$/.test(normalized);
  }, [normalized]);

  const handleContinue = () => {
    setCurrentScreen("menu");
  };

  // Second Screen - Menu/Service Screen
  const MenuScreen = () => (
    <div className="min-h-[100dvh] bg-[#101c22] text-white overflow-y-auto selection:bg-[#0da6f2]/30">
      {/* Background Orbs */}
      <div
        className="gradient-orb w-96 h-96 top-[-20%] left-[-20%] fixed"
        style={{ backgroundColor: "rgba(13,166,242,1)", animation: "pulseSlow 4s ease-in-out infinite" }}
      />
      <div
        className="gradient-orb w-80 h-80 bottom-[-10%] right-[-20%] fixed"
        style={{ backgroundColor: "rgba(37,99,235,1)", opacity: 0.2 }}
      />

      {/* Header with Back Button */}
      <header className="relative z-20 flex items-center justify-between px-4 pt-8 pb-4">
        <button
          onClick={() => setCurrentScreen("entry")}
          className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5M12 19l-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-semibold">Back</span>
        </button>
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
              Table {normalized}
            </span>
          </div>
        </div>
        <div className="w-20"></div> {/* Spacer for center alignment */}
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 pb-8">
        <div className="bg-[#1a262d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 mb-6">
          <h1 className="text-2xl font-extrabold mb-2">Welcome to Table {normalized}</h1>
          <p className="text-white/60 text-sm">Browse our menu and place your order</p>
        </div>

        {/* Menu Categories */}
        <div className="space-y-6">
          <div className="bg-[#1a262d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0da6f2]">Menu Categories</h2>
            <div className="grid grid-cols-2 gap-4">
              {["Appetizers", "Main Course", "Desserts", "Beverages"].map((category) => (
                <button
                  key={category}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 text-left transition-all active:scale-95"
                >
                  <div className="font-semibold mb-1">{category}</div>
                  <div className="text-xs text-white/40">View items</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#1a262d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl font-bold mb-4 text-[#0da6f2]">Quick Actions</h2>
            <div className="space-y-3">
              {["Call Waiter", "Request Bill", "Special Requests"].map((action) => (
                <button
                  key={action}
                  className="w-full bg-[#0da6f2]/20 hover:bg-[#0da6f2]/30 border border-[#0da6f2]/30 rounded-xl p-4 text-left transition-all active:scale-[0.98]"
                >
                  <div className="font-semibold">{action}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  // Render based on current screen
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
