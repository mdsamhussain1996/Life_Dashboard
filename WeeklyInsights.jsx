import React from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export default function WeeklyInsights({ history }) {
  // Take last 7 entries
  const recent = history.slice(-7);
  
  if (recent.length === 0) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Weekly Insights</h2>
        <p className="text-sm text-slate-500">Log your state for a few days to see insights!</p>
      </div>
    );
  }

  const avgMood = (recent.reduce((acc, curr) => acc + curr.mood, 0) / recent.length).toFixed(1);
  const avgEnergy = (recent.reduce((acc, curr) => acc + curr.energy, 0) / recent.length).toFixed(1);

  // Simple insight generation
  let insight = "Keep tracking to learn your patterns.";
  if (avgMood > 3.5 && avgEnergy > 3.5) insight = "You've been in a great state lately! Keep doing what you're doing.";
  else if (avgEnergy < 2.5) insight = "Your energy has been consistently low. Try to schedule more rest and light tasks.";
  else if (avgMood < 2.5) insight = "It's been a tough week emotionally. Be kind to yourself.";

  const data = recent.map(item => {
    const parts = item.date.split('/'); // Simplistic format, varies by locale.
    const displayDate = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : item.date;
    return {
      name: displayDate,
      mood: item.mood,
      energy: item.energy
    };
  });

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <TrendingUp size={18} className="text-indigo-500" /> Insights
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Avg Mood</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{avgMood}</p>
        </div>
        <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Avg Energy</p>
          <p className="text-3xl font-black text-slate-800 mt-1">{avgEnergy}</p>
        </div>
      </div>
      
      <p className="text-sm text-indigo-800 bg-indigo-50 p-4 rounded-2xl border border-indigo-100 mb-8 leading-relaxed font-medium">
        💡 {insight}
      </p>

      <div className="h-40 w-full relative">
        <p className="text-xs text-slate-400 absolute -top-4 right-0 font-medium">Mood & Energy (Past 7 Days)</p>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
            <Tooltip 
              cursor={{fill: '#f8fafc'}}
              contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 500 }}
            />
            <Bar dataKey="mood" fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={30} />
            <Bar dataKey="energy" fill="#f472b6" radius={[4, 4, 0, 0]} maxBarSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
