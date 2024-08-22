import React from "react";

const Questions = ({ questions, isLoading, handleDelete, handleEdit }) => {
  return (
    <div
      className={`${
        isLoading ? "hidden" : "grid"
      } gap-4 md:grid-cols-2 lg:grid-cols-3`}
    >
      {questions?.map((item, index) => {
        return (
          <div
            key={index}
            className="bg-gray-100 shadow-md rounded-lg p-5 duration-100 hover:border-l-4 hover:border-indigo-500"
          >
            <div className="flex flex-col h-full">
              <div>
                <h3 className="text-xl font-extrabold text-gray-800 mb-3">
                  {item.question}
                </h3>
                <div className="mb-4">
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Options:
                  </p>
                  <ul className="list-decimal pl-6 space-y-1">
                    {item.options.map((opt, idx) => (
                      <li key={idx} className="text-base text-gray-600">
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-lg font-semibold text-indigo-600 mb-2">
                  Correct Answer: {item.answer + 1}
                </p>
                <p className="text-lg  text-gray-600 mb-5 break-words font-bold">
                  Solution:{" "}
                  <span
                    className={`${
                      item.solution && item.solution.length > 40
                        ? "cursor-pointer hover:text-indigo-400 hover:underline"
                        : "block"
                    } font-medium`}
                  >
                    {item.solution && item.solution.length > 40
                      ? `${item.solution.substring(0, 40)}...`
                      : item.solution || "No solution provided"}
                  </span>
                </p>
              </div>
              <div className="flex gap-4 mt-auto">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg border border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg border border-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors duration-200"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
