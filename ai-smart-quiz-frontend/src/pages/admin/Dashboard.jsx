import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import api from "../../api/axios";

function Dashboard() {

    const [dashboard, setDashboard] = useState({
        users: 0,
        categories: 0,
        questions: 0,
        quizzes: 0,
        attempts: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response = await api.get("/dashboard", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("token")
                }
            });

            setDashboard(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load dashboard");

        }

    };

    return (

        <AdminLayout>

            <h1 className="text-4xl font-bold mb-2">
                AI Smart Quiz
            </h1>

            <p className="text-gray-500 mb-8">
                Admin Dashboard
            </p>

            <div className="grid grid-cols-5 gap-6">

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Categories</h2>
                    <p className="text-4xl font-bold mt-3">
                        {dashboard.categories}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Questions</h2>
                    <p className="text-4xl font-bold mt-3">
                        {dashboard.questions}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Quizzes</h2>
                    <p className="text-4xl font-bold mt-3">
                        {dashboard.quizzes}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Students</h2>
                    <p className="text-4xl font-bold mt-3">
                        {dashboard.users}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-gray-500">Attempts</h2>
                    <p className="text-4xl font-bold mt-3">
                        {dashboard.attempts}
                    </p>
                </div>

            </div>

        </AdminLayout>

    );

}

export default Dashboard;