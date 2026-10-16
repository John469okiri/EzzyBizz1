import React from 'react';
import { useApp } from '../context/AppContext';
import { TimeFilterBar } from './TimeFilterBar';
import {
  TrendingUp,
  DollarSign,
  Receipt,
  Percent,
  Users,
  Lightbulb,
  ArrowUpRight,
  Plus,
  Scissors,
  CheckCircle2,
  Sparkles,
  Smartphone,
  ChevronRight,
} from 'lucide-react';

interface DashboardOverviewProps {
  onOpenQuickSale: () => void;
  onOpenQuickExpense: () => void;
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onOpenQuickSale,
  onOpenQuickExpense,
  onNavigateTab,
}) => {
  const {
    user,
    metrics,
    serviceProfitability,
    paymentBreakdown,
    staffBreakdown,
    filteredSales,
    filteredExpenses,
    formatCurrency,
    timeFilter,
  } = useApp();

  // Top 4 services by revenue
  const topServices = serviceProfitability.slice(0, 4);

  // Generate dynamic smart insights based on real user numbers
  const topService = serviceProfitability[0];
  const mpesaShare = paymentBreakdown.find((p) => p.method === 'M-Pesa')?.percent || 0;
  const isHealthyMargin = metrics.profitMargin >= 50;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white rounded-2xl p-3.5 sm:p-6 lg:p-8 shadow-md">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-2xl overflow-hidden ring-2 ring-emerald-400/30 shrink-0 bg-slate-800">
              <img
                src="/src/assets/images/barber_owner_portrait_1792148127194.jpg"
                alt="Business Owner"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-emerald-300">
                <span>Karibu! EzzyBIZZ</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">Nairobi, Kenya</span>
              </div>
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white mt-0.5 truncate">
                {user?.businessName || 'Ezzy Cuts & Grooming'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 sm:mt-1 max-w-xl line-clamp-2 sm:line-clamp-none">
                Track your barbershop daily sales (mauzo), control supply expenses (matumizi), and see your exact net profit (faida).
              </p>
            </div>
          </div>

          {/* Action buttons: 2-col grid on phone, inline on desktop, all with touch targets >= 44px */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5">
            <button
              onClick={() => onNavigateTab('aiAdvisor')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl font-semibold text-xs transition-all whitespace-nowrap min-h-[44px]"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>AI Assistant</span>
            </button>
            <button
              onClick={() => onNavigateTab('bookings')}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-xs transition-all whitespace-nowrap min-h-[44px]"
            >
              <span>Bookings (Miadi)</span>
            </button>
            <button
              onClick={onOpenQuickSale}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-xl font-semibold text-xs shadow-sm transition-all whitespace-nowrap min-h-[44px]"
            >
              <Plus className="w-4 h-4" />
              <span>Sale (Mauzo)</span>
            </button>
            <button
              onClick={onOpenQuickExpense}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl font-medium text-xs transition-all whitespace-nowrap min-h-[44px]"
            >
              <Receipt className="w-4 h-4 text-rose-400" />
              <span>Expense</span>
            </button>
          </div>
        </div>

        {/* Local Storage notification banner inside card */}
        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>Local Storage Active: All records saved on this device. Ready for offline use.</span>
          </div>
          <span className="text-slate-400 font-mono">Currency: KSh</span>
        </div>
      </div>

      {/* Time filter selector */}
      <TimeFilterBar />

      {/* 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Gross Revenue */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Gross Sales (Mauzo)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tabular-nums">
              {formatCurrency(metrics.revenue)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span>{metrics.transactionsCount} wateja (clients)</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">Avg {formatCurrency(metrics.avgSpendPerClient)}</span>
            </div>
          </div>
        </div>

        {/* Total Expenses */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Total Expenses (Matumizi)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tabular-nums">
              {formatCurrency(metrics.expenses)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span>{filteredExpenses.length} expense entries</span>
              <span aria-hidden="true">·</span>
              <span>
                {metrics.revenue > 0
                  ? `${Math.round((metrics.expenses / metrics.revenue) * 100)}% of sales`
                  : '0%'}
              </span>
            </div>
          </div>
        </div>

        {/* Estimated Net Profit */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Net Profit (Faida Halisi)</span>
            <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div
              className={`text-2xl font-bold tabular-nums ${
                metrics.netProfit >= 0 ? 'text-emerald-700' : 'text-rose-600'
              }`}
            >
              {formatCurrency(metrics.netProfit)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
              <span>Take-home cash</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-700 font-medium">After all bills</span>
            </div>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-700">Profit Margin (Faida %)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 tabular-nums">
              {metrics.profitMargin.toFixed(1)}%
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs">
              <span
                className={`font-semibold ${
                  isHealthyMargin ? 'text-emerald-700' : 'text-amber-600'
                }`}
              >
                {isHealthyMargin ? 'Healthy Margin' : 'Tight Margin'}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500">Target: 40-60%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Cashflow Breakdown Progress Bar */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Cashflow & Profit Allocation</h3>
            <p className="text-xs text-slate-500">
              Visual comparison of revenue retained as profit vs operating expenses
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
              <span>Net Profit ({metrics.profitMargin.toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-rose-400 inline-block" />
              <span>Expenses ({(100 - metrics.profitMargin).toFixed(0)}%)</span>
            </div>
          </div>
        </div>

        {metrics.revenue > 0 ? (
          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${Math.max(5, Math.min(100, metrics.profitMargin))}%` }}
              className="bg-emerald-500 transition-all duration-500"
              title={`Net Profit: ${formatCurrency(metrics.netProfit)}`}
            />
            <div
              style={{ width: `${Math.max(0, 100 - metrics.profitMargin)}%` }}
              className="bg-rose-400 transition-all duration-500"
              title={`Expenses: ${formatCurrency(metrics.expenses)}`}
            />
          </div>
        ) : (
          <div className="w-full h-4 bg-slate-100 rounded-full text-center text-[10px] text-slate-400 leading-4">
            No sales logged for this period
          </div>
        )}
      </div>

      {/* AI-Style Business Insights & Advice Section */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-white">EzzyBIZZ Smart Business Insights</h2>
          </div>
          <span className="text-xs text-slate-400">Automated Financial Analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Insight 1: Service Profit Margin */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1.5">
              <Scissors className="w-3.5 h-3.5" />
              <span>Highest Yield Service</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {topService ? topService.name : 'VIP Grooming'}
            </p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {topService
                ? `Yields ${topService.marginPercent.toFixed(0)}% profit margin. Suggest pairing this with beard oil retail to boost your average ticket.`
                : 'Offer combo packages with hair treatment to maximize your barbershop profits.'}
            </p>
          </div>

          {/* Insight 2: Payment Methods */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-teal-400 mb-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              <span>M-Pesa Collections</span>
            </div>
            <p className="text-sm font-semibold text-white">
              {mpesaShare}% of Collections
            </p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              M-Pesa is your customers' favorite payment method. Keep your Buy Goods Till number printed clearly on every barber mirror.
            </p>
          </div>

          {/* Insight 3: Cost Control */}
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Expense Tip</span>
            </div>
            <p className="text-sm font-semibold text-white">Bulk Buying Blades</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Purchasing Dorco blades and Barbicide sanitizer in cartons saves up to 25% compared to daily retail kiosk purchases.
            </p>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Top Services vs Payment & Staff Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Services Leaderboard */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Top Services (Huduma Bora)</h3>
                <p className="text-xs text-slate-500">Ranked by total sales (mauzo) generated</p>
              </div>
              <button
                onClick={() => onNavigateTab('profit')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>Full Analysis</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100 mt-2">
              {topServices.map((service, idx) => (
                <div key={service.name} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {service.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{service.count} clients</span>
                        <span aria-hidden="true">·</span>
                        <span className="text-emerald-700 font-medium">
                          {service.marginPercent.toFixed(0)}% margin
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-slate-900 tabular-nums">
                      {formatCurrency(service.totalRevenue)}
                    </p>
                    <p className="text-xs text-slate-500 tabular-nums">
                      Profit: {formatCurrency(service.netProfit)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onNavigateTab('profit')}
              className="w-full py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-lg text-center transition-colors"
            >
              Compare All Service Profit Margins →
            </button>
          </div>
        </div>

        {/* Payment Methods & Staff Performance */}
        <div className="space-y-6">
          
          {/* Payment Methods Split */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">Payment Breakdown</h3>
            <p className="text-xs text-slate-500 mb-3">Where your money comes in</p>

            <div className="space-y-2.5">
              {paymentBreakdown.map((pm) => (
                <div key={pm.method} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">{pm.method}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 tabular-nums">
                        {formatCurrency(pm.total)}
                      </span>
                      <span className="text-slate-400">({pm.percent}%)</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${pm.percent}%` }}
                      className={`h-full rounded-full ${
                        pm.method === 'M-Pesa'
                          ? 'bg-emerald-600'
                          : pm.method === 'Cash'
                          ? 'bg-amber-500'
                          : 'bg-teal-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Staff Roster Performance */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Barber & Stylist Sales</h3>
                <p className="text-xs text-slate-500">Service production by team member</p>
              </div>
              <button
                onClick={() => onNavigateTab('settings')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Manage Staff
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {staffBreakdown.slice(0, 3).map((st) => (
                <div key={st.name} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-900">{st.name}</span>
                    <div className="text-slate-500 mt-0.5">{st.cutsCount} services handled</div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-slate-900 tabular-nums">
                      {formatCurrency(st.totalSales)}
                    </span>
                    <div className="text-slate-500 tabular-nums">
                      Comm: ~{formatCurrency(st.estimatedCommission)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
