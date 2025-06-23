"use client"

import { useState, useMemo } from "react"
import {
  Calendar,
  ChevronDown,
  Download,
  RefreshCcw,
  Share2,
  TrendingDown,
  TrendingUp,
  Users,
  Target,
  ArrowRight,
  Layers,
  Award,
  AlertCircle,
  BarChart3,
  Activity,
  CheckCircle,
  XCircle,
  Zap,
  Filter,
  Search,
  Bell,
  Plus,
  Minus,
  Info,
  Clock,
  TrendingDownIcon as TrendDown,
  FileText,
  Mail,
  Copy,
} from "lucide-react"

const ForecastPage = () => {
  const [dateRange, setDateRange] = useState("Q1 2024")
  const [selectedView, setSelectedView] = useState("overview")
  const [selectedModel, setSelectedModel] = useState("realistic")
  const [selectedPeriod, setSelectedPeriod] = useState("quarterly")
  const [selectedTeamMember, setSelectedTeamMember] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [selectedConfidence, setSelectedConfidence] = useState("all")
  const [selectedDealSize, setSelectedDealSize] = useState("all")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Q2 forecast updated", type: "info", time: "2 min ago" },
    { id: 2, message: "Priya Singh exceeded quota", type: "success", time: "1 hour ago" },
    { id: 3, message: "Large deal at risk", type: "warning", time: "3 hours ago" },
  ])
  const [showNotifications, setShowNotifications] = useState(false)

  // Sample forecast data
  const forecastModels = {
    conservative: {
      q1: 2800000,
      q2: 3200000,
      q3: 3500000,
      q4: 4200000,
      confidence: 85,
    },
    realistic: {
      q1: 3200000,
      q2: 3800000,
      q3: 4200000,
      q4: 5000000,
      confidence: 75,
    },
    optimistic: {
      q1: 3800000,
      q2: 4500000,
      q3: 5200000,
      q4: 6200000,
      confidence: 60,
    },
  }

  // Sample sales rep quota data with additional filters
  const allSalesRepQuotas = [
    {
      name: "Priya Singh",
      quota: 1200000,
      achieved: 980000,
      forecast: 1150000,
      probability: 85,
      deals: 18,
      pipeline: 1450000,
      product: "software",
      dealSize: "large",
      region: "north",
    },
    {
      name: "Amit Kumar",
      quota: 1000000,
      achieved: 750000,
      forecast: 920000,
      probability: 78,
      deals: 15,
      pipeline: 1200000,
      product: "consulting",
      dealSize: "medium",
      region: "south",
    },
    {
      name: "Neha Agarwal",
      quota: 1300000,
      achieved: 1100000,
      forecast: 1280000,
      probability: 92,
      deals: 22,
      pipeline: 1600000,
      product: "software",
      dealSize: "large",
      region: "west",
    },
    {
      name: "Rohit Verma",
      quota: 900000,
      achieved: 650000,
      forecast: 820000,
      probability: 72,
      deals: 12,
      pipeline: 1100000,
      product: "implementation",
      dealSize: "small",
      region: "east",
    },
    {
      name: "Kavya Sharma",
      quota: 1100000,
      achieved: 850000,
      forecast: 1050000,
      probability: 88,
      deals: 20,
      pipeline: 1350000,
      product: "support",
      dealSize: "medium",
      region: "north",
    },
    {
      name: "Rajesh Patel",
      quota: 1150000,
      achieved: 920000,
      forecast: 1100000,
      probability: 80,
      deals: 16,
      pipeline: 1300000,
      product: "consulting",
      dealSize: "large",
      region: "west",
    },
  ]

  // Sample monthly forecast data
  const monthlyForecast = [
    { month: "Jan", actual: 850000, forecast: 900000, quota: 950000 },
    { month: "Feb", actual: 920000, forecast: 950000, quota: 1000000 },
    { month: "Mar", actual: 1100000, forecast: 1050000, quota: 1100000 },
    { month: "Apr", actual: 0, forecast: 1200000, quota: 1150000 },
    { month: "May", actual: 0, forecast: 1300000, quota: 1250000 },
    { month: "Jun", actual: 0, forecast: 1400000, quota: 1350000 },
    { month: "Jul", actual: 0, forecast: 1350000, quota: 1300000 },
    { month: "Aug", actual: 0, forecast: 1450000, quota: 1400000 },
    { month: "Sep", actual: 0, forecast: 1500000, quota: 1450000 },
    { month: "Oct", actual: 0, forecast: 1600000, quota: 1550000 },
    { month: "Nov", actual: 0, forecast: 1700000, quota: 1650000 },
    { month: "Dec", actual: 0, forecast: 1800000, quota: 1750000 },
  ]

  // Sample product forecast data
  const productForecast = [
    {
      name: "Software Solutions",
      q1Actual: 1200000,
      q1Forecast: 1350000,
      q2Forecast: 1500000,
      growth: 15,
      confidence: 82,
    },
    {
      name: "Consulting Services",
      q1Actual: 800000,
      q1Forecast: 900000,
      q2Forecast: 1100000,
      growth: 22,
      confidence: 78,
    },
    {
      name: "Implementation",
      q1Actual: 600000,
      q1Forecast: 650000,
      q2Forecast: 750000,
      growth: 15,
      confidence: 85,
    },
    {
      name: "Support Packages",
      q1Actual: 400000,
      q1Forecast: 450000,
      q2Forecast: 500000,
      growth: 11,
      confidence: 90,
    },
  ]

  // Sample accuracy data
  const accuracyData = [
    { period: "Q1 2023", forecast: 2800000, actual: 2650000, accuracy: 94.6 },
    { period: "Q2 2023", forecast: 3200000, actual: 3350000, accuracy: 95.3 },
    { period: "Q3 2023", forecast: 3500000, actual: 3280000, accuracy: 93.7 },
    { period: "Q4 2023", forecast: 4200000, actual: 4150000, accuracy: 98.8 },
    { period: "Q1 2024", forecast: 3200000, actual: 2870000, accuracy: 89.7 },
  ]

  // Sample scenario data
  const scenarioData = {
    bestCase: {
      revenue: 6200000,
      probability: 25,
      factors: ["All major deals close", "Market expansion succeeds", "No competitive losses"],
    },
    mostLikely: {
      revenue: 5000000,
      probability: 50,
      factors: ["80% of pipeline converts", "Stable market conditions", "Normal churn rate"],
    },
    worstCase: {
      revenue: 3800000,
      probability: 25,
      factors: ["Economic downturn", "Major client losses", "Delayed product launches"],
    },
  }

  // Filter sales reps based on all criteria
  const filteredSalesReps = useMemo(() => {
    return allSalesRepQuotas.filter((rep) => {
      const matchesSearch = rep.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTeamMember = selectedTeamMember === "all" || rep.name.toLowerCase().includes(selectedTeamMember)
      const matchesProduct = selectedProduct === "all" || rep.product === selectedProduct
      const matchesConfidence =
        selectedConfidence === "all" ||
        (selectedConfidence === "high" && rep.probability >= 80) ||
        (selectedConfidence === "medium" && rep.probability >= 60 && rep.probability < 80) ||
        (selectedConfidence === "low" && rep.probability < 60)
      const matchesDealSize = selectedDealSize === "all" || rep.dealSize === selectedDealSize

      return matchesSearch && matchesTeamMember && matchesProduct && matchesConfidence && matchesDealSize
    })
  }, [searchTerm, selectedTeamMember, selectedProduct, selectedConfidence, selectedDealSize])

  // Calculate totals based on filtered data
  const totalQuota = filteredSalesReps.reduce((sum, rep) => sum + rep.quota, 0)
  const totalAchieved = filteredSalesReps.reduce((sum, rep) => sum + rep.achieved, 0)
  const totalForecast = filteredSalesReps.reduce((sum, rep) => sum + rep.forecast, 0)
  const totalPipeline = filteredSalesReps.reduce((sum, rep) => sum + rep.pipeline, 0)

  const achievementRate = totalQuota > 0 ? (totalAchieved / totalQuota) * 100 : 0
  const forecastAccuracy = 87.5
  const pipelineCoverage = totalQuota > 0 ? (totalPipeline / totalQuota) * 100 : 0

  // Format currency
  const formatCurrency = (value) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)}Cr`
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)}L`
    } else if (value >= 1000) {
      return `₹${(value / 1000).toFixed(1)}K`
    } else {
      return `₹${value}`
    }
  }

  // Export functionality
  const handleExport = (format) => {
    setShowExportMenu(false)

    if (format === "csv") {
      const csvData = filteredSalesReps.map((rep) => ({
        Name: rep.name,
        Quota: rep.quota,
        Achieved: rep.achieved,
        Forecast: rep.forecast,
        Probability: rep.probability,
        Deals: rep.deals,
        Pipeline: rep.pipeline,
      }))

      const csvContent = [
        Object.keys(csvData[0]).join(","),
        ...csvData.map((row) => Object.values(row).join(",")),
      ].join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `sales-forecast-${dateRange.replace(" ", "-")}.csv`
      a.click()
      window.URL.revokeObjectURL(url)
    } else if (format === "pdf") {
      // Simulate PDF generation
      alert("PDF export functionality would be implemented with a PDF library like jsPDF")
    } else if (format === "excel") {
      // Simulate Excel export
      alert("Excel export functionality would be implemented with a library like xlsx")
    }
  }

  // Share functionality
  const handleShare = (method) => {
    setShowShareMenu(false)

    if (method === "email") {
      const subject = `Sales Forecast Report - ${dateRange}`
      const body = `Please find the sales forecast report for ${dateRange}.\n\nTotal Forecast: ${formatCurrency(totalForecast)}\nAchievement Rate: ${achievementRate.toFixed(1)}%`
      window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    } else if (method === "copy") {
      const reportText = `Sales Forecast Report - ${dateRange}\nTotal Forecast: ${formatCurrency(totalForecast)}\nAchievement Rate: ${achievementRate.toFixed(1)}%`
      navigator.clipboard.writeText(reportText).then(() => {
        alert("Report summary copied to clipboard!")
      })
    } else if (method === "link") {
      const currentUrl = window.location.href
      navigator.clipboard.writeText(currentUrl).then(() => {
        alert("Dashboard link copied to clipboard!")
      })
    }
  }

  // Refresh functionality
  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    alert("Data refreshed successfully!")
  }

  // Clear all filters
  const clearAllFilters = () => {
    setDateRange("Q1 2024")
    setSelectedPeriod("quarterly")
    setSelectedModel("realistic")
    setSelectedTeamMember("all")
    setSelectedProduct("all")
    setSelectedConfidence("all")
    setSelectedDealSize("all")
    setSearchTerm("")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sales Forecast</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                Predict and track your sales performance with advanced analytics
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Export Button */}
              <div className="relative">
                <button
                  onClick={() => setShowExportMenu(!showExportMenu)}
                  className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                </button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => handleExport("csv")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Export as CSV
                      </button>
                      <button
                        onClick={() => handleExport("pdf")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Export as PDF
                      </button>
                      <button
                        onClick={() => handleExport("excel")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Export as Excel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                {showShareMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => handleShare("email")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Share via Email
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        Copy Summary
                      </button>
                      <button
                        onClick={() => handleShare("link")}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                      >
                        <Share2 className="w-4 h-4" />
                        Copy Link
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm disabled:opacity-50"
              >
                <RefreshCcw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">{isRefreshing ? "Refreshing..." : "Refresh"}</span>
              </button>

              {/* Notifications Button */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm relative"
                >
                  <Bell className="w-4 h-4" />
                  <span className="hidden sm:inline">Alerts</span>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {notifications.length}
                    </span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-medium text-gray-900">Notifications</h3>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-3 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${
                                notification.type === "success"
                                  ? "bg-green-500"
                                  : notification.type === "warning"
                                    ? "bg-amber-500"
                                    : "bg-blue-500"
                              }`}
                            ></div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8 min-w-0 bg-transparent"
                >
                  <option>Q1 2024</option>
                  <option>Q2 2024</option>
                  <option>Q3 2024</option>
                  <option>Q4 2024</option>
                  <option>FY 2024</option>
                </select>
              </div>

              <div className="hidden sm:block h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2 min-w-0">
                <BarChart3 className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8 min-w-0 bg-transparent"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="hidden sm:block h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2 min-w-0">
                <Target className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8 min-w-0 bg-transparent"
                >
                  <option value="conservative">Conservative</option>
                  <option value="realistic">Realistic</option>
                  <option value="optimistic">Optimistic</option>
                </select>
              </div>

              <div className="hidden sm:block h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2 min-w-0">
                <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <select
                  value={selectedTeamMember}
                  onChange={(e) => setSelectedTeamMember(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8 min-w-0 bg-transparent"
                >
                  <option value="all">All Team Members</option>
                  <option value="priya">Priya Singh</option>
                  <option value="amit">Amit Kumar</option>
                  <option value="neha">Neha Agarwal</option>
                  <option value="rohit">Rohit Verma</option>
                  <option value="kavya">Kavya Sharma</option>
                  <option value="rajesh">Rajesh Patel</option>
                </select>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Filter className="w-4 h-4" />
                  Advanced Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
                </button>

                <button
                  onClick={clearAllFilters}
                  className="text-sm text-gray-600 hover:text-gray-800 px-2 py-1 border border-gray-300 rounded"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Search Team Members</label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Product Line</label>
                    <select
                      value={selectedProduct}
                      onChange={(e) => setSelectedProduct(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Products</option>
                      <option value="software">Software Solutions</option>
                      <option value="consulting">Consulting Services</option>
                      <option value="implementation">Implementation</option>
                      <option value="support">Support Packages</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Confidence Level</label>
                    <select
                      value={selectedConfidence}
                      onChange={(e) => setSelectedConfidence(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Levels</option>
                      <option value="high">High (80%+)</option>
                      <option value="medium">Medium (60-80%)</option>
                      <option value="low">Low (&lt;60%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Deal Size</label>
                    <select
                      value={selectedDealSize}
                      onChange={(e) => setSelectedDealSize(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="all">All Sizes</option>
                      <option value="large">Large (₹10L+)</option>
                      <option value="medium">Medium (₹5-10L)</option>
                      <option value="small">Small (&lt;₹5L)</option>
                    </select>
                  </div>
                </div>

                {/* Filter Summary */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-600">Active Filters:</span>
                  {searchTerm && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      Search: {searchTerm}
                      <button onClick={() => setSearchTerm("")} className="ml-1 text-blue-600 hover:text-blue-800">
                        <XCircle className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedProduct !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      Product: {selectedProduct}
                      <button
                        onClick={() => setSelectedProduct("all")}
                        className="ml-1 text-green-600 hover:text-green-800"
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedConfidence !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                      Confidence: {selectedConfidence}
                      <button
                        onClick={() => setSelectedConfidence("all")}
                        className="ml-1 text-purple-600 hover:text-purple-800"
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedDealSize !== "all" && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800">
                      Deal Size: {selectedDealSize}
                      <button
                        onClick={() => setSelectedDealSize("all")}
                        className="ml-1 text-amber-600 hover:text-amber-800"
                      >
                        <XCircle className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Summary */}
        {(searchTerm || selectedProduct !== "all" || selectedConfidence !== "all" || selectedDealSize !== "all") && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-800">
                  Showing {filteredSalesReps.length} of {allSalesRepQuotas.length} team members
                </span>
              </div>
              <button onClick={clearAllFilters} className="text-sm text-blue-600 hover:text-blue-800 underline">
                Clear all filters
              </button>
            </div>
          </div>
        )}

        {/* KPI Cards - Updated with filtered data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600">Total Forecast</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{formatCurrency(totalForecast)}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    18.5% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                <Target className="w-5 sm:w-6 h-5 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600">Achievement Rate</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{achievementRate.toFixed(1)}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    5.2% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                <Award className="w-5 sm:w-6 h-5 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{forecastAccuracy}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    2.3% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                <Activity className="w-5 sm:w-6 h-5 sm:h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-600">Pipeline Coverage</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">{pipelineCoverage.toFixed(0)}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    12.8% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full flex-shrink-0">
                <Layers className="w-5 sm:w-6 h-5 sm:h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* View Selector */}
        <div className="overflow-x-auto mb-6">
          <div className="flex items-center border-b border-gray-200 min-w-max">
            <button
              onClick={() => setSelectedView("overview")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedView === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedView("quota-tracking")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedView === "quota-tracking"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Quota Tracking
            </button>
            <button
              onClick={() => setSelectedView("product-forecast")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedView === "product-forecast"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Product Forecast
            </button>
            <button
              onClick={() => setSelectedView("accuracy")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedView === "accuracy"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Accuracy Analysis
            </button>
            <button
              onClick={() => setSelectedView("scenarios")}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                selectedView === "scenarios"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Scenarios
            </button>
          </div>
        </div>

        {/* Overview View */}
        {selectedView === "overview" && (
          <div className="space-y-6">
            {/* Forecast Models Comparison */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
                <h3 className="text-lg font-semibold text-gray-900">Forecast Models Comparison</h3>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setSelectedModel("conservative")}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      selectedModel === "conservative" ? "bg-red-100 text-red-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Conservative
                  </button>
                  <button
                    onClick={() => setSelectedModel("realistic")}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      selectedModel === "realistic" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Realistic
                  </button>
                  <button
                    onClick={() => setSelectedModel("optimistic")}
                    className={`px-3 py-1.5 text-sm transition-colors ${
                      selectedModel === "optimistic" ? "bg-green-100 text-green-600" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Optimistic
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {Object.entries(forecastModels).map(([model, data]) => (
                  <div
                    key={model}
                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                      selectedModel === model
                        ? model === "conservative"
                          ? "border-red-200 bg-red-50"
                          : model === "realistic"
                            ? "border-blue-200 bg-blue-50"
                            : "border-green-200 bg-green-50"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-gray-900 capitalize">{model}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          model === "conservative"
                            ? "bg-red-100 text-red-600"
                            : model === "realistic"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                        }`}
                      >
                        {data.confidence}% confidence
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Q1 2024</span>
                        <span className="font-medium">{formatCurrency(data.q1)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Q2 2024</span>
                        <span className="font-medium">{formatCurrency(data.q2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Q3 2024</span>
                        <span className="font-medium">{formatCurrency(data.q3)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Q4 2024</span>
                        <span className="font-medium">{formatCurrency(data.q4)}</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex justify-between text-sm font-semibold">
                          <span className="text-gray-900">Total FY</span>
                          <span className="text-gray-900">{formatCurrency(data.q1 + data.q2 + data.q3 + data.q4)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monthly Forecast Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Forecast vs Actual</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Actual</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">Forecast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="text-sm text-gray-600">Quota</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {monthlyForecast.map((month) => (
                  <div key={month.month} className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-sm font-medium text-gray-700">{month.month}</span>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                        <span className="text-blue-600">
                          Actual: {month.actual > 0 ? formatCurrency(month.actual) : "—"}
                        </span>
                        <span className="text-green-600">Forecast: {formatCurrency(month.forecast)}</span>
                        <span className="text-gray-600">Quota: {formatCurrency(month.quota)}</span>
                      </div>
                    </div>
                    <div className="relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      {/* Quota bar (background) */}
                      <div className="absolute inset-0 bg-gray-300 rounded-full"></div>
                      {/* Forecast bar */}
                      <div
                        className="absolute left-0 top-0 h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((month.forecast / month.quota) * 100, 100)}%` }}
                      ></div>
                      {/* Actual bar */}
                      {month.actual > 0 && (
                        <div
                          className="absolute left-0 top-0 h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((month.actual / month.quota) * 100, 100)}%` }}
                        ></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Forecast Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Key Insights */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Strong Q2 Growth</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Forecast shows 18.5% growth in Q2 driven by enterprise deals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Quota Achievement</p>
                      <p className="text-xs text-gray-600 mt-1">
                        On track to achieve 95% of annual quota based on current pipeline
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Risk Alert</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Q4 forecast depends on 3 large deals closing successfully
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Opportunity</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Software solutions showing 22% higher conversion rates
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Forecast Confidence */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Forecast Confidence</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q1 2024</span>
                      <span className="text-sm font-medium text-gray-900">92%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: "92%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q2 2024</span>
                      <span className="text-sm font-medium text-gray-900">85%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-300"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q3 2024</span>
                      <span className="text-sm font-medium text-gray-900">78%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-300"
                        style={{ width: "78%" }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q4 2024</span>
                      <span className="text-sm font-medium text-gray-900">65%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-red-500 rounded-full transition-all duration-300"
                        style={{ width: "65%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Confidence Factors</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Pipeline Quality</span>
                      <span className="text-green-600 font-medium">High</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Historical Accuracy</span>
                      <span className="text-blue-600 font-medium">87.5%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Market Conditions</span>
                      <span className="text-amber-600 font-medium">Stable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-red-800">High Risk</p>
                        <p className="text-xs text-red-700 mt-1">
                          3 deals worth ₹2.5Cr at risk of slipping to next quarter
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-amber-800">Medium Risk</p>
                        <p className="text-xs text-amber-700 mt-1">
                          Budget approval delays affecting 5 enterprise deals
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-green-800">Low Risk</p>
                        <p className="text-xs text-green-700 mt-1">
                          Strong pipeline coverage with 2.3x quota in opportunities
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Mitigation Actions</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Accelerate 2 backup deals in Q2</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Increase prospecting activities by 20%</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-gray-400 mt-1 flex-shrink-0" />
                      <p className="text-xs text-gray-700">Focus on higher-probability deals</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quota Tracking View */}
        {selectedView === "quota-tracking" && (
          <div className="space-y-6">
            {/* Team Quota Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Team Quota Performance</h3>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                  <div>
                    <span className="text-gray-600">Total Quota: </span>
                    <span className="font-medium text-gray-900">{formatCurrency(totalQuota)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Achieved: </span>
                    <span className="font-medium text-green-600">{formatCurrency(totalAchieved)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Forecast: </span>
                    <span className="font-medium text-blue-600">{formatCurrency(totalForecast)}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales Rep
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quota
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Achieved
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Forecast
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Probability
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pipeline
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredSalesReps.map((rep, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm flex-shrink-0">
                              {rep.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <span className="text-sm font-medium text-gray-900 whitespace-nowrap">{rep.name}</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.quota)}</td>
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.achieved)}</td>
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.forecast)}</td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full min-w-[60px]">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  (rep.achieved / rep.quota) * 100 >= 80
                                    ? "bg-green-500"
                                    : (rep.achieved / rep.quota) * 100 >= 60
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }`}
                                style={{ width: `${Math.min((rep.achieved / rep.quota) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 w-8 text-right">
                              {((rep.achieved / rep.quota) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rep.probability >= 85
                                ? "bg-green-100 text-green-800"
                                : rep.probability >= 70
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {rep.probability}%
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.pipeline)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredSalesReps.slice(0, 6).map((rep, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium flex-shrink-0">
                      {rep.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">{rep.name}</h4>
                      <p className="text-xs text-gray-600">{rep.deals} active deals</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Quota Achievement</span>
                        <span className="text-xs font-medium text-gray-900">
                          {((rep.achieved / rep.quota) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((rep.achieved / rep.quota) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Forecast vs Quota</span>
                        <span className="text-xs font-medium text-gray-900">
                          {((rep.forecast / rep.quota) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((rep.forecast / rep.quota) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">Pipeline Coverage</span>
                        <span className="text-xs font-medium text-gray-900">
                          {((rep.pipeline / rep.quota) * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className="h-full bg-purple-500 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((rep.pipeline / rep.quota) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-xs text-gray-600">Achieved</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(rep.achieved)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600">Remaining</p>
                        <p className="text-sm font-medium text-gray-900">{formatCurrency(rep.quota - rep.achieved)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Product Forecast View */}
        {selectedView === "product-forecast" && (
          <div className="space-y-6">
            {/* Product Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Product Line Forecast</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Q1 Actual
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Q1 Forecast
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Q2 Forecast
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Growth
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Confidence
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Trend
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productForecast.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">{formatCurrency(product.q1Actual)}</td>
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                          {formatCurrency(product.q1Forecast)}
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">
                          {formatCurrency(product.q2Forecast)}
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <span
                            className={`text-sm flex items-center ${product.growth >= 20 ? "text-green-600" : product.growth >= 10 ? "text-blue-600" : "text-amber-600"}`}
                          >
                            {product.growth >= 15 ? (
                              <TrendingUp className="w-4 h-4 mr-1" />
                            ) : (
                              <TrendingUp className="w-4 h-4 mr-1" />
                            )}
                            {product.growth}%
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full min-w-[60px]">
                              <div
                                className={`h-full rounded-full transition-all duration-300 ${
                                  product.confidence >= 85
                                    ? "bg-green-500"
                                    : product.confidence >= 75
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }`}
                                style={{ width: `${product.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 w-8 text-right">{product.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-6 rounded-sm transition-all duration-300 ${
                                  i < Math.ceil(product.growth / 5) ? "bg-green-500" : "bg-gray-200"
                                }`}
                              ></div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
                <div className="space-y-4">
                  {productForecast.map((product, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700 truncate">{product.name}</span>
                        <span className="text-sm font-medium text-gray-900 ml-2">
                          {formatCurrency(product.q2Forecast)}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-full rounded-full transition-all duration-300`}
                          style={{
                            width: `${(product.q2Forecast / productForecast.reduce((sum, p) => sum + p.q2Forecast, 0)) * 100}%`,
                            backgroundColor:
                              index === 0 ? "#3b82f6" : index === 1 ? "#6366f1" : index === 2 ? "#8b5cf6" : "#ec4899",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Comparison</h3>
                <div className="space-y-6">
                  {productForecast.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-20 sm:w-24 text-sm text-gray-700 truncate flex-shrink-0">{product.name}</div>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full flex items-center pl-2 transition-all duration-300 ${
                            product.growth >= 20
                              ? "bg-green-500"
                              : product.growth >= 15
                                ? "bg-blue-500"
                                : "bg-amber-500"
                          }`}
                          style={{ width: `${(product.growth / 25) * 100}%` }}
                        >
                          <span className="text-xs font-medium text-white">{product.growth}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accuracy Analysis View */}
        {selectedView === "accuracy" && (
          <div className="space-y-6">
            {/* Accuracy Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Forecast Accuracy Analysis</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Average Accuracy:</span>
                  <span className="font-medium text-green-600">94.4%</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Period
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Forecast
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actual
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Variance
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Accuracy
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {accuracyData.map((period, index) => {
                      const variance = period.actual - period.forecast
                      const variancePercent = ((variance / period.forecast) * 100).toFixed(1)
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-3 sm:px-6 py-4 text-sm font-medium text-gray-900">{period.period}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">{formatCurrency(period.forecast)}</td>
                          <td className="px-3 sm:px-6 py-4 text-sm text-gray-900">{formatCurrency(period.actual)}</td>
                          <td className="px-3 sm:px-6 py-4">
                            <span
                              className={`text-sm flex items-center ${variance >= 0 ? "text-green-600" : "text-red-600"}`}
                            >
                              {variance >= 0 ? <Plus className="w-3 h-3 mr-1" /> : <Minus className="w-3 h-3 mr-1" />}
                              {formatCurrency(Math.abs(variance))} ({variancePercent}%)
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-gray-100 rounded-full min-w-[60px]">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    period.accuracy >= 95
                                      ? "bg-green-500"
                                      : period.accuracy >= 90
                                        ? "bg-blue-500"
                                        : "bg-amber-500"
                                  }`}
                                  style={{ width: `${period.accuracy}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 w-10 text-right">{period.accuracy}%</span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                period.accuracy >= 95
                                  ? "bg-green-100 text-green-800"
                                  : period.accuracy >= 90
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {period.accuracy >= 95
                                ? "Excellent"
                                : period.accuracy >= 90
                                  ? "Good"
                                  : "Needs Improvement"}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Accuracy Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Accuracy Trends</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm font-medium text-green-800">Improving Accuracy</p>
                        <p className="text-xs text-green-600">Q4 2023 showed best performance</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-green-600">98.8%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendDown className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Recent Decline</p>
                        <p className="text-xs text-amber-600">Q1 2024 below average</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-amber-600">89.7%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-800">Average Performance</p>
                        <p className="text-xs text-blue-600">Last 5 quarters</p>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-blue-600">94.4%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Improvement Recommendations</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Refine Forecasting Models</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Incorporate more market indicators and seasonal factors
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Increase Update Frequency</p>
                      <p className="text-xs text-gray-600 mt-1">Update forecasts bi-weekly instead of monthly</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Sales Team Training</p>
                      <p className="text-xs text-gray-600 mt-1">Improve deal probability assessment skills</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <BarChart3 className="w-4 h-4 text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900">Data Quality Enhancement</p>
                      <p className="text-xs text-gray-600 mt-1">Implement better pipeline data validation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scenarios View */}
        {selectedView === "scenarios" && (
          <div className="space-y-6">
            {/* Scenario Planning */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-gray-900">Scenario Planning</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">Planning Period:</span>
                  <span className="font-medium text-gray-900">FY 2024</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Best Case Scenario */}
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-green-800">Best Case</h4>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      {scenarioData.bestCase.probability}% probability
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(scenarioData.bestCase.revenue)}</p>
                    <p className="text-sm text-green-700">Annual Revenue</p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-green-800">Key Factors:</h5>
                    {scenarioData.bestCase.factors.map((factor, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-green-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Most Likely Scenario */}
                <div className="p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-blue-800">Most Likely</h4>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {scenarioData.mostLikely.probability}% probability
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold text-blue-900">
                      {formatCurrency(scenarioData.mostLikely.revenue)}
                    </p>
                    <p className="text-sm text-blue-700">Annual Revenue</p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-blue-800">Key Factors:</h5>
                    {scenarioData.mostLikely.factors.map((factor, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-blue-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Worst Case Scenario */}
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-red-800">Worst Case</h4>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                      {scenarioData.worstCase.probability}% probability
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-2xl font-bold text-red-900">{formatCurrency(scenarioData.worstCase.revenue)}</p>
                    <p className="text-sm text-red-700">Annual Revenue</p>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-sm font-medium text-red-800">Risk Factors:</h5>
                    {scenarioData.worstCase.factors.map((factor, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-red-700">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario Impact Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Impact Comparison</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Best Case vs Current</span>
                      <span className="text-sm font-medium text-green-600">+24%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Most Likely vs Current</span>
                      <span className="text-sm font-medium text-blue-600">Baseline</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "80%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Worst Case vs Current</span>
                      <span className="text-sm font-medium text-red-600">-24%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Expected Value</h4>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Weighted Average Revenue</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(
                        (scenarioData.bestCase.revenue * scenarioData.bestCase.probability +
                          scenarioData.mostLikely.revenue * scenarioData.mostLikely.probability +
                          scenarioData.worstCase.revenue * scenarioData.worstCase.probability) /
                          100,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contingency Planning</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h4 className="text-sm font-medium text-green-800 mb-2">Upside Opportunities</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-green-700">Accelerate enterprise sales cycle</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-green-700">Launch new product features early</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-green-700">Expand into new markets</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="text-sm font-medium text-red-800 mb-2">Risk Mitigation</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-red-700">Diversify customer base</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-red-700">Reduce operational costs</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-red-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-red-700">Strengthen competitive positioning</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 mb-2">Monitoring Indicators</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-blue-700">Monthly pipeline velocity</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-blue-700">Customer churn rates</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-xs text-blue-700">Market sentiment indicators</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForecastPage
