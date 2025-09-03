"use client"

import { useState, useRef, useEffect } from "react"
import axios from "axios"
import {
  Search,
  Filter,
  Plus,
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
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

const ContactsPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedContacts, setSelectedContacts] = useState([])
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)
  const [isContactDetailOpen, setIsContactDetailOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null)
  const [editingContact, setEditingContact] = useState({})
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [importFile, setImportFile] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    tags: [],
    dateRange: "all",
    dealValue: "all",
  })

  // API state
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 10,
    total: 0,
    from: 0,
    to: 0,
  })
  const [apiParams, setApiParams] = useState({
    page: 1,
    search: "",
    category: "all",
  })

  // Dynamic form state
  const [formFields, setFormFields] = useState({})
  const [newContact, setNewContact] = useState({})
  const [formLoading, setFormLoading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  const fileInputRef = useRef(null)

  // Fetch contacts from API
  useEffect(() => {
    const token = localStorage.getItem('login_token')
    if (!token) {
      setError("No authentication token found")
      setLoading(false)
      return
    }

    const fetchContacts = async () => {
      try {
        setLoading(true)
        const response = await axios.post(
          "http://localhost/crm-solvonix/api/v1/user/contacts",
          {
            page: apiParams.page,
            search: apiParams.search,
            category: apiParams.category !== "all" ? apiParams.category : undefined,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json"
            },
          }
        )

        console.log("API Response:", response.data)
        
        if (response.data && response.data.data) {
          // Handle the paginated response
          setContacts(response.data.data.data || [])
          setPagination({
            current_page: response.data.data.current_page,
            last_page: response.data.data.last_page,
            per_page: response.data.data.per_page,
            total: response.data.data.total,
            from: response.data.data.from,
            to: response.data.data.to,
          })
        } else {
          console.error("Unexpected API response structure:", response.data)
          setError("Unexpected data format from server")
        }
      } catch (err) {
        console.error("Error fetching contacts:", err)
        setError(err.response?.data?.message || err.message || "Failed to fetch contacts")
      } finally {
        setLoading(false)
      }
    }

    fetchContacts()
  }, [apiParams])

  // Fetch form fields when add contact modal opens
  useEffect(() => {
    if (isAddContactOpen) {
      fetchFormFields()
    }
  }, [isAddContactOpen])

  // Fetch form fields from API
  const fetchFormFields = async () => {
    const token = localStorage.getItem('login_token')
    if (!token) return

    try {
      setFormLoading(true)
      const response = await axios.get(
        "http://localhost/crm-solvonix/api/v1/user/get/contacts/fields",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.data.message === "success") {
        const data = response.data.data
        if (Array.isArray(data)) {
          setFormFields(groupFieldsByGroup(data))
        } else if (typeof data === "object") {
          setFormFields(data)
        } else {
          setFormFields({})
        }
        
        // Initialize empty form data
        const initialFormData = {}
        const allFields = Array.isArray(data) ? data : Object.values(data).flat()
        allFields.forEach(field => {
          initialFormData[field.field_name] = field.is_multiple ? [] : ''
        })
        setNewContact(initialFormData)
      } else {
        console.error("Failed to fetch fields:", response.data)
        setSubmitStatus({ type: 'error', message: 'Failed to load form fields' })
      }
    } catch (err) {
      console.error("Error fetching form fields:", err)
      setSubmitStatus({ type: 'error', message: 'Failed to load form fields' })
    } finally {
      setFormLoading(false)
    }
  }

  // Group fields by field_group if API gives array
  const groupFieldsByGroup = (fieldsArray) => {
    if (!Array.isArray(fieldsArray)) return {}
    const grouped = {}
    fieldsArray.forEach(field => {
      const group = field.field_group || 'Default'
      if (!grouped[group]) grouped[group] = []
      grouped[group].push(field)
    })
    return grouped
  }

  // Handle search with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setApiParams(prev => ({
        ...prev,
        search: searchTerm,
        page: 1, // Reset to first page when searching
      }))
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm])

  // Handle category change
  useEffect(() => {
    setApiParams(prev => ({
      ...prev,
      category: selectedCategory,
      page: 1, // Reset to first page when changing category
    }))
  }, [selectedCategory])

  // Handle pagination
  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setApiParams(prev => ({
        ...prev,
        page: page,
      }))
      window.scrollTo(0, 0)
    }
  }

  // Calculate category counts based on API data structure
  const categories = [
    { id: "all", name: "All Contacts", count: pagination.total },
    // These would ideally come from the API, using placeholders for now
    { id: "client", name: "Clients", count: Math.floor(pagination.total * 0.4) },
    { id: "prospect", name: "Prospects", count: Math.floor(pagination.total * 0.3) },
    { id: "lead", name: "Leads", count: Math.floor(pagination.total * 0.2) },
    { id: "partner", name: "Partners", count: Math.floor(pagination.total * 0.1) },
  ]

  // Get all unique tags for filter (would ideally come from API)
  const allTags = ["VIP", "Enterprise", "Hot Lead", "Cold", "Follow-up"]

  // Export functionality
  const handleExport = (selectedOnly = false) => {
    const contactsToExport = selectedOnly
      ? contacts.filter((contact) => selectedContacts.includes(contact.id))
      : contacts

    const csvContent = [
      // CSV Headers based on your API data
      ["Name", "Email", "Mobile", "Date of Birth", "PAN Card"].join(","),
      // CSV Data
      ...contactsToExport.map((contact) =>
        [
          `"${contact.name || ""}"`,
          `"${contact.email || ""}"`,
          `"${contact.mobile || ""}"`,
          `"${contact.date_of_birth || ""}"`,
          `"${contact.pan_card || ""}"`,
        ].join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `contacts_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Import functionality
  const handleImport = () => {
    if (!importFile) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const csv = e.target.result
        const lines = csv.split("\n")
        const headers = lines[0].split(",").map((h) => h.replace(/"/g, "").trim())

        const importedContacts = []

        for (let i = 1; i < lines.length; i++) {
          if (lines[i].trim() === "") continue

          const values = lines[i].split(",").map((v) => v.replace(/"/g, "").trim())

          const contact = {
            id: Date.now() + i,
            name: values[0] || "",
            email: values[1] || "",
            mobile: values[2] || "",
            date_of_birth: values[3] || "",
            pan_card: values[4] || "",
          }

          importedContacts.push(contact)
        }

        // In a real app, you would send this to your API
        // For now, we'll just add to local state
        setContacts([...contacts, ...importedContacts])
        setIsImportModalOpen(false)
        setImportFile(null)
        alert(`Successfully imported ${importedContacts.length} contacts!`)
      } catch (error) {
        alert("Error importing file. Please check the format and try again.")
      }
    }
    reader.readAsText(importFile)
  }

  const handleContactClick = (contact) => {
    setSelectedContact(contact)
    setEditingContact({ ...contact })
    setIsContactDetailOpen(true)
  }

  // Handle form field changes for dynamic form
  const handleFormChange = (fieldName, value) => {
    setNewContact(prev => ({ ...prev, [fieldName]: value }))
  }

  // Handle add contact with dynamic form
  const handleAddContact = async (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem('login_token')
    if (!token) {
      setSubmitStatus({ type: 'error', message: 'Authentication token not found' })
      return
    }

    try {
      setFormLoading(true)
      
      // Prepare data for API submission
      const submissionData = {
        salutation: newContact.salutation || "Mr.",
        first_name: newContact.first_name || "",
        middle_name: newContact.middle_name || "",
        last_name: newContact.last_name || "",
        email: newContact.email || "",
        country_code: newContact.country_code || "+91",
        mobile: newContact.mobile || "",
        Adress: newContact.Adress || "",
        // Add other fields as needed
      }

      // Add all other fields from the form
      Object.keys(newContact).forEach(key => {
        if (!submissionData.hasOwnProperty(key)) {
          submissionData[key] = newContact[key]
        }
      })

      console.log("Submitting contact data:", submissionData)

      const response = await axios.post(
        "http://localhost/crm-solvonix/api/v1/user/save/contact",
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      )

      console.log("Save contact response:", response.data)

      if (response.data.message === "success") {
        setSubmitStatus({ type: 'success', message: 'Contact saved successfully!' })
        
        // Refresh contacts list
        setApiParams(prev => ({ ...prev }))
        
        // Close modal after a delay
        setTimeout(() => {
          setIsAddContactOpen(false)
          setNewContact({})
          setSubmitStatus({ type: '', message: '' })
        }, 1500)
      } else {
        setSubmitStatus({ type: 'error', message: response.data.message || 'Failed to save contact' })
      }
    } catch (err) {
      console.error("Error saving contact:", err)
      setSubmitStatus({ type: 'error', message: err.response?.data?.message || 'Failed to save contact. Please try again.' })
    } finally {
      setFormLoading(false)
    }
  }

  const handleSaveContact = () => {
    // In a real app, you would send this to your API
    setContacts(contacts.map((contact) => (contact.id === editingContact.id ? editingContact : contact)))
    setIsContactDetailOpen(false)
  }

  const handleDeleteContact = (contactId) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      // In a real app, you would send this to your API
      setContacts(contacts.filter((contact) => contact.id !== contactId))
      setIsContactDetailOpen(false)
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedContacts.length} contacts?`)) {
      // In a real app, you would send this to your API
      setContacts(contacts.filter((contact) => !selectedContacts.includes(contact.id)))
      setSelectedContacts([])
    }
  }

  const handleSelectContact = (contactId) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    )
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedContacts(contacts.map((c) => c.id))
    } else {
      setSelectedContacts([])
    }
  }

  // Quick actions
  const handleCall = (contact) => {
    if (contact.mobile) {
      window.open(`tel:${contact.mobile}`)
    } else {
      alert("No mobile number available for this contact")
    }
  }

  const handleEmail = (contact) => {
    if (contact.email) {
      window.open(`mailto:${contact.email}`)
    } else {
      alert("No email address available for this contact")
    }
  }

  const handleScheduleMeeting = (contact) => {
    alert(`Schedule meeting functionality would open calendar integration for ${contact.name}`)
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

  // Parse options for dynamic form fields
  const parseOptions = (optionsString) => {
    if (!optionsString) return []
    if (['countries', 'states', 'genders'].includes(optionsString)) {
      const predefinedLists = {
        countries: ["United States", "Canada", "UK", "Australia", "Germany", "France", "Japan", "India", "Brazil", "Mexico"],
        states: ["California", "Texas", "New York", "Florida", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan"],
        genders: ["Male", "Female", "Non-binary", "Prefer not to say"]
      }
      return predefinedLists[optionsString].map(v => ({ label: v, value: v }))
    }
    return optionsString.split(',').map(v => ({ label: v.trim(), value: v.trim() }))
  }

  // Render dynamic form fields
  const renderField = (field) => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    const isRequired = field.is_required === 1
    const fieldOptions = parseOptions(field.field_options)
    const currentValue = newContact[field.field_name] ?? (field.is_multiple ? [] : '')

    switch (field.field_type) {
      case "String":
        return (
          <input
            type="text"
            className={baseClasses}
            placeholder={field.placeholder || ""}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, e.target.value)}
          />
        )
      case "Date":
        return (
          <input
            type="date"
            className={baseClasses}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, e.target.value)}
          />
        )
      case "DateTime":
        return (
          <input
            type="datetime-local"
            className={baseClasses}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, e.target.value)}
          />
        )
      case "Integer":
        return (
          <input
            type="number"
            step="1"
            className={baseClasses}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, parseInt(e.target.value) || "")}
          />
        )
      case "Decimal":
        return (
          <input
            type="number"
            step="0.01"
            className={baseClasses}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, parseFloat(e.target.value) || "")}
          />
        )
      case "LargeText":
        return (
          <textarea
            className={baseClasses}
            placeholder={field.placeholder || ""}
            required={isRequired}
            rows={4}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, e.target.value)}
          />
        )
      case "Email":
        return (
          <input
            type="email"
            className={baseClasses}
            placeholder={field.placeholder || "example@email.com"}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, e.target.value)}
          />
        )
      case "Options":
        if (field.is_multiple === 1) {
          const selectedValues = Array.isArray(currentValue) ? currentValue : []
          return (
            <div className="space-y-2">
              {fieldOptions.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(opt.value)}
                    onChange={e => {
                      const updated = e.target.checked
                        ? [...selectedValues, opt.value]
                        : selectedValues.filter(v => v !== opt.value)
                      handleFormChange(field.field_name, updated)
                    }}
                    className="rounded"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          )
        } else {
          return (
            <div className="space-y-2">
              {fieldOptions.map((opt, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={field.field_name}
                    value={opt.value}
                    checked={currentValue === opt.value}
                    onChange={e => handleFormChange(field.field_name, e.target.value)}
                    className="rounded-full"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          )
        }
      case "List":
        return (
          <select
            className={baseClasses}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, e.target.value)}
          >
            <option value="">-- Select --</option>
            {fieldOptions.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        )
      case "File":
        return (
          <input
            type="file"
            className={baseClasses}
            required={isRequired}
            multiple={field.is_multiple === 1}
            onChange={e => handleFormChange(
              field.field_name, 
              field.is_multiple === 1 ? Array.from(e.target.files) : e.target.files[0]
            )}
          />
        )
      default:
        return (
          <input
            type="text"
            className={baseClasses}
            placeholder={field.placeholder || ""}
            required={isRequired}
            value={currentValue}
            onChange={e => handleFormChange(field.field_name, e.target.value)}
          />
        )
    }
  }

  if (loading) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p>Loading...</p></div>
  if (error) return <div className="min-h-screen bg-gray-50 flex items-center justify-center"><p className="text-red-500">{error}</p></div>

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contacts</h1>
              <p className="text-gray-600 mt-1">Manage your business relationships</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => setIsImportModalOpen(true)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Import
              </button>
              <button
                onClick={() => handleExport(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={() => setIsAddContactOpen(true)}
                className="bg-[#ef6d8d] hover:bg-[#ff3466] text-white px-4 py-2 rounded-lg flex items-center gap-2"
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
                  <p className="text-2xl font-bold text-gray-900">{pagination.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Mail className="w-8 h-8 text-green-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">With Email</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.filter((c) => c.email).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Phone className="w-8 h-8 text-yellow-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">With Mobile</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.filter((c) => c.mobile).length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-purple-600" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-600">This Page</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {contacts.length} of {pagination.total}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="sm:w-80 w-[100%] pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>

            <div className="flex items-center gap-3">
              {selectedContacts.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{selectedContacts.length} selected</span>
                  <button
                    onClick={handleBulkDelete}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleExport(true)}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                  >
                    Export
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg border border-gray-200">
              {/* Filter fields would go here */}
            </div>
          )}
        </div>

        <div className="flex gap-6 flex-col sm:flex-row sm:items-start items-center">
          {/* Sidebar Categories */}
          <div className="sm:w-64 bg-white rounded-lg shadow-sm border border-gray-200 p-4 h-fit w-[100%]">
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

          {/* Contacts List */}
          <div className="sm:flex-1 w-[100%]">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300"
                          checked={selectedContacts.length === contacts.length && contacts.length > 0}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mobile
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PAN Card
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {contacts.map((contact) => (
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
                                ?.split(" ")
                                .map((n) => n[0])
                                .join("") || "?"}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {contact.name || "Unnamed Contact"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{contact.email || "No email"}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{contact.mobile || "No mobile"}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {contact.date_of_birth || "Unknown"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {contact.pan_card || "Unknown"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleContactClick(contact)
                              }}
                              className="text-blue-600 hover:text-blue-700"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCall(contact)
                              }}
                              className="text-green-600 hover:text-green-700"
                              title="Call"
                            >
                              <Phone className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEmail(contact)
                              }}
                              className="text-blue-600 hover:text-blue-700"
                              title="Email"
                            >
                              <Mail className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteContact(contact.id)
                              }}
                              className="text-red-400 hover:text-red-600"
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

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{pagination.from}</span> to <span className="font-medium">{pagination.to}</span> of{' '}
                  <span className="font-medium">{pagination.total}</span> results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  
                  {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1 rounded-md border text-sm font-medium ${
                        pagination.current_page === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {contacts.length === 0 && (
              <div className="text-center py-12">
                <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>

        {/* Import Modal */}
        {isImportModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Import Contacts</h2>
                <button onClick={() => setIsImportModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload CSV File</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    onChange={(e) => setImportFile(e.target.files[0])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-2" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">CSV Format Required:</p>
                      <p>
                        Name, Email, Mobile, Date of Birth, PAN Card
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={!importFile}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Import
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Contact Modal with Dynamic Form */}
        {isAddContactOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Add New Contact</h2>
                <button onClick={() => setIsAddContactOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitStatus.message && (
                <div className={`mb-6 p-3 rounded ${submitStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {submitStatus.message}
                </div>
              )}

              {formLoading ? (
                <div className="text-center py-10">
                  <p>Loading form fields...</p>
                </div>
              ) : Object.keys(formFields).length === 0 ? (
                <div className="text-center py-10 text-gray-600">
                  No form fields configured. Please use the Form Builder to create fields first.
                </div>
              ) : (
                <form onSubmit={handleAddContact} className="space-y-8">
                  {Object.keys(formFields).map((group, index) => (
                    <div key={index} className="bg-gray-50 p-5 rounded-xl shadow-sm">
                      <h4 className="text-lg font-semibold text-blue-600 mb-4">{group}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {formFields[group]
                          .sort((a, b) => a.priority - b.priority)
                          .map((field, i) => (
                            <div key={i} className="flex flex-col">
                              <label className="mb-1 text-sm font-medium text-gray-700">
                                {field.display_text} {field.is_required === 1 && <span className="text-red-500">*</span>}
                              </label>
                              {renderField(field)}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsAddContactOpen(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formLoading ? 'Saving...' : 'Add Contact'}
                    </button>
                  </div>
                </form>
              )}
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile</label>
                      <input
                        type="text"
                        value={editingContact.mobile || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, mobile: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={editingContact.date_of_birth || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, date_of_birth: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card</label>
                      <input
                        type="text"
                        value={editingContact.pan_card || ""}
                        onChange={(e) => setEditingContact({ ...editingContact, pan_card: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Contact Avatar */}
                  <div className="text-center">
                    <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                      {selectedContact.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("") || "?"}
                    </div>
                    <h3 className="font-semibold text-lg">
                      {selectedContact.name || "Unnamed Contact"}
                    </h3>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCall(selectedContact)}
                      className="w-full flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                    >
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                    <button
                      onClick={() => handleEmail(selectedContact)}
                      className="w-full flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button
                      onClick={() => handleScheduleMeeting(selectedContact)}
                      className="w-full flex items-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Meeting
                    </button>
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