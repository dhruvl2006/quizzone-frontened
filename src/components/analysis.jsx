import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ThemeToggle from "./toggleTheme";
import { jwtDecode } from "jwt-decode";
const apiUrl = import.meta.env.VITE_BASE_URL;

const Analysis = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questions = [], userAnswers = [], testcode } = location.state || {};
  const [questionsBackend, setQuestionsBackend] = useState(questions);
  const [userAnswer, setUserAnswer] = useState(userAnswers);
  const [score, setScore] = useState(null);
  const { id } = useParams();

  const token = localStorage.getItem("student");
  const decoded = jwtDecode(token);
  const username = decoded.name;
  const email = decoded.email;

  useEffect(() => {
    getQuestions();
  }, [testcode]);

  const getQuestions = async () => {
    try {
      const response = await fetch(`${apiUrl}/analysis/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuestionsBackend(data.questions || []);
      setUserAnswer(data.userAnswers || []);
      setScore(data.score || 0);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const handleGoBack = () => {
    navigate("/student");
  };

  if (questionsBackend.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-950 p-4">
        <div className="min-[450px]:absolute min-[450px]:right-0 min-[450px]:top-0 min-[450px]:p-5 fixed top-2 right-2">
          <ThemeToggle />
        </div>
        <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-lg shadow-2xl p-6 md:p-8 w-fit max-w-md md:max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
            No Data Available for Analysis
          </h2>
          <button
            onClick={handleGoBack}
            className="px-4 py-2 md:px-6 md:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-950 p-4">
      <div className="min-[450px]:absolute min-[450px]:right-0 min-[450px]:top-0 min-[450px]:p-5 fixed top-2 right-2">
        <ThemeToggle />
      </div>
      <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-lg shadow-2xl p-6 md:p-8 w-full max-w-md md:max-w-4xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-gray-100">
            Quiz Analysis
          </h2>
          <h1 className="text-xl md:text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
            Score: {score}/{questionsBackend.length}
          </h1>
        </div>
        <div className="space-y-6">
          {questionsBackend.map((question, index) => (
            <div
              key={index}
              className="p-4 md:p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm"
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Question {index + 1}: {question.question}
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {question.options.map((option, optionIndex) => {
                  const isCorrect = optionIndex === parseInt(question.answer);
                  const isUserAnswer =
                    optionIndex === parseInt(userAnswer[index]);
                  const optionClasses = `
                    p-2 md:p-3 rounded-lg 
                    ${
                      isCorrect
                        ? "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100 font-bold"
                        : ""
                    }
                    ${
                      isUserAnswer && !isCorrect
                        ? "bg-red-200 dark:bg-red-900 text-red-800 dark:text-red-200"
                        : ""
                    }
                    ${
                      isUserAnswer && isCorrect
                        ? "border-2 border-indigo-600 dark:border-indigo-200"
                        : ""
                    }
                  `;

                  return (
                    <li
                      key={optionIndex}
                      className={`${optionClasses} flex justify-between items-center`}
                    >
                      <div>
                        {isCorrect && <span>✔️ </span>}
                        {isUserAnswer && !isCorrect && <span>❌ </span>}
                        {option}
                      </div>
                      <div>
                        {isUserAnswer && !isCorrect && (
                          <span className="text-sm text-gray-600 dark:text-gray-100">
                            +0
                          </span>
                        )}
                        {isUserAnswer && isCorrect && (
                          <span className="text-sm text-gray-600 dark:text-gray-100">
                            +1
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              {question.solution && (
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 flex gap-2 items-center">
                  <strong>Explanation:</strong>{" "}
                  {question.solution || "No explanation provided by Admin"}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center sticky bottom-4">
          <button
            onClick={handleGoBack}
            className="px-4 py-2 md:px-6 md:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Go Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
