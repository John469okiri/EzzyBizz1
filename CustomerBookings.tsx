import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  User as UserIcon,
  Phone,
  Scissors,
  CheckCircle2,
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
  Search,
  Check,
  DollarSign,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { Booking, BookingStatus } from '../types';

export const CustomerBookings: React.FC = () => {
  const {
    bookings,
    services,
    staff,
    user,
    formatCurrency,
    addBooking,
    updateBookingStatus,
    deleteBooking,
    convertBookingToSale,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'manager' | 'customerPreview'>('manager');
  const [copiedLink, setCopiedLink] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Customer Booking Form state
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [selectedBarber, setSelectedBarber] = useState(staff[0]?.name || 'Any Barber');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState('11:00');
  const [custNotes, setCustNotes] = useState('');
  const [createdBookingConfirmation, setCreatedBookingConfirmation] = useState<Booking | null>(null);

  const bookingUrl = `${window.location.origin}?booking=preview`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(bookingUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName.trim() || !custPhone.trim()) return;

    const srv = services.find((s) => s.id === selectedServiceId) || services[0];

    const newBooking = addBooking({
      customerName: custName.trim(),
      customerPhone: custPhone.trim(),
      serviceId: srv.id,
      serviceName: srv.name,
      price: srv.defaultPrice,
      barberName: selectedBarber,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed',
      notes: custNotes.trim() || undefined,
    });

    setCreatedBookingConfirmation(newBooking);
    setCustName('');
    setCustPhone('');
    setCustNotes('');
  };

  const filteredBookings = bookings.filter((b) => {
    const matchSearch =
      b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.customerPhone.includes(searchTerm) ||
      b.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.bookingRef.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = selectedStatus === 'all' || b.status === selectedStatus;
    return matchSearch && matchStatus;
  });

  const timeSlots = [
    '09:00',
    '10:00',
    '11:00',
    '12:30',
    '14:00',
    '15:30',
    '16:30',
    '17:30',
    '18:30',
  ];

  return (
    <div className="space-y-6">
      {/* Header and Sub-Tab switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Customer Booking (Miadi ya Wateja)</h2>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Live Preview
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Manage incoming appointments and preview your public booking page
          </p>
        </div>

        {/* Segmented Switcher */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveSubTab('manager')}
            className={`flex-1 sm:flex-none px-3 py-2 text-xs font-medium rounded-lg transition-all min-h-[40px] flex items-center justify-center whitespace-nowrap ${
              activeSubTab === 'manager'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Appointments List ({bookings.length})
          </button>
          <button
            onClick={() => setActiveSubTab('customerPreview')}
            className={`flex-1 sm:flex-none px-3 py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-1.5 min-h-[40px] whitespace-nowrap ${
              activeSubTab === 'customerPreview'
                ? 'bg-white text-emerald-800 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span>Customer View</span>
          </button>
        </div>
      </div>

      {/* Share Link Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 mb-1">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Customer Booking Link (Kiungo cha Wateja)</span>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            Share this link via WhatsApp or Instagram bio so clients can book cuts online.
          </p>
          <div className="mt-2 text-[11px] font-mono text-emerald-400 bg-slate-800/80 px-2.5 py-1 rounded inline-block truncate max-w-full">
            {bookingUrl}
          </div>
        </div>

        <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all whitespace-nowrap min-h-[44px]"
          >
            {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('customerPreview')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-all whitespace-nowrap min-h-[44px]"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Test Customer Page</span>
          </button>
        </div>
      </div>

      {/* Explanatory Notice */}
      <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-600 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <span>
          <strong>Local Storage Notice:</strong> Bookings submitted here are safely stored in this browser session. Multi-device customer synchronization or automatic SMS alerts can be linked via a cloud database backend in production.
        </span>
      </div>

      {/* VIEW 1: Owner Appointments Manager */}
      {activeSubTab === 'manager' && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by customer name, phone, or booking ref (e.g. EZB-4081)..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 min-h-[40px]"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 min-h-[40px]"
              >
                <option value="all">All Statuses (Hali Zote)</option>
                <option value="confirmed">Confirmed</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed (Imekamilika)</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Bookings Container */}
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
            {filteredBookings.length > 0 ? (
              <>
                {/* Mobile Cards View (Visible on phones < md) */}
                <div className="md:hidden divide-y divide-slate-100">
                  {filteredBookings.map((b) => (
                    <div key={b.id} className="p-3.5 space-y-2 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{b.customerName}</span>
                            <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-bold">
                              {b.bookingRef}
                            </span>
                          </div>
                          <div className="text-xs text-emerald-800 font-semibold mt-0.5">
                            {b.serviceName}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            <span>{b.customerPhone}</span>
                            <span className="mx-1">·</span>
                            <span>{b.barberName}</span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="font-extrabold text-slate-900 text-sm tabular-nums">
                            {formatCurrency(b.price)}
                          </div>
                          <span
                            className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                              b.status === 'confirmed'
                                ? 'bg-emerald-50 text-emerald-800'
                                : b.status === 'completed'
                                ? 'bg-slate-100 text-slate-700'
                                : b.status === 'in-progress'
                                ? 'bg-amber-50 text-amber-800'
                                : 'bg-rose-50 text-rose-700'
                            }`}
                          >
                            {b.status === 'completed'
                              ? 'Done'
                              : b.status === 'confirmed'
                              ? 'Confirmed'
                              : b.status}
                          </span>
                        </div>
                      </div>

                      {b.notes && (
                        <div className="text-[11px] text-slate-500 italic bg-slate-50 p-1.5 rounded">
                          {b.notes}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-50">
                        <span>{b.date} at {b.time}</span>
                        <div className="flex items-center gap-1.5">
                          {b.status !== 'completed' && (
                            <button
                              onClick={() => convertBookingToSale(b.id, 'M-Pesa')}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs min-h-[38px]"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Log Sale</span>
                            </button>
                          )}
                          <button
                            onClick={() => deleteBooking(b.id)}
                            className="text-rose-600 hover:text-rose-700 p-2 text-xs"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View (Hidden on phones, visible on md+) */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold">
                      <tr>
                        <th className="py-3 px-4">Ref #</th>
                        <th className="py-3 px-4">Date & Time</th>
                        <th className="py-3 px-4">Customer (Mteja)</th>
                        <th className="py-3 px-4">Service (Huduma)</th>
                        <th className="py-3 px-4">Barber</th>
                        <th className="py-3 px-4 text-right">Price</th>
                        <th className="py-3 px-4 text-center">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-700">
                            {b.bookingRef}
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                            <span className="font-semibold text-slate-900">{b.date}</span>
                            <span className="text-slate-400 ml-1.5">{b.time}</span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{b.customerName}</div>
                            <div className="text-[11px] text-slate-500">{b.customerPhone}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-medium text-slate-800">{b.serviceName}</span>
                            {b.notes && (
                              <div className="text-[10px] text-slate-400 italic truncate max-w-xs">
                                {b.notes}
                              </div>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                            {b.barberName}
                          </td>
                          <td className="py-3 px-4 text-right font-bold text-slate-900 tabular-nums">
                            {formatCurrency(b.price)}
                          </td>
                          <td className="py-3 px-4 text-center whitespace-nowrap">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                b.status === 'confirmed'
                                  ? 'bg-emerald-50 text-emerald-800'
                                  : b.status === 'completed'
                                  ? 'bg-slate-100 text-slate-700'
                                  : b.status === 'in-progress'
                                  ? 'bg-amber-50 text-amber-800'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {b.status === 'completed'
                                ? 'Done (Mauzo)'
                                : b.status === 'confirmed'
                                ? 'Confirmed'
                                : b.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {b.status !== 'completed' && (
                                <button
                                  onClick={() => convertBookingToSale(b.id, 'M-Pesa')}
                                  title="Mark service finished and log to Mauzo (Sales)"
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[11px] font-semibold shadow-xs"
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>Log Sale (Weka Mauzo)</span>
                                </button>
                              )}
                              <button
                                onClick={() => deleteBooking(b.id)}
                                title="Delete appointment"
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
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">No appointments found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                  Share your link with clients or create a test booking using the Customer View preview tab.
                </p>
                <button
                  onClick={() => setActiveSubTab('customerPreview')}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 min-h-[44px]"
                >
                  Book New Appointment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: Customer-Facing Booking Form Preview */}
      {activeSubTab === 'customerPreview' && (
        <div className="max-w-xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
          
          {/* Shop Header */}
          <div className="text-center pb-5 border-b border-slate-100">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md shadow-emerald-200">
              <Scissors className="w-7 h-7 -rotate-45" />
            </div>
            <div className="inline-block text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full mb-1">
              Karibu! Client Booking Portal
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {user?.businessName || 'Ezzy Cuts & Grooming'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Select your service, choose your preferred barber, and pick an appointment time.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleCustomerSubmit} className="space-y-4 text-xs">
            
            {/* Service Selection */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                1. Select Service (Chagua Huduma) *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {services.map((srv) => (
                  <button
                    type="button"
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedServiceId === srv.id
                        ? 'border-emerald-600 bg-emerald-50/80 ring-1 ring-emerald-500'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                    }`}
                  >
                    <div className="font-bold text-slate-900">{srv.name}</div>
                    <div className="flex items-center justify-between mt-1 text-[11px]">
                      <span className="text-slate-500">{srv.durationMinutes} mins</span>
                      <span className="font-bold text-emerald-700 tabular-nums">
                        {formatCurrency(srv.defaultPrice)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Barber Selection */}
            <div>
              <label className="block font-bold text-slate-800 mb-1.5">
                2. Select Preferred Barber (Kinyozi)
              </label>
              <select
                value={selectedBarber}
                onChange={(e) => setSelectedBarber(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Any Barber">Any Available Master Barber</option>
                {staff.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name} ({st.role})
                  </option>
                ))}
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  3. Select Date (Tarehe) *
                </label>
                <input
                  type="date"
                  required
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1.5">
                  Time Slot (Saa) *
                </label>
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
                >
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Details */}
            <div className="pt-2 border-t border-slate-100 space-y-3">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Your Full Name (Jina Lako) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Otieno"
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  M-Pesa Phone Number (Nambari ya Simu) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+254 7XX XXX XXX"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  Special Instructions or Style Request (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Skin taper fade with eucalyptus hot towel shave"
                  value={custNotes}
                  onChange={(e) => setCustNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2 mt-4"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Appointment (Hifadhi Miadi)</span>
            </button>
          </form>

          {/* Booking Confirmation Dialog */}
          {createdBookingConfirmation && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Asante! Booking Confirmed Successfully</span>
              </div>
              <div className="text-slate-700 space-y-1">
                <div>
                  <strong>Booking Ref:</strong>{' '}
                  <span className="font-mono text-emerald-900 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">
                    {createdBookingConfirmation.bookingRef}
                  </span>
                </div>
                <div>
                  <strong>Service:</strong> {createdBookingConfirmation.serviceName} (
                  {formatCurrency(createdBookingConfirmation.price)})
                </div>
                <div>
                  <strong>Date & Time:</strong> {createdBookingConfirmation.date} at{' '}
                  {createdBookingConfirmation.time}
                </div>
                <div>
                  <strong>Barber:</strong> {createdBookingConfirmation.barberName}
                </div>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                This appointment is recorded in your shop's Appointments List. You can switch tabs to view it!
              </p>
              <button
                onClick={() => {
                  setCreatedBookingConfirmation(null);
                  setActiveSubTab('manager');
                }}
                className="w-full py-2 bg-emerald-700 text-white rounded-lg font-semibold text-xs hover:bg-emerald-800 transition-colors mt-2"
              >
                View in Appointments List
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
