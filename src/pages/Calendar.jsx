"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar,
  Clock,
  User,
  Users,
  Phone,
  Mail,
  Video,
  Coffee,
  X,
  Edit,
  Trash2,
  MapPin,
  Bell,
  Repeat,
  CheckSquare,
  Building,
  Filter,
} from "lucide-react"

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState("month") // month, week, day
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isEventModalOpen, setIsEventModalOpen] = useState(false)
  const [isEventDetailOpen, setIsEventDetailOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [editingEvent, setEditingEvent] = useState({})
  const [selectedFilters, setSelectedFilters] = useState({
    tasks: true,
    meetings: true,
    calls: true,
    emails: true,
    personal: true,
  })

  // Sample events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Follow up call with Rajesh Kumar",
      description: "Discuss enterprise software proposal and pricing",
      type: "call",
      startTime: "2024-02-15T14:00:00",
      endTime: "2024-02-15T14:30:00",
      attendees: ["Priya Singh"],
      location: null,
      relatedTo: {
        type: "contact",
        name: "Rajesh Kumar",
        company: "Tech Solutions Pvt Ltd",
      },
      priority: "high",
      status: "scheduled",
      reminder: "15",
      recurring: false,
      notes: "Focus on implementation timeline and support structure",
    },
    {
      id: 2,
      title: "Product Demo - StartupXYZ",
      description: "Demonstrate CRM features and capabilities",
      type: "meeting",
      startTime: "2024-02-16T11:00:00",
      endTime: "2024-02-16T12:00:00",
      attendees: ["Neha Agarwal", "Amit Kumar"],
      location: "Conference Room A",
      relatedTo: {
        type: "opportunity",
        name: "CRM Implementation",
        company: "StartupXYZ",
      },
      priority: "high",
      status: "scheduled",
      reminder: "30",
      recurring: false,
      notes: "Prepare demo environment and case studies",
    },
    {
      id: 3,
      title: "Team Standup Meeting",
      description: "Daily team sync and progress updates",
      type: "meeting",
      startTime: "2024-02-15T09:00:00",
      endTime: "2024-02-15T09:30:00",
      attendees: ["Priya Singh", "Amit Kumar", "Neha Agarwal", "Rohit Verma", "Kavya Sharma"],
      location: "Meeting Room B",
      relatedTo: null,
      priority: "medium",
      status: "scheduled",
      reminder: "10",
      recurring: true,
      notes: "Discuss daily goals and blockers",
    },
    {
      id: 4,
      title: "Send proposal to Digital Corp",
      description: "Finalize and send digital marketing proposal",
      type: "task",
      startTime: "2024-02-14T17:00:00",
      endTime: "2024-02-14T18:00:00",
      attendees: ["Amit Kumar"],
      location: null,
      relatedTo: {
        type: "opportunity",
        name: "Digital Marketing Campaign",
        company: "Digital Corp",
      },
      priority: "high",
      status: "completed",
      reminder: "60",
      recurring: false,
      notes: "Include ROI projections and case studies",
    },
    {
      id: 5,
      title: "Coffee chat with Vikash Singh",
      description: "Informal discussion about partnership opportunities",
      type: "personal",
      startTime: "2024-02-17T15:30:00",
      endTime: "2024-02-17T16:30:00",
      attendees: ["Kavya Sharma"],
      location: "Cafe Central",
      relatedTo: {
        type: "contact",
        name: "Vikash Singh",
        company: "Consulting Group",
      },
      priority: "low",
      status: "scheduled",
      reminder: "30",
      recurring: false,
      notes: "Discuss potential referral partnerships",
    },
    {
      id: 6,
      title: "Contract negotiation - Business Solutions",
      description: "Final contract terms discussion",
      type: "meeting",
      startTime: "2024-02-18T14:00:00",
      endTime: "2024-02-18T15:30:00",
      attendees: ["Rohit Verma", "Kavya Sharma"],
      location: "Client Office",
      relatedTo: {
        type: "opportunity",
        name: "Cloud Infrastructure Setup",
        company: "Business Solutions",
      },
      priority: "high",
      status: "scheduled",
      reminder: "60",
      recurring: false,
      notes: "Bring legal team for contract review",
    },
    {
      id: 7,
      title: "Weekly Sales Review",
      description: "Review weekly sales performance and pipeline",
      type: "meeting",
      startTime: "2024-02-16T16:00:00",
      endTime: "2024-02-16T17:00:00",
      attendees: ["Priya Singh", "Amit Kumar", "Neha Agarwal", "Rohit Verma", "Kavya Sharma"],
      location: "Conference Room A",
      relatedTo: null,
      priority: "medium",
      status: "scheduled",
      reminder: "30",
      recurring: true,
      notes: "Prepare weekly sales report and pipeline updates",
    },
    {
      id: 8,
      title: "Email follow-up - Enterprise Ltd",
      description: "Send quarterly business review materials",
      type: "email",
      startTime: "2024-02-19T10:00:00",
      endTime: "2024-02-19T10:30:00",
      attendees: ["Rohit Verma"],
      location: null,
      relatedTo: {
        type: "contact",
        name: "Manoj Singh",
        company: "Enterprise Ltd",
      },
      priority: "medium",
      status: "scheduled",
      reminder: "15",
      recurring: false,
      notes: "Include success metrics and future roadmap",
    },
  ])

  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    type: "meeting",
    startTime: new Date().toISOString().slice(0, 16),
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
    attendees: [],
    location: "",
    relatedTo: null,
    priority: "medium",
    reminder: "15",
    recurring: false,
    notes: "",
  })

  const teamMembers = [
    { id: 1, name: "Priya Singh", avatar: "PS", color: "bg-blue-500" },
    { id: 2, name: "Amit Kumar", avatar: "AK", color: "bg-green-500" },
    { id: 3, name: "Neha Agarwal", avatar: "NA", color: "bg-purple-500" },
    { id: 4, name: "Rohit Verma", avatar: "RV", color: "bg-orange-500" },
    { id: 5, name: "Kavya Sharma", avatar: "KS", color: "bg-pink-500" },
  ]

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => selectedFilters[event.type])

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0]
    return filteredEvents.filter((event) => event.startTime.startsWith(dateStr))
  }

  // Get events for a specific time slot
  const getEventsForTimeSlot = (date, hour) => {
    const dateStr = date.toISOString().split("T")[0]
    return filteredEvents.filter((event) => {
      const eventDate = event.startTime.split("T")[0]
      const eventHour = Number.parseInt(event.startTime.split("T")[1].split(":")[0])
      return eventDate === dateStr && eventHour === hour
    })
  }

  // Calendar navigation
  const prevPeriod = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (viewMode === "week") {
      setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000))
    } else {
      setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))
    }
  }

  const nextPeriod = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (viewMode === "week") {
      setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000))
    } else {
      setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))
    }
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Generate calendar days for month view
  const generateMonthDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      days.push(date)
    }
    return days
  }

  // Generate week days for week view
  const generateWeekDays = () => {
    const startOfWeek = new Date(currentDate)
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      days.push(date)
    }
    return days
  }

  // Generate time slots for day/week view
  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 0; hour < 24; hour++) {
      slots.push(hour)
    }
    return slots
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
    setEditingEvent({ ...event })
    setIsEventDetailOpen(true)
  }

  const handleAddEvent = () => {
    const event = {
      id: Date.now(),
      ...newEvent,
      status: "scheduled",
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      description: "",
      type: "meeting",
      startTime: new Date().toISOString().slice(0, 16),
      endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16),
      attendees: [],
      location: "",
      relatedTo: null,
      priority: "medium",
      reminder: "15",
      recurring: false,
      notes: "",
    })
    setIsEventModalOpen(false)
  }

  const handleSaveEvent = () => {
    setEvents(events.map((event) => (event.id === editingEvent.id ? editingEvent : event)))
    setIsEventDetailOpen(false)
  }

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter((event) => event.id !== eventId))
    setIsEventDetailOpen(false)
  }

  const getEventTypeIcon = (type) => {
    const icons = {
      meeting: <Users className="w-4 h-4" />,
      call: <Phone className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      task: <CheckSquare className="w-4 h-4" />,
      personal: <Coffee className="w-4 h-4" />,
      video: <Video className="w-4 h-4" />,
    }
    return icons[type] || <Calendar className="w-4 h-4" />
  }

  const getEventTypeColor = (type) => {
    const colors = {
      meeting: "bg-blue-500",
      call: "bg-green-500",
      email: "bg-purple-500",
      task: "bg-orange-500",
      personal: "bg-pink-500",
      video: "bg-indigo-500",
    }
    return colors[type] || "bg-gray-500"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: "border-l-red-500",
      medium: "border-l-yellow-500",
      low: "border-l-green-500",
    }
    return colors[priority] || "border-l-gray-500"
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const isToday = (date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isCurrentMonth = (date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const monthDays = generateMonthDays()
  const weekDays = generateWeekDays()
  const timeSlots = generateTimeSlots()

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
              <p className="text-gray-600 mt-1">Manage your schedule and activities</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsEventModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Event
              </button>
            </div>
          </div>

          {/* Calendar Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevPeriod}
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                  title="Previous"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextPeriod} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600" title="Next">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={goToToday}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium"
                >
                  Today
                </button>
              </div>

              <div className="text-xl font-semibold text-gray-900">
                {viewMode === "month" && currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                {viewMode === "week" &&
                  `${weekDays[0].toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekDays[6].toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`}
                {viewMode === "day" && formatDate(currentDate)}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Event Type Filters */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <div className="flex items-center gap-2">
                  {Object.entries(selectedFilters).map(([type, enabled]) => (
                    <button
                      key={type}
                      onClick={() => setSelectedFilters({ ...selectedFilters, [type]: !enabled })}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                        enabled
                          ? `${getEventTypeColor(type)} text-white`
                          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      }`}
                    >
                      {getEventTypeIcon(type)}
                      <span className="capitalize">{type}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("month")}
                  className={`px-3 py-2 text-sm ${viewMode === "month" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  Month
                </button>
                <button
                  onClick={() => setViewMode("week")}
                  className={`px-3 py-2 text-sm ${viewMode === "week" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode("day")}
                  className={`px-3 py-2 text-sm ${viewMode === "day" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
                >
                  Day
                </button>
              </div>
            </div>
          </div>

          {/* Month View */}
          {viewMode === "month" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="grid grid-cols-7 border-b border-gray-200">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div
                    key={day}
                    className="p-4 text-center font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7">
                {monthDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[120px] border-r border-b border-gray-200 last:border-r-0 p-2 ${
                      !isCurrentMonth(day) ? "bg-gray-50" : ""
                    } ${isToday(day) ? "bg-blue-50" : ""}`}
                  >
                    <div
                      className={`text-sm mb-2 ${!isCurrentMonth(day) ? "text-gray-400" : "text-gray-900"} ${isToday(day) ? "font-bold text-blue-600" : ""}`}
                    >
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {getEventsForDate(day)
                        .slice(0, 3)
                        .map((event) => (
                          <div
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className={`text-xs p-1 rounded cursor-pointer ${getEventTypeColor(event.type)} text-white truncate hover:opacity-80`}
                          >
                            <div className="flex items-center gap-1">
                              {getEventTypeIcon(event.type)}
                              <span>{formatTime(event.startTime)}</span>
                            </div>
                            <div className="truncate">{event.title}</div>
                          </div>
                        ))}
                      {getEventsForDate(day).length > 3 && (
                        <div className="text-xs text-gray-500 text-center">
                          +{getEventsForDate(day).length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Week View */}
          {viewMode === "week" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="grid grid-cols-8 border-b border-gray-200">
                <div className="p-4 border-r border-gray-200"></div>
                {weekDays.map((day, index) => (
                  <div
                    key={index}
                    className={`p-4 text-center border-r border-gray-200 last:border-r-0 ${isToday(day) ? "bg-blue-50" : ""}`}
                  >
                    <div className="text-sm text-gray-600">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
                    <div className={`text-lg font-semibold ${isToday(day) ? "text-blue-600" : "text-gray-900"}`}>
                      {day.getDate()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map((hour) => (
                  <div key={hour} className="grid grid-cols-8 border-b border-gray-100">
                    <div className="p-2 border-r border-gray-200 text-xs text-gray-500 text-right">
                      {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                    </div>
                    {weekDays.map((day, dayIndex) => (
                      <div key={dayIndex} className="min-h-[60px] border-r border-gray-200 last:border-r-0 p-1">
                        {getEventsForTimeSlot(day, hour).map((event) => (
                          <div
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className={`text-xs p-2 rounded mb-1 cursor-pointer ${getEventTypeColor(event.type)} text-white hover:opacity-80 ${getPriorityColor(event.priority)} border-l-4`}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              {getEventTypeIcon(event.type)}
                              <span className="font-medium">{formatTime(event.startTime)}</span>
                            </div>
                            <div className="truncate">{event.title}</div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Day View */}
          {viewMode === "day" && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">{formatDate(currentDate)}</h3>
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {timeSlots.map((hour) => (
                  <div key={hour} className="flex border-b border-gray-100">
                    <div className="w-20 p-4 border-r border-gray-200 text-sm text-gray-500 text-right">
                      {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                    </div>
                    <div className="flex-1 min-h-[80px] p-2">
                      {getEventsForTimeSlot(currentDate, hour).map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className={`p-3 rounded-lg mb-2 cursor-pointer ${getEventTypeColor(event.type)} text-white hover:opacity-80 ${getPriorityColor(event.priority)} border-l-4`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {getEventTypeIcon(event.type)}
                              <span className="font-medium">{event.title}</span>
                            </div>
                            <span className="text-xs opacity-90">
                              {formatTime(event.startTime)} - {formatTime(event.endTime)}
                            </span>
                          </div>
                          <div className="text-sm opacity-90">{event.description}</div>
                          {event.location && (
                            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                              <MapPin className="w-3 h-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          {event.attendees.length > 0 && (
                            <div className="flex items-center gap-1 mt-2 text-xs opacity-80">
                              <Users className="w-3 h-3" />
                              <span>{event.attendees.join(", ")}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Add Event Modal */}
        {isEventModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add New Event</h2>
                <button onClick={() => setIsEventModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="call">Call</option>
                      <option value="email">Email</option>
                      <option value="task">Task</option>
                      <option value="personal">Personal</option>
                      <option value="video">Video Call</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={newEvent.priority}
                      onChange={(e) => setNewEvent({ ...newEvent, priority: e.target.value })}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="datetime-local"
                      value={newEvent.startTime}
                      onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="datetime-local"
                      value={newEvent.endTime}
                      onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      placeholder="Meeting room, address, or online"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reminder</label>
                    <select
                      value={newEvent.reminder}
                      onChange={(e) => setNewEvent({ ...newEvent, reminder: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="0">No reminder</option>
                      <option value="5">5 minutes before</option>
                      <option value="15">15 minutes before</option>
                      <option value="30">30 minutes before</option>
                      <option value="60">1 hour before</option>
                      <option value="1440">1 day before</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                <div className="flex flex-wrap gap-2">
                  {teamMembers.map((member) => (
                    <button
                      key={member.id}
                      onClick={() => {
                        const attendees = newEvent.attendees.includes(member.name)
                          ? newEvent.attendees.filter((name) => name !== member.name)
                          : [...newEvent.attendees, member.name]
                        setNewEvent({ ...newEvent, attendees })
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        newEvent.attendees.includes(member.name)
                          ? "bg-blue-100 border-blue-300 text-blue-700"
                          : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${member.color}`}
                      >
                        {member.avatar}
                      </div>
                      <span className="text-sm">{member.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newEvent.notes}
                  onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newEvent.recurring}
                    onChange={(e) => setNewEvent({ ...newEvent, recurring: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Recurring event</span>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsEventModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddEvent}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Event
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Event Detail Modal */}
        {isEventDetailOpen && selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Event Details</h2>
                <button onClick={() => setIsEventDetailOpen(false)} className="text-gray-400 hover:text-gray-600">
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
                        value={editingEvent.title || ""}
                        onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={editingEvent.type || ""}
                        onChange={(e) => setEditingEvent({ ...editingEvent, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="meeting">Meeting</option>
                        <option value="call">Call</option>
                        <option value="email">Email</option>
                        <option value="task">Task</option>
                        <option value="personal">Personal</option>
                        <option value="video">Video Call</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                      <input
                        type="datetime-local"
                        value={editingEvent.startTime?.slice(0, 16) || ""}
                        onChange={(e) => setEditingEvent({ ...editingEvent, startTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                      <input
                        type="datetime-local"
                        value={editingEvent.endTime?.slice(0, 16) || ""}
                        onChange={(e) => setEditingEvent({ ...editingEvent, endTime: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={editingEvent.location || ""}
                        onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={editingEvent.priority || ""}
                        onChange={(e) => setEditingEvent({ ...editingEvent, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editingEvent.description || ""}
                      onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={editingEvent.notes || ""}
                      onChange={(e) => setEditingEvent({ ...editingEvent, notes: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Event Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Event Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${getEventTypeColor(selectedEvent.type)} text-white`}>
                          {getEventTypeIcon(selectedEvent.type)}
                        </div>
                        <span className="font-medium capitalize">{selectedEvent.type}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>
                          {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                        </span>
                      </div>
                      {selectedEvent.location && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{selectedEvent.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-gray-600">
                        <Bell className="w-4 h-4" />
                        <span>
                          {selectedEvent.reminder === "0" ? "No reminder" : `${selectedEvent.reminder} minutes before`}
                        </span>
                      </div>
                      {selectedEvent.recurring && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Repeat className="w-4 h-4" />
                          <span>Recurring event</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attendees */}
                  {selectedEvent.attendees.length > 0 && (
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">Attendees</h4>
                      <div className="space-y-2">
                        {selectedEvent.attendees.map((attendee, index) => {
                          const member = teamMembers.find((m) => m.name === attendee)
                          return (
                            <div key={index} className="flex items-center gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${member?.color || "bg-gray-500"}`}
                              >
                                {member?.avatar || attendee.charAt(0)}
                              </div>
                              <span className="text-sm text-gray-900">{attendee}</span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Related To */}
                  {selectedEvent.relatedTo && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">Related To</h4>
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            selectedEvent.relatedTo.type === "contact" ? "bg-blue-100" : "bg-purple-100"
                          }`}
                        >
                          {selectedEvent.relatedTo.type === "contact" ? (
                            <User className="w-4 h-4 text-blue-700" />
                          ) : (
                            <Building className="w-4 h-4 text-purple-700" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{selectedEvent.relatedTo.name}</p>
                          <p className="text-sm text-gray-600">
                            {selectedEvent.relatedTo.type === "contact" ? "Contact" : "Opportunity"}
                          </p>
                          {selectedEvent.relatedTo.company && (
                            <p className="text-sm text-gray-600 mt-1">{selectedEvent.relatedTo.company}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      <Edit className="w-4 h-4" />
                      Edit Event
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                      <Bell className="w-4 h-4" />
                      Set Reminder
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                      <Users className="w-4 h-4" />
                      Invite Others
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Event
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEventDetailOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEvent}
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

export default CalendarPage
