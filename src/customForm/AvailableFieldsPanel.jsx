import React from "react";
import { AVAILABLE_FIELDS } from "../utils/constants";

const AvailableFieldsPanel = ({ onAddField }) => {
  return (
    <div className="col-span-1">
      <h1 className="text-xl font-bold mb-4">Available Fields</h1>
      <div className="border border-gray-400 rounded p-4 bg-gray-50">
        <p className="text-sm text-gray-600 mb-3">Drag and drop fields to your form or click Add.</p>
        <div className="space-y-2">
          {AVAILABLE_FIELDS.map((f) => (
            <div
              key={f.key}
              id={`avail-${f.key}`}
              draggable
              data-draggable={`avail-${f.key}`}
              style={{ cursor: "grab" }}
              className="flex items-center justify-between bg-white p-2 rounded shadow-sm border border-gray-300"
            >
              <div>
                <div className="font-medium">{f.label}</div>
                <div className="text-xs text-gray-500">{f.type}</div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onAddField(f.key)} 
                  className="bg-emerald-600 text-white p-1 rounded hover:bg-emerald-700"
                  title="Add field"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvailableFieldsPanel;