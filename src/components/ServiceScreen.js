import React from "react";

export default function ServiceScreen({ normalized }) {
  return (
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
}

