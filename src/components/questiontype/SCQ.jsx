import React, { useState, useEffect } from "react";
import Loader from "../Loader";

const SCQ = ({ code }) => {
  const [questions, setQuestions] = useState([]);
  const [question, setQuestion] = useState({
    question: "",
    options: [],
    answer: "",
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getQuestions();
  }, [code]);

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://quizzone-backend.onrender.com/quizQuestions/scq/${code}`
      );
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
        code: code,
      };

      const newQuestion_update = {
        question: question.question,
        options: options,
        answer: question.answer,
      };

      try {
        if (isEditing) {
          const id = questions[editingIndex]?._id;
          if (id) {
            const response = await fetch(
              `https://quizzone-backend.onrender.com/quizQuestion-update/scq/${id}`,
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
              code: code,
            });
            setOptions([]);
          }
        } else {
          setIsLoading(true);
          const response = await fetch(
            "https://quizzone-backend.onrender.com/quiz/questions/scq",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newQuestion),
            }
          );
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
          `https://quizzone-backend.onrender.com/quizQuestion-delete/scq/${id}`,
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
      <h1 className="text-lg sm:text-2xl font-bold mb-4 text-gray-800">
        Number of Questions: {questions.length}
      </h1>
      <form className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question:
          </label>
          <input
            onChange={(e) =>
              setQuestion({ ...question, question: e.target.value })
            }
            value={question.question}
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter question here"
            required
          />
        </div>
        {questionError && (
          <p className="text-md text-start text-red-600 font-bold mb-4">
            Question Can't be empty
          </p>
        )}
        {options.map((option, index) => (
          <div key={index} className={`${oPtionError ? "mb-2" : "mb-4"}`}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Option {index + 1}:
            </label>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="radio"
                name="option"
                checked={question.answer === index}
                onChange={() => handleAnswerChange(index)}
              />
              <input
                className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          <p className="text-md text-start text-red-600 font-bold mb-4">
            Options should be greater than or equal to three
          </p>
        )}
        {markedAnswer && (
          <p className="text-md text-start text-red-600 font-bold mb-4">
            Please select the correct option
          </p>
        )}
        {isQuestion && (
          <p className="text-md text-start text-red-600 font-bold mb-4">
            Question Already Exists
          </p>
        )}
        {valueError && (
          <p className="text-md text-start text-red-600 font-bold mb-4">
            Option can't be empty
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 w-fit sm:w-full">
          <button
            type="button"
            onClick={addOption}
            className="bg-orange-400 hover:bg-orange-500 text-white py-2 w-full sm:w-fit px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Option
          </button>
          <button
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-full sm:w-fit rounded focus:outline-none focus:shadow-outline"
          >
            {isEditing ? "Update Question" : "Add Question"}
          </button>
        </div>
      </form>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Questions:</h2>
      {isLoading && <Loader />}
      <div
        className={`${
          isLoading ? "hidden" : "grid"
        } gap-4 md:grid-cols-2 lg:grid-cols-3`}
      >
        {questions.map((item, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-lg font-bold mb-2">{item.question}</h3>
                <div className="mb-2">
                  <p className="text-md font-semibold mb-1">Options:</p>
                  <ul className="list-disc pl-4">
                    {item.options.map((opt, idx) => (
                      <li key={idx} className="text-base text-gray-700">
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-md font-semibold mb-2">
                  Correct Answer: {item.answer + 1}
                </p>
              </div>
              <div className="flex gap-2 mt-auto">
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SCQ;
