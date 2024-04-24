import React, { useState, useRef, useEffect } from "react";

function ScoreDisplay({ score }) {
  return <p>Score: {score}</p>;
}

function Timer({ initialTime, onTimeUp }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    setTime(initialTime); // Reset the time when the component mounts or when initialTime changes

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialTime, onTimeUp]);

  return <p>Time left: {time}</p>;
}

function GameCreator() {
  const [games, setGames] = useState([]); // State to store parsed game data
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track the current question index
  const [showNextQuestion, setShowNextQuestion] = useState(false); // State to control displaying the next question
  const [score, setScore] = useState(0); // State to store the score
  const timerRef = useRef(null); // Ref to hold a reference to the timer interval

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a FileReader object

    reader.onload = (e) => {
      const contents = e.target.result; // Get the contents of the file
      const parsedData = JSON.parse(contents); // Parse the JSON data

      // Set the parsed game data in the state
      setGames(parsedData);
      // Show the first question after parsing the file
      setShowNextQuestion(true);
    };

    reader.readAsText(file); // Read the file as text
  };

  // Function to handle displaying the next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // Move to the next question
    setShowNextQuestion(true); // Show the next question
    clearInterval(timerRef.current); // Clear the timer interval
  };

  // Function to handle option selection
  const handleOptionClick = (selectedOptionIndex) => {
    const currentQuestion = games[currentQuestionIndex];
    const correctAnswers = currentQuestion.correctAnswer;

    // If the selected option index matches any of the correct answer indices, increment the score
    if (correctAnswers.includes(selectedOptionIndex)) {
      setScore((prevScore) => prevScore + 1);
    }

    // Move to the next question
    handleNextQuestion();
  };

  // Function to handle time up
  const handleTimeUp = () => {
    setShowNextQuestion(false); // Hide the current question
  };

  return (
    <div>
      {/* Input field to select .json file */}
      <input type="file" accept=".json" onChange={handleFileSelect} />

      {/* Display the current question */}
      {showNextQuestion && games[currentQuestionIndex] && (
        <div>
          <p>Question: {games[currentQuestionIndex].questionText}</p>
          {/* Render options if the question type is Multiple Choice */}
          {games[currentQuestionIndex].questionType === "Multiple Choice" &&
            games[currentQuestionIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleOptionClick(index)}>
                {option}
              </button>
            ))}
          {/* Add image display */}
          {games[currentQuestionIndex].imageLink && (
            <img src={games[currentQuestionIndex].imageLink} alt="Question" />
          )}
          {/* Add additional details of the question if needed */}
          <button onClick={handleNextQuestion}>Next Question</button>
          {/* Timer component */}
          <Timer
            initialTime={games[currentQuestionIndex].timeInSeconds || 20}
            onTimeUp={handleTimeUp}
          />
        </div>
      )}

      {/* Score display component */}
      <ScoreDisplay score={score} />

      {/* Display the score */}
      {currentQuestionIndex >= games.length && (
        <p>Quiz Completed! Your score: {score}</p>
      )}
    </div>
  );
}

export default GameCreator;
