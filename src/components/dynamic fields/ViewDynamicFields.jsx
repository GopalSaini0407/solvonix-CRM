import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import DynamicForm from "./DynamicForm";

export default function ViewDynamicFields() {
  const [groups, setGroups] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [fieldData, setFieldData] = useState({
    id: "",
    field_name: "",
    field_for: "",
    field_type: "",
    display_text: "",
    field_group: "",
    placeholder: "",
    field_options: "",
    priority: 0,
    is_required: 0,
    is_email: 0,
  });
  const [saving, setSaving] = useState(false);

  /* ------------------ Fetch Fields ------------------ */
  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    const token = localStorage.getItem("login_token");
    try {
      const res = await axios.get(
        "http://localhost/crm-solvonix/api/v1/user/get/contacts/fields",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      // Sort fields by priority within each group
      const sortedGroups = {};
      if (res.data.data) {
        Object.keys(res.data.data).forEach(groupName => {
          const groupFields = res.data.data[groupName];
          if (Array.isArray(groupFields)) {
            // Sort by priority in ascending order (lower number = higher priority)
            sortedGroups[groupName] = groupFields.sort((a, b) => 
              (a.priority || 0) - (b.priority || 0)
            );
          } else {
            sortedGroups[groupName] = groupFields;
          }
        });
      }
      
      setGroups(sortedGroups || {});
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch dynamic fields. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ Handle Edit ------------------ */
  const handleEdit = (field) => {
    setFieldData({
      ...field,
      field_type: field.field_type || "",
      field_options: field.field_options || "",
      options_mode:
        field.field_options && field.field_options.includes(",")
          ? "manual"
          : "predefined",
    });
    setIsOpen(true);
  };

  /* ------------------ Handle Update ------------------ */
  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("login_token");

      await axios.post(
        `http://localhost/crm-solvonix/api/v1/user/update/custom/field/${fieldData.id}`,
        fieldData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("✅ Field updated successfully!");
      fetchFields(); // Refresh to get sorted data
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating field:", error);
      alert("❌ Failed to update field. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  /* ------------------ Handle Drag & Drop ------------------ */
  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;

    // same group reorder
    if (source.droppableId === destination.droppableId) {
      const group = Array.from(groups[source.droppableId]);
      const [movedItem] = group.splice(source.index, 1);
      group.splice(destination.index, 0, movedItem);

      // Update priorities based on new order
      const updatedGroup = group.map((field, index) => ({
        ...field,
        priority: index + 1
      }));

      // Update local state with sorted data
      setGroups({
        ...groups,
        [source.droppableId]: updatedGroup,
      });

      // Update backend priority
      await updatePriorityAPI(updatedGroup, source.droppableId);

      // alert(`✅ Reordered "${movedItem.display_text}" in ${source.droppableId}!`);
    } else {
      // moving to another group
      const sourceGroup = Array.from(groups[source.droppableId]);
      const destGroup = Array.from(groups[destination.droppableId]);

      const [movedItem] = sourceGroup.splice(source.index, 1);
      movedItem.field_group = destination.droppableId;
      destGroup.splice(destination.index, 0, movedItem);

      // Update priorities for both groups
      const updatedSourceGroup = sourceGroup.map((field, index) => ({
        ...field,
        priority: index + 1
      }));

      const updatedDestGroup = destGroup.map((field, index) => ({
        ...field,
        priority: index + 1
      }));

      setGroups({
        ...groups,
        [source.droppableId]: updatedSourceGroup,
        [destination.droppableId]: updatedDestGroup,
      });

      // Update backend priority for both groups
      await updatePriorityAPI(updatedSourceGroup, source.droppableId);
      await updatePriorityAPI(updatedDestGroup, destination.droppableId);

      // alert(
      //   `✅ Moved "${movedItem.display_text}" from ${source.droppableId} → ${destination.droppableId}!`
      // );
    }
  };

  /* ------------------ Priority Update API ------------------ */
  const updatePriorityAPI = async (groupFields, groupName) => {
    const token = localStorage.getItem("login_token");
  
    for (let index = 0; index < groupFields.length; index++) {
      const field = groupFields[index];
  
      // Skip fields without id
      if (!field.id) {
        console.warn("Skipping field with no ID:", field);
        continue;
      }
  
      try {
        await axios.post(
          `http://localhost/crm-solvonix/api/v1/user/custom/field/priority/update/${field.id}`,
          {
            priority: index + 1, // new position
            field_group: groupName, // current group
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } catch (err) {
        console.error("Error updating priority for field:", field, err);
      }
    }

    console.log("✅ Updated priority for group:", groupName);
  };

  /* ------------------ Sort groups by priority ------------------ */
  const getSortedGroups = () => {
    return Object.keys(groups).sort((a, b) => {
      // You can add custom group sorting logic here if needed
      // For now, just return in the order they come
      return 0;
    });
  };

  /* ------------------ UI States ------------------ */
  if (loading)
    return (
      <div className="flex flex-col items-center mt-10">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-3 text-gray-600">Loading data...</p>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-lg text-center mt-4">
        {error}
      </div>
    );

  if (!groups || Object.keys(groups).length === 0)
    return (
      <div className="bg-yellow-100 text-yellow-700 p-4 rounded-lg text-center mt-4">
        No dynamic field data found.
      </div>
    );

  /* ------------------ JSX ------------------ */
  return (
    <div className="max-w-6xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
        <i className="fas fa-list-alt"></i> Dynamic Groups
      </h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getSortedGroups().map((groupName, index) => (
            <Droppable droppableId={groupName} key={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-white shadow-sm rounded-2xl border border-gray-100 p-5 hover:shadow-md transition min-h-[200px]"
                >
                  <h3 className="text-lg font-semibold text-blue-600 mb-3 border-b pb-2">
                    {groupName}
                  </h3>

                  {Array.isArray(groups[groupName]) &&
                  groups[groupName].length > 0 ? (
                    <ul className="space-y-2">
                      {groups[groupName].map((field, i) => (
                        <Draggable
                          key={field.id ? field.id.toString() : `${groupName}-${i}`}
                          draggableId={
                            field.id ? field.id.toString() : `${groupName}-${i}`
                          }
                          index={i}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                              className="flex items-center justify-between text-gray-700 border p-2 border-gray-100 rounded bg-gray-50 hover:bg-gray-100 transition"
                            >
                              <span>
                                {field.display_text}{" "}
                                <small className="text-xs text-gray-400">
                                  (P: {field.priority})
                                </small>
                              </span>
                              <button
                                onClick={() => handleEdit(field)}
                                className="text-blue-500 hover:text-blue-700 transition"
                              >
                                <FaEdit />
                              </button>
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  ) : (
                    <p className="text-gray-400 italic">
                      No fields available for this group.
                    </p>
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {/* Edit Modal */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-2xl rounded-lg shadow-lg overflow-hidden p-4 relative"
          >
            <div className="flex justify-between items-center border-b pb-2 mb-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Edit Field
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                X
              </button>
            </div>

            <div className="p-2">
              <DynamicForm
                fieldData={fieldData}
                setFieldData={setFieldData}
                handleSave={handleUpdate}
              />
            </div>

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