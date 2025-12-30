"use client";
import { useEffect, useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function LeadStages() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStage, setNewStage] = useState({
    stage_name: "",
    color_code: "#3B82F6",
    is_default: 0
  });
  const [isAddingStage, setIsAddingStage] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [editingStageId, setEditingStageId] = useState(null);
  const [editingStageData, setEditingStageData] = useState({
    stage_name: "",
    color_code: "#3B82F6",
    is_default: 0
  });
  const [dragLoading, setDragLoading] = useState(false);

  const baseUrlLocal = "http://localhost/crm-solvonix";

  // Get auth token
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("login_token");
    }
    return null;
  };

  // API client helper
  const apiCall = async (endpoint, method = "GET", body = null) => {
    const token = getAuthToken();
    if (!token) {
      throw new Error("Authentication token not found. Please log in again.");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const options = {
      method,
      headers,
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${baseUrlLocal}${endpoint}`, options);

    if (!response.ok) {
      let errorMessage = `Failed: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        // If response is not JSON, use default message
      }

      if (response.status === 401) {
        errorMessage = "Authentication failed. Please log in again.";
      } else if (response.status === 403) {
        errorMessage = "You don't have permission to perform this action.";
      } else if (response.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      throw new Error(errorMessage);
    }

    return response.json();
  };

  // Fetch lead stages from API
  const fetchLeadStages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await apiCall("/api/v1/user/lead-stages");

      // Check different response structures
      let stagesData = [];
      if (data.data && Array.isArray(data.data)) {
        stagesData = data.data;
      } else if (Array.isArray(data)) {
        stagesData = data;
      }

      // Sort by priority
      const sortedStages = stagesData
        .map(stage => ({
          ...stage,
          id: stage.id?.toString(),
          priority: stage.priority || 0,
          is_default: stage.is_default || 0,
          is_active: stage.is_active !== undefined ? stage.is_active : 1,
          color_code: stage.color_code || "#3B82F6",
          stage_name: stage.stage_name || stage.name || ""
        }))
        .sort((a, b) => a.priority - b.priority);

      setStages(sortedStages);
    } catch (err) {
      console.error("Error fetching lead stages:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeadStages();
  }, [fetchLeadStages]);

  // Function to update priority via API
  const updatePriority = async (leadStageId, priority) => {
    try {
      const response = await apiCall(
        `/api/v1/user/lead-stage/changePriority/${leadStageId}`,
        "POST",
        { priority }
      );
      return response;
    } catch (err) {
      console.error("Error updating priority:", err);
      throw err;
    }
  };

  // Function to update stage via API
  const updateStage = async (stageId, updates) => {
    try {
      const response = await apiCall(`/api/v1/user/lead-stage/update/${stageId}`, "POST", updates);
      return response;
    } catch (err) {
      console.error("Error updating stage:", err);
      throw err;
    }
  };

  // Function to add a new stage via API
  const addNewStage = async () => {
    if (!newStage.stage_name.trim()) {
      alert("Please enter a stage name");
      return;
    }

    try {
      setAddLoading(true);
      
      // Calculate priority (add to the end)
      const priority = stages.length > 0 ? Math.max(...stages.map(s => s.priority)) + 1 : 1;
      
      const stageData = {
        stage_name: newStage.stage_name.trim(),
        priority: priority,
        is_default: newStage.is_default ? 1 : 0,
        color_code: newStage.color_code,
        is_active: 1
      };

      const response = await apiCall("/api/v1/user/lead-stage/add", "POST", stageData);
      
      // Add the new stage to local state
      const addedStage = {
        id: response.data?.id || Date.now().toString(),
        ...stageData
      };
      
      setStages(prev => {
        const newStages = [...prev, addedStage];
        return newStages.sort((a, b) => a.priority - b.priority);
      });
      
      setNewStage({
        stage_name: "",
        color_code: "#3B82F6",
        is_default: 0
      });
      setIsAddingStage(false);
      
      alert(response.message || "Stage added successfully!");
    } catch (err) {
      console.error("Error adding stage:", err);
      alert("Error adding stage: " + err.message);
    } finally {
      setAddLoading(false);
    }
  };

  // Function to move stage up in priority
  const moveStageUp = async (index) => {
    if (index === 0) return;
    
    try {
      setDragLoading(true);
      const newStages = [...stages];
      const temp = newStages[index];
      newStages[index] = newStages[index - 1];
      newStages[index - 1] = temp;
      
      // Update priorities
      const updatedStages = newStages.map((stage, i) => ({
        ...stage,
        priority: i + 1
      }));
      
      // Update priority for both swapped stages
      await updatePriority(updatedStages[index].id, updatedStages[index].priority);
      await updatePriority(updatedStages[index - 1].id, updatedStages[index - 1].priority);
      
      setStages(updatedStages);
    } catch (err) {
      alert("Error reordering stages: " + err.message);
      // Revert on error
      fetchLeadStages();
    } finally {
      setDragLoading(false);
    }
  };

  // Function to move stage down in priority
  const moveStageDown = async (index) => {
    if (index === stages.length - 1) return;
    
    try {
      setDragLoading(true);
      const newStages = [...stages];
      const temp = newStages[index];
      newStages[index] = newStages[index + 1];
      newStages[index + 1] = temp;
      
      // Update priorities
      const updatedStages = newStages.map((stage, i) => ({
        ...stage,
        priority: i + 1
      }));
      
      // Update priority for both swapped stages
      await updatePriority(updatedStages[index].id, updatedStages[index].priority);
      await updatePriority(updatedStages[index + 1].id, updatedStages[index + 1].priority);
      
      setStages(updatedStages);
    } catch (err) {
      alert("Error reordering stages: " + err.message);
      // Revert on error
      fetchLeadStages();
    } finally {
      setDragLoading(false);
    }
  };

  // Function to remove a stage
  const removeStage = async (index) => {
    if (stages[index].is_default) {
      alert("Cannot remove the default stage");
      return;
    }
    
    if (!window.confirm("Are you sure you want to remove this stage?")) {
      return;
    }

    try {
      const stageId = stages[index].id;
      
      await apiCall("/api/v1/user/lead-stage/delete", "POST", { 
        id: stageId 
      });

      const newStages = stages.filter((_, i) => i !== index);
      
      // Update priorities of remaining stages
      const updatedStages = newStages.map((stage, i) => ({
        ...stage,
        priority: i + 1
      }));
      
      // Update priorities in backend for all remaining stages
      const updatePromises = updatedStages.map(stage => 
        updatePriority(stage.id, stage.priority)
      );
      
      await Promise.all(updatePromises);
      
      setStages(updatedStages);
      alert("Stage removed successfully!");
    } catch (err) {
      console.error("Error removing stage:", err);
      alert("Error removing stage: " + err.message);
    }
  };

  // Function to toggle stage active status
  const toggleStageActive = async (index) => {
    try {
      const newStages = [...stages];
      const updatedStage = { ...newStages[index] };
      updatedStage.is_active = updatedStage.is_active ? 0 : 1;
      
      // Update in backend
      await updateStage(updatedStage.id, { 
        stage_name: updatedStage.stage_name,
        priority: updatedStage.priority,
        is_default: updatedStage.is_default,
        color_code: updatedStage.color_code,
        is_active: updatedStage.is_active
      });
      
      newStages[index] = updatedStage;
      setStages(newStages);
      alert("Stage status updated successfully!");
    } catch (err) {
      alert("Error updating stage status: " + err.message);
    }
  };

  // Function to start editing a stage
  const startEditing = (stage) => {
    setEditingStageId(stage.id);
    setEditingStageData({
      stage_name: stage.stage_name,
      color_code: stage.color_code,
      is_default: stage.is_default
    });
  };

  // Function to save edited stage
  const saveEditedStage = async (index) => {
    if (!editingStageData.stage_name.trim()) {
      alert("Please enter a stage name");
      return;
    }

    try {
      const stage = stages[index];
      const response = await updateStage(stage.id, {
        stage_name: editingStageData.stage_name.trim(),
        priority: stage.priority,
        is_default: editingStageData.is_default,
        color_code: editingStageData.color_code,
        is_active: stage.is_active
      });

      const newStages = [...stages];
      newStages[index] = {
        ...newStages[index],
        stage_name: editingStageData.stage_name.trim(),
        color_code: editingStageData.color_code,
        is_default: editingStageData.is_default
      };

      setStages(newStages);
      setEditingStageId(null);
      setEditingStageData({
        stage_name: "",
        color_code: "#3B82F6",
        is_default: 0
      });

      alert(response.message || "Stage updated successfully!");
    } catch (err) {
      alert("Error updating stage: " + err.message);
    }
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingStageId(null);
    setEditingStageData({
      stage_name: "",
      color_code: "#3B82F6",
      is_default: 0
    });
  };

  // Function to save all changes to API
  const saveChanges = async () => {
    try {
      setSaveLoading(true);
      
      const updatePromises = stages.map(stage => 
        updateStage(stage.id, {
          stage_name: stage.stage_name,
          priority: stage.priority,
          is_default: stage.is_default,
          color_code: stage.color_code,
          is_active: stage.is_active
        })
      );

      await Promise.all(updatePromises);
      alert("All changes saved successfully!");
    } catch (err) {
      console.error("Error saving lead stages:", err);
      alert("Error saving lead stages: " + err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  // Function to reset to defaults
  const resetDefaults = () => {
    if (window.confirm("Are you sure you want to reset to default stages? This will discard all your changes.")) {
      fetchLeadStages();
    }
  };

  // Drag and drop handler
  const handleDragEnd = async (result) => {
    if (!result.destination) return;
    
    if (result.destination.index === result.source.index) return;
    
    try {
      setDragLoading(true);
      
      const newStages = Array.from(stages);
      const [removed] = newStages.splice(result.source.index, 1);
      newStages.splice(result.destination.index, 0, removed);
      
      // Update priorities
      const updatedStages = newStages.map((stage, index) => ({
        ...stage,
        priority: index + 1
      }));
      
      // Update priority for all stages that changed position
      const startIndex = Math.min(result.source.index, result.destination.index);
      const endIndex = Math.max(result.source.index, result.destination.index);
      
      const updatePromises = [];
      for (let i = startIndex; i <= endIndex; i++) {
        updatePromises.push(updatePriority(updatedStages[i].id, updatedStages[i].priority));
      }
      
      await Promise.all(updatePromises);
      
      setStages(updatedStages);
    } catch (err) {
      console.error("Error updating stage order:", err);
      alert("Error updating stage order: " + err.message);
      fetchLeadStages(); // Revert on error
    } finally {
      setDragLoading(false);
    }
  };

  // Color options for the dropdown
  const colorOptions = [
    { value: "#3B82F6", label: "Blue", bgClass: "bg-blue-500" },
    { value: "#10B981", label: "Green", bgClass: "bg-green-500" },
    { value: "#EF4444", label: "Red", bgClass: "bg-red-500" },
    { value: "#F59E0B", label: "Yellow", bgClass: "bg-yellow-500" },
    { value: "#8B5CF6", label: "Purple", bgClass: "bg-purple-500" },
    { value: "#F97316", label: "Orange", bgClass: "bg-orange-500" },
    { value: "#06B6D4", label: "Teal", bgClass: "bg-teal-500" },
    { value: "#EC4899", label: "Pink", bgClass: "bg-pink-500" },
    { value: "#6366F1", label: "Indigo", bgClass: "bg-indigo-500" },
    { value: "#6B7280", label: "Gray", bgClass: "bg-gray-500" },
    { value: "#A6A6A3", label: "Light Gray", bgClass: "bg-gray-400" }
  ];

  // Loading state
  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-xl font-semibold text-gray-800">Pipeline Settings</h2>
            <div className="text-sm text-gray-500">Loading stages...</div>
          </div>
          <div className="space-y-4">
            <div className="animate-pulse space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center flex-wrap">
            <h2 className="text-xl font-semibold text-gray-800">Pipeline Settings</h2>
            <div className="text-sm text-gray-500">Error loading stages</div>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <h3 className="text-red-800 font-medium">Error Loading Lead Stages</h3>
            </div>
            <p className="text-red-700 mt-2">{error}</p>
            <button 
              onClick={fetchLeadStages}
              className="mt-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-xl font-semibold text-gray-800">Pipeline Settings</h2>
          <div className="text-sm text-gray-500">Total Stages: {stages.length}</div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-800">Pipeline Stages</h3>
          <p className="text-sm text-gray-600">
            Manage your sales pipeline stages. Drag stages to reorder or use the arrows to move them.
          </p>
          
          <div className="space-y-3">
            {dragLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                <div className="flex items-center text-blue-700">
                  <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating order...
                </div>
              </div>
            )}
            
            {stages.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Lead Stages Found</h3>
                <p className="text-gray-500">Start by adding your first pipeline stage below.</p>
              </div>
            ) : (
              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="stages">
                  {(provided) => (
                    <div 
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-3"
                    >
                      {stages.map((stage, index) => (
                        <Draggable 
                          key={stage.id} 
                          draggableId={stage.id} 
                          index={index}
                          isDragDisabled={dragLoading}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`p-4 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 ${
                                snapshot.isDragging 
                                  ? 'shadow-lg bg-white transform scale-105' 
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                {/* Move Controls */}
                                <div className="flex flex-col gap-1">
                                  <button 
                                    onClick={() => moveStageUp(index)}
                                    disabled={index === 0 || dragLoading}
                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move up"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                      <path d="m18 15-6-6-6 6"></path>
                                    </svg>
                                  </button>
                                  <div className="p-1 cursor-move text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                      <circle cx="9" cy="12" r="1"></circle>
                                      <circle cx="9" cy="5" r="1"></circle>
                                      <circle cx="9" cy="19" r="1"></circle>
                                      <circle cx="15" cy="12" r="1"></circle>
                                      <circle cx="15" cy="5" r="1"></circle>
                                      <circle cx="15" cy="19" r="1"></circle>
                                    </svg>
                                  </div>
                                  <button 
                                    onClick={() => moveStageDown(index)}
                                    disabled={index === stages.length - 1 || dragLoading}
                                    className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                                    title="Move down"
                                  >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                                      <path d="m6 9 6 6 6-6"></path>
                                    </svg>
                                  </button>
                                </div>
                                
                                {/* Priority Number */}
                                <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-gray-300 text-sm font-semibold text-gray-600">
                                  {stage.priority}
                                </div>
                                
                                {/* Stage Content */}
                                <div className="flex-1">
                                  {editingStageId === stage.id ? (
                                    // Edit Mode
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                      <div>
                                        <input
                                          type="text"
                                          value={editingStageData.stage_name}
                                          onChange={(e) => setEditingStageData({...editingStageData, stage_name: e.target.value})}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                          placeholder="Stage name"
                                        />
                                      </div>
                                      <div>
                                        <select
                                          value={editingStageData.color_code}
                                          onChange={(e) => setEditingStageData({...editingStageData, color_code: e.target.value})}
                                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                          {colorOptions.map(color => (
                                            <option key={color.value} value={color.value}>
                                              {color.label}
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                      <div className="flex gap-2">
                                        <button
                                          onClick={() => saveEditedStage(index)}
                                          disabled={dragLoading}
                                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 text-sm disabled:opacity-50"
                                        >
                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                            <path d="M20 6 9 17l-5-5"></path>
                                          </svg>
                                          Save
                                        </button>
                                        <button
                                          onClick={cancelEditing}
                                          disabled={dragLoading}
                                          className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm disabled:opacity-50"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  ) : (
                                    // View Mode
                                    <div className="flex items-center gap-4">
                                      <div 
                                        className="w-6 h-6 rounded-full border border-gray-300"
                                        style={{ backgroundColor: stage.color_code }}
                                      ></div>
                                      <div>
                                        <span className="font-medium text-gray-800">{stage.stage_name}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                          <span className="text-xs text-gray-500">Priority: {stage.priority}</span>
                                          {stage.is_default === 1 && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">Default</span>
                                          )}
                                          {stage.is_active === 0 && (
                                            <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">Inactive</span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                                
                                {/* Action Buttons */}
                                <div className="flex items-center gap-2">
                                  {editingStageId !== stage.id && (
                                    <>
                                      <button 
                                        onClick={() => toggleStageActive(index)}
                                        disabled={dragLoading}
                                        className={`p-2 rounded ${stage.is_active ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-red-600 hover:text-red-700 hover:bg-red-50'} disabled:opacity-50`}
                                        title={stage.is_active ? "Deactivate" : "Activate"}
                                      >
                                        {stage.is_active ? (
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                          </svg>
                                        ) : (
                                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                          </svg>
                                        )}
                                      </button>
                                      
                                      <button 
                                        onClick={() => startEditing(stage)}
                                        disabled={dragLoading}
                                        className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded disabled:opacity-50"
                                        title="Edit Stage"
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                        </svg>
                                      </button>
                                      
                                      <button 
                                        onClick={() => removeStage(index)}
                                        disabled={stage.is_default === 1 || dragLoading}
                                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded disabled:opacity-30 disabled:cursor-not-allowed"
                                        title={stage.is_default === 1 ? "Cannot delete default stage" : "Remove Stage"}
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                          <path d="M3 6h18"></path>
                                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                          <line x1="10" x2="10" y1="11" y2="17"></line>
                                          <line x1="14" x2="14" y1="11" y2="17"></line>
                                        </svg>
                                      </button>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            )}
          </div>
          
          {/* Add New Stage Section */}
          <div className="flex justify-center">
            <button 
              onClick={() => setIsAddingStage(!isAddingStage)}
              disabled={dragLoading}
              className="px-4 py-2 border-2 border-dashed border-green-300 text-green-600 rounded-lg hover:bg-green-50 flex items-center gap-2 transition-colors disabled:opacity-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              {isAddingStage ? "Cancel Adding Stage" : "Add New Stage"}
            </button>
          </div>
          
          {isAddingStage && (
            <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Stage</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2">
                  <input 
                    type="text" 
                    placeholder="Stage Name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStage.stage_name}
                    onChange={(e) => setNewStage({...newStage, stage_name: e.target.value})}
                    disabled={addLoading || dragLoading}
                  />
                </div>
                <div>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStage.color_code}
                    onChange={(e) => setNewStage({...newStage, color_code: e.target.value})}
                    disabled={addLoading || dragLoading}
                  >
                    {colorOptions.map(color => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <button 
                    onClick={addNewStage}
                    disabled={addLoading || !newStage.stage_name.trim() || dragLoading}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1 text-sm transition-colors"
                  >
                    {addLoading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Adding...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                          <path d="M5 12h14"></path>
                          <path d="M12 5v14"></path>
                        </svg>
                        Add Stage
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  id="is_default"
                  checked={newStage.is_default === 1}
                  onChange={(e) => setNewStage({...newStage, is_default: e.target.checked ? 1 : 0})}
                  className="mr-2"
                  disabled={addLoading || dragLoading}
                />
                <label htmlFor="is_default" className="text-sm text-gray-600">
                  Set as default stage
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Pipeline Preview */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Pipeline Preview</h4>
          <div className="flex flex-wrap gap-2">
            {stages
              .filter(stage => stage.is_active === 1)
              .map((stage, index, activeStages) => (
                <div key={stage.id} className="flex items-center gap-2">
                  <div 
                    className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border shadow-sm"
                    style={{ borderLeftColor: stage.color_code, borderLeftWidth: '4px' }}
                  >
                    <div 
                      className="w-3 h-3 rounded-full border border-gray-300"
                      style={{ backgroundColor: stage.color_code }}
                    ></div>
                    <span className="text-sm font-medium">{stage.stage_name}</span>
                    <span className="text-xs text-gray-500">({stage.priority})</span>
                  </div>
                  {index < activeStages.length - 1 && (
                    <div className="text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={resetDefaults}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
            disabled={saveLoading || dragLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M8 16H3v5"></path>
            </svg>
            <span>Reset Defaults</span>
          </button>
          <button 
            onClick={saveChanges}
            disabled={saveLoading || dragLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {saveLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path>
                  <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
                  <path d="M7 3v4a1 1 0 0 0 1 1h7"></path>
                </svg>
                <span>Save Settings</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}