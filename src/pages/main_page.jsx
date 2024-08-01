import React from "react";
import { NavLink } from "react-router-dom";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="text-center mb-12">
        <NavLink to="/">
          <h1 className="text-5xl font-extrabold text-gray-800">
            Welcome to <span className="text-indigo-600">QuizZone</span>
          </h1>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <NavLink to="/login/adminlogin">
          <button className="px-8 py-3 text-xl font-semibold text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300 w-full">
            Log In
          </button>
        </NavLink>
        <NavLink to="/signup/adminsignup">
          <button className="px-8 py-3 text-xl font-semibold text-indigo-600 border-2 border-indigo-600 rounded-lg bg-transparent shadow-lg hover:bg-indigo-600 hover:text-white transition duration-300">
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Main;
