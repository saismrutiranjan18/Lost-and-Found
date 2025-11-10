import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    campus: '',
    dept: '',
    id: '',
  });

  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
    setSubmitError("");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (!formData.email) newErrors.email = "Email is required";
    // Basic email regex:
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!formData.phone) newErrors.phone = "Phone is required";
    else if (!/^\d{7,15}$/.test(formData.phone)) newErrors.phone = "Invalid phone number";
    if (!formData.campus.trim()) newErrors.campus = "Campus is required";
    if (!formData.dept.trim()) newErrors.dept = "Department is required";
    if (!formData.id.trim()) newErrors.id = "ID is required";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const storeUser = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      user => 
        user.username === formData.username ||
        user.email === formData.email
    );
    if (found) {
      setSubmitError("Username or Email already exists.");
      return false;
    }
    users.push({
      username: formData.username,
      password: formData.password,
      email: formData.email,
      phone: formData.phone,
      campus: formData.campus,
      dept: formData.dept,
      id: formData.id,
    });
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate()) return;
    if (!storeUser()) return;
    
    // TODO: Submit form data to backend here if needed
    // On success navigate to signin page
    //UPDATE: Storing user data in localStorage for simplicity for now.
    navigate('/signin');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
      <h1 className="text-4xl font-bold mb-6 text-center text-indigo-900">Signup Page</h1>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {[
          { label: 'Username', id: 'username', type: 'text', placeholder: 'Enter your username', autoComplete: 'username' },
          { label: 'Password', id: 'password', type: 'password', placeholder: 'Enter your password', autoComplete: 'new-password' },
          { label: 'Email', id: 'email', type: 'email', placeholder: 'Enter your email', autoComplete: 'email' },
          { label: 'Phone', id: 'phone', type: 'tel', placeholder: 'Enter your phone number', autoComplete: 'tel' },
          { label: 'Campus', id: 'campus', type: 'text', placeholder: 'Enter your campus' },
          { label: 'Dept', id: 'dept', type: 'text', placeholder: 'Enter your department' },
          { label: 'Id', id: 'id', type: 'text', placeholder: 'Enter your ID' },
        ].map(({ label, id, type, placeholder, autoComplete }) => (
          <label key={id} className="block mb-2 font-semibold" htmlFor={id}>
            {label}:
            <input
              id={id}
              type={type}
              placeholder={placeholder}
              autoComplete={autoComplete}
              value={formData[id]}
              onChange={handleChange}
              className={`w-full p-2 border rounded mb-1 ${
                errors[id] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
          </label>
        ))}
        {submitError && <p className='text-red-600 text-center'>{submitError}</p>}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition duration-200"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
