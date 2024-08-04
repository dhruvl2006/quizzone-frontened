import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Loader from "../../components/Loader";

const Loginadmin = () => {
  const [adminemail, setAdminemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  async function loginadmin(event) {
    event.preventDefault();
    setIsLoading(true);
    const response = await fetch(
      "https://quizzone-backend.onrender.com/adminlogin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          adminemail,
          password,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.status === "ok") {
      const token = data.user;
      const username = data.username;
      const useremail = data.useremail;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("useremail", useremail);

      setUser(true);
      navigate("/dashboard");
    } else {
      setError(true);
    }
    setIsLoading(false);
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100">
      <div className="w-full flex justify-center items-center">
        <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg min-[450px]:h-fit h-screen flex justify-center items-center flex-col">
          <div className="flex justify-center space-x-4 border-b pb-4 mb-8">
            <NavLink
              to="/login/adminlogin"
              className="text-lg font-semibold text-indigo-600 border-b-2 border-indigo-600"
            >
              Admin
            </NavLink>
            <NavLink
              to="/login/studentlogin"
              className="text-lg font-semibold text-gray-600 hover:text-indigo-600"
            >
              Student
            </NavLink>
          </div>
          <div className="space-y-6 w-full">
            <h1 className="text-2xl font-bold text-center">Admin Login</h1>
            <div className="px-3">{isLoading && <Loader />}</div>
            <form onSubmit={loginadmin} className="space-y-6 w-full">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={adminemail}
                  onChange={(e) => setAdminemail(e.target.value)}
                  className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter Email..."
                />
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
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter Password..."
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
              {error && (
                <p className="text-red-500 text-sm">
                  *Please check your email and password
                </p>
              )}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  New to QuizZone?{" "}
                  <NavLink
                    to="/signup/adminsignup"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign Up as Admin
                  </NavLink>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log In
                </button>
              </div>
              <div className="flex items-center justify-between">
                <NavLink to="/">
                  <button
                    type="button"
                    className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginadmin;
