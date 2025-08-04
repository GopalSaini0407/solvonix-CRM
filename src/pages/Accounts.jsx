"use client"

import { useState } from "react"
import {
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Phone,
  Mail,
  MapPin,
  Search,
  Plus,
  MoreVertical,
  CheckCircle,
  Clock,
  Target,
  Activity,
  FileText,
  Edit,
  ExternalLink,
  Download,
  Upload,
  SortAsc,
  Eye,
  Trash2,
  X,
  Save,
} from "lucide-react"

export default function AccountsPageComplete() {
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      name: "TechCorp Solutions",
      type: "Customer",
      industry: "Technology",
      revenue: "₹2.5Cr",
      employees: 250,
      location: "Mumbai, India",
      phone: "+91 98765 43210",
      email: "contact@techcorp.com",
      website: "www.techcorp.com",
      status: "Active",
      health: "Excellent",
      healthScore: 95,
      lastActivity: "2 hours ago",
      accountManager: "Rahul Sharma",
      opportunities: 5,
      totalValue: "₹45L",
      contacts: 8,
      activities: 23,
      nextMeeting: "Tomorrow 2:00 PM",
      description:
        "Leading technology solutions provider specializing in enterprise software development and digital transformation.",
      tags: ["Enterprise", "Technology", "High Value"],
      parentAccount: null,
      childAccounts: 2,
    },
    {
      id: 2,
      name: "Global Manufacturing Ltd",
      type: "Prospect",
      industry: "Manufacturing",
      revenue: "₹5.2Cr",
      employees: 500,
      location: "Chennai, India",
      phone: "+91 98765 43211",
      email: "info@globalmanuf.com",
      website: "www.globalmanuf.com",
      status: "Prospect",
      health: "Good",
      healthScore: 78,
      lastActivity: "1 day ago",
      accountManager: "Priya Patel",
      opportunities: 3,
      totalValue: "₹32L",
      contacts: 5,
      activities: 15,
      nextMeeting: "Friday 10:00 AM",
      description:
        "Large-scale manufacturing company looking to modernize their production systems and implement IoT solutions.",
      tags: ["Manufacturing", "IoT", "Prospect"],
      parentAccount: null,
      childAccounts: 0,
    },
    {
      id: 3,
      name: "FinanceFirst Bank",
      type: "Customer",
      industry: "Banking",
      revenue: "₹12.8Cr",
      employees: 1200,
      location: "Delhi, India",
      phone: "+91 98765 43212",
      email: "partnerships@financefirst.com",
      website: "www.financefirst.com",
      status: "Active",
      health: "Excellent",
      healthScore: 92,
      lastActivity: "3 hours ago",
      accountManager: "Amit Kumar",
      opportunities: 7,
      totalValue: "₹78L",
      contacts: 12,
      activities: 34,
      nextMeeting: "Today 4:00 PM",
      description: "Premier banking institution seeking advanced fintech solutions and digital banking platforms.",
      tags: ["Banking", "Fintech", "Enterprise"],
      parentAccount: null,
      childAccounts: 5,
    },
    {
      id: 4,
      name: "HealthCare Plus",
      type: "Customer",
      industry: "Healthcare",
      revenue: "₹3.8Cr",
      employees: 350,
      location: "Bangalore, India",
      phone: "+91 98765 43213",
      email: "tech@healthcareplus.com",
      website: "www.healthcareplus.com",
      status: "Active",
      health: "Warning",
      healthScore: 65,
      lastActivity: "5 days ago",
      accountManager: "Sneha Reddy",
      opportunities: 2,
      totalValue: "₹18L",
      contacts: 6,
      activities: 12,
      nextMeeting: "Next Week",
      description: "Healthcare provider implementing digital health records and telemedicine solutions.",
      tags: ["Healthcare", "Digital Health", "Telemedicine"],
      parentAccount: null,
      childAccounts: 1,
    },
    {
      id: 5,
      name: "EduTech Innovations",
      type: "Partner",
      industry: "Education",
      revenue: "₹1.2Cr",
      employees: 85,
      location: "Pune, India",
      phone: "+91 98765 43214",
      email: "partnerships@edutech.com",
      website: "www.edutech.com",
      status: "Partner",
      health: "Good",
      healthScore: 82,
      lastActivity: "1 day ago",
      accountManager: "Vikash Singh",
      opportunities: 4,
      totalValue: "₹25L",
      contacts: 4,
      activities: 18,
      nextMeeting: "Thursday 11:00 AM",
      description: "Educational technology company developing e-learning platforms and virtual classroom solutions.",
      tags: ["Education", "E-learning", "Partnership"],
      parentAccount: null,
      childAccounts: 0,
    },
    {
      id: 6,
      name: "RetailMax Chain",
      type: "Prospect",
      industry: "Retail",
      revenue: "₹8.5Cr",
      employees: 750,
      location: "Kolkata, India",
      phone: "+91 98765 43215",
      email: "digital@retailmax.com",
      website: "www.retailmax.com",
      status: "Prospect",
      health: "Fair",
      healthScore: 58,
      lastActivity: "1 week ago",
      accountManager: "Ravi Gupta",
      opportunities: 1,
      totalValue: "₹12L",
      contacts: 3,
      activities: 8,
      nextMeeting: "To be scheduled",
      description: "Large retail chain looking to implement omnichannel solutions and inventory management systems.",
      tags: ["Retail", "Omnichannel", "Inventory"],
      parentAccount: null,
      childAccounts: 3,
    },
  ])

  const [selectedAccount, setSelectedAccount] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "Customer",
    industry: "",
    revenue: "",
    employees: "",
    location: "",
    phone: "",
    email: "",
    website: "",
    status: "Active",
    health: "Good",
    healthScore: 75,
    accountManager: "",
    opportunities: 0,
    totalValue: "",
    contacts: 0,
    activities: 0,
    nextMeeting: "",
    description: "",
    tags: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      type: "Customer",
      industry: "",
      revenue: "",
      employees: "",
      location: "",
      phone: "",
      email: "",
      website: "",
      status: "Active",
      health: "Good",
      healthScore: 75,
      accountManager: "",
      opportunities: 0,
      totalValue: "",
      contacts: 0,
      activities: 0,
      nextMeeting: "",
      description: "",
      tags: "",
    })
  }

  const getHealthColor = (health) => {
    switch (health) {
      case "Excellent":
        return "text-green-600 bg-green-100"
      case "Good":
        return "text-blue-600 bg-blue-100"
      case "Warning":
        return "text-yellow-600 bg-yellow-100"
      case "Fair":
        return "text-orange-600 bg-orange-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "text-green-600 bg-green-100"
      case "Prospect":
        return "text-blue-600 bg-blue-100"
      case "Partner":
        return "text-purple-600 bg-purple-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  // Button action handlers
  const handleAddAccount = () => {
    resetForm()
    setShowAddModal(true)
  }

  const handleEditAccount = (account) => {
    setEditingAccount(account)
    setFormData({
      name: account.name,
      type: account.type,
      industry: account.industry,
      revenue: account.revenue,
      employees: account.employees.toString(),
      location: account.location,
      phone: account.phone,
      email: account.email,
      website: account.website,
      status: account.status,
      health: account.health,
      healthScore: account.healthScore,
      accountManager: account.accountManager,
      opportunities: account.opportunities,
      totalValue: account.totalValue,
      contacts: account.contacts,
      activities: account.activities,
      nextMeeting: account.nextMeeting,
      description: account.description,
      tags: account.tags.join(", "),
    })
    setShowEditModal(true)
  }

  const handleSaveAccount = () => {
    const newAccount = {
      id: accounts.length + 1,
      name: formData.name,
      type: formData.type,
      industry: formData.industry,
      revenue: formData.revenue,
      employees: Number.parseInt(formData.employees) || 0,
      location: formData.location,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      status: formData.status,
      health: formData.health,
      healthScore: formData.healthScore,
      lastActivity: "Just now",
      accountManager: formData.accountManager,
      opportunities: Number.parseInt(formData.opportunities) || 0,
      totalValue: formData.totalValue,
      contacts: Number.parseInt(formData.contacts) || 0,
      activities: Number.parseInt(formData.activities) || 0,
      nextMeeting: formData.nextMeeting,
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      parentAccount: null,
      childAccounts: 0,
    }

    setAccounts([...accounts, newAccount])
    setShowAddModal(false)
    resetForm()
  }

  const handleUpdateAccount = () => {
    const updatedAccount = {
      ...editingAccount,
      name: formData.name,
      type: formData.type,
      industry: formData.industry,
      revenue: formData.revenue,
      employees: Number.parseInt(formData.employees) || 0,
      location: formData.location,
      phone: formData.phone,
      email: formData.email,
      website: formData.website,
      status: formData.status,
      health: formData.health,
      healthScore: formData.healthScore,
      accountManager: formData.accountManager,
      opportunities: Number.parseInt(formData.opportunities) || 0,
      totalValue: formData.totalValue,
      contacts: Number.parseInt(formData.contacts) || 0,
      activities: Number.parseInt(formData.activities) || 0,
      nextMeeting: formData.nextMeeting,
      description: formData.description,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    }

    setAccounts(accounts.map((account) => (account.id === editingAccount.id ? updatedAccount : account)))
    setShowEditModal(false)
    setEditingAccount(null)
    resetForm()

    // Update selected account if it's currently being viewed
    if (selectedAccount && selectedAccount.id === editingAccount.id) {
      setSelectedAccount(updatedAccount)
    }
  }

  const handleDeleteAccount = (accountToDelete) => {
    if (confirm(`Are you sure you want to delete ${accountToDelete.name}?`)) {
      setAccounts(accounts.filter((account) => account.id !== accountToDelete.id))
      if (selectedAccount && selectedAccount.id === accountToDelete.id) {
        setSelectedAccount(null)
      }
    }
  }

  const handleExport = () => {
    const csvContent = [
      ["Name", "Type", "Industry", "Revenue", "Employees", "Location", "Phone", "Email", "Status", "Health Score"],
      ...accounts.map((account) => [
        account.name,
        account.type,
        account.industry,
        account.revenue,
        account.employees,
        account.location,
        account.phone,
        account.email,
        account.status,
        account.healthScore,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "accounts.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleVisitWebsite = (account) => {
    if (account.website) {
      window.open(`https://${account.website}`, "_blank")
    }
  }

  const handleAddContact = () => {
    alert("Add Contact functionality would open a form/modal here")
  }

  const handleAddOpportunity = () => {
    alert("Add Opportunity functionality would open a form/modal here")
  }

  const handleLogActivity = () => {
    alert("Log Activity functionality would open a form/modal here")
  }

  const handleUploadDocument = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.multiple = true
    input.accept = ".pdf,.doc,.docx,.txt,.jpg,.png"
    input.onchange = (e) => {
      const files = Array.from(e.target.files)
      alert(`Selected ${files.length} file(s): ${files.map((f) => f.name).join(", ")}`)
    }
    input.click()
  }

  // Sorting and filtering
  const sortedAndFilteredAccounts = accounts
    .filter((account) => {
      const matchesSearch =
        account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.industry.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filterType === "all" || account.type.toLowerCase() === filterType.toLowerCase()
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "revenue" || sortBy === "totalValue") {
        aValue = Number.parseFloat(aValue.replace(/[₹Cr L]/g, ""))
        bValue = Number.parseFloat(bValue.replace(/[₹Cr L]/g, ""))
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  }

  // Form Component
  const AccountForm = ({ onSave, onCancel, isEdit = false }) => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter account name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Customer">Customer</option>
            <option value="Prospect">Prospect</option>
            <option value="Partner">Partner</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Technology, Healthcare"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue</label>
          <input
            type="text"
            value={formData.revenue}
            onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., ₹2.5Cr"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees</label>
          <input
            type="number"
            value={formData.employees}
            onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., 250"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Mumbai, India"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="+91 98765 43210"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="contact@company.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="www.company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Active">Active</option>
            <option value="Prospect">Prospect</option>
            <option value="Partner">Partner</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Health</label>
          <select
            value={formData.health}
            onChange={(e) => setFormData({ ...formData, health: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Warning">Warning</option>
            <option value="Fair">Fair</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Health Score (0-100)</label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.healthScore}
            onChange={(e) => setFormData({ ...formData, healthScore: Number.parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="text-center text-sm text-gray-600 mt-1">{formData.healthScore}%</div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Account Manager</label>
          <input
            type="text"
            value={formData.accountManager}
            onChange={(e) => setFormData({ ...formData, accountManager: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Manager name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Total Pipeline Value</label>
          <input
            type="text"
            value={formData.totalValue}
            onChange={(e) => setFormData({ ...formData, totalValue: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., ₹45L"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Next Meeting</label>
          <input
            type="text"
            value={formData.nextMeeting}
            onChange={(e) => setFormData({ ...formData, nextMeeting: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="e.g., Tomorrow 2:00 PM"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the account..."
        />
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma separated)</label>
        <input
          type="text"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., Enterprise, Technology, High Value"
        />
      </div>

      <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-[#ef6d8d] hover:bg-[#ff3466] text-white rounded-lg flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isEdit ? "Update Account" : "Save Account"}</span>
        </button>
      </div>
    </div>
  )

  const AccountCard = ({ account }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
            <p className="text-sm text-gray-500">{account.industry}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account.status)}`}>
            {account.status}
          </span>
          <div className="relative group">
            <button className="text-gray-400 hover:text-gray-600">
              <MoreVertical className="w-4 h-4" />
            </button>
            <div className="absolute right-0 top-6 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <button
                onClick={() => setSelectedAccount(account)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
              </button>
              <button
                onClick={() => handleEditAccount(account)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => handleDeleteAccount(account)}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">Revenue: {account.revenue}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{account.employees} employees</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{account.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">{account.opportunities} opportunities</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-3">
        <span className="text-sm text-gray-600">Account Health</span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(account.health)}`}>
          {account.health}
        </span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full ${
            account.healthScore >= 90
              ? "bg-green-500"
              : account.healthScore >= 70
                ? "bg-blue-500"
                : account.healthScore >= 50
                  ? "bg-yellow-500"
                  : "bg-red-500"
          }`}
          style={{ width: `${account.healthScore}%` }}
        ></div>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Manager: {account.accountManager}</span>
        <span>Value: {account.totalValue}</span>
      </div>
    </div>
  )

  const AccountTable = () => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => {
                    setSortBy("name")
                    setSortOrder(sortBy === "name" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Account</span>
                  <SortAsc className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type & Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => {
                    setSortBy("revenue")
                    setSortOrder(sortBy === "revenue" && sortOrder === "asc" ? "desc" : "asc")
                  }}
                  className="flex items-center space-x-1 hover:text-gray-700"
                >
                  <span>Revenue</span>
                  <SortAsc className="w-3 h-3" />
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Opportunities
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedAndFilteredAccounts.map((account) => (
              <tr key={account.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <Building2 className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">{account.name}</div>
                      <div className="text-sm text-gray-500">{account.industry}</div>
                      <div className="text-sm text-gray-500">{account.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(account.status)}`}
                    >
                      {account.status}
                    </span>
                    <div className="text-sm text-gray-500">{account.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{account.revenue}</div>
                  <div className="text-sm text-gray-500">{account.employees} employees</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      <div
                        className={`h-2 rounded-full ${
                          account.healthScore >= 90
                            ? "bg-green-500"
                            : account.healthScore >= 70
                              ? "bg-blue-500"
                              : account.healthScore >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                        }`}
                        style={{ width: `${account.healthScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{account.healthScore}%</span>
                  </div>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getHealthColor(account.health)}`}
                  >
                    {account.health}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{account.accountManager}</div>
                  <div className="text-sm text-gray-500">{account.lastActivity}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{account.opportunities}</div>
                  <div className="text-sm text-gray-500">{account.totalValue}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setSelectedAccount(account)} className="text-blue-600 hover:text-blue-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleEditAccount(account)} className="text-gray-600 hover:text-gray-900">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleVisitWebsite(account)} className="text-gray-600 hover:text-gray-900">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  const AccountDetails = ({ account }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{account.name}</h2>
              <p className="text-gray-500">
                {account.industry} • {account.location}
              </p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(account.status)}`}>
                  {account.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getHealthColor(account.health)}`}>
                  Health: {account.health}
                </span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handleEditAccount(account)}
              className="px-4 py-2 bg-[#ef6d8d] hover:bg-[#ff3466] text-white rounded-lg flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => handleVisitWebsite(account)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Website</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: "overview", label: "Overview", icon: Building2 },
            { id: "contacts", label: "Contacts", icon: Users },
            { id: "opportunities", label: "Opportunities", icon: Target },
            { id: "activities", label: "Activities", icon: Activity },
            { id: "documents", label: "Documents", icon: FileText },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Annual Revenue</p>
                    <p className="text-2xl font-bold text-blue-900">{account.revenue}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Pipeline Value</p>
                    <p className="text-2xl font-bold text-green-900">{account.totalValue}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Opportunities</p>
                    <p className="text-2xl font-bold text-purple-900">{account.opportunities}</p>
                  </div>
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Contacts</p>
                    <p className="text-2xl font-bold text-orange-900">{account.contacts}</p>
                  </div>
                  <Users className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{account.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{account.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{account.location}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{account.employees} employees</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Account Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Account Manager</span>
                    <p className="text-gray-900">{account.accountManager}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Last Activity</span>
                    <p className="text-gray-900">{account.lastActivity}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Next Meeting</span>
                    <p className="text-gray-900">{account.nextMeeting}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Health Score</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            account.healthScore >= 90
                              ? "bg-green-500"
                              : account.healthScore >= 70
                                ? "bg-blue-500"
                                : account.healthScore >= 50
                                  ? "bg-yellow-500"
                                  : "bg-red-500"
                          }`}
                          style={{ width: `${account.healthScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{account.healthScore}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600">{account.description}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {account.tags.map((tag, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Contacts ({account.contacts})</h3>
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-[#ef6d8d] hover:bg-[#ff3466] text-white rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Contact</span>
              </button>
            </div>
            <div className="text-gray-500 text-center py-8">Contact management interface would be implemented here</div>
          </div>
        )}

        {activeTab === "opportunities" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Opportunities ({account.opportunities})</h3>
              <button
                onClick={handleAddOpportunity}
                className="px-4 py-2 bg-[#ef6d8d] hover:bg-[#ff3466] text-white rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Opportunity</span>
              </button>
            </div>
            <div className="text-gray-500 text-center py-8">
              Opportunities management interface would be implemented here
            </div>
          </div>
        )}

        {activeTab === "activities" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Activities ({account.activities})</h3>
              <button
                onClick={handleLogActivity}
                className="px-4 py-2 bg-[#ef6d8d] hover:bg-[#ff3466] text-white rounded-lg flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Log Activity</span>
              </button>
            </div>
            <div className="text-gray-500 text-center py-8">Activity timeline would be implemented here</div>
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
              <button
                onClick={handleUploadDocument}
                className="px-4 py-2 bg-[#ef6d8d] hover:bg-[#ff3466] text-white rounded-lg flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Document</span>
              </button>
            </div>
            <div className="text-gray-500 text-center py-8">
              Document management interface would be implemented here
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {!selectedAccount ? (
          <>
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
                  <p className="text-gray-600 mt-1">Manage your company accounts and relationships</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleExport}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={handleAddAccount}
                    className="px-4 py-2 bg-[#ef6d8d] hover:bg-[#ff3466] text-white rounded-lg flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Account</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Accounts</p>
                    <p className="text-3xl font-bold text-gray-900">{accounts.length}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Customers</p>
                    <p className="text-3xl font-bold text-green-600">
                      {accounts.filter((a) => a.status === "Active").length}
                    </p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Prospects</p>
                    <p className="text-3xl font-bold text-blue-600">
                      {accounts.filter((a) => a.status === "Prospect").length}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
                    <p className="text-3xl font-bold text-purple-600">₹2.1Cr</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 flex-wrap gap-3 sm:gap-0">
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 w-[100%] sm:w-full rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="customer">Customers</option>
                    <option value="prospect">Prospects</option>
                    <option value="partner">Partners</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                      <div className="bg-current rounded-sm"></div>
                    </div>
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-2 rounded-lg ${viewMode === "table" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
                  >
                    <div className="w-4 h-4 space-y-1">
                      <div className="bg-current h-0.5 rounded"></div>
                      <div className="bg-current h-0.5 rounded"></div>
                      <div className="bg-current h-0.5 rounded"></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Accounts Display */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedAndFilteredAccounts.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            ) : (
              <AccountTable />
            )}

            {sortedAndFilteredAccounts.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No accounts found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => setSelectedAccount(null)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <span>←</span>
                <span>Back to Accounts</span>
              </button>
            </div>

            {/* Account Details */}
            <AccountDetails account={selectedAccount} />
          </>
        )}

        {/* Add Account Modal */}
        <Modal
          isOpen={showAddModal}
          onClose={() => {
            setShowAddModal(false)
            resetForm()
          }}
          title="Add New Account"
        >
          <AccountForm
            onSave={handleSaveAccount}
            onCancel={() => {
              setShowAddModal(false)
              resetForm()
            }}
          />
        </Modal>

        {/* Edit Account Modal */}
        <Modal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false)
            setEditingAccount(null)
            resetForm()
          }}
          title="Edit Account"
        >
          <AccountForm
            onSave={handleUpdateAccount}
            onCancel={() => {
              setShowEditModal(false)
              setEditingAccount(null)
              resetForm()
            }}
            isEdit={true}
          />
        </Modal>
      </div>
    </div>
  )
}
