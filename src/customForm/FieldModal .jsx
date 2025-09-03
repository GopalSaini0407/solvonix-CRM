import React from "react";
import { Save, X } from "lucide-react";
import { AVAILABLE_FIELDS } from "../utils/constants";

const FieldModal = ({ draft, setDraft, editingId, isSaving, onSave, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">{editingId ? "Edit Field" : "Add Field"}</h3>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
              <input 
                type="text" 
                placeholder="Field Label" 
                value={draft.label} 
                onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))} 
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
              />
              <p className="text-xs text-gray-500 mt-1">
                Field name: {draft.label ? draft.label.toLowerCase().replace(/\s+/g, '_') : '—'}
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select 
                value={draft.type} 
                onChange={(e) => setDraft((d) => ({ ...d, type: e.target.value, config: {} }))} 
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
                disabled={!!editingId}
              >
                {AVAILABLE_FIELDS.map((a) => (
                  <option key={a.key} value={a.type}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
              <input 
                type="text" 
                placeholder="Group (optional)" 
                value={draft.group} 
                onChange={(e) => setDraft((d) => ({ ...d, group: e.target.value }))} 
                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
              />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  checked={draft.required} 
                  onChange={(e) => setDraft((d) => ({ ...d, required: e.target.checked }))} 
                  className="rounded"
                />
                Required Field
              </label>
            </div>

            {/* Type-specific configuration fields would go here */}
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button 
            onClick={onSave} 
            disabled={isSaving} 
            className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50 flex items-center gap-2 hover:bg-emerald-700"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                {editingId ? "Save Field" : "Add Field"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldModal;