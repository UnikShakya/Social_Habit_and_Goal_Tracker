import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_GOALS = 'http://localhost:3000/api/goals';

// Dummy buddy data - replace with real user info or API call later
const buddies = [
  {
    id: '688f18e6c1f30464a16f6e3d',
    username: 'BuddyUser2',
    avatar: 'https://i.pravatar.cc/150?img=5', // example avatar URL
  },
  // Add more buddies if needed
];

function Buddy() {
  const token = localStorage.getItem('token');
  const [selectedBuddy, setSelectedBuddy] = useState(null);
  const [buddyGoals, setBuddyGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch goals for selected buddy
  useEffect(() => {
    if (!selectedBuddy) return;

    setLoading(true);
    setError('');

    axios
      .get(`${API_GOALS}/${selectedBuddy.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBuddyGoals(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load goals');
        setLoading(false);
      });
  }, [selectedBuddy, token]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Buddies</h1>

      <div className="flex space-x-6 mb-8">
        {buddies.map((buddy) => (
          <div
            key={buddy.id}
            onClick={() => setSelectedBuddy(buddy)}
            className={`cursor-pointer p-3 rounded-lg border ${
              selectedBuddy?.id === buddy.id
                ? 'border-indigo-600 bg-indigo-100'
                : 'border-gray-300 hover:bg-gray-100'
            } flex flex-col items-center w-24`}
          >
            <img
              src={buddy.avatar}
              alt={`${buddy.username} avatar`}
              className="rounded-full w-16 h-16 mb-2 object-cover"
            />
            <span className="text-center text-sm font-medium">{buddy.username}</span>
          </div>
        ))}
      </div>

      {selectedBuddy ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Goals of {selectedBuddy.username}
          </h2>

          {loading && <p>Loading goals...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {!loading && buddyGoals.length === 0 && <p>No goals found.</p>}

          <ul className="space-y-3">
            {buddyGoals.map((goal) => (
              <li
                key={goal._id}
                className={`p-4 border rounded ${
                  goal.completed ? 'bg-green-100 text-green-800' : 'bg-white'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className={`font-semibold ${
                      goal.completed ? 'line-through' : ''
                    }`}
                  >
                    {goal.name}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${
                      goal.completed ? 'bg-green-600 text-white' : 'bg-gray-300'
                    }`}
                  >
                    {goal.completed ? 'Completed' : 'Incomplete'}
                  </span>
                </div>

                {goal.repeat === 'weekly' && (
                  <div className="mt-2 flex space-x-1 text-xs text-gray-600 capitalize">
                    {Object.entries(goal.days)
                      .filter(([_, val]) => val)
                      .map(([day]) => (
                        <span key={day} className="px-2 py-1 bg-indigo-200 rounded">
                          {day.substring(0, 3)}
                        </span>
                      ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Select a buddy to see their goals.</p>
      )}
    </div>
  );
}

export default Buddy;
