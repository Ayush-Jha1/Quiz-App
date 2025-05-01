/**
 * Quiz Question Component
 * 
 * This component displays a single quiz question with:
 * - A progress bar showing quiz completion
 * - The current question text
 * - Multiple choice answer options
 * - Feedback after submitting an answer
 * - Button to submit answer or move to next question
 */
import React from 'react';

const QuizQuestion = ({ 
  question,              // The current question object with text, options, correctAnswer
  currentQuestionIndex,  // Index of current question (0-based)
  totalQuestions,        // Total number of questions in the quiz
  score,                 // Current user score
  selectedOption,        // The option index that user selected (null if none selected)
  answerSubmitted,       // Whether the answer was submitted for evaluation
  onOptionSelect,        // Function to call when user selects an option
  onNextQuestion         // Function to call when user submits answer or moves to next question
}) => {
  // Check if this is the last question to adjust button text
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  
  // Determine the CSS classes for answer option buttons
  const getOptionClass = (index) => {
    let baseClass = "option-btn";
    
    // Highlight the selected option before submission
    if (!answerSubmitted && selectedOption === index) {
      baseClass += " selected";
    }
    
    // After submission, show correct and wrong answers
    if (answerSubmitted) {
      if (index === question.correctAnswer) {
        // Highlight the correct answer in green
        baseClass += " correct-answer";
      } else if (index === selectedOption && selectedOption !== question.correctAnswer) {
        // Highlight the wrong selected answer in red
        baseClass += " wrong-answer";
      }
    }
    
    return baseClass;
  };

  // Show feedback message after user submits an answer
  const renderFeedback = () => {
    // Don't show feedback until an answer is submitted
    if (!answerSubmitted) return null;
    
    const isCorrect = selectedOption === question.correctAnswer;
    
    return (
      <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
        <div className="feedback-icon">{isCorrect ? '✓' : '✗'}</div>
        <p>
          {isCorrect 
            ? 'Correct! Great job!' 
            : `Incorrect. The right answer is: ${question.options[question.correctAnswer]}`}
        </p>
      </div>
    );
  };
  
  // Calculate how full the progress bar should be
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  return (
    <div className="question-container">
      {/* Progress bar showing quiz completion */}
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="progress-info">
          <span className="progress-text">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
          <span className="score-text">Score: {score}</span>
        </div>
      </div>
      
      {/* The question text */}
      <h2 className="question-text">{question.text}</h2>
      
      {/* Multiple choice answer options */}
      <div className="options-container">
        {question.options.map((option, index) => (
          <button 
            key={index}
            className={getOptionClass(index)}
            onClick={() => onOptionSelect(index)}
            disabled={answerSubmitted} // Disable options after submission
          >
            {option}
          </button>
        ))}
      </div>
      
      {/* Feedback shown after answer submission */}
      {renderFeedback()}
      
      {/* Button to submit answer or move to next question */}
      <button 
        className="next-button"
        onClick={onNextQuestion}
        disabled={selectedOption === null} // Disable if no option selected
      >
        {/* Button text changes based on quiz state */}
        {answerSubmitted 
          ? (isLastQuestion ? 'Finish Quiz' : 'Next Question') 
          : 'Submit Answer'}
      </button>
    </div>
  );
};

export default QuizQuestion;
