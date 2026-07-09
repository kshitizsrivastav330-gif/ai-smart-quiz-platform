import { Link, useNavigate } from "react-router-dom";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (

        <div className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white shadow-lg">

            <div className="text-center py-6 border-b border-slate-700">

                <h1 className="text-2xl font-bold">
                    AI Smart Quiz
                </h1>

                <p className="text-sm text-gray-300">
                    Admin Panel
                </p>

            </div>

            <nav className="mt-6">

                <ul className="space-y-2 px-4">

                    <li>
                        <Link
                            to="/admin/dashboard"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            🏠 Dashboard
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/categories"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            📚 Categories
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/questions"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            ❓ Questions
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/quizzes"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            📝 Quizzes
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/ai"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            🤖 AI Generator
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/students"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            👨‍🎓 Students
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/results"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            📊 Results
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/admin/leaderboard"
                            className="block px-4 py-3 rounded-lg hover:bg-slate-700"
                        >
                            🏆 Leaderboard
                        </Link>
                    </li>

                    <li>

                        <button
                            onClick={logout}
                            className="w-full text-left px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700"
                        >
                            🚪 Logout
                        </button>

                    </li>

                </ul>

            </nav>

        </div>

    );

}

export default Sidebar;