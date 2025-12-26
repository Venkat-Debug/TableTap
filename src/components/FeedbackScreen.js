import React, { useState } from "react";

const FEEDBACK_TAGS = [
  { id: "food-quality", label: "Food Quality", icon: "restaurant" },
  { id: "service-speed", label: "Service Speed", icon: null },
  { id: "atmosphere", label: "Atmosphere", icon: null },
  { id: "cleanliness", label: "Cleanliness", icon: "clean_hands" },
  { id: "value", label: "Value", icon: null },
];

export default function FeedbackScreen({ onClose, onSubmit }) {
  const [rating, setRating] = useState(4);
  const [selectedTags, setSelectedTags] = useState(["food-quality", "cleanliness"]);
  const [comments, setComments] = useState("");
  const [sendAnonymously, setSendAnonymously] = useState(false);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };

  const handleTagClick = (tagId) => {
    setSelectedTags((prev) => {
      if (prev.includes(tagId)) {
        return prev.filter((id) => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  const handleToggleAnonymously = () => {
    setSendAnonymously((prev) => !prev);
  };

  const handleSubmit = () => {
    const feedbackData = {
      rating,
      tags: selectedTags,
      comments: comments.trim(),
      sendAnonymously,
      submittedAt: Date.now(),
    };

    if (onSubmit) {
      onSubmit(feedbackData);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="relative z-50 flex flex-col h-full min-h-screen bg-[#050505]">
      {/* Ambient Background Gradients */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-20%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="relative z-10 flex flex-col h-full min-h-screen">
        {/* TopAppBar */}
        <div className="flex items-center p-6 justify-between w-full">
          <h2 className="text-white/90 text-sm uppercase tracking-widest font-semibold">Feedback</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors flex items-center justify-center rounded-full w-10 h-10 hover:bg-white/10"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Main Content Scroll Area */}
        <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
          {/* HeadlineText */}
          <div className="px-6 pt-4 pb-8 text-center">
            <h2 className="text-white text-3xl font-light leading-tight tracking-tight mb-2">
              We hope you enjoyed your meal.
            </h2>
            <p className="text-white/50 text-sm">Tap a star to rate your experience</p>
          </div>

          {/* Interactive Rating (ActionsBar variant) */}
          <div className="flex justify-center gap-3 px-6 pb-10">
            {[0, 1, 2, 3, 4].map((index) => (
              <button
                key={index}
                onClick={() => handleStarClick(index)}
                className="group transition-transform active:scale-90"
              >
                <span
                  className={`material-symbols-outlined ${
                    index < rating ? "filled text-primary" : "text-white/20"
                  } text-5xl ${
                    index < rating ? "drop-shadow-[0_0_15px_rgba(19,164,236,0.4)]" : ""
                  }`}
                >
                  star
                </span>
              </button>
            ))}
          </div>

          {/* Quick Tags Section */}
          <div className="px-6 mb-8 animate-fade-in-up">
            <h3 className="text-white/90 text-lg font-medium mb-4">What went well?</h3>
            <div className="flex flex-wrap gap-3">
              {FEEDBACK_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag.id);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagClick(tag.id)}
                    className={`glass-panel-feedback group flex h-10 items-center justify-center gap-x-2 rounded-full px-5 transition-all border ${
                      isSelected
                        ? "bg-primary/20 border-primary/50 hover:bg-primary/30"
                        : "border-transparent hover:bg-white/10"
                    }`}
                  >
                    {tag.icon && (
                      <span
                        className={`material-symbols-outlined ${
                          isSelected ? "filled text-primary" : "text-white/50"
                        } text-sm`}
                      >
                        {tag.icon}
                      </span>
                    )}
                    <span
                      className={`text-sm font-semibold ${
                        isSelected ? "text-primary" : "text-white/80 font-medium"
                      }`}
                    >
                      {tag.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comment Input */}
          <div className="px-6 mb-6">
            <label className="block text-white/90 text-lg font-medium mb-4" htmlFor="comment">
              Any specific comments?
            </label>
            <div className="relative group">
              <textarea
                className="glass-panel-feedback w-full rounded-2xl p-4 text-white placeholder-white/30 outline-none focus:border-primary/50 focus:bg-white/5 transition-all resize-none text-base"
                id="comment"
                placeholder="Tell us more about your experience (optional)..."
                rows="4"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
              {/* Decorative glow on focus */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity duration-500 blur-sm"></div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="fixed bottom-0 left-0 w-full z-20 px-6 pb-8 pt-6 bg-gradient-to-t from-black via-[#050505] to-transparent">
          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between mb-6 px-2">
            <span className="text-white/80 text-sm font-medium">Send anonymously</span>
            <button
              onClick={handleToggleAnonymously}
              aria-pressed={sendAnonymously}
              className={`relative w-12 h-7 rounded-full border transition-colors focus:outline-none ${
                sendAnonymously
                  ? "bg-primary border-primary"
                  : "bg-white/10 border-white/10"
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                  sendAnonymously ? "left-6" : "left-1"
                }`}
              ></span>
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full h-14 bg-primary hover:bg-[#0f8ccb] active:scale-[0.98] rounded-xl text-white font-semibold text-lg shadow-[0_0_25px_rgba(19,164,236,0.35)] transition-all flex items-center justify-center gap-2 group"
          >
            <span>Submit Feedback</span>
            <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

