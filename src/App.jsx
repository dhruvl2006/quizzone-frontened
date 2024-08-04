import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Help from "./pages/help";
import Main from "./pages/main_page";
import Loginstudent from "./pages/login/login-student";
import Loginadmin from "./pages/login/login-admin";
import Signupadmin from "./pages/signup/signup-admin";
import Signupstu from "./pages/signup/signup-student";
import Quiz from "./pages/quiz";
import UserProvider from "./context/UserProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import Student from "./pages/studentpage";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login/adminlogin" element={<Loginadmin />} />
          <Route path="/login/studentlogin" element={<Loginstudent />} />
          <Route path="/signup/adminsignup" element={<Signupadmin />} />
          <Route path="/signup/studentsignup" element={<Signupstu />} />
          <Route
            path="/student"
            element={<ProtectedRoute element={Student} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={Dashboard} />}
          />
          <Route path="/quiz/:id" element={<ProtectedRoute element={Quiz} />} />
          <Route path="/help" element={<ProtectedRoute element={Help} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
