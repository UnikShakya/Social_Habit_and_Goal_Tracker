import React, { useState, useRef, useEffect } from 'react';
import { FiMoon, FiBell, FiSearch } from 'react-icons/fi';
import { FaUserCircle, FaCog, FaSignOutAlt } from 'react-icons/fa';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const username = localStorage.getItem('username') || 'User';

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md mr-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border-none rounded-xl focus:ring-0 focus:outline-none focus:border-transparent"
          placeholder="Search for other users"
        />
      </div>

      {/* Right Side Controls */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Toggle */}
        <button
          className="p-2 text-gray-600 rounded-full hover:bg-gray-100"
          aria-label="Toggle dark mode"
        >
          <FiMoon size={18} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-600 rounded-full hover:bg-gray-100">
          <FiBell size={18} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUserCircle size={24} className="text-gray-600" />
            <span className="text-sm font-medium text-gray-700">{username}</span>
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaUserCircle className="mr-3 text-gray-500" size={14} />
                Profile
              </a>
              <a
                href="#"
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <FaCog className="mr-3 text-gray-500" size={14} />
                Settings
              </a>
              <div className="border-t border-gray-200"></div>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500"
              >
                <FaSignOutAlt className="mr-3 text-gray-500" size={14} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;