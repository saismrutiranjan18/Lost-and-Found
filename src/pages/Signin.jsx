import React from "react";
import { useNavigate, Link } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleIdentifierChange = (e) => setIdentifier(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateForm = () => {
    if (!identifier.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // TODO: Add authentication logic here
    // For now, navigate to /home if validation passes
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
