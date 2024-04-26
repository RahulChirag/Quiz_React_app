import React, { useState } from "react";

const GameDisplay = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionSelect = (index) => {
    // If the question allows only one correct answer, clear the selected options array
    if (!isMultipleAnswer) {
      setSelectedOptions([index]);
    } else {
      // Check if the option is already selected
      const selectedIndex = selectedOptions.indexOf(index);
      if (selectedIndex === -1) {
        // Option is not selected, add it to the selected options
        setSelectedOptions([...selectedOptions, index]);
      } else {
        // Option is already selected, remove it from the selected options
        setSelectedOptions(selectedOptions.filter((item) => item !== index));
      }
    }
  };

  const handleSubmitAnswer = () => {
    const currentQuestion = data[currentIndex];
    if (!currentQuestion) return; // Check if currentQuestion is undefined

    const correctAnswers = currentQuestion.correctAnswers;

    const isAllCorrect = selectedOptions.every((option) =>
      correctAnswers.includes(option)
    );

    if (isAllCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setShowExplanation(true);
    setSubmitted(true); // Mark answer as submitted

    // Move to the next question after the user has reviewed the explanation
    // or show game over if all questions have been answered
    setTimeout(() => {
      setShowExplanation(false);
      setSubmitted(false);
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setSelectedOptions([]); // Reset selected options
    }, 5000); // Adjust the delay time as needed
  };

  const isMultipleAnswer = data[currentIndex]?.correctAnswers?.length > 1;

  return (
    <div>
      {currentIndex < data.length ? (
        <div>
          <h2>Game Data:</h2>
          <div>
            <h3>{data[currentIndex]?.questionText}</h3>
            {data[currentIndex]?.questionImage && (
              <img src={data[currentIndex].questionImage} alt="Question" />
            )}
            <ul>
              {data[currentIndex]?.options.map((option, index) => (
                <li key={index}>
                  <label>
                    <input
                      type={isMultipleAnswer ? "checkbox" : "radio"}
                      value={index}
                      checked={selectedOptions.includes(index)}
                      onChange={() => handleOptionSelect(index)}
                    />
                    {option}
                    {data[currentIndex]?.optionImages && (
                      <img src={data[currentIndex].optionImages[index]} />
                    )}
                  </label>
                </li>
              ))}
            </ul>
            {showExplanation && (
              <div>
                <p>{data[currentIndex]?.explanation}</p>
                <p>{data[currentIndex]?.extras}</p>
              </div>
            )}
            {!submitted && (
              <button onClick={handleSubmitAnswer}>Submit Answer</button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h3>Game Over!</h3>
          <p>Your score: {score}</p>
        </div>
      )}
    </div>
  );
};

export default GameDisplay;
