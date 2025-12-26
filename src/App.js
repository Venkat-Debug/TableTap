import React, { useMemo, useState, useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";

export default function TableAccessScanOrEnter() {
  const [tableCode, setTableCode] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState("");
  const scannerRef = useRef(null);
  const qrCodeRegionId = "qr-reader";

  const normalized = useMemo(() => tableCode.trim().toUpperCase(), [tableCode]);
  const canContinue = useMemo(() => {
    // Accept examples like T12, 12, A10, TABLE12 (customize as you like)
    if (!normalized) return false;
    return /^[A-Z]{0,6}\d{1,4}$/.test(normalized) || /^T\d{1,4}$/.test(normalized);
  }, [normalized]);

  // Initialize QR scanner
  useEffect(() => {
    if (!isScanning || scannerRef.current) {
      return;
    }

    const html5QrCode = new Html5Qrcode(qrCodeRegionId);
    scannerRef.current = html5QrCode;

    // Start scanning
    html5QrCode.start(
      { facingMode: "environment" }, // Use back camera on mobile
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }, // Scanning area size
        aspectRatio: 1.0,
      },
      (decodedText) => {
        // Successfully scanned
        const trimmed = decodedText.trim().toUpperCase();
        setTableCode(trimmed);
        // Stop scanning after successful scan
        setIsScanning(false);
      },
      (errorMessage) => {
        // Scanning errors are handled silently (expected during scanning)
      }
    ).catch((err) => {
      setScanError("Camera access denied or not available");
      setIsScanning(false);
      scannerRef.current = null;
      console.error("QR Scanner error:", err);
    });

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current.clear();
          scannerRef.current = null;
        }).catch((err) => {
          console.error("Error stopping scanner:", err);
          scannerRef.current = null;
        });
      }
    };
  }, [isScanning]);

  const startScanning = () => {
    setScanError("");
    setIsScanning(true);
  };

  const stopScanning = () => {
    setIsScanning(false);
  };

  return (
    <div className="min-h-[100dvh] bg-[#101c22] text-white overflow-hidden selection:bg-[#0da6f2]/30">
      {/* Local styles for scan animation + orbs */}
      <style>{`
        @keyframes pulseSlow { 0%,100%{opacity:.25} 50%{opacity:.35} }
        @keyframes scanLine {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(14rem); opacity: 0; }
        }
        .gradient-orb {
          position: absolute; border-radius: 9999px; filter: blur(80px);
          opacity: 0.3; z-index: 0; pointer-events: none;
        }
        .camera-view {
          background: radial-gradient(circle at 50% 50%, #2a3b47 0%, #152028 100%);
          position: relative;
        }
        body { overscroll-behavior-y: none; }
        
        /* QR Scanner styling */
        #qr-reader {
          width: 100% !important;
          height: 100% !important;
          min-height: 400px !important;
        }
        #qr-reader__dashboard {
          display: none !important;
        }
        #qr-reader__camera_selection {
          display: none !important;
        }
        #qr-reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        #qr-reader__scan_region {
          width: 100% !important;
          height: 100% !important;
        }
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
        {/* Camera / QR Area */}
        <div className="relative flex-1 w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl isolate mb-6 group">
          {isScanning ? (
            <>
              {/* QR Scanner Container */}
              <div 
                id={qrCodeRegionId}
                className="w-full h-full relative"
                style={{ 
                  minHeight: '400px',
                  backgroundColor: '#000'
                }}
              />
              
              {/* Overlay with scan frame */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-6">
                {/* Scan frame corners */}
                <div className="relative w-64 h-64">
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#0da6f2] rounded-tl-2xl shadow-[0_0_20px_rgba(13,166,242,0.6)]" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#0da6f2] rounded-tr-2xl shadow-[0_0_20px_rgba(13,166,242,0.6)]" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#0da6f2] rounded-bl-2xl shadow-[0_0_20px_rgba(13,166,242,0.6)]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#0da6f2] rounded-br-2xl shadow-[0_0_20px_rgba(13,166,242,0.6)]" />
                </div>
              </div>

              {/* Stop scanning button */}
              <button
                onClick={stopScanning}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 bg-red-500/90 hover:bg-red-500 text-white font-semibold rounded-full shadow-lg backdrop-blur-md border border-white/20 transition-all active:scale-95"
              >
                Stop Scanning
              </button>

              {/* Error message */}
              {scanError && (
                <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/90 text-white text-sm font-semibold rounded-lg backdrop-blur-md">
                  {scanError}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Camera Background (when not scanning) */}
              <div className="absolute inset-0 camera-view">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-1/3 right-1/3 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                {/* Scan frame */}
                <div className="relative w-64 h-64">
                  {/* Corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-[#0da6f2] rounded-tl-2xl shadow-[0_0_20px_rgba(13,166,242,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(13,166,242,0.6)]" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-[#0da6f2] rounded-tr-2xl shadow-[0_0_20px_rgba(13,166,242,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(13,166,242,0.6)]" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-[#0da6f2] rounded-bl-2xl shadow-[0_0_20px_rgba(13,166,242,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(13,166,242,0.6)]" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-[#0da6f2] rounded-br-2xl shadow-[0_0_20px_rgba(13,166,242,0.4)] transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(13,166,242,0.6)]" />

                  {/* Scan line */}
                  <div
                    className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#0da6f2] to-transparent shadow-[0_0_15px_rgba(13,166,242,0.8)] opacity-100"
                    style={{ animation: "scanLine 2.5s ease-in-out infinite" }}
                  />
                </div>

                {/* Start scanning button */}
                <button
                  onClick={startScanning}
                  className="mt-8 px-6 py-3 bg-[#0da6f2] hover:bg-[#0da6f2]/90 text-white font-semibold rounded-full shadow-lg shadow-[#0da6f2]/25 transition-all active:scale-95 flex items-center gap-2"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  Start Camera Scan
                </button>

                {/* Hint pill */}
                <div className="mt-6 px-5 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg">
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
                          d="M3 7V5a2 2 0 0 1 2-2h2M21 7V5a2 2 0 0 0-2-2h-2M3 17v2a2 2 0 0 0 2 2h2M21 17v2a2 2 0 0 1-2 2h-2M7 12h10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    Tap to scan QR code
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-4 px-4 mb-5 shrink-0">
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
          <span className="text-[10px] font-extrabold text-white/30 uppercase tracking-[0.2em]">
            OR
          </span>
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent flex-1" />
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
            onClick={() => alert(`Continue with table: ${normalized}`)}
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
