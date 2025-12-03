import React, { useState, useEffect } from "react";

export default function LostItems() {
  const [items, setItems] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    fetch("/api/items?type=lost")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const filtered = items.filter((item) => {
    return (
      item.name.toLowerCase().includes(keyword.toLowerCase()) &&
      (category ? item.category === category : true) &&
      (location ? item.location.toLowerCase().includes(location.toLowerCase()) : true)
    );
  });

  return (
    <div className="p-6 w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Lost Items</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-gray-100 w-full md:w-1/3"
        />

        <select
          className="px-4 py-2 rounded-lg border bg-gray-100"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All categories</option>
          <option>Electronics</option>
          <option>Documents</option>
          <option>Clothing</option>
          <option>Accessories</option>
        </select>

        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-4 py-2 rounded-lg border bg-gray-100 w-full md:w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.length === 0 && (
          <p className="text-gray-600 col-span-full">No items found.</p>
        )}

        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-xl overflow-hidden border hover:shadow-lg transition"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {item.description}
              </p>

              <div className="text-sm text-gray-500 mt-2">
                📍 {item.location}  
                <br />
                📅 {item.date}
              </div>

              <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
