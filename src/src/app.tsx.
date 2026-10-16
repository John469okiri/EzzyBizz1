import React, { useState, useEffect } from 'react';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { DashboardOverview } from './components/DashboardOverview';
import { SalesTracker } from './components/SalesTracker';
import { ExpensesTracker } from './components/ExpensesTracker';
import { ProfitAnalyzer } from './components/ProfitAnalyzer';
import { CustomerBookings } from './components/CustomerBookings';
import { AIBusinessAssistant } from './components/AIBusinessAssistant';
import { BusinessNotes } from './components/BusinessNotes';
import { ExpansionSettings } from './components/ExpansionSettings';
import { QuickSaleModal } from './components/QuickSaleModal';
import { QuickExpenseModal } from './components/QuickExpenseModal';
import { AuthModal } from './components/AuthModal';

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>(() => {
    // If opened with booking query param, open Customer Booking view directly
    if (typeof window !== 'undefined' && window.location.search.includes('booking')) {
      return 'bookings';
    }
    return 'dashboard';
  });

  const [showQuickSale, setShowQuickSale] = useState(false);
  const [showQuickExpense, setShowQuickExpense] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 flex flex-col selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickSale={() => setShowQuickSale(true)}
        onOpenAuthModal={() => setShowAuthModal(true)}
      />

      {/* Main Content Area with bottom padding for mobile navigation */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-28 md:pb-8">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            onOpenQuickSale={() => setShowQuickSale(true)}
            onOpenQuickExpense={() => setShowQuickExpense(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'sales' && (
          <SalesTracker onOpenQuickSale={() => setShowQuickSale(true)} />
        )}

        {activeTab === 'expenses' && (
          <ExpensesTracker onOpenQuickExpense={() => setShowQuickExpense(true)} />
        )}

        {activeTab === 'profit' && <ProfitAnalyzer />}

        {activeTab === 'bookings' && <CustomerBookings />}

        {activeTab === 'aiAdvisor' && <AIBusinessAssistant />}

        {activeTab === 'notes' && <BusinessNotes />}

        {activeTab === 'settings' && <ExpansionSettings />}
      </main>

      {/* Mobile Ergonomic Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickSale={() => setShowQuickSale(true)}
      />

      {/* Global Modals */}
      <QuickSaleModal
        isOpen={showQuickSale}
        onClose={() => setShowQuickSale(false)}
      />

      <QuickExpenseModal
        isOpen={showQuickExpense}
        onClose={() => setShowQuickExpense(false)}
      />

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />

      {/* Quiet Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 pb-28 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="font-bold text-slate-800">EzzyBIZZ</span>
            <span>·</span>
            <span>Karibu — Simple Barber & Beauty Business Assistant</span>
            <span>·</span>
            <span className="font-mono text-emerald-700">KSh Native</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span>Static Netlify Ready</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
