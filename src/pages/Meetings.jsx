import { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, UsersIcon, MapPinIcon, ChevronDownIcon, MagnifyingGlassIcon, FunnelIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const meetings = [
  {
    id: 1,
    title: 'Client Kickoff Meeting',
    datetime: '2023-12-15T10:00:00',
    duration: '60 mins',
    attendees: [
      { name: 'John Smith', email: 'john@example.com', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { name: 'Sarah Johnson', email: 'sarah@example.com', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
    ],
    location: 'Zoom Meeting',
    agenda: 'Discuss project requirements and timelines',
    status: 'upcoming',
    organizer: 'Alex Chen'
  },
  {
    id: 2,
    title: 'Sales Strategy Review',
    datetime: '2023-12-10T14:30:00',
    duration: '90 mins',
    attendees: [
      { name: 'Michael Brown', email: 'michael@example.com', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { name: 'Emily Davis', email: 'emily@example.com', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    ],
    location: 'Conference Room A',
    agenda: 'Review Q4 sales performance and plan for Q1',
    status: 'completed',
    organizer: 'You'
  },
  {
    id: 3,
    title: 'Product Demo',
    datetime: '2023-12-18T11:00:00',
    duration: '45 mins',
    attendees: [
      { name: 'Robert Wilson', email: 'robert@example.com', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    ],
    location: 'Client Office',
    agenda: 'Demonstrate new product features',
    status: 'upcoming',
    organizer: 'Lisa Wang'
  },
];

export default function Meetings() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesFilter = filter === 'all' || meeting.status === filter;
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         meeting.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setIsModalOpen(true);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Meetings</h1>
          <p className="mt-2 text-sm text-gray-700">
            Schedule, manage, and review all your client and team meetings.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/activities/meetings/new"
            className="block rounded-md bg-[#EF6D8D] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#d45a77] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Schedule New Meeting
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#EF6D8D] sm:text-sm sm:leading-6"
            placeholder="Search meetings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <select
              className="appearance-none rounded-md border-0 bg-white py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-[#EF6D8D] sm:text-sm sm:leading-6"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Meetings</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
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

      {/* Meetings List */}
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Title
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date & Time
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Organizer
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredMeetings.map((meeting) => (
                    <tr key={meeting.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-[#EF6D8D] rounded-full flex items-center justify-center text-white">
                            <CalendarIcon className="h-5 w-5" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{meeting.title}</div>
                            <div className="text-gray-500">{meeting.duration}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{formatDate(meeting.datetime).split(',')[0]}</div>
                        <div className="text-gray-500">{formatDate(meeting.datetime).split(',')[1]}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <img
                            className="h-8 w-8 rounded-full"
                            src={meeting.attendees[0].avatar}
                            alt={meeting.organizer}
                          />
                          <div className="ml-2">
                            <div className="font-medium text-gray-900">{meeting.organizer}</div>
                            <div className="text-gray-500">{meeting.attendees.length} {meeting.attendees.length === 1 ? 'attendee' : 'attendees'}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            meeting.status === 'upcoming'
                              ? 'bg-blue-100 text-blue-800'
                              : meeting.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1)}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => handleViewDetails(meeting)}
                          className="text-[#EF6D8D] hover:text-[#d45a77] mr-4"
                        >
                          View<span className="sr-only">, {meeting.title}</span>
                        </button>
                        <Link
                          to={`/activities/meetings/edit/${meeting.id}`}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          Edit<span className="sr-only">, {meeting.title}</span>
                        </Link>
                        <button className="text-gray-400 hover:text-gray-500">
                          <EllipsisVerticalIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Meeting Details Modal */}
      {isModalOpen && selectedMeeting && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsModalOpen(false)}></div>
            </div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">&#8203;</span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">{selectedMeeting.title}</h3>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setIsModalOpen(false)}
                      >
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <CalendarIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {formatDate(selectedMeeting.datetime)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {selectedMeeting.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPinIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        {selectedMeeting.location}
                      </div>
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">Agenda</h4>
                        <p className="mt-1 text-sm text-gray-500">{selectedMeeting.agenda}</p>
                      </div>
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-900">Attendees</h4>
                        <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {selectedMeeting.attendees.map((attendee) => (
                            <li key={attendee.email} className="flex items-center">
                              <img
                                className="h-8 w-8 rounded-full"
                                src={attendee.avatar}
                                alt={attendee.name}
                              />
                              <div className="ml-3">
                                <p className="text-sm font-medium text-gray-900">{attendee.name}</p>
                                <p className="text-sm text-gray-500">{attendee.email}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
                <Link
                  to={`/activities/meetings/edit/${selectedMeeting.id}`}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#EF6D8D] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#d45a77] sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Edit Meeting
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}