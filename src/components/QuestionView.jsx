import { useState } from "react";
import { Highlight, themes } from "prism-react-renderer";
import "./QuestionView.css";

function CodeBlock({ code }) {
  return (
    <Highlight theme={themes.nightOwl} code={code} language="javascript">
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre className="code-block" style={style}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span className="line-number">{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}

function CrossQuestion({ cq, index }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="cross-question">
      <h4 className="cq-title">
        Cross Question {index + 1}
      </h4>
      <p className="cq-text">{cq.question}</p>
      <textarea
        className="answer-input"
        placeholder="Type your answer here..."
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        rows={3}
      />
      {!revealed ? (
        <button className="btn btn-reveal" onClick={() => setRevealed(true)}>
          Compare Answer
        </button>
      ) : (
        <div className="answer-reveal cq-answer">
          <div className="answer-label">Ideal Answer:</div>
          <p>{cq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function QuestionView({ question }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [showCrossQuestions, setShowCrossQuestions] = useState(false);

  const handleReveal = () => {
    setShowAnswer(true);
  };

  const handleShowCross = () => {
    setShowCrossQuestions(true);
  };

  const handleReset = () => {
    setUserAnswer("");
    setShowAnswer(false);
    setShowCrossQuestions(false);
  };

  if (!question) {
    return (
      <div className="question-view empty-state">
        <div className="empty-icon">💡</div>
        <h2>Select a question to begin</h2>
        <p>Choose a topic from the sidebar and pick a question to practice.</p>
      </div>
    );
  }

  return (
    <div className="question-view" key={question.id}>
      <div className="question-header">
        <span className="question-number">Question {question.id}</span>
        <span className="question-topic">{question.topic}</span>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="question-body">
        <h3 className="section-title">What is the output?</h3>
        <CodeBlock code={question.code} />

        <div className="answer-section">
          <h3 className="section-title">Your Answer</h3>
          <textarea
            className="answer-input main-answer"
            placeholder="Predict the output and explain why..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            rows={4}
          />

          {!showAnswer ? (
            <button className="btn btn-primary" onClick={handleReveal}>
              Reveal Answer
            </button>
          ) : (
            <div className="answer-reveal">
              <div className="answer-card">
                <div className="answer-label">Correct Output:</div>
                <pre className="answer-output">{question.answer}</pre>
              </div>
              <div className="answer-card why-card">
                <div className="answer-label">Why:</div>
                <p>{question.why}</p>
              </div>

              {!showCrossQuestions && question.crossQuestions.length > 0 && (
                <button className="btn btn-secondary" onClick={handleShowCross}>
                  Show Cross Questions ({question.crossQuestions.length})
                </button>
              )}
            </div>
          )}
        </div>

        {showCrossQuestions && (
          <div className="cross-questions-section">
            <h3 className="section-title">Cross Questions</h3>
            {question.crossQuestions.map((cq, idx) => (
              <CrossQuestion key={idx} cq={cq} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
