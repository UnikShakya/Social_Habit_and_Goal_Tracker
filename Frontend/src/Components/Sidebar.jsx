import { NavLink } from 'react-router-dom'
import { 
  FaHome, 
  FaCheckCircle, 
  FaChartBar, 
  FaCalendarAlt, 
  FaCog,
  FaBook 
} from 'react-icons/fa'

function Sidebar() {
  const navItems = [
    { name: 'Dashboard', icon: <FaHome size={18} />, path: '/dashboard' },
    { name: 'Habits', icon: <FaCheckCircle size={18} />, path: '/habits' },
    { name: 'Statistics', icon: <FaChartBar size={18} />, path: '/stats' },
    { name: 'Calendar', icon: <FaCalendarAlt size={18} />, path: '/calendar' },
    // { name: 'Settings', icon: <FaCog size={18} />, path: '/settings' },
  ]

  return (
    <div className='w-64 p-6 h-full bg-white flex flex-col'>
      <div className='flex items-center mb-8'>
        <div className='text-2xl mr-2 text-blue-600'><FaBook size={24} /></div>
        <h1 className='text-xl font-bold text-gray-800'>HabitTracker</h1>
      </div>

      <nav className='flex-1 mb-6'>
        <ul className='space-y-1'>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition-colors ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`
                }
              >
                <span className='mr-3'>{item.icon}</span>
                <span className='text-sm font-medium'>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className='mt-auto space-y-6'>
        <div className='space-y-1'>
          <h2 className='text-sm font-semibold text-gray-500'>Today</h2>
          <p className='text-gray-800'>Monday, 04 August 2025</p>
        </div>

        <div className='p-3 bg-gray-50 rounded-lg space-y-1'>
          <h2 className='text-sm font-semibold text-gray-500'>Current Streak</h2>
          <p className='text-gray-800'>18 days</p>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
