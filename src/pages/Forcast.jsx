import { useState } from 'react';
import { ChevronDownIcon, ArrowDownTrayIcon, FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const forecastData = [
  { name: 'Jan', committed: 120000, bestCase: 150000, worstCase: 100000 },
  { name: 'Feb', committed: 180000, bestCase: 220000, worstCase: 150000 },
  { name: 'Mar', committed: 210000, bestCase: 250000, worstCase: 180000 },
  { name: 'Apr', committed: 190000, bestCase: 230000, worstCase: 160000 },
  { name: 'May', committed: 240000, bestCase: 280000, worstCase: 200000 },
  { name: 'Jun', committed: 270000, bestCase: 320000, worstCase: 230000 },
  { name: 'Jul', committed: 300000, bestCase: 350000, worstCase: 250000 },
];

const quotaData = [
  { name: 'John Smith', quota: 250000, closed: 180000, pipeline: 220000 },
  { name: 'Sarah Johnson', quota: 250000, closed: 210000, pipeline: 240000 },
  { name: 'Michael Brown', quota: 250000, closed: 195000, pipeline: 200000 },
  { name: 'Emily Davis', quota: 200000, closed: 175000, pipeline: 190000 },
  { name: 'Robert Wilson', quota: 200000, closed: 160000, pipeline: 180000 },
];

export default function ForecastReport() {
  const [timeRange, setTimeRange] = useState('next_quarter');
  const [teamFilter, setTeamFilter] = useState('all');

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Revenue Forecast</h1>
          <p className="mt-2 text-sm text-gray-700">
            Projected revenue based on current pipeline and historical trends.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-[#EF6D8D] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#d45a77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <ArrowDownTrayIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            Export
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
            placeholder="Search accounts or opportunities..."
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              className="appearance-none rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#EF6D8D] sm:text-sm sm:leading-6"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="next_month">Next Month</option>
              <option value="next_quarter">Next Quarter</option>
              <option value="next_half">Next 6 Months</option>
              <option value="next_year">Next Year</option>
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
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Committed Revenue</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">$1,510,000</div>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Best Case Revenue</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">$1,950,000</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="truncate text-sm font-medium text-gray-500">Quota Attainment</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">82%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Forecast Chart */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue Forecast</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={forecastData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="worstCase" stackId="1" stroke="#ffc658" fill="#ffc658" name="Worst Case" />
                <Area type="monotone" dataKey="committed" stackId="1" stroke="#8884d8" fill="#8884d8" name="Committed" />
                <Area type="monotone" dataKey="bestCase" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Best Case" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quota Attainment */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quota Attainment by Rep</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sales Rep
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quota
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Closed
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pipeline
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  % of Quota
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gap
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {quotaData.map((rep) => {
                const percent = Math.round((rep.closed / rep.quota) * 100);
                const gap = rep.quota - rep.closed;
                return (
                  <tr key={rep.name}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rep.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${rep.quota.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${rep.closed.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${rep.pipeline.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`h-2.5 rounded-full ${
                              percent >= 100 ? 'bg-green-500' :
                              percent >= 75 ? 'bg-blue-500' :
                              percent >= 50 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`} 
                            style={{ width: `${Math.min(percent, 100)}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700">{percent}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${gap.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forecast by Stage */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Forecast by Stage</h2>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stage
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Count
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Weighted
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Close Probability
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { stage: 'Prospecting', count: 24, amount: 480000, probability: 10 },
                { stage: 'Qualification', count: 18, amount: 360000, probability: 25 },
                { stage: 'Needs Analysis', count: 15, amount: 450000, probability: 50 },
                { stage: 'Proposal', count: 10, amount: 350000, probability: 75 },
                { stage: 'Negotiation', count: 7, amount: 280000, probability: 90 },
              ].map((item) => (
                <tr key={item.stage}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.stage}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${item.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${Math.round(item.amount * (item.probability / 100)).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            item.probability >= 75 ? 'bg-green-500' :
                            item.probability >= 50 ? 'bg-blue-500' :
                            item.probability >= 25 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`} 
                          style={{ width: `${item.probability}%` }}
                        ></div>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-700">{item.probability}%</span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Total
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                  74
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                  $1,920,000
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">
                  $1,024,500
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}