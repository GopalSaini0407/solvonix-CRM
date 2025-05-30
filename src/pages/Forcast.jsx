"use client"

import { useState } from "react"
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
} from "lucide-react"

const ForecastPage = () => {
  const [dateRange, setDateRange] = useState("Q1 2024")
  const [selectedView, setSelectedView] = useState("overview")
  const [selectedModel, setSelectedModel] = useState("realistic")
  const [selectedPeriod, setSelectedPeriod] = useState("quarterly")
  const [selectedTeamMember, setSelectedTeamMember] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState("all")

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

  // Sample sales rep quota data
  const salesRepQuotas = [
    {
      name: "Priya Singh",
      quota: 1200000,
      achieved: 980000,
      forecast: 1150000,
      probability: 85,
      deals: 18,
      pipeline: 1450000,
    },
    {
      name: "Amit Kumar",
      quota: 1000000,
      achieved: 750000,
      forecast: 920000,
      probability: 78,
      deals: 15,
      pipeline: 1200000,
    },
    {
      name: "Neha Agarwal",
      quota: 1300000,
      achieved: 1100000,
      forecast: 1280000,
      probability: 92,
      deals: 22,
      pipeline: 1600000,
    },
    {
      name: "Rohit Verma",
      quota: 900000,
      achieved: 650000,
      forecast: 820000,
      probability: 72,
      deals: 12,
      pipeline: 1100000,
    },
    {
      name: "Kavya Sharma",
      quota: 1100000,
      achieved: 850000,
      forecast: 1050000,
      probability: 88,
      deals: 20,
      pipeline: 1350000,
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

  // Calculate totals
  const totalQuota = salesRepQuotas.reduce((sum, rep) => sum + rep.quota, 0)
  const totalAchieved = salesRepQuotas.reduce((sum, rep) => sum + rep.achieved, 0)
  const totalForecast = salesRepQuotas.reduce((sum, rep) => sum + rep.forecast, 0)
  const totalPipeline = salesRepQuotas.reduce((sum, rep) => sum + rep.pipeline, 0)

  const achievementRate = (totalAchieved / totalQuota) * 100
  const forecastAccuracy = 87.5
  const pipelineCoverage = (totalPipeline / totalQuota) * 100

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sales Forecast</h1>
              <p className="text-gray-600 mt-1">Predict and track your sales performance with advanced analytics</p>
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
                  <option>Q1 2024</option>
                  <option>Q2 2024</option>
                  <option>Q3 2024</option>
                  <option>Q4 2024</option>
                  <option>FY 2024</option>
                </select>
              </div>

              <div className="h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <div className="h-6 border-r border-gray-300"></div>

              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="border-none text-sm focus:ring-0 focus:outline-none pr-8"
                >
                  <option value="conservative">Conservative</option>
                  <option value="realistic">Realistic</option>
                  <option value="optimistic">Optimistic</option>
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
                <p className="text-sm font-medium text-gray-600">Total Forecast</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalForecast)}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    18.5% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Achievement Rate</p>
                <p className="text-2xl font-bold text-gray-900">{achievementRate.toFixed(1)}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    5.2% vs last period
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
                <p className="text-sm font-medium text-gray-600">Forecast Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">{forecastAccuracy}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-red-600 flex items-center">
                    <TrendingDown className="w-3 h-3 mr-1" />
                    2.3% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pipeline Coverage</p>
                <p className="text-2xl font-bold text-gray-900">{pipelineCoverage.toFixed(0)}%</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    12.8% vs last period
                  </span>
                </div>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Layers className="w-6 h-6 text-amber-600" />
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
            onClick={() => setSelectedView("quota-tracking")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "quota-tracking"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Quota Tracking
          </button>
          <button
            onClick={() => setSelectedView("product-forecast")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "product-forecast"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Product Forecast
          </button>
          <button
            onClick={() => setSelectedView("accuracy")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "accuracy"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Accuracy Analysis
          </button>
          <button
            onClick={() => setSelectedView("scenarios")}
            className={`px-4 py-3 text-sm font-medium ${
              selectedView === "scenarios"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Scenarios
          </button>
        </div>

        {/* Overview View */}
        {selectedView === "overview" && (
          <div className="space-y-6">
            {/* Forecast Models Comparison */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Forecast Models Comparison</h3>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setSelectedModel("conservative")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedModel === "conservative" ? "bg-red-100 text-red-600" : "text-gray-600"
                    }`}
                  >
                    Conservative
                  </button>
                  <button
                    onClick={() => setSelectedModel("realistic")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedModel === "realistic" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                    }`}
                  >
                    Realistic
                  </button>
                  <button
                    onClick={() => setSelectedModel("optimistic")}
                    className={`px-3 py-1.5 text-sm ${
                      selectedModel === "optimistic" ? "bg-green-100 text-green-600" : "text-gray-600"
                    }`}
                  >
                    Optimistic
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(forecastModels).map(([model, data]) => (
                  <div
                    key={model}
                    className={`p-4 rounded-lg border-2 ${
                      selectedModel === model
                        ? model === "conservative"
                          ? "border-red-200 bg-red-50"
                          : model === "realistic"
                            ? "border-blue-200 bg-blue-50"
                            : "border-green-200 bg-green-50"
                        : "border-gray-200 bg-gray-50"
                    }`}
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Forecast vs Actual</h3>
                <div className="flex items-center gap-4">
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
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{month.month}</span>
                      <div className="flex items-center gap-4 text-sm">
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
                        className="absolute left-0 top-0 h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.min((month.forecast / month.quota) * 100, 100)}%` }}
                      ></div>
                      {/* Actual bar */}
                      {month.actual > 0 && (
                        <div
                          className="absolute left-0 top-0 h-full bg-blue-500 rounded-full"
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
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Strong Q2 Growth</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Forecast shows 18.5% growth in Q2 driven by enterprise deals
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Quota Achievement</p>
                      <p className="text-xs text-gray-600 mt-1">
                        On track to achieve 95% of annual quota based on current pipeline
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Risk Alert</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Q4 forecast depends on 3 large deals closing successfully
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Zap className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
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
                      <div className="h-full bg-green-500 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q2 2024</span>
                      <span className="text-sm font-medium text-gray-900">85%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q3 2024</span>
                      <span className="text-sm font-medium text-gray-900">78%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Q4 2024</span>
                      <span className="text-sm font-medium text-gray-900">65%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: "65%" }}></div>
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
                      <XCircle className="w-4 h-4 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-800">High Risk</p>
                        <p className="text-xs text-red-700 mt-1">
                          3 deals worth ₹2.5Cr at risk of slipping to next quarter
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-amber-800">Medium Risk</p>
                        <p className="text-xs text-amber-700 mt-1">
                          Budget approval delays affecting 5 enterprise deals
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                      <div>
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
                      <ArrowRight className="w-3 h-3 text-gray-400 mt-1" />
                      <p className="text-xs text-gray-700">Accelerate 2 backup deals in Q2</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-gray-400 mt-1" />
                      <p className="text-xs text-gray-700">Increase prospecting activities by 20%</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-3 h-3 text-gray-400 mt-1" />
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Quota Performance</h3>
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="text-gray-600">Total Quota: </span>
                    <span className="font-medium text-gray-900">{formatCurrency(totalQuota)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Achieved: </span>
                    <span className="font-medium text-green-600">{formatCurrency(totalAchieved)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-gray-600">Forecast: </span>
                    <span className="font-medium text-blue-600">{formatCurrency(totalForecast)}</span>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sales Rep
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Quota</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Achieved</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Probability
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Pipeline</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {salesRepQuotas.map((rep, index) => (
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
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.quota)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.achieved)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.forecast)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full">
                              <div
                                className={`h-full rounded-full ${
                                  (rep.achieved / rep.quota) * 100 >= 80
                                    ? "bg-green-500"
                                    : (rep.achieved / rep.quota) * 100 >= 60
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }`}
                                style={{ width: `${Math.min((rep.achieved / rep.quota) * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 w-12">
                              {((rep.achieved / rep.quota) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(rep.pipeline)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Individual Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {salesRepQuotas.slice(0, 3).map((rep, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 font-medium">
                      {rep.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{rep.name}</h4>
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
                          className="h-full bg-blue-500 rounded-full"
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
                          className="h-full bg-green-500 rounded-full"
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
                          className="h-full bg-purple-500 rounded-full"
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
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Product Line Forecast</h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Q1 Actual
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Q1 Forecast
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Q2 Forecast
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Confidence
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {productForecast.map((product, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{product.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(product.q1Actual)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(product.q1Forecast)}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(product.q2Forecast)}</td>
                        <td className="px-6 py-4">
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
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-100 rounded-full">
                              <div
                                className={`h-full rounded-full ${
                                  product.confidence >= 85
                                    ? "bg-green-500"
                                    : product.confidence >= 75
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                }`}
                                style={{ width: `${product.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-600 w-8">{product.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-6 rounded-sm ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Distribution</h3>
                <div className="space-y-4">
                  {productForecast.map((product, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-700">{product.name}</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(product.q2Forecast)}</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div
                          className={`h-full rounded-full`}
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

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Comparison</h3>
                <div className="space-y-6">
                  {productForecast.map((product, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-24 text-sm text-gray-700">{product.name}</div>
                      <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full flex items-center pl-2 ${
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
      </div>
    </div>
  )
}

export default ForecastPage
