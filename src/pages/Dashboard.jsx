import { useState } from 'react'
import { 
  ChartBarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ClockIcon,
  EnvelopeIcon,
  PhoneIcon

} from '@heroicons/react/24/outline'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const stats = [
    { id: 1, name: 'Total Revenue', value: '$89,456', change: '+12%', changeType: 'positive', icon: CurrencyDollarIcon },
    { id: 2, name: 'New Opportunities', value: '34', change: '+5%', changeType: 'positive', icon: ArrowUpIcon },
    { id: 3, name: 'Active Accounts', value: '128', change: '-3%', changeType: 'negative', icon: UsersIcon },
    { id: 4, name: 'Avg. Deal Cycle', value: '14 days', change: '-2%', changeType: 'negative', icon: ClockIcon },
  ]

  const recentActivities = [
    { id: 1, type: 'meeting', name: 'Meeting with Acme Corp', date: '2 hours ago', user: 'You' },
    { id: 2, type: 'task', name: 'Follow up on proposal', date: '4 hours ago', user: 'Sarah Johnson' },
    { id: 3, type: 'email', name: 'Sent contract to client', date: '1 day ago', user: 'You' },
    { id: 4, type: 'call', name: 'Discovery call completed', date: '2 days ago', user: 'Michael Chen' },
  ]

  const topOpportunities = [
    { id: 1, name: 'Enterprise SaaS Deal', value: '$45,000', stage: 'Proposal', probability: '75%' },
    { id: 2, name: 'Marketing Automation', value: '$28,500', stage: 'Negotiation', probability: '60%' },
    { id: 3, name: 'Cloud Migration', value: '$62,000', stage: 'Discovery', probability: '40%' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex space-x-4">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-4 py-2 rounded-lg ${activeTab === 'analytics' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
            >
              Analytics
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                      <dd>
                        <div className="text-lg font-medium text-gray-900">{stat.value}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4">
                  <span className={`inline-flex items-center text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpIcon className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <ArrowDownIcon className="-ml-1 mr-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Activities</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        {activity.type === 'meeting' && <UsersIcon className="h-5 w-5 text-indigo-600" />}
                        {activity.type === 'task' && <ArrowUpIcon className="h-5 w-5 text-indigo-600" />}
                        {activity.type === 'email' && <EnvelopeIcon className="h-5 w-5 text-indigo-600" />}
                        {activity.type === 'call' && <PhoneIcon className="h-5 w-5 text-indigo-600" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{activity.name}</div>
                        <div className="text-sm text-gray-500">
                          {activity.date} · {activity.user}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50 text-right">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </button>
              </div>
            </div>
          </div>

          {/* Top Opportunities */}
          <div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Top Opportunities</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {topOpportunities.map((opp) => (
                  <div key={opp.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900">{opp.name}</div>
                      <div className="text-sm font-semibold text-indigo-600">{opp.value}</div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{opp.stage}</span>
                        <span>Probability: {opp.probability}</span>
                      </div>
                      <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full" 
                          style={{ width: opp.probability }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-6 py-4 bg-gray-50 text-right">
                <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Chart (placeholder) */}
        {activeTab === 'analytics' && (
          <div className="mt-8 bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Sales Performance</h3>
              <div className="flex space-x-4">
                <select className="border-gray-300 rounded-md shadow-sm text-sm">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last quarter</option>
                </select>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="h-12 w-12 text-gray-400" />
              <span className="ml-2 text-gray-500">Chart visualization will appear here</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}