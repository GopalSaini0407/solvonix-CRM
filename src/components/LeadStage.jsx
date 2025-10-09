"use client";
import { useEffect, useState } from "react";

export default function LeadStages() {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStage, setNewStage] = useState({
    stage_name: "",
    color_code: "#3B82F6", // Default blue color
    is_default: 0
  });
  const [isAddingStage, setIsAddingStage] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const baseUrlLocal = "http://localhost/crm-solvonix";

  // Fetch lead stages from API
  useEffect(() => {
    const fetchLeadStages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("login_token");
        
        if (!token) {
          throw new Error("Authentication token not found. Please log in again.");
        }

        const response = await fetch(`${baseUrlLocal}/api/v1/user/lead-stages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed. Please log in again.");
          } else if (response.status === 403) {
            throw new Error("You don't have permission to view lead stages.");
          } else if (response.status >= 500) {
            throw new Error("Server error. Please try again later.");
          } else {
            throw new Error(`Failed to fetch lead stages: ${response.status}`);
          }
        }

        const data = await response.json();
        
        // Validate response structure
        if (!data || !Array.isArray(data.data)) {
          throw new Error("Invalid data format received from server.");
        }
        
        setStages(data.data);
      } catch (err) {
        console.error("Error fetching lead stages:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadStages();
  }, []);

  // Function to add a new stage via API
  const addNewStage = async () => {
    if (!newStage.stage_name.trim()) {
      alert("Please enter a stage name");
      return;
    }

    try {
      setAddLoading(true);
      const token = localStorage.getItem("login_token");
      
      // Calculate priority (add to the end)
      const priority = stages.length > 0 ? Math.max(...stages.map(s => s.priority)) + 1 : 1;
      
      const stageData = {
        stage_name: newStage.stage_name.trim(),
        priority: priority,
        is_default: newStage.is_default ? 1 : 0,
        color_code: newStage.color_code
      };

      const response = await fetch(`${baseUrlLocal}/api/v1/user/lead-stage/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(stageData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to add stage: ${response.status}`);
      }

      const result = await response.json();
      
      // Add the new stage to local state
      const addedStage = {
        id: result.data?.id || Date.now(), // Use server ID or fallback
        ...stageData,
        is_active: true // Assuming new stages are active by default
      };
      
      setStages([...stages, addedStage]);
      setNewStage({
        stage_name: "",
        color_code: "#3B82F6",
        is_default: 0
      });
      setIsAddingStage(false);
      
      alert("Stage added successfully!");
    } catch (err) {
      console.error("Error adding stage:", err);
      alert("Error adding stage: " + err.message);
    } finally {
      setAddLoading(false);
    }
  };

  // Function to update stage via API
  const updateStage = async (stageId, updates) => {
    try {
      const token = localStorage.getItem("login_token");
      
      const response = await fetch(`${baseUrlLocal}/api/v1/user/lead-stage/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          stage_id: stageId,
          ...updates
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update stage: ${response.status}`);
      }

      return await response.json();
    } catch (err) {
      console.error("Error updating stage:", err);
      throw err;
    }
  };

  // Function to move stage up in priority
  const moveStageUp = async (index) => {
    if (index === 0) return; // Can't move first stage up
    
    try {
      const newStages = [...stages];
      const temp = newStages[index];
      newStages[index] = newStages[index - 1];
      newStages[index - 1] = temp;
      
      // Update priorities
      newStages.forEach((stage, i) => {
        stage.priority = i + 1;
      });
      
      // Update priorities in backend
      await Promise.all(
        newStages.map(stage => 
          updateStage(stage.id, { priority: stage.priority })
        )
      );
      
      setStages(newStages);
    } catch (err) {
      alert("Error reordering stages: " + err.message);
    }
  };

  // Function to move stage down in priority
  const moveStageDown = async (index) => {
    if (index === stages.length - 1) return; // Can't move last stage down
    
    try {
      const newStages = [...stages];
      const temp = newStages[index];
      newStages[index] = newStages[index + 1];
      newStages[index + 1] = temp;
      
      // Update priorities
      newStages.forEach((stage, i) => {
        stage.priority = i + 1;
      });
      
      // Update priorities in backend
      await Promise.all(
        newStages.map(stage => 
          updateStage(stage.id, { priority: stage.priority })
        )
      );
      
      setStages(newStages);
    } catch (err) {
      alert("Error reordering stages: " + err.message);
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
      const token = localStorage.getItem("login_token");
      const stageId = stages[index].id;
      
      const response = await fetch(`${baseUrlLocal}/api/v1/user/lead-stage/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ stage_id: stageId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to delete stage: ${response.status}`);
      }

      const newStages = stages.filter((_, i) => i !== index);
      
      // Update priorities of remaining stages
      newStages.forEach((stage, i) => {
        stage.priority = i + 1;
      });
      
      setStages(newStages);
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
      updatedStage.is_active = !updatedStage.is_active;
      
      // Update in backend
      await updateStage(updatedStage.id, { 
        is_active: updatedStage.is_active ? 1 : 0 
      });
      
      newStages[index] = updatedStage;
      setStages(newStages);
    } catch (err) {
      alert("Error updating stage status: " + err.message);
    }
  };

  // Function to save all changes to API
  const saveChanges = async () => {
    try {
      setSaveLoading(true);
      const token = localStorage.getItem("login_token");
      
      // This would typically send the entire stages array to update all at once
      // For now, we'll update each stage individually
      await Promise.all(
        stages.map(stage => 
          updateStage(stage.id, {
            stage_name: stage.stage_name,
            priority: stage.priority,
            is_active: stage.is_active ? 1 : 0,
            color_code: stage.color_code
          })
        )
      );

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
      // Reload from API
      window.location.reload();
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
    { value: "#6B7280", label: "Gray", bgClass: "bg-gray-500" }
  ];

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
              onClick={() => window.location.reload()}
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
          <p className="text-sm text-gray-600">Manage your sales pipeline stages. You can edit, reorder, and add new stages at any position.</p>
          
          <div className="space-y-3 overflow-x-auto">
            {stages.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No Lead Stages Found</h3>
                <p className="text-gray-500">There are no lead stages configured in the system yet.</p>
              </div>
            ) : (
              stages.map((stage, index) => (
                <div key={stage.id} className="min-w-[450px]">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => moveStageUp(index)}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        title="Move up"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-up w-3 h-3" aria-hidden="true">
                          <path d="m18 15-6-6-6 6"></path>
                        </svg>
                      </button>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-grip-vertical w-4 h-4 text-gray-400" aria-hidden="true">
                        <circle cx="9" cy="12" r="1"></circle>
                        <circle cx="9" cy="5" r="1"></circle>
                        <circle cx="9" cy="19" r="1"></circle>
                        <circle cx="15" cy="12" r="1"></circle>
                        <circle cx="15" cy="5" r="1"></circle>
                        <circle cx="15" cy="19" r="1"></circle>
                      </svg>
                      <button 
                        onClick={() => moveStageDown(index)}
                        disabled={index === stages.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        title="Move down"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down w-3 h-3" aria-hidden="true">
                          <path d="m6 9 6 6 6-6"></path>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-gray-300 text-sm font-semibold text-gray-600">
                      {stage.priority}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: stage.color_code }}
                        ></div>
                        <span className="font-medium">{stage.stage_name}</span>
                        {stage.is_default && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Default</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleStageActive(index)}
                        className={`p-2 rounded ${stage.is_active ? 'text-green-600 hover:text-green-700 hover:bg-green-50' : 'text-red-600 hover:text-red-700 hover:bg-red-50'}`}
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
                        onClick={() => removeStage(index)}
                        disabled={stage.is_default}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded disabled:opacity-30"
                        title="Remove Stage"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2 w-4 h-4" aria-hidden="true">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          <line x1="10" x2="10" y1="11" y2="17"></line>
                          <line x1="14" x2="14" y1="11" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setIsAddingStage(!isAddingStage)}
              className="px-4 py-2 border-2 border-dashed border-green-300 text-green-600 rounded-lg hover:bg-green-50 flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-4 h-4" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="M12 5v14"></path>
              </svg>
              Add New Stage
            </button>
          </div>
          
          {isAddingStage && (
            <div className="p-4 border border-dashed border-gray-300 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Stage</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="md:col-span-2">
                  <input 
                    type="text" 
                    placeholder="Stage Name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStage.stage_name}
                    onChange={(e) => setNewStage({...newStage, stage_name: e.target.value})}
                  />
                </div>
                <div>
                  <select 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={newStage.color_code}
                    onChange={(e) => setNewStage({...newStage, color_code: e.target.value})}
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
                    disabled={addLoading}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-1 text-sm"
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus w-3 h-3" aria-hidden="true">
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
                  checked={newStage.is_default}
                  onChange={(e) => setNewStage({...newStage, is_default: e.target.checked ? 1 : 0})}
                  className="mr-2"
                />
                <label htmlFor="is_default" className="text-sm text-gray-600">
                  Set as default stage
                </label>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="text-sm font-medium text-blue-800 mb-3">Pipeline Preview</h4>
          <div className="flex flex-wrap gap-2">
            {stages.filter(stage => stage.is_active).map((stage, index) => (
              <div key={stage.id} className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border">
                  <div 
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: stage.color_code }}
                  ></div>
                  <span className="text-sm font-medium">{stage.stage_name}</span>
                </div>
                {index < stages.filter(stage => stage.is_active).length - 1 && (
                  <div className="text-gray-400">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button 
            onClick={resetDefaults}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw w-4 h-4" aria-hidden="true">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M8 16H3v5"></path>
            </svg>
            <span>Reset Defaults</span>
          </button>
          <button 
            onClick={saveChanges}
            disabled={saveLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save w-4 h-4" aria-hidden="true">
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