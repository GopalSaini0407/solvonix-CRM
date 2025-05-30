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
} from "lucide-react"

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const accounts = [
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
  ]

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

  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.industry.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || account.type.toLowerCase() === filterType.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const AccountCard = ({ account }) => (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => setSelectedAccount(account)}
    >
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
          <button className="text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
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
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
              <Edit className="w-4 h-4" />
              <span>Edit</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Accounts</h1>
                  <p className="text-gray-600 mt-1">Manage your company accounts and relationships</p>
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2">
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
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search accounts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
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

            {/* Accounts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAccounts.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
            </div>

            {filteredAccounts.length === 0 && (
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
      </div>
    </div>
  )
}
