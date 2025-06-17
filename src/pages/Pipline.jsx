"use client"

import { useState, useMemo } from "react"
import {
  Calendar,
  ChevronDown,
  Download,
  Filter,
  RefreshCcw,
  Share2,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Layers,
  DollarSign,
  Clock,
  Target,
  Award,
  Percent,
  AlertCircle,
  Activity,
  Eye,
  Edit,
  Trash2,
  Search,
} from "lucide-react"

const SalesPipelinePage = () => {
  const [dateRange, setDateRange] = useState("This Quarter")
  const [selectedView, setSelectedView] = useState("overview")
  const [selectedChart, setSelectedChart] = useState("funnel")
  const [selectedTeamMember, setSelectedTeamMember] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [selectedStage, setSelectedStage] = useState("all")
  const [selectedRep, setSelectedRep] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  // Sample data for pipeline stages
  const [pipelineStages] = useState([
    {
      id: "prospecting",
      name: "Prospecting",
      count: 42,
      value: 2100000,
      conversion: 65,
      trend: 8,
      color: "bg-blue-500",
      avgTime: 7,
    },
    {
      id: "qualification",
      name: "Qualification",
      count: 28,
      value: 1680000,
      conversion: 70,
      trend: 5,
      color: "bg-indigo-500",
      avgTime: 5,
    },
    {
      id: "needs-analysis",
      name: "Needs Analysis",
      count: 21,
      value: 1470000,
      conversion: 75,
      trend: 12,
      color: "bg-purple-500",
      avgTime: 8,
    },
    {
      id: "proposal",
      name: "Proposal",
      count: 16,
      value: 1280000,
      conversion: 80,
      trend: -3,
      color: "bg-orange-500",
      avgTime: 6,
    },
    {
      id: "negotiation",
      name: "Negotiation",
      count: 12,
      value: 1080000,
      conversion: 85,
      trend: 4,
      color: "bg-amber-500",
      avgTime: 4,
    },
    {
      id: "closed-won",
      name: "Closed Won",
      count: 9,
      value: 810000,
      conversion: 75,
      trend: 15,
      color: "bg-green-500",
      avgTime: 0,
    },
  ])

  // Sample data for sales reps
  const [salesReps] = useState([
    {
      id: "priya",
      name: "Priya Singh",
      deals: 18,
      value: 1250000,
      conversion: 32,
      avgDealSize: 69444,
      avgCycleLength: 28,
      quota: 1500000,
      region: "north",
    },
    {
      id: "amit",
      name: "Amit Kumar",
      deals: 15,
      value: 980000,
      conversion: 28,
      avgDealSize: 65333,
      avgCycleLength: 32,
      quota: 1200000,
      region: "south",
    },
    {
      id: "neha",
      name: "Neha Agarwal",
      deals: 22,
      value: 1450000,
      conversion: 35,
      avgDealSize: 65909,
      avgCycleLength: 25,
      quota: 1600000,
      region: "west",
    },
    {
      id: "rohit",
      name: "Rohit Verma",
      deals: 12,
      value: 850000,
      conversion: 25,
      avgDealSize: 70833,
      avgCycleLength: 35,
      quota: 1100000,
      region: "east",
    },
    {
      id: "kavya",
      name: "Kavya Sharma",
      deals: 20,
      value: 1350000,
      conversion: 30,
      avgDealSize: 67500,
      avgCycleLength: 30,
      quota: 1400000,
      region: "international",
    },
  ])

  // Sample data for deals
  const [deals] = useState([
    {
      id: "1",
      name: "Enterprise Software Solution",
      stage: "prospecting",
      amount: 500000,
      probability: 20,
      expectedClose: "2024-03-15",
      owner: "Priya Singh",
      company: "Tech Corp",
      product: "software",
      region: "north",
      createdAt: "2024-01-10",
    },
    {
      id: "2",
      name: "CRM Implementation",
      stage: "qualification",
      amount: 300000,
      probability: 40,
      expectedClose: "2024-04-10",
      owner: "Neha Agarwal",
      company: "StartupXYZ",
      product: "software",
      region: "west",
      createdAt: "2024-01-15",
    },
    {
      id: "3",
      name: "Cloud Infrastructure Setup",
      stage: "proposal",
      amount: 750000,
      probability: 60,
      expectedClose: "2024-03-20",
      owner: "Rohit Verma",
      company: "Enterprise Ltd",
      product: "consulting",
      region: "east",
      createdAt: "2024-01-08",
    },
    {
      id: "4",
      name: "Mobile App Development",
      stage: "negotiation",
      amount: 400000,
      probability: 80,
      expectedClose: "2024-02-15",
      owner: "Kavya Sharma",
      company: "Digital Solutions",
      product: "software",
      region: "international",
      createdAt: "2024-01-20",
    },
    {
      id: "5",
      name: "Website Redesign",
      stage: "closed-won",
      amount: 200000,
      probability: 100,
      expectedClose: "2024-01-30",
      owner: "Priya Singh",
      company: "Local Business",
      product: "consulting",
      region: "north",
      createdAt: "2024-01-05",
    },
    {
      id: "6",
      name: "Data Analytics Platform",
      stage: "needs-analysis",
      amount: 600000,
      probability: 50,
      expectedClose: "2024-04-05",
      owner: "Amit Kumar",
      company: "Analytics Inc",
      product: "software",
      region: "south",
      createdAt: "2024-01-12",
    },
  ])

  // Sample data for monthly trends
  const monthlyTrends = [
    { month: "Jan", value: 950000, deals: 14, won: 3, lost: 2 },
    { month: "Feb", value: 1050000, deals: 16, won: 4, lost: 1 },
    { month: "Mar", value: 1200000, deals: 18, won: 5, lost: 2 },
    { month: "Apr", value: 980000, deals: 15, won: 3, lost: 3 },
    { month: "May", value: 1150000, deals: 17, won: 6, lost: 1 },
    { month: "Jun", value: 1300000, deals: 20, won: 7, lost: 2 },
    { month: "Jul", value: 1100000, deals: 16, won: 4, lost: 2 },
    { month: "Aug", value: 1250000, deals: 19, won: 5, lost: 1 },
    { month: "Sep", value: 1400000, deals: 21, won: 8, lost: 2 },
    { month: "Oct", value: 1350000, deals: 20, won: 6, lost: 3 },
    { month: "Nov", value: 1500000, deals: 22, won: 7, lost: 1 },
    { month: "Dec", value: 1650000, deals: 24, won: 9, lost: 2 },
  ]

  // Filter data based on current filters
  const filteredData = useMemo(() => {
    const filteredDeals = deals.filter((deal) => {
      const matchesSearch =
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.company.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTeamMember =
        selectedTeamMember === "all" || deal.owner === salesReps.find((rep) => rep.id === selectedTeamMember)?.name
      const matchesProduct = selectedProduct === "all" || deal.product === selectedProduct
      const matchesRegion = selectedRegion === "all" || deal.region === selectedRegion
      const matchesStage = selectedStage === "all" || deal.stage === selectedStage

      return matchesSearch && matchesTeamMember && matchesProduct && matchesRegion && matchesStage
    })

    // Calculate filtered pipeline stages
    const filteredStages = pipelineStages.map((stage) => {
      const stageDeals = filteredDeals.filter((deal) => deal.stage === stage.id)
      return {
        ...stage,
        count: stageDeals.length,
        value: stageDeals.reduce((sum, deal) => sum + deal.amount, 0),
      }
    })

    // Calculate filtered sales reps
    const filteredReps = salesReps.map((rep) => {
      const repDeals = filteredDeals.filter((deal) => deal.owner === rep.name)
      return {
        ...rep,
        deals: repDeals.length,
        value: repDeals.reduce((sum, deal) => sum + deal.amount, 0),
      }
    })

    return {
      deals: filteredDeals,
      stages: filteredStages,
      reps: filteredReps,
    }
  }, [deals, pipelineStages, salesReps, searchTerm, selectedTeamMember, selectedProduct, selectedRegion, selectedStage])

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalPipelineValue = filteredData.stages.reduce((sum, stage) => sum + stage.value, 0)
    const weightedPipelineValue = filteredData.stages.reduce(
      (sum, stage) => sum + (stage.value * stage.conversion) / 100,
      0,
    )
    const totalDeals = filteredData.stages.reduce((sum, stage) => sum + stage.count, 0)
    const avgDealSize = totalDeals > 0 ? totalPipelineValue / totalDeals : 0
    const avgSalesCycle = 32
    const winRate =
      totalDeals > 0
        ? ((filteredData.stages.find((stage) => stage.id === "closed-won")?.count || 0) / totalDeals) * 100
        : 0
    const conversionRate =
      pipelineStages[0].count > 0
        ? ((filteredData.stages.find((stage) => stage.id === "closed-won")?.count || 0) / pipelineStages[0].count) * 100
        : 0

    return {
      totalPipelineValue,
      weightedPipelineValue,
      totalDeals,
      avgDealSize,
      avgSalesCycle,
      winRate,
      conversionRate,
    }
  }, [filteredData, pipelineStages])

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

  // Handle refresh
  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  // Handle export
  const handleExport = () => {
    const csvData = [
      ["Deal Name", "Stage", "Amount", "Probability", "Expected Close", "Owner", "Company"],
      ...filteredData.deals.map((deal) => [
        deal.name,
        deal.stage,
        deal.amount,
        deal.probability,
        deal.expectedClose,
        deal.owner,
        deal.company,
      ]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `sales-pipeline-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Sales Pipeline Report",
        text: `Pipeline Value: ${formatCurrency(metrics.totalPipelineValue)}, Total Deals: ${metrics.totalDeals}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  // Calculate chart dimensions
  const maxCount = Math.max(...filteredData.stages.map((stage) => stage.count))
  const maxValue = Math.max(...filteredData.stages.map((stage) => stage.value))

  const getHeight = (count) => Math.max(40, (count / maxCount) * 100)
  const getWidth = (value) => (value / maxValue) * 100

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sales Pipeline</h1>
              <p className="text-gray-600 mt-1">Analyze your sales pipeline performance and trends</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleExport}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleRefresh}
                className={`px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors ${refreshing ? "opacity-50" : ""}`}
                disabled={refreshing}
              >
                <RefreshCcw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8"
                >
                  <option>This Quarter</option>
                  <option>Last Quarter</option>
                  <option>This Year</option>
                  <option>Last Year</option>
                  <option>Custom Range</option>
                </select>
              </div>

              <div className="h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedTeamMember}
                  onChange={(e) => setSelectedTeamMember(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8"
                >
                  <option value="all">All Team Members</option>
                  {salesReps.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8"
                >
                  <option value="all">All Products</option>
                  <option value="software">Software Solutions</option>
                  <option value="consulting">Consulting Services</option>
                  <option value="implementation">Implementation</option>
                  <option value="support">Support Packages</option>
                </select>
              </div>

              <div className="h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8"
                >
                  <option value="all">All Regions</option>
                  <option value="north">North India</option>
                  <option value="south">South India</option>
                  <option value="east">East India</option>
                  <option value="west">West India</option>
                  <option value="international">International</option>
                </select>
              </div>

              <div className="ml-auto">
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Advanced Filters
                  <ChevronDown className={`w-4 h-4 transition-transform ${showAdvancedFilters ? "rotate-180" : ""}`} />
                </button>
              </div>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search Deals</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search deals or companies..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
                    <select
                      value={selectedStage}
                      onChange={(e) => setSelectedStage(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Stages</option>
                      {pipelineStages.map((stage) => (
                        <option key={stage.id} value={stage.id}>
                          {stage.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sales Rep</label>
                    <select
                      value={selectedRep}
                      onChange={(e) => setSelectedRep(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Reps</option>
                      {salesReps.map((rep) => (
                        <option key={rep.id} value={rep.id}>
                          {rep.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {filteredData.deals.length} of {deals.length} deals
                  </div>
                  <button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedStage("all")
                      setSelectedRep("all")
                      setSelectedTeamMember("all")
                      setSelectedProduct("all")
                      setSelectedRegion("all")
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalPipelineValue)}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    12.5% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weighted Pipeline</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.weightedPipelineValue)}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    8.3% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Win Rate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.winRate.toFixed(1)}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    2.1% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Sales Cycle</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.avgSalesCycle} days</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    5.2% faster vs last period
                  </span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex items-center border-b border-gray-200 mb-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "by-stage", label: "By Stage" },
            { id: "by-rep", label: "By Sales Rep" },
            { id: "trends", label: "Trends" },
            { id: "forecast", label: "Forecast" },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                selectedView === view.id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Overview View */}
        {selectedView === "overview" && (
          <div className="space-y-6">
            {/* Chart Type Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Pipeline Visualization</h2>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  {[
                    { id: "funnel", label: "Funnel" },
                    { id: "bar", label: "Bar" },
                    { id: "pie", label: "Pie" },
                  ].map((chart) => (
                    <button
                      key={chart.id}
                      onClick={() => setSelectedChart(chart.id)}
                      className={`px-3 py-1.5 text-sm transition-colors ${
                        selectedChart === chart.id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {chart.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Funnel Chart */}
              {selectedChart === "funnel" && (
                <div className="flex flex-col items-center space-y-4 py-4">
                  {filteredData.stages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="w-full flex flex-col items-center"
                      style={{ maxWidth: `${100 - index * 8}%` }}
                    >
                      <div
                        className={`w-full ${stage.color} rounded-lg flex items-center justify-center text-white p-4 min-h-[60px]`}
                      >
                        <div className="text-center">
                          <p className="font-medium">{stage.name}</p>
                          <p className="text-sm opacity-90">
                            {stage.count} deals · {formatCurrency(stage.value)}
                          </p>
                        </div>
                      </div>
                      {index < filteredData.stages.length - 1 && (
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[15px] border-t-gray-300 mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Bar Chart */}
              {selectedChart === "bar" && (
                <div className="space-y-4 py-4">
                  {filteredData.stages.map((stage) => (
                    <div key={stage.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                        <span className="text-sm text-gray-600">{formatCurrency(stage.value)}</span>
                      </div>
                      <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stage.color} rounded-full flex items-center pl-3 transition-all duration-500`}
                          style={{ width: `${getWidth(stage.value)}%` }}
                        >
                          <span className="text-xs font-medium text-white">{stage.count} deals</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pie Chart */}
              {selectedChart === "pie" && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
                  <div className="relative w-64 h-64">
                    <svg className="w-full h-full" viewBox="0 0 200 200">
                      {filteredData.stages.map((stage, index) => {
                        const total = metrics.totalPipelineValue
                        const percentage = total > 0 ? (stage.value / total) * 100 : 0
                        const angle = (percentage / 100) * 360
                        const startAngle = filteredData.stages
                          .slice(0, index)
                          .reduce((sum, s) => sum + (s.value / total) * 360, 0)

                        const x1 = 100 + 80 * Math.cos(((startAngle - 90) * Math.PI) / 180)
                        const y1 = 100 + 80 * Math.sin(((startAngle - 90) * Math.PI) / 180)
                        const x2 = 100 + 80 * Math.cos(((startAngle + angle - 90) * Math.PI) / 180)
                        const y2 = 100 + 80 * Math.sin(((startAngle + angle - 90) * Math.PI) / 180)

                        const largeArcFlag = angle > 180 ? 1 : 0

                        const pathData = [
                          `M 100 100`,
                          `L ${x1} ${y1}`,
                          `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                          `Z`,
                        ].join(" ")

                        return (
                          <path
                            key={stage.id}
                            d={pathData}
                            fill={stage.color.replace("bg-", "#").replace("-500", "")}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        )
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(metrics.totalPipelineValue)}</p>
                        <p className="text-sm text-gray-600">Total Pipeline</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {filteredData.stages.map((stage) => (
                      <div key={stage.id} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{stage.name}</p>
                          <p className="text-xs text-gray-600">
                            {metrics.totalPipelineValue > 0
                              ? ((stage.value / metrics.totalPipelineValue) * 100).toFixed(1)
                              : 0}
                            % · {formatCurrency(stage.value)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Pipeline Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Pipeline Metrics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Metrics</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Total Deals</span>
                      <span className="text-sm font-medium text-gray-900">{metrics.totalDeals}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Avg Deal Size</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(metrics.avgDealSize)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="text-sm font-medium text-gray-900">{metrics.conversionRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.min(metrics.conversionRate, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Avg Sales Cycle</span>
                      <span className="text-sm font-medium text-gray-900">{metrics.avgSalesCycle} days</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "70%" }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Pipeline Health</h4>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="text-green-600 font-medium">A+</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Healthy Pipeline</p>
                      <p className="text-xs text-gray-600">Good distribution across stages</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers</h3>
                <div className="space-y-4">
                  {filteredData.reps
                    .sort((a, b) => b.value - a.value)
                    .slice(0, 3)
                    .map((rep, index) => (
                      <div key={rep.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                          {rep.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{rep.name}</p>
                            <p className="text-sm font-medium text-gray-900">{formatCurrency(rep.value)}</p>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-gray-600">{rep.deals} deals</p>
                            <p className="text-xs text-green-600">{rep.conversion}% win rate</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Insights</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <ArrowUpRight className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-xs text-gray-700">Neha has the highest conversion rate at 35%</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowDownRight className="w-4 h-4 text-red-600 mt-0.5" />
                      <p className="text-xs text-gray-700">Rohit's cycle length increased by 5 days</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowUpRight className="w-4 h-4 text-green-600 mt-0.5" />
                      <p className="text-xs text-gray-700">Priya closed the largest deal this quarter</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conversion Analysis */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Conversion</h3>
                <div className="space-y-4">
                  {filteredData.stages.slice(0, -1).map((stage, index) => {
                    const nextStage = filteredData.stages[index + 1]
                    const conversionRate = stage.count > 0 ? (nextStage.count / stage.count) * 100 : 0
                    return (
                      <div key={stage.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <span>{stage.name}</span>
                            <ArrowRight className="w-3 h-3" />
                            <span>{nextStage.name}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{conversionRate.toFixed(1)}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              conversionRate >= 70
                                ? "bg-green-500"
                                : conversionRate >= 50
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                            style={{ width: `${conversionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Bottlenecks</h4>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Proposal to Negotiation</p>
                        <p className="text-xs text-amber-700 mt-1">
                          This stage has the lowest conversion rate. Consider reviewing proposal templates and pricing
                          strategies.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Deals */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Deals</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Deal Name
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Probability
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expected Close
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.deals.slice(0, 5).map((deal) => {
                      const stage = pipelineStages.find((s) => s.id === deal.stage)
                      return (
                        <tr key={deal.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">{deal.name}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stage?.color.replace("bg-", "bg-").replace("-500", "-100")} ${stage?.color.replace("bg-", "text-").replace("-500", "-800")}`}
                            >
                              {stage?.name}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(deal.amount)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{deal.probability}%</td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {new Date(deal.expectedClose).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{deal.owner}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 text-gray-400 hover:text-blue-600">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-green-600">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-red-600">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* By Stage View */}
        {selectedView === "by-stage" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stage Distribution */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Distribution</h3>
                <div className="space-y-4">
                  {filteredData.stages.map((stage) => (
                    <div key={stage.id}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                          <span className="text-sm text-gray-700">{stage.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">{stage.count} deals</span>
                          <span className="text-sm font-medium text-gray-900 w-24 text-right">
                            {formatCurrency(stage.value)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                          style={{
                            width: `${metrics.totalPipelineValue > 0 ? (stage.value / metrics.totalPipelineValue) * 100 : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stage Metrics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Stage Metrics</h3>
                <div className="grid grid-cols-2 gap-4">
                  {filteredData.stages.map((stage) => (
                    <div key={stage.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                        <h4 className="text-sm font-medium text-gray-900">{stage.name}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <p className="text-gray-600">Deals</p>
                          <p className="font-medium text-gray-900">{stage.count}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Value</p>
                          <p className="font-medium text-gray-900">{formatCurrency(stage.value)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Conversion</p>
                          <p className="font-medium text-gray-900">{stage.conversion}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Trend</p>
                          <p
                            className={`font-medium flex items-center ${stage.trend >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {stage.trend >= 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(stage.trend)}%
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stage Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Stage Details</h3>
                  <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Stages</option>
                    {pipelineStages.map((stage) => (
                      <option key={stage.id} value={stage.id}>
                        {stage.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Deals</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Size</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Conversion
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.stages.map((stage) => (
                      <tr key={stage.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                            <span className="text-sm font-medium text-gray-900">{stage.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{stage.count}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(stage.value)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {stage.count > 0 ? formatCurrency(stage.value / stage.count) : formatCurrency(0)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{stage.conversion}%</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{stage.avgTime} days</td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm flex items-center ${stage.trend >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {stage.trend >= 0 ? (
                              <TrendingUp className="w-4 h-4 mr-1" />
                            ) : (
                              <TrendingDown className="w-4 h-4 mr-1" />
                            )}
                            {Math.abs(stage.trend)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* By Sales Rep View */}
        {selectedView === "by-rep" && (
          <div className="space-y-6">
            {/* Sales Rep Performance */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Sales Rep Performance</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales Rep
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Deals</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pipeline Value
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Deal Size
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Win Rate</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Avg Cycle
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quota Attainment
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.reps.map((rep) => {
                      const quotaAttainment = (rep.value / rep.quota) * 100
                      return (
                        <tr key={rep.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium text-sm">
                                {rep.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              <span className="text-sm font-medium text-gray-900">{rep.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{rep.deals}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.value)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.avgDealSize)}</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{rep.conversion}%</td>
                          <td className="px-6 py-4 text-sm text-gray-900">{rep.avgCycleLength} days</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-2 bg-gray-200 rounded-full">
                                <div
                                  className={`h-full rounded-full ${quotaAttainment >= 100 ? "bg-green-500" : quotaAttainment >= 75 ? "bg-yellow-500" : "bg-red-500"}`}
                                  style={{ width: `${Math.min(quotaAttainment, 100)}%` }}
                                ></div>
                              </div>
                              <span className="text-sm text-gray-600">{quotaAttainment.toFixed(0)}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-8 rounded-sm ${
                                    i < Math.ceil(rep.conversion / 10) ? "bg-green-500" : "bg-gray-200"
                                  }`}
                                ></div>
                              ))}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Rep Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deal Distribution */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Distribution</h3>
                <div className="space-y-4">
                  {filteredData.reps.map((rep, index) => {
                    const totalValue = filteredData.reps.reduce((sum, r) => sum + r.value, 0)
                    const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e"]
                    return (
                      <div key={rep.id}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-700">{rep.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600">{rep.deals} deals</span>
                            <span className="text-sm font-medium text-gray-900 w-24 text-right">
                              {formatCurrency(rep.value)}
                            </span>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${totalValue > 0 ? (rep.value / totalValue) * 100 : 0}%`,
                              backgroundColor: colors[index % colors.length],
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Win Rate Comparison */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Win Rate Comparison</h3>
                <div className="space-y-6">
                  {filteredData.reps.map((rep) => (
                    <div key={rep.id} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">{rep.name.split(" ")[0]}</div>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 flex items-center pl-2 transition-all duration-500"
                          style={{ width: `${rep.conversion}%` }}
                        >
                          <span className="text-xs font-medium text-white">{rep.conversion}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Rep Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Rep Details</h3>
                <select
                  value={selectedRep}
                  onChange={(e) => setSelectedRep(e.target.value)}
                  className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Reps</option>
                  {salesReps.map((rep) => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Rep Stats */}
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Pipeline Value</p>
                      <DollarSign className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(filteredData.reps[0]?.value || 0)}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        15.2% vs last period
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Win Rate</p>
                      <Percent className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{filteredData.reps[0]?.conversion || 0}%</p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-green-600 flex items-center">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        3.5% vs last period
                      </span>
                    </div>
                  </div>

                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Avg Deal Size</p>
                      <Target className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(filteredData.reps[0]?.avgDealSize || 0)}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-xs text-red-600 flex items-center">
                        <TrendingDown className="w-3 h-3 mr-1" />
                        2.1% vs last period
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stage Distribution */}
                <div className="col-span-2 p-4 border border-gray-200 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Stage Distribution</h4>
                  <div className="space-y-3">
                    {filteredData.stages.map((stage) => (
                      <div key={stage.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${stage.color}`}></div>
                            <span className="text-xs text-gray-700">{stage.name}</span>
                          </div>
                          <span className="text-xs text-gray-600">{Math.floor(stage.count / 3)} deals</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full">
                          <div
                            className={`h-full ${stage.color} rounded-full transition-all duration-500`}
                            style={{
                              width: `${metrics.totalDeals > 0 ? (stage.count / metrics.totalDeals) * 100 : 0}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Performance Insights</h4>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-600 mt-0.5" />
                        <p className="text-xs text-gray-700">Highest conversion rate in Proposal stage (85%)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowDownRight className="w-4 h-4 text-red-600 mt-0.5" />
                        <p className="text-xs text-gray-700">Needs improvement in Prospecting stage (20%)</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowUpRight className="w-4 h-4 text-green-600 mt-0.5" />
                        <p className="text-xs text-gray-700">Closed 3 deals in the last 30 days</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Trends View */}
        {selectedView === "trends" && (
          <div className="space-y-6">
            {/* Monthly Trends */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Trends</h3>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="px-3 py-1.5 text-sm bg-blue-100 text-blue-600">Value</button>
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Deals</button>
                  <button className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50">Win Rate</button>
                </div>
              </div>

              {/* Simple Line Chart */}
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {monthlyTrends.map((month, index) => {
                  const maxValue = Math.max(...monthlyTrends.map((m) => m.value))
                  const height = (month.value / maxValue) * 100
                  return (
                    <div key={month.month} className="flex flex-col items-center gap-2">
                      <div className="text-xs text-gray-600">{formatCurrency(month.value)}</div>
                      <div
                        className="w-8 bg-blue-500 rounded-t hover:bg-blue-600 transition-colors cursor-pointer"
                        style={{ height: `${height}%` }}
                        title={`${month.month}: ${formatCurrency(month.value)}`}
                      ></div>
                      <div className="text-xs text-gray-500">{month.month}</div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Trend Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Pipeline Growth</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-green-800">Quarter over Quarter</p>
                      <p className="text-xs text-green-600">Pipeline value increased</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-800">+18.5%</p>
                      <p className="text-xs text-green-600">vs last quarter</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-blue-800">Deal Velocity</p>
                      <p className="text-xs text-blue-600">Average time to close</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-800">-5 days</p>
                      <p className="text-xs text-blue-600">faster than last quarter</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-amber-800">Conversion Rate</p>
                      <p className="text-xs text-amber-600">Lead to customer</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-800">24.3%</p>
                      <p className="text-xs text-amber-600">+2.1% vs last quarter</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seasonal Patterns</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q1 Performance</span>
                      <span className="text-sm font-medium text-gray-900">Strong</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q2 Performance</span>
                      <span className="text-sm font-medium text-gray-900">Moderate</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q3 Performance</span>
                      <span className="text-sm font-medium text-gray-900">Excellent</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "95%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q4 Forecast</span>
                      <span className="text-sm font-medium text-gray-900">Projected</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Forecast View */}
        {selectedView === "forecast" && (
          <div className="space-y-6">
            {/* Forecast Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Next Quarter Forecast</h3>
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Projected Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(4200000)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Confidence Level</p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-gray-100 rounded-full flex-1">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: "78%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">78%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Deal Closure Prediction</h3>
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Expected Deals</p>
                    <p className="text-2xl font-bold text-gray-900">24</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">High Probability</p>
                    <div className="flex items-center gap-2">
                      <div className="h-2 bg-gray-100 rounded-full flex-1">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">16 deals</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Risk Assessment</h3>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">At Risk Deals</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Risk Value</p>
                    <p className="text-lg font-medium text-red-600">{formatCurrency(850000)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Forecast Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Deal</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Probability
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expected Close
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Weighted Value
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredData.deals
                      .filter((deal) => deal.stage !== "closed-won")
                      .map((deal) => {
                        const weightedValue = deal.amount * (deal.probability / 100)
                        const riskLevel = deal.probability >= 70 ? "Low" : deal.probability >= 40 ? "Medium" : "High"
                        const riskColor =
                          deal.probability >= 70
                            ? "text-green-600"
                            : deal.probability >= 40
                              ? "text-yellow-600"
                              : "text-red-600"

                        return (
                          <tr key={deal.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-900">{deal.name}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(deal.amount)}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-2 bg-gray-200 rounded-full">
                                  <div
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${deal.probability}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-900">{deal.probability}%</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {new Date(deal.expectedClose).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">{deal.owner}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {formatCurrency(weightedValue)}
                            </td>
                            <td className="px-6 py-4">
                              <span className={`text-sm font-medium ${riskColor}`}>{riskLevel}</span>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SalesPipelinePage
