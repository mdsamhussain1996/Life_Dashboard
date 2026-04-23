import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function DecisionHelper() {
  const [option, setOption] = useState('');
  const [importance, setImportance] = useState(3);
  const [effort, setEffort] = useState(3);
  const [impact, setImpact] = useState(3);
  const [results, setResults] = useState([]);

  const addDecision = (e) => {
    e.preventDefault();
    if (!option.trim()) return;
    
    // Simple Score Formula:
    // (Importance * Impact) / Effort. We normalize effort (1 effort is best, 5 is worst)
    // Map effort: 1 -> 5, 2 -> 4, 3 -> 3, 4 -> 2, 5 -> 1 (Inverted for score multiplier)
    const invertedEffort = 6 - effort; 
    const score = Math.round((importance * impact * invertedEffort) / 1.25); // roughly out of 100
    
    setResults([{ id: Date.now(), option, score }, ...results].sort((a,b) => b.score - a.score));
    setOption('');
    setImportance(3); setEffort(3); setImpact(3);
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <HelpCircle size={18} className="text-indigo-500" /> Decision Helper
      </h2>
      <form onSubmit={addDecision} className="space-y-5 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
        <input 
          value={option} onChange={e => setOption(e.target.value)}
          placeholder="What are you deciding on?" 
          className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl outline-none focus:border-indigo-400 text-sm transition-all"
        />
        <div className="space-y-4 text-sm">
          <div className="space-y-1">
             <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">Importance</label> <span className="font-bold text-slate-800">{importance}/5</span></div>
             <input type="range" min="1" max="5" value={importance} onChange={e => setImportance(parseInt(e.target.value))} className="w-full accent-indigo-500" />
          </div>
          
          <div className="space-y-1">
             <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">Effort required</label> <span className="font-bold text-slate-800">{effort}/5</span></div>
             <input type="range" min="1" max="5" value={effort} onChange={e => setEffort(parseInt(e.target.value))} className="w-full accent-orange-400" />
          </div>
          
          <div className="space-y-1">
             <div className="flex justify-between items-center"><label className="text-slate-600 font-medium">Long-term Impact</label> <span className="font-bold text-slate-800">{impact}/5</span></div>
             <input type="range" min="1" max="5" value={impact} onChange={e => setImpact(parseInt(e.target.value))} className="w-full accent-green-500" />
          </div>
        </div>
        <button type="submit" className="w-full py-3 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">Evaluate Option</button>
      </form>

      {results.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recommendations</p>
            <button onClick={() => setResults([])} className="text-xs text-slate-400 hover:text-slate-600 font-medium transition-colors">Clear all</button>
          </div>
          {results.map((r, i) => (
             <div key={r.id} className="flex justify-between items-center p-4 rounded-xl bg-white border border-slate-100 shadow-sm relative overflow-hidden">
               {i === 0 && <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-400"></div>}
               <span className="text-sm font-medium text-slate-700 pl-2">
                 {r.option}
               </span>
               <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">{r.score} pts</span>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
