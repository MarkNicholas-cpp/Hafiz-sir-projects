import { useState } from "react";
import "../index.css";
import apiInstance from "./Utils/apiInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { MongooseError } from "../Interfaces/MongooseError";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const notify = (msg: string, type = "success") => {
    if (type === "success") {
      toast.success(msg);
    } else {
      toast.error(msg);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notify("Passwords do not match!", "error");
      return;
    }

    apiInstance
      .post("/user", { email: email, password: password })
      .then(() => {
        notify("Registration successful!", "success");
        notify("Waiting", "success");
        setInterval(() => {
          navigate("/login");
        }, 5000);
      })
      .catch((err: AxiosError<MongooseError>) => {
        console.log(err);
        notify(
          err.response?.data?.code == 11000
            ? err.response?.data?.errorResponse.errmsg
            : err.response?.data?.errorResponse.errmsg ||
                "Something Went wrong",
          "error"
        );
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-gray-800 text-white rounded-lg shadow-lg p-10 max-w-lg w-full mx-auto border border-gray-700">
          <h2 className="text-3xl font-bold mb-8 text-center">Register</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                className="block w-full px-4 py-3 mt-1 text-gray-900 bg-white border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-md"
              >
                Register
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-300">
            Already have an account?
            <a href="/login" className="text-indigo-500 hover:text-indigo-400">
              Click here to login
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
