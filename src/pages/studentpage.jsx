import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Instruction from "../components/Quiz";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import GetQuiz from "../components/getquiz.modal";

const apiUrl = import.meta.env.VITE_BASE_URL;

const Student = () => {
  const [code, setCode] = useState("");
  const [onStart, setOnStart] = useState(false);
  const [quizError, setQuizError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [quizDetails, setQuizDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [getQuiz, setGetQuiz] = useState(false);
  const [attempted, setAttempted] = useState(false);
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
      setIsLoading(true);
      setQuizError(false);
      if (code.length === 0) {
        setEmptyError(true);
        setIsLoading(false);
        return;
      }
      setEmptyError(false);

      const response = await fetch(`${apiUrl}/getQuiz/${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.quiz) {
        const attemptedResponse = await fetch(
          `${apiUrl}/checkAttempted/${code}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: localStorage.getItem("studentemail"),
            }),
          }
        );
        if (attemptedResponse.ok) {
          setAttempted(true);
        } else {
          setQuizDetails(data.quiz);
          setCode(data.quiz.code);
          setOnStart(true);
          setQuizError(false);
          setAttempted(false);
        }
      } else {
        setQuizError(true);
        setAttempted(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setQuizError(true);
      setIsLoading(false);
      setAttempted(false);
    }
  };

  const fetchHistory = async () => {
    try {
      setIsLoading(true);
      const useremail = localStorage.getItem("studentemail");
      const response = await fetch(`${apiUrl}/getQuizHistory/${useremail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok && data.quizzes && Array.isArray(data.quizzes)) {
        setHistory(data.quizzes);
      } else {
        setHistory([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch history", error);
      setHistory([]);
    }
  };

  const name = localStorage.getItem("studentname");

  const navigate = useNavigate();

  const handleAnalysis = (testcode) => {
    navigate(`/analysis/${testcode}`);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
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
        <div className="flex flex-col items-center px-4 sm:px-8">
          <Header username={username} email={email} onLogout={handleLogout} />
          <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-6 bg-white shadow-lg rounded-md border border-gray-300 px-6 md:px-8">
            <h1 className="text-gray-800 text-lg sm:text-2xl font-bold">
              Hey, {name}
            </h1>
            <button
              onClick={() => setGetQuiz(true)}
              className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-full shadow-md hover:bg-indigo-700 transition-colors duration-300"
            >
              <img src="./../assets/quiz.svg" alt="Add" className="w-5 h-5" />
              <span className="hidden sm:inline">Take Quiz</span>
            </button>
          </div>
          {getQuiz && (
            <GetQuiz
              fetchCode={fetchCode}
              quizError={quizError}
              emptyError={emptyError}
              isLoading={isLoading}
              attempted={attempted}
              code={code}
              setCode={setCode}
              setGetQuiz={() => setGetQuiz(false)}
            />
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 mt-6">
            Attempted Quiz History
          </h1>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="w-full">
              {history.length === 0 ? (
                <div className="flex justify-center items-center w-full mt-10">
                  No Quiz Attempted
                </div>
              ) : (
                <div className="w-full max-w-7xl mx-auto mt-10">
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {history.map((quiz, index) => (
                      <div
                        key={index}
                        className="p-5 bg-white border border-slate-300 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:translate-y-1"
                      >
                        <h2 className="font-semibold text-xl text-indigo-600 mb-2">
                          {quiz.quizTitle}
                        </h2>
                        <p className="text-gray-600 mb-1">
                          Date: {new Date(quiz.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 mb-1">
                          Score: {quiz.score}/{quiz.questions.length}
                        </p>
                        <p className="text-gray-600 mb-1">
                          Time per question: {quiz.time}s
                        </p>
                        <p className="text-gray-600 mb-1">
                          Quiz Code: {quiz.testcode}
                        </p>
                        <p className="text-gray-600 mb-4">
                          Total Questions: {quiz.questions.length}
                        </p>
                        <button
                          onClick={() => handleAnalysis(quiz.testcode)}
                          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300"
                        >
                          Review Quiz
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Student;
