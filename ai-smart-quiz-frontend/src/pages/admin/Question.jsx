import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
    getQuestions,
    addQuestion,
    deleteQuestion
} from "../../services/questionService";
import { getCategories } from "../../services/categoryService";

function Question() {

    const [questions, setQuestions] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctAnswer: "A",
        difficulty: "EASY",
        categoryId: ""
    });

    useEffect(() => {
        loadQuestions();
        loadCategories();
    }, []);

    const loadQuestions = async () => {
        try {
            const response = await getQuestions();
            setQuestions(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const saveQuestion = async () => {

        try {

            await addQuestion(form);

            alert("Question Added Successfully");

            setForm({
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                correctAnswer: "A",
                difficulty: "EASY",
                categoryId: ""
            });

            loadQuestions();

        } catch (error) {
            console.error(error);
            alert("Failed");
        }

    };

    const removeQuestion = async (id) => {

        if (!window.confirm("Delete this question?")) return;

        await deleteQuestion(id);

        loadQuestions();

    };

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">
                ❓ Question Management
            </h1>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">

                <textarea
                    className="w-full border p-3 rounded mb-4"
                    rows="3"
                    placeholder="Question"
                    value={form.question}
                    onChange={(e) =>
                        setForm({ ...form, question: e.target.value })
                    }
                />

                <input
                    className="w-full border p-3 rounded mb-3"
                    placeholder="Option A"
                    value={form.optionA}
                    onChange={(e) =>
                        setForm({ ...form, optionA: e.target.value })
                    }
                />

                <input
                    className="w-full border p-3 rounded mb-3"
                    placeholder="Option B"
                    value={form.optionB}
                    onChange={(e) =>
                        setForm({ ...form, optionB: e.target.value })
                    }
                />

                <input
                    className="w-full border p-3 rounded mb-3"
                    placeholder="Option C"
                    value={form.optionC}
                    onChange={(e) =>
                        setForm({ ...form, optionC: e.target.value })
                    }
                />

                <input
                    className="w-full border p-3 rounded mb-4"
                    placeholder="Option D"
                    value={form.optionD}
                    onChange={(e) =>
                        setForm({ ...form, optionD: e.target.value })
                    }
                />

                <div className="grid grid-cols-3 gap-4 mb-5">

                    <select
                        className="border p-3 rounded"
                        value={form.categoryId}
                        onChange={(e) =>
                            setForm({ ...form, categoryId: e.target.value })
                        }
                    >
                        <option value="">Select Category</option>

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
                        className="border p-3 rounded"
                        value={form.difficulty}
                        onChange={(e) =>
                            setForm({ ...form, difficulty: e.target.value })
                        }
                    >
                        <option value="EASY">Easy</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HARD">Hard</option>
                    </select>

                    <select
                        className="border p-3 rounded"
                        value={form.correctAnswer}
                        onChange={(e) =>
                            setForm({ ...form, correctAnswer: e.target.value })
                        }
                    >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                    </select>

                </div>

                <button
                    onClick={saveQuestion}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    Add Question
                </button>

            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                <table className="w-full">

                    <thead className="bg-blue-600 text-white">

                    <tr>

                        <th className="p-3">ID</th>
                        <th>Question</th>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {questions.map(question => (

                        <tr
                            key={question.id}
                            className="border-b text-center"
                        >

                            <td className="p-3">{question.id}</td>

                            <td>{question.question}</td>

                            <td>{question.category?.name}</td>

                            <td>{question.difficulty}</td>

                            <td>

                                <button
                                    onClick={() => removeQuestion(question.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default Question;