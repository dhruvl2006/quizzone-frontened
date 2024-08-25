import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../components/toggleTheme";

const Main = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 dark:bg-gray-950 transition-colors duration-200">
      <div className="absolute right-0 top-0 p-5">
        <ThemeToggle />
      </div>
      <div className="text-center mb-12">
        <NavLink to="/">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-200">
            Welcome to{" "}
            <span className="text-indigo-600 dark:text-indigo-700">
              QuizZone
            </span>
          </h1>
        </NavLink>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
        <NavLink to="/login/adminlogin">
          <button className="px-8 py-3 text-xl font-semibold text-white bg-indigo-600 dark:bg-indigo-800 rounded-lg shadow-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition duration-300 w-full">
            Log In
          </button>
        </NavLink>
        <NavLink to="/signup/adminsignup">
          <button className="px-8 py-3 text-xl font-semibold text-indigo-600 dark:text-indigo-700 border-2 border-indigo-600 dark:border-indigo-800 rounded-lg bg-transparent shadow-lg hover:bg-indigo-600 dark:hover:bg-indigo-800 dark:hover:text-white hover:text-white transition duration-300">
            Sign Up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Main;
