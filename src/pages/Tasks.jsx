import { useState } from 'react'
import { 
  CheckCircleIcon,
  CalendarIcon,
  UserIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'

const tasks = [
  {
    id: 1,
    title: 'Follow up with Acme Corp',
    dueDate: '2023-11-15',
    priority: 'High',
    status: 'Not Started',
    assignedTo: 'You',
    relatedTo: 'Enterprise SaaS Deal'
  },
  {
    id: 2,
    title: 'Prepare proposal for Globex',
    dueDate: '2023-11-20',
    priority: 'Medium',
    status: 'In Progress',
    assignedTo: 'Sarah Johnson',
    relatedTo: 'Marketing Automation Suite'
  },
  {
    id: 3,
    title: 'Schedule demo with Initech',
    dueDate: '2023-11-10',
    priority: 'Low',
    status: 'Completed',
    assignedTo: 'Michael Chen',
    relatedTo: 'Cloud Migration Services'
  },
  {
    id: 4,
    title: 'Review contract terms',
    dueDate: '2023-11-18',
    priority: 'High',
    status: 'Not Started',
    assignedTo: 'You',
    relatedTo: 'AI Integration Project'
  },
]

const priorities = ['All', 'High', 'Medium', 'Low']
const statuses = ['All', 'Not Started', 'In Progress', 'Completed']

export default function Tasks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [openTaskId, setOpenTaskId] = useState(null)

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         task.relatedTo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = selectedPriority === 'All' || task.priority === selectedPriority
    const matchesStatus = selectedStatus === 'All' || task.status === selectedStatus
    return matchesSearch && matchesPriority && matchesStatus
  })

  const toggleTask = (id) => {
    setOpenTaskId(openTaskId === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Tasks</h1>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Task
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  id="search"
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                Priority
              </label>
              <select
                id="priority"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
              >
                {priorities.map((priority) => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <li key={task.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <CheckCircleIcon className={`h-6 w-6 ${
                          task.status === 'Completed' ? 'text-green-500' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-gray-900">{task.title}</p>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            task.priority === 'High' ? 'bg-red-100 text-red-800' :
                            task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {task.priority}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            Due: {task.dueDate}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {task.assignedTo}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className="bg-white rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                      >
                        <ChevronDownIcon className={`h-5 w-5 transition-transform ${openTaskId === task.id ? 'transform rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                  {openTaskId === task.id && (
                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Status</h4>
                          <p className="mt-1 text-sm text-gray-900">{task.status}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-500">Related To</h4>
                          <p className="mt-1 text-sm text-indigo-600">{task.relatedTo}</p>
                        </div>
                        <div className="md:col-span-2">
                          <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Mark as {task.status === 'Completed' ? 'Not Started' : 'Completed'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
            <span className="font-medium">4</span> tasks
          </div>
          <nav className="flex space-x-4" aria-label="Pagination">
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              disabled
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}