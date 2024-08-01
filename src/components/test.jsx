import React, { useState, useEffect } from "react";
import "./test_css.css";
import { useNavigate } from "react-router-dom";

const Test = ({ testcode, time, home }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(time);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        `https://quizzone-4ydv.onrender.com/questions/${testcode}`
      );
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const handleOptionChange = (e, index) => {
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (showResult) return;

    if (selectedOptionIndex === questions[currentQuestionIndex]?.answer) {
      setScore((prevScore) => prevScore + 1);
    }

    console.log("Submitted Option Index:", selectedOptionIndex);
    console.log(
      "Correct Answer Index:",
      questions[currentQuestionIndex]?.answer
    );
    console.log("Current Score:", score);

    if (currentQuestionIndex < questions.length - 1) {
      setFade(true);
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setFade(false);
        setTimeLeft(time);
        setSelectedOptionIndex(null);
      }, 200);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div
        className={`bg-white text-black rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md md:max-w-2xl transition-opacity duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {showResult ? (
          <div className="flex flex-col justify-center items-center gap-6 md:gap-10">
            <h2 className="text-3xl md:text-5xl font-extrabold">Quiz Result</h2>
            <div className="flex flex-col gap-4 md:gap-5">
              <p className="text-xl md:text-3xl font-semibold">
                Your score: {score} / {questions.length}
              </p>
              <button
                onClick={home}
                className="w-full bg-indigo-600 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
              >
                Go Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold mb-4 md:mb-6">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg md:text-2xl mb-4 md:mb-6">
              {questions[currentQuestionIndex]?.question}
            </p>
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 transition-all duration-300">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-2 md:space-x-3 transition-all duration-300 bg-gray-100 p-2 md:p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selectedOptionIndex === index}
                    onChange={(e) => handleOptionChange(e, index)}
                    className="form-radio h-4 w-4 md:h-5 md:w-5 text-indigo-600 transition-all duration-300"
                  />
                  <span className="text-md md:text-xl">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 md:py-2 md:px-6 rounded-lg transition-transform transform hover:scale-105 duration-300"
              >
                Submit
              </button>
              <p className="text-xl md:text-2xl font-bold transition-all duration-300">
                {timeLeft}s
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
