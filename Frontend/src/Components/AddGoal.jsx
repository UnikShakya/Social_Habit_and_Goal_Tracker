import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const API_URL = 'http://localhost:3000/api/goals';

function AddGoal() {
  const [goals, setGoals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goalData, setGoalData] = useState({
    name: '',
    days: {
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
    },
    repeat: 'daily',
    reminder: false,
    reminderTime: '08:00',
  });

  const token = localStorage.getItem('token');

  // Fetch goals from backend on mount
  useEffect(() => {
    if (!token) return;

    axios
      .get(API_URL, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setGoals(res.data))
      .catch((err) => console.error(err));
  }, [token]);

  // Drag and drop reorder goals in UI only
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const updatedGoals = Array.from(goals);
    const [moved] = updatedGoals.splice(source.index, 1);
    updatedGoals.splice(destination.index, 0, moved);

    setGoals(updatedGoals);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGoalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day) => {
    setGoalData((prev) => ({
      ...prev,
      days: { ...prev.days, [day]: !prev.days[day] },
    }));
  };

  const toggleRepeat = () => {
    setGoalData((prev) => ({
      ...prev,
      repeat: prev.repeat === 'daily' ? 'weekly' : 'daily',
    }));
  };

  // Add new goal to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('You must be logged in');
      return;
    }

    try {
      const newGoal = { ...goalData, completed: false };
      const res = await axios.post(API_URL, newGoal, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals((prev) => [...prev, res.data]);
      setIsModalOpen(false);

      // Reset form data
      setGoalData({
        name: '',
        days: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
        repeat: 'daily',
        reminder: false,
        reminderTime: '08:00',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to add goal');
    }
  };

  // Toggle goal completed & update backend
  const toggleGoalCompletion = async (goal) => {
    try {
      const updated = await axios.put(
        `${API_URL}/${goal._id}`,
        { completed: !goal.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals((prev) =>
        prev.map((g) => (g._id === updated.data._id ? updated.data : g))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Delete goal from backend and UI
  const deleteGoal = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals((prev) => prev.filter((goal) => goal._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className='font-semibold text-3xl'>
          All Goals
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#6C63FF] text-white px-6 py-2 rounded-lg hover:bg-[#5A52E0] transition-colors shadow-md"
        >
          Add Goal
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="goals">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {goals.map((goal, index) => (
                <Draggable
                  key={goal._id}
                  draggableId={goal._id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      className={`flex items-center justify-between p-4 mb-3 border rounded-lg ${
                        goal.completed
                          ? 'bg-gray-100 border-gray-300'
                          : 'bg-white border-gray-300'
                      } ${snapshot.isDragging ? 'shadow-lg ring-2 ring-[#6C63FF]' : ''}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{
                        ...provided.draggableProps.style,
                        cursor: snapshot.isDragging ? 'grabbing' : 'grab',
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={goal.completed}
                          onChange={() => toggleGoalCompletion(goal)}
                          className="w-5 h-5 text-[#6C63FF] rounded border-gray-300 focus:ring-[#6C63FF]"
                        />
                        <span
                          className={`font-medium ${
                            goal.completed
                              ? 'line-through text-gray-500'
                              : 'text-gray-800'
                          }`}
                        >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteGoal(goal._id);
                        }}
                        className="text-gray-400 hover:text-red-500 text-xl"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-md p-8 w-full max-w-lg shadow-2xl border-t-4 border-[#6C63FF]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Create New Goal
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goal Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={goalData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-200 rounded focus:border-[#6C63FF] focus:ring-0"
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Repeat
                  </label>
                  <button
                    type="button"
                    onClick={toggleRepeat}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                      goalData.repeat === 'weekly' ? 'bg-[#6C63FF]' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                        goalData.repeat === 'weekly' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  {goalData.repeat === 'daily'
                    ? 'Daily goal'
                    : 'Select specific days below'}
                </p>
              </div>

              {goalData.repeat === 'weekly' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Days
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {Object.entries(goalData.days).map(([day, selected]) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => handleDayToggle(day)}
                        className={`py-2 rounded text-sm font-medium ${
                          selected
                            ? 'bg-[#6C63FF] text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Set Reminder
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setGoalData((prev) => ({ ...prev, reminder: !prev.reminder }))
                  }
                  className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
                    goalData.reminder ? 'bg-[#6C63FF]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block w-4 h-4 transform transition-transform bg-white rounded-full ${
                      goalData.reminder ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {goalData.reminder && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    name="reminderTime"
                    value={goalData.reminderTime}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-200 rounded focus:border-[#6C63FF] focus:ring-0"
                  />
                </div>
              )}

              <div className="flex pt-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#6C63FF] text-white rounded-md hover:bg-[#5A52E0] font-medium shadow-md"
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
