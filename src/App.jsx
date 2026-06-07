import { useState } from "react";
import Sidebar from "./components/Sidebar";
import QuestionView from "./components/QuestionView";
import questions from "./data/questions";
import "./App.css";

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const selected = questions.find((q) => q.id === selectedId) || null;

  const handleSelect = (id) => {
    setSelectedId(id);
    setSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? "✕" : "☰"}
      </button>
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <Sidebar
        selectedId={selectedId}
        onSelect={handleSelect}
        isOpen={sidebarOpen}
      />
      <QuestionView question={selected} />
    </div>
  );
}

export default App;
