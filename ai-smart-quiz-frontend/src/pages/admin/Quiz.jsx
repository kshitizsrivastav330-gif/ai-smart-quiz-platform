import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import { getCategories } from "../../services/categoryService";

import {
    createQuiz,
    getQuizzes,
    deleteQuiz
} from "../../services/quizService";

import {
    generateAIQuestions,
    saveAIQuestions
} from "../../services/aiService";

function Quiz() {

    const [categories, setCategories] = useState([]);
    const [quizzes, setQuizzes] = useState([]);
    const [aiQuestions, setAiQuestions] = useState([]);

    const [title, setTitle] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);

    useEffect(() => {

        loadCategories();
        loadQuizzes();

    }, []);

    const loadCategories = async () => {

        try {

            const response = await getCategories();

            setCategories(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const loadQuizzes = async () => {

        try {

            const response = await getQuizzes();

            setQuizzes(response.data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleCreate = async () => {

        if (!title || !categoryId) {

            alert("Please fill all fields");

            return;

        }

        try {

            await createQuiz({

                title,

                categoryId: Number(categoryId),

                difficulty,

                numberOfQuestions: Number(numberOfQuestions)

            });

            alert("Quiz Created Successfully");

            setTitle("");
            setCategoryId("");
            setDifficulty("EASY");
            setNumberOfQuestions(5);

            loadQuizzes();

        } catch (error) {

            console.error(error);

            alert("Unable to Create Quiz");

        }

    };

    const handleGenerateAI = async () => {

        if (!categoryId) {

            alert("Please Select Category");

            return;

        }

        try {

            const response = await generateAIQuestions({

                categoryId: Number(categoryId),

                difficulty,

                numberOfQuestions: Number(numberOfQuestions)

            });

            let data = response.data;

            if (typeof data === "string") {

                data = JSON.parse(data);

            }

            setAiQuestions(data);

            alert("AI Questions Generated Successfully");

        } catch (error) {

            console.error(error);

            alert("AI Generation Failed");

        }

    };

    const handleSaveAI = async () => {

        try {

            const payload = {

                categoryId: Number(categoryId),

                questions: aiQuestions.map(q => ({

                    question: q.question,
                    optionA: q.optionA,
                    optionB: q.optionB,
                    optionC: q.optionC,
                    optionD: q.optionD,
                    correctAnswer: q.correctAnswer,

                    // IMPORTANT
                    difficulty: difficulty

                }))

            };

            await saveAIQuestions(payload);

            alert("AI Questions Saved Successfully");

        } catch (error) {

            console.error(error);

            alert("Unable to Save AI Questions");

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this Quiz?")) return;

        try {

            await deleteQuiz(id);

            loadQuizzes();

        } catch (error) {

            console.error(error);

            alert("Delete Failed");

        }

    };
    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">
                📋 Quiz Management
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

                <h2 className="text-2xl font-bold mb-6">
                    Create Quiz
                </h2>

                <input
                    className="border rounded-lg p-3 w-full mb-4"
                    placeholder="Quiz Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <select
                    className="border rounded-lg p-3 w-full mb-4"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >

                    <option value="">
                        Select Category
                    </option>

                    {categories.map(category => (

                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>

                    ))}

                </select>

                <select
                    className="border rounded-lg p-3 w-full mb-4"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                >

                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>

                </select>

                <input
                    type="number"
                    className="border rounded-lg p-3 w-full mb-6"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                />

                <div className="flex gap-4">

                    <button
                        onClick={handleGenerateAI}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                    >
                        🤖 Generate AI Questions
                    </button>

                    <button
                        onClick={handleCreate}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                    >
                        📝 Create Quiz
                    </button>

                </div>

            </div>

            {aiQuestions.length > 0 && (

                <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                        🤖 AI Generated Questions
                    </h2>

                    {aiQuestions.map((q, index) => (

                        <div
                            key={index}
                            className="border rounded-lg p-5 mb-5"
                        >

                            <h3 className="font-bold text-lg mb-4">
                                Q{index + 1}. {q.question}
                            </h3>

                            <p>A. {q.optionA}</p>
                            <p>B. {q.optionB}</p>
                            <p>C. {q.optionC}</p>
                            <p>D. {q.optionD}</p>

                            <p className="mt-3 text-green-600 font-bold">
                                ✅ Correct Answer : {q.correctAnswer}
                            </p>

                        </div>

                    ))}

                    <button
                        onClick={handleSaveAI}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg"
                    >
                        💾 Save AI Questions
                    </button>

                </div>

            )}
            <div className="bg-white shadow-lg rounded-xl p-6">

                <h2 className="text-2xl font-bold mb-6">
                    📋 All Quizzes
                </h2>

                <table className="w-full border">

                    <thead className="bg-gray-200">

                    <tr>

                        <th className="border p-3">ID</th>
                        <th className="border p-3">Title</th>
                        <th className="border p-3">Category</th>
                        <th className="border p-3">Difficulty</th>
                        <th className="border p-3">Questions</th>
                        <th className="border p-3">Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {quizzes.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center p-6"
                            >
                                No Quiz Found
                            </td>

                        </tr>

                    ) : (

                        quizzes.map((quiz) => (

                            <tr
                                key={quiz.id}
                                className="text-center"
                            >

                                <td className="border p-3">
                                    {quiz.id}
                                </td>

                                <td className="border p-3">
                                    {quiz.title}
                                </td>

                                <td className="border p-3">
                                    {quiz.category?.name}
                                </td>

                                <td className="border p-3">
                                    {quiz.difficulty}
                                </td>

                                <td className="border p-3">
                                    {quiz.numberOfQuestions}
                                </td>

                                <td className="border p-3">

                                    <button
                                        onClick={() => handleDelete(quiz.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default Quiz;