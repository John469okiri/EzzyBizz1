import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TimeFilterBar } from './TimeFilterBar';
import {
  Plus,
  Receipt,
  Trash2,
  Search,
  Filter,
  DollarSign,
  AlertCircle,
  Zap,
  Droplet,
  Scissors,
  Wifi,
  Coffee,
  Wrench,
  Home,
} from 'lucide-react';
import { ExpenseCategory } from '../types';

interface ExpensesTrackerProps {
  onOpenQuickExpense: () => void;
}

export const ExpensesTracker: React.FC<ExpensesTrackerProps> = ({ onOpenQuickExpense }) => {
  const { filteredExpenses, deleteExpense, formatCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filtered expenses
  const displayedExpenses = useMemo(() => {
    return filteredExpenses.filter((exp) => {
      const matchSearch =
        exp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (exp.paidBy && exp.paidBy.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCat = selectedCategory === 'all' || exp.category === selectedCategory;

      return matchSearch && matchCat;
    });
  }, [filteredExpenses, searchTerm, selectedCategory]);

  const totalExpenseSum = displayedExpenses.reduce((acc, e) => acc + e.amount, 0);

  // Group by category for visual distribution
  const categoryBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    let total = 0;
    filteredExpenses.forEach((e) => {
      map[e.category] = (map[e.category] || 0) + e.amount;
      total += e.amount;
    });

    return Object.entries(map)
      .map(([cat, amount]) => ({
        category: cat,
        amount,
        percent: total > 0 ? Math.round((amount / total) * 100) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredExpenses]);

  const getCategoryIcon = (cat: ExpenseCategory | string) => {
    if (cat.includes('Electricity')) return <Zap className="w-3.5 h-3.5 text-amber-500" />;
    if (cat.includes('Water')) return <Droplet className="w-3.5 h-3.5 text-blue-500" />;
    if (cat.includes('Blades') || cat.includes('Supplies')) return <Scissors className="w-3.5 h-3.5 text-emerald-600" />;
    if (cat.includes('Internet')) return <Wifi className="w-3.5 h-3.5 text-indigo-500" />;
    if (cat.includes('Snacks') || cat.includes('Tea')) return <Coffee className="w-3.5 h-3.5 text-orange-500" />;
    if (cat.includes('Maintenance')) return <Wrench className="w-3.5 h-3.5 text-slate-500" />;
    if (cat.includes('Rent')) return <Home className="w-3.5 h-3.5 text-rose-500" />;
    return <Receipt className="w-3.5 h-3.5 text-slate-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Expenses & Bills Tracker (Matumizi)</h2>
          <p className="text-xs text-slate-500">
            Keep track of rent, electricity tokens, blades, water bills, and operational expenses
          </p>
        </div>

        <button
          onClick={onOpenQuickExpense}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-xl shadow-sm transition-all whitespace-nowrap min-h-[44px] w-full sm:w-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log Expense (Weka Matumizi)</span>
        </button>
      </div>

      <TimeFilterBar />

      {/* Category Distribution Card */}
      {categoryBreakdown.length > 0 && (
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-slate-900">Expense Allocation by Category</h3>
            <span className="text-xs font-bold text-rose-600 tabular-nums">
              Total: {formatCurrency(totalExpenseSum)}
            </span>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
            {categoryBreakdown.map((item) => (
              <div key={item.category} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-1.5 font-medium text-slate-800 truncate">
                    {getCategoryIcon(item.category)}
                    <span className="truncate">{item.category}</span>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums shrink-0">
                    {formatCurrency(item.amount)}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${item.percent}%` }}
                    className="h-full bg-rose-500 rounded-full"
                  />
                </div>
                <div className="text-[10px] text-slate-500 mt-1 text-right">
                  {item.percent}% of total
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search description, receipt #, or paid by..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 min-h-[44px]"
        >
          <option value="all">All Categories</option>
          <option value="Rent & Premises">Rent & Premises</option>
          <option value="Clipper Blades & Supplies">Clipper Blades & Supplies</option>
          <option value="Electricity (Tokens)">Electricity (Tokens)</option>
          <option value="Water Bill">Water Bill</option>
          <option value="Staff Commission & Wages">Staff Commission & Wages</option>
          <option value="Internet & M-Pesa Charges">Internet & M-Pesa Charges</option>
          <option value="Equipment & Maintenance">Equipment & Maintenance</option>
          <option value="Snacks & Tea for Clients">Snacks & Tea for Clients</option>
          <option value="Marketing & Signage">Marketing & Signage</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </div>

      {/* Expense List Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {displayedExpenses.length > 0 ? (
          <>
            {/* Mobile Cards (Visible on phones < md) */}
            <div className="md:hidden divide-y divide-slate-100">
              {displayedExpenses.map((exp) => (
                <div key={exp.id} className="p-3.5 space-y-2 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-slate-900 text-sm">{exp.description}</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        {getCategoryIcon(exp.category)}
                        <span>{exp.category}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-rose-600 text-sm tabular-nums">
                        {formatCurrency(exp.amount)}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {exp.receiptNo || 'No ref'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-50">
                    <span>{exp.date} · Paid by {exp.paidBy || 'Owner'}</span>
                    <button
                      onClick={() => deleteExpense(exp.id)}
                      className="text-rose-600 font-medium px-2 py-1 rounded hover:bg-rose-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table (Visible on md+) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Paid By</th>
                    <th className="py-3 px-4">Receipt #</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedExpenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-900">
                        {exp.date}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          {getCategoryIcon(exp.category)}
                          <span>{exp.category}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-800 font-medium">
                        {exp.description}
                      </td>
                      <td className="py-3 px-4 text-slate-600 whitespace-nowrap">
                        {exp.paidBy || 'Owner'}
                      </td>
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                        {exp.receiptNo || '—'}
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap font-bold text-rose-600 tabular-nums">
                        {formatCurrency(exp.amount)}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => deleteExpense(exp.id)}
                          title="Delete expense"
                          className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <Receipt className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No expenses recorded</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              No expenses found in this selected period or category.
            </p>
            <button
              onClick={onOpenQuickExpense}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Log First Expense
            </button>
          </div>
        )}

        {displayedExpenses.length > 0 && (
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              Showing {displayedExpenses.length} expense records
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Total Outflow:</span>
              <span className="text-sm font-extrabold text-rose-600 tabular-nums">
                {formatCurrency(totalExpenseSum)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
