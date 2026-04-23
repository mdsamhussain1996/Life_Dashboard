import React, { useEffect } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import DailyStateCheck from './components/DailyStateCheck';
import SmartTaskSystem from './components/SmartTaskSystem';
import ThoughtDump from './components/ThoughtDump';
import DecisionHelper from './components/DecisionHelper';
import WeeklyInsights from './components/WeeklyInsights';
import { Moon, Sun, Activity } from 'lucide-react';

export default function App() {
  const [lowMode, setLowMode] = useLocalStorage('life-dash-low-mode', false);
  const [history, setHistory] = useLocalStorage('life-dash-history', []);
  const [todayState, setTodayState] = useLocalStorage('life-dash-today', { 
    date: new Date().toLocaleDateString(), 
    mood: 3, energy: 3, stress: 3 
  });

  // Basic logic to archive yesterday's state
  useEffect(() => {
    const today = new Date().toLocaleDateString();
    if (todayState.date !== today) {
      setHistory(prev => {
        const exists = prev.find(h => h.date === todayState.date);
        if (!exists) {
          return [...prev, todayState];
        }
        return prev;
      });
      setTodayState({ date: today, mood: 3, energy: 3, stress: 3 });
    }
  }, [todayState, setHistory, setTodayState]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
      <header className="flex justify-between items-center pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
          <Activity className="text-indigo-500" />
          Life Dashboard
        </h1>
        <button 
          onClick={() => setLowMode(!lowMode)}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 rounded-full text-slate-700 transition-colors shadow-sm"
        >
          {lowMode ? <Sun size={18} /> : <Moon size={18} />}
          <span className="text-sm font-medium">{lowMode ? "Normal Mode" : "Low Mode"}</span>
        </button>
      </header>

      {lowMode ? (
        <div className="max-w-xl mx-auto space-y-8 mt-12 animate-in fade-in duration-500">
          <DailyStateCheck todayState={todayState} setTodayState={setTodayState} />
          <SmartTaskSystem currentEnergy={todayState.energy} lowMode={true} />
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in duration-500">
          <section>
            <DailyStateCheck todayState={todayState} setTodayState={setTodayState} />
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <SmartTaskSystem currentEnergy={todayState.energy} lowMode={false} />
              <ThoughtDump />
            </div>
            <div className="space-y-6">
              <WeeklyInsights history={[...history, todayState]} />
              <DecisionHelper />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
