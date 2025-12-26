import React, { useMemo, useState, useRef, useEffect, useCallback } from "react";
import EntryScreen from "./components/EntryScreen";
import ConnectionScreen from "./components/ConnectionScreen";
import ServiceScreen from "./components/ServiceScreen";
import TrackerScreen from "./components/TrackerScreen";
import BillScreen from "./components/BillScreen";
import FeedbackScreen from "./components/FeedbackScreen";

export default function TableAccessScanOrEnter() {
  const [tableCode, setTableCode] = useState("");
  const [currentScreen, setCurrentScreen] = useState("entry"); // "entry", "connection", "service", "tracker", "bill", or "feedback"
  const [guests, setGuests] = useState(2);
  const [language, setLanguage] = useState("EN");
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Shared requests state
  const [requests, setRequests] = useState([]);
  const requestIds = useRef(0);
  const lastRequestTime = useRef({});
  const feedbackShownFor = useRef(new Set()); // Track which bill requests have shown feedback

  const normalized = useMemo(() => tableCode.trim().toUpperCase(), [tableCode]);
  const canContinue = useMemo(() => {
    // Accept examples like T12, 12, A10, TABLE12 (customize as you like)
    if (!normalized) return false;
    return /^[A-Z]{0,6}\d{1,4}$/.test(normalized) || /^T\d{1,4}$/.test(normalized);
  }, [normalized]);

  // Auto-advance status for demo purposes (simulate staff actions)
  useEffect(() => {
    const interval = setInterval(() => {
      setRequests((prev) =>
        prev.map((req) => {
          if (req.status === "Done" || req.status === "Cancelled" || req.failed) return req;
          
          const age = Date.now() - req.createdAt;
          const ageSeconds = age / 1000;
          
          // Simulate status progression: Sent → Seen → On way → Done
          if (req.status === "Sent" && ageSeconds > 3) {
            return { ...req, status: "Seen", statusChangedAt: Date.now() };
          } else if (req.status === "Seen" && ageSeconds > 8) {
            return { ...req, status: "On way", statusChangedAt: Date.now() };
          } else if (req.status === "On way" && ageSeconds > 15) {
            return { ...req, status: "Done", statusChangedAt: Date.now() };
          }
          return req;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Show feedback screen when a bill request is completed
  useEffect(() => {
    const completedBillRequest = requests.find(
      (req) =>
        req.type === "bill-request" &&
        req.status === "Done" &&
        !feedbackShownFor.current.has(req.id)
    );

    if (completedBillRequest && !showFeedback) {
      feedbackShownFor.current.add(completedBillRequest.id);
      setShowFeedback(true);
      setCurrentScreen("feedback");
    }
  }, [requests, showFeedback]);

  const handleContinue = () => {
    setCurrentScreen("connection");
  };

  const handleStartOrder = () => {
    setCurrentScreen("service");
  };

  const handleBackToEntry = () => {
    setCurrentScreen("entry");
  };

  const handleViewRequests = () => {
    setCurrentScreen("tracker");
  };

  const handleNewRequest = () => {
    setCurrentScreen("service");
  };

  const handleViewBill = () => {
    setCurrentScreen("bill");
  };

  const handleBackFromBill = () => {
    setCurrentScreen("service");
  };

  const handleCloseFeedback = () => {
    setShowFeedback(false);
    setCurrentScreen("service");
  };

  const handleSubmitFeedback = useCallback((feedbackData) => {
    // Handle feedback submission (e.g., send to server)
    console.log("Feedback submitted:", feedbackData);
    // You can add API call here to submit feedback
  }, []);

  const handleSendBillRequest = useCallback((billData) => {
    const now = Date.now();
    const newRequest = {
      id: `req-${requestIds.current++}`,
      type: "bill-request",
      title: "Bill Request",
      icon: "receipt_long",
      status: "Sent",
      createdAt: now,
      statusChangedAt: now,
      failed: false,
      billData: billData, // Store bill details
    };

    setRequests((prev) => [newRequest, ...prev]);
  }, [requestIds]);

  const handleDeleteRequest = useCallback((requestId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === requestId && req.status !== "Done"
          ? { ...req, status: "Cancelled", statusChangedAt: Date.now() }
          : req
      )
    );
  }, []);

  // Render based on current screen
  if (currentScreen === "feedback") {
    return (
      <FeedbackScreen
        onClose={handleCloseFeedback}
        onSubmit={handleSubmitFeedback}
      />
    );
  }

  if (currentScreen === "bill") {
    return (
      <BillScreen
        normalized={normalized}
        onSendRequest={handleSendBillRequest}
        onBack={handleBackFromBill}
      />
    );
  }

  if (currentScreen === "tracker") {
    return (
      <TrackerScreen
        normalized={normalized}
        requests={requests}
        onNewRequest={handleNewRequest}
        onDeleteRequest={handleDeleteRequest}
        onViewBill={handleViewBill}
      />
    );
  }

  if (currentScreen === "service") {
    return (
      <ServiceScreen
        normalized={normalized}
        requests={requests}
        setRequests={setRequests}
        onViewMenu={handleViewRequests}
        onViewBill={handleViewBill}
        requestIds={requestIds}
        lastRequestTime={lastRequestTime}
      />
    );
  }

  if (currentScreen === "connection") {
    return (
      <ConnectionScreen
        normalized={normalized}
        guests={guests}
        setGuests={setGuests}
        language={language}
        setLanguage={setLanguage}
        onStartOrder={handleStartOrder}
        onBack={handleBackToEntry}
      />
    );
  }

  // Default: Entry Screen
  return (
    <EntryScreen
      tableCode={tableCode}
      setTableCode={setTableCode}
      canContinue={canContinue}
      onContinue={handleContinue}
    />
  );
}
