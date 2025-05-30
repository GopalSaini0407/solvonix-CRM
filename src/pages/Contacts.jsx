"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  Plus,
  Grid3X3,
  List,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Building,
  Calendar,
  Star,
  Download,
  Upload,
  X,
  User,
  Eye,
  MessageCircle,
  Clock,
} from "lucide-react"

const ContactsPage = () => {
  const [viewMode, setViewMode] = useState("grid") // grid or list
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedContacts, setSelectedContacts] = useState([])
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [editingContact, setEditingContact] = useState({})

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Rajesh Kumar",
      email: "rajesh@techsolutions.com",
      phone: "+91 98765 43210",
      company: "Tech Solutions Pvt Ltd",
      position: "CEO",
      location: "Mumbai, India",
      category: "client",
      tags: ["VIP", "Enterprise"],
      avatar: "/placeholder.svg",
      lastContact: "2024-01-15",
      dealValue: 250000,
      status: "active",
      notes: "Key decision maker for enterprise solutions",
      socialMedia: {
        linkedin: "rajesh-kumar-tech",
        twitter: "@rajeshkumar",
      },
      interactions: [
        { type: "call", date: "2024-01-15", note: "Discussed new project requirements" },
        { type: "email", date: "2024-01-10", note: "Sent proposal for Q1 2024" },
        { type: "meeting", date: "2024-01-05", note: "Product demo session" },
      ],
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@digitalcorp.com",
      phone: "+91 87654 32109",
      company: "Digital Corp",
      position: "Marketing Director",
      location: "Delhi, India",
      category: "prospect",
      tags: ["Hot Lead", "Marketing"],
      avatar: "/placeholder.svg",
      lastContact: "2024-01-12",
      dealValue: 150000,
      status: "active",
      notes: "Interested in digital marketing solutions",
      socialMedia: {
        linkedin: "priya-sharma-digital",
        twitter: "@priyasharma",
      },
      interactions: [
        { type: "email", date: "2024-01-12", note: "Follow-up on marketing campaign" },
        { type: "call", date: "2024-01-08", note: "Initial consultation call" },
      ],
    },
    {
      id: 3,
      name: "Amit Patel",
      email: "amit@startupxyz.com",
      phone: "+91 76543 21098",
      company: "StartupXYZ",
      position: "Founder",
      location: "Bangalore, India",
      category: "lead",
      tags: ["Startup", "Tech"],
      avatar: "/placeholder.svg",
      lastContact: "2024-01-10",
      dealValue: 75000,
      status: "active",
      notes: "Looking for cost-effective solutions",
      socialMedia: {
        linkedin: "amit-patel-startup",
        twitter: "@amitpatel",
      },
      interactions: [
        { type: "meeting", date: "2024-01-10", note: "Product presentation" },
        { type: "call", date: "2024-01-05", note: "Discovery call" },
      ],
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha@enterprise.com",
      phone: "+91 65432 10987",
      company: "Enterprise Solutions",
      position: "VP Sales",
      location: "Hyderabad, India",
      category: "client",
      tags: ["Enterprise", "Long-term"],
      avatar: "/placeholder.svg",
      lastContact: "2024-01-08",
      dealValue: 500000,
      status: "active",
      notes: "Strategic partnership opportunity",
      socialMedia: {
        linkedin: "sneha-reddy-enterprise",
        twitter: "@snehareddy",
      },
      interactions: [
        { type: "meeting", date: "2024-01-08", note: "Partnership discussion" },
        { type: "email", date: "2024-01-03", note: "Contract negotiation" },
      ],
    },
    {
      id: 5,
      name: "Vikash Singh",
      email: "vikash@consulting.com",
      phone: "+91 54321 09876",
      company: "Consulting Group",
      position: "Senior Consultant",
      location: "Pune, India",
      category: "partner",
      tags: ["Consultant", "Referral"],
      avatar: "/placeholder.svg",
      lastContact: "2024-01-05",
      dealValue: 0,
      status: "active",
      notes: "Potential referral partner",
      socialMedia: {
        linkedin: "vikash-singh-consulting",
        twitter: "@vikashsingh",
      },
      interactions: [
        { type: "call", date: "2024-01-05", note: "Partnership discussion" },
        { type: "email", date: "2023-12-28", note: "Introduction email" },
      ],
    },
  ])

  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    location: "",
    category: "lead",
    tags: [],
    notes: "",
    socialMedia: {
      linkedin: "",
      twitter: "",
    },
  })

  const categories = [
    { id: "all", name: "All Contacts", count: contacts.length },
    { id: "client", name: "Clients", count: contacts.filter((c) => c.category === "client").length },
    { id: "prospect", name: "Prospects", count: contacts.filter((c) => c.category === "prospect").length },
    { id: "lead", name: "Leads", count: contacts.filter((c) => c.category === "lead").length },
    { id: "partner", name: "Partners", count: contacts.filter((c) => c.category === "partner").length },
  ]

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleContactClick = (contact) => {
    setSelectedContact(contact)
    setEditingContact({ ...contact })
    setIsContactDetailOpen(true)
  }

  const handleAddContact = () => {
    if (!newContact.name || !newContact.email) return

    const contact = {
      id: Date.now(),
      ...newContact,
      avatar: "/placeholder.svg",
      lastContact: new Date().toISOString().split("T")[0],
      dealValue: 0,
      status: "active",
      interactions: [],
    }

    setContacts([...contacts, contact])
    setNewContact({
      name: "",
      email: "",
      phone: "",
      company: "",
      position: "",
      location: "",
      category: "lead",
      tags: [],
      notes: "",
      socialMedia: { linkedin: "", twitter: "" },
    })
    setIsAddContactOpen(false)
  }

  const handleSaveContact = () => {
    setContacts(contacts.map((contact) => (contact.id === editingContact.id ? editingContact : contact)))
    setIsContactDetailOpen(false)
  }

  const handleDeleteContact = (contactId) => {
    setContacts(contacts.filter((contact) => contact.id !== contactId))
    setIsContactDetailOpen(false)
  }

  const handleSelectContact = (contactId) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  const getCategoryColor = (category) => {
    const colors = {
      client: "bg-green-100 text-green-800",
      prospect: "bg-blue-100 text-blue-800",
      lead: "bg-yellow-100 text-yellow-800",
      partner: "bg-purple-100 text-purple-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const getInteractionIcon = (type) => {
    const icons = {
      call: <Phone className="w-3 h-3" />,
      email: <Mail className="w-3 h-3" />,
      meeting: <Calendar className="w-3 h-3" />,
      message: <MessageCircle className="w-3 h-3" />,
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
              <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
              <p className="text-gray-600 mt-1">Manage your business relationships</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setIsAddContactOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <User className="w-8 h-8 text-blue-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">{contacts.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Building className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Companies</p>
                  <p className="text-2xl font-bold text-gray-900">{new Set(contacts.map((c) => c.company)).size}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Star className="w-8 h-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">VIP Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.filter((c) => c.tags.includes("VIP")).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">Recent Contacts</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {
                      contacts.filter((c) => new Date(c.lastContact) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                        .length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-3">
              {selectedContacts.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedContacts.length} selected</span>
                  <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">Delete</button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                    Export
                  </button>
                </div>
              )}
              <div className="flex items-center border border-gray-300 rounded-lg">
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

        <div className="flex gap-6">
          {/* Sidebar Categories */}
          <div className="w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${
                    selectedCategory === category.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`}
                >
                  <span className="text-sm">{category.name}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{category.count}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contacts Grid/List */}
          <div className="flex-1">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleContactClick(contact)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                          <p className="text-sm text-gray-600">{contact.position}</p>
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={selectedContacts.includes(contact.id)}
                        onChange={(e) => {
                          e.stopPropagation()
                          handleSelectContact(contact.id)
                        }}
                        className="rounded border-gray-300"
                      />
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Building className="w-4 h-4" />
                        <span>{contact.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{contact.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(contact.category)}`}>
                        {contact.category}
                      </span>
                      <div className="flex items-center gap-1">
                        {contact.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Last contact:</span>
                        <span className="text-gray-900">{new Date(contact.lastContact).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
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
                                setSelectedContacts(filteredContacts.map((c) => c.id))
                              } else {
                                setSelectedContacts([])
                              }
                            }}
                          />
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Company
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Contact
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input
                              type="checkbox"
                              checked={selectedContacts.includes(contact.id)}
                              onChange={() => handleSelectContact(contact.id)}
                              className="rounded border-gray-300"
                            />
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {contact.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{contact.name}</div>
                                <div className="text-sm text-gray-500">{contact.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{contact.company}</div>
                            <div className="text-sm text-gray-500">{contact.position}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(contact.category)}`}>
                              {contact.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(contact.lastContact).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleContactClick(contact)
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
          </div>
        </div>

        {/* Add Contact Modal */}
        {isAddContactOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add New Contact</h2>
                <button onClick={() => setIsAddContactOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={newContact.name}
                      onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="text"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      value={newContact.company}
                      onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                    <input
                      type="text"
                      value={newContact.position}
                      onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={newContact.location}
                      onChange={(e) => setNewContact({ ...newContact, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select
                      value={newContact.category}
                      onChange={(e) => setNewContact({ ...newContact, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="lead">Lead</option>
                      <option value="prospect">Prospect</option>
                      <option value="client">Client</option>
                      <option value="partner">Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                    <input
                      type="text"
                      value={newContact.socialMedia.linkedin}
                      onChange={(e) =>
                        setNewContact({
                          ...newContact,
                          socialMedia: { ...newContact.socialMedia, linkedin: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newContact.notes}
                  onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setIsAddContactOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddContact}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Contact
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Detail Modal */}
        {isContactDetailOpen && selectedContact && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Contact Details</h2>
                <button onClick={() => setIsContactDetailOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contact Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editingContact.name || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={editingContact.email || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="text"
                        value={editingContact.phone || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      <input
                        type="text"
                        value={editingContact.company || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, company: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                      <input
                        type="text"
                        value={editingContact.position || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, position: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={editingContact.location || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, location: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={editingContact.notes || ""}
                      onChange={(e) => setEditingContact({ ...editingContact, notes: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Avatar */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {selectedContact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <h3 className="font-semibold text-lg">{selectedContact.name}</h3>
                    <p className="text-gray-600">{selectedContact.position}</p>
                    <span
                      className={`inline-block mt-2 text-xs px-2 py-1 rounded-full ${getCategoryColor(selectedContact.category)}`}
                    >
                      {selectedContact.category}
                    </span>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200">
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200">
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200">
                      <Calendar className="w-4 h-4" />
                      Schedule Meeting
                    </button>
                  </div>

                  {/* Recent Interactions */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Recent Interactions</h4>
                    <div className="space-y-3">
                      {selectedContact.interactions?.slice(0, 3).map((interaction, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="text-blue-600">{getInteractionIcon(interaction.type)}</div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{interaction.note}</p>
                            <p className="text-xs text-gray-500">{new Date(interaction.date).toLocaleDateString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleDeleteContact(selectedContact.id)}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Contact
                </button>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsContactDetailOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveContact}
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

export default ContactsPage
