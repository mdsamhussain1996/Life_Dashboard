import React from 'react';

export default function DailyStateCheck({ todayState, setTodayState }) {
  const handleChange = (field, value) => {
    setTodayState(prev => ({ ...prev, [field]: value }));
  };

  const getLabel = (val) => {
    if (val <= 2) return "Low";
    if (val === 3) return "Medium";
    return "High";
  };

  const getColor = (field, val) => {
    if (field === 'stress') return val > 3 ? 'accent-red-400' : 'accent-indigo-500';
    return val > 3 ? 'accent-green-500' : 'accent-indigo-500';
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-800 mb-6">How are you feeling today?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {['mood', 'energy', 'stress'].map(field => (
          <div key={field} className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="capitalize font-medium text-slate-700">{field}</span>
              <span className="text-slate-400 bg-slate-50 px-2 py-1 rounded-md text-xs font-semibold">
                {getLabel(todayState[field])} ({todayState[field]}/5)
              </span>
            </div>
            <input 
              type="range" 
              min="1" max="5" 
              value={todayState[field]} 
              onChange={(e) => handleChange(field, parseInt(e.target.value))}
              className={`w-full ${getColor(field, todayState[field])} cursor-pointer`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
