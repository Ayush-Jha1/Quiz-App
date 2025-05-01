/**
 * Quiz Results Component
 * 
 * This component displays the final quiz results with:
 * - Final score and percentage
 * - Performance feedback based on score
 * - Star rating visualization
 * - Performance metrics (accuracy, time, speed)
 * - Confetti animation for high scores
 * - Button to restart the quiz
 */
import React from 'react';

const QuizResults = ({ 
  score,              // Number of correct answers
  totalQuestions,     // Total number of questions in the quiz
  timeTaken,          // Object containing time data (minutes, seconds, totalSeconds)
  userAnswers,        // Array of user answers (not used in this simplified version)
  onRestartQuiz       // Function to restart the quiz
}) => {
  // Calculate score percentage
  const percentage = (score / totalQuestions) * 100;
  const percentageRounded = Math.round(percentage);
  
  // Get appropriate feedback based on score percentage
  const getFeedbackInfo = () => {
    // Perfect score (100%)
    if (percentage === 100) {
      return {
        title: 'Outstanding!',
        message: 'Perfect score! Your knowledge is exceptional!',
        emoji: '🏆',
        class: 'perfect'
      };
    } 
    // Excellent score (80-99%)
    else if (percentage >= 80) {
      return {
        title: 'Excellent!',
        message: 'Great job! You have impressive knowledge!',
        emoji: '🎉',
        class: 'excellent'
      };
    } 
    // Good score (60-79%)
    else if (percentage >= 60) {
      return {
        title: 'Good Work!',
        message: 'Solid performance! You passed the quiz!',
        emoji: '👍',
        class: 'good'
      };
    } 
    // Average score (40-59%)
    else if (percentage >= 40) {
      return {
        title: 'Nice Effort!',
        message: 'Not bad, but there\'s room for improvement!',
        emoji: '🔍',
        class: 'average'
      };
    } 
    // Low score (0-39%)
    else {
      return {
        title: 'Keep Going!',
        message: 'Practice makes perfect! Try again to improve!',
        emoji: '📚',
        class: 'needs-improvement'
      };
    }
  };
  
  // Get feedback message and styling for this score
  const feedbackInfo = getFeedbackInfo();
  
  // Format time as "Xm Ys" (minutes and seconds)
  const formatTime = () => {
    if (!timeTaken) return 'N/A';
    
    const { minutes, seconds } = timeTaken;
    return `${minutes}m ${seconds}s`;
  };
  
  // Calculate average time spent per question
  const calculateAvgTimePerQuestion = () => {
    if (!timeTaken || timeTaken.totalSeconds === 0) return 'N/A';
    
    // Calculate average seconds per question
    const avgSeconds = Math.round(timeTaken.totalSeconds / totalQuestions);
    
    // Format as seconds or minutes + seconds
    if (avgSeconds < 60) {
      return `${avgSeconds}s`;
    } else {
      const mins = Math.floor(avgSeconds / 60);
      const secs = avgSeconds % 60;
      return `${mins}m ${secs}s`;
    }
  };
  
  // Create a star rating display based on score (1-5 stars)
  const renderStarRating = () => {
    // Each star represents 20% (5 stars total)
    const fullStars = Math.floor(percentage / 20);
    
    return (
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <span 
            key={index} 
            className={`star ${index < fullStars ? 'filled' : 'empty'}`}
          >
            {index < fullStars ? '★' : '☆'}
          </span>
        ))}
      </div>
    );
  };
  
  return (
    <div className="results-container">
      <div className="results-content">
        {/* Header with star rating */}
        <div className="results-header">
          <h2 className="results-title">Quiz Completed!</h2>
          {renderStarRating()}
        </div>
        
        {/* Confetti animation for high scores (80% or higher) */}
        {percentage >= 80 && (
          <div className="confetti-container">
            <div className="confetti confetti-1"></div>
            <div className="confetti confetti-2"></div>
            <div className="confetti confetti-3"></div>
            <div className="confetti confetti-4"></div>
            <div className="confetti confetti-5"></div>
            <div className="confetti confetti-6"></div>
          </div>
        )}
        
        {/* Main score display */}
        <div className={`score-circle ${feedbackInfo.class}`}>
          <div className="score-content">
            <span className="final-score">{score}/{totalQuestions}</span>
            <span className="percentage">{percentageRounded}%</span>
          </div>
        </div>
        
        {/* Feedback message with emoji */}
        <div className="feedback-container">
          <div className="feedback-emoji">{feedbackInfo.emoji}</div>
          <h3 className={`feedback-title ${feedbackInfo.class}`}>{feedbackInfo.title}</h3>
          <p className={`feedback-message ${feedbackInfo.class}`}>{feedbackInfo.message}</p>
        </div>
        
        {/* Performance metrics */}
        <div className="performance-summary">
          <h3>Performance Summary</h3>
          
          {/* Card-based summary metrics */}
          <div className="summary-grid">
            <div className="summary-card">
              <div className="summary-icon accuracy-icon">✓</div>
              <div className="summary-value">{percentageRounded}%</div>
              <div className="summary-label">Accuracy</div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon time-icon">⏱️</div>
              <div className="summary-value">{formatTime()}</div>
              <div className="summary-label">Total Time</div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon speed-icon">⚡</div>
              <div className="summary-value">{calculateAvgTimePerQuestion()}</div>
              <div className="summary-label">Avg. Time/Question</div>
            </div>
          </div>
          
          {/* Detailed statistics */}
          <div className="detailed-stats">
            <div className="summary-detail">
              <span>Questions Attempted:</span>
              <span>{totalQuestions}</span>
            </div>
            <div className="summary-detail">
              <span>Correct Answers:</span>
              <span>{score}</span>
            </div>
            <div className="summary-detail">
              <span>Incorrect Answers:</span>
              <span>{totalQuestions - score}</span>
            </div>
          </div>
        </div>
        
        {/* Restart button */}
        <div className="action-buttons">
          <button 
            className="restart-button full-width"
            onClick={onRestartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
