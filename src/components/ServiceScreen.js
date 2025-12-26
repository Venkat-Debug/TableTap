import React, { useState, useRef, useCallback } from "react";
import RequestCard from "./RequestCard";

const QUICK_ACTIONS = [
  {
    id: "call-server",
    title: "Call Server",
    icon: "notifications_active",
    color: "#13a4ec",
    bgColor: "bg-[#13a4ec]/5",
    iconColor: "text-[#13a4ec]",
  },
  {
    id: "request-water",
    title: "Request Water",
    icon: "water_drop",
    color: "#60a5fa",
    bgColor: "bg-blue-400/5",
    iconColor: "text-blue-300",
  },
  {
    id: "ready-order",
    title: "Ready to Order",
    icon: "restaurant_menu",
    color: "#34d399",
    bgColor: "bg-green-400/5",
    iconColor: "text-emerald-300",
  },
  {
    id: "need-help",
    title: "Need Help",
    icon: "support_agent",
    color: "#f87171",
    bgColor: "bg-red-400/5",
    iconColor: "text-rose-300",
  },
  {
    id: "napkins",
    title: "Napkins",
    icon: "dry_cleaning",
    color: "#d1d5db",
    bgColor: "bg-white/5",
    iconColor: "text-gray-300",
  },
  {
    id: "condiments",
    title: "Condiments",
    icon: "tapas",
    color: "#fbbf24",
    bgColor: "bg-amber-400/5",
    iconColor: "text-amber-300",
  },
];

