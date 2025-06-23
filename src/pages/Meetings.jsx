"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Calendar,
  Clock,
  Users,
  MapPin,
  Video,
  Phone,
  Trash2,
  X,
  CheckSquare,
  FileText,
  Link,
  Play,
  Download,
  Upload,
  User,
  Building,
  Repeat,
  Star,
  MessageSquare,
  Paperclip,
  CheckCircle,
} from "lucide-react"

const MeetingsPage = () => {
  const [viewMode, setViewMode] = useState("upcoming") // upcoming, past, all
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false)
  const [isMeetingDetailOpen, setIsMeetingDetailOpen] = useState(false)
  const [selectedMeeting, setSelectedMeeting] = useState(null)
  const [editingMeeting, setEditingMeeting] = useState({})
  const [activeTab, setActiveTab] = useState("details") // details, agenda, notes, recordings, actions

  // Sample meetings data
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: "Product Demo - StartupXYZ",
      description: "Demonstrate CRM features and capabilities to potential client",
      type: "video",
      status: "scheduled",
      startTime: "2024-02-16T11:00:00",
      endTime: "2024-02-16T12:00:00",
      location: "Zoom Meeting",
      meetingLink: "https://zoom.us/j/123456789",
      organizer: "Neha Agarwal",
      attendees: [
        { name: "Neha Agarwal", email: "neha@company.com", status: "accepted", role: "organizer" },
        { name: "Amit Kumar", email: "amit@company.com", status: "accepted", role: "presenter" },
        { name: "Rajesh Kumar", email: "rajesh@startupxyz.com", status: "pending", role: "attendee" },
        { name: "Priya Sharma", email: "priya@startupxyz.com", status: "accepted", role: "attendee" },
      ],
      relatedTo: {
        type: "opportunity",
        name: "CRM Implementation",
        company: "StartupXYZ",
      },
      agenda: [
        { id: 1, item: "Welcome and introductions", duration: 5, completed: false },
        { id: 2, item: "Company overview and needs assessment", duration: 10, completed: false },
        { id: 3, item: "CRM feature demonstration", duration: 30, completed: false },
        { id: 4, item: "Q&A session", duration: 10, completed: false },
        { id: 5, item: "Next steps and follow-up", duration: 5, completed: false },
      ],
      notes: "Focus on automation features and integration capabilities. Prepare demo environment with sample data.",
      actionItems: [
        { id: 1, task: "Send demo recording", assignee: "Neha Agarwal", dueDate: "2024-02-17", completed: false },
        { id: 2, task: "Prepare custom proposal", assignee: "Amit Kumar", dueDate: "2024-02-20", completed: false },
      ],
      recordings: [],
      documents: [
        { id: 1, name: "CRM Feature Overview.pdf", size: "2.5 MB", uploadedBy: "Neha Agarwal" },
        { id: 2, name: "Demo Script.docx", size: "1.2 MB", uploadedBy: "Amit Kumar" },
      ],
      priority: "high",
      recurring: false,
      reminder: "15",
      tags: ["demo", "sales", "crm"],
    },
    {
      id: 2,
      title: "Weekly Sales Review",
      description: "Review weekly sales performance and pipeline updates",
      type: "in-person",
      status: "completed",
      startTime: "2024-02-12T16:00:00",
      endTime: "2024-02-12T17:00:00",
      location: "Conference Room A",
      meetingLink: null,
      organizer: "Priya Singh",
      attendees: [
        { name: "Priya Singh", email: "priya@company.com", status: "accepted", role: "organizer" },
        { name: "Amit Kumar", email: "amit@company.com", status: "accepted", role: "attendee" },
        { name: "Neha Agarwal", email: "neha@company.com", status: "accepted", role: "attendee" },
        { name: "Rohit Verma", email: "rohit@company.com", status: "accepted", role: "attendee" },
        { name: "Kavya Sharma", email: "kavya@company.com", status: "accepted", role: "attendee" },
      ],
      relatedTo: null,
      agenda: [
        { id: 1, item: "Previous week performance review", duration: 15, completed: true },
        { id: 2, item: "Pipeline updates and forecasting", duration: 20, completed: true },
        { id: 3, item: "Challenges and blockers discussion", duration: 15, completed: true },
        { id: 4, item: "Goals for upcoming week", duration: 10, completed: true },
      ],
      notes:
        "Strong performance this week. Pipeline looking healthy for Q1. Need to focus on closing Enterprise Ltd deal.",
      actionItems: [
        {
          id: 1,
          task: "Follow up with Enterprise Ltd",
          assignee: "Rohit Verma",
          dueDate: "2024-02-15",
          completed: true,
        },
        { id: 2, task: "Update pipeline forecasts", assignee: "Priya Singh", dueDate: "2024-02-14", completed: true },
        { id: 3, task: "Schedule client check-ins", assignee: "Kavya Sharma", dueDate: "2024-02-16", completed: false },
      ],
      recordings: [{ id: 1, name: "Sales Review Recording", duration: "58:32", size: "125 MB", date: "2024-02-12" }],
      documents: [
        { id: 1, name: "Weekly Sales Report.xlsx", size: "3.1 MB", uploadedBy: "Priya Singh" },
        { id: 2, name: "Pipeline Forecast.pdf", size: "1.8 MB", uploadedBy: "Priya Singh" },
      ],
      priority: "medium",
      recurring: true,
      reminder: "30",
      tags: ["sales", "weekly", "review"],
    },
    {
      id: 3,
      title: "Contract Negotiation - Business Solutions",
      description: "Final contract terms discussion and agreement",
      type: "in-person",
      status: "scheduled",
      startTime: "2024-02-18T14:00:00",
      endTime: "2024-02-18T15:30:00",
      location: "Client Office - Business Solutions",
      meetingLink: null,
      organizer: "Rohit Verma",
      attendees: [
        { name: "Rohit Verma", email: "rohit@company.com", status: "accepted", role: "organizer" },
        { name: "Kavya Sharma", email: "kavya@company.com", status: "accepted", role: "attendee" },
        { name: "Sunita Reddy", email: "sunita@business.com", status: "accepted", role: "attendee" },
        { name: "Legal Team", email: "legal@business.com", status: "pending", role: "attendee" },
      ],
      relatedTo: {
        type: "opportunity",
        name: "Cloud Infrastructure Setup",
        company: "Business Solutions",
      },
      agenda: [
        { id: 1, item: "Contract terms review", duration: 30, completed: false },
        { id: 2, item: "Pricing and payment terms", duration: 20, completed: false },
        { id: 3, item: "Service level agreements", duration: 20, completed: false },
        { id: 4, item: "Implementation timeline", duration: 15, completed: false },
        { id: 5, item: "Contract signing", duration: 5, completed: false },
      ],
      notes: "Bring legal team for contract review. Focus on SLA terms and implementation timeline.",
      actionItems: [],
      recordings: [],
      documents: [
        { id: 1, name: "Contract Draft v3.pdf", size: "4.2 MB", uploadedBy: "Rohit Verma" },
        { id: 2, name: "SLA Terms.docx", size: "1.5 MB", uploadedBy: "Kavya Sharma" },
      ],
      priority: "high",
      recurring: false,
      reminder: "60",
      tags: ["contract", "negotiation", "legal"],
    },
    {
      id: 4,
      title: "Team Standup Meeting",
      description: "Daily team sync and progress updates",
      type: "video",
      status: "completed",
      startTime: "2024-02-15T09:00:00",
      endTime: "2024-02-15T09:30:00",
      location: "Zoom Meeting",
      meetingLink: "https://zoom.us/j/987654321",
      organizer: "Amit Kumar",
      attendees: [
        { name: "Amit Kumar", email: "amit@company.com", status: "accepted", role: "organizer" },
        { name: "Priya Singh", email: "priya@company.com", status: "accepted", role: "attendee" },
        { name: "Neha Agarwal", email: "neha@company.com", status: "accepted", role: "attendee" },
        { name: "Rohit Verma", email: "rohit@company.com", status: "accepted", role: "attendee" },
        { name: "Kavya Sharma", email: "kavya@company.com", status: "accepted", role: "attendee" },
      ],
      relatedTo: null,
      agenda: [
        { id: 1, item: "Yesterday's accomplishments", duration: 10, completed: true },
        { id: 2, item: "Today's goals", duration: 10, completed: true },
        { id: 3, item: "Blockers and challenges", duration: 10, completed: true },
      ],
      notes: "Good progress on all fronts. No major blockers reported.",
      actionItems: [
        { id: 1, task: "Review demo script", assignee: "Neha Agarwal", dueDate: "2024-02-15", completed: true },
        { id: 2, task: "Update client proposals", assignee: "Rohit Verma", dueDate: "2024-02-16", completed: false },
      ],
      recordings: [],
      documents: [],
      priority: "low",
      recurring: true,
      reminder: "10",
      tags: ["standup", "daily", "team"],
    },
    {
      id: 5,
      title: "Client Onboarding - Success Corp",
      description: "Welcome new client and setup initial configuration",
      type: "video",
      status: "scheduled",
      startTime: "2024-02-20T10:00:00",
      endTime: "2024-02-20T11:30:00",
      location: "Microsoft Teams",
      meetingLink: "https://teams.microsoft.com/l/meetup-join/...",
      organizer: "Priya Singh",
      attendees: [
        { name: "Priya Singh", email: "priya@company.com", status: "accepted", role: "organizer" },
        { name: "Deepak Joshi", email: "deepak@success.com", status: "accepted", role: "attendee" },
        { name: "IT Team", email: "it@success.com", status: "pending", role: "attendee" },
      ],
      relatedTo: {
        type: "contact",
        name: "Deepak Joshi",
        company: "Success Corp",
      },
      agenda: [
        { id: 1, item: "Welcome and introductions", duration: 10, completed: false },
        { id: 2, item: "System overview and navigation", duration: 30, completed: false },
        { id: 3, item: "Initial configuration setup", duration: 30, completed: false },
        { id: 4, item: "Training schedule planning", duration: 15, completed: false },
        { id: 5, item: "Q&A and next steps", duration: 5, completed: false },
      ],
      notes: "Prepare onboarding checklist and training materials. Ensure demo environment is ready.",
      actionItems: [],
      recordings: [],
      documents: [
        { id: 1, name: "Onboarding Checklist.pdf", size: "1.8 MB", uploadedBy: "Priya Singh" },
        { id: 2, name: "System Setup Guide.docx", size: "2.3 MB", uploadedBy: "Priya Singh" },
      ],
      priority: "high",
      recurring: false,
      reminder: "30",
      tags: ["onboarding", "client", "setup"],
    },
  ])

  const [newMeeting, setNewMeeting] = useState({
    title: "",
    description: "",
    type: "video",
    startTime: new Date().toISOString().slice(0, 16),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    location: "",
    meetingLink: "",
    attendees: [],
    relatedTo: null,
    agenda: [],
    notes: "",
    priority: "medium",
    recurring: false,
    reminder: "15",
    tags: [],
  })

  const teamMembers = [
    { id: 1, name: "Priya Singh", email: "priya@company.com", avatar: "PS" },
    { id: 2, name: "Amit Kumar", email: "amit@company.com", avatar: "AK" },
    { id: 3, name: "Neha Agarwal", email: "neha@company.com", avatar: "NA" },
    { id: 4, name: "Rohit Verma", email: "rohit@company.com", avatar: "RV" },
    { id: 5, name: "Kavya Sharma", email: "kavya@company.com", avatar: "KS" },
  ]

  const meetingRooms = [
    { id: 1, name: "Conference Room A", capacity: 10, equipment: ["Projector", "Whiteboard", "Video Conf"] },
    { id: 2, name: "Conference Room B", capacity: 6, equipment: ["TV Screen", "Whiteboard"] },
    { id: 3, name: "Meeting Room 1", capacity: 4, equipment: ["TV Screen"] },
    { id: 4, name: "Meeting Room 2", capacity: 4, equipment: ["Whiteboard"] },
    { id: 5, name: "Board Room", capacity: 12, equipment: ["Projector", "Video Conf", "Audio System"] },
  ]

  // Filter meetings based on view mode and filters
  const filteredMeetings = meetings.filter((meeting) => {
    const now = new Date()
    const meetingDate = new Date(meeting.startTime)

    let matchesView = true
    if (viewMode === "upcoming") {
      matchesView = meetingDate >= now && meeting.status !== "completed"
    } else if (viewMode === "past") {
      matchesView = meetingDate < now || meeting.status === "completed"
    }

    const matchesSearch =
      meeting.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.organizer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (meeting.relatedTo?.name && meeting.relatedTo.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesType = selectedType === "all" || meeting.type === selectedType
    const matchesStatus = selectedStatus === "all" || meeting.status === selectedStatus

    return matchesView && matchesSearch && matchesType && matchesStatus
  })

  const handleMeetingClick = (meeting) => {
    setSelectedMeeting(meeting)
    setEditingMeeting({ ...meeting })
    setIsMeetingDetailOpen(true)
    setActiveTab("details")
  }

  const handleAddMeeting = () => {
    const meeting = {
      id: Date.now(),
      ...newMeeting,
      status: "scheduled",
      organizer: "Current User", // This would be the logged-in user
      attendees: newMeeting.attendees.map((attendee) => ({
        ...attendee,
        status: "pending",
        role: "attendee",
      })),
      actionItems: [],
      recordings: [],
      documents: [],
    }

    setMeetings([...meetings, meeting])
    setNewMeeting({
      title: "",
      description: "",
      type: "video",
      startTime: new Date().toISOString().slice(0, 16),
      endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
      location: "",
      meetingLink: "",
      attendees: [],
      relatedTo: null,
      agenda: [],
      notes: "",
      priority: "medium",
      recurring: false,
      reminder: "15",
      tags: [],
    })
    setIsMeetingModalOpen(false)
  }

  const handleSaveMeeting = () => {
    setMeetings(meetings.map((meeting) => (meeting.id === editingMeeting.id ? editingMeeting : meeting)))
    setIsMeetingDetailOpen(false)
  }

  const handleDeleteMeeting = (meetingId) => {
    setMeetings(meetings.filter((meeting) => meeting.id !== meetingId))
    setIsMeetingDetailOpen(false)
  }

  const addAgendaItem = () => {
    const newItem = {
      id: Date.now(),
      item: "",
      duration: 10,
      completed: false,
    }
    setEditingMeeting({
      ...editingMeeting,
      agenda: [...editingMeeting.agenda, newItem],
    })
  }

  const addActionItem = () => {
    const newAction = {
      id: Date.now(),
      task: "",
      assignee: "",
      dueDate: "",
      completed: false,
    }
    setEditingMeeting({
      ...editingMeeting,
      actionItems: [...editingMeeting.actionItems, newAction],
    })
  }

  const getMeetingTypeIcon = (type) => {
    const icons = {
      video: <Video className="w-4 h-4" />,
      "in-person": <Users className="w-4 h-4" />,
      phone: <Phone className="w-4 h-4" />,
    }
    return icons[type] || <Calendar className="w-4 h-4" />
  }

  const getMeetingTypeColor = (type) => {
    const colors = {
      video: "bg-blue-100 text-blue-800",
      "in-person": "bg-green-100 text-green-800",
      phone: "bg-purple-100 text-purple-800",
    }
    return colors[type] || "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status) => {
    const colors = {
      scheduled: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: "border-l-red-500",
      medium: "border-l-yellow-500",
      low: "border-l-green-500",
    }
    return colors[priority] || "border-l-gray-500"
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
    }
  }

  const getDuration = (startTime, endTime) => {
    const start = new Date(startTime)
    const end = new Date(endTime)
    const diffMs = end - start
    const diffMins = Math.floor(diffMs / 60000)
    const hours = Math.floor(diffMins / 60)
    const minutes = diffMins % 60
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  }

  const getAttendeeStatusIcon = (status) => {
    const icons = {
      accepted: <CheckCircle className="w-4 h-4 text-green-500" />,
      pending: <Clock className="w-4 h-4 text-yellow-500" />,
      declined: <X className="w-4 h-4 text-red-500" />,
    }
    return icons[status] || <Clock className="w-4 h-4 text-gray-500" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Meetings</h1>
              <p className="text-gray-600 mt-1">Schedule and manage all your meetings</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMeetingModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Schedule Meeting
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Meetings</p>
                  <p className="text-2xl font-bold text-gray-900">{meetings.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.filter((m) => new Date(m.startTime) >= new Date() && m.status !== "completed").length}
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
                    {meetings.filter((m) => m.status === "completed").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Video className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Video Meetings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {meetings.filter((m) => m.type === "video").length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search meetings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sm:w-80 w-[100%] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Types</option>
                  <option value="video">Video</option>
                  <option value="in-person">In-Person</option>
                  <option value="phone">Phone</option>
                </select>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("upcoming")}
                  className={`px-3 py-2 text-sm ${viewMode === "upcoming" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  Upcoming
                </button>
                <button
                  onClick={() => setViewMode("past")}
                  className={`px-3 py-2 text-sm ${viewMode === "past" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  Past
                </button>
                <button
                  onClick={() => setViewMode("all")}
                  className={`px-3 py-2 text-sm ${viewMode === "all" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  All
                </button>
              </div>
            </div>
          </div>

          {/* Meetings List */}
          <div className="space-y-4">
            {filteredMeetings.map((meeting) => (
              <div
                key={meeting.id}
                onClick={() => handleMeetingClick(meeting)}
                className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 ${getPriorityColor(meeting.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${getMeetingTypeColor(meeting.type)}`}>
                        {getMeetingTypeIcon(meeting.type)}
                      </div>
                      <div>
                        <h3 className="sm:text-lg font-semibold text-gray-900">{meeting.title}</h3>
                        <p className="text-sm text-gray-600">{meeting.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <div>
                          <div>{formatDateTime(meeting.startTime).date}</div>
                          <div className="text-xs">
                            {formatDateTime(meeting.startTime).time} - {formatDateTime(meeting.endTime).time}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{getDuration(meeting.startTime, meeting.endTime)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        {meeting.type === "video" ? (
                          <Video className="w-4 h-4" />
                        ) : meeting.type === "phone" ? (
                          <Phone className="w-4 h-4" />
                        ) : (
                          <MapPin className="w-4 h-4" />
                        )}
                        <span className="truncate">{meeting.location || meeting.meetingLink}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{meeting.attendees.length} attendees</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(meeting.status)}`}>
                          {meeting.status.replace("-", " ")}
                        </span>
                        <span className="text-xs text-gray-500">Organized by {meeting.organizer}</span>
                        {meeting.relatedTo && (
                          <span className="text-xs text-gray-500">
                            Related to {meeting.relatedTo.name} ({meeting.relatedTo.company})
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {meeting.recurring && <Repeat className="w-4 h-4 text-gray-400" />}
                        {meeting.priority === "high" && <Star className="w-4 h-4 text-red-500" />}
                        {meeting.meetingLink && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(meeting.meetingLink, "_blank")
                            }}
                            className="text-blue-600 hover:text-blue-700"
                            title="Join Meeting"
                          >
                            <Link className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredMeetings.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No meetings found</h3>
                <p className="text-gray-600">Try adjusting your search or filters, or schedule a new meeting.</p>
              </div>
            )}
          </div>
        </div>

        {/* Schedule Meeting Modal */}
        {isMeetingModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="sm:text-xl font-semibold">Schedule New Meeting</h2>
                <button onClick={() => setIsMeetingModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Title *</label>
                    <input
                      type="text"
                      value={newMeeting.title}
                      onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newMeeting.description}
                      onChange={(e) => setNewMeeting({ ...newMeeting, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input
                        type="datetime-local"
                        value={newMeeting.startTime}
                        onChange={(e) => setNewMeeting({ ...newMeeting, startTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input
                        type="datetime-local"
                        value={newMeeting.endTime}
                        onChange={(e) => setNewMeeting({ ...newMeeting, endTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Type</label>
                    <select
                      value={newMeeting.type}
                      onChange={(e) => setNewMeeting({ ...newMeeting, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="video">Video Meeting</option>
                      <option value="in-person">In-Person</option>
                      <option value="phone">Phone Call</option>
                    </select>
                  </div>

                  {newMeeting.type === "in-person" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Room</label>
                      <select
                        value={newMeeting.location}
                        onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a room</option>
                        {meetingRooms.map((room) => (
                          <option key={room.id} value={room.name}>
                            {room.name} (Capacity: {room.capacity})
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : newMeeting.type === "video" ? (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                      <input
                        type="url"
                        value={newMeeting.meetingLink}
                        onChange={(e) => setNewMeeting({ ...newMeeting, meetingLink: e.target.value })}
                        placeholder="https://zoom.us/j/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        value={newMeeting.location}
                        onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={newMeeting.priority}
                        onChange={(e) => setNewMeeting({ ...newMeeting, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reminder</label>
                      <select
                        value={newMeeting.reminder}
                        onChange={(e) => setNewMeeting({ ...newMeeting, reminder: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="0">No reminder</option>
                        <option value="5">5 minutes before</option>
                        <option value="15">15 minutes before</option>
                        <option value="30">30 minutes before</option>
                        <option value="60">1 hour before</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {teamMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={newMeeting.attendees.some((a) => a.email === member.email)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewMeeting({
                                  ...newMeeting,
                                  attendees: [
                                    ...newMeeting.attendees,
                                    { ...member, status: "pending", role: "attendee" },
                                  ],
                                })
                              } else {
                                setNewMeeting({
                                  ...newMeeting,
                                  attendees: newMeeting.attendees.filter((a) => a.email !== member.email),
                                })
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            {member.avatar}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                            <div className="text-xs text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agenda Items</label>
                    <div className="space-y-2">
                      {newMeeting.agenda.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.item}
                            onChange={(e) => {
                              const updatedAgenda = [...newMeeting.agenda]
                              updatedAgenda[index].item = e.target.value
                              setNewMeeting({ ...newMeeting, agenda: updatedAgenda })
                            }}
                            placeholder="Agenda item"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <input
                            type="number"
                            value={item.duration}
                            onChange={(e) => {
                              const updatedAgenda = [...newMeeting.agenda]
                              updatedAgenda[index].duration = Number.parseInt(e.target.value) || 0
                              setNewMeeting({ ...newMeeting, agenda: updatedAgenda })
                            }}
                            placeholder="Min"
                            className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <button
                            onClick={() => {
                              const updatedAgenda = newMeeting.agenda.filter((_, i) => i !== index)
                              setNewMeeting({ ...newMeeting, agenda: updatedAgenda })
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          setNewMeeting({
                            ...newMeeting,
                            agenda: [
                              ...newMeeting.agenda,
                              { id: Date.now(), item: "", duration: 10, completed: false },
                            ],
                          })
                        }}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add agenda item
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={newMeeting.notes}
                      onChange={(e) => setNewMeeting({ ...newMeeting, notes: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newMeeting.recurring}
                        onChange={(e) => setNewMeeting({ ...newMeeting, recurring: e.target.checked })}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">Recurring meeting</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsMeetingModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddMeeting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Meeting Detail Modal */}
        {isMeetingDetailOpen && selectedMeeting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${getMeetingTypeColor(selectedMeeting.type)}`}>
                    {getMeetingTypeIcon(selectedMeeting.type)}
                  </div>
                  <div>
                    <h2 className="sm:text-xl font-semibold">{selectedMeeting.title}</h2>
                    <p className="text-gray-600">{selectedMeeting.description}</p>
                  </div>
                </div>
                <button onClick={() => setIsMeetingDetailOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Meeting Info Bar */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm font-medium">{formatDateTime(selectedMeeting.startTime).date}</div>
                      <div className="text-xs text-gray-500">
                        {formatDateTime(selectedMeeting.startTime).time} -{" "}
                        {formatDateTime(selectedMeeting.endTime).time}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{getDuration(selectedMeeting.startTime, selectedMeeting.endTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedMeeting.type === "video" ? (
                      <Video className="w-4 h-4 text-gray-500" />
                    ) : selectedMeeting.type === "phone" ? (
                      <Phone className="w-4 h-4 text-gray-500" />
                    ) : (
                      <MapPin className="w-4 h-4 text-gray-500" />
                    )}
                    <span className="text-sm truncate">{selectedMeeting.location || selectedMeeting.meetingLink}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(selectedMeeting.status)}`}>
                      {selectedMeeting.status.replace("-", " ")}
                    </span>
                    {selectedMeeting.meetingLink && (
                      <button
                        onClick={() => window.open(selectedMeeting.meetingLink, "_blank")}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <Link className="w-3 h-3" />
                        Join
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6 overflow-x-auto">
                <nav className="flex space-x-8">
                  {[
                    { id: "details", name: "Details", icon: FileText },
                    { id: "agenda", name: "Agenda", icon: CheckSquare },
                    { id: "notes", name: "Notes", icon: MessageSquare },
                    { id: "recordings", name: "Recordings", icon: Play },
                    { id: "actions", name: "Action Items", icon: CheckCircle },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm text-nowrap ${
                        activeTab === tab.id
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="min-h-[400px]">
                {/* Details Tab */}
                {activeTab === "details" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Meeting Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                            <input
                              type="text"
                              value={editingMeeting.title || ""}
                              onChange={(e) => setEditingMeeting({ ...editingMeeting, title: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={editingMeeting.description || ""}
                              onChange={(e) => setEditingMeeting({ ...editingMeeting, description: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                              <input
                                type="datetime-local"
                                value={editingMeeting.startTime?.slice(0, 16) || ""}
                                onChange={(e) => setEditingMeeting({ ...editingMeeting, startTime: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                              <input
                                type="datetime-local"
                                value={editingMeeting.endTime?.slice(0, 16) || ""}
                                onChange={(e) => setEditingMeeting({ ...editingMeeting, endTime: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                        <div className="space-y-2">
                          {selectedMeeting.documents.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <Paperclip className="w-4 h-4 text-gray-500" />
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {doc.size} • Uploaded by {doc.uploadedBy}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button className="text-blue-600 hover:text-blue-700">
                                  <Download className="w-4 h-4" />
                                </button>
                                <button className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <button className="w-full p-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center gap-2">
                            <Upload className="w-4 h-4" />
                            Upload document
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Attendees</h3>
                        <div className="space-y-3">
                          {selectedMeeting.attendees.map((attendee, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                                  {attendee.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{attendee.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {attendee.email} • {attendee.role}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getAttendeeStatusIcon(attendee.status)}
                                <span className="text-xs text-gray-500 capitalize">{attendee.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {selectedMeeting.relatedTo && (
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Related To</h3>
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  selectedMeeting.relatedTo.type === "contact" ? "bg-blue-100" : "bg-purple-100"
                                }`}
                              >
                                {selectedMeeting.relatedTo.type === "contact" ? (
                                  <User className="w-4 h-4 text-blue-700" />
                                ) : (
                                  <Building className="w-4 h-4 text-purple-700" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{selectedMeeting.relatedTo.name}</p>
                                <p className="text-sm text-gray-600">
                                  {selectedMeeting.relatedTo.type === "contact" ? "Contact" : "Opportunity"}
                                </p>
                                {selectedMeeting.relatedTo.company && (
                                  <p className="text-sm text-gray-600 mt-1">{selectedMeeting.relatedTo.company}</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Agenda Tab */}
                {activeTab === "agenda" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Meeting Agenda</h3>
                      <button
                        onClick={addAgendaItem}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add Item
                      </button>
                    </div>
                    <div className="space-y-3">
                      {editingMeeting.agenda?.map((item, index) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={(e) => {
                              const updatedAgenda = [...editingMeeting.agenda]
                              updatedAgenda[index].completed = e.target.checked
                              setEditingMeeting({ ...editingMeeting, agenda: updatedAgenda })
                            }}
                            className="rounded border-gray-300"
                          />
                          <div className="flex-1">
                            <input
                              type="text"
                              value={item.item}
                              onChange={(e) => {
                                const updatedAgenda = [...editingMeeting.agenda]
                                updatedAgenda[index].item = e.target.value
                                setEditingMeeting({ ...editingMeeting, agenda: updatedAgenda })
                              }}
                              className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${item.completed ? "line-through text-gray-500" : ""}`}
                            />
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={item.duration}
                              onChange={(e) => {
                                const updatedAgenda = [...editingMeeting.agenda]
                                updatedAgenda[index].duration = Number.parseInt(e.target.value) || 0
                                setEditingMeeting({ ...editingMeeting, agenda: updatedAgenda })
                              }}
                              className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-sm text-gray-500">min</span>
                            <button
                              onClick={() => {
                                const updatedAgenda = editingMeeting.agenda.filter((_, i) => i !== index)
                                setEditingMeeting({ ...editingMeeting, agenda: updatedAgenda })
                              }}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {editingMeeting.agenda?.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CheckSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No agenda items yet. Add items to structure your meeting.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === "notes" && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Meeting Notes</h3>
                    <textarea
                      value={editingMeeting.notes || ""}
                      onChange={(e) => setEditingMeeting({ ...editingMeeting, notes: e.target.value })}
                      rows={12}
                      placeholder="Add your meeting notes here..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>Notes are automatically saved as you type</span>
                    </div>
                  </div>
                )}

                {/* Recordings Tab */}
                {activeTab === "recordings" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Meeting Recordings</h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm">
                        <Upload className="w-4 h-4" />
                        Upload Recording
                      </button>
                    </div>
                    <div className="space-y-3">
                      {selectedMeeting.recordings.map((recording) => (
                        <div key={recording.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Play className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{recording.name}</div>
                              <div className="text-xs text-gray-500">
                                {recording.duration} • {recording.size} • {recording.date}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-700">
                              <Play className="w-4 h-4" />
                            </button>
                            <button className="text-blue-600 hover:text-blue-700">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                      {selectedMeeting.recordings.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <Play className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No recordings available for this meeting.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Items Tab */}
                {activeTab === "actions" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Action Items</h3>
                      <button
                        onClick={addActionItem}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm"
                      >
                        <Plus className="w-4 h-4" />
                        Add Action
                      </button>
                    </div>
                    <div className="space-y-3">
                      {editingMeeting.actionItems?.map((action, index) => (
                        <div key={action.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                          <input
                            type="checkbox"
                            checked={action.completed}
                            onChange={(e) => {
                              const updatedActions = [...editingMeeting.actionItems]
                              updatedActions[index].completed = e.target.checked
                              setEditingMeeting({ ...editingMeeting, actionItems: updatedActions })
                            }}
                            className="rounded border-gray-300"
                          />
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input
                              type="text"
                              value={action.task}
                              onChange={(e) => {
                                const updatedActions = [...editingMeeting.actionItems]
                                updatedActions[index].task = e.target.value
                                setEditingMeeting({ ...editingMeeting, actionItems: updatedActions })
                              }}
                              placeholder="Action item description"
                              className={`px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${action.completed ? "line-through text-gray-500" : ""}`}
                            />
                            <select
                              value={action.assignee}
                              onChange={(e) => {
                                const updatedActions = [...editingMeeting.actionItems]
                                updatedActions[index].assignee = e.target.value
                                setEditingMeeting({ ...editingMeeting, actionItems: updatedActions })
                              }}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                              <option value="">Assign to...</option>
                              {teamMembers.map((member) => (
                                <option key={member.id} value={member.name}>
                                  {member.name}
                                </option>
                              ))}
                            </select>
                            <input
                              type="date"
                              value={action.dueDate}
                              onChange={(e) => {
                                const updatedActions = [...editingMeeting.actionItems]
                                updatedActions[index].dueDate = e.target.value
                                setEditingMeeting({ ...editingMeeting, actionItems: updatedActions })
                              }}
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const updatedActions = editingMeeting.actionItems.filter((_, i) => i !== index)
                              setEditingMeeting({ ...editingMeeting, actionItems: updatedActions })
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {editingMeeting.actionItems?.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <CheckCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                          <p>No action items yet. Add items to track follow-ups.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 flex-wrap gap-3">
                <button
                  onClick={() => handleDeleteMeeting(selectedMeeting.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Meeting
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsMeetingDetailOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveMeeting}
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

export default MeetingsPage
