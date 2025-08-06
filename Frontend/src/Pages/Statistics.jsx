import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const generateSampleData = () => {
  const data = [];
  const today = new Date();
  const startDate = new Date();
  startDate.setFullYear(today.getFullYear() - 1);

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    if (Math.random() > 0.3) {
      data.push({
        date: d.toISOString().split('T')[0],
        count: Math.floor(Math.random() * 5)
      });
    }
  }
  return data;
};

function Statistics() {
  const heatmapData = generateSampleData();
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Habit Tracker Heatmap</h1>
      
      <CalendarHeatmap
        startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
        endDate={new Date()}
        values={heatmapData}
        classForValue={(value) => {
          if (!value) return 'color-empty';
          return `color-scale-${Math.min(value.count, 4)}`;
        }}
        tooltipDataAttrs={(value) => ({
          'data-tooltip': value ? 
            `${value.count} completions on ${value.date}` : 
            'No activity'
        })}
        showWeekdayLabels={true}
      />
      
      <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
        <span className="mr-2">Less</span>
        {[0, 1, 2, 3, 4].map((level) => (
          <div 
            key={level}
            className={`w-4 h-4 mx-1 ${level === 0 ? 'bg-gray-100' : `bg-green-${300 + level * 100}`}`}
          />
        ))}
        <span className="ml-2">More</span>
      </div>
    </div>
  );
}

export default Statistics;