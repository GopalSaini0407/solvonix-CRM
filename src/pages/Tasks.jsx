"use client"

import { useState } from "react"
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
  Edit,
  Bell,
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

  // Sample data for team members
  const teamMembers = [
    { id: 1, name: "Priya Singh", avatar: "PS" },
    { id: 2, name: "Amit Kumar", avatar: "AK" },
    { id: 3, name: "Neha Agarwal", avatar: "NA" },
    { id: 4, name: "Rohit Verma", avatar: "RV" },
    { id: 5, name: "Kavya Sharma", avatar: "KS" },
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
  })

  // Filter tasks based on search and filters
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.relatedTo.name && task.relatedTo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (task.relatedTo.company && task.relatedTo.company.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus = selectedStatus === "all" || task.status === selectedStatus
    const matchesType = selectedType === "all" || task.type === selectedType
    const matchesPriority = selectedPriority === "all" || task.priority === selectedPriority
    const matchesAssignee = selectedAssignee === "all" || task.assignedTo === selectedAssignee

    return matchesSearch && matchesStatus && matchesType && matchesPriority && matchesAssignee
  })

  // Group tasks by status for Kanban view
  const tasksByStatus = {
    pending: filteredTasks.filter((task) => task.status === "pending"),
    "in-progress": filteredTasks.filter((task) => task.status === "in-progress"),
    completed: filteredTasks.filter((task) => task.status === "completed"),
  }

  // Group tasks by date for Calendar view
  const getTasksByDate = (date) => {
    const dateStr = date.toISOString().split("T")[0]
    return filteredTasks.filter((task) => task.dueDate.startsWith(dateStr))
  }

  const handleTaskClick = (task) => {
    setSelectedTask(task)
    setEditingTask({ ...task })
    setIsTaskDetailOpen(true)
  }

  const handleAddTask = () => {
    if (!newTask.title) return

    const task = {
      id: Date.now(),
      ...newTask,
      createdDate: new Date().toISOString(),
      completed: false,
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
    })
    setIsAddTaskOpen(false)
  }

  const handleSaveTask = () => {
    setTasks(tasks.map((task) => (task.id === editingTask.id ? editingTask : task)))
    setIsTaskDetailOpen(false)
  }

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
    setIsTaskDetailOpen(false)
  }

  const handleCompleteTask = (taskId) => {
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
  }

  const handleSelectTask = (taskId) => {
    setSelectedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
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

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && !dueDate.includes("completed")
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tasks & Activities</h1>
              <p className="text-gray-600 mt-1">Manage your tasks, calls, meetings, and follow-ups</p>
            </div>
            <div className="flex items-center gap-3">
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
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter((task) => task.status === "pending").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <AlertCircle className="w-8 h-8 text-red-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Overdue</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      tasks.filter(
                        (task) => !task.completed && new Date(task.dueDate) < new Date() && task.status !== "completed",
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {tasks.filter((task) => task.status === "completed").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <CalendarDays className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Today's Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      tasks.filter(
                        (task) =>
                          task.dueDate.startsWith(new Date().toISOString().split("T")[0]) &&
                          task.status !== "completed",
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div className="flex items-center gap-4">
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
              <div className="flex items-center gap-2">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="task">Task</option>
                  <option value="call">Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="email">Email</option>
                  <option value="note">Note</option>
                </select>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {selectedTasks.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedTasks.length} selected</span>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">Delete</button>
                  <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                    Complete
                  </button>
                </div>
              )}
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
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTasks(filteredTasks.map((task) => task.id))
                            } else {
                              setSelectedTasks([])
                            }
                          }}
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
                    {filteredTasks.map((task) => (
                      <tr
                        key={task.id}
                        className={`hover:bg-gray-50 ${isOverdue(task.dueDate) && !task.completed ? "bg-red-50" : ""}`}
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
                            <div
                              className={`p-2 rounded-lg ${getTypeColor(task.type)} flex items-center justify-center`}
                            >
                              {getTypeIcon(task.type)}
                            </div>
                            <div>
                              <div
                                className={`font-medium text-gray-900 ${task.completed ? "line-through text-gray-500" : ""}`}
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
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`text-sm ${isOverdue(task.dueDate) && !task.completed ? "text-red-600 font-medium" : "text-gray-900"}`}
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
                                className="text-green-600 hover:text-green-700"
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
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-red-600 hover:text-red-700"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                        : "bg-gray-100"
                    }`}
                  >
                    {day && (
                      <>
                        <div className="text-right text-sm text-gray-600 mb-2">{day.getDate()}</div>
                        <div className="space-y-1">
                          {getTasksByDate(day).map((task) => (
                            <div
                              key={task.id}
                              onClick={() => handleTaskClick(task)}
                              className={`text-xs p-1 rounded truncate cursor-pointer ${
                                task.completed
                                  ? "bg-gray-100 text-gray-500 line-through"
                                  : getStatusBgColor(task.status)
                              }`}
                            >
                              <div className="flex items-center gap-1">
                                <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                                <span>{formatTime(task.dueDate)}</span>
                              </div>
                              <div className="truncate">{task.title}</div>
                            </div>
                          ))}
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

                  <div className="p-4 space-y-3 min-h-[400px]">
                    {statusTasks.map((task) => (
                      <div
                        key={task.id}
                        onClick={() => handleTaskClick(task)}
                        className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className={`p-2 rounded-lg ${getTypeColor(task.type)}`}>{getTypeIcon(task.type)}</div>
                            <h4 className="font-medium text-gray-900">{task.title}</h4>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>

                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span
                              className={isOverdue(task.dueDate) && !task.completed ? "text-red-600 font-medium" : ""}
                            >
                              {formatDate(task.dueDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{task.assignedTo}</span>
                          </div>
                        </div>

                        {task.relatedTo.name && (
                          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              {task.relatedTo.type === "contact" ? (
                                <User className="w-3 h-3" />
                              ) : (
                                <Building className="w-3 h-3" />
                              )}
                              <span>
                                {task.relatedTo.name}
                                {task.relatedTo.company && ` (${task.relatedTo.company})`}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
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
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsAddTaskOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Task
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
                <h2 className="text-xl font-semibold">Task Details</h2>
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={editingTask.notes || ""}
                      onChange={(e) => setEditingTask({ ...editingTask, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
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
                        className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        <Check className="w-4 h-4" />
                        Mark as Complete
                      </button>
                    )}
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      <Bell className="w-4 h-4" />
                      Set Reminder
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                      <Users className="w-4 h-4" />
                      Reassign Task
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteTask(selectedTask.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Task
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsTaskDetailOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTask}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
                  >
                    Save Changes
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

export default Tasks;