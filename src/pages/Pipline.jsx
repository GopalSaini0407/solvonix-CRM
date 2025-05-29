import { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, ChevronDownIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const pipelineData = [
  { name: 'Prospecting', value: 24, change: 2 },
  { name: 'Qualification', value: 18, change: -1 },
  { name: 'Needs Analysis', value: 15, change: 3 },
  { name: 'Proposal', value: 10, change: 0 },
  { name: 'Negotiation', value: 7, change: 1 },
  { name: 'Closed Won', value: 5, change: 2 },
  { name: 'Closed Lost', value: 8, change: -3 },
];

const opportunityData = [
  { name: 'Jan', new: 12, won: 8, lost: 4 },
  { name: 'Feb', new: 15, won: 10, lost: 5 },
  { name: 'Mar', new: 18, won: 12, lost: 6 },
  { name: 'Apr', new: 14, won: 9, lost: 5 },
  { name: 'May', new: 20, won: 14, lost: 6 },
  { name: 'Jun', new: 22, won: 16, lost: 6 },
  { name: 'Jul', new: 25, won: 18, lost: 7 },
];

export default function PipelineReport() {
  const [timeRange, setTimeRange] = useState('last_quarter');
  const [teamFilter, setTeamFilter] = useState('all');

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Sales Pipeline Report</h1>
          <p className="mt-2 text-sm text-gray-700">
            Track your sales opportunities through each stage of the pipeline.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-[#EF6D8D] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d45a77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export Report
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#EF6D8D] sm:text-sm sm:leading-6"
            placeholder="Search opportunities..."
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              className="appearance-none rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#EF6D8D] sm:text-sm sm:leading-6"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="last_week">Last Week</option>
              <option value="last_month">Last Month</option>
              <option value="last_quarter">Last Quarter</option>
              <option value="last_year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <select
              className="appearance-none rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#EF6D8D] sm:text-sm sm:leading-6"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value)}
            >
              <option value="all">All Teams</option>
              <option value="sales">Sales Team</option>
              <option value="marketing">Marketing Team</option>
              <option value="east">East Region</option>
              <option value="west">West Region</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <FunnelIcon className="-ml-0.5 h-5 w-5 text-gray-400" />
            Filters
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Total Opportunities</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">112</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Won Opportunities</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">42</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Lost Opportunities</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">28</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Win Rate</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">37.5%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Stages */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Pipeline Stages</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {pipelineData.map((stage) => (
              <li key={stage.name} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{stage.name}</p>
                      <p className="text-sm text-gray-500">{stage.value} opportunities</p>
                    </div>
                  </div>
                  <div className="ml-2 flex items-center">
                    {stage.change > 0 ? (
                      <ArrowUpIcon className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 text-red-500" />
                    )}
                    <p className={`ml-1 text-sm ${stage.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {Math.abs(stage.change)} from last period
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Opportunity Trends Chart */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Opportunity Trends</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={opportunityData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="new" stackId="a" fill="#8884d8" name="New Opportunities" />
                <Bar dataKey="won" stackId="a" fill="#82ca9d" name="Won Opportunities" />
                <Bar dataKey="lost" stackId="a" fill="#ffc658" name="Lost Opportunities" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Opportunities */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Opportunities</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Opportunity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Account
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                {
                  id: 1,
                  name: 'Enterprise Software License',
                  account: 'Acme Corporation',
                  stage: 'Proposal',
                  amount: '$125,000',
                  closeDate: '2023-12-15',
                  owner: 'John Smith'
                },
                {
                  id: 2,
                  name: 'Marketing Services Contract',
                  account: 'Global Brands',
                  stage: 'Negotiation',
                  amount: '$85,000',
                  closeDate: '2023-12-20',
                  owner: 'Sarah Johnson'
                },
                {
                  id: 3,
                  name: 'Cloud Infrastructure Upgrade',
                  account: 'Tech Solutions Inc.',
                  stage: 'Needs Analysis',
                  amount: '$210,000',
                  closeDate: '2024-01-10',
                  owner: 'Michael Brown'
                },
                {
                  id: 4,
                  name: 'Customer Support Package',
                  account: 'Retail Partners LLC',
                  stage: 'Qualification',
                  amount: '$45,000',
                  closeDate: '2023-12-30',
                  owner: 'Emily Davis'
                },
                {
                  id: 5,
                  name: 'Data Analytics Implementation',
                  account: 'Financial Services Co.',
                  stage: 'Prospecting',
                  amount: '$175,000',
                  closeDate: '2024-01-25',
                  owner: 'Robert Wilson'
                }
              ].map((opportunity) => (
                <tr key={opportunity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {opportunity.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opportunity.account}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      opportunity.stage === 'Prospecting' ? 'bg-blue-100 text-blue-800' :
                      opportunity.stage === 'Qualification' ? 'bg-indigo-100 text-indigo-800' :
                      opportunity.stage === 'Needs Analysis' ? 'bg-purple-100 text-purple-800' :
                      opportunity.stage === 'Proposal' ? 'bg-yellow-100 text-yellow-800' :
                      opportunity.stage === 'Negotiation' ? 'bg-orange-100 text-orange-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {opportunity.stage}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opportunity.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opportunity.closeDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {opportunity.owner}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}