import React from 'react'
import AddGoal from './AddGoal';

function Main() {
  const username = localStorage.getItem('username') || 'User';
  
  return (
    <div className=''>
      <div className='bg-white rounded-lg p-6 shadow-sm'>
        <h1 className='text-3xl font-semibold text-gray-800 mb-2'>
          Welcome back, <span className='text-blue-600'>{username}</span>
        </h1>
        <p className='text-gray-500 text-lg'>
          Ready to make today productive?
        </p>
      </div>
      <div className='mt-4'>
              <AddGoal/>
      </div>
    </div>
  )
}

export default Main