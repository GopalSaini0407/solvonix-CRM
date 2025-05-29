import { useState } from 'react'
import { 
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
  CalendarIcon as CalendarIconSolid
} from '@heroicons/react/24/solid'
import { CalendarIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const events = [
  {
    id: 1,
    title: 'Meeting with Acme Corp',
    date: '2023-11-15',
    time: '10:00 AM',
    duration: '1 hour',
    attendees: ['You', 'John Smith (Acme)'],
    type: 'meeting'
  },
  {
    id: 2,
    title: 'Demo for Globex',
    date: '2023-11-18',
    time: '2:30 PM',
    duration: '45 mins',
    attendees: ['You', 'Sarah Johnson', 'Globex Team'],
    type: 'demo'
  },
  {
    id: 3,
    title: 'Follow-up call',
    date: '2023-11-20',
    time: '9:15 AM',
    duration: '30 mins',
    attendees: ['You', 'Michael Chen'],
    type: 'call'
  },
]

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('month') // 'month' or 'week'
  const [selectedDate, setSelectedDate] = useState(null)

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
    setSelectedDate(null)
  }

  const renderMonthView = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    
    const daysArray = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(<div key={`empty-${i}`} className="h-24 border border-gray-200 bg-gray-50"></div>)
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const dayEvents = events.filter(event => event.date === dateStr)
      
      daysArray.push(
        <div 
          key={day} 
          className={`h-24 border border-gray-200 p-1 overflow-y-auto ${selectedDate === dateStr ? 'bg-indigo-50' : ''}`}
          onClick={() => setSelectedDate(dateStr)}
        >
          <div className="flex justify-between">
            <span className={`text-sm ${isToday(year, month, day) ? 'font-bold text-indigo-600' : ''}`}>{day}</span>
            {isToday(year, month, day) && (
              <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
            )}
          </div>
          {dayEvents.map(event => (
            <div key={event.id} className="mt-1 text-xs p-1 bg-indigo-100 rounded truncate">
              {event.time} - {event.title}
            </div>
          ))}
        </div>
      )
    }
    
    return daysArray
  }

  const isToday = (year, month, day) => {
    const today = new Date()
    return today.getFullYear() === year && 
           today.getMonth() === month && 
           today.getDate() === day
  }

  const getEventsForSelectedDate = () => {
    if (!selectedDate) return []
    return events.filter(event => event.date === selectedDate)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">Calendar</h1>
          <div className="flex space-x-3">
            <button 
              onClick={goToToday}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Today
            </button>
            <div className="flex rounded-md shadow-sm">
              <button
                onClick={prevMonth}
                className="inline-flex items-center px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <span className="inline-flex items-center px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              <button
                onClick={nextMonth}
                className="inline-flex items-center px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Event
            </button>
          </div>
        </div>

        <div className="flex mb-4">
          <button
            onClick={() => setView('month')}
            className={`px-4 py-2 rounded-l-lg ${view === 'month' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Month
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-4 py-2 rounded-r-lg ${view === 'week' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'}`}
          >
            Week
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {view === 'month' ? (
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {days.map(day => (
                <div key={day} className="bg-gray-100 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {day.substring(0, 3)}
                </div>
              ))}
              {renderMonthView()}
            </div>
          ) : (
            <div className="p-4">
              <p className="text-center text-gray-500">Week view will be displayed here</p>
            </div>
          )}
        </div>

        {/* Selected Date Events */}
        {selectedDate && (
          <div className="mt-6 bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Events on {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {getEventsForSelectedDate().length > 0 ? (
                getEventsForSelectedDate().map(event => (
                  <div key={event.id} className="px-6 py-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                        {event.type === 'meeting' && <UserIcon className="h-5 w-5 text-indigo-600" />}
                        {event.type === 'demo' && <CalendarIconSolid className="h-5 w-5 text-indigo-600" />}
                        {event.type === 'call' && <PhoneIcon className="h-5 w-5 text-indigo-600" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-lg font-medium text-gray-900">{event.title}</div>
                        <div className="mt-1 flex items-center text-sm text-gray-500">
                          <ClockIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {event.time} · {event.duration}
                        </div>
                        <div className="mt-2">
                          <h4 className="text-sm font-medium text-gray-500">Attendees</h4>
                          <ul className="mt-1 text-sm text-gray-500">
                            {event.attendees.map((attendee, index) => (
                              <li key={index}>{attendee}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-4 text-center text-gray-500">
                  No events scheduled for this day
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}