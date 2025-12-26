import React, { useMemo, useState } from "react";
import EntryScreen from "./components/EntryScreen";
import ConnectionScreen from "./components/ConnectionScreen";
import ServiceScreen from "./components/ServiceScreen";

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

  const handleStartOrder = () => {
    setCurrentScreen("service");
  };

  const handleBackToEntry = () => {
    setCurrentScreen("entry");
  };

  // Render based on current screen
  if (currentScreen === "service") {
    return <ServiceScreen normalized={normalized} />;
  }

  if (currentScreen === "menu") {
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
