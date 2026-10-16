import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Receipt } from 'lucide-react';
import { ExpenseCategory } from '../types';

interface QuickExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickExpenseModal: React.FC<QuickExpenseModalProps> = ({ isOpen, onClose }) => {
  const { addExpense } = useApp();

  const [category, setCategory] = useState<ExpenseCategory>('Clipper Blades & Supplies');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState<number>(300);
  const [paidBy, setPaidBy] = useState('Owner');
  const [receiptNo, setReceiptNo] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || amount <= 0) return;

    const dateStr = new Date().toISOString().split('T')[0];

    addExpense({
      date: dateStr,
      category,
      description: description.trim(),
      amount: Number(amount),
      paidBy: paidBy.trim() || 'Owner',
      receiptNo: receiptNo.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Business Expense</h3>
              <p className="text-xs text-slate-500">Track supplies, shop rent, tokens, and wages</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Expense Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 min-h-[44px]"
            >
              <option value="Clipper Blades & Supplies">Clipper Blades & Supplies</option>
              <option value="Electricity (Tokens)">Electricity (Tokens)</option>
              <option value="Water Bill">Water Bill</option>
              <option value="Rent & Premises">Rent & Premises</option>
              <option value="Staff Commission & Wages">Staff Commission & Wages</option>
              <option value="Internet & M-Pesa Charges">Internet & M-Pesa Charges</option>
              <option value="Snacks & Tea for Clients">Snacks & Tea for Clients</option>
              <option value="Equipment & Maintenance">Equipment & Maintenance</option>
              <option value="Marketing & Signage">Marketing & Signage</option>
              <option value="Miscellaneous">Miscellaneous</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 5 boxes Dorco razor blades"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Amount (KSh) *
              </label>
              <input
                type="number"
                min="1"
                step="10"
                required
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 text-sm font-bold text-rose-600 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono min-h-[44px]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Paid By
              </label>
              <input
                type="text"
                value={paidBy}
                onChange={(e) => setPaidBy(e.target.value)}
                placeholder="Owner / Cashier"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Receipt / Ref Number (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. MPESA-QWERTY or KPLC-908"
              value={receiptNo}
              onChange={(e) => setReceiptNo(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono min-h-[44px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 px-4 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 min-h-[44px] flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-sm min-h-[44px] flex items-center justify-center text-center"
            >
              Hifadhi Matumizi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
