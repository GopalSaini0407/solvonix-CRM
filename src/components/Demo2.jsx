"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2, Plus, Lock, Save, X, AlertCircle, CheckCircle, ArrowUp, ArrowDown } from "lucide-react";

/**
 * Enhanced FormBuilder with API Integration
 * - Left: available field types (draggable)
 * - Right: canvas (drop to add). Canvas items are sortable (dnd-kit sortable)
 * - Edit modal to customize each added field
 * - Integrated with API for saving, updating fields and priorities
 */

/* ---------- helpers ---------- */
const uid = () => Math.random().toString(36).slice(2, 9);

// Predefined lists
const PREDEFINED_LISTS = {
  countries: [
    "United States", "Canada", "United Kingdom", "Australia", "Germany", 
    "France", "Japan", "India", "Brazil", "Mexico"
  ],
  states: [
    "California", "Texas", "New York", "Florida", "Illinois",
    "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"
  ],
  genders: ["Male", "Female", "Non-binary", "Prefer not to say"]
};

/* Available master list (left column) */
const AVAILABLE_FIELDS = [
  { key: "string", label: "Text", type: "string", "is_email":0, defaultConfig: { placeholder: "" } },
  { key: "large_text", label: "Large Text", "is_email":0, type: "large_text", defaultConfig: { placeholder: "", rows: 4 } },
  { key: "list", label: "List", type: "list","is_email":0, defaultConfig: { itemPlaceholder: "", predefinedList: null, customItems: [] } },
  { key: "date", label: "Date", type: "date","is_email":0, defaultConfig: {} },
  { key: "datetime", label: "Date & Time", type: "datetime","is_email":0, defaultConfig: {} },
  { key: "integer", label: "Integer", type: "integer","is_email":0, defaultConfig: { placeholder: "", min: null, max: null } },
  { key: "decimal", label: "Decimal", type: "decimal","is_email":0, defaultConfig: { placeholder: "", step: 0.01 } },
  { key: "file", label: "File", type: "file","is_email":0, defaultConfig: { accept: ".png,.jpg", multiple: false } },
  { key: "options", label: "Options", type: "options","is_email":0, defaultConfig: { options: ["Option 1", "Option 2"], inputType: "radio" } },
  { key: "email", label: "Email", type: "email","is_email":0, defaultConfig: { placeholder: "" } },
];

// Mapping between internal field types and API field types
const FIELD_TYPE_MAPPING = {
  string: "String",
  large_text: "LargeText",
  list: "List",
  date: "Date",
  datetime: "DateTime",
  integer: "Integer",
  decimal: "Decimal",
  file: "File",
  options: "Options",
  email: "Email"
};

// Reverse mapping for API to internal types
const API_TYPE_MAPPING = Object.fromEntries(
  Object.entries(FIELD_TYPE_MAPPING).map(([key, value]) => [value, key])
);

// Locked field names
const LOCKED_FIELDS = ['name', 'email', 'phone'];

