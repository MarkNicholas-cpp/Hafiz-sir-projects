import { useState } from "react";
import "../index.css";
import apiInsance from "./Utils/apiInstance";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const Submit = () => {
    console.log(email, password);
    apiInsance
      .post("/login", { email: email, password: password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.payload.userId);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-10 max-w-lg w-full mx-auto border border-gray-700">
          <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
          <form
            className="space-y-6"
            onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => {
              e.preventDefault();
              Submit();
            }}
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md"
              >
                Sign In
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-300">
            Don't have an account?
            <a href="#" className="text-indigo-500 hover:text-indigo-400">
              Click here to register
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
