import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startQuiz, submitQuiz } from "../../services/studentService";

function StartQuiz() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});

    // 10 Minutes Timer
    const [timeLeft, setTimeLeft] = useState(600);

    const submitted = useRef(false);

    useEffect(() => {
        loadQuestions();
    }, []);

    // Timer
    useEffect(() => {

        if (submitted.current) return;

        if (timeLeft <= 0) {

            submitted.current = true;
            alert("Time is over! Quiz submitted automatically.");
            handleSubmit();

            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft]);

    const loadQuestions = async () => {

        try {

            const response = await startQuiz(id);

            setQuestions(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load quiz");

        }

    };

    const selectAnswer = (questionId, answer) => {

        setAnswers({
            ...answers,
            [questionId]: answer
        });

    };

    const handleSubmit = async () => {

        if (submitted.current && timeLeft > 0)
            return;

        submitted.current = true;

        const payload = {

            quizId: Number(id),

            answers: Object.entries(answers).map(
                ([questionId, selectedAnswer]) => ({

                    questionId: Number(questionId),
                    selectedAnswer

                })
            )

        };

        try {

            const response = await submitQuiz(payload);

            navigate("/student/result", {
                state: response.data
            });

        } catch (error) {

            console.error(error);

            alert("Submit Failed");

            submitted.current = false;

        }

    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (

        <div className="min-h-screen bg-gray-100 p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-4xl font-bold">
                    Start Quiz
                </h1>

                <div className="bg-red-600 text-white px-6 py-3 rounded-lg text-2xl font-bold shadow">

                    ⏰ {minutes}:{seconds.toString().padStart(2, "0")}

                </div>

            </div>

            {questions.map((q, index) => (

                <div
                    key={q.id}
                    className="bg-white rounded-xl shadow-lg p-6 mb-6"
                >

                    <h2 className="text-xl font-bold mb-4">

                        Q{index + 1}. {q.question}

                    </h2>

                    {["A", "B", "C", "D"].map(option => (

                        <label
                            key={option}
                            className="block mb-3 cursor-pointer"
                        >

                            <input
                                type="radio"
                                name={q.id}
                                value={option}
                                checked={answers[q.id] === option}
                                onChange={() =>
                                    selectAnswer(q.id, option)
                                }
                            />

                            <span className="ml-2">

                                {option}. {q["option" + option]}

                            </span>

                        </label>

                    ))}

                </div>

            ))}

            <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg"
            >

                Submit Quiz

            </button>

        </div>

    );

}

export default StartQuiz;