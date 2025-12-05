import React, { useState } from "react";

export default function ReportItem() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    type: "lost",
    location: "",
    date: "",
    contact: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      data.append(key, value)
    );
    if (image) data.append("image", image);

    try {
      const res = await fetch("/api/report", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Item reported successfully!");
        setFormData({
          name: "",
          category: "",
          description: "",
          type: "lost",
          location: "",
          date: "",
          contact: "",
        });
        setImage(null);
        setPreview(null);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting the report");
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Report Lost / Found Item
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="font-semibold block mb-1">Item Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            placeholder="Wallet, Phone, Bag..."
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Documents">Documents</option>
            <option value="Accessories">Accessories</option>
            <option value="Clothing">Clothing</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="font-semibold block mb-1">Description</label>
          <textarea
            name="description"
            required
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            placeholder="Describe the item..."
          ></textarea>
        </div>

        <div className="flex gap-4 items-center">
          <span className="font-semibold">Type:</span>
          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              formData.type === "lost"
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFormData({ ...formData, type: "lost" })}
          >
            Lost
          </button>

          <button
            type="button"
            className={`px-4 py-2 rounded-lg ${
              formData.type === "found"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setFormData({ ...formData, type: "found" })}
          >
            Found
          </button>
        </div>

        <div>
          <label className="font-semibold block mb-1">Location</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            placeholder="Where did you lose/find it?"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Date</label>
          <input
            type="date"
            name="date"
            required
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Contact Info</label>
          <input
            type="text"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            placeholder="Phone number or email"
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 w-40 h-40 object-cover rounded-lg border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
}
