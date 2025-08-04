import React, { useState } from 'react';

function AddGoal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [goalData, setGoalData] = useState({
    name: '',
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false
    },
    repeat: 'daily',
    reminder: false,
    reminderTime: '08:00'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData(prev => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setGoalData(prev => ({
      ...prev,
      days: { ...prev.days, [day]: !prev.days[day] }
    }));
  };

  const toggleRepeat = () => {
    setGoalData(prev => ({
      ...prev,
      repeat: prev.repeat === 'daily' ? 'weekly' : 'daily'
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGoal = {
      ...goalData,
      id: Date.now(),
      completed: false
    };
    setGoals([...goals, newGoal]);
    setIsModalOpen(false);
    // Reset form
    setGoalData({
      name: '',
      days: {
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
      },
      repeat: 'daily',
      reminder: false,
      reminderTime: '08:00'
    });
  };

  const toggleGoalCompletion = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className='bg-white p-4 flex justify-end'>
        <button 
          onClick={() => setIsModalOpen(true)}
          className='bg-[#6C63FF] text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-[#5A52E0] transition-colors shadow-md'
        >
          Add Goal
        </button>
      </div>

      {/* Goals List */}
      <div className="mt-6 space-y-3 cursor-pointer">
        {goals.map(goal => (
          <div 
            key={goal.id} 
            className={`flex items-center justify-between p-4 border rounded-lg ${goal.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'}`}
          >
<div className="flex items-center space-x-4">
  <input
    type="checkbox"
    checked={goal.completed}
    onChange={() => toggleGoalCompletion(goal.id)}
    className="w-5 h-5 text-[#6C63FF] rounded focus:ring-[#6C63FF] border-gray-300"
  />
  <span className={`font-medium ${goal.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
    {goal.name}
  </span>
  {goal.repeat === 'weekly' && (
    <div className="flex space-x-1 capitalize">
      {Object.entries(goal.days)
        .filter(([_, selected]) => selected)
        .map(([day]) => (
          <span 
            key={day} 
            className="text-xs bg-[#6c63ff] text-white px-2 py-1 rounded"
          >
            {day.substring(0, 3)}
          </span>
        ))}
    </div>
  )}
</div>
            <button
              onClick={() => deleteGoal(goal.id)}
              className="text-gray-400 hover:text-red-500"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-md p-8 w-full max-w-lg shadow-2xl border-t-4 border-[#6C63FF]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Create New Goal</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Goal Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                  Goal Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={goalData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded-none focus:border-[#6C63FF] focus:ring-0"
                  required
                />
              </div>

              {/* Repeat Toggle */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700 uppercase tracking-wider">
                    Repeat
                  </label>
                  <button
                    type="button"
                    onClick={toggleRepeat}
                    className={`relative inline-flex items-center h-6 rounded-full cursor-pointer w-11 transition-colors ${goalData.repeat === 'weekly' ? 'bg-[#6C63FF]' : 'bg-gray-300'}`}
                  >
                    <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${goalData.repeat === 'weekly' ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {goalData.repeat === 'daily' ? 'This goal will repeat every day' : 'Select specific days below'}
                </p>
              </div>

              {/* Days Selection */}
              {goalData.repeat === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Select Days
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(goalData.days).map(([day, selected]) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`py-2 rounded-none text-sm font-medium ${selected ? 'bg-[#6C63FF] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reminder */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 uppercase tracking-wider">
                    Set Reminder
                  </label>
                  <p className="text-xs text-gray-500">Get notified about this goal</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGoalData(prev => ({ ...prev, reminder: !prev.reminder }))}
                  className={`relative inline-flex items-center h-6 rounded-full cursor-pointer w-11 transition-colors ${goalData.reminder ? 'bg-[#6C63FF]' : 'bg-gray-300'}`}
                >
                  <span className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${goalData.reminder ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {goalData.reminder && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    name="reminderTime"
                    value={goalData.reminderTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded-none focus:border-[#6C63FF] focus:ring-0"
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#6C63FF] text-white rounded-md hover:bg-[#5A52E0] font-medium shadow-md cursor-pointer"
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddGoal;