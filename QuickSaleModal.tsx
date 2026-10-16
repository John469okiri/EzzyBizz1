import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Scissors, Smartphone, Banknote, CreditCard, Plus } from 'lucide-react';
import { PaymentMethod } from '../types';

interface QuickSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSaleModal: React.FC<QuickSaleModalProps> = ({ isOpen, onClose }) => {
  const { services, staff, addSale, formatCurrency } = useApp();

  const [serviceId, setServiceId] = useState(services[0]?.id || '');
  const [amount, setAmount] = useState<number>(services[0]?.defaultPrice || 500);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('M-Pesa');
  const [barberName, setBarberName] = useState(staff[0]?.name || 'Brian (Lead Barber)');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleServiceChange = (id: string) => {
    setServiceId(id);
    const selected = services.find((s) => s.id === id);
    if (selected) {
      setAmount(selected.defaultPrice);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedSrv = services.find((s) => s.id === serviceId) || services[0];
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 5);
    const dateStr = now.toISOString().split('T')[0];

    addSale({
      date: dateStr,
      time: timeStr,
      serviceId: selectedSrv.id,
      serviceName: selectedSrv.name,
      category: selectedSrv.category,
      amount: Number(amount),
      paymentMethod,
      barberName,
      customerName: customerName.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full shadow-2xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Scissors className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Record Barbershop Sale</h3>
              <p className="text-xs text-slate-500">Fast checkout for walk-in or booked clients</p>
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
          {/* Service Picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Service *
            </label>
            <select
              value={serviceId}
              onChange={(e) => handleServiceChange(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 min-h-[44px]"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({formatCurrency(s.defaultPrice)})
                </option>
              ))}
            </select>
          </div>

          {/* Amount (KSh) */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Final Amount (KSh) *
            </label>
            <input
              type="number"
              min="0"
              step="50"
              required
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono min-h-[44px]"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Payment Method *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['M-Pesa', 'Cash', 'Card'] as PaymentMethod[]).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`py-2 px-2.5 text-xs font-medium rounded-xl border flex items-center justify-center gap-1.5 transition-all min-h-[44px] ${
                    paymentMethod === method
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-xs'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {method === 'M-Pesa' && <Smartphone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                  {method === 'Cash' && <Banknote className="w-3.5 h-3.5 text-amber-600 shrink-0" />}
                  {method === 'Card' && <CreditCard className="w-3.5 h-3.5 text-blue-600 shrink-0" />}
                  <span className="truncate">{method}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Barber Assignment & Customer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Attending Barber *
              </label>
              <select
                value={barberName}
                onChange={(e) => setBarberName(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-800 min-h-[44px]"
              >
                {staff.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Customer Name (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. David / Walk-in"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Service Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. High skin fade, used mint aftershave"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
            />
          </div>

          {/* Buttons */}
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
              className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm min-h-[44px] flex items-center justify-center text-center"
            >
              Hifadhi Mauzo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
