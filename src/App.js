import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import Dashboard from "./components/Dashboard";
import HeartSection from "./components/diseaseSection/heartSection";
import DiabetesSection from "./components/diseaseSection/diabetesSection";
import LiverSection from "./components/diseaseSection/liverSection";
import StrokeSection from "./components/diseaseSection/strokeSection";

function App() {
  const isAuthenticated = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/register" />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <AuthForm isSignup={false} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? (
              <AuthForm isSignup={true} />
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        {/* <Redirect from="/" to="/login" /> */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/disease/heart" element={<HeartSection />} />
        <Route path="/disease/stroke" element={<StrokeSection />} />
        <Route path="/disease/diabetes" element={<DiabetesSection />} />
        <Route path="/disease/liver" element={<LiverSection />} />
      </Routes>
    </Router>
  );
}

export default App;
