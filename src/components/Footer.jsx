import React from 'react'

function Footer() {
  return (
    <div className='footer container mx-auto my-5'>
      <div className='bg-white px-5 py-4 rounded-md shadow-2xl'>
        <div className='mb-3'>
          <span className='font-medium text-gray-700 text-[14px]'>Upcoming Calls - 0</span>
          <span className='ml-5 font-medium text-gray-700 text-[14px]'>Pending Calls - 0</span>
          <span className='ml-5 font-medium text-gray-700 text-[14px]'>Visit Plan Today (0)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-200 shadow-sm rounded-lg text-sm">
            <thead className="bg-gray-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Mobile Number</th>
                <th className="px-4 py-2 text-left">Follow up Date</th>
                <th className="px-4 py-2 text-left">Schedule Time</th>
                <th className="px-4 py-2 text-left">Owner Name</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-t border-gray-200">
                <td className="px-4 py-2 text-red-600 font-medium" colSpan="5">
                  No Upcoming call found
                </td>
              </tr>
           
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Footer
