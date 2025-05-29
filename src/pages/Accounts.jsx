import { useState } from 'react'
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  EllipsisVerticalIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const accounts = [
  {
    id: 1,
    name: 'Acme Corporation',
    industry: 'Technology',
    email: 'contact@acme.com',
    phone: '(555) 123-4567',
    owner: 'You',
    value: '$250,000',
    status: 'Active'
  },
  {
    id: 2,
    name: 'Globex Corp',
    industry: 'Manufacturing',
    email: 'info@globex.com',
    phone: '(555) 987-6543',
    owner: 'Sarah Johnson',
    value: '$180,000',
    status: 'Active'
  },
  {
    id: 3,
    name: 'Initech',
    industry: 'Finance',
    email: 'support@initech.com',
    phone: '(555) 456-7890',
    owner: 'Michael Chen',
    value: '$95,000',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'Umbrella Corporation',
    industry: 'Healthcare',
    email: 'hello@umbrella.com',
    phone: '(555) 789-0123',
    owner: 'You',
    value: '$320,000',
    status: 'Active'
  },
]

export default function Accounts() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedIndustry, setSelectedIndustry] = useState('All')

  const industries = ['All', 'Technology', 'Manufacturing', 'Finance', 'Healthcare', 'Retail']

  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         account.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === 'All' || account.industry === selectedIndustry
    return matchesSearch && matchesIndustry
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Accounts</h1>
          <div className="flex space-x-3">
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Account
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 bg-white shadow rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
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
                  placeholder="Search accounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                id="industry"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
              >
                {industries.map((industry) => (
                  <option key={industry} value={industry}>{industry}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <FunnelIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Accounts List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {filteredAccounts.map((account) => (
              <li key={account.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BuildingOfficeIcon className="h-10 w-10 text-indigo-600" />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="text-lg font-medium text-indigo-600 truncate">{account.name}</p>
                          <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {account.status}
                          </span>
                        </div>
                        <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <UserCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {account.owner}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <EnvelopeIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {account.email}
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500">
                            <PhoneIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {account.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <div className="text-right mr-4">
                        <p className="text-sm text-gray-500">Annual Value</p>
                        <p className="text-lg font-semibold text-gray-900">{account.value}</p>
                      </div>
                      <button className="bg-white rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                        <EllipsisVerticalIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium">1</span> to <span className="font-medium">4</span> of{' '}
            <span className="font-medium">4</span> accounts
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