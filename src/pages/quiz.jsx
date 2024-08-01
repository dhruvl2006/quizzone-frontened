import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/navbar";
import SCQ from "../components/questiontype/SCQ";

const Quiz = () => {
  const [questionTime, setQuestionTime] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [code, setCode] = useState("");
  const [quizDetails, setQuizDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await fetch(
          `https://quizzone-4ydv.onrender.com/quiz/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.quiz) {
          setQuizDetails(data.quiz);
          setCode(data.quiz.code);
          setQuestionTime(data.quiz.questionTime);
          setQuizTitle(data.quiz.quizTitle);
          setQuizDescription(data.quiz.quizDescription);
        } else {
          throw new Error("Quiz not found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCode();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-col items-center w-full max-w-6xl mx-auto p-6">
        {loading && (
          <div className="text-center text-xl font-semibold text-gray-700 mt-20">
            Loading...
          </div>
        )}
        {error && (
          <div className="text-center text-xl font-semibold text-red-600 mt-20">
            {error}
          </div>
        )}
        {quizDetails && !loading && !error && (
          <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h1 className="text-2xl font-bold mb-4">{quizTitle}</h1>
            <p className="text-lg text-gray-700 mb-2">{quizDescription}</p>
            <div className="sm:flex sm:justify-between mb-4">
              <p className="text-md text-gray-600">
                Time allotted per Question:{" "}
                <span className="font-semibold">{questionTime} sec</span>
              </p>
              <p className="text-md text-gray-600">
                Test Code: <span className="font-semibold">{code}</span>
              </p>
            </div>
            <hr className="w-full h-1 bg-gray-300 my-4" />
            <SCQ code={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
