import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      
      
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data))
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "something went wrong");
    }
  };
  return (
    <div className="w-full flex justify-center mt-6 sm:mt-10 px-3">
  <fieldset className="w-full max-w-md bg-base-200 border border-base-300 p-4 sm:p-6 rounded-box shadow-md">
    <legend className="text-xl sm:text-2xl text-center font-semibold mb-4">
      {isLoginForm ? "Login" : "Sign Up"}
    </legend>

    {!isLoginForm && (
      <>
        <label className="block text-sm sm:text-base mt-3 mb-1">First Name</label>
        <input
          type="text"
          className="input w-full"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="block text-sm sm:text-base mt-3 mb-1">Last Name</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </>
    )}

    <label className="block text-sm sm:text-base mt-3 mb-1">Email ID</label>
    <input
      type="email"
      className="input w-full"
      placeholder="Email"
      value={emailId}
      onChange={(e) => setEmailId(e.target.value)}
    />

    <label className="block text-sm sm:text-base mt-3 mb-1">Password</label>
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        className="input w-full pr-10"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOffIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
        ) : (
          <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
        )}
      </button>
    </div>

    {/* Password Hint (Only on Signup) */}
    {!isLoginForm && (
      <p className="text-xs sm:text-sm text-gray-400 mt-1">
        Password must contain at least 8 characters, including one uppercase letter, one number, and one special character.
      </p>
    )}

    {error && (
      <p className="mt-2 text-xs sm:text-sm text-red-400">{error}</p>
    )}

    <button
      className="btn btn-primary w-full btn-sm sm:btn-md mt-6"
      onClick={isLoginForm ? handleLogin : handleSignUp}
    >
      {isLoginForm ? "Login" : "Sign Up"}
    </button>

    <p
      onClick={() => setIsLoginForm((val) => !val)}
      className="text-center mt-4 text-sm sm:text-base cursor-pointer text-blue-400 hover:underline"
    >
      {isLoginForm ? "New User? Sign Up" : "Existing User? Login"}
    </p>
  </fieldset>
</div>


  );
};

// Simple eye icon components
const EyeIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeOffIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
    />
  </svg>
);

export default Login;
