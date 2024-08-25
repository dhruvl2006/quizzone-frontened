import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "./toggleTheme";
import Test from "./test";

const Instruction = ({
  username,
  email,
  onStart,
  onClose,
  testcode,
  quizTitle,
  quizDescription,
  questionTime,
}) => {
  const [test, setTest] = useState(false);
  const [date, setDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTest(false);
  }, []);

  useEffect(() => {
    if (date) {
      console.log("Date updated:", date);
    }
  }, [date]);

  const handleStartQuiz = () => {
    const currentDate = new Date();
    setDate(currentDate);
    setTest(true);
  };

  return (
    <div>
      {test && date ? (
        <Test
          testcode={testcode}
          time={questionTime}
          home={onClose}
          quizTitle={quizTitle}
          startDate={date}
          username={username}
          email={email}
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950 p-4">
          <div className="min-[450px]:absolute min-[450px]:right-0 min-[450px]:top-0 min-[450px]:p-5 fixed top-2 right-2">
            <ThemeToggle />
          </div>
          <div className="max-w-2xl w-full bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 space-y-8">
            <h1 className="sm:text-4xl text-3xl font-bold text-gray-900 dark:text-gray-100 text-center">
              {quizTitle}
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
              {quizDescription}
            </p>
            <div className="flex justify-center gap-2 items-center mt-4">
              <h2 className="sm:text-2xl text-lg font-semibold text-gray-900 dark:text-gray-100">
                Time per Question:
              </h2>
              <p className="sm:text-2xl text-lg text-gray-600 dark:text-gray-400 flex gap-1 items-end">
                {questionTime}
                <span className="text-lg">sec</span>
              </p>
            </div>
            <div className="flex justify-center gap-2 items-center mt-2">
              <h2 className="sm:text-2xl text-lg font-semibold text-gray-900 dark:text-gray-100">
                Quiz Code:
              </h2>
              <p className="sm:text-2xl text-lg text-gray-600 dark:text-gray-400">
                {testcode}
              </p>
            </div>
            <div className="flex justify-between flex-col sm:flex-row gap-5 mt-8 items-center">
              <button
                onClick={handleStartQuiz}
                className="bg-indigo-700 w-full sm:w-fit text-white px-8 py-3 rounded-xl hover:bg-indigo-800 transition duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Start Quiz
              </button>
              <button
                onClick={onClose}
                className="text-indigo-700 dark:text-indigo-500 w-full sm:w-fit border border-indigo-700 dark:border-indigo-500 px-8 py-3 rounded-xl hover:bg-indigo-700 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-gray-100 transition duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Instruction;