/* ---------- Sortable row for items inside form canvas ---------- */
function SortableRow({ id, children, isLocked = false }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ 
    id, 
    disabled: isLocked 
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };
  
  return (
    <div ref={setNodeRef} style={style} className="bg-white rounded p-3 border border-gray-400 shadow-sm">
      <div className="flex items-start gap-3">
        {!isLocked ? (
          <button {...attributes} {...listeners} className="p-1 cursor-grab" aria-label="drag-handle">
            <GripVertical className="w-5 h-5 text-gray-400" />
          </button>
        ) : (
          <div className="p-1">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

/* ---------- Field renderer for preview and data collection ---------- */
function FieldRenderer({ field, onChange }) {
  const { type, value, required, config = {} } = field;

  const baseInputClasses = "border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 px-3 py-2 w-full";

  switch (type) {
    case "integer":
      return (
        <input
          type="number"
          inputMode="numeric"
          step={1}
          value={value ?? ""}
          placeholder={config.placeholder || ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(Number(e.target.value || 0))}
        />
      );

    case "decimal":
      return (
        <input
          type="number"
          step={config.step ?? 0.01}
          value={value ?? ""}
          placeholder={config.placeholder || ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        />
      );

    case "string":
      return (
        <input
          type="text"
          value={value ?? ""}
          placeholder={config.placeholder || ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(e.target.value)}
        />
      );
      
    case "email":
      return (
        <input
          type="email"
          value={value ?? ""}
          placeholder={config.placeholder || ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "large_text":
      return (
        <textarea
          rows={config.rows ?? 4}
          value={value ?? ""}
          placeholder={config.placeholder || ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "options":
      if (config.inputType === "checkbox") {
        // For checkboxes, value should be an array of selected options
        const selectedOptions = Array.isArray(value) ? value : [];
        
        return (
          <div className="space-y-2">
            {(config.options || []).map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(opt)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onChange([...selectedOptions, opt]);
                    } else {
                      onChange(selectedOptions.filter(item => item !== opt));
                    }
                  }}
                  className="rounded"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      } else {
        // Default to radio buttons
        return (
          <div className="space-y-2">
            {(config.options || []).map((opt, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => onChange(e.target.value)}
                  className="rounded-full"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        );
      }

    case "date":
      return (
        <input
          type="date"
          value={value ?? ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "time":
      return (
        <input
          type="time"
          value={value ?? ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "datetime":
      return (
        <input
          type="datetime-local"
          value={value ?? ""}
          required={required}
          className={baseInputClasses}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "list":
      // Enhanced list field with predefined options and custom items
      const predefinedOptions = config.predefinedList ? PREDEFINED_LISTS[config.predefinedList] || [] : [];
      const customItems = config.customItems || [];
      const allOptions = [...predefinedOptions, ...customItems];
      
      return (
        <div className="space-y-3">
          <select
            value={value || ""}
            required={required}
            className={baseInputClasses}
            onChange={(e) => onChange(e.target.value)}
          >
            <option value="">-- Select --</option>
            {allOptions.map((opt, i) => (
              <option key={i} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          
          {config.predefinedList && (
            <div className="text-xs text-gray-500">
              Predefined list: {config.predefinedList}
            </div>
          )}
        </div>
      );

    case "file":
      return (
        <input
          type="file"
          accept={config.accept || undefined}
          multiple={!!config.multiple}
          onChange={(e) =>
            onChange(config.multiple ? Array.from(e.target.files || []) : e.target.files?.[0] || null)
          }
        />
      );

    default:
      return <div>Unsupported type</div>;
  }
}

/* ---------- Priority Controls Component ---------- */
function PriorityControls({ field, index, totalFields, onPriorityChange }) {
  const canMoveUp = index > 0;
  const canMoveDown = index < totalFields - 1;

  const handlePriorityChange = (newPriority) => {
    onPriorityChange(field, newPriority);
  };

  return (
    <div className="flex items-center gap-1 ml-2">
      <button
        onClick={() => handlePriorityChange(index)}
        disabled={!canMoveUp}
        className={`p-1 rounded ${canMoveUp ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300'}`}
        title="Move up"
      >
        <ArrowUp className="w-4 h-4" />
      </button>
      <button
        onClick={() => handlePriorityChange(index + 2)}
        disabled={!canMoveDown}
        className={`p-1 rounded ${canMoveDown ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300'}`}
        title="Move down"
      >
        <ArrowDown className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ---------- MAIN FormBuilder component ---------- */
export default function FormBuilder() {
  // form fields (canvas)
  const [formFields, setFormFields] = useState([]);

  // modal/draft for editing or creating
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ 
    label: "", 
    type: "string", 
    required: false, 
    group: "", 
    config: {} ,
    is_email:0
  });

  // API state
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
  const [existingFieldNames, setExistingFieldNames] = useState(new Set());

  // drag sensors (for dragging available items to canvas and sorting)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));
  const [activeId, setActiveId] = useState(null);

  // Get token from localStorage (adjust based on your auth implementation)
  const getToken = () => {
    return localStorage.getItem('login_token') || '';
  };

  // Get active field for drag overlay
  const activeField = useMemo(() => {
    if (!activeId) return null;
    
    // Check if it's an available field
    if (String(activeId).startsWith("avail-")) {
      const key = String(activeId).replace("avail-", "");
      return AVAILABLE_FIELDS.find((a) => a.key === key);
    }
    
    // Check if it's a form field
    return formFields.find((f) => f.id === activeId);
  }, [activeId, formFields]);

  // Separate locked and unlocked fields
  const lockedFields = formFields.filter(field => field.locked);
  const unlockedFields = formFields.filter(field => !field.locked);

  // Fetch existing fields from API on component mount
  useEffect(() => {
    fetchExistingFields();
  }, []);

  // Fetch existing fields from API
  const fetchExistingFields = async () => {
    setIsLoading(true);
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
      
      const response = await fetch("http://localhost/crm-solvonix/api/v1/user/get/contacts/fields", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (response.ok) {
        // Process the API response and convert to our format
        const processedFields = [];
        const fieldNames = new Set();
        
        // Iterate through each group
        Object.entries(result.data).forEach(([group, fields]) => {
          fields.forEach((field, index) => {
            const internalType = API_TYPE_MAPPING[field.field_type] || "string";
            
            // Prepare config based on field type
            let config = {};
            
            if (internalType === "options") {
              config.options = field.field_options ? field.field_options.split(",") : [];
              config.inputType = field.is_multiple ? "checkbox" : "radio";
            } else if (internalType === "list") {
              // Check if field_options is a predefined list key
              if (PREDEFINED_LISTS[field.field_options]) {
                config.predefinedList = field.field_options;
              } else {
                config.customItems = field.field_options ? field.field_options.split(",") : [];
              }
            } else {
              config.placeholder = field.placeholder || "";
              
              // Type-specific config
              if (internalType === "decimal") {
                config.step = 0.01;
              } else if (internalType === "file") {
                config.multiple = !!field.is_multiple;
              }
            }
            
            // Check if field should be locked (only name, email, phone)
            const isLocked = LOCKED_FIELDS.includes(field.field_name);
            
            const formField = {
              id: `existing-${field.field_name}`,
              label: field.display_text,
              type: internalType,
              value: "",
              required: !!field.is_required,
              group: field.field_group || group,
              config,
              locked: isLocked,
              apiData: field, // Store original API data for reference
              fieldId: field.id // Store the field ID for API updates
            };
            
            processedFields.push(formField);
            fieldNames.add(field.field_name);
          });
        });
        
        // Sort by priority
        processedFields.sort((a, b) => (a.apiData.priority || 0) - (b.apiData.priority || 0));
        
        setFormFields(processedFields);
        setExistingFieldNames(fieldNames);
      } else {
        throw new Error(result.message || "Failed to fetch fields");
      }
    } catch (error) {
      console.error("Error fetching fields:", error);
      setSaveMessage({ 
        type: 'error', 
        text: error.message || "Failed to fetch existing fields. Please try again." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  /* Handle drag start */
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  /* Handle drop end:
     - If active.item from available (id prefix 'avail-') and dropped over canvas or an item -> add
     - If active.item is a canvas item and dropped over another canvas item -> reorder via arrayMove
  */
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;

    // Check if active item is a locked field
    const activeField = formFields.find(f => f.id === active.id);
    if (activeField && activeField.locked) return;

    // Reorder inside canvas when dragging canvas items (their ids equal to actual ids)
    const activeIndex = formFields.findIndex((f) => f.id === active.id);
    const overIndex = formFields.findIndex((f) => f.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      // Don't allow moving locked fields
      if (formFields[activeIndex]?.locked) return;
      
      const newFields = arrayMove(formFields, activeIndex, overIndex);
      setFormFields(newFields);
      return;
    }

    // If dragging available item (id like 'avail-<key>')
    if (String(active.id).startsWith("avail-")) {
      // if dropped over canvas or over an item -> insert
      // if dropped over a form item -> insert before that item
      let insertIndex = formFields.length;
      if (over.id && String(over.id).startsWith("form-")) {
        const fid = String(over.id).replace("form-", "");
        const idx = formFields.findIndex((f) => f.id === fid);
        if (idx !== -1) insertIndex = idx;
      }

      // Ensure we don't insert before locked fields
      const firstLockedIndex = formFields.findIndex(f => f.locked);
      if (firstLockedIndex !== -1 && insertIndex < firstLockedIndex) {
        insertIndex = firstLockedIndex;
      }

      const key = String(active.id).replace("avail-", "");
      const master = AVAILABLE_FIELDS.find((a) => a.key === key);
      if (!master) return;

      // Generate a field name based on label
      const fieldName = master.label.toLowerCase().replace(/\s+/g, '_');
      
      // Check if field already exists
      if (existingFieldNames.has(fieldName)) {
        setSaveMessage({ 
          type: 'error', 
          text: `A field with name "${fieldName}" already exists. Please choose a different field type.` 
        });
        return;
      }

      const newField = {
        id: uid(),
        label: master.label,
        type: master.type,
        value: master.type === "list" ? [] : master.type === "options" ? (master.defaultConfig.inputType === "checkbox" ? [] : "") : "",
        required: false,
        group: "Default",
        config: { ...(master.defaultConfig || {}) },
        locked: false,
      };

      setFormFields((prev) => {
        const next = [...prev];
        next.splice(insertIndex, 0, newField);
        return next;
      });
    }
  };

  /* Add via button (simple) */
  const addAvailableToCanvas = (key) => {
    const master = AVAILABLE_FIELDS.find((a) => a.key === key);
    if (!master) return;
    
    // Generate a field name based on label
    const fieldName = master.label.toLowerCase().replace(/\s+/g, '_');
    
    // Check if field already exists
    if (existingFieldNames.has(fieldName)) {
      setSaveMessage({ 
        type: 'error', 
        text: `A field with name "${fieldName}" already exists. Please choose a different field type.` 
      });
      return;
    }
    
    const newField = {
      id: uid(),
      label: master.label,
      type: master.type,
      value: master.type === "list" ? [] : master.type === "options" ? (master.defaultConfig.inputType === "checkbox" ? [] : "") : "",
      required: false,
      group: "Default",
      config: { ...(master.defaultConfig || {}) },
      locked: false,
    };
    setFormFields((prev) => [...prev, newField]);
  };

  /* Open edit modal */
  const openEdit = (field) => {
    // Don't allow editing locked fields
    if (field.locked) return;
    
    setEditingId(field.id);
    setDraft({
      label: field.label,
      type: field.type,
      required: !!field.required,
      group: field.group || "",
      config: { ...(field.config || {}) },
    });
    setModalOpen(true);
  };

  /* Prepare API payload for a field */
  const prepareFieldPayload = (field, index) => {
    // For options field, format the options as a string
    let fieldOptions = null;
    if (field.type === "options" && field.config.options) {
      fieldOptions = field.config.options.join(",");
    } else if (field.type === "list" && field.config.customItems) {
      fieldOptions = field.config.customItems.join(",");
    } else if (field.type === "list" && field.config.predefinedList) {
      fieldOptions = field.config.predefinedList;
    }
    
    return {
      field_name: field.label.toLowerCase().replace(/\s+/g, '_'),
      field_type: FIELD_TYPE_MAPPING[field.type] || "String",
      display_text: field.label,
      field_options: fieldOptions,
      is_required: field.required ? 1 : 0,
      is_multiple: (field.type === "options" && field.config.inputType === "checkbox") || 
                   (field.type === "file" && field.config.multiple) ? 1 : 0,
      placeholder: field.config.placeholder || null,
      table_name: null,
      table_column: null,
      field_group: field.group || "Default",
      priority: index + 1,
      is_email: field.type === "email" ? 1 : 0
    };
  };

  /* Save field to API */
  const saveFieldToAPI = async (field, index) => {
    setIsSaving(true);
    setSaveMessage({ type: '', text: '' });
    
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
      
      const payload = prepareFieldPayload(field, index);
      
      const response = await fetch("http://localhost/crm-solvonix/api/v1/user/save/contacts/field", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log(response);
      
      if (response.ok) {
        setSaveMessage({ 
          type: 'success', 
          text: `Field "${field.label}" saved successfully!` 
        });
        // Add to existing field names to prevent duplicates
        setExistingFieldNames(prev => new Set([...prev, payload.field_name]));
        return { success: true, fieldId: result.data?.id };
      } else {
        throw new Error(result.message || "Failed to save field");
      }
    } catch (error) {
      console.error("Error saving field:", error);
      setSaveMessage({ 
        type: 'error', 
        text: error.message || `Failed to save field "${field.label}". Please try again.` 
      });
      return { success: false };
    } finally {
      setIsSaving(false);
    }
  };

  /* Update field via API */
  const updateFieldToAPI = async (field, index) => {
    setIsSaving(true);
    setSaveMessage({ type: '', text: '' });
    
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
      
      const payload = prepareFieldPayload(field, index);
      
      const response = await fetch(`http://localhost/crm-solvonix/api/v1/user/update/contacts/field/${field.fieldId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (response.ok) {
        setSaveMessage({ 
          type: 'success', 
          text: `Field "${field.label}" updated successfully!` 
        });
        return { success: true };
      } else {
        throw new Error(result.message || "Failed to update field");
      }
    } catch (error) {
      console.error("Error updating field:", error);
      setSaveMessage({ 
        type: 'error', 
        text: error.message || `Failed to update field "${field.label}". Please try again.` 
      });
      return { success: false };
    } finally {
      setIsSaving(false);
    }
  };

  /* Update field priority via API */
  const updateFieldPriorityAPI = async (fieldId, priorityData) => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("Authentication token not found. Please log in again.");
      }
      
      const response = await fetch(`http://localhost/crm-solvonix/api/v1/user/contacts/field/priority/update/${fieldId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(priorityData)
      });

      const result = await response.json();
      
      if (response.ok) {
        return { success: true };
      } else {
        throw new Error(result.message || "Failed to update field priority");
      }
    } catch (error) {
      console.error("Error updating field priority:", error);
      return { success: false };
    }
  };

  /* Save priorities for all fields */
  const savePriorities = async () => {
    setIsSaving(true);
    setSaveMessage({ type: '', text: '' });
    
    try {
      const updates = formFields.map((field, index) => {
        if (field.fieldId) {
          return updateFieldPriorityAPI(field.fieldId, {
            field_group: field.group,
            priority: index + 1
          });
        }
        return Promise.resolve({ success: true });
      });

      const results = await Promise.all(updates);
      const failedUpdates = results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        setSaveMessage({ 
          type: 'error', 
          text: `Failed to update priorities for ${failedUpdates.length} fields.` 
        });
      } else {
        setSaveMessage({ 
          type: 'success', 
          text: `All priorities updated successfully!` 
        });
      }
    } catch (error) {
      console.error("Error saving priorities:", error);
      setSaveMessage({ 
        type: 'error', 
        text: error.message || "Failed to save priorities. Please try again." 
      });
    } finally {
      setIsSaving(false);
    }
  };

  /* Handle priority change */
  const handlePriorityChange = async (field, newPriority) => {
    if (!field.locked || !field.fieldId) return;
    
    const result = await updateFieldPriorityAPI(field.fieldId, {
      field_group: field.group,
      priority: newPriority
    });
    
    if (result.success) {
      // Refresh fields to get updated order
      fetchExistingFields();
      setSaveMessage({ 
        type: 'success', 
        text: `Field priority updated successfully!` 
      });
    } else {
      setSaveMessage({ 
        type: 'error', 
        text: `Failed to update field priority.` 
      });
    }
  };

  /* Save draft (create or update) */
  const saveDraft = async () => {
    if (!draft.label.trim()) {
      setSaveMessage({ type: 'error', text: "Label is required" });
      return;
    }
    
    // Generate field name from label
    const fieldName = draft.label.toLowerCase().replace(/\s+/g, '_');
    
    // Check if field already exists (unless we're editing)
    if (!editingId && existingFieldNames.has(fieldName)) {
      setSaveMessage({ 
        type: 'error', 
        text: `A field with name "${fieldName}" already exists. Please choose a different label.` 
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      if (editingId) {
        // Update existing field
        const updatedField = { 
          ...formFields.find(f => f.id === editingId), 
          ...draft 
        };
        
        setFormFields((prev) => prev.map((f) => (f.id === editingId ? updatedField : f)));
        
        // Save to API
        const fieldIndex = formFields.findIndex(f => f.id === editingId);
        await updateFieldToAPI(updatedField, fieldIndex);
      } else {
        // Create new field
        const newField = { 
          id: uid(), 
          value: draft.type === "list" ? [] : draft.type === "options" ? (draft.config.inputType === "checkbox" ? [] : "") : "", 
          ...draft,
          locked: false,
        };
        
        setFormFields((prev) => [...prev, newField]);
        
        // Save to API
        const fieldIndex = formFields.length;
        const result = await saveFieldToAPI(newField, fieldIndex);
        
        if (result.success) {
          // Update the field with the ID from API response
          if (result.fieldId) {
            setFormFields(prev => prev.map(f => 
              f.id === newField.id ? { ...f, fieldId: result.fieldId } : f
            ));
          }
          
          setModalOpen(false);
          setEditingId(null);
          setDraft({ label: "", type: "string", required: false, group: "", config: {} });
        }
      }
    } catch (error) {
      console.error("Error saving draft:", error);
    } finally {
      setIsSaving(false);
    }
  };

  /* delete */
  const deleteField = (id) => {
    const field = formFields.find(f => f.id === id);
    // Don't allow deleting locked fields
    if (field && field.locked) return;
    
    if (!confirm("Delete this field?")) return;
    setFormFields((prev) => prev.filter((f) => f.id !== id));
  };

  /* update field value (when user fills the preview form) */
  const updateFieldValue = (id, nextValue) => {
    setFormFields((prev) => prev.map((f) => (f.id === id ? { ...f, value: nextValue } : f)));
  };

  /* used for DnD: build list of item ids for SortableContext */
  const sortableIds = useMemo(() => formFields.filter(f => !f.locked).map((f) => f.id), [formFields]);

  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading form fields...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: available fields */}
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
                      onClick={() => addAvailableToCanvas(f.key)} 
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

        {/* Right: canvas (spans two cols) */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">Form Fields</h1>
            <div className="flex gap-2">
              <button 
                onClick={fetchExistingFields}
                className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm flex items-center gap-1"
              >
                Refresh Fields
              </button>
              <button 
                onClick={savePriorities}
                disabled={isSaving}
                className="bg-blue-600 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? "Saving..." : "Save Priorities"}
              </button>
            </div>
          </div>
          
          {/* Save status message */}
          {saveMessage.text && (
            <div className={`mb-4 p-3 rounded flex items-center gap-2 ${
              saveMessage.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {saveMessage.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{saveMessage.text}</span>
              <button 
                onClick={() => setSaveMessage({ type: '', text: '' })} 
                className="ml-auto"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          
          {/* DndContext wraps the canvas so we can handle drops from available items as well as sorting */}
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={sortableIds} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                <div id="canvas" className="space-y-3">
                  {formFields.length === 0 && (
                    <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded text-gray-500">
                      No fields yet — drag and drop from the left or click the Add button.
                    </div>
                  )}

                  {/* Render all fields */}
                  {formFields.map((f, idx) => (
                    // Note: Sortable expects ids to be unique primitives; we use f.id directly.
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
                                onPriorityChange={handlePriorityChange}
                              />
                            )}
                            {!f.locked && (
                              <div className="flex gap-2">
                                <button 
                                  type="button" 
                                  onClick={() => openEdit(f)} 
                                  className="px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-1 text-sm" 
                                  title="Edit"
                                >
                                  <Pencil className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>
                                <button 
                                  type="button" 
                                  onClick={() => deleteField(f.id)} 
                                  className="p-1 rounded hover:bg-gray-100" 
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4 text-rose-600" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <FieldRenderer field={f} onChange={(val) => updateFieldValue(f.id, val)} />
                      </div>
                    </SortableRow>
                  ))}
                </div>
              </div>
            </SortableContext>
            
            {/* Drag overlay for better UX */}
            <DragOverlay>
              {activeId ? (
                <div className="bg-white p-3 rounded border border-gray-400 shadow-md opacity-90">
                  {String(activeId).startsWith("avail-") ? (
                    <div className="font-medium">{activeField?.label}</div>
                  ) : (
                    <div className="text-sm font-medium">
                      {activeField?.label} {activeField?.required && <span className="text-rose-500">*</span>}
                    </div>
                  )}
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>

      {/* Modal: create / edit field */}
      {modalOpen && (
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

                {/* type-specific config editors */}
                {/* options */}
                {draft.type === "options" && (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
                      <div className="border rounded p-2 min-h-10">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {draft.config?.options?.map((option, index) => (
                            <div key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                              {option}
                              <button
                                type="button"
                                onClick={() => {
                                  const newOptions = draft.config.options.filter((_, i) => i !== index);
                                  setDraft((d) => ({ 
                                    ...d, 
                                    config: { 
                                      ...d.config, 
                                      options: newOptions
                                    } 
                                  }));
                                }}
                                className="ml-2 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                        <input
                          type="text"
                          placeholder="Type an option and press comma or enter to add"
                          value={draft.config?._currentOption || ""}
                          onChange={(e) => {
                            setDraft((d) => ({ 
                              ...d, 
                              config: { 
                                ...d.config, 
                                _currentOption: e.target.value
                              } 
                            }));
                          }}
                          onKeyDown={(e) => {
                            if ((e.key === ',' || e.key === 'Enter') && draft.config?._currentOption) {
                              e.preventDefault();
                              const newOption = draft.config._currentOption.trim();
                              if (newOption) {
                                const currentOptions = draft.config.options || [];
                                setDraft((d) => ({ 
                                  ...d, 
                                  config: { 
                                    ...d.config, 
                                    options: [...currentOptions, newOption],
                                    _currentOption: ""
                                  } 
                                }));
                              }
                            }
                          }}
                          className="border-0 focus:outline-none w-full px-1 py-1"
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Type options and press comma or enter to add them
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Input Type</label>
                      <select
                        value={draft.config?.inputType || "radio"}
                        onChange={(e) =>
                          setDraft((d) => ({ 
                            ...d, 
                            config: { 
                              ...d.config, 
                              inputType: e.target.value 
                            } 
                          }))
                        }
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                      >
                        <option value="radio">Radio Buttons</option>
                        <option value="checkbox">Checkboxes</option>
                      </select>
                    </div>
                  </>
                )}
                
                {/* list */}
                {draft.type === "list" && (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Predefined List</label>
                      <select
                        value={draft.config?.predefinedList || ""}
                        onChange={(e) =>
                          setDraft((d) => ({ 
                            ...d, 
                            config: { 
                              ...d.config, 
                              predefinedList: e.target.value || null 
                            } 
                          }))
                        }
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                      >
                        <option value="">-- Custom List --</option>
                        <option value="countries">Countries</option>
                        <option value="states">US States</option>
                        <option value="genders">Genders</option>
                      </select>
                    </div>
                    
                    {(!draft.config?.predefinedList || draft.config.predefinedList === "") && (
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Custom Items (comma separated)</label>
                        <input
                          type="text"
                          placeholder="Item1, Item2, Item3"
                          value={draft.config?._customItemsRaw || (draft.config?.customItems || []).join(", ")}
                          onChange={(e) => {
                            const inputValue = e.target.value;
                            
                            // Store the raw input for display
                            setDraft((d) => ({ 
                              ...d, 
                              config: { 
                                ...(d.config || {}),
                                _customItemsRaw: inputValue,
                                customItems: inputValue
                                  .split(/,\s*/)
                                  .map(item => item.trim())
                                  .filter(item => item.length > 0)
                              } 
                            }));
                          }}
                          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400"
                        />
                      </div>
                    )}
                  </>
                )}

                {/* large_text */}
                {draft.type === "large_text" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                      <input 
                        type="text" 
                        placeholder="Placeholder" 
                        value={draft.config?.placeholder || ""} 
                        onChange={(e) => setDraft((d) => ({ ...d, config: { ...d.config, placeholder: e.target.value } }))} 
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rows</label>
                      <input 
                        type="number" 
                        placeholder="Rows (e.g. 4)" 
                        value={draft.config?.rows ?? ""} 
                        onChange={(e) => setDraft((d) => ({ ...d, config: { ...d.config, rows: Number(e.target.value) || 4 } }))} 
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
                      />
                    </div>
                  </>
                )}

                {/* string / integer / decimal placeholder */}
                {["string", "integer", "decimal", "email"].includes(draft.type) && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Placeholder</label>
                      <input 
                        type="text" 
                        placeholder="Placeholder" 
                        value={draft.config?.placeholder || ""} 
                        onChange={(e) => setDraft((d) => ({ ...d, config: { ...d.config, placeholder: e.target.value } }))} 
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
                      />
                    </div>
                    {draft.type === "decimal" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Step</label>
                        <input 
                          type="number" 
                          placeholder="Step (e.g. 0.01)" 
                          value={draft.config?.step ?? ""} 
                          onChange={(e) => setDraft((d) => ({ ...d, config: { ...d.config, step: Number(e.target.value) || 0.01 } }))} 
                          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
                        />
                      </div>
                    )}
                  </>
                )}

                {/* file */}
                {draft.type === "file" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accept</label>
                      <input 
                        type="text" 
                        placeholder="Accept (e.g .jpg,.png)" 
                        value={draft.config?.accept || ""} 
                        onChange={(e) => setDraft((d) => ({ ...d, config: { ...d.config, accept: e.target.value } }))} 
                        className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-400" 
                      />
                    </div>
                    <div className="flex items-end">
                      <label className="flex items-center gap-2 mt-6">
                        <input 
                          type="checkbox" 
                          checked={!!draft.config?.multiple} 
                          onChange={(e) => setDraft((d) => ({ ...d, config: { ...d.config, multiple: e.target.checked } }))} 
                          className="rounded"
                        />
                        Allow multiple files
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t">
              <button 
                onClick={() => { setModalOpen(false); setEditingId(null); }} 
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button 
                onClick={saveDraft} 
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
      )}
    </div>
  );
}