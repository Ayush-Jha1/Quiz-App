/**
 * Main Quiz Application Component
 *
 * This is the parent component that manages the entire quiz flow:
 * - Tracks current question, user score, and quiz completion status
 * - Handles user answer selection and verification
 * - Records time taken to complete the quiz
 * - Shows either questions or final results based on quiz status
 */
import React, { useState, useEffect } from "react";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";
import { quizQuestions } from "../data/quizQuestions";

const QuizApp = () => {
  // Core quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Question interaction state
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // Quiz tracking data
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [quizEndTime, setQuizEndTime] = useState(null);

  // Start the timer when the quiz begins
  useEffect(() => {
    // Only set the start time if it hasn't been set yet and quiz isn't completed
    if (!quizStartTime && !quizCompleted) {
      setQuizStartTime(new Date());
    }
  }, [quizStartTime, quizCompleted]);

  // Handle when a user selects an answer option
  const handleOptionSelect = (index) => {
    // Only allow selection if the answer hasn't been submitted yet
    if (!answerSubmitted) {
      setSelectedOption(index);
    }
  };

  // Handle the "Submit Answer" / "Next Question" button click
  const handleNextQuestion = () => {
    // If answer not yet submitted, process the user's answer
    if (!answerSubmitted) {
      const currentQuestion = quizQuestions[currentQuestionIndex];
      const isCorrect = selectedOption === currentQuestion.correctAnswer;

      // Increase score if answer is correct
      if (isCorrect) {
        setScore(score + 1);
      }

      // Save answer details for results page
      setUserAnswers([
        ...userAnswers,
        {
          questionId: currentQuestion.id,
          userAnswer: selectedOption,
          correctAnswer: currentQuestion.correctAnswer,
          isCorrect: isCorrect,
        },
      ]);

      // Mark this answer as submitted to show feedback
      setAnswerSubmitted(true);
    }
    // If answer was already submitted, move to next question
    else {
      const nextIndex = currentQuestionIndex + 1;

      // If there are more questions, go to the next one
      if (nextIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
        setSelectedOption(null);
        setAnswerSubmitted(false);
      }
      // If no more questions, complete the quiz
      else {
        setQuizEndTime(new Date());
        setQuizCompleted(true);
      }
    }
  };

  // Reset all state to start a new quiz
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setAnswerSubmitted(false);
    setQuizCompleted(false);
    setUserAnswers([]);
    setQuizStartTime(new Date());
    setQuizEndTime(null);
  };

  // Calculate time taken to complete the quiz
  const getTimeTaken = () => {
    if (!quizStartTime || !quizEndTime) return null;

    // Calculate time difference in seconds
    const timeDiff = Math.floor((quizEndTime - quizStartTime) / 1000);
    const minutes = Math.floor(timeDiff / 60);
    const seconds = timeDiff % 60;

    return {
      minutes,
      seconds,
      totalSeconds: timeDiff,
    };
  };

  return (
    <div className="quiz-app">
      <h1 className="quiz-title">QuizApp</h1>

      <div className="quiz-container">
        {/* Show either the question or the results based on quiz completion */}
        {!quizCompleted ? (
          <QuizQuestion
            question={quizQuestions[currentQuestionIndex]}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={quizQuestions.length}
            score={score}
            selectedOption={selectedOption}
            answerSubmitted={answerSubmitted}
            onOptionSelect={handleOptionSelect}
            onNextQuestion={handleNextQuestion}
          />
        ) : (
          <QuizResults
            score={score}
            totalQuestions={quizQuestions.length}
            timeTaken={getTimeTaken()}
            userAnswers={userAnswers}
            onRestartQuiz={handleRestartQuiz}
          />
        )}
      </div>

      <p className="footer-text">© 2025 Knowledge Quiz App</p>
    </div>
  );
};

export default QuizApp;
