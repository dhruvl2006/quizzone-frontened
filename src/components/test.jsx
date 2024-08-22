import React, { useState, useEffect } from "react";
import "./test_css.css";
import { useNavigate } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;

const Test = ({ testcode, time, home, quizTitle, startDate }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(time);
  const [fade, setFade] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const navigate = useNavigate();

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
      const response = await fetch(`${apiUrl}/quizQuestions/scq/${testcode}`);
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const handleOptionChange = (index) => {
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (showResult) return;

    const correctAnswerIndex = questions[currentQuestionIndex]?.answer;

    if (selectedOptionIndex === correctAnswerIndex) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers((prevAnswers) => [...prevAnswers, selectedOptionIndex]);

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

  const handleParticipant = async () => {
    try {
      const Info = {
        name: localStorage.getItem("studentname"),
        email: localStorage.getItem("studentemail"),
        score: score,
      };
      await fetch(`${apiUrl}/addParticipants/${testcode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Info }),
      });
    } catch (error) {}
  };

  const handleAnswers = async () => {
    try {
      await fetch(`${apiUrl}/createAnswers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          questions: questions,
          userAnswers: userAnswers,
          score: score,
          testcode: testcode,
          user: {
            name: localStorage.getItem("studentname"),
            email: localStorage.getItem("studentemail"),
          },
          time: time,
          quizTitle: quizTitle,
          startDate: startDate,
        }),
      });
      handleParticipant();
    } catch (error) {
      console.error("Failed to send answers:", error);
    }
  };

  const handleAnalysis = () => {
    handleAnswers();
    navigate(`/analysis/${testcode}`, {
      state: {
        questions,
        userAnswers,
        score,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div
        className={`bg-white text-black rounded-lg shadow-2xl p-6 md:p-8 max-w-lg w-full transition-opacity duration-500 ${
          fade ? "opacity-0" : "opacity-100"
        }`}
      >
        {showResult ? (
          <div className="flex flex-col justify-center items-center gap-6 w-full p-6 bg-gray-50 rounded-lg">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center">
              Quiz Result
            </h2>
            <p className="text-xl font-semibold text-gray-700 text-center">
              Your score: <span className="text-indigo-600">{score}</span> /{" "}
              {questions.length}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-full">
              <button
                onClick={handleAnalysis}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
              >
                Analysis
              </button>
              <button
                onClick={() => {
                  home();
                  handleAnswers();
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
              >
                Go Back to Home
              </button>
            </div>
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center">
            <h2 className="text-2xl font-extrabold mb-4">
              No questions available for this quiz.
            </h2>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-extrabold mb-4 text-center">
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <p className="text-lg mb-4 text-center">
              {questions[currentQuestionIndex]?.question}
            </p>
            <div className="space-y-3 mb-4">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="option"
                    value={index}
                    checked={selectedOptionIndex === index}
                    onChange={() => handleOptionChange(index)}
                    className="form-radio h-4 w-4 text-indigo-600 transition duration-300"
                  />
                  <span className="text-md">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300"
              >
                Submit
              </button>
              <p className="text-xl font-bold">{timeLeft}s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Test;
