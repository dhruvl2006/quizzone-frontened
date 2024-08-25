import React from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from ".././components/toggleTheme";
import { jwtDecode } from "jwt-decode";

const Header = ({ onLogout }) => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  console.log(decoded);
  const username = decoded.name;
  const email = decoded.email;
  return (
    <div className="sticky top-0 w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 z-50 flex justify-center">
      <header className="min-[1300px]:w-2/3 w-full p-4 flex flex-col sm:flex-row gap-5 justify-between items-center">
        <div className="flex items-center">
          <NavLink className="flex items-center gap-2" to="/student">
            <h1 className="text-gray-800 dark:text-gray-100 text-2xl font-bold tracking-tight">
              Welcome to{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                QuizZone
              </span>
            </h1>
          </NavLink>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="flex gap-2 items-center hover:opacity-80 duration-200 cursor-pointer">
            <img
              src="../assets/userprofile.jpg"
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="info hidden sm:flex flex-col">
              <h1 className="font-semibold text-xl dark:text-gray-100">
                {username}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {email}
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="bg-indigo-700 dark:bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-800 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 flex items-center gap-2 text-white"
          >
            <img className="w-5 h-5" src="../assets/logout.svg" alt="Logout" />
            Logout
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
