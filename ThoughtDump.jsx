import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MessageSquare, Tag } from 'lucide-react';

export default function ThoughtDump() {
  const [thoughts, setThoughts] = useLocalStorage('life-dash-thoughts', []);
  const [text, setText] = useState('');

  const categorize = (content) => {
    const lower = content.toLowerCase();
    if (/(todo|must|need to|should|fix|call|email|buy)/.test(lower)) return 'Actionable';
    if (/(ignore|whatever|doesn't matter|stupid|annoyed)/.test(lower)) return 'Ignore';
    return 'Revisit Later';
  };

  const saveThought = () => {
    if (!text.trim()) return;
    setThoughts([{
      id: Date.now(),
      text,
      category: categorize(text),
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }, ...thoughts]);
    setText('');
  };

  const getBadgeColor = (cat) => {
    switch (cat) {
      case 'Actionable': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Ignore': return 'bg-slate-100 text-slate-500 border-slate-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col h-full">
      <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <MessageSquare size={18} className="text-indigo-500"/> Thought Dump
      </h2>
      <div className="mb-6 relative">
        <textarea 
          value={text} onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind? Just write it out..."
          className="w-full p-4 bg-slate-50 border border-transparent rounded-2xl h-32 outline-none focus:border-indigo-300 focus:bg-white transition-all resize-none text-sm"
        />
        <div className="absolute bottom-3 right-3">
          <button onClick={saveThought} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors">Save</button>
        </div>
      </div>

      <div className="space-y-3 overflow-y-auto pr-2 max-h-[300px]">
        {thoughts.map(t => (
          <div key={t.id} className="p-4 bg-white border border-slate-100 rounded-2xl text-sm relative group hover:shadow-sm transition-shadow">
             <p className="text-slate-700 pr-12 leading-relaxed">{t.text}</p>
             <div className="mt-3 flex items-center justify-between">
               <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-md border ${getBadgeColor(t.category)}`}>
                 {t.category}
               </span>
               <span className="text-xs font-medium text-slate-400">{t.time}</span>
             </div>
             <button onClick={() => setThoughts(thoughts.filter(th => th.id !== t.id))} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
             </button>
          </div>
        ))}
        {thoughts.length === 0 && (
          <p className="text-center text-slate-400 text-sm mt-4">Mind is clear! No thoughts dumped yet.</p>
        )}
      </div>
    </div>
  );
}
