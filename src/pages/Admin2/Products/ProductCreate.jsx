import React, { useState } from "react";

const ProductCreate = ({ onCreate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    brand: "",
    price: "",
    category: "",
    categoryTypeList: [],
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleCategoryTypesChange = (e) => {
    setFormData((p) => ({ ...p, categoryTypeList: e.target.value.split(",").map((v) => v.trim()) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now(),
      price: parseFloat(formData.price),
    };
    onCreate(newProduct);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-black/50 shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price ($)</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
            required
          >
            <option value="">Select Category</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Types <span className="text-xs text-gray-500">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={formData.categoryTypeList.join(", ")}
            onChange={handleCategoryTypesChange}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            className="mt-1 w-full p-2 border rounded-md"
          />
          {formData.thumbnail && (
            <img
              src={formData.thumbnail}
              alt="Preview"
              className="mt-2 w-24 h-24 object-cover border rounded-md"
            />
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md">
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
