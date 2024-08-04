import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Signupadmin = () => {
  const [adminname, setAdminname] = useState("");
  const [adminemail, setAdminemail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  async function registeradmin(event) {
    event.preventDefault();

    const response = await fetch(
      "https://quizzone-backend.onrender.com/adminsignup",
      {
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
      }
    );

    const data = await response.json();
    if (data.status === "ok") {
      navigate("/login/adminlogin");
    }

    if (data.error === "Admin with this email already exists.") {
      setError(true);
    } else {
      setError(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg min-[450px]:h-fit h-screen flex justify-center items-center flex-col">
          <div className="flex justify-center mb-8">
            <NavLink
              to="/signup/adminsignup"
              className="text-lg font-semibold text-indigo-600 border-b-2 border-indigo-600"
            >
              Admin
            </NavLink>
            <NavLink
              to="/signup/studentsignup"
              className="text-lg font-semibold text-gray-600 ml-6 hover:text-indigo-600"
            >
              Student
            </NavLink>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">
            Admin Registration
          </h1>
          <form onSubmit={registeradmin} className="space-y-6 w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={adminname}
                onChange={(e) => setAdminname(e.target.value)}
                placeholder="Enter Your Name..."
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={adminemail}
                onChange={(e) => setAdminemail(e.target.value)}
                placeholder="Enter Email..."
                className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
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
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password..."
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? (
                    <img src="../assets/hidepass.svg" alt="" />
                  ) : (
                    <img src="../assets/showpass.svg" alt="" />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label
                htmlFor="confirmpass"
                className="block text-sm font-medium text-gray-700"
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
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showConfirmPassword ? (
                    <img src="../assets/hidepass.svg" alt="" />
                  ) : (
                    <img src="../assets/showpass.svg" alt="" />
                  )}
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Already registered?{" "}
              <NavLink
                to="/login/adminlogin"
                className="text-indigo-600 hover:underline"
              >
                Login
              </NavLink>
            </p>
            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-400 to-indigo-700 hover:from-indigo-600 hover:to-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
              <NavLink to="/">
                <button
                  type="button"
                  className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
