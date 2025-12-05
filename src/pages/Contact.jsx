import React, { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: "",
    error: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ success: "", error: "" });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ loading: true, success: "", error: "" });

    emailjs
      .send(
        "YOUR_SERVICE_ID",   
        "YOUR_TEMPLATE_ID", 
        {
          from_name: formData.name,
          reply_to: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"     
      )
      .then(() => {
        setStatus({
          loading: false,
          success: "Message sent successfully!",
          error: "",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setStatus({
          loading: false,
          success: "",
          error: "Something went wrong. Try again!",
        });
      });
  }

  return (
    <div className="min-h-screen h-full w-full bg-gray-100 flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-5 border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Contact Us
        </h2>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Name
          </label>
          <input
            name="name"
            type="text"
            value={formData.name}
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Subject
          </label>
          <input
            name="subject"
            type="text"
            value={formData.subject}
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter subject"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            required
            rows="4"
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Write your message..."
          ></textarea>
        </div>

        {status.success && (
          <p className="text-green-600 font-semibold text-center">
            {status.success}
          </p>
        )}
        {status.error && (
          <p className="text-red-600 font-semibold text-center">
            {status.error}
          </p>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={status.loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
          >
            {status.loading ? "Sending..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