export default function ServiceScreen({ 
  normalized, 
  onViewMenu, 
  onViewBill,
  requests, 
  setRequests, 
  requestIds, 
  lastRequestTime 
}) {
  const [toast, setToast] = useState(null);
  const [editingRequest, setEditingRequest] = useState(null);
  const cardRefs = useRef({});

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const createRequest = useCallback(
    (action) => {
      const now = Date.now();
      const lastTime = lastRequestTime.current[action.id] || 0;
      const timeSinceLastRequest = now - lastTime;

      // Check for duplicate within 5-10 seconds
      if (timeSinceLastRequest < 8000) {
        // Find existing request of same type
        const existingRequest = requests.find(
          (r) => r.type === action.id && r.status !== "Done" && r.status !== "Cancelled"
        );
        if (existingRequest) {
          // Shake the existing card
          const cardRef = cardRefs.current[existingRequest.id];
          if (cardRef && cardRef.current) {
            cardRef.current.shake();
          }
          showToast(`${action.title} already active`);
          return;
        }
      }

      // Create new request
      const newRequest = {
        id: `req-${requestIds.current++}`,
        type: action.id,
        title: action.title,
        icon: action.icon,
        status: "Sent",
        createdAt: now,
        statusChangedAt: now,
        failed: false,
      };

      lastRequestTime.current[action.id] = now;
      
      // Create ref for this card
      cardRefs.current[newRequest.id] = React.createRef();

      setRequests((prev) => [newRequest, ...prev]);

      // Trigger haptic feedback (if available)
      if (navigator.vibrate) {
        navigator.vibrate(10);
      }
    },
    [requests, showToast, setRequests, requestIds, lastRequestTime]
  );

  const handleTileClick = useCallback(
    (action, event) => {
      // Tile press animation
      const button = event.currentTarget;
      button.style.transform = "scale(0.98)";
      setTimeout(() => {
        button.style.transform = "";
      }, 100);

      // Icon glow pulse
      const iconContainer = button.querySelector(".icon-container");
      if (iconContainer) {
        iconContainer.classList.add("animate-glow-pulse");
        setTimeout(() => {
          iconContainer.classList.remove("animate-glow-pulse");
        }, 500);
      }

      createRequest(action);
    },
    [createRequest]
  );

  const handleDelete = useCallback((requestId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId && req.status !== "Done"
          ? { ...req, status: "Cancelled", statusChangedAt: Date.now() }
          : req
      )
    );
    delete cardRefs.current[requestId];
    showToast("Request removed");
  }, [showToast, setRequests]);

  const handleEdit = useCallback((request) => {
    setEditingRequest(request);
  }, []);

  const handleEditClose = useCallback(() => {
    setEditingRequest(null);
  }, []);

  const handleEditCancel = useCallback((requestId) => {
    handleDelete(requestId);
    setEditingRequest(null);
  }, [handleDelete]);

  const handleRetry = useCallback((requestId) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, failed: false, status: "Sent" } : r
      )
    );
  }, []);

  // Get visible requests (max 2 visible)
  const visibleRequests = requests.slice(0, 2);
  const hiddenCount = Math.max(0, requests.length - 2);

  return (
    <div className="relative flex flex-col min-h-screen w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto bg-[#101c22] shadow-2xl overflow-hidden border-x border-white/5">
      {/* Ambient Background Glow */}
      <div className="fixed top-[-10%] left-[-20%] w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-[#13a4ec]/20 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div className="fixed bottom-[-10%] right-[-20%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none opacity-30"></div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel-old px-5 md:px-8 lg:px-12 py-4 md:py-5 pb-3 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold tracking-tight leading-none mb-1">
              The Obsidian Grill
            </h1>
            <div className="flex items-center gap-1.5 opacity-80">
              <span className="relative flex h-2 w-2 md:h-2.5 md:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-full w-full bg-green-500"></span>
              </span>
              <p className="text-xs md:text-sm font-medium text-[#13a4ec]/90">
                Staff active (~2m response)
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="px-4 md:px-5 lg:px-6 py-1.5 md:py-2 bg-white/10 rounded-full border border-white/10 backdrop-blur-md">
              <p className="text-white text-sm md:text-base lg:text-lg font-bold tracking-wide">
                Table {normalized}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Scrollable Content */}
      <main className="flex-1 px-4 md:px-6 lg:px-8 py-6 md:py-8 pb-40 md:pb-48 flex flex-col gap-8 md:gap-10 lg:gap-12 z-10 overflow-y-auto no-scrollbar">
        {/* Primary Actions Grid */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6 px-1">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight">
              Quick Actions
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4 lg:gap-5">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.id}
                onClick={(e) => handleTileClick(action, e)}
                className="group btn-press relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#233038] to-[#18262e] border border-white/5 shadow-lg overflow-hidden transition-all"
              >
                <div
                  className={`absolute inset-0 ${action.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div
                  className={`icon-container p-3 md:p-4 rounded-full bg-white/5 border border-white/10 ${action.iconColor} group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="material-symbols-outlined text-[28px] md:text-[32px] lg:text-[36px]">
                    {action.icon}
                  </span>
                </div>
                <span className="text-white font-semibold text-sm md:text-base lg:text-lg text-center">
                  {action.title}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Secondary Actions */}
        <section>
          <div className="flex items-center justify-between mb-4 md:mb-6 px-1 mt-2">
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight">
              Payment & More
            </h2>
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            {/* View Requests Button */}
            <button
              onClick={onViewMenu}
              className="btn-press flex items-center justify-between p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-[#18262e] border border-white/5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4 md:gap-5">
                <div className="p-2 md:p-3 rounded-lg bg-white/5 text-[#13a4ec]">
                  <span className="material-symbols-outlined text-xl md:text-2xl">
                    history
                  </span>
                </div>
                <span className="text-white font-medium text-base md:text-lg lg:text-xl">
                  View Requests
                </span>
              </div>
              <span className="material-symbols-outlined text-gray-500 text-xl md:text-2xl">
                chevron_right
              </span>
            </button>
            {/* Bill Action Row */}
            <button
              onClick={onViewBill}
              className="btn-press flex items-center justify-between p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-[#18262e] border border-white/5 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-4 md:gap-5">
                <div className="p-2 md:p-3 rounded-lg bg-white/5 text-[#13a4ec]">
                  <span className="material-symbols-outlined text-xl md:text-2xl">
                    receipt_long
                  </span>
                </div>
                <span className="text-white font-medium text-base md:text-lg lg:text-xl">
                  Request Bill
                </span>
              </div>
              <span className="material-symbols-outlined text-gray-500 text-xl md:text-2xl">
                chevron_right
              </span>
            </button>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4">
              <button className="btn-press flex items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-[#18262e] border border-white/5 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-xl md:text-2xl lg:text-3xl">
                  call_split
                </span>
                <span className="text-gray-200 font-medium text-sm md:text-base lg:text-lg">
                  Split Bill
                </span>
              </button>
              <button className="btn-press flex items-center justify-center gap-3 md:gap-4 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl bg-[#18262e] border border-white/5 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-gray-400 text-xl md:text-2xl lg:text-3xl">
                  thumb_up
                </span>
                <span className="text-gray-200 font-medium text-sm md:text-base lg:text-lg">
                  Feedback
                </span>
              </button>
            </div>

            <button className="btn-press mt-2 flex items-center justify-center gap-2 md:gap-3 py-3 md:py-4">
              <span className="material-symbols-outlined text-gray-500 text-lg md:text-xl">
                translate
              </span>
              <span className="text-gray-500 text-sm md:text-base font-medium">
                Change Language
              </span>
            </button>
          </div>
        </section>
      </main>

      {/* Active Request Cards Stack */}
      {requests.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 w-full max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl mx-auto">
          <div className="flex flex-col-reverse gap-2">
            {visibleRequests.map((request, index) => {
              // Ensure ref exists
              if (!cardRefs.current[request.id]) {
                cardRefs.current[request.id] = React.createRef();
              }
              return (
                <div
                  key={request.id}
                  className={`animate-card-entrance ${index === 0 ? "z-10" : "z-0 -mt-2"}`}
                >
                  <RequestCard
                    ref={cardRefs.current[request.id]}
                    request={request}
                    isTopCard={index === 0}
                    isCollapsed={index > 0}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onRetry={handleRetry}
                  />
                </div>
              );
            })}
            {hiddenCount > 0 && (
              <div className="text-xs text-gray-400 text-center py-2">
                +{hiddenCount} more
              </div>
            )}
          </div>
          {/* Bottom safe area spacer */}
          <div className="h-2 md:h-4"></div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md animate-fade-in">
          {toast}
        </div>
      )}

      {/* Edit Bottom Sheet */}
      {editingRequest && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end animate-fade-in">
          <div className="w-full bg-[#1c2a33] rounded-t-[2rem] p-6 pb-10 animate-slide-up">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-white mb-4">{editingRequest.title}</h3>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleEditCancel(editingRequest.id)}
                className="w-full py-4 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Cancel Request
              </button>
              <button
                onClick={handleEditClose}
                className="w-full py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
