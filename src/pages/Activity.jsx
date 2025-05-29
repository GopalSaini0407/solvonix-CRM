import { useState } from 'react'
import { FiFilter, FiDownload, FiSearch, FiCalendar, FiUser } from 'react-icons/fi'
import { BsThreeDotsVertical, BsArrowUpRight } from 'react-icons/bs'

const activityData = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      role: "Sales Manager"
    },
    action: "Viewed opportunity",
    target: "Acme Corp Deal",
    date: "2023-06-15T10:30:00",
    ipAddress: "192.168.1.1",
    status: "success"
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      role: "Marketing"
    },
    action: "Edited contact",
    target: "Sarah Johnson",
    date: "2023-06-15T09:15:00",
    ipAddress: "192.168.1.45",
    status: "success"
  },
  {
    id: 3,
    user: {
      name: "Robert Johnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      role: "Admin"
    },
    action: "Deleted lead",
    target: "Old Prospect",
    date: "2023-06-14T16:45:00",
    ipAddress: "192.168.1.12",
    status: "warning"
  },
  {
    id: 4,
    user: {
      name: "Emily Davis",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      role: "Support"
    },
    action: "Created ticket",
    target: "Customer Issue #456",
    date: "2023-06-14T14:20:00",
    ipAddress: "192.168.1.8",
    status: "success"
  },
  {
    id: 5,
    user: {
      name: "Michael Wilson",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      role: "Sales"
    },
    action: "Failed login attempt",
    target: "Account access",
    date: "2023-06-14T11:05:00",
    ipAddress: "192.168.1.30",
    status: "error"
  }
]

const statusStyles = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800"
}

export default function ActivityLogs() {
  const [dateRange, setDateRange] = useState("last7days")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedUsers, setSelectedUsers] = useState([])

  const filteredData = activityData.filter(activity => {
    // Filter by search query
    const matchesSearch = 
      activity.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.target.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by selected users (if any are selected)
    const matchesUsers = selectedUsers.length === 0 || 
      selectedUsers.includes(activity.user.name)
    
    return matchesSearch && matchesUsers
  })

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Activity Logs</h1>
            <p className="text-gray-600">Track all user actions across the system</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              <FiDownload className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search activities..."
                className="pl-10 w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Date Range */}
            <div className="relative">
              <select
                className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pl-3 pr-10 py-2 appearance-none"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7days">Last 7 days</option>
                <option value="last30days">Last 30 days</option>
                <option value="custom">Custom range</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            
            {/* User Filter */}
            <div className="relative">
              <select
                className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 pl-3 pr-10 py-2 appearance-none"
                value={selectedUsers}
                onChange={(e) => setSelectedUsers(Array.from(e.target.selectedOptions, option => option.value))}
                multiple
              >
                <option value="John Doe">John Doe</option>
                <option value="Jane Smith">Jane Smith</option>
                <option value="Robert Johnson">Robert Johnson</option>
                <option value="Emily Davis">Emily Davis</option>
                <option value="Michael Wilson">Michael Wilson</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiUser className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Activity Table */}
        <div className="bg-white shadow-sm rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Target
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((activity) => (
                  <tr key={activity.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full" src={activity.user.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{activity.user.name}</div>
                          <div className="text-sm text-gray-500">{activity.user.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.action}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {activity.target}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.ipAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[activity.status]}`}>
                        {activity.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900 mr-3">
                        <BsArrowUpRight className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <BsThreeDotsVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                  <span className="font-medium">5</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Previous</span>
                    &larr;
                  </a>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    1
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Next</span>
                    &rarr;
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}