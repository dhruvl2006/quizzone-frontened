import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Help from "./pages/help";
import Main from "./pages/main_page";
import Loginstudent from "./pages/login/login-student";
import Loginadmin from "./pages/login/login-admin";
import Signupadmin from "./pages/signup/signup-admin";
import Signupstu from "./pages/signup/signup-student";
import Quiz from "./pages/quiz";
import Student from "./pages/studentpage";
import Analysis from "./components/analysis";
import ProtectedRouteAdmin from "./context/ProtectedRouteAdmin";
import ProtectedRouteStudent from "./context/ProtectedRouteStudent";
import "./main.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login/adminlogin" element={<Loginadmin />} />
        <Route path="/login/studentlogin" element={<Loginstudent />} />
        <Route path="/signup/adminsignup" element={<Signupadmin />} />
        <Route path="/signup/studentsignup" element={<Signupstu />} />
        <Route
          path="/dashboard/*"
          element={<ProtectedRouteAdmin element={<Dashboard />} />}
        />
        <Route
          path="/quiz/:id"
          element={<ProtectedRouteAdmin element={<Quiz />} />}
        />
        <Route
          path="/help"
          element={<ProtectedRouteAdmin element={<Help />} />}
        />
        <Route
          path="/student"
          element={<ProtectedRouteStudent element={<Student />} />}
        />
        <Route
          path="/analysis/:id"
          element={<ProtectedRouteStudent element={<Analysis />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
