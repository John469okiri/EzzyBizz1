import React from 'react';
import { useApp } from '../context/AppContext';
import { TimeFilter } from '../types';
import { Calendar } from 'lucide-react';

export const TimeFilterBar: React.FC = () => {
  const { timeFilter, setTimeFilter } = useApp();

  const filters: { id: TimeFilter; label: string }[] = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'week', label: 'Past 7 Days' },
    { id: 'month', label: 'Past 30 Days' },
    { id: 'all', label: 'All Records' },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-white p-2 sm:p-2.5 rounded-xl border border-slate-200/80 shadow-xs">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 pl-1">
        <Calendar className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span className="text-[11px] sm:text-xs">Period (Wakati):</span>
      </div>

      <div className="flex items-center gap-1 bg-slate-100/90 p-1 rounded-lg overflow-x-auto scrollbar-none w-full sm:w-auto -mx-1 px-1 sm:mx-0">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setTimeFilter(f.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap shrink-0 min-h-[36px] flex items-center justify-center ${
              timeFilter === f.id
                ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
};
