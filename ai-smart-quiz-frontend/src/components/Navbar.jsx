import { useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="h-16 bg-white shadow-md flex items-center justify-between px-8">

            <div>

                <h1 className="text-2xl font-bold text-blue-600">
                    AI Smart Quiz
                </h1>

                <p className="text-sm text-gray-500">
                    Admin Dashboard
                </p>

            </div>

            <div className="flex items-center gap-6">

                <div className="text-right">

                    <h3 className="font-semibold text-gray-700">
                        Welcome Admin 👋
                    </h3>

                    <p className="text-sm text-gray-500">
                        Manage your quiz platform
                    </p>

                </div>

                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
                >
                    Logout
                </button>

            </div>

        </div>

    );

}

export default Navbar;