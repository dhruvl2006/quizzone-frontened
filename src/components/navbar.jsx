import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./toggleTheme";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const name = decoded.name;
  const email = decoded.email;

  const logout = () => {
    localStorage.removeItem("token");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 w-full bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 z-50 transition-colors duration-200">
      <nav className="flex flex-col min-[1050px]:flex-row w-full max-w-screen-xl mx-auto px-6 py-4 items-center justify-between">
        <div className="flex items-center justify-between w-full min-[1050px]:w-auto mb-4 min-[1050px]:mb-0">
          <NavLink className="flex items-center gap-2" to="/dashboard">
            <h1 className="text-gray-800 dark:text-white sm:text-2xl font-bold tracking-tight text-xl">
              Welcome to{" "}
              <span className="text-indigo-600 dark:text-indigo-400">
                QuizZone
              </span>
            </h1>
          </NavLink>
          <button
            className="min-[1050px]:hidden flex items-center text-gray-800 dark:text-gray-200"
            onClick={toggleMenu}
          >
            <img
              className="w-6 h-6 dark:invert"
              src={isMenuOpen ? "../assets/close.svg" : "../assets/menu.svg"}
              alt="Menu"
            />
          </button>
        </div>
        <div className="block items-center justify-center gap-4 min-[1050px]:flex">
          <div className="flex items-center justify-start w-screen pl-5 min-[1050px]:w-fit gap-4">
            <ThemeToggle />
          </div>
          <div
            ref={menuRef}
            className={`${
              isMenuOpen ? "max-h-96" : "max-h-0"
            } overflow-hidden transition-[max-height] duration-300 ease-in-out min-[1050px]:max-h-none w-full min-[1050px]:w-auto min-[1050px]:block`}
          >
            <ul className="flex flex-col items-center min-[1050px]:flex-row gap-6 text-gray-800 dark:text-gray-200 text-lg font-medium">
              <li>
                <NavLink
                  className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  to="/dashboard"
                  onClick={toggleMenu}
                >
                  <img
                    className="w-6 h-6 dark:invert"
                    src="../assets/home.svg"
                    alt="Home"
                  />
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="flex items-center gap-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-200"
                  to="/help"
                  onClick={toggleMenu}
                >
                  <img
                    className="w-6 h-6 dark:invert"
                    src="../assets/howtouse.svg"
                    alt="How to use"
                  />
                  How to use
                </NavLink>
              </li>
              <li>
                <div className="min-[1050px]:flex text-gray-800 dark:text-gray-200 flex items-center gap-3 sm:pt-0 pt-5">
                  <div className="flex gap-2 items-center hover:opacity-80 duration-200 cursor-pointer">
                    <img
                      src="../assets/userprofile.jpg"
                      alt="User Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="info hidden sm:flex sm:flex-col">
                      <h1 className="font-semibold text-xl">{name}</h1>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {email}
                      </p>
                    </div>
                  </div>
                  <NavLink to="/login/adminlogin" onClick={toggleMenu}>
                    <button
                      onClick={logout}
                      className="bg-indigo-700 dark:bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-800 dark:hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:focus:ring-indigo-500 transition duration-200 flex gap-1 items-center text-white"
                    >
                      <img
                        className="w-5 h-5"
                        src="../assets/logout.svg"
                        alt="Logout"
                      />
                      Logout
                    </button>
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
