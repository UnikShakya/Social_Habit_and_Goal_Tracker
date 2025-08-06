import React from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // Default styling

function Aside() {
  return (
    <div className='bg-white min-h-screen p-4'>
      <div className='space-y-4'>
        
        {/* Today's Date */}
        <div className='px-3 py-3 border border-gray-300 rounded-sm'>
          <h2 className='text-sm font-semibold text-gray-500 uppercase'>Today</h2>
          <p className='text-gray-800 font-bold'>Monday, 04 August 2025</p>
        </div>

        {/* Streak */}
        <div className='px-3 py-3 border border-gray-300 rounded-sm flex items-center'>
          <div className='text-2xl'>
            🔥
          </div>
          <div>
            <h2 className='text-sm font-semibold text-gray-500 uppercase'>Current Streak</h2>
            <p className='text-gray-800 font-bold'>18 days</p>
          </div>
        </div>
        {/*Consistent*/}
        <div className='px-3 py-3 border border-gray-300 rounded-sm flex items-center'>
          <div>
            <h2 className='text-sm font-semibold text-gray-500 uppercase'>Most Consistent Habit</h2>
            <p className='text-gray-800 font-bold'>Sleep</p>
          </div>
        </div>
        {/* Calendar Component */}
        <div className='px-3 py-3 border border-gray-300 rounded-sm'>
          <Calendar 
            className="border-none"
            tileClassName="hover:bg-gray-100 rounded-sm"
            view="month"
          />
        </div>

      </div>
    </div>
  )
}

export default Aside