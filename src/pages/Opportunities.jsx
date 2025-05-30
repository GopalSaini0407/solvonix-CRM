"use client"

import { useState, useRef } from "react"
import {
  Search,
  Plus,
  Grid3X3,
  List,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  User,
  Building,
  TrendingUp,
  Clock,
  Target,
  Award,
  X,
  Eye,
  Phone,
  Mail,
  FileText,
  BarChart3,
} from "lucide-react"

const OpportunitiesPage = () => {
  const [viewMode, setViewMode] = useState("pipeline") // pipeline, grid, list
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedOpportunities, setSelectedOpportunities] = useState([])
  const [isAddOpportunityOpen, setIsAddOpportunityOpen] = useState(false)
  const [isOpportunityDetailOpen, setIsOpportunityDetailOpen] = useState(false)
  const [selectedOpportunity, setSelectedOpportunity] = useState(null)
  const [editingOpportunity, setEditingOpportunity] = useState({})
  const [draggedOpportunity, setDraggedOpportunity] = useState(null)
  const [draggedFromStage, setDraggedFromStage] = useState(null)

  const dragCounter = useRef(0)

  const [stages, setStages] = useState([
    {
      id: "prospecting",
      name: "Prospecting",
      color: "bg-blue-500",
      opportunities: [
        {
          id: 1,
          name: "Enterprise Software Solution",
          company: "Tech Solutions Pvt Ltd",
          contact: "Rajesh Kumar",
          value: 500000,
          probability: 20,
          expectedCloseDate: "2024-03-15",
          createdDate: "2024-01-10",
          source: "Website",
          assignedTo: "Priya Singh",
          description: "Complete enterprise software solution for inventory management",
          stage: "prospecting",
          priority: "high",
          tags: ["Enterprise", "Software"],
          activities: [
            { type: "call", date: "2024-01-15", note: "Initial discovery call completed" },
            { type: "email", date: "2024-01-12", note: "Sent company brochure" },
          ],
        },
        {
          id: 2,
          name: "Digital Marketing Campaign",
          company: "StartupXYZ",
          contact: "Amit Patel",
          value: 150000,
          probability: 15,
          expectedCloseDate: "2024-02-28",
          createdDate: "2024-01-08",
          source: "Referral",
          assignedTo: "Amit Kumar",
          description: "6-month digital marketing campaign for brand awareness",
          stage: "prospecting",
          priority: "medium",
          tags: ["Marketing", "Digital"],
          activities: [{ type: "meeting", date: "2024-01-14", note: "Requirements gathering session" }],
        },
      ],
    },
    {
      id: "qualification",
      name: "Qualification",
      color: "bg-yellow-500",
      opportunities: [
        {
          id: 3,
          name: "CRM Implementation",
          company: "Corporate Inc",
          contact: "Vikash Patel",
          value: 300000,
          probability: 40,
          expectedCloseDate: "2024-04-10",
          createdDate: "2024-01-05",
          source: "Cold Call",
          assignedTo: "Neha Agarwal",
          description: "Custom CRM implementation with integrations",
          stage: "qualification",
          priority: "high",
          tags: ["CRM", "Implementation"],
          activities: [
            { type: "demo", date: "2024-01-13", note: "Product demo completed" },
            { type: "call", date: "2024-01-10", note: "Budget discussion" },
          ],
        },
      ],
    },
    {
      id: "proposal",
      name: "Proposal",
      color: "bg-orange-500",
      opportunities: [
        {
          id: 4,
          name: "Cloud Infrastructure Setup",
          company: "Business Solutions",
          contact: "Sunita Reddy",
          value: 750000,
          probability: 60,
          expectedCloseDate: "2024-03-20",
          createdDate: "2024-01-03",
          source: "LinkedIn",
          assignedTo: "Rohit Verma",
          description: "Complete cloud infrastructure migration and setup",
          stage: "proposal",
          priority: "high",
          tags: ["Cloud", "Infrastructure"],
          activities: [
            { type: "proposal", date: "2024-01-11", note: "Technical proposal submitted" },
            { type: "meeting", date: "2024-01-09", note: "Technical requirements review" },
          ],
        },
      ],
    },
    {
      id: "negotiation",
      name: "Negotiation",
      color: "bg-purple-500",
      opportunities: [
        {
          id: 5,
          name: "Mobile App Development",
          company: "Enterprise Ltd",
          contact: "Manoj Singh",
          value: 400000,
          probability: 80,
          expectedCloseDate: "2024-02-15",
          createdDate: "2024-01-01",
          source: "Trade Show",
          assignedTo: "Kavya Sharma",
          description: "Native mobile app development for iOS and Android",
          stage: "negotiation",
          priority: "high",
          tags: ["Mobile", "Development"],
          activities: [
            { type: "negotiation", date: "2024-01-12", note: "Contract terms discussion" },
            { type: "call", date: "2024-01-08", note: "Pricing negotiation" },
          ],
        },
      ],
    },
    {
      id: "closed-won",
      name: "Closed Won",
      color: "bg-green-500",
      opportunities: [
        {
          id: 6,
          name: "Website Redesign",
          company: "Success Corp",
          contact: "Deepak Joshi",
          value: 200000,
          probability: 100,
          expectedCloseDate: "2024-01-30",
          createdDate: "2023-12-15",
          source: "Website",
          assignedTo: "Priya Singh",
          description: "Complete website redesign with modern UI/UX",
          stage: "closed-won",
          priority: "medium",
          tags: ["Website", "Design"],
          activities: [
            { type: "contract", date: "2024-01-14", note: "Contract signed" },
            { type: "meeting", date: "2024-01-10", note: "Final approval meeting" },
          ],
        },
      ],
    },
    {
      id: "closed-lost",
      name: "Closed Lost",
      color: "bg-red-500",
      opportunities: [],
    },
  ])

  const [newOpportunity, setNewOpportunity] = useState({
    name: "",
    company: "",
    contact: "",
    value: 0,
    probability: 0,
    expectedCloseDate: "",
    source: "",
    assignedTo: "",
    description: "",
    priority: "medium",
    tags: [],
  })

  // Calculate metrics
  const allOpportunities = stages.flatMap((stage) => stage.opportunities)
  const totalValue = allOpportunities.reduce((sum, opp) => sum + opp.value, 0)
  const weightedValue = allOpportunities.reduce((sum, opp) => sum + (opp.value * opp.probability) / 100, 0)
  const avgDealSize = allOpportunities.length > 0 ? totalValue / allOpportunities.length : 0
  const winRate =
    allOpportunities.length > 0
      ? ((stages.find((s) => s.id === "closed-won")?.opportunities.length || 0) / allOpportunities.length) * 100
      : 0

  const handleDragStart = (opportunity, stageId) => {
    setDraggedOpportunity(opportunity)
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

    if (!draggedOpportunity || !draggedFromStage || draggedFromStage === targetStageId) {
      return
    }

    setStages((prevStages) => {
      const newStages = prevStages.map((stage) => {
        if (stage.id === draggedFromStage) {
          return {
            ...stage,
            opportunities: stage.opportunities.filter((opp) => opp.id !== draggedOpportunity.id),
          }
        }
        if (stage.id === targetStageId) {
          return {
            ...stage,
            opportunities: [...stage.opportunities, { ...draggedOpportunity, stage: targetStageId }],
          }
        }
        return stage
      })
      return newStages
    })

    setDraggedOpportunity(null)
    setDraggedFromStage(null)
  }

  const handleOpportunityClick = (opportunity) => {
    setSelectedOpportunity(opportunity)
    setEditingOpportunity({ ...opportunity })
    setIsOpportunityDetailOpen(true)
  }

  const handleAddOpportunity = () => {
    if (!newOpportunity.name || !newOpportunity.company) return

    const opportunity = {
      id: Date.now(),
      ...newOpportunity,
      createdDate: new Date().toISOString().split("T")[0],
      stage: "prospecting",
      activities: [],
    }

    setStages((prevStages) =>
      prevStages.map((stage) =>
        stage.id === "prospecting" ? { ...stage, opportunities: [...stage.opportunities, opportunity] } : stage,
      ),
    )

    setNewOpportunity({
      name: "",
      company: "",
      contact: "",
      value: 0,
      probability: 0,
      expectedCloseDate: "",
      source: "",
      assignedTo: "",
      description: "",
      priority: "medium",
      tags: [],
    })
    setIsAddOpportunityOpen(false)
  }

  const handleSaveOpportunity = () => {
    setStages((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        opportunities: stage.opportunities.map((opp) => (opp.id === editingOpportunity.id ? editingOpportunity : opp)),
      })),
    )
    setIsOpportunityDetailOpen(false)
  }

  const handleDeleteOpportunity = (opportunityId) => {
    setStages((prevStages) =>
      prevStages.map((stage) => ({
        ...stage,
        opportunities: stage.opportunities.filter((opp) => opp.id !== opportunityId),
      })),
    )
    setIsOpportunityDetailOpen(false)
  }

  const filteredStages = stages.map((stage) => ({
    ...stage,
    opportunities: stage.opportunities.filter((opp) => {
      const matchesSearch =
        opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.contact.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStage = selectedStage === "all" || stage.id === selectedStage

      return matchesSearch && matchesStage
    }),
  }))

  const getPriorityColor = (priority) => {
    const colors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800",
    }
    return colors[priority] || "bg-gray-100 text-gray-800"
  }

  const getActivityIcon = (type) => {
    const icons = {
      call: <Phone className="w-3 h-3" />,
      email: <Mail className="w-3 h-3" />,
      meeting: <Calendar className="w-3 h-3" />,
      demo: <Eye className="w-3 h-3" />,
      proposal: <FileText className="w-3 h-3" />,
      negotiation: <Target className="w-3 h-3" />,
      contract: <Award className="w-3 h-3" />,
    }
    return icons[type] || <Clock className="w-3 h-3" />
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Opportunities</h1>
              <p className="text-gray-600 mt-1">Track and manage your sales pipeline</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Analytics
              </button>
              <button
                onClick={() => setIsAddOpportunityOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Opportunity
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(totalValue / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Weighted Pipeline</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(weightedValue / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
                  <p className="text-2xl font-bold text-gray-900">₹{(avgDealSize / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-orange-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Win Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{winRate.toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search opportunities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Stages</option>
                {stages.map((stage) => (
                  <option key={stage.id} value={stage.id}>
                    {stage.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode("pipeline")}
                  className={`px-3 py-2 text-sm ${viewMode === "pipeline" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                >
                  Pipeline
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400"}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pipeline View */}
        {viewMode === "pipeline" && (
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
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs opacity-90">{stage.opportunities.length} deals</p>
                    <p className="text-xs opacity-90">
                      ₹{(stage.opportunities.reduce((sum, opp) => sum + opp.value, 0) / 100000).toFixed(1)}L
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {stage.opportunities.map((opportunity) => (
                    <div
                      key={opportunity.id}
                      className="bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md transition-shadow"
                      draggable
                      onDragStart={() => handleDragStart(opportunity, stage.id)}
                      onClick={(e) => {
                        e.preventDefault()
                        handleOpportunityClick(opportunity)
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-sm text-gray-900 line-clamp-2">{opportunity.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(opportunity.priority)}`}>
                          {opportunity.priority}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-xs text-gray-600">
                          <Building className="w-3 h-3 mr-1" />
                          <span className="truncate">{opportunity.company}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <User className="w-3 h-3 mr-1" />
                          <span>{opportunity.contact}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-green-600">
                            ₹{(opportunity.value / 100000).toFixed(1)}L
                          </span>
                          <span className="text-xs text-gray-500">{opportunity.probability}%</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</span>
                        </div>
                        <div className="text-xs text-gray-600">Assigned to: {opportunity.assignedTo}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allOpportunities
              .filter((opp) => {
                const matchesSearch =
                  opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  opp.contact.toLowerCase().includes(searchTerm.toLowerCase())
                const matchesStage = selectedStage === "all" || opp.stage === selectedStage
                return matchesSearch && matchesStage
              })
              .map((opportunity) => (
                <div
                  key={opportunity.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleOpportunityClick(opportunity)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-semibold text-gray-900 line-clamp-2">{opportunity.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(opportunity.priority)}`}>
                      {opportunity.priority}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4" />
                      <span>{opportunity.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{opportunity.contact}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-green-600">
                        ₹{(opportunity.value / 100000).toFixed(1)}L
                      </span>
                      <span className="text-sm text-gray-500">{opportunity.probability}% probability</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Close: {new Date(opportunity.expectedCloseDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Stage:</span>
                      <span className="text-xs font-medium text-gray-900 capitalize">
                        {opportunity.stage.replace("-", " ")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Opportunity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Close Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {allOpportunities
                    .filter((opp) => {
                      const matchesSearch =
                        opp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        opp.contact.toLowerCase().includes(searchTerm.toLowerCase())
                      const matchesStage = selectedStage === "all" || opp.stage === selectedStage
                      return matchesSearch && matchesStage
                    })
                    .map((opportunity) => (
                      <tr key={opportunity.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-gray-900">{opportunity.name}</div>
                            <div className="text-sm text-gray-500">{opportunity.contact}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{opportunity.company}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-semibold text-green-600">
                            ₹{(opportunity.value / 100000).toFixed(1)}L
                          </div>
                          <div className="text-xs text-gray-500">{opportunity.probability}%</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 capitalize">
                            {opportunity.stage.replace("-", " ")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(opportunity.expectedCloseDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleOpportunityClick(opportunity)
                              }}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-600">
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

        {/* Add Opportunity Modal */}
        {isAddOpportunityOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add New Opportunity</h2>
                <button onClick={() => setIsAddOpportunityOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Name *</label>
                    <input
                      type="text"
                      value={newOpportunity.name}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company *</label>
                    <input
                      type="text"
                      value={newOpportunity.company}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                    <input
                      type="text"
                      value={newOpportunity.contact}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, contact: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value (₹)</label>
                    <input
                      type="number"
                      value={newOpportunity.value}
                      onChange={(e) =>
                        setNewOpportunity({ ...newOpportunity, value: Number.parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newOpportunity.probability}
                      onChange={(e) =>
                        setNewOpportunity({ ...newOpportunity, probability: Number.parseInt(e.target.value) || 0 })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
                    <input
                      type="date"
                      value={newOpportunity.expectedCloseDate}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, expectedCloseDate: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      value={newOpportunity.source}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, source: e.target.value })}
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
                      value={newOpportunity.assignedTo}
                      onChange={(e) => setNewOpportunity({ ...newOpportunity, assignedTo: e.target.value })}
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
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newOpportunity.description}
                  onChange={(e) => setNewOpportunity({ ...newOpportunity, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsAddOpportunityOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddOpportunity}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Opportunity
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Opportunity Detail Modal */}
        {isOpportunityDetailOpen && selectedOpportunity && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Opportunity Details</h2>
                <button onClick={() => setIsOpportunityDetailOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Opportunity Name</label>
                      <input
                        type="text"
                        value={editingOpportunity.name || ""}
                        onChange={(e) => setEditingOpportunity({ ...editingOpportunity, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={editingOpportunity.company || ""}
                        onChange={(e) => setEditingOpportunity({ ...editingOpportunity, company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                      <input
                        type="text"
                        value={editingOpportunity.contact || ""}
                        onChange={(e) => setEditingOpportunity({ ...editingOpportunity, contact: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Deal Value (₹)</label>
                      <input
                        type="number"
                        value={editingOpportunity.value || 0}
                        onChange={(e) =>
                          setEditingOpportunity({ ...editingOpportunity, value: Number.parseInt(e.target.value) || 0 })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editingOpportunity.probability || 0}
                        onChange={(e) =>
                          setEditingOpportunity({
                            ...editingOpportunity,
                            probability: Number.parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expected Close Date</label>
                      <input
                        type="date"
                        value={editingOpportunity.expectedCloseDate || ""}
                        onChange={(e) =>
                          setEditingOpportunity({ ...editingOpportunity, expectedCloseDate: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={editingOpportunity.description || ""}
                      onChange={(e) => setEditingOpportunity({ ...editingOpportunity, description: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Opportunity Summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Opportunity Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Value:</span>
                        <span className="font-semibold text-green-600">
                          ₹{(selectedOpportunity.value / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Probability:</span>
                        <span className="font-semibold">{selectedOpportunity.probability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Weighted Value:</span>
                        <span className="font-semibold">
                          ₹{((selectedOpportunity.value * selectedOpportunity.probability) / 100 / 100000).toFixed(1)}L
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Stage:</span>
                        <span className="font-semibold capitalize">{selectedOpportunity.stage.replace("-", " ")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activities */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recent Activities</h4>
                    <div className="space-y-3">
                      {selectedOpportunity.activities?.slice(0, 3).map((activity, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-blue-600">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{activity.note}</p>
                            <p className="text-xs text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      <Phone className="w-4 h-4" />
                      Schedule Call
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                      <Mail className="w-4 h-4" />
                      Send Email
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                      <FileText className="w-4 h-4" />
                      Create Proposal
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteOpportunity(selectedOpportunity.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Opportunity
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsOpportunityDetailOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveOpportunity}
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

export default OpportunitiesPage
