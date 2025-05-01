/**
 * Main App Component
 * 
 * This is the root component that renders the QuizApp.
 * We've simplified it to remove any unused imports and dependencies.
 */
import React from "react";
import QuizApp from "./components/QuizApp";
import "./styles/quiz.css";

function App() {
  return (
    <div className="app-container">
      <QuizApp />
    </div>
  );
}

export default App;
