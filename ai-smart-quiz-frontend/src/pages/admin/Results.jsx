import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getResults } from "../../services/resultService";

function Results() {

    const [results, setResults] = useState([]);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {
        try {
            const response = await getResults();
            setResults(response.data);
        } catch (error) {
            console.error(error);
            alert("Failed to load results");
        }
    };

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                📊 Student Results
            </h1>

            <div className="bg-white shadow rounded-lg p-6">

                <table className="w-full border">

                    <thead className="bg-gray-200">

                    <tr>
                        <th className="p-3">Roll No</th>
                        <th>Name</th>
                        <th>Quiz</th>
                        <th>Score</th>
                        <th>Percentage</th>
                        <th>Result</th>
                    </tr>

                    </thead>

                    <tbody>

                    {results.map((r) => (

                        <tr
                            key={r.id}
                            className="border-t text-center"
                        >

                            <td className="p-3">
                                {r.user?.rollNumber}
                            </td>

                            <td>
                                {r.user?.fullName}
                            </td>

                            <td>
                                {r.quiz?.title}
                            </td>

                            <td>
                                {r.score}/{r.totalQuestions}
                            </td>

                            <td>
                                {r.percentage.toFixed(2)}%
                            </td>

                            <td
                                className={
                                    r.result === "PASS"
                                        ? "text-green-600 font-bold"
                                        : "text-red-600 font-bold"
                                }
                            >
                                {r.result}
                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );

}

export default Results;