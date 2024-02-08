import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetails";
import StudentDashboard from "./components/StudentDashboard";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <CssBaseline>
        <Header />
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
        </Routes>
      </CssBaseline>
    </Router>
  );
}

export default App;
