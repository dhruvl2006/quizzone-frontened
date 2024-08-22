import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Questions from "../questions";
import Participants from "../participants";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_BASE_URL;

const SCQ = ({ code }) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({
    question: "",
    options: [],
    answer: "",
    solution: "",
    code: code,
  });
  const [options, setOptions] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [oPtionError, setOPtionError] = useState(false);
  const [questionError, setQuestionError] = useState(false);
  const [markedAnswer, setMarkedAnswer] = useState(false);
  const [isQuestion, setIsQuestion] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isQuestions, setIsQuestions] = useState(true);
  const [isParticipants, setIsParticipants] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getQuestions();
    fetchParticipants();
  }, [code]);

  const fetchParticipants = async () => {
    try {
      const response = await fetch(`${apiUrl}/quiz/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data) {
        setParticipants(data.quiz.participants);
      }
    } catch (error) {
      console.error("Unable to fetch Participants");
    }
  };

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${apiUrl}/quizQuestions/scq/${code}`);
      const data = await response.json();
      setQuestions(data.questions);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
    setQuestionError(false);
    setOPtionError(false);
    setMarkedAnswer(false);
    setIsQuestion(false);
    setValueError(false);
    setIsLoading(false);
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
    setQuestion({
      ...question,
      options: updatedOptions,
    });
  };

  const handleAnswerChange = (index) => {
    setQuestion({
      ...question,
      answer: index,
    });
  };

  const addQuestion = async (e) => {
    e.preventDefault();

    if (question.question === "") {
      setValueError(false);
      setQuestionError(true);
      setOPtionError(false);
      setMarkedAnswer(false);
      setIsQuestion(false);
    } else if (options.length < 3) {
      setValueError(false);
      setQuestionError(false);
      setOPtionError(true);
      setMarkedAnswer(false);
      setIsQuestion(false);
    } else if (question.answer === "") {
      setValueError(false);
      setQuestionError(false);
      setOPtionError(false);
      setMarkedAnswer(true);
      setIsQuestion(false);
    } else {
      setValueError(false);
      setQuestionError(false);
      setOPtionError(false);
      setMarkedAnswer(false);

      const newQuestion = {
        question: question.question,
        options: options,
        answer: question.answer,
        solution: question.solution,
        code: code,
      };

      const newQuestion_update = {
        question: question.question,
        options: options,
        answer: question.answer,
        solution: question.solution,
      };

      try {
        if (isEditing) {
          const id = questions[editingIndex]?._id;
          if (id) {
            const response = await fetch(
              `${apiUrl}/quizQuestion-update/scq/${id}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newQuestion_update),
              }
            );
            const data = await response.json();
            if (data.message === "Question updated successfully") {
              const updatedQuestions = [...questions];
              updatedQuestions[editingIndex] = { ...newQuestion, _id: id };
              setQuestions(updatedQuestions);
            }
            setIsEditing(false);
            setEditingIndex(null);
            setIsQuestion(false);
            setQuestion({
              question: "",
              options: [],
              answer: "",
              solution: "",
              code: code,
            });
            setOptions([]);
          }
        } else {
          setIsLoading(true);
          const response = await fetch(`${apiUrl}/quiz/questions/scq`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestion),
          });
          const data = await response.json();
          if (response.ok) {
            setQuestions([
              ...questions,
              { ...data.question, _id: data.question._id },
            ]);
            setIsQuestion(false);
            setQuestion({
              question: "",
              options: [],
              answer: "",
              solution: "",
              code: code,
            });
            setIsLoading(false);
            setOptions([]);
          } else if (data.message === "Duplicate Key Error") {
            setIsQuestion(true);
            setValueError(false);
            setIsLoading(false);
          } else if (data.message === "Validation Error") {
            setValueError(true);
            setIsQuestion(false);
            setIsLoading(false);
          } else {
            setIsQuestion(false);
            setValueError(false);
            setIsLoading(false);
            console.error("Failed to add question:", data.error);
          }
        }
      } catch (error) {
        console.error("Failed to add/update question:", error);
      }
    }
  };

  const handleEdit = (index) => {
    const selectedQuestion = questions[index];
    if (selectedQuestion) {
      setQuestion(selectedQuestion);
      setOptions(selectedQuestion.options);
      setIsEditing(true);
      setEditingIndex(index);
      setQuestionError(false);
      setOPtionError(false);
      setMarkedAnswer(false);
      setIsQuestion(false);
      setValueError(false);
    }
  };

  const handleDelete = async (index) => {
    const id = questions[index]?._id;
    if (id) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/quizQuestion-delete/scq/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await response.json();
        if (data.message === "Question deleted successfully") {
          const updatedQuestions = questions.filter(
            (question, idx) => idx !== index
          );
          setQuestions(updatedQuestions);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to delete question:", error);
      }
    }
  };

  return (
    <div className="w-full sm:p-6 bg-gray-50">
      <h1 className="text-lg sm:text-3xl font-bold mb-6 text-gray-800">
        Number of Questions: {questions.length}
      </h1>
      <form className="bg-white shadow-lg rounded-lg p-3 min-[500px]:p-6 mb-8">
        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Question:
          </label>
          <input
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
            value={question.question}
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            type="text"
            placeholder="Enter question here"
            required
          />
          {questionError && (
            <p className="text-sm text-red-600 font-semibold mt-2">
              Question can't be empty
            </p>
          )}
        </div>
        {options.map((option, index) => (
          <div key={index} className={`mb-4`}>
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Option {index + 1}:
            </label>
            <div className="flex items-center">
              <input
                className="mr-3 leading-tight focus:ring-indigo-500 focus:ring-2"
                type="radio"
                name="option"
                checked={question.answer === index}
                onChange={() => handleAnswerChange(index)}
              />
              <input
                className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={`Option ${index + 1}`}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
            </div>
          </div>
        ))}
        {oPtionError && (
          <p className="text-sm text-red-600 font-semibold mt-2">
            Options should be greater than or equal to three
          </p>
        )}

        <div className="mb-5">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Solution:
          </label>
          <textarea
            onChange={(e) =>
              setQuestion({ ...question, solution: e.target.value })
            }
            value={question.solution}
            className="appearance-none border border-gray-300 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter solution or explanation here"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={addOption}
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-fit"
          >
            Add Option
          </button>
          <button
            onClick={addQuestion}
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-fit"
          >
            {isEditing ? "Update Question" : "Add Question"}
          </button>
        </div>
      </form>

      <div className="w-full border-b-2 border-gray-300 mb-5 flex">
        <button
          onClick={() => {
            setIsQuestions(true);
            setIsParticipants(false);
          }}
          className={`w-1/2 py-2 text-center ${
            isQuestions
              ? "border-b-4 border-indigo-600 font-bold text-indigo-700"
              : "text-gray-800"
          } focus:outline-none`}
        >
          Questions
        </button>
        <button
          onClick={() => {
            setIsParticipants(true);
            setIsQuestions(false);
          }}
          className={`w-1/2 py-2 text-center ${
            isParticipants
              ? "border-b-4 border-indigo-600 font-bold text-indigo-700"
              : "text-gray-800"
          } focus:outline-none`}
        >
          Participants
        </button>
      </div>

      {isLoading && <Loader />}
      {isQuestions && (
        <Questions
          questions={questions}
          isLoading={isLoading}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      {isParticipants && (
        <Participants participants={participants} questions={questions} />
      )}
    </div>
  );
};

export default SCQ;
