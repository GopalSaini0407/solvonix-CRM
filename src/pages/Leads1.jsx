"use client"

import { useState, useRef } from "react"
import { Plus, Search, Filter, Phone, Mail, Calendar, DollarSign, User, Building, X } from "lucide-react"

const initialStages = [
  {
    id: "new",
    name: "New Leads",
    color: "bg-blue-500",
    leads: [
      {
        id: "1",
        name: "Rahul Sharma",
        email: "rahul@example.com",
        phone: "+91 98765 43210",
        company: "Tech Solutions Pvt Ltd",
        value: 50000,
        source: "Website",
        assignedTo: "Priya Singh",
        createdAt: "2024-01-15",
        notes: "Interested in enterprise solution",
      },
      {
        id: "2",
        name: "Anjali Gupta",
        email: "anjali@startup.com",
        phone: "+91 87654 32109",
        company: "StartupXYZ",
        value: 25000,
        source: "Referral",
        assignedTo: "Amit Kumar",
        createdAt: "2024-01-14",
        notes: "Looking for cost-effective solution",
      },
    ],
  },
  {
    id: "contacted",
    name: "Contacted",
    color: "bg-yellow-500",
    leads: [
      {
        id: "3",
        name: "Vikash Patel",
        email: "vikash@corp.com",
        phone: "+91 76543 21098",
        company: "Corporate Inc",
        value: 75000,
        source: "Cold Call",
        assignedTo: "Neha Agarwal",
        createdAt: "2024-01-13",
        notes: "Had initial discussion, interested",
      },
    ],
  },
  {
    id: "qualified",
    name: "Qualified",
    color: "bg-orange-500",
    leads: [
      {
        id: "4",
        name: "Sunita Reddy",
        email: "sunita@business.com",
        phone: "+91 65432 10987",
        company: "Business Solutions",
        value: 100000,
        source: "LinkedIn",
        assignedTo: "Rohit Verma",
        createdAt: "2024-01-12",
        notes: "Budget confirmed, decision maker identified",
      },
    ],
  },
  {
    id: "proposal",
    name: "Proposal Sent",
    color: "bg-purple-500",
    leads: [
      {
        id: "5",
        name: "Manoj Singh",
        email: "manoj@enterprise.com",
        phone: "+91 54321 09876",
        company: "Enterprise Ltd",
        value: 150000,
        source: "Trade Show",
        assignedTo: "Kavya Sharma",
        createdAt: "2024-01-11",
        notes: "Proposal sent, awaiting response",
      },
    ],
  },
  {
    id: "won",
    name: "Won",
    color: "bg-green-500",
    leads: [
      {
        id: "6",
        name: "Deepak Joshi",
        email: "deepak@success.com",
        phone: "+91 43210 98765",
        company: "Success Corp",
        value: 80000,
        source: "Website",
        assignedTo: "Priya Singh",
        createdAt: "2024-01-10",
        notes: "Deal closed successfully",
      },
    ],
  },
  {
    id: "lost",
    name: "Lost",
    color: "bg-red-500",
    leads: [],
  },
]

