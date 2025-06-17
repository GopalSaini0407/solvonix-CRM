import React from 'react'
import Breadcrumbs from './Breadcrumbs';
import {FunnelIcon} from '@heroicons/react/20/solid'
import DateRangePicker from './DateRangePicker';
import ThemeSelector from '../contextAPI/contextTheme/ThemeSelector'
function Header() {
const breadcrumbItems = [
{ label: 'Home', href: '/' },
{ label: 'Dashboard', href: '/dashboard/x' },
];
return (
<div className='header'>
   <div className='container mx-auto px-4'>
   <div className='header-top flex justify-between items-center my-3'>
      <span className='font-bold text-[#1F2131] text-2xl'>Dashboard</span>
      <Breadcrumbs items={breadcrumbItems} />
   </div>
   <div className="header-bottom border-[1px] border-[#e6e0e0] lg:flex-row flex-col rounded px-3 py-3 lg:py-1 flex items-center justify-between bg-white">
      <div className="filter-icons flex items-center mb-3 lg:my-0">
         <span>Filters</span>
         <FunnelIcon className="h-4 w-4 mx-2 text-gray-400" />
      </div>
      <div className="right-header-bottom  items-center grid lg:grid-cols-3 grid-cols-1 gap-4 w-full lg:w-fit ">
         <div className="all-select">
            <select id="dummy" name="dummy" className="block h-full px-3 w-full lg:w-60 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
               <option value="">All selected</option>
               <option value="dummy">dummy</option>
               <option value="dummy">dummy</option>
            </select>
         </div>
         <div className="locations">
            <input
               list="cities"
               id="city"
               name="city"
               className="border border-gray-300 rounded-md px-3 py-1 h-[37px]  w-full lg:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

</div>
)
}
export default Header
