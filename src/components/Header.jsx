import React from 'react'
import Breadcrumbs from './Breadcrumbs';
import {FunnelIcon} from '@heroicons/react/20/solid'
import DateRangePicker from './DateRangePicker';
function Header() {
const breadcrumbItems = [
{ label: 'Home', href: '/' },
{ label: 'Dashboard', href: '/dashboard/x' },
];
return (
<div className='header container mx-auto'>
   <div className='header-top flex justify-between my-3'>
      <span>Dashboard</span>
      <Breadcrumbs items={breadcrumbItems} />
   </div>
   <div className="header-bottom border rounded px-3 py-1 flex items-center justify-between">
      <div className="filter-icons flex items-center">
         <span>Filters</span>
         <FunnelIcon className="h-4 w-4 mx-2 text-gray-400" />
      </div>
      <div className="right-header-bottom  items-center grid grid-cols-3 gap-4">
         <div class="all-select h-full">
            <select id="dummy" name="dummy" class="block w-full h-full px-3 py-2 bg-[#242424] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
               <option value="">All selected</option>
               <option value="dummy">dummy</option>
               <option value="dummy">dummy</option>
            </select>
         </div>
         <div class="locations">
            <input
               list="cities"
               id="city"
               name="city"
               class="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
               placeholder="Locations"
               />
            <datalist id="cities">
               <option value="New York" />
               <option value="London" />
               <option value="Paris" />
               <option value="Tokyo" />
            </datalist>
         </div>
         <div className='date-picker'>
         <DateRangePicker/>
         </div>
      </div>
   </div>
</div>
)
}
export default Header