export default function LeadsPage() {
  const [stages, setStages] = useState(initialStages)
  const [searchTerm, setSearchTerm] = useState("")
  const [draggedLead, setDraggedLead] = useState(null)
  const [draggedFromStage, setDraggedFromStage] = useState(null)
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false)
  const [newLead, setNewLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    value: 0,
    source: "",
    assignedTo: "",
    notes: "",
  })

  const [selectedLead, setSelectedLead] = useState(null)
  const [isLeadDetailOpen, setIsLeadDetailOpen] = useState(false)
  const [editingLead, setEditingLead] = useState({})

  const dragCounter = useRef(0)

  const handleDragStart = (lead, stageId) => {
    setDraggedLead(lead)
    setDraggedFromStage(stageId)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    dragCounter.current++
    e.currentTarget.classList.add("bg-gray-100", "border-dashed", "border-2", "border-gray-400")
  }

  const handleDragLeave = (e) => {
    dragCounter.current--
    if (dragCounter.current === 0) {
      e.currentTarget.classList.remove("bg-gray-100", "border-dashed", "border-2", "border-gray-400")
    }
  }

  const handleDrop = (e, targetStageId) => {
    e.preventDefault()
    dragCounter.current = 0
    e.currentTarget.classList.remove("bg-gray-100", "border-dashed", "border-2", "border-gray-400")

    if (!draggedLead || !draggedFromStage || draggedFromStage === targetStageId) {
      return
    }

    setStages((prevStages) => {
      const newStages = prevStages.map((stage) => {
        if (stage.id === draggedFromStage) {
          return {
            ...stage,
            leads: stage.leads.filter((lead) => lead.id !== draggedLead.id),
          }
        }
        if (stage.id === targetStageId) {
          return {
            ...stage,
            leads: [...stage.leads, draggedLead],
          }
        }
        return stage
      })
      return newStages
    })

    setDraggedLead(null)
    setDraggedFromStage(null)
  }

  const handleAddLead = () => {
    if (!newLead.name || !newLead.email) return

    const lead = {
      id: Date.now().toString(),
      name: newLead.name || "",
      email: newLead.email || "",
      phone: newLead.phone || "",
      company: newLead.company || "",
      value: newLead.value || 0,
      source: newLead.source || "",
      assignedTo: newLead.assignedTo || "",
      createdAt: new Date().toISOString().split("T")[0],
      notes: newLead.notes || "",
    }

    setStages((prevStages) =>
      prevStages.map((stage) => (stage.id === "new" ? { ...stage, leads: [...stage.leads, lead] } : stage)),
    )

    setNewLead({
      name: "",
      email: "",
      phone: "",
      company: "",
      value: 0,
      source: "",
      assignedTo: "",
      notes: "",
    })
    setIsAddLeadOpen(false)
  }

  const handleLeadClick = (lead, stageId) => {
    setSelectedLead({ ...lead, stageId })
    setEditingLead({ ...lead })
    setIsLeadDetailOpen(true)
  }

  const handleSaveLead = () => {
    if (!editingLead.name || !editingLead.email) return

    setStages((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        leads: stage.leads.map((lead) => (lead.id === editingLead.id ? { ...editingLead } : lead)),
      })),
    )

    setIsLeadDetailOpen(false)
    setSelectedLead(null)
    setEditingLead({})
  }

  const handleDeleteLead = () => {
    if (!selectedLead) return

    setStages((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        leads: stage.leads.filter((lead) => lead.id !== selectedLead.id),
      })),
    )

    setIsLeadDetailOpen(false)
    setSelectedLead(null)
    setEditingLead({})
  }

  const filteredStages = stages.map((stage) => ({
    ...stage,
    leads: stage.leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  }))

  const totalLeads = stages.reduce((total, stage) => total + stage.leads.length, 0)
  const totalValue = stages.reduce(
    (total, stage) => total + stage.leads.reduce((stageTotal, lead) => stageTotal + lead.value, 0),
    0,
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
              <p className="text-gray-600 mt-1">Track and manage your sales pipeline</p>
            </div>
            <button
              onClick={() => setIsAddLeadOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add New Lead
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <User className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">{totalLeads}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Value</p>
                  <p className="text-2xl font-bold text-gray-900">₹{totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{stages[0].leads.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {totalLeads > 0 ? Math.round((stages[4].leads.length / totalLeads) * 100) : 0}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          {filteredStages.map((stage) => (
            <div
              key={stage.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[600px]"
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, stage.id)}
            >
              <div className={`${stage.color} text-white p-4 rounded-t-lg`}>
                <h3 className="font-semibold text-sm">{stage.name}</h3>
                <p className="text-xs opacity-90">{stage.leads.length} leads</p>
              </div>

              <div className="p-4 space-y-3">
                {stage.leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-shadow"
                    draggable
                    onDragStart={() => handleDragStart(lead, stage.id)}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLeadClick(lead, stage.id)
                    }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                          {lead.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-900">{lead.name}</h4>
                          <p className="text-xs text-gray-500">{lead.company}</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail className="w-3 h-3 mr-1" />
                        <span className="truncate">{lead.email}</span>
                      </div>
                      {lead.phone && (
                        <div className="flex items-center text-xs text-gray-600">
                          <Phone className="w-3 h-3 mr-1" />
                          <span>{lead.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          ₹{lead.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-500">{lead.source}</span>
                      </div>
                      {lead.assignedTo && <div className="text-xs text-gray-600">Assigned to: {lead.assignedTo}</div>}
                      {lead.notes && <p className="text-xs text-gray-600 line-clamp-2">{lead.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Add Lead Modal */}
        {isAddLeadOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Add New Lead</h2>
                <button onClick={() => setIsAddLeadOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input
                    type="text"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="Enter lead name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="Enter phone number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <input
                    type="text"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="Enter company name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value (₹)</label>
                  <input
                    type="number"
                    value={newLead.value}
                    onChange={(e) => setNewLead({ ...newLead, value: Number.parseInt(e.target.value) || 0 })}
                    placeholder="Enter deal value"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                  <select
                    value={newLead.source}
                    onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Trade Show">Trade Show</option>
                    <option value="Email Campaign">Email Campaign</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                  <select
                    value={newLead.assignedTo}
                    onChange={(e) => setNewLead({ ...newLead, assignedTo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select team member</option>
                    <option value="Priya Singh">Priya Singh</option>
                    <option value="Amit Kumar">Amit Kumar</option>
                    <option value="Neha Agarwal">Neha Agarwal</option>
                    <option value="Rohit Verma">Rohit Verma</option>
                    <option value="Kavya Sharma">Kavya Sharma</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={newLead.notes}
                    onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                    placeholder="Add any notes about this lead"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleAddLead}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Add Lead
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Lead Detail Modal */}
        {isLeadDetailOpen && selectedLead && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Lead Details</h2>
                <button onClick={() => setIsLeadDetailOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={editingLead.name || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={editingLead.email || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={editingLead.phone || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={editingLead.company || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value (₹)</label>
                    <input
                      type="number"
                      value={editingLead.value || 0}
                      onChange={(e) => setEditingLead({ ...editingLead, value: Number.parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={editingLead.source || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, source: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select source</option>
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Trade Show">Trade Show</option>
                      <option value="Email Campaign">Email Campaign</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                    <select
                      value={editingLead.assignedTo || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, assignedTo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select team member</option>
                      <option value="Priya Singh">Priya Singh</option>
                      <option value="Amit Kumar">Amit Kumar</option>
                      <option value="Neha Agarwal">Neha Agarwal</option>
                      <option value="Rohit Verma">Rohit Verma</option>
                      <option value="Kavya Sharma">Kavya Sharma</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Stage</label>
                    <select
                      value={selectedLead.stageId || ""}
                      onChange={(e) => {
                        const newStageId = e.target.value
                        // Move lead to new stage
                        setStages((prevStages) => {
                          const newStages = prevStages.map((stage) => {
                            if (stage.id === selectedLead.stageId) {
                              return {
                                ...stage,
                                leads: stage.leads.filter((lead) => lead.id !== selectedLead.id),
                              }
                            }
                            if (stage.id === newStageId) {
                              return {
                                ...stage,
                                leads: [...stage.leads, editingLead],
                              }
                            }
                            return stage
                          })
                          return newStages
                        })
                        setSelectedLead({ ...selectedLead, stageId: newStageId })
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="new">New Leads</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="proposal">Proposal Sent</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created Date</label>
                    <input
                      type="date"
                      value={editingLead.createdAt || ""}
                      onChange={(e) => setEditingLead({ ...editingLead, createdAt: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lead ID</label>
                    <input
                      type="text"
                      value={editingLead.id || ""}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Notes Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={editingLead.notes || ""}
                  onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                  placeholder="Add any notes about this lead"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={handleDeleteLead}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Delete Lead
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsLeadDetailOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveLead}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
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
