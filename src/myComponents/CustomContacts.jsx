"use client";

import { useState } from "react";
import { Pencil, Trash2 ,Plus} from "lucide-react"; // ✅ icons import

export default function CustomContacts() {
  const [fields, setFields] = useState([
    { id: 1, label: "Name", type: "text", value: "", required: true },
    { id: 2, label: "Email", type: "email", value: "", required: true },
    { id: 3, label: "Phone", type: "number", value: "", required: true },

  ]);

  const [newField, setNewField] = useState({
    label: "",
    type: "text",
    required: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editFieldId, setEditFieldId] = useState(null); // ✅ for editing

  const handleFieldChange = (id, value) => {
    setFields((prev) =>
      prev.map((f) => (f.id === id ? { ...f, value } : f))
    );
  };

  const addOrUpdateField = () => {
    if (!newField.label) return alert("Field label required!");

    if (editFieldId) {
      //  update mode
      setFields((prev) =>
        prev.map((f) =>
          f.id === editFieldId ? { ...f, ...newField } : f
        )
      );
      setEditFieldId(null);
    } else {
      // ✅ add mode
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
    }

    setNewField({ label: "", type: "text", required: false });
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const handleEdit = (field) => {
    setNewField({
      label: field.label,
      type: field.type,
      required: field.required,
    });
    setEditFieldId(field.id);
    setIsModalOpen(true);
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
    <div className="grid grid-cols-12 gap-4 p-4">
        <div className="col-span-4">
          
        </div>
<div className="p-6 col-span-7  bg-white shadow-md rounded-md">
    
    <div className="flex justify-between items-center">
    <h5 className="text-xl font-bold mb-4">Personal Details</h5>
       {/* Add Field Button */}
       <div className="mt-6">
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition flex items-center"
      >
      <Plus size={20} className="me-2"/>
        Add New Field 
      </button>
    </div>
    </div>
    <form onSubmit={handleSubmit} className="space-y-4">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {fields.map((field) => (
    <div key={field.id} className="flex flex-col">
      <label className="font-medium mb-1 flex justify-between">
        <span>
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
        </span>

        <span className="flex space-x-2">
          {/* ✅ Edit button */}
          <button
            type="button"
            onClick={() => handleEdit(field)}
            className="p-2 text-blue-500 hover:text-blue-700"
          >
            <Pencil size={20} />
          </button>

          {/* ✅ Delete button */}
          <button
            type="button"
            onClick={() => handleDelete(field.id)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={20} />
          </button>
        </span>
      </label>

      <input
        type={field.type}
        value={field.value}
        required={field.required}
        disabled={true}
        onChange={(e) => handleFieldChange(field.id, e.target.value)}
        className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
    </div>
  ))}
</div>

<div className="mt-4">
  <button
    type="submit"
    className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition"
  >
    Publish
  </button>
</div>
</form>


    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-lg w-96 relative">
          <h3 className="text-xl font-bold mb-4">
            {editFieldId ? "Edit Field" : "Add New Field"}
          </h3>
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
              onClick={() => {
                setIsModalOpen(false);
                setEditFieldId(null);
                setNewField({ label: "", type: "text", required: false });
              }}
              className="bg-gray-300 text-gray-800 py-1 px-3 rounded hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addOrUpdateField}
              className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 transition"
            >
              {editFieldId ? "Update" : "Add Field"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  </div>
);
    
    
}
