import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getCategories } from "../../services/categoryService";
import {
    generateAIQuestions,
    saveAIQuestions
} from "../../services/aiService";

function AIGenerator() {

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [difficulty, setDifficulty] = useState("EASY");
    const [numberOfQuestions, setNumberOfQuestions] = useState(5);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleGenerate = async () => {

        if (!categoryId) {
            alert("Please select a category");
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

            setQuestions(data);

        } catch (error) {
            console.error(error);
            alert("AI Generation Failed");
        }
    };

    const handleSave = async () => {

        try {

            await saveAIQuestions({
                categoryId: Number(categoryId),
                questions: questions.map(q => ({
                    question: q.question,
                    optionA: q.optionA,
                    optionB: q.optionB,
                    optionC: q.optionC,
                    optionD: q.optionD,
                    correctAnswer: q.correctAnswer,
                    difficulty: difficulty
                }))
            });

            alert("Questions Saved Successfully!");

        } catch (error) {

            console.error(error);
            alert("Save Failed");

        }

    };

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">
                🤖 AI Question Generator
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

                <div className="grid grid-cols-3 gap-5">

                    <select
                        className="border rounded-lg p-3"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Select Category</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}

                    </select>

                    <select
                        className="border rounded-lg p-3"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                    </select>

                    <input
                        type="number"
                        min="1"
                        max="20"
                        className="border rounded-lg p-3"
                        value={numberOfQuestions}
                        onChange={(e) =>
                            setNumberOfQuestions(e.target.value)
                        }
                    />

                </div>

                <button
                    onClick={handleGenerate}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                >
                    Generate AI Questions
                </button>

            </div>

            {questions.length > 0 && (

                <div className="bg-white rounded-xl shadow-lg p-6">

                    <h2 className="text-2xl font-bold mb-6">
                        Generated Questions
                    </h2>

                    {questions.map((q, index) => (

                        <div
                            key={index}
                            className="border rounded-xl p-5 mb-5"
                        >

                            <h3 className="font-bold text-lg mb-4">
                                Q{index + 1}. {q.question}
                            </h3>

                            <p>A. {q.optionA}</p>
                            <p>B. {q.optionB}</p>
                            <p>C. {q.optionC}</p>
                            <p>D. {q.optionD}</p>

                            <p className="mt-3 text-green-600 font-bold">
                                ✅ Correct Answer: {q.correctAnswer}
                            </p>

                        </div>

                    ))}

                    <button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg mt-6"
                    >
                        💾 Save All Questions
                    </button>
                    <button
                        onClick={() => navigate("/admin/quizzes")}
                        className="ml-4 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg"
                    >
                        📝 Create Quiz Now
                    </button>

                </div>

            )}

        </AdminLayout>
    );
}

export default AIGenerator;