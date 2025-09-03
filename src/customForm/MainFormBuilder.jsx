"use client";
import React, { useState, useMemo, useEffect } from "react";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import AvailableFieldsPanel from "./components/AvailableFieldsPanel";
import FormCanvas from "./components/FormCanvas";
import FieldModal from "./components/FieldModal";
import SaveStatus from "./components/SaveStatus";
import { getToken, uid, PREDEFINED_LISTS, AVAILABLE_FIELDS, FIELD_TYPE_MAPPING, API_TYPE_MAPPING, LOCKED_FIELDS } from "./utils/constants";
import { prepareFieldPayload } from "./utils/fieldHelpers";

export default function FormBuilder() {
  const [formFields, setFormFields] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ 
    label: "", 
    type: "string", 
    required: false, 
    group: "", 
    config: {},
    is_email: 0
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState({ type: '', text: '' });
  const [existingFieldNames, setExistingFieldNames] = useState(new Set());
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

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
        const processedFields = [];
        const fieldNames = new Set();
        
        Object.entries(result.data).forEach(([group, fields]) => {
          fields.forEach((field, index) => {
            const internalType = API_TYPE_MAPPING[field.field_type] || "string";
            let config = {};
            
            if (internalType === "options") {
              config.options = field.field_options ? field.field_options.split(",") : [];
              config.inputType = field.is_multiple ? "checkbox" : "radio";
            } else if (internalType === "list") {
              if (PREDEFINED_LISTS[field.field_options]) {
                config.predefinedList = field.field_options;
              } else {
                config.customItems = field.field_options ? field.field_options.split(",") : [];
              }
            } else {
              config.placeholder = field.placeholder || "";
              
              if (internalType === "decimal") {
                config.step = 0.01;
              } else if (internalType === "file") {
                config.multiple = !!field.is_multiple;
              }
            }
            
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
              apiData: field,
              fieldId: field.id
            };
            
            processedFields.push(formField);
            fieldNames.add(field.field_name);
          });
        });
        
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

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    
    if (!over) return;

    const activeField = formFields.find(f => f.id === active.id);
    if (activeField && activeField.locked) return;

    const activeIndex = formFields.findIndex((f) => f.id === active.id);
    const overIndex = formFields.findIndex((f) => f.id === over.id);

    if (activeIndex !== -1 && overIndex !== -1 && activeIndex !== overIndex) {
      if (formFields[activeIndex]?.locked) return;
      
      const newFields = arrayMove(formFields, activeIndex, overIndex);
      setFormFields(newFields);
      return;
    }

    if (String(active.id).startsWith("avail-")) {
      let insertIndex = formFields.length;
      if (over.id && String(over.id).startsWith("form-")) {
        const fid = String(over.id).replace("form-", "");
        const idx = formFields.findIndex((f) => f.id === fid);
        if (idx !== -1) insertIndex = idx;
      }

      const firstLockedIndex = formFields.findIndex(f => f.locked);
      if (firstLockedIndex !== -1 && insertIndex < firstLockedIndex) {
        insertIndex = firstLockedIndex;
      }

      const key = String(active.id).replace("avail-", "");
      const master = AVAILABLE_FIELDS.find((a) => a.key === key);
      if (!master) return;

      const fieldName = master.label.toLowerCase().replace(/\s+/g, '_');
      
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

  const addAvailableToCanvas = (key) => {
    const master = AVAILABLE_FIELDS.find((a) => a.key === key);
    if (!master) return;
    
    const fieldName = master.label.toLowerCase().replace(/\s+/g, '_');
    
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

  const openEdit = (field) => {
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
      
      if (response.ok) {
        setSaveMessage({ 
          type: 'success', 
          text: `Field "${field.label}" saved successfully!` 
        });
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

  const handlePriorityChange = async (field, newPriority) => {
    if (!field.locked || !field.fieldId) return;
    
    const result = await updateFieldPriorityAPI(field.fieldId, {
      field_group: field.group,
      priority: newPriority
    });
    
    if (result.success) {
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

  const saveDraft = async () => {
    if (!draft.label.trim()) {
      setSaveMessage({ type: 'error', text: "Label is required" });
      return;
    }
    
    const fieldName = draft.label.toLowerCase().replace(/\s+/g, '_');
    
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
        const updatedField = { 
          ...formFields.find(f => f.id === editingId), 
          ...draft 
        };
        
        setFormFields((prev) => prev.map((f) => (f.id === editingId ? updatedField : f)));
        
        const fieldIndex = formFields.findIndex(f => f.id === editingId);
        await updateFieldToAPI(updatedField, fieldIndex);
      } else {
        const newField = { 
          id: uid(), 
          value: draft.type === "list" ? [] : draft.type === "options" ? (draft.config.inputType === "checkbox" ? [] : "") : "", 
          ...draft,
          locked: false,
        };
        
        setFormFields((prev) => [...prev, newField]);
        
        const fieldIndex = formFields.length;
        const result = await saveFieldToAPI(newField, fieldIndex);
        
        if (result.success) {
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

  const deleteField = (id) => {
    const field = formFields.find(f => f.id === id);
    if (field && field.locked) return;
    
    if (!confirm("Delete this field?")) return;
    setFormFields((prev) => prev.filter((f) => f.id !== id));
  };

  const updateFieldValue = (id, nextValue) => {
    setFormFields((prev) => prev.map((f) => (f.id === id ? { ...f, value: nextValue } : f)));
  };

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
        <AvailableFieldsPanel onAddField={addAvailableToCanvas} />
        
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
          
          <SaveStatus message={saveMessage} onDismiss={() => setSaveMessage({ type: '', text: '' })} />
          
          <DndContext 
            sensors={sensors} 
            collisionDetection={closestCenter} 
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <FormCanvas
              formFields={formFields}
              sortableIds={sortableIds}
              onEditField={openEdit}
              onDeleteField={deleteField}
              onUpdateFieldValue={updateFieldValue}
              onPriorityChange={handlePriorityChange}
            />
          </DndContext>
        </div>
      </div>

      {modalOpen && (
        <FieldModal
          draft={draft}
          setDraft={setDraft}
          editingId={editingId}
          isSaving={isSaving}
          onSave={saveDraft}
          onClose={() => { setModalOpen(false); setEditingId(null); }}
        />
      )}
    </div>
  );
}