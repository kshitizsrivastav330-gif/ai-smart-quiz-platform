import { useLocation, useNavigate } from "react-router-dom";

function Result() {

    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h1 className="text-3xl font-bold">
                    No Result Found
                </h1>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-gray-100 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-xl p-10 w-[500px]">

                <h1 className="text-4xl font-bold text-center mb-8">
                    🎉 Quiz Result
                </h1>

                <div className="space-y-4 text-xl">

                    <p>
                        <strong>Score :</strong> {state.score}
                    </p>

                    <p>
                        <strong>Total Questions :</strong> {state.totalQuestions}
                    </p>

                    <p>
                        <strong>Percentage :</strong> {state.percentage.toFixed(2)}%
                    </p>

                    <p>
                        <strong>Result :</strong>{" "}
                        <span
                            className={
                                state.result === "PASS"
                                    ? "text-green-600 font-bold"
                                    : "text-red-600 font-bold"
                            }
                        >
                            {state.result}
                        </span>
                    </p>

                </div>

                <button
                    onClick={() => navigate("/student/dashboard")}
                    className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                >
                    Back to Dashboard
                </button>

            </div>

        </div>

    );

}

export default Result;