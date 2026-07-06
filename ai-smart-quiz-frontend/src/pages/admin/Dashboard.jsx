import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        users: 0,
        categories: 0,
        questions: 0,
        quizzes: 0,
        attempts: 0,
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const response = await getDashboard();

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load dashboard");

        }

    };

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="bg-blue-600 text-white p-5 text-2xl font-bold">
                AI Smart Quiz - Admin Dashboard
            </div>

            <div className="p-8">

                <h2 className="text-3xl font-bold mb-8">
                    Welcome Admin 👋
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500 text-lg">Users</h3>
                        <p className="text-4xl font-bold text-blue-600 mt-3">
                            {dashboard.users}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500 text-lg">Categories</h3>
                        <p className="text-4xl font-bold text-green-600 mt-3">
                            {dashboard.categories}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500 text-lg">Questions</h3>
                        <p className="text-4xl font-bold text-purple-600 mt-3">
                            {dashboard.questions}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500 text-lg">Quizzes</h3>
                        <p className="text-4xl font-bold text-orange-500 mt-3">
                            {dashboard.quizzes}
                        </p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                        <h3 className="text-gray-500 text-lg">Attempts</h3>
                        <p className="text-4xl font-bold text-red-500 mt-3">
                            {dashboard.attempts}
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;