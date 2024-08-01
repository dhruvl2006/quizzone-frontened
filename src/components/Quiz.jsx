import { useState, useEffect } from "react";
import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import Test from "./test";

const Instruction = ({
  onStart,
  onClose,
  testcode,
  quizTitle,
  quizDescription,
  questionTime,
}) => {
  const [test, setTest] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (testcode) => {
    navigate(`/test/${testcode}`);
  };

  useEffect(() => {
    console.log(testcode);
    setTest(false);
  }, []);

  return (
    <div>
      {test ? (
        <Test testcode={testcode} time={questionTime} home={onClose} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
          <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 space-y-8">
            <h1 className="sm:text-4xl text-3xl font-bold text-gray-900 text-center">
              {quizTitle}
            </h1>
            <p className="text-lg text-gray-700 text-center">
              {quizDescription}
            </p>
            <div className="flex justify-center gap-2 items-center mt-4">
              <h2 className="sm:text-2xl text-lg font-semibold text-gray-900">
                Time per Question:
              </h2>
              <p className="sm:text-2xl text-lg text-gray-600 flex gap-1 items-end">
                {questionTime}
                <span className="text-lg">sec</span>
              </p>
            </div>
            <div className="flex justify-center gap-2 items-center mt-2">
              <h2 className="sm:text-2xl text-lg font-semibold text-gray-900">
                Quiz Code:
              </h2>
              <p className="sm:text-2xl text-lg text-gray-600">{testcode}</p>
            </div>
            <div className="flex justify-between flex-col sm:flex-row gap-5 mt-8 items-center">
              <button
                onClick={() => {
                  setTest(true);
                }}
                className="bg-indigo-700 w-fit text-white px-8 py-3 rounded-xl hover:bg-indigo-800 transition duration-300 shadow-lg transform hover:-translate-y-1"
              >
                Start Quiz
              </button>
              <button
                onClick={onClose}
                className="text-indigo-700 w-fit border border-indigo-700 px-8 py-3 rounded-xl hover:bg-indigo-700 hover:text-white transition duration-300 shadow-lg transform hover:-translate-y-1"
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
