import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Scissors,
  Plus,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  TrendingUp,
  Receipt,
  Percent,
  Calendar,
  Sparkles,
  FileText,
  Settings,
  LayoutDashboard,
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickSale: () => void;
  onOpenAuthModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickSale,
  onOpenAuthModal,
}) => {
  const { user, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'sales', label: 'Sales (Mauzo)', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'expenses', label: 'Expenses (Matumizi)', icon: <Receipt className="w-4 h-4" /> },
    { id: 'profit', label: 'Profit (Faida)', icon: <Percent className="w-4 h-4" /> },
    { id: 'bookings', label: 'Bookings (Miadi)', icon: <Calendar className="w-4 h-4" /> },
    { id: 'aiAdvisor', label: 'AI Assistant', icon: <Sparkles className="w-4 h-4 text-emerald-600" /> },
    { id: 'notes', label: 'Daily Notes', icon: <FileText className="w-4 h-4" /> },
    { id: 'settings', label: 'Shop Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-6 h-16">
          
          {/* Zone 1: Single text element brand mark */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile menu hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 min-h-[44px] min-w-[44px] flex items-center justify-center -ml-1"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => handleSelectTab('dashboard')}
              className="flex items-center gap-2 text-left focus:outline-none group min-h-[44px]"
            >
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Scissors className="w-4.5 h-4.5 sm:w-5 sm:h-5 -rotate-45" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  EzzyBIZZ
                </span>
                <span className="hidden lg:inline-block text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Barber Edition
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSelectTab(link.id)}
                className={`px-2.5 lg:px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeTab === link.id
                    ? 'text-emerald-800 bg-emerald-50/90 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Actions & Quick Entry */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Quick Record Sale Button */}
            <button
              onClick={onOpenQuickSale}
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-sm shadow-emerald-600/20 transition-all whitespace-nowrap min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Record Sale</span>
              <span className="xs:hidden">Sale</span>
            </button>

            {/* User Profile / Account Switch */}
            {user ? (
              <div className="flex items-center gap-1 sm:gap-1.5 pl-1 sm:pl-2 border-l border-slate-200">
                <button
                  onClick={() => handleSelectTab('settings')}
                  title={`Account: ${user.name} (${user.businessName})`}
                  className="flex items-center gap-2 p-1 text-xs text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors min-h-[44px]"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden xl:inline text-xs font-medium text-slate-700 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </button>
                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors whitespace-nowrap min-h-[44px]"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Slide-Down Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 px-1 border-t border-slate-100 bg-white space-y-1 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-1.5 pb-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleSelectTab(link.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-colors min-h-[44px] ${
                    activeTab === link.id
                      ? 'bg-emerald-50 text-emerald-800 font-bold border border-emerald-200'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  {link.icon}
                  <span className="truncate">{link.label}</span>
                </button>
              ))}
            </div>

            {/* Quick account action inside mobile drawer */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs px-2">
              <span className="text-slate-500 truncate max-w-[200px]">
                {user ? user.businessName : 'Not signed in'}
              </span>
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="text-rose-600 font-semibold hover:underline flex items-center gap-1 py-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onOpenAuthModal();
                    setMobileMenuOpen(false);
                  }}
                  className="text-emerald-700 font-semibold hover:underline flex items-center gap-1 py-1"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Horizontal scroll pill strip for quick mobile thumb swiping (when drawer closed) */}
        {!mobileMenuOpen && (
          <div className="md:hidden flex items-center gap-1.5 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none text-xs -mx-3 px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleSelectTab(link.id)}
                className={`px-3 py-2 rounded-lg whitespace-nowrap shrink-0 font-medium min-h-[38px] flex items-center gap-1.5 transition-colors ${
                  activeTab === link.id
                    ? 'bg-emerald-600 text-white font-semibold shadow-xs'
                    : 'text-slate-700 bg-slate-50 border border-slate-200/60 hover:bg-slate-100'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};
