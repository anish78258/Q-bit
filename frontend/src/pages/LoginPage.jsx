import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // For showing/hiding password

const LoginPage = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      const data = await res.json();
      if (data.error) {
        alert(data.error); // Replace with your toast function
        return;
      }
      localStorage.setItem("user-threads", JSON.stringify(data));
      // Set the user data using your state management (e.g., Recoil or Context API)
      // setUser(data);
      navigate("/dashboard"); // Navigate to the dashboard or home page
    } catch (error) {
      alert("Error: " + error.message); // Replace with your toast function
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow-md md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold text-center md:text-2xl">Login to your account</h1>

          <div className="space-y-4">
            {/* Username Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={inputs.username}
                onChange={(e) =>
                  setInputs((prevInputs) => ({ ...prevInputs, username: e.target.value }))
                }
                className="mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                required
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={inputs.password}
                  onChange={(e) =>
                    setInputs((prevInputs) => ({ ...prevInputs, password: e.target.value }))
                  }
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                >
                  {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="pt-4">
              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-300"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-sm font-light text-gray-500">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
