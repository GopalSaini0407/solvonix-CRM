"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { AVAILABLE_FIELDS } from "./AVAILABLE_FIELDS";
import DynamicForm from "./DynamicForm";
import ViewDynamicFields from "./ViewDynamicFields";

export default function AddDynamicFields() {
  const [modelData, setModelData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [fieldData, setFieldData] = useState({
    field_name: "",
    field_for: "",
    field_type: "",
    display_text: "",
    field_group: "",
    placeholder: "",
    field_options: "",
    priority: null,
    is_required: 0,
    is_email: 0,
  });

  /* ------------------ Open Modal with Selected Field ------------------ */
  const handleAdd = (field) => {
    setIsOpen(true);
    setModelData(field);
    setFieldData({
      ...field,
      field_type: field.field_type || "",
      field_options: field.field_options ?? "",
    });
  };

  /* ------------------ Save Field ------------------ */
  const handleSave = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!fieldData.field_name || !fieldData.display_text || !fieldData.field_group) {
      alert("❌ Please fill all required fields: Name, Display Text, Group");
      return;
    }

    setSaving(true);

    try {
      const token = localStorage.getItem("login_token");

      await axios.post(
        "http://localhost/crm-solvonix/api/v1/user/save/custom/field",
        { ...fieldData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Field saved successfully!");
      setIsOpen(false);
      setFieldData({
        field_name: "",
        field_for: "",
        field_type: "",
        display_text: "",
        field_group: "",
        placeholder: "",
        field_options: "",
        priority: null,
        is_required: 0,
        is_email: 0,
      });
    } catch (error) {
      console.error("Error saving field:", error);
      alert("❌ Failed to save field. Check console for details.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="grid md:grid-cols-4 gap-6">
        {/* Left: available fields */}
        <div className="col-span-1">
          <h1 className="text-xl font-bold mb-4">Available Fields</h1>
          <div className="border border-gray-400 rounded p-4 bg-gray-50">
            <p className="text-sm text-gray-600 mb-3">Add your field to the form</p>
            <div className="space-y-2">
              {AVAILABLE_FIELDS.map((f) => (
                <div
                  key={f.key}
                  className="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-300"
                >
                  <div>
                    <div className="font-medium">{f.key}</div>
                    <div className="text-xs text-gray-500">{f.field_type}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-emerald-600 text-white p-1 rounded hover:bg-emerald-700"
                      title="Add field"
                      onClick={() => handleAdd(f)}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* right: available fields */}
         <div className="col-span-3">
          <ViewDynamicFields/>
         </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4">
          <div
            className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden p-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="text-xl font-semibold text-gray-800">Save Field</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                X
              </button>
            </div>

            {/* Dynamic Form */}
            <div className="p-2">
              <DynamicForm
                fieldData={fieldData}
                setFieldData={setFieldData}
                handleSave={handleSave}
                saving={saving}
              />
            </div>

            {/* Loader */}
            {saving && (
              <div className="absolute inset-0 flex justify-center items-center bg-white/70 rounded-lg">
                <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
