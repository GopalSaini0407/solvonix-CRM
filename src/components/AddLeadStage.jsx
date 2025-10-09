"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import {
  PieChart,
  Users,
  Save,
  RefreshCw,
  Plus,
  Trash2,
  X,
  Edit3,
  Check,
  ChevronUp,
  ChevronDown,
  GripVertical,
} from "lucide-react"

// API base URL
const API_BASE_URL = "http://localhost/crm-solvonix/api/v1"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("pipeline")
  const [isSaving, setIsSaving] = useState(false)

  // Pipeline States
  const [editingStageId, setEditingStageId] = useState(null)
  const [showAddStageAt, setShowAddStageAt] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Settings state
  const [settings, setSettings] = useState({
    pipelineStages: [],
    leadSources: ["Website", "Referral", "Social Media", "Advertisement"],
    leadStatuses: ["Open", "Contacted", "Qualified", "Closed"],
  })

  const [newStage, setNewStage] = useState({ name: "", color: "bg-gray-500" })
  const [newStageAtPosition, setNewStageAtPosition] = useState({ name: "", color: "bg-gray-500", position: 0 })
  const [newSource, setNewSource] = useState("")
  const [newStatus, setNewStatus] = useState("")

  const availableColors = [
    { name: "Blue", value: "bg-blue-500" },
    { name: "Green", value: "bg-green-500" },
    { name: "Red", value: "bg-red-500" },
    { name: "Yellow", value: "bg-yellow-500" },
    { name: "Purple", value: "bg-purple-500" },
    { name: "Orange", value: "bg-orange-500" },
    { name: "Teal", value: "bg-teal-500" },
    { name: "Pink", value: "bg-pink-500" },
    { name: "Indigo", value: "bg-indigo-500" },
    { name: "Gray", value: "bg-gray-500" },
  ]

  // Get token from localStorage
  const getAuthToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('login_token') || '';
    }
    return ''
  }

  // Axios instance with base configuration
  const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    }
  })

  // Add request interceptor to include token
  apiClient.interceptors.request.use(
    (config) => {
      const token = getAuthToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // API Functions for Lead Stages with Axios
  const fetchLeadStages = async () => {
    const token = getAuthToken()
    if (!token) {
      setError("Authentication token not found. Please login again.")
      return
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.get('/user/lead-stages')
      
      // Check if response has data property
      if (response.data && response.data.data) {
        const transformedStages = response.data.data.map((stage, index) => ({
          id: stage.id?.toString() || `stage-${index}`,
          name: stage.name || `Stage ${index + 1}`,
          color: stage.color ? `bg-${stage.color}-500` : availableColors[index % availableColors.length].value,
          order: stage.order || index + 1,
          ...stage
        }))
        
        updateSettings({ pipelineStages: transformedStages })
      } else {
        // If API returns success but no data, set empty array
        updateSettings({ pipelineStages: [] })
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // Server responded with error status
        if (err.response.status === 401) {
          setError("Authentication failed. Please login again.")
        } else if (err.response.data && err.response.data.message) {
          setError(err.response.data.message)
        } else {
          setError(`Server error: ${err.response.status}`)
        }
      } else if (err.request) {
        // Network error
        setError("Network error. Please check your connection.")
      } else {
        // Other errors
        setError(err.message || "Something went wrong")
      }
      console.error("Error fetching lead stages:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const createLeadStage = async (stageData) => {
    const token = getAuthToken()
    if (!token) {
      throw new Error("Authentication token not found. Please login again.")
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.post('/user/lead-stage/add', {
        name: stageData.name,
        color: stageData.color.replace('bg-', '').replace('-500', ''),
        order: stageData.order
      })
      
      if (response.data) {
        await fetchLeadStages()
        return response.data
      } else {
        throw new Error("No response data received")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create stage"
      setError(errorMessage)
      console.error("Error creating lead stage:", err)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const updateLeadStage = async (stageId, stageData) => {
    const token = getAuthToken()
    if (!token) {
      throw new Error("Authentication token not found. Please login again.")
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.post('/user/lead-stage/update', {
        id: stageId,
        name: stageData.name,
        color: stageData.color.replace('bg-', '').replace('-500', ''),
        order: stageData.order
      })
      
      if (response.data) {
        await fetchLeadStages()
        return response.data
      } else {
        throw new Error("No response data received")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update stage"
      setError(errorMessage)
      console.error("Error updating lead stage:", err)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteLeadStage = async (stageId) => {
    const token = getAuthToken()
    if (!token) {
      throw new Error("Authentication token not found. Please login again.")
    }

    setIsLoading(true)
    setError(null)
    try {
      const response = await apiClient.post('/user/lead-stage/delete', { 
        id: stageId 
      })
      
      if (response.data) {
        await fetchLeadStages()
        return response.data
      } else {
        throw new Error("No response data received")
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to delete stage"
      setError(errorMessage)
      console.error("Error deleting lead stage:", err)
      throw new Error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch lead stages when pipeline tab is active
  useEffect(() => {
    if (activeTab === "pipeline") {
      fetchLeadStages()
    }
  }, [activeTab])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  // Pipeline Stage Functions with API integration
  const handleAddStage = async () => {
    if (!newStage.name) {
      alert("Please enter stage name")
      return
    }

    try {
      await createLeadStage({
        name: newStage.name,
        color: newStage.color,
        order: settings.pipelineStages.length + 1
      })
      
      setNewStage({ name: "", color: "bg-gray-500" })
    } catch (err) {
      // Error is already handled in createLeadStage
    }
  }

  const handleAddStageAtPosition = async (position) => {
    if (!newStageAtPosition.name) {
      alert("Please enter stage name")
      return
    }

    try {
      await createLeadStage({
        name: newStageAtPosition.name,
        color: newStageAtPosition.color,
        order: position
      })
      
      setNewStageAtPosition({ name: "", color: "bg-gray-500", position: 0 })
      setShowAddStageAt(null)
    } catch (err) {
      // Error is already handled in createLeadStage
    }
  }

  const handleEditStage = (stage) => {
    setEditingStageId(stage.id)
    setNewStage({ name: stage.name, color: stage.color })
  }

  const handleSaveEdit = async () => {
    if (!newStage.name) {
      alert("Please enter stage name")
      return
    }

    try {
      const stageToUpdate = settings.pipelineStages.find(stage => stage.id === editingStageId)
      await updateLeadStage(editingStageId, {
        name: newStage.name,
        color: newStage.color,
        order: stageToUpdate.order
      })
      
      setEditingStageId(null)
      setNewStage({ name: "", color: "bg-gray-500" })
    } catch (err) {
      // Error is already handled in updateLeadStage
    }
  }

  const handleCancelEdit = () => {
    setEditingStageId(null)
    setNewStage({ name: "", color: "bg-gray-500" })
  }

  const handleRemoveStage = async (id) => {
    if (!confirm("Are you sure you want to delete this stage?")) return

    try {
      await deleteLeadStage(id)
    } catch (err) {
      // Error is already handled in deleteLeadStage
    }
  }

  const moveStage = async (stageId, direction) => {
    const currentStage = settings.pipelineStages.find((stage) => stage.id === stageId)
    if (!currentStage) return

    const newOrder = direction === "up" ? currentStage.order - 1 : currentStage.order + 1
    const swapStage = settings.pipelineStages.find((stage) => stage.order === newOrder)

    if (!swapStage) return

    try {
      await Promise.all([
        updateLeadStage(stageId, { 
          name: currentStage.name, 
          color: currentStage.color, 
          order: newOrder 
        }),
        updateLeadStage(swapStage.id, { 
          name: swapStage.name, 
          color: swapStage.color, 
          order: currentStage.order 
        })
      ])
    } catch (err) {
      // Error is already handled in updateLeadStage
    }
  }

  // Lead Management Functions
  const handleAddSource = () => {
    if (!newSource) return
    updateSettings({
      leadSources: [...settings.leadSources, newSource],
    })
    setNewSource("")
  }

  const handleRemoveSource = (source) => {
    updateSettings({
      leadSources: settings.leadSources.filter((s) => s !== source),
    })
  }

  const handleAddStatus = () => {
    if (!newStatus) return
    updateSettings({
      leadStatuses: [...settings.leadStatuses, newStatus],
    })
    setNewStatus("")
  }

  const handleRemoveStatus = (status) => {
    updateSettings({
      leadStatuses: settings.leadStatuses.filter((s) => s !== status),
    })
  }

  // Sort stages by order for display
  const sortedStages = [...settings.pipelineStages].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-300">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600">Manage your application preferences</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                disabled={isSaving}
              >
                {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>{isSaving ? "Saving..." : "Save Settings"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <div className="w-full lg:w-64 border-gray-300 border-b lg:border-b-0 lg:border-r p-4">
            <h3 className="font-semibold text-gray-800 mb-4 px-2">Categories</h3>
            <div className="space-y-1">
              {[
                { id: "pipeline", name: "Pipeline", icon: PieChart },
                { id: "leads", name: "Leads", icon: Users },
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 text-sm ${
                    activeTab === category.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6">
            {/* Enhanced Pipeline Settings with API Integration */}
            {activeTab === "pipeline" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center flex-wrap">
                  <h2 className="text-xl font-semibold text-gray-800">Pipeline Settings</h2>
                  <div className="text-sm text-gray-500">Total Stages: {settings.pipelineStages.length}</div>
                </div>

                {/* Loading and Error States */}
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
                    <span className="ml-2">Loading pipeline stages...</span>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-red-700 font-medium">Error loading pipeline stages</div>
                    <div className="text-red-600 text-sm mt-1">{error}</div>
                    <button 
                      onClick={fetchLeadStages}
                      className="mt-2 px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                    >
                      Retry
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Pipeline Stages</h3>
                  <p className="text-sm text-gray-600">
                    Manage your sales pipeline stages. You can edit, reorder, and add new stages at any position.
                  </p>

                  <div className="space-y-3 overflow-x-auto">
                    {sortedStages.map((stage, index) => (
                      <div key={stage.id} className="min-w-[450px]">
                        {/* Add Stage at Beginning */}
                        {index === 0 && showAddStageAt === 1 && (
                          <div className="mb-2 p-4 border border-dashed border-green-300 rounded-lg bg-green-50">
                            <h4 className="text-sm font-medium text-green-800 mb-3">Add New Stage at Beginning</h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div className="md:col-span-2">
                                <input
                                  type="text"
                                  value={newStageAtPosition.name}
                                  onChange={(e) =>
                                    setNewStageAtPosition({ ...newStageAtPosition, name: e.target.value })
                                  }
                                  placeholder="Stage Name"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <select
                                  value={newStageAtPosition.color}
                                  onChange={(e) =>
                                    setNewStageAtPosition({ ...newStageAtPosition, color: e.target.value })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                  {availableColors.map((color) => (
                                    <option key={color.value} value={color.value}>
                                      {color.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAddStageAtPosition(1)}
                                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 text-sm"
                                  disabled={!newStageAtPosition.name || isLoading}
                                >
                                  {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                  Add
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAddStageAt(null)
                                    setNewStageAtPosition({ name: "", color: "bg-gray-500", position: 0 })
                                  }}
                                  className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Existing Stage */}
                        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          {/* Drag Handle */}
                          <div className="flex flex-col gap-1">
                            <button
                              onClick={() => moveStage(stage.id, "up")}
                              disabled={stage.order === 1 || isLoading}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <button
                              onClick={() => moveStage(stage.id, "down")}
                              disabled={stage.order === settings.pipelineStages.length || isLoading}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            >
                              <ChevronDown className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Stage Order */}
                          <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full border-2 border-gray-300 text-sm font-semibold text-gray-600">
                            {stage.order}
                          </div>

                          {/* Stage Content */}
                          <div className="flex-1">
                            {editingStageId === stage.id ? (
                              // Edit Mode
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div>
                                  <input
                                    type="text"
                                    value={newStage.name}
                                    onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Stage name"
                                  />
                                </div>
                                <div>
                                  <select
                                    value={newStage.color}
                                    onChange={(e) => setNewStage({ ...newStage, color: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  >
                                    {availableColors.map((color) => (
                                      <option key={color.value} value={color.value}>
                                        {color.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={handleSaveEdit}
                                    disabled={isLoading}
                                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 disabled:bg-gray-400"
                                  >
                                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                    Save
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${stage.color}`}></div>
                                <span className="font-medium">{stage.name}</span>
                              </div>
                            )}
                          </div>

                          {/* Action Buttons */}
                          {editingStageId !== stage.id && (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleEditStage(stage)}
                                className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded"
                                title="Edit Stage"
                                disabled={isLoading}
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowAddStageAt(stage.order + 1)}
                                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                                title="Add Stage After"
                                disabled={isLoading}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveStage(stage.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Remove Stage"
                                disabled={isLoading}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Add Stage at Position Form */}
                        {showAddStageAt === stage.order + 1 && (
                          <div className="sm:ml-12 mt-2 p-4 border border-dashed border-green-300 rounded-lg bg-green-50">
                            <h4 className="text-sm font-medium text-green-800 mb-3">
                              Add New Stage After "{stage.name}"
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div className="md:col-span-2">
                                <input
                                  type="text"
                                  value={newStageAtPosition.name}
                                  onChange={(e) =>
                                    setNewStageAtPosition({ ...newStageAtPosition, name: e.target.value })
                                  }
                                  placeholder="Stage Name"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <select
                                  value={newStageAtPosition.color}
                                  onChange={(e) =>
                                    setNewStageAtPosition({ ...newStageAtPosition, color: e.target.value })
                                  }
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                >
                                  {availableColors.map((color) => (
                                    <option key={color.value} value={color.value}>
                                      {color.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleAddStageAtPosition(stage.order + 1)}
                                  className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1 text-sm"
                                  disabled={!newStageAtPosition.name || isLoading}
                                >
                                  {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                                  Add
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAddStageAt(null)
                                    setNewStageAtPosition({ name: "", color: "bg-gray-500", position: 0 })
                                  }}
                                  className="px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Add Stage at Beginning Button */}
                  {showAddStageAt !== 1 && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setShowAddStageAt(1)}
                        className="px-4 py-2 border-2 border-dashed border-green-300 text-green-600 rounded-lg hover:bg-green-50 flex items-center gap-2"
                        disabled={isLoading}
                      >
                        <Plus className="w-4 h-4" />
                        Add Stage at Beginning
                      </button>
                    </div>
                  )}

                  {/* Add Stage at End */}
                  <div className="p-4 border border-dashed border-gray-300 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Stage at End</h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          value={newStage.name}
                          onChange={(e) => setNewStage({ ...newStage, name: e.target.value })}
                          placeholder="Stage Name"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <select
                          value={newStage.color}
                          onChange={(e) => setNewStage({ ...newStage, color: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {availableColors.map((color) => (
                            <option key={color.value} value={color.value}>
                              {color.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <button
                          onClick={handleAddStage}
                          className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 text-sm disabled:bg-gray-400"
                          disabled={!newStage.name || isLoading}
                        >
                          {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Plus className="w-3 h-3" />}
                          Add Stage
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pipeline Preview */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-3">Pipeline Preview</h4>
                  <div className="flex flex-wrap gap-2">
                    {sortedStages.map((stage, index) => (
                      <div key={stage.id} className="flex items-center gap-2">
                        <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border">
                          <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                          <span className="text-sm font-medium">{stage.name}</span>
                        </div>
                        {index < sortedStages.length - 1 && <div className="text-gray-400">→</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Simple Leads Settings */}
            {activeTab === "leads" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Leads Settings</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Lead Sources */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Lead Sources</h3>
                    <p className="text-sm text-gray-600">Manage where your leads come from</p>

                    <div className="space-y-3">
                      {settings.leadSources.map((source, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="font-medium">{source}</span>
                          <button
                            onClick={() => handleRemoveSource(source)}
                            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Remove Source"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newSource}
                        onChange={(e) => setNewSource(e.target.value)}
                        placeholder="New lead source"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddSource}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={!newSource}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Lead Statuses */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">Lead Statuses</h3>
                    <p className="text-sm text-gray-600">Manage lead status options</p>

                    <div className="space-y-3">
                      {settings.leadStatuses.map((status, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                          <span className="font-medium">{status}</span>
                          <button
                            onClick={() => handleRemoveStatus(status)}
                            className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                            title="Remove Status"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        placeholder="New lead status"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={handleAddStatus}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={!newStatus}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="text-sm font-medium text-blue-800 mb-2">Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm text-blue-700">
                    <div>
                      Lead Sources: <span className="font-semibold">{settings.leadSources.length}</span>
                    </div>
                    <div>
                      Lead Statuses: <span className="font-semibold">{settings.leadStatuses.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}