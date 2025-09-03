import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import SortableRow from "./SortableRow";
import FieldRenderer from "./FieldRenderer";
import PriorityControls from "./PriorityControls";
import { Lock, Pencil, Trash2 } from "lucide-react";

const FormCanvas = ({
  formFields,
  sortableIds,
  onEditField,
  onDeleteField,
  onUpdateFieldValue,
  onPriorityChange
}) => {
  return (
    <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
      <div className="space-y-3">
        <div id="canvas" className="space-y-3">
          {formFields.length === 0 && (
            <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded text-gray-500">
              No fields yet — drag and drop from the left or click the Add button.
            </div>
          )}

          {formFields.map((f, idx) => (
            <SortableRow key={f.id} id={f.id} isLocked={f.locked}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="text-sm font-medium">
                      {f.label} {f.required && <span className="text-rose-500">*</span>}
                      {f.locked && <Lock className="w-4 h-4 text-gray-400 inline-block ml-1" />}
                    </div>
                    <div className="text-xs text-gray-500">
                      Type: {f.type} • Group: {f.group || "—"} • Priority: {idx + 1}
                      {f.locked && " • From API"}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {f.locked && (
                      <PriorityControls
                        field={f}
                        index={idx}
                        totalFields={formFields.length}
                        onPriorityChange={onPriorityChange}
                      />
                    )}
                    {!f.locked && (
                      <div className="flex gap-2">
                        <button 
                          type="button" 
                          onClick={() => onEditField(f)} 
                          className="px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1 text-sm" 
                          title="Edit"
                        >
                          <Pencil className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button 
                          type="button" 
                          onClick={() => onDeleteField(f.id)} 
                          className="p-1 rounded hover:bg-gray-100" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <FieldRenderer field={f} onChange={(val) => onUpdateFieldValue(f.id, val)} />
              </div>
            </SortableRow>
          ))}
        </div>
      </div>
    </SortableContext>
  );
};

export default FormCanvas;