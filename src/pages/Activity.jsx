"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Download,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Users,
  FileText,
  MessageSquare,
  Coffee,
  CheckSquare,
  Eye,
  Edit,
  Plus,
  Building,
  TrendingUp,
  Activity,
  BarChart3,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  XCircle,
  Info,
} from "lucide-react"

const ActivityLogsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedDateRange, setSelectedDateRange] = useState("7days")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState("timeline") // timeline, analytics, summary
  const [expandedActivity, setExpandedActivity] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  // Sample team members
  const teamMembers = [
    { id: 1, name: "Priya Singh", avatar: "PS", role: "Sales Manager" },
    { id: 2, name: "Amit Kumar", avatar: "AK", role: "Sales Rep" },
    { id: 3, name: "Neha Agarwal", avatar: "NA", role: "Sales Rep" },
    { id: 4, name: "Rohit Verma", avatar: "RV", role: "Account Manager" },
    { id: 5, name: "Kavya Sharma", avatar: "KS", role: "Sales Rep" },
    { id: 6, name: "System", avatar: "SY", role: "Automated" },
  ]

  // Sample activity data
  const [activities] = useState([
    {
      id: 1,
      type: "call",
      action: "Completed call",
      description: "Follow-up call with Rajesh Kumar regarding enterprise software proposal",
      user: "Priya Singh",
      timestamp: "2024-02-15T14:30:00",
      duration: "25 minutes",
      relatedTo: {
        type: "contact",
        name: "Rajesh Kumar",
        company: "Tech Solutions Pvt Ltd",
        id: "C001",
      },
      status: "completed",
      outcome: "Positive - Moving to proposal stage",
      nextAction: "Send detailed proposal by Feb 18",
      metadata: {
        callQuality: "Excellent",
        customerSentiment: "Positive",
        dealValue: "₹15,00,000",
      },
    },
    {
      id: 2,
      type: "email",
      action: "Sent email",
      description: "Proposal sent to Digital Corp for digital marketing campaign",
      user: "Amit Kumar",
      timestamp: "2024-02-15T11:45:00",
      relatedTo: {
        type: "opportunity",
        name: "Digital Marketing Campaign",
        company: "Digital Corp",
        id: "O002",
      },
      status: "sent",
      outcome: "Email delivered successfully",
      metadata: {
        subject: "Digital Marketing Proposal - Digital Corp",
        attachments: 3,
        emailSize: "2.5 MB",
      },
    },
    {
      id: 3,
      type: "meeting",
      action: "Scheduled meeting",
      description: "Product demo scheduled with StartupXYZ team",
      user: "Neha Agarwal",
      timestamp: "2024-02-15T09:20:00",
      duration: "60 minutes",
      relatedTo: {
        type: "opportunity",
        name: "CRM Implementation",
        company: "StartupXYZ",
        id: "O003",
      },
      status: "scheduled",
      outcome: "Meeting confirmed for Feb 16, 11:00 AM",
      metadata: {
        meetingType: "Product Demo",
        attendees: 4,
        location: "Virtual - Zoom",
      },
    },
    {
      id: 4,
      type: "task",
      action: "Created task",
      description: "Prepare quarterly business review presentation",
      user: "Rohit Verma",
      timestamp: "2024-02-15T08:15:00",
      relatedTo: {
        type: "contact",
        name: "Manoj Singh",
        company: "Enterprise Ltd",
        id: "C004",
      },
      status: "pending",
      outcome: "Task assigned and due date set",
      metadata: {
        priority: "High",
        dueDate: "2024-02-18",
        estimatedHours: 4,
      },
    },
    {
      id: 5,
      type: "note",
      action: "Added note",
      description: "Customer feedback on current CRM implementation",
      user: "Kavya Sharma",
      timestamp: "2024-02-14T16:30:00",
      relatedTo: {
        type: "contact",
        name: "Deepak Joshi",
        company: "Success Corp",
        id: "C005",
      },
      status: "completed",
      outcome: "Positive feedback documented",
      metadata: {
        sentiment: "Positive",
        category: "Product Feedback",
        tags: ["implementation", "satisfaction"],
      },
    },
    {
      id: 6,
      type: "lead",
      action: "Lead created",
      description: "New lead from website contact form",
      user: "System",
      timestamp: "2024-02-14T14:22:00",
      relatedTo: {
        type: "lead",
        name: "Innovative Solutions",
        company: "Innovative Solutions Pvt Ltd",
        id: "L006",
      },
      status: "new",
      outcome: "Lead automatically assigned to Priya Singh",
      metadata: {
        source: "Website",
        leadScore: 75,
        industry: "Technology",
      },
    },
    {
      id: 7,
      type: "opportunity",
      action: "Opportunity updated",
      description: "Deal value updated for Corporate Inc CRM project",
      user: "Amit Kumar",
      timestamp: "2024-02-14T12:10:00",
      relatedTo: {
        type: "opportunity",
        name: "CRM Implementation",
        company: "Corporate Inc",
        id: "O007",
      },
      status: "updated",
      outcome: "Deal value increased from ₹8L to ₹12L",
      metadata: {
        previousValue: "₹8,00,000",
        newValue: "₹12,00,000",
        stage: "Negotiation",
      },
    },
    {
      id: 8,
      type: "call",
      action: "Missed call",
      description: "Attempted call to Business Solutions - no answer",
      user: "Neha Agarwal",
      timestamp: "2024-02-14T10:45:00",
      relatedTo: {
        type: "contact",
        name: "Suresh Patel",
        company: "Business Solutions",
        id: "C008",
      },
      status: "failed",
      outcome: "Left voicemail, will retry tomorrow",
      metadata: {
        attempts: 2,
        voicemailLeft: true,
        nextAttempt: "2024-02-15T10:00:00",
      },
    },
    {
      id: 9,
      type: "email",
      action: "Email opened",
      description: "Proposal email opened by client",
      user: "System",
      timestamp: "2024-02-14T09:30:00",
      relatedTo: {
        type: "opportunity",
        name: "Cloud Infrastructure",
        company: "Tech Innovators",
        id: "O009",
      },
      status: "opened",
      outcome: "Client engagement detected",
      metadata: {
        openCount: 3,
        timeSpent: "5 minutes",
        linksClicked: 2,
      },
    },
    {
      id: 10,
      type: "meeting",
      action: "Meeting completed",
      description: "Contract negotiation meeting with Enterprise Solutions",
      user: "Rohit Verma",
      timestamp: "2024-02-13T15:00:00",
      duration: "90 minutes",
      relatedTo: {
        type: "opportunity",
        name: "Enterprise Software License",
        company: "Enterprise Solutions",
        id: "O010",
      },
      status: "completed",
      outcome: "Terms agreed, contract to be signed next week",
      metadata: {
        attendees: 6,
        contractValue: "₹25,00,000",
        nextStep: "Legal review",
      },
    },
  ])

  // Filter activities based on search and filters
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (activity.relatedTo.name && activity.relatedTo.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (activity.relatedTo.company && activity.relatedTo.company.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesUser = selectedUser === "all" || activity.user === selectedUser
    const matchesType = selectedType === "all" || activity.type === selectedType
    const matchesStatus = selectedStatus === "all" || activity.status === selectedStatus

    // Date range filtering
    const activityDate = new Date(activity.timestamp)
    const now = new Date()
    let matchesDate = true

    switch (selectedDateRange) {
      case "today":
        matchesDate = activityDate.toDateString() === now.toDateString()
        break
      case "7days":
        matchesDate = activityDate >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      case "30days":
        matchesDate = activityDate >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        break
      case "90days":
        matchesDate = activityDate >= new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000)
        break
      default:
        matchesDate = true
    }

    return matchesSearch && matchesUser && matchesType && matchesStatus && matchesDate
  })

  // Activity analytics
  const getActivityStats = () => {
    const totalActivities = filteredActivities.length
    const completedActivities = filteredActivities.filter((a) => a.status === "completed").length
    const pendingActivities = filteredActivities.filter((a) => a.status === "pending").length
    const failedActivities = filteredActivities.filter((a) => a.status === "failed").length

    const activityByType = filteredActivities.reduce((acc, activity) => {
      acc[activity.type] = (acc[activity.type] || 0) + 1
      return acc
    }, {})

    const activityByUser = filteredActivities.reduce((acc, activity) => {
      acc[activity.user] = (acc[activity.user] || 0) + 1
      return acc
    }, {})

    return {
      totalActivities,
      completedActivities,
      pendingActivities,
      failedActivities,
      activityByType,
      activityByUser,
      completionRate: totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0,
    }
  }

  const stats = getActivityStats()

  const getTypeIcon = (type) => {
    const icons = {
      call: <Phone className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      meeting: <Users className="w-4 h-4" />,
      task: <CheckSquare className="w-4 h-4" />,
      note: <FileText className="w-4 h-4" />,
      message: <MessageSquare className="w-4 h-4" />,
      lead: <User className="w-4 h-4" />,
      opportunity: <Building className="w-4 h-4" />,
      coffee: <Coffee className="w-4 h-4" />,
    }
    return icons[type] || <Activity className="w-4 h-4" />
  }

  const getTypeColor = (type) => {
    const colors = {
      call: "bg-blue-100 text-blue-800",
      email: "bg-purple-100 text-purple-800",
      meeting: "bg-yellow-100 text-yellow-800",
      task: "bg-gray-100 text-gray-800",
      note: "bg-green-100 text-green-800",
      message: "bg-pink-100 text-pink-800",
      lead: "bg-indigo-100 text-indigo-800",
      opportunity: "bg-orange-100 text-orange-800",
      coffee: "bg-amber-100 text-amber-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const getStatusIcon = (status) => {
    const icons = {
      completed: <CheckCircle className="w-4 h-4 text-green-600" />,
      pending: <Clock className="w-4 h-4 text-yellow-600" />,
      failed: <XCircle className="w-4 h-4 text-red-600" />,
      scheduled: <Calendar className="w-4 h-4 text-blue-600" />,
      sent: <CheckCircle className="w-4 h-4 text-green-600" />,
      opened: <Eye className="w-4 h-4 text-blue-600" />,
      new: <Plus className="w-4 h-4 text-purple-600" />,
      updated: <Edit className="w-4 h-4 text-orange-600" />,
    }
    return icons[status] || <Info className="w-4 h-4 text-gray-600" />
  }

  const getStatusColor = (status) => {
    const colors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
      scheduled: "bg-blue-100 text-blue-800",
      sent: "bg-green-100 text-green-800",
      opened: "bg-blue-100 text-blue-800",
      new: "bg-purple-100 text-purple-800",
      updated: "bg-orange-100 text-orange-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
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

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60))
      return `${diffInMinutes} minutes ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`
    } else if (diffInHours < 48) {
      return "Yesterday"
    } else {
      return formatDate(dateString)
    }
  }

  const exportActivities = () => {
    // In a real app, this would generate and download a CSV/Excel file
    console.log("Exporting activities:", filteredActivities)
    alert("Activity report exported successfully!")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
              <p className="text-gray-600 mt-1">Track and analyze all team activities and interactions</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportActivities}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="bg-[#ef6d8d] hover:bg-[#ff3466] text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Activities</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completedActivities}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pendingActivities}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
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
                    placeholder="Search activities..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="sm:w-80 w-[100%] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                  {showFilters ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode("timeline")}
                    className={`px-3 py-2 text-sm ${viewMode === "timeline" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                  >
                    Timeline
                  </button>
                  <button
                    onClick={() => setViewMode("analytics")}
                    className={`px-3 py-2 text-sm ${viewMode === "analytics" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => setViewMode("summary")}
                    className={`px-3 py-2 text-sm ${viewMode === "summary" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                  >
                    Summary
                  </button>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                    <select
                      value={selectedUser}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Users</option>
                      {teamMembers.map((member) => (
                        <option key={member.id} value={member.name}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Activity Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Types</option>
                      <option value="call">Calls</option>
                      <option value="email">Emails</option>
                      <option value="meeting">Meetings</option>
                      <option value="task">Tasks</option>
                      <option value="note">Notes</option>
                      <option value="lead">Leads</option>
                      <option value="opportunity">Opportunities</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                    <select
                      value={selectedDateRange}
                      onChange={(e) => setSelectedDateRange(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="today">Today</option>
                      <option value="7days">Last 7 Days</option>
                      <option value="30days">Last 30 Days</option>
                      <option value="90days">Last 90 Days</option>
                      <option value="all">All Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Timeline View */}
          {viewMode === "timeline" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Timeline</h3>
                <div className="space-y-4">
                  {filteredActivities.map((activity) => (
                    <div key={activity.id} className="border-l-4 border-blue-200 pl-4 pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${getTypeColor(activity.type)} flex items-center justify-center`}
                          >
                            {getTypeIcon(activity.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-gray-900">{activity.action}</h4>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${getTypeColor(activity.type)} capitalize`}
                              >
                                {activity.type}
                              </span>
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)} capitalize flex items-center gap-1`}
                              >
                                {getStatusIcon(activity.status)}
                                {activity.status}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{activity.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span>{activity.user}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                <span>{formatDateTime(activity.timestamp)}</span>
                              </div>
                              {activity.duration && (
                                <div className="flex items-center gap-1">
                                  <Activity className="w-3 h-3" />
                                  <span>{activity.duration}</span>
                                </div>
                              )}
                              {activity.relatedTo.name && (
                                <div className="flex items-center gap-1">
                                  <Building className="w-3 h-3" />
                                  <span>{activity.relatedTo.name}</span>
                                </div>
                              )}
                            </div>
                            {activity.outcome && (
                              <div className="mt-2 p-2 bg-gray-50 rounded text-sm text-gray-700">
                                <strong>Outcome:</strong> {activity.outcome}
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => setExpandedActivity(expandedActivity === activity.id ? null : activity.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          {expandedActivity === activity.id ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {expandedActivity === activity.id && (
                        <div className="mt-4 ml-11 p-4 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Activity Details</h5>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Date & Time:</span>
                                  <span className="font-medium">
                                    {formatDate(activity.timestamp)} at {formatTime(activity.timestamp)}
                                  </span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">User:</span>
                                  <span className="font-medium">{activity.user}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Status:</span>
                                  <span className="font-medium capitalize">{activity.status}</span>
                                </div>
                                {activity.duration && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Duration:</span>
                                    <span className="font-medium">{activity.duration}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Related Information</h5>
                              <div className="space-y-1 text-sm">
                                {activity.relatedTo.name && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Related To:</span>
                                    <span className="font-medium">{activity.relatedTo.name}</span>
                                  </div>
                                )}
                                {activity.relatedTo.company && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Company:</span>
                                    <span className="font-medium">{activity.relatedTo.company}</span>
                                  </div>
                                )}
                                {activity.relatedTo.id && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Record ID:</span>
                                    <span className="font-medium">{activity.relatedTo.id}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Metadata */}
                          {activity.metadata && (
                            <div className="mt-4">
                              <h5 className="font-medium text-gray-900 mb-2">Additional Information</h5>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                {Object.entries(activity.metadata).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                                    <span className="font-medium">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {activity.nextAction && (
                            <div className="mt-4 p-2 bg-blue-50 rounded text-sm">
                              <strong className="text-blue-800">Next Action:</strong>
                              <span className="text-blue-700 ml-1">{activity.nextAction}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Analytics View */}
          {viewMode === "analytics" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Activity by Type */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activities by Type</h3>
                <div className="space-y-3">
                  {Object.entries(stats.activityByType).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`p-1 rounded ${getTypeColor(type)}`}>{getTypeIcon(type)}</div>
                        <span className="capitalize font-medium">{type}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${(count / stats.totalActivities) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity by User */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Activities by User</h3>
                <div className="space-y-3">
                  {Object.entries(stats.activityByUser).map(([user, count]) => (
                    <div key={user} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          {user
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <span className="font-medium">{user}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${(count / stats.totalActivities) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Status Distribution */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(stats.completedActivities / stats.totalActivities) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{stats.completedActivities}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-yellow-600" />
                      <span>Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-600 h-2 rounded-full"
                          style={{ width: `${(stats.pendingActivities / stats.totalActivities) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{stats.pendingActivities}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span>Failed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{ width: `${(stats.failedActivities / stats.totalActivities) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{stats.failedActivities}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-green-600">Success Rate</p>
                      <p className="text-2xl font-bold text-green-700">{stats.completionRate}%</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-blue-600">Daily Average</p>
                      <p className="text-2xl font-bold text-blue-700">{Math.round(stats.totalActivities / 7)}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="text-sm text-purple-600">Most Active User</p>
                      <p className="text-lg font-bold text-purple-700">
                        {Object.entries(stats.activityByUser).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"}
                      </p>
                    </div>
                    <User className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Summary View */}
          {viewMode === "summary" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Summary</h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Activities */}
                <div className="lg:col-span-2">
                  <h4 className="font-medium text-gray-900 mb-4">Recent Activities</h4>
                  <div className="space-y-3">
                    {filteredActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded ${getTypeColor(activity.type)}`}>{getTypeIcon(activity.type)}</div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{activity.action}</p>
                          <p className="text-sm text-gray-600">
                            {activity.user} • {formatDateTime(activity.timestamp)}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">{getStatusIcon(activity.status)}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Quick Stats</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-600">Most Active Day</p>
                      <p className="font-bold text-blue-700">Today</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-green-600">Top Activity</p>
                      <p className="font-bold text-green-700 capitalize">
                        {Object.entries(stats.activityByType).sort(([, a], [, b]) => b - a)[0]?.[0] || "N/A"}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <p className="text-sm text-purple-600">Avg. per User</p>
                      <p className="font-bold text-purple-700">
                        {Math.round(stats.totalActivities / Object.keys(stats.activityByUser).length)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ActivityLogsPage
