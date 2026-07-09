import { Routes, Route } from "react-router-dom";
import AIGenerator from "./pages/admin/AIGenerator";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/admin/Dashboard";
import Category from "./pages/admin/Category";
import Question from "./pages/admin/Question";
import Quiz from "./pages/admin/Quiz";
import StudentDashboard from "./pages/student/StudentDashboard";
import StartQuiz from "./pages/student/StartQuiz";
import Result from "./pages/student/Result";
import Results from "./pages/admin/Results";
import Leaderboard from "./pages/admin/Leaderboard";
function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/categories" element={<Category />} />
            <Route path="/admin/questions" element={<Question />} />
            <Route path="/admin/ai" element={<AIGenerator />} />
            <Route path="/admin/quizzes" element={<Quiz />} />
            <Route
                path="/student/dashboard"
                element={<StudentDashboard />}
            />
            <Route
                path="/student/quiz/:id"
                element={<StartQuiz />}
            />
            <Route
                path="/student/result"
                element={<Result />}
            />
                <Route
                    path="/admin/results"
                    element={<Results />}
                />
            <Route
                path="/admin/leaderboard"
                element={<Leaderboard />}
            />
        </Routes>
    );
}

export default App;