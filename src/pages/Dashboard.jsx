"use client"

import { useState } from "react"
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Calendar,
  Clock,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Plus,
  ArrowRight,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This Month")

  // Sample data
  const metrics = {
    totalLeads: 156,
    totalRevenue: 2450000,
    conversionRate: 24.5,
    activeDeals: 42,
    leadsGrowth: 12.5,
    revenueGrowth: 8.3,
    conversionGrowth: -2.1,
    dealsGrowth: 15.2,
  }

  const recentLeads = [
    { id: 1, name: "Rajesh Kumar", company: "Tech Solutions", value: 75000, status: "new", time: "2 hours ago" },
    { id: 2, name: "Priya Sharma", company: "Digital Corp", value: 120000, status: "contacted", time: "4 hours ago" },
    { id: 3, name: "Amit Patel", company: "StartupXYZ", value: 45000, status: "qualified", time: "6 hours ago" },
    { id: 4, name: "Sneha Reddy", company: "Enterprise Ltd", value: 200000, status: "proposal", time: "1 day ago" },
  ]

  const recentActivities = [
    { id: 1, action: "New lead added", user: "Priya Singh", time: "10 minutes ago", type: "lead" },
    { id: 2, action: "Deal closed", user: "Amit Kumar", time: "1 hour ago", type: "deal" },
    { id: 3, action: "Follow-up call scheduled", user: "Neha Agarwal", time: "2 hours ago", type: "task" },
    { id: 4, action: "Proposal sent", user: "Rohit Verma", time: "3 hours ago", type: "proposal" },
    { id: 5, action: "Meeting completed", user: "Kavya Sharma", time: "5 hours ago", type: "meeting" },
  ]

  const topPerformers = [
    { name: "Priya Singh", deals: 12, revenue: 450000, avatar: "PS" },
    { name: "Amit Kumar", deals: 10, revenue: 380000, avatar: "AK" },
    { name: "Neha Agarwal", deals: 8, revenue: 320000, avatar: "NA" },
    { name: "Rohit Verma", deals: 7, revenue: 280000, avatar: "RV" },
  ]

  const upcomingTasks = [
    { id: 1, task: "Follow up with Rajesh Kumar", time: "2:00 PM", priority: "high" },
    { id: 2, task: "Demo call with Tech Solutions", time: "4:30 PM", priority: "medium" },
    { id: 3, task: "Send proposal to Digital Corp", time: "Tomorrow 10:00 AM", priority: "high" },
    { id: 4, task: "Team meeting", time: "Tomorrow 2:00 PM", priority: "low" },
  ]

  const pipelineData = [
    { stage: "New", count: 45, value: 1125000, color: "bg-blue-500" },
    { stage: "Contacted", count: 32, value: 960000, color: "bg-yellow-500" },
    { stage: "Qualified", count: 28, value: 1400000, color: "bg-orange-500" },
    { stage: "Proposal", count: 18, value: 1800000, color: "bg-purple-500" },
    { stage: "Won", count: 12, value: 1200000, color: "bg-green-500" },
  ]

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      contacted: "bg-yellow-100 text-yellow-800",
      qualified: "bg-orange-100 text-orange-800",
      proposal: "bg-purple-100 text-purple-800",
      won: "bg-green-100 text-green-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: "border-l-red-500 bg-red-50",
      medium: "border-l-yellow-500 bg-yellow-50",
      low: "border-l-green-500 bg-green-50",
    }
    return colors[priority] || "border-l-gray-500 bg-gray-50"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your sales.</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>This Week</option>
                <option>This Month</option>
                <option>This Quarter</option>
                <option>This Year</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Quick Add
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.totalLeads}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{metrics.leadsGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">₹{(metrics.totalRevenue / 100000).toFixed(1)}L</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{metrics.revenueGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.conversionRate}%</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">{metrics.conversionGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Deals</p>
                <p className="text-3xl font-bold text-gray-900">{metrics.activeDeals}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{metrics.dealsGrowth}%</span>
                  <span className="text-sm text-gray-500 ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Award className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Pipeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Sales Pipeline</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {pipelineData.map((stage, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">{stage.count} leads</span>
                    <span className="text-sm font-semibold text-gray-900">₹{(stage.value / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Pipeline Value</span>
                <span className="font-semibold text-gray-900">
                  ₹{(pipelineData.reduce((sum, stage) => sum + stage.value, 0) / 100000).toFixed(1)}L
                </span>
              </div>
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-48 flex items-end justify-between gap-2">
              {[65, 45, 78, 52, 89, 67, 94, 76, 85, 72, 91, 88].map((height, index) => (
                <div key={index} className="flex-1 bg-blue-500 rounded-t" style={{ height: `${height}%` }}></div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
              <span>Oct</span>
              <span>Nov</span>
              <span>Dec</span>
            </div>
          </div>
        </div>

        {/* Recent Activities and Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Recent Leads */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Leads</h3>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {lead.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">₹{(lead.value / 1000).toFixed(0)}K</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <Activity className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
              <Star className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                      {performer.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                      <p className="text-xs text-gray-500">{performer.deals} deals</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">₹{(performer.revenue / 100000).toFixed(1)}L</p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Tasks</h3>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View Calendar</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingTasks.map((task) => (
              <div key={task.id} className={`p-4 rounded-lg border-l-4 ${getPriorityColor(task.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-900">{task.task}</h4>
                  {task.priority === "high" && <AlertCircle className="w-4 h-4 text-red-500" />}
                  {task.priority === "medium" && <Clock className="w-4 h-4 text-yellow-500" />}
                  {task.priority === "low" && <CheckCircle className="w-4 h-4 text-green-500" />}
                </div>
                <p className="text-xs text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {task.time}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
