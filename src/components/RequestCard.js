import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";

const STATUS_STEPS = ["Sent", "Seen", "On way", "Done"];

const RequestCard = forwardRef(({ 
  request, 
  isTopCard, 
  onDelete, 
  onEdit,
  onRetry,
  isCollapsed 
}, ref) => {
  const [timeAgo, setTimeAgo] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusIndex = STATUS_STEPS.indexOf(request.status);
  const isDone = request.status === "Done";

  // Expose shake method to parent via ref
  useImperativeHandle(ref, () => ({
    shake: () => {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 200);
    },
  }));

  // Update time ago every minute
  useEffect(() => {
    const updateTimeAgo = () => {
      const now = Date.now();
      const diffMs = now - request.createdAt;
      const diffMins = Math.floor(diffMs / 60000);
      const diffSecs = Math.floor(diffMs / 1000);

      if (diffSecs < 10) {
        setTimeAgo("just now");
      } else if (diffSecs < 60) {
        setTimeAgo(`${diffSecs}s ago`);
      } else if (diffMins === 1) {
        setTimeAgo("1m ago");
      } else {
        setTimeAgo(`${diffMins}m ago`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 10000); // Update every 10 seconds
    return () => clearInterval(interval);
  }, [request.createdAt]);

  const getSubtitle = () => {
    if (request.status === "Sent") return `Sent • ${timeAgo}`;
    if (request.status === "Seen") return `Seen • ${timeAgo}`;
    if (request.status === "On way") return `On the way • ${timeAgo}`;
    if (request.status === "Done") return `Completed • ${timeAgo}`;
    return `${request.status} • ${timeAgo}`;
  };

  const handleDeleteClick = () => {
    if (isDone) return; // Don't allow delete for done requests
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(request.id);
    }, 300);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  if (isDeleting) {
    return null;
  }

  const cardClasses = `
    bg-[#1c2a33]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl 
    overflow-hidden relative transition-all duration-300
    ${isTopCard ? "scale-100 opacity-100" : "scale-[0.95] opacity-80"}
    ${isShaking ? "animate-shake" : ""}
    ${isCollapsed ? "mb-2" : ""}
  `;

  return (
    <>
      <div className={cardClasses}>
        {/* Progress Line Background */}
        <div className="absolute top-0 left-0 h-1 md:h-1.5 bg-white/10 w-full">
          <div 
            className="h-full bg-[#13a4ec] transition-all duration-300 shadow-[0_0_10px_rgba(19,164,236,0.5)]"
            style={{ 
              width: `${((statusIndex + 1) / STATUS_STEPS.length) * 100}%` 
            }}
          />
        </div>

        <div className="p-4 md:p-5 lg:p-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 md:gap-4">
              <div 
                className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full text-[#13a4ec] transition-all duration-300 ${
                  isDone ? "bg-green-500/20 text-green-400" : "bg-[#13a4ec]/20 animate-pulse"
                }`}
              >
                <span className="material-symbols-outlined text-xl md:text-2xl lg:text-3xl">
                  {request.icon}
                </span>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm md:text-base lg:text-lg">
                  {request.title}
                </h3>
                {request.failed ? (
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-red-400 text-xs md:text-sm font-medium">
                      Failed to send
                    </p>
                    <button
                      onClick={() => onRetry(request.id)}
                      className="text-[#13a4ec] text-xs font-medium hover:underline"
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <p className="text-[#13a4ec] text-xs md:text-sm font-medium mt-0.5">
                    {getSubtitle()}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isDone && (
                <button
                  onClick={() => onEdit(request)}
                  className="text-xs md:text-sm text-gray-400 font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 hover:bg-white/5 transition-colors"
                >
                  Edit
                </button>
              )}
              {!isDone && (
                <button
                  onClick={handleDeleteClick}
                  className="text-xs md:text-sm text-red-400 font-medium px-2 md:px-3 py-1.5 md:py-2 rounded-full border border-red-400/20 hover:bg-red-400/10 transition-colors"
                >
                  <span className="material-symbols-outlined text-base md:text-lg">
                    delete
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Status Timeline - Only show if top card or expanded */}
          {(isTopCard || !isCollapsed) && (
            <div className="flex items-center justify-between px-2 md:px-4 pt-4 mt-2">
              {STATUS_STEPS.map((step, index) => {
                const isActive = index === statusIndex;
                const isCompleted = index < statusIndex;
                const isCurrent = index === statusIndex && !isDone;

                return (
                  <React.Fragment key={step}>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`transition-all duration-300 ${
                          isCompleted || isDone
                            ? "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-[#13a4ec]"
                            : isCurrent
                            ? "w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-[#13a4ec] bg-[#101c22] shadow-[0_0_8px_rgba(19,164,236,0.6)]"
                            : "w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-white/20"
                        }`}
                      />
                      <span
                        className={`text-[10px] md:text-xs transition-colors ${
                          isActive ? "text-white font-bold" : "text-gray-400"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                    {index < STATUS_STEPS.length - 1 && (
                      <div
                        className={`h-[1px] md:h-[2px] flex-1 mx-1 transition-all duration-300 ${
                          isCompleted || (isDone && index < STATUS_STEPS.length - 1)
                            ? "bg-[#13a4ec]/50"
                            : "bg-white/10"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Bottom Sheet */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end animate-fade-in">
          <div className="w-full bg-[#1c2a33] rounded-t-[2rem] p-6 pb-10 animate-slide-up">
            <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-white mb-4">Cancel this request?</h3>
            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
              >
                Keep
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 py-4 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

RequestCard.displayName = "RequestCard";

export default RequestCard;

