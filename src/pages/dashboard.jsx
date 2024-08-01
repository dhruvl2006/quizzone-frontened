import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const [questionTime, setQuestionTime] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(false);
  const [isHovered, setIsHovered] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState(null);
  const [isCodeNew, setIsCodeNew] = useState(false);

  const email = localStorage.getItem("useremail");

  useEffect(() => {
    getQuizzes();
  }, []);

  const name = localStorage.getItem("username");

  const getQuizzes = async () => {
    const response = await fetch("https://quizzone-4ydv.onrender.com/quizes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    console.log(data.quiz);
    setQuizzes(data.quiz);
  };

  const saveToLocalStorage = (updatedQuizzes) => {
    localStorage.setItem("quizzes", JSON.stringify(updatedQuizzes));
  };

  const navigate = useNavigate();

  const handleNavigation = (code) => {
    navigate(`/quiz/${code}`);
  };

  const handleEdit = async () => {
    const response = await fetch(
      "https://quizzone-4ydv.onrender.com/quiz-data-update",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: editingQuiz._id,
          quizTitle,
          quizDescription,
          questionTime,
          code,
        }),
      }
    );

    const data = await response.json();
    if (data.status === "ok") {
      getQuizzes();
      setCreateQuiz(false);
      setIsEditing(false);
      setEditingQuiz(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://quizzone-4ydv.onrender.com/quiz-data-delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        }
      );

      const data = await response.json();
      if (data.status === "ok") {
        const updatedQuizzes = quizzes.filter((item) => item._id !== id);
        setQuizzes(updatedQuizzes);
        saveToLocalStorage(updatedQuizzes);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!quizTitle || !questionTime || !code) {
      setError(true);
      return;
    }

    if (isEditing) {
      handleEdit();
    } else {
      handleAddQuiz();
    }
  };

  const handleAddQuiz = async () => {
    const response = await fetch(
      "https://quizzone-4ydv.onrender.com/quiz-data",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quizTitle,
          quizDescription,
          questionTime,
          code,
          email,
        }),
      }
    );

    const data = await response.json();
    if (data.message === "Quiz added") {
      getQuizzes();
      setQuizTitle("");
      setQuizDescription("");
      setQuestionTime("");
      setCode("");
      setError(false);
      setCreateQuiz(false);
    }
  };

  const handleMouseEnter = (index) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(null);
  };

  const confirmDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (confirmed) {
      handleDelete(id);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center py-6 px-8 bg-white shadow-lg rounded-md border border-gray-300">
        <div className="text-gray-800 text-xl min-[400px]:text-2xl font-bold">
          <h1>Hey, {name}</h1>
        </div>
        <button
          onClick={() => {
            setCreateQuiz(true);
            setQuizTitle("");
            setQuizDescription("");
            setQuestionTime("");
            setCode("");
            setIsEditing(false);
          }}
          className="flex items-center gap-2 bg-indigo-600 text-white p-3 sm:py-2 sm:px-4 rounded-full sm:rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <img src="../assets/add.svg" alt="Add" className="w-5 h-5" />
          <p className="hidden sm:block">Add Quiz</p>
        </button>
      </div>
      <hr className="my-4 mx-auto w-full max-w-7xl border-gray-300" />
      <div className="p-6 flex flex-wrap gap-6 max-w-7xl mx-auto overflow-auto w-full">
        {quizzes.length === 0 && (
          <div className="w-full flex flex-col items-center gap-4">
            <img
              src="../assets/noquiz.svg"
              alt="No Quiz"
              className="w-32 h-32"
            />
            <h1 className="text-xl font-bold text-gray-700">
              No Quiz to display...!
            </h1>
            <button
              onClick={() => setCreateQuiz(true)}
              className="bg-indigo-500 text-white text-xl px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors duration-300"
            >
              Create one
            </button>
          </div>
        )}
        {quizzes.map((item, index) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md w-full border border-gray-200 hover:shadow-xl transition-shadow duration-300"
          >
            <p className="font-semibold text-lg flex justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              Test Code: {item.code}
            </p>
            <div className="p-4">
              <div onClick={() => handleNavigation(item.code)} className="mb-4">
                <h1 className="text-xl font-semibold">
                  {item.quizTitle.length > 20
                    ? item.quizTitle.substring(0, 20) + "..."
                    : item.quizTitle}
                </h1>
                <p className="text-gray-600">
                  {item.quizDescription.length > 60
                    ? item.quizDescription.substring(0, 60) + "..."
                    : item.quizDescription}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  className="bg-orange-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-orange-600 transition-colors duration-300"
                  onClick={() => handleNavigation(item.code)}
                >
                  <img
                    src="../assets/view.svg"
                    alt="View"
                    className="w-5 h-5"
                  />
                  <p className="sm:block hidden">View</p>
                </button>
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => {
                    setIsEditing(true);
                    setCreateQuiz(true);
                    setEditingQuiz(item);
                    setQuizTitle(item.quizTitle);
                    setQuizDescription(item.quizDescription);
                    setQuestionTime(item.questionTime);
                    setCode(item.code);
                  }}
                >
                  <img
                    src="../assets/edit.svg"
                    alt="Edit"
                    className="w-5 h-5"
                  />
                  <p className="sm:block hidden">Edit</p>
                </button>
                <button
                  onClick={() => confirmDelete(item._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-red-600 transition-colors duration-300"
                >
                  <img
                    src="../assets/delete.svg"
                    alt="Delete"
                    className="w-5 h-5"
                  />
                  <p className="sm:block hidden">Delete</p>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {createQuiz && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <form
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl font-bold mb-6">Test Information</h1>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Test Name:
                  <input
                    onChange={(e) => setQuizTitle(e.target.value)}
                    value={quizTitle}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    required
                    placeholder="Add Title..."
                  />
                </label>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Description:
                  <textarea
                    onChange={(e) => setQuizDescription(e.target.value)}
                    value={quizDescription}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    cols="30"
                    placeholder="Add Description..."
                    rows="4"
                  ></textarea>
                </label>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Time per question (in seconds):
                  <input
                    onChange={(e) => setQuestionTime(e.target.value)}
                    value={questionTime}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="number"
                    min="1"
                    required
                    placeholder="Time"
                  />
                </label>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-2">
                  Unique Code:
                  <input
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    type="text"
                    required
                    placeholder="Unique code"
                  />
                </label>
                {isCodeNew && (
                  <p className="text-red-600 font-semibold mt-2">
                    Code already in use
                  </p>
                )}
              </div>
              {error && (
                <p className="text-red-600 font-semibold mt-2">
                  Please fill all the required fields.
                </p>
              )}
            </div>
            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setCreateQuiz(false)}
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Close
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
              >
                {isEditing ? "Update Quiz" : "Add Quiz"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
