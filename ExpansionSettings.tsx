import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Store,
  Scissors,
  Users,
  DollarSign,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Save,
  Download,
  AlertTriangle,
  Sparkles,
  Layers,
} from 'lucide-react';
import { BusinessType, ServiceItem, StaffMember } from '../types';

export const ExpansionSettings: React.FC = () => {
  const {
    user,
    updateUser,
    services,
    addService,
    updateService,
    staff,
    addStaff,
    updateStaff,
    resetDemoData,
    formatCurrency,
  } = useApp();

  const [businessName, setBusinessName] = useState(user?.businessName || 'Ezzy Cuts & Grooming');
  const [businessType, setBusinessType] = useState<BusinessType>(user?.businessType || 'barbershop');
  const [currency, setCurrency] = useState(user?.currency || 'KSh');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // New Service Form
  const [showAddService, setShowAddService] = useState(false);
  const [srvName, setSrvName] = useState('');
  const [srvCategory, setSrvCategory] = useState<ServiceItem['category']>('Barbering');
  const [srvPrice, setSrvPrice] = useState(500);
  const [srvCost, setSrvCost] = useState(50);

  // New Staff Form
  const [showAddStaff, setShowAddStaff] = useState(false);
  const [staffName, setStaffName] = useState('');
  const [staffRole, setStaffRole] = useState('Barber');
  const [staffComm, setStaffComm] = useState(30);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      businessName,
      businessType,
      currency,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srvName.trim()) return;
    addService({
      name: srvName.trim(),
      category: srvCategory,
      defaultPrice: Number(srvPrice),
      estimatedDirectCost: Number(srvCost),
      durationMinutes: 30,
      active: true,
    });
    setSrvName('');
    setShowAddService(false);
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffName.trim()) return;
    addStaff({
      name: staffName.trim(),
      role: staffRole,
      commissionRate: Number(staffComm) / 100,
      active: true,
    });
    setStaffName('');
    setShowAddStaff(false);
  };

  const handleExportBackup = () => {
    const backupData = {
      user,
      services,
      staff,
      timestamp: new Date().toISOString(),
      appName: 'EzzyBIZZ',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `EzzyBIZZ-Backup-${new Date().toISOString().split('T')[0]}.json`);
    dlAnchor.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Shop Profile & Service Expansion</h2>
        <p className="text-xs text-slate-500">
          Configure your business profile, customize service pricing, manage staff, or expand to salon & spa services
        </p>
      </div>

      {/* Business Profile Form */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-100">
          <Store className="w-4 h-4 text-emerald-600" />
          <h3 className="text-sm font-bold text-slate-900">General Business Info</h3>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Shop Name
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. Ezzy Cuts Grooming Lounge"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700"
              >
                <option value="barbershop">Barbershop (Gentlemen Grooming)</option>
                <option value="salon">Hair Salon & Blowdry</option>
                <option value="nails">Nail Bar & Manicure/Pedicure</option>
                <option value="spa">Day Spa & Massage</option>
                <option value="combo">Combo (Barber, Salon & Spa)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-700 font-mono"
              >
                <option value="KSh">KSh (Kenyan Shilling)</option>
                <option value="USD">USD ($)</option>
                <option value="UGX">UGX (Ugandan Shilling)</option>
                <option value="TZS">TZS (Tanzanian Shilling)</option>
                <option value="RWF">RWF (Rwandan Franc)</option>
                <option value="ZAR">ZAR (South African Rand)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate-500">
              {savedSuccess ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Saved successfully to browser storage!
                </span>
              ) : (
                'Settings automatically apply across all reports and sales.'
              )}
            </span>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes (Hifadhi)</span>
            </button>
          </div>
        </form>
      </div>

      {/* Services & Treatment Menu */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Service Menu & Direct Costs</h3>
              <p className="text-xs text-slate-500">
                Define the prices and consumable cost per service (blades, oils, creams)
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddService(!showAddService)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Service</span>
          </button>
        </div>

        {showAddService && (
          <form
            onSubmit={handleCreateService}
            className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs"
          >
            <div>
              <label className="block font-medium text-slate-700 mb-1">Service Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Deluxe Beard Facial"
                value={srvName}
                onChange={(e) => setSrvName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Category</label>
              <select
                value={srvCategory}
                onChange={(e) => setSrvCategory(e.target.value as ServiceItem['category'])}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
              >
                <option value="Barbering">Barbering</option>
                <option value="Beard & Shave">Beard & Shave</option>
                <option value="Hair Care">Hair Care</option>
                <option value="Coloring">Coloring</option>
                <option value="Spa & Nails">Spa & Nails</option>
                <option value="VIP Packages">VIP Packages</option>
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Price (KSh)</label>
              <input
                type="number"
                min="0"
                step="50"
                value={srvPrice}
                onChange={(e) => setSrvPrice(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-mono"
              />
            </div>
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label className="block font-medium text-slate-700 mb-1">Direct Cost (KSh)</label>
                <input
                  type="number"
                  min="0"
                  step="10"
                  value={srvCost}
                  onChange={(e) => setSrvCost(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-3 py-1.5 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700"
              >
                Save
              </button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100 text-xs">
          {services.map((srv) => (
            <div key={srv.id} className="py-2.5 flex items-center justify-between gap-4">
              <div>
                <span className="font-semibold text-slate-900">{srv.name}</span>
                <span className="text-slate-400 ml-2">({srv.category})</span>
              </div>
              <div className="flex items-center gap-6 tabular-nums">
                <span className="text-slate-500">
                  Est. Cost: {formatCurrency(srv.estimatedDirectCost)}
                </span>
                <span className="font-bold text-slate-900">
                  Price: {formatCurrency(srv.defaultPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff & Commission Setup */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-600" />
            <div>
              <h3 className="text-sm font-bold text-slate-900">Barbers & Stylists Roster</h3>
              <p className="text-xs text-slate-500">Manage shop staff members and commission percentages</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddStaff(!showAddStaff)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Barber</span>
          </button>
        </div>

        {showAddStaff && (
          <form
            onSubmit={handleCreateStaff}
            className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80 grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs"
          >
            <div>
              <label className="block font-medium text-slate-700 mb-1">Barber Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Dennis (Stylist)"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Role</label>
              <input
                type="text"
                placeholder="Master Barber, Stylist"
                value={staffRole}
                onChange={(e) => setStaffRole(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Commission %</label>
              <input
                type="number"
                min="0"
                max="100"
                value={staffComm}
                onChange={(e) => setStaffComm(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-md font-mono"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-1.5 bg-emerald-600 text-white rounded-md font-semibold hover:bg-emerald-700"
              >
                Add Member
              </button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-100 text-xs">
          {staff.map((st) => (
            <div key={st.id} className="py-2.5 flex items-center justify-between gap-4">
              <div>
                <span className="font-semibold text-slate-900">{st.name}</span>
                <span className="text-slate-400 ml-2">· {st.role}</span>
              </div>
              <div className="font-medium text-slate-700 tabular-nums">
                {Math.round(st.commissionRate * 100)}% Commission
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Starter Records & Backup */}
      <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-900">Starter Records & Shop Backup</h4>
          <p className="text-xs text-slate-500">
            Reset records back to clean initial starter data, or export your full shop data
          </p>
        </div>

        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleExportBackup}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap min-h-[44px]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Backup</span>
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all sales, expenses, and notes back to the original EzzyBIZZ barbershop records?')) {
                resetDemoData();
              }
            }}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition-colors whitespace-nowrap min-h-[44px]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Starter Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
