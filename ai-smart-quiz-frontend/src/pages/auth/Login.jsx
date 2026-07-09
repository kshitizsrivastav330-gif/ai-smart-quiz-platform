import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authService";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await loginUser({
                email,
                password
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.role);

            alert("Login Successful");

            if (response.data.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/student/dashboard");
            }

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data.message || "Invalid Email or Password");
            } else {
                alert("Server Not Reachable");
            }

        }

    };

    return (

        <div className="min-h-screen flex justify-center items-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl p-8 w-96">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    AI Smart Quiz
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border rounded-lg p-3 mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border rounded-lg p-3 mb-6"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                >
                    Login
                </button>

                <p className="text-center mt-6">

                    Don't have an account?

                    <span
                        className="text-blue-600 cursor-pointer ml-2"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </span>

                </p>

            </div>

        </div>

    );

}

export default Login;