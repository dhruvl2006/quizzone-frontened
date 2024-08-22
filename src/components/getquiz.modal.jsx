import React from "react";

const GetQuiz = ({
  fetchCode,
  quizError,
  emptyError,
  isLoading,
  attempted,
  code,
  setCode,
  setGetQuiz,
}) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-30 z-50">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-11/12 max-w-lg">
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-800">
            Enter Quiz Code
          </label>
          <input
            type="text"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your quiz code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          {quizError && (
            <p className="mt-2 text-red-600 font-medium">Quiz not found...</p>
          )}
          {emptyError && (
            <p className="mt-2 text-red-600 font-medium">
              Please enter the code...
            </p>
          )}
          {isLoading && (
            <p className="mt-2 text-gray-600 font-medium">Fetching...</p>
          )}
          {attempted && (
            <p className="mt-2 text-red-600 font-medium">
              Quiz already attempted... (Maximum allowed attempts: 1)
            </p>
          )}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            className="w-full md:w-auto flex-1 bg-white text-indigo-600 border border-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-600 hover:text-white transition duration-200"
            onClick={setGetQuiz}
          >
            Close
          </button>
          <button
            className="w-full md:w-auto flex-1 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            onClick={fetchCode}
          >
            Get Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetQuiz;
