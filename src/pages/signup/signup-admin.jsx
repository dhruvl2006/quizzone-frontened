import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ThemeToggle from "../../components/toggleTheme";
const apiUrl = import.meta.env.VITE_BASE_URL;

const Signupadmin = () => {
  const [adminname, setAdminname] = useState("");
  const [adminemail, setAdminemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const length = pass.length >= 8;
    const uppercase = /[A-Z]/.test(pass);
    const lowercase = /[a-z]/.test(pass);
    const number = /[0-9]/.test(pass);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    setPasswordValidation({
      length,
      uppercase,
      lowercase,
      number,
      specialChar,
    });
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  async function registeradmin(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/adminsignup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adminname,
        adminemail,
        password,
        confirmpass,
      }),
    });

    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login/adminlogin");
    }

    if (data.error === "Admin with this email already exists.") {
      setError(true);
    } else {
      setError(false);
    }

    if (data.error === "Passwords do not match") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-slate-950 transition-colors duration-500">
      <div className="min-[450px]:absolute min-[450px]:right-0 min-[450px]:top-0 min-[450px]:p-5 fixed top-2 right-2">
        <ThemeToggle />
      </div>
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg min-[450px]:h-fit h-screen flex justify-center items-center flex-col">
          <div className="flex justify-center mb-8">
            <NavLink
              to="/signup/adminsignup"
              className="text-lg font-semibold text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
            >
              Admin
            </NavLink>
            <NavLink
              to="/signup/studentsignup"
              className="text-lg font-semibold text-gray-600 ml-6 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Student
            </NavLink>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6 dark:text-gray-200">
            Admin Registration
          </h1>
          <div className="px-3">{isLoading && <Loader />}</div>
          <form
            onSubmit={registeradmin}
            className="space-y-6 w-full overflow-y-auto"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={adminname}
                onChange={(e) => setAdminname(e.target.value)}
                placeholder="Enter Your Name..."
                className="mt-1 p-3 block w-full border text-gray-900 border-gray-300 dark:bg-gray-800 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:text-gray-300"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={adminemail}
                onChange={(e) => setAdminemail(e.target.value)}
                placeholder="Enter Email..."
                pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
                className="mt-1 p-3 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300"
              />
              {error && (
                <p className="text-md text-start text-red-600 font-bold">
                  *Email already in use
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password..."
                  className="mt-1 p-3 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 dark:invert"
                >
                  {showPassword ? (
                    <img src="../assets/hidepass.svg" alt="" />
                  ) : (
                    <img src="../assets/showpass.svg" alt="" />
                  )}
                </button>
              </div>
              <ul className="text-sm mt-2 pl-7">
                <li
                  className={`${
                    passwordValidation.length
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passwordValidation.length ? "✔" : "✘"} Minimum 8 characters
                </li>
                <li
                  className={`${
                    passwordValidation.uppercase
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passwordValidation.uppercase ? "✔" : "✘"} At least one
                  uppercase letter
                </li>
                <li
                  className={`${
                    passwordValidation.lowercase
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passwordValidation.lowercase ? "✔" : "✘"} At least one
                  lowercase letter
                </li>
                <li
                  className={`${
                    passwordValidation.number
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passwordValidation.number ? "✔" : "✘"} At least one number
                </li>
                <li
                  className={`${
                    passwordValidation.specialChar
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {passwordValidation.specialChar ? "✔" : "✘"} At least one
                  special character
                </li>
              </ul>
            </div>
            <div>
              <label
                htmlFor="confirmpass"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmpass"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmpass}
                  onChange={(e) => setConfirmpass(e.target.value)}
                  placeholder="Confirm Password..."
                  className="mt-1 p-3 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-300"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 dark:invert"
                >
                  {showConfirmPassword ? (
                    <img src="../assets/hidepass.svg" alt="" />
                  ) : (
                    <img src="../assets/showpass.svg" alt="" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-md text-start text-red-600 font-bold">
                  Please check the password
                </p>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-100">
              Already registered?{" "}
              <NavLink
                to="/login/adminlogin"
                className="text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Login
              </NavLink>
            </p>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-400 to-indigo-700 dark:from-indigo-500 dark:to-indigo-600 hover:from-indigo-600 hover:to-indigo-500 dark:hover:from-indigo-600 dark:hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                disabled={
                  !passwordValidation.length ||
                  !passwordValidation.uppercase ||
                  !passwordValidation.lowercase ||
                  !passwordValidation.number ||
                  !passwordValidation.specialChar
                }
              >
                Sign Up
              </button>
              <NavLink to="/">
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-base font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signupadmin;
