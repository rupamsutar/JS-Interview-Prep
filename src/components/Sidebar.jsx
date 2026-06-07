import { useState } from "react";
import questions, { topics } from "../data/questions";
import "./Sidebar.css";

export default function Sidebar({ selectedId, onSelect, isOpen }) {
  const [expandedTopic, setExpandedTopic] = useState(null);

  const grouped = topics.map((topic) => ({
    topic,
    items: questions.filter((q) => q.topic === topic),
  }));

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>JS Interview Prep</h2>
        <span className="sidebar-badge">{questions.length} Questions</span>
      </div>
      <nav className="sidebar-nav">
        {grouped.map(({ topic, items }) => (
          <div key={topic} className="sidebar-group">
            <button
              className={`sidebar-topic ${expandedTopic === topic ? "expanded" : ""}`}
              onClick={() =>
                setExpandedTopic(expandedTopic === topic ? null : topic)
              }
            >
              <span className="topic-arrow">{expandedTopic === topic ? "▾" : "▸"}</span>
              <span className="topic-name">{topic}</span>
              <span className="topic-count">{items.length}</span>
            </button>
            {expandedTopic === topic && (
              <ul className="sidebar-questions">
                {items.map((q) => (
                  <li key={q.id}>
                    <button
                      className={`sidebar-question ${selectedId === q.id ? "active" : ""}`}
                      onClick={() => onSelect(q.id)}
                    >
                      Q{q.id}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
