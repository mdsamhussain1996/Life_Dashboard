import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { CheckCircle2, Circle, Plus, Zap, ListTodo } from 'lucide-react';

export default function SmartTaskSystem({ currentEnergy, lowMode }) {
  const [tasks, setTasks] = useLocalStorage('life-dash-tasks', []);
  const [newTask, setNewTask] = useState('');
  const [energyReq, setEnergyReq] = useState('medium');
  const [importance, setImportance] = useState('high');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([{ id: Date.now(), title: newTask, energyReq, importance, done: false }, ...tasks]);
    setNewTask('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const mapEnergy = (val) => {
    if (val <= 2) return 'low';
    if (val === 3) return 'medium';
    return 'high';
  };

  const suggestedTask = tasks.filter(t => !t.done).sort((a, b) => {
    const energyMatchA = a.energyReq === mapEnergy(currentEnergy) ? 1 : 0;
    const energyMatchB = b.energyReq === mapEnergy(currentEnergy) ? 1 : 0;
    const impA = a.importance === 'high' ? 1 : 0;
    const impB = b.importance === 'high' ? 1 : 0;
    return (energyMatchB + impB) - (energyMatchA + impA);
  })[0];

  if (lowMode) {
    return (
      <div className="bg-indigo-50/50 p-8 rounded-3xl border border-indigo-100/50 text-center space-y-6">
        <h2 className="text-lg font-semibold text-indigo-900 flex justify-center items-center gap-2">
          <Zap size={20} className="text-indigo-500 fill-indigo-500"/>
          Suggested Task for Now
        </h2>
        {suggestedTask ? (
           <div className="bg-white p-6 rounded-2xl shadow-sm inline-block w-full max-w-sm border border-slate-100 hover:shadow-md transition-shadow">
             <p className="text-xl font-medium text-slate-800 mb-6">{suggestedTask.title}</p>
             <button onClick={() => toggleTask(suggestedTask.id)} className="w-full py-3 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
               <CheckCircle2 size={18} /> Mark as Done
             </button>
           </div>
        ) : (
          <p className="text-indigo-600/80 font-medium">No pending tasks. Enjoy your rest! ☕</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <ListTodo size={18} className="text-indigo-500"/> Tasks
        </h2>
      </div>

      {suggestedTask && (
        <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100/50 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider mb-1 flex items-center gap-1">
              <Zap size={12} className="fill-indigo-500"/> Suggested (Matches Energy)
            </p>
            <p className="text-slate-800 font-medium">{suggestedTask.title}</p>
          </div>
          <button onClick={() => toggleTask(suggestedTask.id)} className="text-indigo-600 hover:text-indigo-700 transition-colors">
            <CheckCircle2 size={24} />
          </button>
        </div>
      )}

      <form onSubmit={addTask} className="flex flex-wrap md:flex-nowrap gap-3 mb-6">
        <input 
          value={newTask} onChange={e => setNewTask(e.target.value)} 
          placeholder="What needs to be done?" 
          className="flex-1 px-4 py-3 bg-slate-50 border border-transparent rounded-xl outline-none focus:border-indigo-300 focus:bg-white transition-all text-sm min-w-[200px]"
        />
        <select value={energyReq} onChange={e => setEnergyReq(e.target.value)} className="px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm outline-none focus:border-indigo-300 transition-all">
          <option value="low">Low Energy</option>
          <option value="medium">Med Energy</option>
          <option value="high">High Energy</option>
        </select>
        <select value={importance} onChange={e => setImportance(e.target.value)} className="px-4 py-3 bg-slate-50 border border-transparent rounded-xl text-sm outline-none focus:border-indigo-300 transition-all">
          <option value="high">High Priority</option>
          <option value="low">Low Priority</option>
        </select>
        <button type="submit" className="p-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700 transition-colors shrink-0">
          <Plus size={20}/>
        </button>
      </form>

      <div className="space-y-2 overflow-y-auto pr-2 flex-1 max-h-[300px]">
        {tasks.map(t => (
          <div key={t.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl group transition-all border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-4">
              <button onClick={() => toggleTask(t.id)} className={`transition-colors ${t.done ? "text-indigo-500" : "text-slate-300 hover:text-slate-400"}`}>
                {t.done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </button>
              <span className={`text-sm font-medium ${t.done ? 'text-slate-400 line-through' : 'text-slate-700'}`}>{t.title}</span>
            </div>
            <div className="flex items-center gap-3">
              {!t.done && (
                 <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-md ${t.energyReq === 'high' ? 'bg-orange-100 text-orange-700' : t.energyReq === 'low' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                   {t.energyReq} energy
                 </span>
              )}
              <button onClick={() => deleteTask(t.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold hover:text-red-600">Delete</button>
            </div>
          </div>
        ))}
        {tasks.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-8">No tasks yet. Add one above!</p>
        )}
      </div>
    </div>
  );
}
