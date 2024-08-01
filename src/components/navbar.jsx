import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const name = localStorage.getItem("username");
  const email = localStorage.getItem("useremail");

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("useremail");
    localStorage.removeItem("token");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 w-full bg-white shadow-md border-b border-gray-200 z-50">
      <nav className="flex flex-col md:flex-row w-full max-w-screen-xl mx-auto px-6 py-4 items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto mb-4 md:mb-0">
          <NavLink className="flex items-center gap-2" to="/dashboard">
            <h1 className="text-gray-800 sm:text-2xl font-bold tracking-tight text-xl">
              Welcome to <span className="text-indigo-600">QuizZone</span>
            </h1>
          </NavLink>
          <button
            className="md:hidden flex items-center text-gray-800"
            onClick={toggleMenu}
          >
            <img
              className="w-6 h-6"
              src={isMenuOpen ? "../assets/close.svg" : "../assets/menu.svg"}
              alt="Menu"
            />
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden transition-all duration-300 ease-in-out md:overflow-visible md:max-h-none md:opacity-100 w-full md:w-auto`}
        >
          <ul className="flex flex-col items-center md:flex-row gap-6 text-gray-800 text-lg font-medium">
            <li>
              <NavLink
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors duration-200"
                to="/dashboard"
                onClick={toggleMenu}
              >
                <img className="w-6 h-6" src="../assets/home.svg" alt="Home" />
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="flex items-center gap-2 hover:text-indigo-600 transition-colors duration-200"
                to="/help"
                onClick={toggleMenu}
              >
                <img
                  className="w-6 h-6"
                  src="../assets/howtouse.svg"
                  alt="How to use"
                />
                How to use
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="md:flex text-gray-800 flex items-center gap-3 sm:pt-0 pt-5">
          <div className="flex gap-2 items-center hover:opacity-80 duration-200 cursor-pointer">
            <img
              src="../assets/userprofile.jpg"
              alt="User Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="info hidden sm:flex sm:flex-col">
              <h1 className="font-semibold text-xl">{name}</h1>
              <p className="text-sm text-gray-600">{email}</p>
            </div>
          </div>
          <NavLink to="/login/adminlogin" onClick={toggleMenu}>
            <button
              onClick={logout}
              className="bg-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 flex gap-1 items-center text-white"
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
      </nav>
    </div>
  );
};

export default Navbar;
