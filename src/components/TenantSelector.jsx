import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FiCheck, FiChevronDown, FiGlobe ,FiSearch} from 'react-icons/fi'

const tenants = [
  { id: 1, name: 'Acme Corporation', domain: 'acme.crm.com' },
  { id: 2, name: 'Stark Industries', domain: 'stark.crm.com' },
  { id: 3, name: 'Wayne Enterprises', domain: 'wayne.crm.com' },
  { id: 4, name: 'Cyberdyne Systems', domain: 'cyberdyne.crm.com' },
]

export default function TenantSelector() {
  const [selectedTenant, setSelectedTenant] = useState(tenants[0])
  const [searchQuery, setSearchQuery] = useState('')

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tenant.domain.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Menu as="div" className="relative inline-block text-left mr-4">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full rounded-md px-3 py-2 text-sm font-medium text-white bg-[#EF6D8D] bg-opacity-10 hover:bg-opacity-20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <FiGlobe className="h-4 w-4 mr-2" />
          <span className="truncate max-w-[120px]">{selectedTenant.name}</span>
          <FiChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search tenants..."
                className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="py-1 max-h-60 overflow-y-auto">
            {filteredTenants.length > 0 ? (
              filteredTenants.map((tenant) => (
                <Menu.Item key={tenant.id}>
                  {({ active }) => (
                    <button
                      onClick={() => setSelectedTenant(tenant)}
                      className={`${
                        active ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700'
                      } group flex w-full items-center justify-between px-4 py-2 text-sm`}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{tenant.name}</span>
                        <span className="text-xs text-gray-500">{tenant.domain}</span>
                      </div>
                      {selectedTenant.id === tenant.id && (
                        <FiCheck className="h-4 w-4 text-indigo-600" />
                      )}
                    </button>
                  )}
                </Menu.Item>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No tenants found</div>
            )}
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active ? 'bg-indigo-50 text-indigo-900' : 'text-gray-700'
                  } group flex items-center px-4 py-2 text-sm`}
                >
                  Manage tenants
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}