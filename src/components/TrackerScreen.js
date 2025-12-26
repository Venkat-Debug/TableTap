import React, { useState, useEffect, useMemo } from "react";

// Helper function to calculate time ago
const getTimeAgo = (timestamp) => {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffMins = Math.floor(diffMs / 60000);
  const diffSecs = Math.floor(diffMs / 1000);

  if (diffSecs < 10) {
    return "just now";
  } else if (diffSecs < 60) {
    return `${diffSecs}s ago`;
  } else if (diffMins === 1) {
    return "1m ago";
  } else {
    return `${diffMins}m ago`;
  }
};

export default function TrackerScreen({ normalized, requests, onNewRequest, onDeleteRequest, onViewBill }) {
  const [timeAgoMap, setTimeAgoMap] = useState({});

  // Update time ago every 10 seconds
  useEffect(() => {
    const updateTimeAgo = () => {
      const newMap = {};
      requests.forEach((req) => {
        newMap[req.id] = getTimeAgo(req.statusChangedAt || req.createdAt);
      });
      setTimeAgoMap(newMap);
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000);
    return () => clearInterval(interval);
  }, [requests]);

  // Separate active and history requests
  const { activeRequests, historyRequests } = useMemo(() => {
    const active = requests
      .filter((req) => req.status !== "Done" && req.status !== "Cancelled")
      .sort((a, b) => (b.statusChangedAt || b.createdAt) - (a.statusChangedAt || a.createdAt)); // Most recent first

    const history = requests
      .filter((req) => req.status === "Done" || req.status === "Cancelled")
      .sort((a, b) => (b.statusChangedAt || b.createdAt) - (a.statusChangedAt || a.createdAt)); // Most recent first

    return { activeRequests: active, historyRequests: history };
  }, [requests]);

  // Calculate progress percentage based on status
  const getProgress = (status) => {
    switch (status) {
      case "Sent":
        return 25;
      case "Seen":
        return 50;
      case "On way":
        return 75;
      case "Done":
        return 100;
      default:
        return 0;
    }
  };

  // Map status display name
  const getStatusDisplay = (status) => {
    if (status === "On way") return "On the Way";
    if (status === "Sent") return "Sent";
    if (status === "Seen") return "Seen";
    return status;
  };

  const handleReplay = (request) => {
    // Navigate to service screen to recreate this request
    if (onNewRequest) {
      onNewRequest();
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 bg-background-dark">
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-0 w-full h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none z-0"></div>

      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full glass-nav px-4 py-3 flex items-center justify-between shadow-lg shadow-black/20">
        <div className="flex flex-col">
          <span className="text-[10px] text-primary font-bold tracking-widest uppercase mb-0.5">
            Your Session
          </span>
          <h2 className="text-white text-xl font-bold leading-none tracking-tight">
            Table {normalized}
          </h2>
        </div>
        <button
          onClick={onNewRequest}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 active:scale-95 transition-all text-white px-4 py-2 rounded-full shadow-[0_0_15px_rgba(19,164,236,0.3)]"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span className="text-sm font-bold">New Request</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col gap-6 p-4 z-10">
        {/* Active Requests Section */}
        <section>
          <div className="flex items-center justify-between mb-4 mt-2 px-1">
            <h3 className="text-white text-lg font-bold tracking-tight">Active Requests</h3>
            {activeRequests.length > 0 && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
            )}
          </div>
          <div className="flex flex-col gap-3">
            {activeRequests.length === 0 ? (
              <div className="glass-panel p-8 rounded-xl text-center">
                <p className="text-white/40 text-sm">No active requests</p>
              </div>
            ) : (
              activeRequests.map((request) => {
                const progress = getProgress(request.status);
                const statusDisplay = getStatusDisplay(request.status);
                const isOnTheWay = request.status === "On way";

                return (
                  <div
                    key={request.id}
                    className="glass-panel p-4 rounded-xl relative overflow-hidden group animate-card-entrance"
                  >
                    {/* Progress Bar / Highlight */}
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
                      <div
                        className="h-full bg-primary shadow-[0_0_10px_rgba(19,164,236,0.8)] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <div className="flex items-start gap-4">
                      {/* Icon Container */}
                      <div
                        className={`h-12 w-12 rounded-lg flex items-center justify-center shrink-0 border shadow-[0_0_15px_rgba(19,164,236,0.15)] ${
                          isOnTheWay
                            ? "bg-primary/20 text-primary border-primary/20"
                            : "bg-white/5 text-white/70 border-white/10"
                        }`}
                      >
                        <span className="material-symbols-outlined filled">{request.icon}</span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-white text-base font-bold truncate pr-2">
                            {request.title}
                          </h4>
                          <span className="text-xs font-medium text-white/50 whitespace-nowrap">
                            {timeAgoMap[request.id] || getTimeAgo(request.statusChangedAt || request.createdAt)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            {isOnTheWay ? (
                              <>
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-primary text-sm font-semibold tracking-wide">
                                  {statusDisplay}
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
                                <span className="text-white/60 text-sm font-medium">{statusDisplay}</span>
                              </>
                            )}
                          </div>
                          {request.status === "Seen" && (
                            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs font-medium text-white transition-colors">
                              <span className="material-symbols-outlined text-[14px]">edit_note</span>
                              Add Note
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* History Section */}
        <section>
          <div className="flex items-center justify-between mb-4 mt-2 px-1">
            <h3 className="text-white text-lg font-bold tracking-tight">History</h3>
          </div>
          <div className="flex flex-col gap-3">
            {historyRequests.length === 0 ? (
              <div className="p-6 flex flex-col items-center justify-center text-center mt-4">
                <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                  <span className="material-symbols-outlined text-white/20">restaurant</span>
                </div>
                <p className="text-white/30 text-xs">Your order history for this session</p>
              </div>
            ) : (
              <>
                {historyRequests.map((item) => (
                  <div
                    key={item.id}
                    className="glass-panel p-4 rounded-xl opacity-80 hover:opacity-100 transition-opacity animate-card-entrance"
                  >
                    <div className="flex items-center gap-4">
                      {/* Icon Container */}
                      <div className="h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center text-white/40 shrink-0">
                        <span className="material-symbols-outlined">{item.icon}</span>
                      </div>
                      {/* Content */}
                      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                        <h4 className="text-white/90 text-sm font-bold truncate">{item.title}</h4>
                        <div className="flex items-center gap-1.5">
                          {item.status === "Done" ? (
                            <>
                              <span className="material-symbols-outlined text-[14px] text-green-500">
                                check_circle
                              </span>
                              <span className="text-white/40 text-xs">
                                Done • {timeAgoMap[item.id] || getTimeAgo(item.statusChangedAt || item.createdAt)}
                              </span>
                            </>
                          ) : (
                            <span className="text-white/40 text-xs">
                              Cancelled • {timeAgoMap[item.id] || getTimeAgo(item.statusChangedAt || item.createdAt)}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Action */}
                      <button
                        onClick={() => handleReplay(item)}
                        aria-label="Order again"
                        className="h-8 w-8 rounded-full bg-white/5 hover:bg-primary/20 flex items-center justify-center text-white/60 hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-[18px]">replay</span>
                      </button>
                    </div>
                  </div>
                ))}
                {/* Empty State Placeholder (Visual Balance) */}
                <div className="p-6 flex flex-col items-center justify-center text-center mt-4">
                  <div className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-white/20">restaurant</span>
                  </div>
                  <p className="text-white/30 text-xs">Your order history for this session</p>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full glass-nav z-50 pb-safe">
        <div className="flex justify-around items-center h-16 max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors w-16 group">
            <span className="material-symbols-outlined group-hover:-translate-y-0.5 transition-transform">
              restaurant_menu
            </span>
            <span className="text-[10px] font-medium">Menu</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-primary w-16 relative">
            {/* Glow effect for active tab */}
            <div className="absolute -top-3 h-8 w-12 bg-primary/20 rounded-full blur-xl"></div>
            <span className="material-symbols-outlined filled relative z-10">history</span>
            <span className="text-[10px] font-bold relative z-10">Tracker</span>
          </button>
          <button
            onClick={onViewBill}
            className="flex flex-col items-center gap-1 text-white/40 hover:text-white transition-colors w-16 group"
          >
            <span className="material-symbols-outlined group-hover:-translate-y-0.5 transition-transform">
              receipt_long
            </span>
            <span className="text-[10px] font-medium">Bill</span>
          </button>
        </div>
        {/* Safe Area Spacer for iOS Home Indicator */}
        <div className="h-5 w-full"></div>
      </nav>
    </div>
  );
}
