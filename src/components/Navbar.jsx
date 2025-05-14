import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon,EnvelopeIcon, XMarkIcon ,ChevronDownIcon} from '@heroicons/react/24/outline'
import { useState } from 'react'
const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Employees', href: '/', current: false },
  { name: 'Leads', href: '#', current: false },

  { name: 'DSA', href: '#', current: false ,  submenu: [

    { label: "dummy1", href: "/services/web-design" },
    { label: "dummy2", href: "/services/seo" }

  ],Icon:<ChevronDownIcon className="h-4 w-4 text-white submenuIcon" />},

  { name: 'Deals', href: '#', current: false },
  { name: 'Roles', href: '#', current: false },
  { name: 'Navigations', href: '#', current: false },
  { name: 'Layouts', href: '#', current: false ,
    submenu: [
      { label: "Layout1", href: "/services/web-design" },
      { label: "Layout2", href: "/services/seo" }
    ],Icon:<ChevronDownIcon className="h-4 w-4 text-white submenuIcon" />},
  { name: 'Notifications', href: '#', current: false },
  { name: 'Loans', href: '#', current: false ,
    submenu: [
      { label: "Loan1", href: "/services/web-design" },
      { label: "Loan2", href: "/services/seo" },
      { label: "Loan3", href: "/services/seo" }

    ],Icon:<ChevronDownIcon className="h-4 w-4 text-white submenuIcon" />},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const [openIndex, setOpenIndex] = useState(null)

  const handleSubmenuToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }
  return (
    <Disclosure as="nav" className="text-white bg-[#EF6D8D]">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-3">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center bg-[#EF6D8D] p-[16px]">
              <img
                alt="Your Company"
                src="images/logo-crm.png"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block md:flex">
              <div className="flex space-x-0 items-center">
                {navigation.map((item,ind) => (
                 <a
                    key={ind}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-white text-[#EF6D8D]' : 'text-white hover:bg-white hover:text-[#EF6D8D]',
                      'rounded-md px-3 py-2 mr-1 text-sm font-medium flex items-center relative group transition menu',
                    )}
                  >
                    <>
                   {item.name}
                 <span className='ms-1'>{item.Icon}</span>   
                 <ul className="absolute hidden group-hover:block bg-white text-[#EF6D8D] mt-2 rounded shadow-md w-48 z-50 top-7 transition">
                    {item.submenu && item.submenu.map((subItem, subIndex) => {
                      return(<li key={subIndex} className="px-4 py-2 hover:bg-gray-100 cursor-pointer transition" >
                             {subItem.label}
                      </li>)
                    }
                      
                      
                    )}
                  </ul>
                    </>
                
 


                  </a>
                  
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <EnvelopeIcon aria-hidden="true" className="size-6" />
            </button>
            <span className="inline-flex items-center rounded-md mb-5 -ml-3 z-10 bg-gray-50 px-[5px] py-[1px] text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">0</span>
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-8 rounded-full"
                  />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                  >
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
            <a href="#" className='ml-3' >Administrator</a>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
      <div className="space-y-1 px-2 pt-2 pb-3">
        {navigation.map((item, index) => (
          <div key={item.name}>
            <button
              onClick={() => handleSubmenuToggle(index)}
              className={classNames(
                item.current
                  ? 'bg-white text-[#EF6D8D]'
                  : 'text-white hover:bg-white hover:text-[#EF6D8D]',
                'w-full flex items-center justify-between rounded-md px-3 py-2 text-base font-medium'
              )}
            >
              {item.name}
              <span className="ms-1">{item.Icon}</span>
            </button>

            {item.submenu && openIndex === index && (
              <div className="pl-4 mt-1">
                {item.submenu.map((sub, subIdx) => (
                  <a
                    key={subIdx}
                    href={sub.href}
                    className="block rounded-md px-3 py-2 text-sm text-white hover:bg-white hover:text-[#EF6D8D]"
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </DisclosurePanel>

    </Disclosure>
  )
}
