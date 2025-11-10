import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleIdentifierChange = (e) => {
    setIdentifier(e.target.value);
    setError("");
  };
  const handlePasswordChange = (e) => { 
    setPassword(e.target.value);
    setError(""); 
  };

  const validateForm = () => {
    if (!identifier.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const authenticate = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      user => 
      (user.username === identifier || user.email === identifier) && 
      user.password === password
    );
    if (!found) {
      setError("Invalid username/email or password.");
      return false;
    }
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (!authenticate()) return;

    // TODO: Add authentication logic here
    // For now, navigate to /home if validation passes

    //UPDATE: Authentication added but I have created the authentication function 
    // to check user credentials against stored users in localStorage
    // Not storing any session info for simplicity
    navigate("/home");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-900">
        Signin Page
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block mb-2 font-semibold" htmlFor="identifier">
          Username/Email:
          <input
            id="identifier"
            type="text"
            autoComplete="username"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your username"
            value={identifier}
            onChange={handleIdentifierChange}
            required
          />
        </label>
        <label className="block mb-2 font-semibold" htmlFor="password">
          Password:
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </label>
        {error && <p className="text-red-600 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Sign In
        </button>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signin;
