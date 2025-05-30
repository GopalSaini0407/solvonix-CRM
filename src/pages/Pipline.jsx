"use client"

import { useState } from "react"
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
} from "lucide-react"

const SalesPipelinePage = () => {
  const [dateRange, setDateRange] = useState("This Quarter")
  const [selectedView, setSelectedView] = useState("overview")
  const [selectedChart, setSelectedChart] = useState("funnel")
  const [selectedTeamMember, setSelectedTeamMember] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState("all")
  const [selectedRegion, setSelectedRegion] = useState("all")

  // Sample data for pipeline stages
  const pipelineStages = [
    {
      id: "prospecting",
      name: "Prospecting",
      count: 42,
      value: 2100000,
      conversion: 65,
      trend: 8,
      color: "bg-blue-500",
    },
    {
      id: "qualification",
      name: "Qualification",
      count: 28,
      value: 1680000,
      conversion: 70,
      trend: 5,
      color: "bg-indigo-500",
    },
    {
      id: "needs-analysis",
      name: "Needs Analysis",
      count: 21,
      value: 1470000,
      conversion: 75,
      trend: 12,
      color: "bg-purple-500",
    },
    {
      id: "proposal",
      name: "Proposal",
      count: 16,
      value: 1280000,
      conversion: 80,
      trend: -3,
      color: "bg-orange-500",
    },
    {
      id: "negotiation",
      name: "Negotiation",
      count: 12,
      value: 1080000,
      conversion: 85,
      trend: 4,
      color: "bg-amber-500",
    },
    {
      id: "closed-won",
      name: "Closed Won",
      count: 9,
      value: 810000,
      conversion: 75,
      trend: 15,
      color: "bg-green-500",
    },
  ]

  // Sample data for sales reps
  const salesReps = [
    {
      name: "Priya Singh",
      deals: 18,
      value: 1250000,
      conversion: 32,
      avgDealSize: 69444,
      avgCycleLength: 28,
    },
    {
      name: "Amit Kumar",
      deals: 15,
      value: 980000,
      conversion: 28,
      avgDealSize: 65333,
      avgCycleLength: 32,
    },
    {
      name: "Neha Agarwal",
      deals: 22,
      value: 1450000,
      conversion: 35,
      avgDealSize: 65909,
      avgCycleLength: 25,
    },
    {
      name: "Rohit Verma",
      deals: 12,
      value: 850000,
      conversion: 25,
      avgDealSize: 70833,
      avgCycleLength: 35,
    },
    {
      name: "Kavya Sharma",
      deals: 20,
      value: 1350000,
      conversion: 30,
      avgDealSize: 67500,
      avgCycleLength: 30,
    },
  ]

  // Sample data for monthly trends
  const monthlyTrends = [
    { month: "Jan", value: 950000, deals: 14 },
    { month: "Feb", value: 1050000, deals: 16 },
    { month: "Mar", value: 1200000, deals: 18 },
    { month: "Apr", value: 980000, deals: 15 },
    { month: "May", value: 1150000, deals: 17 },
    { month: "Jun", value: 1300000, deals: 20 },
    { month: "Jul", value: 1100000, deals: 16 },
    { month: "Aug", value: 1250000, deals: 19 },
    { month: "Sep", value: 1400000, deals: 21 },
    { month: "Oct", value: 1350000, deals: 20 },
    { month: "Nov", value: 1500000, deals: 22 },
    { month: "Dec", value: 1650000, deals: 24 },
  ]

  // Calculate total pipeline value
  const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0)

  // Calculate weighted pipeline value
  const weightedPipelineValue = pipelineStages.reduce((sum, stage) => sum + (stage.value * stage.conversion) / 100, 0)

  // Calculate average deal size
  const totalDeals = pipelineStages.reduce((sum, stage) => sum + stage.count, 0)
  const avgDealSize = totalPipelineValue / totalDeals

  // Calculate average sales cycle (in days)
  const avgSalesCycle = 32

  // Calculate win rate
  const winRate = (pipelineStages.find((stage) => stage.id === "closed-won")?.count / totalDeals) * 100

  // Calculate conversion rate
  const conversionRate =
    (pipelineStages.find((stage) => stage.id === "closed-won")?.count /
      pipelineStages.find((stage) => stage.id === "prospecting")?.count) *
    100

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

  // Calculate funnel heights based on deal count
  const maxCount = Math.max(...pipelineStages.map((stage) => stage.count))
  const getHeight = (count) => {
    return Math.max(40, (count / maxCount) * 100)
  }

  // Calculate bar widths based on deal value
  const maxValue = Math.max(...pipelineStages.map((stage) => stage.value))
  const getWidth = (value) => {
    return (value / maxValue) * 100
  }

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
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <RefreshCcw className="w-4 h-4" />
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
                  <option value="priya">Priya Singh</option>
                  <option value="amit">Amit Kumar</option>
                  <option value="neha">Neha Agarwal</option>
                  <option value="rohit">Rohit Verma</option>
                  <option value="kavya">Kavya Sharma</option>
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
                <button className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                  Advanced Filters
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pipeline Value</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPipelineValue)}</p>
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
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(weightedPipelineValue)}</p>
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
                <p className="text-2xl font-bold text-gray-900">{winRate.toFixed(1)}%</p>
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
                <p className="text-2xl font-bold text-gray-900">{avgSalesCycle} days</p>
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
          <button
            onClick={() => setSelectedView("overview")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "overview"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setSelectedView("by-stage")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "by-stage"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            By Stage
          </button>
          <button
            onClick={() => setSelectedView("by-rep")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "by-rep"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            By Sales Rep
          </button>
          <button
            onClick={() => setSelectedView("trends")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "trends"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Trends
          </button>
          <button
            onClick={() => setSelectedView("forecast")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "forecast"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Forecast
          </button>
        </div>

        {/* Overview View */}
        {selectedView === "overview" && (
          <div className="space-y-6">
            {/* Chart Type Selector */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Pipeline Visualization</h2>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setSelectedChart("funnel")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedChart === "funnel" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                    }`}
                  >
                    Funnel
                  </button>
                  <button
                    onClick={() => setSelectedChart("bar")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedChart === "bar" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                    }`}
                  >
                    Bar
                  </button>
                  <button
                    onClick={() => setSelectedChart("pie")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedChart === "pie" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                    }`}
                  >
                    Pie
                  </button>
                </div>
              </div>

              {/* Funnel Chart */}
              {selectedChart === "funnel" && (
                <div className="flex flex-col items-center space-y-4 py-4">
                  {pipelineStages.map((stage, index) => (
                    <div
                      key={stage.id}
                      className="w-full flex flex-col items-center"
                      style={{ maxWidth: `${100 - index * 8}%` }}
                    >
                      <div
                        className={`w-full h-${getHeight(stage.count)} ${stage.color} rounded-lg flex items-center justify-center text-white p-4`}
                        style={{ height: `${getHeight(stage.count)}px` }}
                      >
                        <div className="text-center">
                          <p className="font-medium">{stage.name}</p>
                          <p className="text-sm opacity-90">
                            {stage.count} deals · {formatCurrency(stage.value)}
                          </p>
                        </div>
                      </div>
                      {index < pipelineStages.length - 1 && (
                        <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[15px] border-t-current text-gray-300"></div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Bar Chart */}
              {selectedChart === "bar" && (
                <div className="space-y-4 py-4">
                  {pipelineStages.map((stage) => (
                    <div key={stage.id} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{stage.name}</span>
                        <span className="text-sm text-gray-600">{formatCurrency(stage.value)}</span>
                      </div>
                      <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${stage.color} rounded-full flex items-center pl-3`}
                          style={{ width: `${getWidth(stage.value)}%` }}
                        >
                          <span className="text-xs font-medium text-white">{stage.count} deals</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pie Chart (simplified representation) */}
              {selectedChart === "pie" && (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8">
                  <div className="relative w-64 h-64">
                    <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                    {pipelineStages.map((stage, index) => {
                      const rotation = index * (360 / pipelineStages.length)
                      const skew = (stage.value / totalPipelineValue) * 360
                      return (
                        <div
                          key={stage.id}
                          className={`absolute inset-0 ${stage.color}`}
                          style={{
                            clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.cos(((rotation + skew) * Math.PI) / 180)}% ${50 - 50 * Math.sin(((rotation + skew) * Math.PI) / 180)}%, 50% 50%)`,
                            transform: `rotate(${rotation}deg)`,
                            opacity: 0.9,
                            borderRadius: "50%",
                          }}
                        ></div>
                      )
                    })}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPipelineValue)}</p>
                        <p className="text-sm text-gray-600">Total Pipeline</p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {pipelineStages.map((stage) => (
                      <div key={stage.id} className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{stage.name}</p>
                          <p className="text-xs text-gray-600">
                            {((stage.value / totalPipelineValue) * 100).toFixed(1)}% · {formatCurrency(stage.value)}
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
                      <span className="text-sm font-medium text-gray-900">{totalDeals}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Avg Deal Size</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(avgDealSize)}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Conversion Rate</span>
                      <span className="text-sm font-medium text-gray-900">{conversionRate.toFixed(1)}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${conversionRate}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Avg Sales Cycle</span>
                      <span className="text-sm font-medium text-gray-900">{avgSalesCycle} days</span>
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
                  {salesReps.slice(0, 3).map((rep, index) => (
                    <div key={index} className="flex items-center gap-3">
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
                  {pipelineStages.slice(0, -1).map((stage, index) => {
                    const nextStage = pipelineStages[index + 1]
                    const conversionRate = (nextStage.count / stage.count) * 100
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
                            className={`h-full rounded-full ${conversionRate >= 70 ? "bg-green-500" : conversionRate >= 50 ? "bg-amber-500" : "bg-red-500"}`}
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
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Enterprise Software Solution</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Prospecting
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">₹5.0L</td>
                      <td className="px-6 py-4 text-sm text-gray-900">20%</td>
                      <td className="px-6 py-4 text-sm text-gray-900">15 Mar 2024</td>
                      <td className="px-6 py-4 text-sm text-gray-900">Priya Singh</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">CRM Implementation</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          Qualification
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">₹3.0L</td>
                      <td className="px-6 py-4 text-sm text-gray-900">40%</td>
                      <td className="px-6 py-4 text-sm text-gray-900">10 Apr 2024</td>
                      <td className="px-6 py-4 text-sm text-gray-900">Neha Agarwal</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Cloud Infrastructure Setup</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Proposal
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">₹7.5L</td>
                      <td className="px-6 py-4 text-sm text-gray-900">60%</td>
                      <td className="px-6 py-4 text-sm text-gray-900">20 Mar 2024</td>
                      <td className="px-6 py-4 text-sm text-gray-900">Rohit Verma</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Mobile App Development</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Negotiation
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">₹4.0L</td>
                      <td className="px-6 py-4 text-sm text-gray-900">80%</td>
                      <td className="px-6 py-4 text-sm text-gray-900">15 Feb 2024</td>
                      <td className="px-6 py-4 text-sm text-gray-900">Kavya Sharma</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">Website Redesign</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Closed Won
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">₹2.0L</td>
                      <td className="px-6 py-4 text-sm text-gray-900">100%</td>
                      <td className="px-6 py-4 text-sm text-gray-900">30 Jan 2024</td>
                      <td className="px-6 py-4 text-sm text-gray-900">Priya Singh</td>
                    </tr>
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
                  {pipelineStages.map((stage) => (
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
                          className={`h-full ${stage.color} rounded-full`}
                          style={{ width: `${(stage.value / totalPipelineValue) * 100}%` }}
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
                  {pipelineStages.map((stage) => (
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
                  <select className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500">
                    <option>All Stages</option>
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
                    {pipelineStages.map((stage) => (
                      <tr key={stage.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                            <span className="text-sm font-medium text-gray-900">{stage.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{stage.count}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(stage.value)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(stage.value / stage.count)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{stage.conversion}%</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{Math.floor(Math.random() * 10) + 5} days</td>
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
                        Performance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {salesReps.map((rep, index) => (
                      <tr key={index} className="hover:bg-gray-50">
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
                    ))}
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
                  {salesReps.map((rep, index) => (
                    <div key={index}>
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
                          className={`h-full bg-blue-${500 - index * 100} rounded-full`}
                          style={{
                            width: `${(rep.value / salesReps.reduce((sum, r) => sum + r.value, 0)) * 100}%`,
                            backgroundColor:
                              index === 0
                                ? "#3b82f6"
                                : index === 1
                                  ? "#6366f1"
                                  : index === 2
                                    ? "#8b5cf6"
                                    : index === 3
                                      ? "#ec4899"
                                      : "#f43f5e",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Win Rate Comparison */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Win Rate Comparison</h3>
                <div className="space-y-6">
                  {salesReps.map((rep, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">{rep.name}</div>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500 flex items-center pl-2"
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
                <select className="border-gray-300 rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Reps</option>
                  {salesReps.map((rep, index) => (
                    <option key={index} value={index}>
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
                    <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(salesReps[0].value)}</p>
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
                    <p className="text-2xl font-bold text-gray-900 mt-1">{salesReps[0].conversion}%</p>
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
                    <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(salesReps[0].avgDealSize)}</p>
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
                    {pipelineStages.map((stage) => (
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
                            className={`h-full ${stage.color} rounded-full`}
                            style={{ width: `${(stage.count / totalDeals) * 100}%` }}
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
                  <button className="px-3 py-1.5 text-sm text-gray-600">Deals</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SalesPipelinePage
