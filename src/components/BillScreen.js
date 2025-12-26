import React, { useState, useMemo } from "react";

export default function BillScreen({ normalized, onSendRequest, onBack }) {
  const [baseAmount] = useState(145.50);
  const [gratuityPercent, setGratuityPercent] = useState(18);
  const [customGratuity, setCustomGratuity] = useState("");
  const [isCustomGratuity, setIsCustomGratuity] = useState(false);
  const [splitCount, setSplitCount] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState("machine");

  // Calculate tip amount
  const tipAmount = useMemo(() => {
    if (isCustomGratuity && customGratuity) {
      return parseFloat(customGratuity) || 0;
    }
    return (baseAmount * gratuityPercent) / 100;
  }, [baseAmount, gratuityPercent, customGratuity, isCustomGratuity]);

  // Calculate total with tip
  const totalWithTip = useMemo(() => {
    return baseAmount + tipAmount;
  }, [baseAmount, tipAmount]);

  // Calculate per person amount when split
  const perPersonAmount = useMemo(() => {
    if (splitCount > 1) {
      return totalWithTip / splitCount;
    }
    return totalWithTip;
  }, [totalWithTip, splitCount]);

  const handleGratuityChange = (value) => {
    if (value === "custom") {
      setIsCustomGratuity(true);
      setGratuityPercent(0);
    } else {
      setIsCustomGratuity(false);
      setGratuityPercent(parseInt(value));
      setCustomGratuity("");
    }
  };

  const handleSplitIncrement = () => {
    setSplitCount((prev) => Math.min(prev + 1, 20));
  };

  const handleSplitDecrement = () => {
    setSplitCount((prev) => Math.max(prev - 1, 2));
  };

  const handleSendRequest = () => {
    // Create a bill request
    const requestData = {
      type: "bill-request",
      title: "Bill Request",
      icon: "receipt_long",
      amount: totalWithTip,
      tipAmount: tipAmount,
      splitCount: splitCount > 1 ? splitCount : null,
      paymentMethod: paymentMethod,
    };

    if (onSendRequest) {
      onSendRequest(requestData);
    }

    // Navigate back if onBack is provided
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="relative z-10 flex h-screen w-full flex-col justify-end bg-black">
      {/* Background Image Simulation (Restaurant Ambiance) */}
      <div className="fixed inset-0 z-0">
        <img
          alt="Dark moody restaurant interior with warm lighting"
          className="h-full w-full object-cover opacity-40"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7ApLlrtOX6JcIiQBxa1p1t9NsNrSxe6Z0PHDwJbtC3vR4oJvrm2orhyNxbVDnzxapMqetlenxuhP_4mwPl1n_7gWQ_gc9tKETmUys8Y6kFVlCYoXBr4c2k2FCTVnF4Io5MlMEC_3xlVRIVUeaz4Yvv_pEyH3yDwN2gfiJ7YUUV-TVdIzSl_jSPN4Yd5ghyQQugWuZrXlALIVxRhwJbPxyL2wpAoPYxVipl2hwnErvj2O9OXTmIe_teocItPZMYXQCWqrZnZ1gKz1i"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-[#0f1115]/80 to-transparent"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex h-screen w-full flex-col justify-end">
        {/* Bottom Sheet Container */}
        <div className="glass-panel-bill w-full rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col max-h-[92vh] transition-transform duration-300 ease-out">
          {/* Handle */}
          <div className="flex flex-col items-center pt-4 pb-2 flex-shrink-0">
            <div className="h-1.5 w-12 rounded-full bg-[#325567]/60"></div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto no-scrollbar pb-32">
            {/* Header */}
            <div className="px-6 pt-2 pb-6">
              <div className="flex justify-between items-end">
                <h1 className="text-3xl font-light tracking-tight text-white">Request Bill</h1>
                <span className="text-xs font-medium text-white/50 bg-white/10 px-2 py-1 rounded-full mb-1">
                  Table {normalized}
                </span>
              </div>
            </div>

            {/* Total Amount Card */}
            <div className="px-6 mb-8">
              <div className="flex flex-col gap-1 items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-[#1e2d3d] to-[#111c22] border border-white/5 shadow-lg relative overflow-hidden group">
                {/* Subtle glow effect behind text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 blur-[50px] rounded-full"></div>
                <p className="relative z-10 text-[#92b7c9] text-sm font-medium tracking-wide uppercase">
                  Total Amount
                </p>
                <div className="relative z-10 flex items-baseline gap-1">
                  <span className="text-2xl text-white/80 font-light">$</span>
                  <span className="text-5xl font-bold text-white tracking-tighter">
                    {baseAmount.toFixed(2)}
                  </span>
                </div>
                <button className="relative z-10 mt-3 text-xs text-primary font-medium flex items-center gap-1 hover:text-primary/80 transition-colors">
                  View Breakdown{" "}
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Gratuity Section */}
            <div className="px-6 mb-8">
              <h3 className="text-white/90 text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">
                  sentiment_satisfied
                </span>
                Add Gratuity
              </h3>
              <div className="flex p-1 bg-surface-highlight rounded-xl">
                <label className="flex-1 cursor-pointer">
                  <input
                    className="sr-only"
                    name="tip"
                    type="radio"
                    value="15"
                    checked={!isCustomGratuity && gratuityPercent === 15}
                    onChange={(e) => handleGratuityChange(e.target.value)}
                  />
                  <div
                    className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                      !isCustomGratuity && gratuityPercent === 15
                        ? "bg-primary text-white shadow-md"
                        : "text-[#92b7c9]"
                    }`}
                  >
                    15%
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    className="sr-only"
                    name="tip"
                    type="radio"
                    value="18"
                    checked={!isCustomGratuity && gratuityPercent === 18}
                    onChange={(e) => handleGratuityChange(e.target.value)}
                  />
                  <div
                    className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                      !isCustomGratuity && gratuityPercent === 18
                        ? "bg-primary text-white shadow-md"
                        : "text-[#92b7c9]"
                    }`}
                  >
                    18%
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    className="sr-only"
                    name="tip"
                    type="radio"
                    value="20"
                    checked={!isCustomGratuity && gratuityPercent === 20}
                    onChange={(e) => handleGratuityChange(e.target.value)}
                  />
                  <div
                    className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                      !isCustomGratuity && gratuityPercent === 20
                        ? "bg-primary text-white shadow-md"
                        : "text-[#92b7c9]"
                    }`}
                  >
                    20%
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input
                    className="sr-only"
                    name="tip"
                    type="radio"
                    value="custom"
                    checked={isCustomGratuity}
                    onChange={(e) => handleGratuityChange(e.target.value)}
                  />
                  <div
                    className={`h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
                      isCustomGratuity
                        ? "bg-surface-dark text-white border border-white/10"
                        : "text-[#92b7c9]"
                    }`}
                  >
                    Custom
                  </div>
                </label>
              </div>
              {isCustomGratuity && (
                <div className="mt-3">
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customGratuity}
                    onChange={(e) => setCustomGratuity(e.target.value)}
                    className="w-full bg-surface-dark border border-white/10 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-primary"
                  />
                </div>
              )}
              <div className="mt-2 text-right">
                <span className="text-xs text-white/50">
                  Tip Amount: <span className="text-white font-medium">${tipAmount.toFixed(2)}</span>
                </span>
              </div>
            </div>

            {/* Split Bill Toggle */}
            <div className="px-6 mb-8">
              <div className="flex items-center justify-between p-4 rounded-xl bg-surface-dark border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#233c48] flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">call_split</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Split Bill</span>
                    <span className="text-xs text-white/50">Divide the total evenly</span>
                  </div>
                </div>
                {/* Split Count Stepper */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-[#111c22] rounded-lg p-1 border border-white/10">
                    <button
                      onClick={handleSplitDecrement}
                      disabled={splitCount <= 2}
                      className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-white">{splitCount}</span>
                    <button
                      onClick={handleSplitIncrement}
                      disabled={splitCount >= 20}
                      className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
              </div>
              {splitCount > 1 && (
                <div className="mt-2 text-right">
                  <span className="text-xs text-white/50">
                    Per person: <span className="text-primary font-bold">${perPersonAmount.toFixed(2)}</span>
                  </span>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="px-6 mb-4">
              <h3 className="text-white/90 text-sm font-semibold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-lg">payments</span>
                Payment Method
              </h3>
              <div className="flex flex-col gap-3">
                {/* Option 1: Card Machine */}
                <label
                  className={`relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border group bg-surface-dark ${
                    paymentMethod === "machine"
                      ? "border-primary shadow-[0_0_15px_rgba(19,164,236,0.15)]"
                      : "border-transparent hover:border-primary/50"
                  }`}
                >
                  <input
                    className="sr-only"
                    name="payment_method"
                    type="radio"
                    value="machine"
                    checked={paymentMethod === "machine"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        paymentMethod === "machine"
                          ? "bg-primary text-white"
                          : "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined">point_of_sale</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Bring Card Machine</p>
                      <p className="text-xs text-white/40">Pay with card at the table</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === "machine"
                        ? "border-primary bg-primary"
                        : "border-white/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-white transition-opacity ${
                        paymentMethod === "machine" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                </label>

                {/* Option 2: Apple Pay / Online */}
                <label className="relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent bg-surface-dark hover:bg-surface-highlight group">
                  <input
                    className="sr-only"
                    name="payment_method"
                    type="radio"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        paymentMethod === "online"
                          ? "bg-primary/20 text-primary"
                          : "bg-[#233c48] text-[#92b7c9] group-hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined">phonelink_ring</span>
                    </div>
                    <div>
                      <p className="text-white/80 font-medium text-sm">Pay Online</p>
                      <p className="text-xs text-white/40">Apple Pay, Google Pay</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === "online"
                        ? "border-primary bg-primary"
                        : "border-white/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-white transition-opacity ${
                        paymentMethod === "online" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                </label>

                {/* Option 3: Cash */}
                <label className="relative flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 border border-transparent bg-surface-dark hover:bg-surface-highlight group">
                  <input
                    className="sr-only"
                    name="payment_method"
                    type="radio"
                    value="cash"
                    checked={paymentMethod === "cash"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        paymentMethod === "cash"
                          ? "bg-primary/20 text-primary"
                          : "bg-[#233c48] text-[#92b7c9] group-hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined">attach_money</span>
                    </div>
                    <div>
                      <p className="text-white/80 font-medium text-sm">Cash</p>
                      <p className="text-xs text-white/40">I will pay with cash</p>
                    </div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      paymentMethod === "cash" ? "border-primary bg-primary" : "border-white/20"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full bg-white transition-opacity ${
                        paymentMethod === "cash" ? "opacity-100" : "opacity-0"
                      }`}
                    ></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Sticky Footer Action */}
          <div className="absolute bottom-0 left-0 w-full p-6 pb-8 bg-gradient-to-t from-[#111c22] via-[#111c22] to-transparent pointer-events-none">
            <button
              onClick={handleSendRequest}
              className="pointer-events-auto w-full group relative flex items-center justify-center overflow-hidden rounded-2xl bg-primary p-4 transition-transform active:scale-[0.98] shadow-[0_0_30px_rgba(19,164,236,0.4)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              <span className="material-symbols-outlined mr-2 text-white">send</span>
              <span className="text-lg font-bold text-white">Send Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

