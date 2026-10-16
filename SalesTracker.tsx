import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { TimeFilterBar } from './TimeFilterBar';
import {
  Plus,
  Search,
  Filter,
  Download,
  Trash2,
  Receipt,
  CheckCircle2,
  Scissors,
  Smartphone,
  Banknote,
  CreditCard,
} from 'lucide-react';
import { PaymentMethod, Sale } from '../types';

interface SalesTrackerProps {
  onOpenQuickSale: () => void;
}

export const SalesTracker: React.FC<SalesTrackerProps> = ({ onOpenQuickSale }) => {
  const { filteredSales, deleteSale, formatCurrency, staff } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStaff, setSelectedStaff] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedSaleForSlip, setSelectedSaleForSlip] = useState<Sale | null>(null);

  // Filtered sales based on search & selectors
  const displayedSales = useMemo(() => {
    return filteredSales.filter((sale) => {
      const matchSearch =
        sale.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sale.customerName && sale.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (sale.notes && sale.notes.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchStaff = selectedStaff === 'all' || sale.barberName === selectedStaff;
      const matchMethod = selectedMethod === 'all' || sale.paymentMethod === selectedMethod;

      return matchSearch && matchStaff && matchMethod;
    });
  }, [filteredSales, searchTerm, selectedStaff, selectedMethod]);

  const totalFilteredAmount = displayedSales.reduce((acc, s) => acc + s.amount, 0);

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Service', 'Category', 'Customer', 'Barber', 'Payment Method', 'Amount (KSh)', 'Notes'];
    const rows = displayedSales.map((s) => [
      s.date,
      s.time,
      `"${s.serviceName}"`,
      `"${s.category}"`,
      `"${s.customerName || 'Walk-in'}"`,
      `"${s.barberName}"`,
      s.paymentMethod,
      s.amount,
      `"${s.notes || ''}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EzzyBIZZ-Sales-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'M-Pesa':
        return <Smartphone className="w-3.5 h-3.5 text-emerald-600" />;
      case 'Cash':
        return <Banknote className="w-3.5 h-3.5 text-amber-600" />;
      case 'Card':
        return <CreditCard className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">Sales Tracker (Mauzo ya Kinyozi)</h2>
          <p className="text-xs text-slate-500">
            Log haircuts, shaves, treatments, and client M-Pesa or cash payments
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors whitespace-nowrap min-h-[44px]"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenQuickSale}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-sm transition-all whitespace-nowrap min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Record Sale</span>
          </button>
        </div>
      </div>

      <TimeFilterBar />

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customer, service, or notes..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[44px]"
          />
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          {/* Barber Filter */}
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 min-h-[44px]"
          >
            <option value="all">All Barbers</option>
            {staff.map((st) => (
              <option key={st.id} value={st.name}>
                {st.name}
              </option>
            ))}
          </select>

          {/* Payment Method Filter */}
          <select
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 min-h-[44px]"
          >
            <option value="all">All Payments</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="Cash">Cash</option>
            <option value="Card">Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        {displayedSales.length > 0 ? (
          <>
            {/* Mobile Cards (Visible on phones < md) */}
            <div className="md:hidden divide-y divide-slate-100">
              {displayedSales.map((sale) => (
                <div key={sale.id} className="p-3.5 space-y-2 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{sale.serviceName}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        <span>{sale.customerName || 'Walk-in'}</span>
                        <span className="mx-1">·</span>
                        <span>{sale.barberName}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-emerald-700 text-sm tabular-nums">
                        {formatCurrency(sale.amount)}
                      </div>
                      <div className="flex items-center justify-end gap-1 text-[11px] text-slate-500 mt-0.5">
                        {getPaymentIcon(sale.paymentMethod)}
                        <span>{sale.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  {sale.notes && (
                    <div className="text-[11px] text-slate-500 italic bg-slate-50 p-1.5 rounded">
                      {sale.notes}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400 border-t border-slate-50">
                    <span>{sale.date} at {sale.time}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedSaleForSlip(sale)}
                        className="text-emerald-700 font-semibold px-2 py-1 rounded hover:bg-emerald-50"
                      >
                        Receipt Slip
                      </button>
                      <button
                        onClick={() => deleteSale(sale.id)}
                        className="text-rose-600 font-medium px-2 py-1 rounded hover:bg-rose-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table (Hidden on phones, visible md+) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Date & Time</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Barber</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedSales.map((sale) => (
                    <tr key={sale.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                        <span className="font-medium text-slate-900">{sale.date}</span>
                        <span className="text-slate-400 ml-1.5">{sale.time}</span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{sale.serviceName}</div>
                        {sale.notes && (
                          <div className="text-[11px] text-slate-500 truncate max-w-xs">
                            {sale.notes}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                        {sale.customerName || <span className="text-slate-400 italic">Walk-in</span>}
                      </td>
                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                        {sale.barberName}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 font-medium text-slate-700">
                          {getPaymentIcon(sale.paymentMethod)}
                          <span>{sale.paymentMethod}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right whitespace-nowrap font-bold text-slate-900 tabular-nums">
                        {formatCurrency(sale.amount)}
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setSelectedSaleForSlip(sale)}
                            title="View receipt slip"
                            className="p-1 text-slate-400 hover:text-emerald-700 rounded hover:bg-slate-100"
                          >
                            <Receipt className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteSale(sale.id)}
                            title="Delete entry"
                            className="p-1 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-12 text-center">
            <Scissors className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800">No sales found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              There are no sales matching your current filters or date range.
            </p>
            <button
              onClick={onOpenQuickSale}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Log First Sale
            </button>
          </div>
        )}

        {/* Total Summary Footer */}
        {displayedSales.length > 0 && (
          <div className="bg-slate-50 px-4 py-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              Showing {displayedSales.length} recorded sales
            </span>
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Filtered Total:</span>
              <span className="text-sm font-extrabold text-slate-900 tabular-nums">
                {formatCurrency(totalFilteredAmount)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Mini Receipt Modal */}
      {selectedSaleForSlip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl p-5 sm:p-6 max-w-sm w-full shadow-2xl border border-slate-200 my-auto max-h-[92vh] overflow-y-auto">
            <div className="text-center pb-4 border-b border-dashed border-slate-200">
              <h4 className="font-extrabold text-base text-slate-900 tracking-tight">EzzyBIZZ Receipt</h4>
              <p className="text-xs text-slate-500">Barbershop & Grooming Studio</p>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Date & Time:</span>
                <span className="font-medium text-slate-800">{selectedSaleForSlip.date} · {selectedSaleForSlip.time}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Customer:</span>
                <span className="font-medium text-slate-800">{selectedSaleForSlip.customerName || 'Walk-in'}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Attending Barber:</span>
                <span className="font-medium text-slate-800">{selectedSaleForSlip.barberName}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Payment Mode:</span>
                <span className="font-medium text-slate-800">{selectedSaleForSlip.paymentMethod}</span>
              </div>
              {selectedSaleForSlip.notes && (
                <div className="pt-2 text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded">
                  Notes: {selectedSaleForSlip.notes}
                </div>
              )}
            </div>

            <div className="py-3 border-t border-b border-slate-200 flex justify-between items-center">
              <span className="text-sm font-semibold text-slate-700">{selectedSaleForSlip.serviceName}</span>
              <span className="text-base font-extrabold text-emerald-700 tabular-nums">
                {formatCurrency(selectedSaleForSlip.amount)}
              </span>
            </div>

            <div className="mt-4 pt-2 text-center">
              <p className="text-[11px] text-slate-400">Thank you for visiting Ezzy Cuts!</p>
              <button
                onClick={() => setSelectedSaleForSlip(null)}
                className="mt-4 w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold min-h-[44px] flex items-center justify-center transition-colors"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
