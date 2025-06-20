"use client"

import { useState } from "react"
import {
  Settings,
  Palette,
  Globe,
  Calendar,
  ToggleLeft,
  LayoutDashboard,
  PieChart,
  Users,
  Building,
  Mail,
  Bell,
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")
  const [isSaving, setIsSaving] = useState(false)
  const [editingStageId, setEditingStageId] = useState(null)
  const [showAddStageAt, setShowAddStageAt] = useState(null)
  const [showAddLeadForm, setShowAddLeadForm] = useState(null)
  const [selectedSourceForLead, setSelectedSourceForLead] = useState("")

  // Sample settings state
  const [settings, setSettings] = useState({
    companyName: "My Company",
    logo: "",
    itemsPerPage: 10,
    defaultView: "grid",
    theme: "light",
    primaryColor: "#3b82f6",
    accentColor: "#8b5cf6",
    language: "en",
    timezone: "Asia/Kolkata",
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    timeFormat: "12h",
    enableEmailIntegration: true,
    enableCalendarIntegration: false,
    enableNotifications: true,
    enableAnalytics: false,
    dashboardLayout: "default",
    defaultDashboardPeriod: "month",
    enableAutoAssignment: true,
    enableLeadScoring: false,
    enableWorkflowAutomation: true,
    enableReports: true,
    enableDataExport: true,
    enableAPIAccess: false,
    dashboardWidgets: [
      { id: "leads", name: "Leads Overview", enabled: true },
      { id: "pipeline", name: "Pipeline Status", enabled: true },
      { id: "revenue", name: "Revenue Chart", enabled: true },
      { id: "activities", name: "Recent Activities", enabled: false },
      { id: "tasks", name: "Upcoming Tasks", enabled: true },
      { id: "performance", name: "Performance Metrics", enabled: false },
    ],
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    companyWebsite: "",
    taxId: "",
    businessType: "corporation",
    pipelineStages: [
      { id: "new", name: "New Lead", color: "bg-blue-500", order: 1 },
      { id: "contacted", name: "Contacted", color: "bg-green-500", order: 2 },
      { id: "qualified", name: "Qualified", color: "bg-yellow-500", order: 3 },
      { id: "proposal", name: "Proposal Sent", color: "bg-purple-500", order: 4 },
    ],
    leadSources: ["Website", "Referral", "Social Media", "Advertisement"],
    leadStatuses: ["Open", "Contacted", "Qualified", "Closed"],
  })

  const [newStage, setNewStage] = useState({ id: "", name: "", color: "bg-gray-500" })
  const [editingStage, setEditingStage] = useState({ id: "", name: "", color: "bg-gray-500" })
  const [newStageAtPosition, setNewStageAtPosition] = useState({ id: "", name: "", color: "bg-gray-500", position: 0 })
  const [newSource, setNewSource] = useState("")
  const [newStatus, setNewStatus] = useState("")
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    status: "Open",
    address: "",
    notes: "",
  })

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

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "hi", name: "Hindi" },
    { code: "zh", name: "Chinese" },
  ]

  const timezones = [
    "Asia/Kolkata",
    "America/New_York",
    "America/Los_Angeles",
    "Europe/London",
    "Europe/Paris",
    "Asia/Tokyo",
    "Australia/Sydney",
  ]

  const currencies = [
    { code: "USD", name: "US Dollar" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "British Pound" },
    { code: "INR", name: "Indian Rupee" },
    { code: "JPY", name: "Japanese Yen" },
    { code: "CAD", name: "Canadian Dollar" },
  ]

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  const resetSettings = () => {
    if (confirm("Are you sure you want to reset to default settings?")) {
      setSettings({
        companyName: "My Company",
        logo: "",
        itemsPerPage: 10,
        defaultView: "grid",
        theme: "light",
        primaryColor: "#3b82f6",
        accentColor: "#8b5cf6",
        language: "en",
        timezone: "Asia/Kolkata",
        currency: "INR",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "12h",
        enableEmailIntegration: true,
        enableCalendarIntegration: false,
        enableNotifications: true,
        enableAnalytics: false,
        dashboardLayout: "default",
        defaultDashboardPeriod: "month",
        enableAutoAssignment: true,
        enableLeadScoring: false,
        enableWorkflowAutomation: true,
        enableReports: true,
        enableDataExport: true,
        enableAPIAccess: false,
        dashboardWidgets: [
          { id: "leads", name: "Leads Overview", enabled: true },
          { id: "pipeline", name: "Pipeline Status", enabled: true },
          { id: "revenue", name: "Revenue Chart", enabled: true },
          { id: "activities", name: "Recent Activities", enabled: false },
          { id: "tasks", name: "Upcoming Tasks", enabled: true },
          { id: "performance", name: "Performance Metrics", enabled: false },
        ],
        companyAddress: "",
        companyPhone: "",
        companyEmail: "",
        companyWebsite: "",
        taxId: "",
        businessType: "corporation",
        pipelineStages: [
          { id: "new", name: "New Lead", color: "bg-blue-500", order: 1 },
          { id: "contacted", name: "Contacted", color: "bg-green-500", order: 2 },
          { id: "qualified", name: "Qualified", color: "bg-yellow-500", order: 3 },
          { id: "proposal", name: "Proposal Sent", color: "bg-purple-500", order: 4 },
        ],
        leadSources: ["Website", "Referral", "Social Media", "Advertisement"],
        leadStatuses: ["Open", "Contacted", "Qualified", "Closed"],
      })
    }
  }

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }

  // Pipeline Stage Functions
  const handleAddStage = () => {
    if (!newStage.id || !newStage.name) return

    if (settings.pipelineStages.some((stage) => stage.id === newStage.id)) {
      alert("A stage with this ID already exists")
      return
    }

    const newOrder = settings.pipelineStages.length + 1
    updateSettings({
      pipelineStages: [...settings.pipelineStages, { ...newStage, order: newOrder }],
    })

    setNewStage({ id: "", name: "", color: "bg-gray-500" })
  }

  const handleAddStageAtPosition = (position) => {
    if (!newStageAtPosition.id || !newStageAtPosition.name) return

    if (settings.pipelineStages.some((stage) => stage.id === newStageAtPosition.id)) {
      alert("A stage with this ID already exists")
      return
    }

    // Update orders for existing stages
    const updatedStages = settings.pipelineStages.map((stage) => ({
      ...stage,
      order: stage.order >= position ? stage.order + 1 : stage.order,
    }))

    // Add new stage at the specified position
    const newStageWithOrder = { ...newStageAtPosition, order: position }
    updatedStages.push(newStageWithOrder)

    // Sort by order
    updatedStages.sort((a, b) => a.order - b.order)

    updateSettings({
      pipelineStages: updatedStages,
    })

    setNewStageAtPosition({ id: "", name: "", color: "bg-gray-500", position: 0 })
    setShowAddStageAt(null)
  }

  const handleEditStage = (stage) => {
    setEditingStageId(stage.id)
    setEditingStage({ id: stage.id, name: stage.name, color: stage.color })
  }

  const handleSaveEdit = () => {
    if (!editingStage.name) return

    updateSettings({
      pipelineStages: settings.pipelineStages.map((stage) =>
        stage.id === editingStageId ? { ...stage, name: editingStage.name, color: editingStage.color } : stage,
      ),
    })

    setEditingStageId(null)
    setEditingStage({ id: "", name: "", color: "bg-gray-500" })
  }

  const handleCancelEdit = () => {
    setEditingStageId(null)
    setEditingStage({ id: "", name: "", color: "bg-gray-500" })
  }

  const handleRemoveStage = (id) => {
    const stageToRemove = settings.pipelineStages.find((stage) => stage.id === id)
    if (!stageToRemove) return

    // Update orders for remaining stages
    const updatedStages = settings.pipelineStages
      .filter((stage) => stage.id !== id)
      .map((stage) => ({
        ...stage,
        order: stage.order > stageToRemove.order ? stage.order - 1 : stage.order,
      }))

    updateSettings({
      pipelineStages: updatedStages,
    })
  }

  const moveStage = (stageId, direction) => {
    const currentStage = settings.pipelineStages.find((stage) => stage.id === stageId)
    if (!currentStage) return

    const newOrder = direction === "up" ? currentStage.order - 1 : currentStage.order + 1
    const swapStage = settings.pipelineStages.find((stage) => stage.order === newOrder)

    if (!swapStage) return

    const updatedStages = settings.pipelineStages.map((stage) => {
      if (stage.id === stageId) {
        return { ...stage, order: newOrder }
      }
      if (stage.id === swapStage.id) {
        return { ...stage, order: currentStage.order }
      }
      return stage
    })

    updateSettings({
      pipelineStages: updatedStages,
    })
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

  const toggleWidget = (widgetId) => {
    updateSettings({
      dashboardWidgets: settings.dashboardWidgets.map((widget) =>
        widget.id === widgetId ? { ...widget, enabled: !widget.enabled } : widget,
      ),
    })
  }

  const getLeadsBySource = (source) => {
    return settings.leads.filter((lead) => lead.source === source)
  }

  const getLeadsByStatus = (status) => {
    return settings.leads.filter((lead) => lead.status === status)
  }

  // Sort stages by order for display
  const sortedStages = [...settings.pipelineStages].sort((a, b) => a.order - b.order)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Settings</h1>
              <p className="text-gray-600">Manage your application preferences</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={resetSettings}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Defaults</span>
              </button>
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
          <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r p-4">
            <h3 className="font-semibold text-gray-800 mb-4 px-2">Categories</h3>
            <div className="space-y-1">
              {[
                { id: "general", name: "General", icon: Settings },
                { id: "appearance", name: "Appearance", icon: Palette },
                { id: "localization", name: "Localization", icon: Globe },
                { id: "features", name: "Features", icon: ToggleLeft },
                { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
                { id: "pipeline", name: "Pipeline", icon: PieChart },
                { id: "leads", name: "Leads", icon: Users },
                { id: "accounts", name: "Accounts", icon: Building },
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
            {/* General Settings */}
            {activeTab === "general" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">General Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={settings.companyName}
                        onChange={(e) => updateSettings({ companyName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                      <input
                        type="text"
                        value={settings.logo}
                        onChange={(e) => updateSettings({ logo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Items Per Page</label>
                      <input
                        type="number"
                        min="5"
                        max="100"
                        value={settings.itemsPerPage}
                        onChange={(e) => updateSettings({ itemsPerPage: Number(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Default View</label>
                      <select
                        value={settings.defaultView}
                        onChange={(e) => updateSettings({ defaultView: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="grid">Grid</option>
                        <option value="list">List</option>
                        <option value="pipeline">Pipeline</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Appearance Settings */}
            {activeTab === "appearance" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Appearance</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
                    <select
                      value={settings.theme}
                      onChange={(e) => updateSettings({ theme: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={settings.primaryColor}
                          onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                          className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">{settings.primaryColor}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Accent Color</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={settings.accentColor}
                          onChange={(e) => updateSettings({ accentColor: e.target.value })}
                          className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                        />
                        <span className="text-sm text-gray-600">{settings.accentColor}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                  <div className="flex flex-wrap gap-4">
                    <div
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: settings.primaryColor }}
                    >
                      Primary Button
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      Accent Button
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Localization Settings */}
            {activeTab === "localization" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Localization Settings</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                      <select
                        value={settings.language}
                        onChange={(e) => updateSettings({ language: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {languages.map((lang) => (
                          <option key={lang.code} value={lang.code}>
                            {lang.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => updateSettings({ timezone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {timezones.map((tz) => (
                          <option key={tz} value={tz}>
                            {tz}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <select
                        value={settings.currency}
                        onChange={(e) => updateSettings({ currency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {currencies.map((curr) => (
                          <option key={curr.code} value={curr.code}>
                            {curr.name} ({curr.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Format</label>
                      <select
                        value={settings.dateFormat}
                        onChange={(e) => updateSettings({ dateFormat: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                        <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                        <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        <option value="DD-MM-YYYY">DD-MM-YYYY</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time Format</label>
                      <select
                        value={settings.timeFormat}
                        onChange={(e) => updateSettings({ timeFormat: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="12h">12 Hour (AM/PM)</option>
                        <option value="24h">24 Hour</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Date:</span>{" "}
                      {settings.dateFormat === "DD/MM/YYYY"
                        ? "15/03/2024"
                        : settings.dateFormat === "MM/DD/YYYY"
                          ? "03/15/2024"
                          : settings.dateFormat === "YYYY-MM-DD"
                            ? "2024-03-15"
                            : "15-03-2024"}
                    </div>
                    <div>
                      <span className="font-medium">Time:</span> {settings.timeFormat === "12h" ? "2:30 PM" : "14:30"}
                    </div>
                    <div>
                      <span className="font-medium">Currency:</span>{" "}
                      {settings.currency === "USD"
                        ? "$1,234.56"
                        : settings.currency === "EUR"
                          ? "€1,234.56"
                          : settings.currency === "GBP"
                            ? "£1,234.56"
                            : settings.currency === "INR"
                              ? "₹1,234.56"
                              : settings.currency === "JPY"
                                ? "¥1,235"
                                : "CAD $1,234.56"}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Settings */}
            {activeTab === "features" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Feature Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Integrations</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium">Email Integration</div>
                            <div className="text-sm text-gray-600">Connect with email providers</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableEmailIntegration}
                            onChange={(e) => updateSettings({ enableEmailIntegration: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium">Calendar Integration</div>
                            <div className="text-sm text-gray-600">Sync with calendar applications</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableCalendarIntegration}
                            onChange={(e) => updateSettings({ enableCalendarIntegration: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Automation & Intelligence</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Auto Lead Assignment</div>
                          <div className="text-sm text-gray-600">Automatically assign leads to team members</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableAutoAssignment}
                            onChange={(e) => updateSettings({ enableAutoAssignment: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Lead Scoring</div>
                          <div className="text-sm text-gray-600">Automatically score leads based on behavior</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableLeadScoring}
                            onChange={(e) => updateSettings({ enableLeadScoring: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Workflow Automation</div>
                          <div className="text-sm text-gray-600">Enable automated workflows and triggers</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableWorkflowAutomation}
                            onChange={(e) => updateSettings({ enableWorkflowAutomation: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Analytics & Reporting</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Advanced Analytics</div>
                          <div className="text-sm text-gray-600">Enable detailed analytics and insights</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableAnalytics}
                            onChange={(e) => updateSettings({ enableAnalytics: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Custom Reports</div>
                          <div className="text-sm text-gray-600">Create and schedule custom reports</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableReports}
                            onChange={(e) => updateSettings({ enableReports: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Data Export</div>
                          <div className="text-sm text-gray-600">Export data to CSV, Excel, and other formats</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableDataExport}
                            onChange={(e) => updateSettings({ enableDataExport: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">API Access</div>
                          <div className="text-sm text-gray-600">Enable REST API for third-party integrations</div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableAPIAccess}
                            onChange={(e) => updateSettings({ enableAPIAccess: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Dashboard Settings */}
            {activeTab === "dashboard" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Dashboard Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Layout & Display</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dashboard Layout</label>
                        <select
                          value={settings.dashboardLayout}
                          onChange={(e) => updateSettings({ dashboardLayout: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="default">Default</option>
                          <option value="compact">Compact</option>
                          <option value="expanded">Expanded</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Default Time Period</label>
                        <select
                          value={settings.defaultDashboardPeriod}
                          onChange={(e) => updateSettings({ defaultDashboardPeriod: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="week">This Week</option>
                          <option value="month">This Month</option>
                          <option value="quarter">This Quarter</option>
                          <option value="year">This Year</option>
                          <option value="custom">Custom Range</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Dashboard Widgets</h3>
                    <p className="text-sm text-gray-600 mb-4">Choose which widgets to display on your dashboard</p>

                    <div className="space-y-3">
                      {settings.dashboardWidgets.map((widget) => (
                        <div key={widget.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${widget.enabled ? "bg-green-500" : "bg-gray-300"}`}
                            ></div>
                            <div>
                              <div className="font-medium">{widget.name}</div>
                              <div className="text-sm text-gray-600">
                                {widget.id === "leads" && "Overview of lead statistics and trends"}
                                {widget.id === "pipeline" && "Visual representation of your sales pipeline"}
                                {widget.id === "revenue" && "Revenue tracking and forecasting charts"}
                                {widget.id === "activities" && "Recent activities and interactions"}
                                {widget.id === "tasks" && "Upcoming tasks and reminders"}
                                {widget.id === "performance" && "Team and individual performance metrics"}
                              </div>
                            </div>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={widget.enabled}
                              onChange={() => toggleWidget(widget.id)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Dashboard Preview</h4>
                    <div className="text-sm text-blue-700">
                      <div>
                        Active Widgets: {settings.dashboardWidgets.filter((w) => w.enabled).length} of{" "}
                        {settings.dashboardWidgets.length}
                      </div>
                      <div>
                        Layout: {settings.dashboardLayout.charAt(0).toUpperCase() + settings.dashboardLayout.slice(1)}
                      </div>
                      <div>
                        Default Period:{" "}
                        {settings.defaultDashboardPeriod.charAt(0).toUpperCase() +
                          settings.defaultDashboardPeriod.slice(1)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Pipeline Settings */}
            {activeTab === "pipeline" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Pipeline Settings</h2>
                  <div className="text-sm text-gray-500">Total Stages: {settings.pipelineStages.length}</div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-800">Pipeline Stages</h3>
                  <p className="text-sm text-gray-600">
                    Manage your sales pipeline stages. You can edit, reorder, and add new stages at any position.
                  </p>

                  <div className="space-y-3">
                    {sortedStages.map((stage, index) => (
                      <div key={stage.id}>
                        {/* Add Stage at Beginning */}
                        {index === 0 && showAddStageAt === 1 && (
                          <div className="mb-2 p-4 border border-dashed border-green-300 rounded-lg bg-green-50">
                            <h4 className="text-sm font-medium text-green-800 mb-3">Add New Stage at Beginning</h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div>
                                <input
                                  type="text"
                                  value={newStageAtPosition.id}
                                  onChange={(e) =>
                                    setNewStageAtPosition({
                                      ...newStageAtPosition,
                                      id: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                                    })
                                  }
                                  placeholder="Stage ID"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                              </div>
                              <div>
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
                                  disabled={!newStageAtPosition.id || !newStageAtPosition.name}
                                >
                                  <Plus className="w-3 h-3" />
                                  Add
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAddStageAt(null)
                                    setNewStageAtPosition({ id: "", name: "", color: "bg-gray-500", position: 0 })
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
                              disabled={stage.order === 1}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                            >
                              <ChevronUp className="w-3 h-3" />
                            </button>
                            <GripVertical className="w-4 h-4 text-gray-400" />
                            <button
                              onClick={() => moveStage(stage.id, "down")}
                              disabled={stage.order === settings.pipelineStages.length}
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
                                    value={editingStage.name}
                                    onChange={(e) => setEditingStage({ ...editingStage, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Stage name"
                                  />
                                </div>
                                <div>
                                  <select
                                    value={editingStage.color}
                                    onChange={(e) => setEditingStage({ ...editingStage, color: e.target.value })}
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
                                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-1"
                                  >
                                    <Check className="w-4 h-4" />
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
                                <span className="text-xs text-gray-500">({stage.id})</span>
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
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setShowAddStageAt(stage.order + 1)}
                                className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded"
                                title="Add Stage After"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRemoveStage(stage.id)}
                                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                                title="Remove Stage"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Add Stage at Position Form */}
                        {showAddStageAt === stage.order + 1 && (
                          <div className="ml-12 mt-2 p-4 border border-dashed border-green-300 rounded-lg bg-green-50">
                            <h4 className="text-sm font-medium text-green-800 mb-3">
                              Add New Stage After "{stage.name}"
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div>
                                <input
                                  type="text"
                                  value={newStageAtPosition.id}
                                  onChange={(e) =>
                                    setNewStageAtPosition({
                                      ...newStageAtPosition,
                                      id: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                                    })
                                  }
                                  placeholder="Stage ID"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                              </div>
                              <div>
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
                                  disabled={!newStageAtPosition.id || !newStageAtPosition.name}
                                >
                                  <Plus className="w-3 h-3" />
                                  Add
                                </button>
                                <button
                                  onClick={() => {
                                    setShowAddStageAt(null)
                                    setNewStageAtPosition({ id: "", name: "", color: "bg-gray-500", position: 0 })
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
                      <div>
                        <input
                          type="text"
                          value={newStage.id}
                          onChange={(e) =>
                            setNewStage({ ...newStage, id: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                          }
                          placeholder="Stage ID"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
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
                          className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-1 text-sm"
                          disabled={!newStage.id || !newStage.name}
                        >
                          <Plus className="w-3 h-3" />
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

            {/* Accounts Settings */}
            {activeTab === "accounts" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Company Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Company Address</label>
                          <textarea
                            value={settings.companyAddress}
                            onChange={(e) => updateSettings({ companyAddress: e.target.value })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter your company address"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input
                            type="tel"
                            value={settings.companyPhone}
                            onChange={(e) => updateSettings({ companyPhone: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input
                            type="email"
                            value={settings.companyEmail}
                            onChange={(e) => updateSettings({ companyEmail: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="contact@company.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                          <input
                            type="url"
                            value={settings.companyWebsite}
                            onChange={(e) => updateSettings({ companyWebsite: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://www.company.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Tax ID / Registration Number
                          </label>
                          <input
                            type="text"
                            value={settings.taxId}
                            onChange={(e) => updateSettings({ taxId: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter tax ID or registration number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                          <select
                            value={settings.businessType}
                            onChange={(e) => updateSettings({ businessType: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="corporation">Corporation</option>
                            <option value="llc">LLC</option>
                            <option value="partnership">Partnership</option>
                            <option value="sole-proprietorship">Sole Proprietorship</option>
                            <option value="non-profit">Non-Profit</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-gray-600" />
                          <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-sm text-gray-600">Receive notifications via email</div>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={settings.enableNotifications}
                            onChange={(e) => updateSettings({ enableNotifications: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h4 className="text-sm font-medium text-yellow-800 mb-2">Account Security</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Keep your account secure by regularly updating your password and enabling two-factor
                      authentication.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
                        Change Password
                      </button>
                      <button className="px-3 py-1 border border-yellow-600 text-yellow-700 rounded text-sm hover:bg-yellow-100">
                        Enable 2FA
                      </button>
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
