import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";

function Register() {

    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("STUDENT");
    const [rollNumber,setRollNumber]=useState("");

    const handleRegister = async () => {

        try {

            const response = await registerUser({
                fullName,
                rollNumber,
                email,
                password,
                role
            });

            alert(response.data);

            navigate("/");

        } catch (error) {

            console.error(error);

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Registration Failed");
            }

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex justify-center items-center">

            <div className="bg-white shadow-xl rounded-xl p-8 w-[450px]">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">
                    AI Smart Quiz
                </h1>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full border rounded-lg p-3 mb-4"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

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
                    className="w-full border rounded-lg p-3 mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Roll Number"
                    className="w-full border rounded-lg p-3 mb-4"
                    value={rollNumber}
                    onChange={(e)=>setRollNumber(e.target.value)}
                />

                <select
                    className="w-full border rounded-lg p-3 mb-6"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="STUDENT">Student</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <button
                    onClick={handleRegister}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
                >
                    Register
                </button>

                <p className="text-center mt-6">

                    Already have an account?

                    <span
                        className="text-blue-600 cursor-pointer ml-2"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span>

                </p>

            </div>

        </div>

    );

}

export default Register;