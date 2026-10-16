import React from 'react';
import { LayoutDashboard, TrendingUp, Calendar, Sparkles, Plus, Receipt } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuickSale: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenQuickSale,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg px-2 py-1 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Dashboard */}
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] min-h-[48px] rounded-lg transition-colors ${
            activeTab === 'dashboard'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        {/* Sales (Mauzo) */}
        <button
          onClick={() => setActiveTab('sales')}
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] min-h-[48px] rounded-lg transition-colors ${
            activeTab === 'sales'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Mauzo</span>
        </button>

        {/* Center Quick Action: Record Sale Button */}
        <button
          onClick={onOpenQuickSale}
          className="flex flex-col items-center justify-center -mt-4 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-full w-12 h-12 shadow-md shadow-emerald-600/30 active:scale-95 transition-transform"
          aria-label="Record Sale"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* Bookings (Miadi) */}
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] min-h-[48px] rounded-lg transition-colors ${
            activeTab === 'bookings'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Miadi</span>
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => setActiveTab('aiAdvisor')}
          className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] min-h-[48px] rounded-lg transition-colors ${
            activeTab === 'aiAdvisor'
              ? 'text-emerald-700 font-bold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="text-[10px] mt-0.5">AI Advisor</span>
        </button>

      </div>
    </nav>
  );
};
