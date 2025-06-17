"use client"

import { useState, useMemo, useCallback } from "react"
import {
  Search,
  Plus,
  Calendar,
  ListIcon,
  CheckSquare,
  Clock,
  User,
  Building,
  X,
  Check,
  Trash2,
  Phone,
  Mail,
  FileText,
  MessageSquare,
  Coffee,
  Users,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  CalendarDays,
  Columns,
  Filter,
  Download,
  MoreHorizontal,
  Star,
  Archive,
  Copy,
  Eye,
  RefreshCw,
} from "lucide-react"

const Tasks = () => {
  const [viewMode, setViewMode] = useState("list") // list, calendar, kanban
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedPriority, setSelectedPriority] = useState("all")
  const [selectedAssignee, setSelectedAssignee] = useState("all")
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)
  const [isTaskDetailOpen, setIsTaskDetailOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [editingTask, setEditingTask] = useState({})
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedTasks, setSelectedTasks] = useState([])
  const [sortBy, setSortBy] = useState("dueDate")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showFilters, setShowFilters] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Sample data for team members
  const teamMembers = [
    { id: 1, name: "Priya Singh", avatar: "PS", email: "priya@company.com" },
    { id: 2, name: "Amit Kumar", avatar: "AK", email: "amit@company.com" },
    { id: 3, name: "Neha Agarwal", avatar: "NA", email: "neha@company.com" },
    { id: 4, name: "Rohit Verma", avatar: "RV", email: "rohit@company.com" },
    { id: 5, name: "Kavya Sharma", avatar: "KS", email: "kavya@company.com" },
  ]

  // Sample data for tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Follow up with Rajesh Kumar",
      description: "Call to discuss the enterprise software proposal",
      type: "call",
      status: "pending",
      priority: "high",
      dueDate: "2024-02-15T14:00:00",
      createdDate: "2024-01-10T09:30:00",
      assignedTo: "Priya Singh",
      relatedTo: {
        type: "contact",
        name: "Rajesh Kumar",
        company: "Tech Solutions Pvt Ltd",
      },
      notes: "Focus on discussing the pricing structure and implementation timeline",
      reminder: "2024-02-15T13:30:00",
      completed: false,
      starred: false,
      tags: ["urgent", "proposal"],
    },
    {
      id: 2,
      title: "Send proposal to Digital Corp",
      description: "Finalize and send the digital marketing proposal",
      type: "email",
      status: "in-progress",
      priority: "high",
      dueDate: "2024-02-14T17:00:00",
      createdDate: "2024-01-12T11:45:00",
      assignedTo: "Amit Kumar",
      relatedTo: {
        type: "opportunity",
        name: "Digital Marketing Campaign",
        company: "Digital Corp",
      },
      notes: "Include case studies and ROI projections",
      reminder: "2024-02-14T15:00:00",
      completed: false,
      starred: true,
      tags: ["proposal", "marketing"],
    },
    {
      id: 3,
      title: "Product demo with StartupXYZ",
      description: "Demonstrate CRM features to the startup team",
      type: "meeting",
      status: "pending",
      priority: "medium",
      dueDate: "2024-02-16T11:00:00",
      createdDate: "2024-01-14T14:20:00",
      assignedTo: "Neha Agarwal",
      relatedTo: {
        type: "opportunity",
        name: "CRM Implementation",
        company: "StartupXYZ",
      },
      notes: "Focus on onboarding process and integration capabilities",
      reminder: "2024-02-16T10:00:00",
      completed: false,
      starred: false,
      tags: ["demo", "crm"],
    },
    {
      id: 4,
      title: "Prepare quarterly business review",
      description: "Create presentation for Enterprise Ltd quarterly review",
      type: "task",
      status: "pending",
      priority: "medium",
      dueDate: "2024-02-18T09:00:00",
      createdDate: "2024-01-15T16:30:00",
      assignedTo: "Rohit Verma",
      relatedTo: {
        type: "contact",
        name: "Manoj Singh",
        company: "Enterprise Ltd",
      },
      notes: "Include success metrics and future roadmap",
      reminder: "2024-02-17T16:00:00",
      completed: false,
      starred: false,
      tags: ["review", "presentation"],
    },
    {
      id: 5,
      title: "Contract negotiation call",
      description: "Finalize contract terms with Business Solutions",
      type: "call",
      status: "completed",
      priority: "high",
      dueDate: "2024-02-10T13:00:00",
      createdDate: "2024-01-08T10:15:00",
      assignedTo: "Kavya Sharma",
      relatedTo: {
        type: "opportunity",
        name: "Cloud Infrastructure Setup",
        company: "Business Solutions",
      },
      notes: "All terms agreed, waiting for final signature",
      reminder: null,
      completed: true,
      completedDate: "2024-02-10T13:45:00",
      starred: false,
      tags: ["contract", "negotiation"],
    },
    {
      id: 6,
      title: "Send welcome email",
      description: "Welcome email to new client Success Corp",
      type: "email",
      status: "completed",
      priority: "medium",
      dueDate: "2024-02-08T10:00:00",
      createdDate: "2024-01-07T09:00:00",
      assignedTo: "Priya Singh",
      relatedTo: {
        type: "contact",
        name: "Deepak Joshi",
        company: "Success Corp",
      },
      notes: "Include onboarding materials and next steps",
      reminder: null,
      completed: true,
      completedDate: "2024-02-08T09:30:00",
      starred: false,
      tags: ["welcome", "onboarding"],
    },
    {
      id: 7,
      title: "Team meeting for Corporate Inc project",
      description: "Internal team sync for CRM implementation project",
      type: "meeting",
      status: "pending",
      priority: "low",
      dueDate: "2024-02-17T15:00:00",
      createdDate: "2024-01-16T11:00:00",
      assignedTo: "Amit Kumar",
      relatedTo: {
        type: "opportunity",
        name: "CRM Implementation",
        company: "Corporate Inc",
      },
      notes: "Discuss resource allocation and timeline",
      reminder: "2024-02-17T14:30:00",
      completed: false,
      starred: false,
      tags: ["meeting", "internal"],
    },
    {
      id: 8,
      title: "Update client database",
      description: "Clean up and update client information in CRM",
      type: "task",
      status: "in-progress",
      priority: "low",
      dueDate: "2024-02-20T17:00:00",
      createdDate: "2024-01-18T13:20:00",
      assignedTo: "Neha Agarwal",
      relatedTo: {
        type: null,
        name: null,
        company: null,
      },
      notes: "Focus on updating contact information and adding new tags",
      reminder: null,
      completed: false,
      starred: false,
      tags: ["database", "cleanup"],
    },
  ])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    type: "task",
    status: "pending",
    priority: "medium",
    dueDate: new Date().toISOString().split(".")[0],
    assignedTo: "",
    relatedTo: {
      type: null,
      name: "",
      company: "",
    },
    notes: "",
    reminder: null,
    tags: [],
  })

  // Filter and sort tasks
  const filteredAndSortedTasks = useMemo(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.relatedTo.name && task.relatedTo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (task.relatedTo.company && task.relatedTo.company.toLowerCase().includes(searchTerm.toLowerCase())) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
      const matchesType = selectedType === "all" || task.type === selectedType
      const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority
      const matchesAssignee = selectedAssignee === "all" || task.assignedTo === selectedAssignee

      return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesAssignee
    })

    // Sort tasks
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase()
          bValue = b.title.toLowerCase()
          break
        case "dueDate":
          aValue = new Date(a.dueDate)
          bValue = new Date(b.dueDate)
          break
        case "priority":
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          aValue = priorityOrder[a.priority]
          bValue = priorityOrder[b.priority]
          break
        case "status":
          aValue = a.status
          bValue = b.status
          break
        case "assignedTo":
          aValue = a.assignedTo.toLowerCase()
          bValue = b.assignedTo.toLowerCase()
          break
        default:
          aValue = a.createdDate
          bValue = b.createdDate
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      }
    })

    return filtered
  }, [tasks, searchTerm, selectedStatus, selectedType, selectedPriority, selectedAssignee, sortBy, sortOrder])

  // Group tasks by status for Kanban view
  const tasksByStatus = useMemo(
    () => ({
      pending: filteredAndSortedTasks.filter((task) => task.status === "pending"),
      "in-progress": filteredAndSortedTasks.filter((task) => task.status === "in-progress"),
      completed: filteredAndSortedTasks.filter((task) => task.status === "completed"),
    }),
    [filteredAndSortedTasks],
  )

  // Group tasks by date for Calendar view
  const getTasksByDate = useCallback(
    (date) => {
      const dateStr = date.toISOString().split("T")[0]
      return filteredAndSortedTasks.filter((task) => task.dueDate.startsWith(dateStr))
    },
    [filteredAndSortedTasks],
  )

  // Task statistics
  const taskStats = useMemo(() => {
    const today = new Date().toISOString().split("T")[0]
    return {
      pending: tasks.filter((task) => task.status === "pending").length,
      overdue: tasks.filter(
        (task) => !task.completed && new Date(task.dueDate) < new Date() && task.status !== "completed",
      ).length,
      completed: tasks.filter((task) => task.status === "completed").length,
      today: tasks.filter((task) => task.dueDate.startsWith(today) && task.status !== "completed").length,
    }
  }, [tasks])

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setEditingTask({ ...task })
    setIsTaskDetailOpen(true)
  }

  const handleAddTask = async () => {
    if (!newTask.title) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const task = {
      id: Date.now(),
      ...newTask,
      createdDate: new Date().toISOString(),
      completed: false,
      starred: false,
      tags: newTask.tags || [],
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      type: "task",
      status: "pending",
      priority: "medium",
      dueDate: new Date().toISOString().split(".")[0],
      assignedTo: "",
      relatedTo: {
        type: null,
        name: "",
        company: "",
      },
      notes: "",
      reminder: null,
      tags: [],
    })
    setIsAddTaskOpen(false)
    setIsLoading(false)
  }

  const handleSaveTask = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
    setIsTaskDetailOpen(false)
    setIsLoading(false)
  }

  const handleDeleteTask = async (taskId) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    setTasks(tasks.filter((task) => task.id !== taskId))
    setIsTaskDetailOpen(false)
    setIsLoading(false)
  }

  const handleCompleteTask = async (taskId) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "completed",
              completed: true,
              completedDate: new Date().toISOString(),
            }
          : task,
      ),
    )
    setIsLoading(false)
  }

  const handleSelectTask = (taskId) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const handleSelectAllTasks = (checked) => {
    if (checked) {
      setSelectedTasks(filteredAndSortedTasks.map((task) => task.id))
    } else {
      setSelectedTasks([])
    }
  }

  const handleBulkDelete = async () => {
    if (selectedTasks.length === 0) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)))
    setSelectedTasks([])
    setIsLoading(false)
  }

  const handleBulkComplete = async () => {
    if (selectedTasks.length === 0) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setTasks(
      tasks.map((task) =>
        selectedTasks.includes(task.id)
          ? {
              ...task,
              status: "completed",
              completed: true,
              completedDate: new Date().toISOString(),
            }
          : task,
      ),
    )
    setSelectedTasks([])
    setIsLoading(false)
  }

  const handleStarTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, starred: !task.starred } : task)))
  }

  const handleDuplicateTask = (task) => {
    const duplicatedTask = {
      ...task,
      id: Date.now(),
      title: `${task.title} (Copy)`,
      createdDate: new Date().toISOString(),
      completed: false,
      completedDate: null,
      status: "pending",
    }
    setTasks([...tasks, duplicatedTask])
  }

  const handleExportTasks = () => {
    const csvContent = [
      ["Title", "Description", "Type", "Status", "Priority", "Due Date", "Assigned To", "Company"],
      ...filteredAndSortedTasks.map((task) => [
        task.title,
        task.description,
        task.type,
        task.status,
        task.priority,
        task.dueDate,
        task.assignedTo,
        task.relatedTo.company || "",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "tasks.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setSelectedStatus("all")
    setSelectedType("all")
    setSelectedPriority("all")
    setSelectedAssignee("all")
  }

  const getTypeIcon = (type) => {
    const icons = {
      call: <Phone className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      meeting: <Users className="w-4 h-4" />,
      task: <CheckSquare className="w-4 h-4" />,
      note: <FileText className="w-4 h-4" />,
      message: <MessageSquare className="w-4 h-4" />,
      coffee: <Coffee className="w-4 h-4" />,
    }
    return icons[type] || <CheckSquare className="w-4 h-4" />
  }

  const getTypeColor = (type) => {
    const colors = {
      call: "bg-blue-100 text-blue-800",
      email: "bg-purple-100 text-purple-800",
      meeting: "bg-yellow-100 text-yellow-800",
      task: "bg-gray-100 text-gray-800",
      note: "bg-green-100 text-green-800",
      message: "bg-pink-100 text-pink-800",
      coffee: "bg-orange-100 text-orange-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }
    return colors[priority] || "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getStatusBgColor = (status) => {
    const colors = {
      pending: "bg-yellow-50",
      "in-progress": "bg-blue-50",
      completed: "bg-green-50",
    }
    return colors[status] || "bg-gray-50"
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const isOverdue = (dueDate, completed = false) => {
    return new Date(dueDate) < new Date() && !completed
  }

  // Generate calendar days
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setSelectedDate(new Date())
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks & Activities</h1>
              <p className="text-gray-600 mt-1">Manage your tasks, calls, meetings, and follow-ups</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExportTasks}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{taskStats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">{taskStats.overdue}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{taskStats.completed}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <CalendarDays className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Today's Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{taskStats.today}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent flex items-center gap-2 ${
                    showFilters ? "bg-blue-50 border-blue-300" : ""
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>

                {(searchTerm ||
                  selectedStatus !== "all" ||
                  selectedType !== "all" ||
                  selectedPriority !== "all" ||
                  selectedAssignee !== "all") && (
                  <button onClick={clearAllFilters} className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800">
                    Clear all
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                {selectedTasks.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{selectedTasks.length} selected</span>
                    <button
                      onClick={handleBulkDelete}
                      disabled={isLoading}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200 disabled:opacity-50"
                    >
                      {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Delete"}
                    </button>
                    <button
                      onClick={handleBulkComplete}
                      disabled={isLoading}
                      className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200 disabled:opacity-50"
                    >
                      {isLoading ? <RefreshCw className="w-3 h-3 animate-spin" /> : "Complete"}
                    </button>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="title">Sort by Title</option>
                    <option value="priority">Sort by Priority</option>
                    <option value="status">Sort by Status</option>
                    <option value="assignedTo">Sort by Assignee</option>
                  </select>

                  <button
                    onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                    className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    {sortOrder === "asc" ? "↑" : "↓"}
                  </button>
                </div>

                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                  >
                    <ListIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`p-2 ${viewMode === "calendar" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("kanban")}
                    className={`p-2 ${viewMode === "kanban" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                  >
                    <Columns className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="task">Task</option>
                      <option value="call">Call</option>
                      <option value="meeting">Meeting</option>
                      <option value="email">Email</option>
                      <option value="note">Note</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Priorities</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                    <select
                      value={selectedAssignee}
                      onChange={(e) => setSelectedAssignee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Assignees</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* List View */}
          {viewMode === "list" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={
                            selectedTasks.length === filteredAndSortedTasks.length && filteredAndSortedTasks.length > 0
                          }
                          onChange={(e) => handleSelectAllTasks(e.target.checked)}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Task
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredAndSortedTasks.map((task) => (
                      <tr
                        key={task.id}
                        className={`hover:bg-gray-50 ${
                          isOverdue(task.dueDate, task.completed) ? "bg-red-50" : ""
                        } ${task.starred ? "bg-yellow-50" : ""}`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedTasks.includes(task.id)}
                            onChange={() => handleSelectTask(task.id)}
                            className="rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleStarTask(task.id)}
                                className={`${task.starred ? "text-yellow-500" : "text-gray-300"} hover:text-yellow-500`}
                              >
                                <Star className="w-4 h-4" fill={task.starred ? "currentColor" : "none"} />
                              </button>
                              <div
                                className={`p-2 rounded-lg ${getTypeColor(task.type)} flex items-center justify-center`}
                              >
                                {getTypeIcon(task.type)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div
                                className={`font-medium text-gray-900 ${
                                  task.completed ? "line-through text-gray-500" : ""
                                }`}
                              >
                                {task.title}
                              </div>
                              <div className="text-sm text-gray-500 line-clamp-1">{task.description}</div>
                              {task.relatedTo.name && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {task.relatedTo.type === "contact" ? "Contact: " : "Opportunity: "}
                                  <span className="font-medium">{task.relatedTo.name}</span>
                                  {task.relatedTo.company && ` (${task.relatedTo.company})`}
                                </div>
                              )}
                              {task.tags.length > 0 && (
                                <div className="flex gap-1 mt-1">
                                  {task.tags.slice(0, 2).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {task.tags.length > 2 && (
                                    <span className="text-xs text-gray-500">+{task.tags.length - 2}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`text-sm ${
                              isOverdue(task.dueDate, task.completed) ? "text-red-600 font-medium" : "text-gray-900"
                            }`}
                          >
                            {formatDate(task.dueDate)}
                          </div>
                          <div className="text-xs text-gray-500">{formatTime(task.dueDate)}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(task.type)} capitalize`}>
                            {task.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)} capitalize`}
                          >
                            {task.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(task.status)} capitalize`}>
                            {task.status.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                              {task.assignedTo
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm text-gray-900">{task.assignedTo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {!task.completed && (
                              <button
                                onClick={() => handleCompleteTask(task.id)}
                                disabled={isLoading}
                                className="text-green-600 hover:text-green-700 disabled:opacity-50"
                                title="Mark as Complete"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleTaskClick(task)}
                              className="text-blue-600 hover:text-blue-700"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <div className="relative group">
                              <button className="text-gray-600 hover:text-gray-700" title="More Actions">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                                <button
                                  onClick={() => handleDuplicateTask(task)}
                                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                >
                                  <Copy className="w-4 h-4" />
                                  Duplicate
                                </button>
                                <button
                                  onClick={() => handleDeleteTask(task.id)}
                                  disabled={isLoading}
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 disabled:opacity-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredAndSortedTasks.length === 0 && (
                  <div className="text-center py-12">
                    <CheckSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Calendar View */}
          {viewMode === "calendar" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={goToToday}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Today
                  </button>
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    title="Previous Month"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    title="Next Month"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-gray-600 py-2">
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[120px] border border-gray-200 p-2 ${
                      day
                        ? day.toDateString() === new Date().toDateString()
                          ? "bg-blue-50 border-blue-200"
                          : "hover:bg-gray-50"
                        : "bg-gray-100"
                    }`}
                  >
                    {day && (
                      <>
                        <div className="text-right text-sm text-gray-600 mb-2">{day.getDate()}</div>
                        <div className="space-y-1">
                          {getTasksByDate(day)
                            .slice(0, 3)
                            .map((task) => (
                              <div
                                key={task.id}
                                onClick={() => handleTaskClick(task)}
                                className={`text-xs p-1 rounded truncate cursor-pointer ${
                                  task.completed
                                    ? "bg-gray-100 text-gray-500 line-through"
                                    : getStatusBgColor(task.status)
                                } ${isOverdue(task.dueDate, task.completed) ? "border-l-2 border-red-500" : ""}`}
                              >
                                <div className="flex items-center gap-1">
                                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                                  <span>{formatTime(task.dueDate)}</span>
                                  {task.starred && <Star className="w-2 h-2 text-yellow-500" fill="currentColor" />}
                                </div>
                                <div className="truncate">{task.title}</div>
                              </div>
                            ))}
                          {getTasksByDate(day).length > 3 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{getTasksByDate(day).length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Kanban View */}
          {viewMode === "kanban" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div key={status} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className={`p-4 ${getStatusBgColor(status)} rounded-t-lg border-b border-gray-200`}>
                    <h3 className="font-semibold text-gray-900 capitalize">{status.replace("-", " ")}</h3>
                    <p className="text-sm text-gray-600">{statusTasks.length} tasks</p>
                  </div>

                  <div className="p-4 space-y-3 min-h-[400px] max-h-[600px] overflow-y-auto">
                    {statusTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleTaskClick(task)}
                        className={`bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer ${
                          isOverdue(task.dueDate, task.completed) ? "border-red-200 bg-red-50" : ""
                        } ${task.starred ? "border-yellow-200 bg-yellow-50" : ""}`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${getTypeColor(task.type)}`}>{getTypeIcon(task.type)}</div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 line-clamp-2">{task.title}</h4>
                              {task.starred && <Star className="w-3 h-3 text-yellow-500 mt-1" fill="currentColor" />}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span className={isOverdue(task.dueDate, task.completed) ? "text-red-600 font-medium" : ""}>
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{task.assignedTo.split(" ")[0]}</span>
                          </div>
                        </div>

                        {task.tags.length > 0 && (
                          <div className="flex gap-1 mb-2">
                            {task.tags.slice(0, 2).map((tag, index) => (
                              <span key={index} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {task.relatedTo.name && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              {task.relatedTo.type === "contact" ? (
                                <User className="w-3 h-3" />
                              ) : (
                                <Building className="w-3 h-3" />
                              )}
                              <span className="truncate">
                                {task.relatedTo.name}
                                {task.relatedTo.company && ` (${task.relatedTo.company})`}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            {!task.completed && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCompleteTask(task.id)
                                }}
                                disabled={isLoading}
                                className="text-green-600 hover:text-green-700 disabled:opacity-50"
                                title="Mark as Complete"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleStarTask(task.id)
                              }}
                              className={`${task.starred ? "text-yellow-500" : "text-gray-300"} hover:text-yellow-500`}
                              title="Star Task"
                            >
                              <Star className="w-4 h-4" fill={task.starred ? "currentColor" : "none"} />
                            </button>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteTask(task.id)
                            }}
                            disabled={isLoading}
                            className="text-red-600 hover:text-red-700 disabled:opacity-50"
                            title="Delete Task"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {statusTasks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <CheckSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No {status.replace("-", " ")} tasks</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Task Modal */}
        {isAddTaskOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add New Task</h2>
                <button onClick={() => setIsAddTaskOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter task title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter task description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newTask.type}
                      onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="task">Task</option>
                      <option value="call">Call</option>
                      <option value="meeting">Meeting</option>
                      <option value="email">Email</option>
                      <option value="note">Note</option>
                      <option value="message">Message</option>
                      <option value="coffee">Coffee</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time</label>
                    <input
                      type="datetime-local"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select team member</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      placeholder="Enter tags separated by commas"
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag)
                        setNewTask({ ...newTask, tags })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Set Reminder</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!newTask.reminder}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Set default reminder 15 minutes before due date
                            const dueDate = new Date(newTask.dueDate)
                            dueDate.setMinutes(dueDate.getMinutes() - 15)
                            setNewTask({ ...newTask, reminder: dueDate.toISOString().split(".")[0] })
                          } else {
                            setNewTask({ ...newTask, reminder: null })
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-600">Enable reminder</span>
                    </div>
                    {newTask.reminder && (
                      <input
                        type="datetime-local"
                        value={newTask.reminder}
                        onChange={(e) => setNewTask({ ...newTask, reminder: e.target.value })}
                        className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Related To</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <select
                      value={newTask.relatedTo.type || ""}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          relatedTo: { ...newTask.relatedTo, type: e.target.value || null },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Not related</option>
                      <option value="contact">Contact</option>
                      <option value="opportunity">Opportunity</option>
                    </select>
                  </div>
                  {newTask.relatedTo.type && (
                    <div>
                      <input
                        type="text"
                        placeholder={`${newTask.relatedTo.type === "contact" ? "Contact" : "Opportunity"} name`}
                        value={newTask.relatedTo.name || ""}
                        onChange={(e) =>
                          setNewTask({
                            ...newTask,
                            relatedTo: { ...newTask.relatedTo, name: e.target.value },
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
                {newTask.relatedTo.type && (
                  <div className="mt-2">
                    <input
                      type="text"
                      placeholder="Company name"
                      value={newTask.relatedTo.company || ""}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          relatedTo: { ...newTask.relatedTo, company: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newTask.notes}
                  onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add any additional notes"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsAddTaskOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  disabled={!newTask.title || isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  {isLoading ? "Adding..." : "Add Task"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Task Detail Modal */}
        {isTaskDetailOpen && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold">Task Details</h2>
                  {selectedTask.starred && <Star className="w-5 h-5 text-yellow-500" fill="currentColor" />}
                </div>
                <button onClick={() => setIsTaskDetailOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editingTask.title || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={editingTask.type || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="task">Task</option>
                        <option value="call">Call</option>
                        <option value="meeting">Meeting</option>
                        <option value="email">Email</option>
                        <option value="note">Note</option>
                        <option value="message">Message</option>
                        <option value="coffee">Coffee</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date & Time</label>
                      <input
                        type="datetime-local"
                        value={editingTask.dueDate?.split(".")[0] || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, dueDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        value={editingTask.status || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={editingTask.priority || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                      <select
                        value={editingTask.assignedTo || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, assignedTo: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select team member</option>
                        {teamMembers.map((member) => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editingTask.description || ""}
                      onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                    <input
                      type="text"
                      value={editingTask.tags?.join(", ") || ""}
                      onChange={(e) => {
                        const tags = e.target.value
                          .split(",")
                          .map((tag) => tag.trim())
                          .filter((tag) => tag)
                        setEditingTask({ ...editingTask, tags })
                      }}
                      placeholder="Enter tags separated by commas"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={editingTask.notes || ""}
                      onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Related To</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <select
                          value={editingTask.relatedTo?.type || ""}
                          onChange={(e) =>
                            setEditingTask({
                              ...editingTask,
                              relatedTo: { ...editingTask.relatedTo, type: e.target.value || null },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Not related</option>
                          <option value="contact">Contact</option>
                          <option value="opportunity">Opportunity</option>
                        </select>
                      </div>
                      {editingTask.relatedTo?.type && (
                        <div>
                          <input
                            type="text"
                            placeholder={`${editingTask.relatedTo.type === "contact" ? "Contact" : "Opportunity"} name`}
                            value={editingTask.relatedTo.name || ""}
                            onChange={(e) =>
                              setEditingTask({
                                ...editingTask,
                                relatedTo: { ...editingTask.relatedTo, name: e.target.value },
                              })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}
                    </div>
                    {editingTask.relatedTo?.type && (
                      <div className="mt-2">
                        <input
                          type="text"
                          placeholder="Company name"
                          value={editingTask.relatedTo.company || ""}
                          onChange={(e) =>
                            setEditingTask({
                              ...editingTask,
                              relatedTo: { ...editingTask.relatedTo, company: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Task Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Task Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">{formatDate(selectedTask.createdDate)}</span>
                      </div>
                      {selectedTask.completed && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium">{formatDate(selectedTask.completedDate)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium capitalize`}>{selectedTask.status.replace("-", " ")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <span className={`font-medium capitalize`}>{selectedTask.priority}</span>
                      </div>
                      {isOverdue(selectedTask.dueDate, selectedTask.completed) && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <span className="font-medium text-red-600">Overdue</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Related To */}
                  {selectedTask.relatedTo.name && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Related To</h4>
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedTask.relatedTo.type === "contact" ? "bg-blue-100" : "bg-purple-100"
                          }`}
                        >
                          {selectedTask.relatedTo.type === "contact" ? (
                            <User className="w-4 h-4 text-blue-700" />
                          ) : (
                            <Building className="w-4 h-4 text-purple-700" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedTask.relatedTo.name}</p>
                          <p className="text-sm text-gray-600">
                            {selectedTask.relatedTo.type === "contact" ? "Contact" : "Opportunity"}
                          </p>
                          {selectedTask.relatedTo.company && (
                            <p className="text-sm text-gray-600 mt-1">{selectedTask.relatedTo.company}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedTask.tags && selectedTask.tags.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTask.tags.map((tag, index) => (
                          <span key={index} className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Reminder */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Reminder</h4>
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={!!editingTask.reminder}
                        onChange={(e) => {
                          if (e.target.checked) {
                            // Set default reminder 15 minutes before due date
                            const dueDate = new Date(editingTask.dueDate)
                            dueDate.setMinutes(dueDate.getMinutes() - 15)
                            setEditingTask({ ...editingTask, reminder: dueDate.toISOString().split(".")[0] })
                          } else {
                            setEditingTask({ ...editingTask, reminder: null })
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-600">Enable reminder</span>
                    </div>
                    {editingTask.reminder && (
                      <input
                        type="datetime-local"
                        value={editingTask.reminder?.split(".")[0] || ""}
                        onChange={(e) => setEditingTask({ ...editingTask, reminder: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    {!selectedTask.completed && (
                      <button
                        onClick={() => {
                          handleCompleteTask(selectedTask.id)
                          setEditingTask({ ...editingTask, status: "completed", completed: true })
                        }}
                        disabled={isLoading}
                        className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
                      >
                        <Check className="w-4 h-4" />
                        Mark as Complete
                      </button>
                    )}
                    <button
                      onClick={() => handleStarTask(selectedTask.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg ${
                        selectedTask.starred
                          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Star className="w-4 h-4" fill={selectedTask.starred ? "currentColor" : "none"} />
                      {selectedTask.starred ? "Remove Star" : "Add Star"}
                    </button>
                    <button
                      onClick={() => handleDuplicateTask(selectedTask)}
                      className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      <Copy className="w-4 h-4" />
                      Duplicate Task
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                      <Archive className="w-4 h-4" />
                      Archive Task
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteTask(selectedTask.id)}
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsTaskDetailOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTask}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : null}
                    {isLoading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks
