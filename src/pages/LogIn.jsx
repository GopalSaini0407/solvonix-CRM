"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email && password) {
      localStorage.setItem("token", "demo_token"); // fake token for testing
      onLogin?.();
      navigate("/");
    } else {
      setError("Invalid credentials");
    }

    setIsLoading(false);
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-gray-100 px-4 py-8"
      style={{ backgroundImage: `url('./images/register-img.png')` }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-[1000px] overflow-hidden">
        
        {/* LEFT SECTION - hide on mobile */}
        <div className="hidden md:flex w-full md:w-1/3 bg-gray-200 p-8 flex-col">
          <div className="img-box">
            <img src="./images/logo-crm.png" alt="logo" className="w-100" />
          </div>
          <p className="mt-4 text-gray-600 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi velit omnis ut ratione quia magnam nihil...
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-2/3 p-8">

          {/* Mobile: Show Logo Centered */}
          <div className="md:hidden flex flex-col items-center mb-4">
            <img src="./images/logo-crm.png" alt="logo" className="w-50 mb-2" />
            <h2 className="text-xl font-bold text-gray-800">CRM Login</h2>
          </div>

          {/* Desktop: Title */}
          <h2 className="hidden md:block text-2xl font-bold text-gray-800 mb-2">CRM Login</h2>
          <p className="text-gray-600 mb-6">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full shadow-md p-2 outline-none rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full shadow-md p-2 outline-none rounded"
              required
            />

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md font-medium transition duration-150 ease-in-out ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate('/register')}
                className="text-pink-500 hover:underline font-medium"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
