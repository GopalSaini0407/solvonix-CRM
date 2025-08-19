"use client";

import { useState } from "react";

export default function DynamicForm() {
  const [fields, setFields] = useState([
    { id: 1, label: "Name", type: "text", value: "", required: true },
    { id: 2, label: "Email", type: "email", value: "", required: true },
  ]);

  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    required: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFieldChange = (id, value) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };

  const addField = () => {
    if (!newField.label) return alert("Field label required!");
    setFields((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: newField.label,
        type: newField.type,
        required: newField.required,
        value: "",
      },
    ]);
    setNewField({ label: "", type: "text", required: false });
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {};
    fields.forEach((f) => {
      data[f.label] = f.value;
    });
    console.log("Form Data:", data);
    alert("Check console for form data!");
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Dynamic Form Builder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label className="font-medium mb-1">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type}
              value={field.value}
              required={field.required}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
        >
          Submit
        </button>
      </form>

      {/* Add Field Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
        >
          Add New Field
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96 relative">
            <h3 className="text-xl font-bold mb-4">Add New Field</h3>
            <input
              type="text"
              placeholder="Field Label"
              value={newField.label}
              onChange={(e) =>
                setNewField((prev) => ({ ...prev, label: e.target.value }))
              }
              className="w-full border border-gray-300 p-2 rounded mb-3"
            />
            <select
              value={newField.type}
              onChange={(e) =>
                setNewField((prev) => ({ ...prev, type: e.target.value }))
              }
              className="w-full border border-gray-300 p-2 rounded mb-3"
            >
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="password">Password</option>
            </select>
            <label className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                checked={newField.required}
                onChange={(e) =>
                  setNewField((prev) => ({
                    ...prev,
                    required: e.target.checked,
                  }))
                }
              />
              <span>Required</span>
            </label>

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-800 py-1 px-3 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={addField}
                className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
              >
                Add Field
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
