import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getLeaderboard } from "../../services/leaderboardService";

function Leaderboard() {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const loadLeaderboard = async () => {

        try {

            const response = await getLeaderboard();

            setStudents(response.data);

        } catch (error) {

            console.error(error);

            alert("Unable to load leaderboard");

        }

    };

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                🏆 Leaderboard
            </h1>

            <div className="bg-white shadow-lg rounded-xl p-6">

                <table className="w-full border">

                    <thead className="bg-gray-200">

                    <tr>

                        <th className="border p-3">Rank</th>
                        <th className="border p-3">Name</th>
                        <th className="border p-3">Roll No</th>
                        <th className="border p-3">Quiz</th>
                        <th className="border p-3">Score</th>
                        <th className="border p-3">Percentage</th>

                    </tr>

                    </thead>

                    <tbody>

                    {students.length === 0 ? (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center p-6"
                            >
                                No Records Found
                            </td>

                        </tr>

                    ) : (

                        students.map((student, index) => (

                            <tr
                                key={student.id}
                                className="text-center border-t"
                            >

                                <td>{index + 1}</td>

                                <td>{student.user?.fullName}</td>

                                <td>{student.user?.rollNumber}</td>

                                <td>{student.quiz?.title}</td>

                                <td>
                                    {student.score}/{student.totalQuestions}
                                </td>

                                <td>{student.percentage}%</td>

                            </tr>

                        ))

                    )}

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}

export default Leaderboard;