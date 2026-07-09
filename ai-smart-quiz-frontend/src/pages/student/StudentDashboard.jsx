import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvailableQuizzes } from "../../services/studentService";

function StudentDashboard() {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {

        try {

            const response = await getAvailableQuizzes();

            setQuizzes(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load quizzes");

        }

    };

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <h1 className="text-4xl font-bold mb-8">
                🎓 Student Dashboard
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {quizzes.map((quiz) => (

                    <div
                        key={quiz.id}
                        className="bg-white rounded-xl shadow-lg p-6"
                    >

                        <h2 className="text-2xl font-bold mb-3">
                            {quiz.title}
                        </h2>

                        <p className="mb-2">
                            Category :
                            <strong> {quiz.category?.name}</strong>
                        </p>

                        <p className="mb-2">
                            Difficulty :
                            <strong> {quiz.difficulty}</strong>
                        </p>

                        <p className="mb-5">
                            Questions :
                            <strong> {quiz.numberOfQuestions}</strong>
                        </p>

                        <button
                            onClick={() =>
                                navigate(`/student/quiz/${quiz.id}`)
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
                        >
                            Start Quiz
                        </button>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default StudentDashboard;