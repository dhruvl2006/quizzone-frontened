import React, { useState } from "react";
import Header from "../components/Header";
import Instruction from "../components/Quiz";
import { useParams } from "react-router-dom";

const Student = () => {
  const [code, setCode] = useState("");
  const [onStart, setOnStart] = useState(false);
  const [quizError, setQuizError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null);
  const { id } = useParams();

  const username = localStorage.getItem("studentname");
  const email = localStorage.getItem("studentemail");

  const handleLogout = () => {
    localStorage.removeItem("studentname");
    localStorage.removeItem("studentemail");
    localStorage.removeItem("student");
    window.location.href = "/login/studentlogin";
  };

  const fetchCode = async () => {
    try {
      if (code.length === 0) {
        setEmptyError(true);
        return;
      }
      setEmptyError(false);

      const response = await fetch(
        `https://quizzone-backend.onrender.com/getQuiz/${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.quiz) {
        setQuizDetails(data.quiz);
        setCode(data.quiz.code);
        setOnStart(true);
        setQuizError(false);
      } else {
        setQuizError(true);
        throw new Error("Quiz not found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {onStart ? (
        <Instruction
          onStart={onStart}
          onClose={() => setOnStart(false)}
          testcode={code}
          quizTitle={quizDetails?.quizTitle}
          quizDescription={quizDetails?.quizDescription}
          questionTime={quizDetails?.questionTime}
        />
      ) : (
        <div className="bg-gray-200 min-h-screen flex flex-col items-center">
          <Header username={username} email={email} onLogout={handleLogout} />
          <div className="w-full p-4 flex items-center justify-center">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-xl max-w-sm md:max-w-md w-full text-center mt-6 md:mt-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-800">
                Hey, {username}
              </h1>
              <div className="mb-6 md:mb-8">
                <label className="block text-lg font-medium text-gray-700 mb-3">
                  Quiz Code
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                  placeholder="Enter your quiz code"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value);
                  }}
                />
                {quizError && (
                  <p className="p-2 text-lg text-start text-red-600 font-bold">
                    Quiz not found...
                  </p>
                )}
                {emptyError && (
                  <p className="p-2 text-lg text-start text-red-600 font-bold">
                    Please Enter the Code...
                  </p>
                )}
              </div>
              <button
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 border border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-200"
                onClick={fetchCode}
              >
                Get Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Student;
