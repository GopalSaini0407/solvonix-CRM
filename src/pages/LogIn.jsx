import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contextAPI/contextAuth/AuthContext";

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  console.log(login,"loging");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ type: "", message: "" });
    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost/crm-solvonix/api/v1/user/login`,
        { email, password },
        { timeout: 1500 }
      );
       console.log(response);
      if (response.status === 200 && response.data.access_token) {
        const token = response.data.access_token;

        // ✅ AuthContext ke login() ko call karo
        login({ token, user: response.data.user });

        // ✅ LocalStorage me bhi same key se save karo
        localStorage.setItem("token", token);

        setAlert({ type: "success", message: "✅ Login Successful!" });

        // ✅ Redirect after 1.5 sec
        setTimeout(() => navigate("/"), 1500);
      } else {
        setAlert({
          type: "error",
          message: response.data.message || "Login failed ❌",
        });
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setAlert({
            type: "error",
            message: "❌ Invalid password. Please try again.",
          });
        } else if (err.response.status === 404) {
          setAlert({
            type: "error",
            message: "❌ Email not found. Please register first.",
          });
        } else {
          setAlert({
            type: "error",
            message: err.response.data.message || "Something went wrong ❌",
          });
        }
      } else {
        setAlert({
          type: "error",
          message: "⚠️ Server not reachable. Try again later.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-gray-100 px-4 py-8"
      style={{ backgroundImage: `url('./images/register-img.png')` }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-[1000px] overflow-hidden">
        {/* LEFT SECTION */}
        <div className="hidden md:flex w-full md:w-1/3 bg-gray-200 p-8 flex-col">
          <div className="img-box">
            <img src="./images/logo-crm.png" alt="logo" className="w-100" />
          </div>
          <p className="mt-4 text-gray-600 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            velit omnis ut ratione quia magnam nihil...
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="w-full md:w-2/3 p-8">
          <div className="md:hidden flex flex-col items-center mb-4">
            <img src="./images/logo-crm.png" alt="logo" className="w-50 mb-2" />
            <h2 className="text-xl font-bold text-gray-800">CRM Login</h2>
          </div>

          <h2 className="hidden md:block text-2xl font-bold text-gray-800 mb-2">
            CRM Login
          </h2>
          <p className="text-gray-600 mb-6">Sign in to your account</p>

          {/* ✅ Alert Box */}
          {alert.message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm font-medium ${
                alert.type === "success"
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {alert.message}
            </div>
          )}

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
                onClick={() => navigate("/register")}
                className="text-pink-500 hover:underline font-medium"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
