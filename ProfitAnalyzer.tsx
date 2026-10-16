import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TimeFilterBar } from './TimeFilterBar';
import {
  TrendingUp,
  Percent,
  DollarSign,
  Award,
  Sparkles,
  ArrowUpRight,
  Info,
  Calculator,
  Sliders,
  Scissors,
  CheckCircle,
} from 'lucide-react';

export const ProfitAnalyzer: React.FC = () => {
  const { serviceProfitability, formatCurrency, services } = useApp();
  const [sortBy, setSortBy] = useState<'profit' | 'margin' | 'volume'>('profit');

  // Interactive Repricing Simulator State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || '');
  const [priceAdjustment, setPriceAdjustment] = useState<number>(100);

  const sortedList = [...serviceProfitability].sort((a, b) => {
    if (sortBy === 'profit') return b.netProfit - a.netProfit;
    if (sortBy === 'margin') return b.marginPercent - a.marginPercent;
    return b.count - a.count;
  });

  const topProfitService = serviceProfitability[0];
  const highestMarginService = [...serviceProfitability].sort((a, b) => b.marginPercent - a.marginPercent)[0];
  const mostPopularService = [...serviceProfitability].sort((a, b) => b.count - a.count)[0];

  // Simulation calculations
  const simService = services.find((s) => s.id === selectedServiceId) || services[0];
  const currentSalesCount = serviceProfitability.find((s) => s.name === simService?.name)?.count || 12;
  const simulatedMonthlyExtra = currentSalesCount * 4 * priceAdjustment;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900">Service Profitability Analyzer (Uchambuzi wa Faida)</h2>
        <p className="text-xs text-slate-500">
          Compare which haircuts and treatments make the most profit (faida) after direct costs (blades, balms, dye & towels)
        </p>
      </div>

      <TimeFilterBar />

      {/* 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Most Profitable Service */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 mb-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Highest Net Profit Earner</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {topProfitService ? topProfitService.name : 'VIP King Grooming'}
          </h3>
          <div className="mt-2 text-xs text-slate-600">
            Generated{' '}
            <span className="font-bold text-slate-900 tabular-nums">
              {topProfitService ? formatCurrency(topProfitService.netProfit) : 'KSh 0'}
            </span>{' '}
            in net profit
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {topProfitService?.count || 0} clients served this period
          </div>
        </div>

        {/* Highest Margin Service */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 mb-1">
            <Percent className="w-4 h-4 text-teal-600" />
            <span>Highest Profit Margin %</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {highestMarginService ? highestMarginService.name : 'Classic Fade'}
          </h3>
          <div className="mt-2 text-xs text-slate-600">
            Keeps{' '}
            <span className="font-bold text-emerald-700 tabular-nums">
              {highestMarginService ? highestMarginService.marginPercent.toFixed(1) : 0}%
            </span>{' '}
            of each sale as profit
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Very low consumable cost per client
          </div>
        </div>

        {/* Most Frequent / Traffic Builder */}
        <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 mb-1">
            <TrendingUp className="w-4 h-4 text-amber-600" />
            <span>Most In-Demand Service</span>
          </div>
          <h3 className="text-base font-bold text-slate-900">
            {mostPopularService ? mostPopularService.name : 'Fade Haircut'}
          </h3>
          <div className="mt-2 text-xs text-slate-600">
            Chosen by{' '}
            <span className="font-bold text-slate-900 tabular-nums">
              {mostPopularService?.count || 0} clients
            </span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            Primary driver of foot traffic into the shop
          </div>
        </div>
      </div>

      {/* Interactive Service Repricing Simulator */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md border border-slate-700/60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Interactive Price & Profit Simulator</h3>
              <p className="text-xs text-slate-300">
                See how a small price adjustment impacts your monthly barbershop profit
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block text-xs font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
            EzzyBIZZ Strategy
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Service Selector */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Select Service to Test:
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Current: {formatCurrency(s.defaultPrice)})
                </option>
              ))}
            </select>
          </div>

          {/* Price Increase Slider */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5">
              <span>Price Adjustment:</span>
              <span className="font-bold text-emerald-400 tabular-nums">
                +{formatCurrency(priceAdjustment)}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="500"
              step="50"
              value={priceAdjustment}
              onChange={(e) => setPriceAdjustment(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>+KSh 50</span>
              <span>+KSh 250</span>
              <span>+KSh 500</span>
            </div>
          </div>

          {/* Outcome Projection */}
          <div className="bg-slate-800/90 rounded-xl p-3.5 border border-emerald-500/20 flex flex-col justify-center">
            <span className="text-[11px] text-slate-300">Projected Extra Monthly Profit:</span>
            <div className="text-xl font-extrabold text-emerald-400 tabular-nums mt-0.5">
              +{formatCurrency(simulatedMonthlyExtra)} / month
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Based on serving ~{currentSalesCount * 4} clients/month without losing volume.
            </p>
          </div>
        </div>
      </div>

      {/* Service Profitability Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Service Performance Matrix</h3>
            <p className="text-xs text-slate-500">
              Detailed breakdown of revenues, direct supply costs, and net margins
            </p>
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg overflow-x-auto scrollbar-none w-full sm:w-auto">
            <button
              onClick={() => setSortBy('profit')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap min-h-[36px] ${
                sortBy === 'profit' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              Most Profit (KSh)
            </button>
            <button
              onClick={() => setSortBy('margin')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap min-h-[36px] ${
                sortBy === 'margin' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              Highest Margin %
            </button>
            <button
              onClick={() => setSortBy('volume')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap min-h-[36px] ${
                sortBy === 'volume' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
              }`}
            >
              Most Popular
            </button>
          </div>
        </div>

        {sortedList.length > 0 ? (
          <>
            {/* Mobile Service Cards (< md screens) */}
            <div className="md:hidden divide-y divide-slate-100">
              {sortedList.map((srv, idx) => (
                <div key={srv.serviceId} className="p-4 space-y-2.5 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <span className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-800 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        #{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-sm truncate">{srv.name}</div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          <span>{srv.category}</span>
                          <span className="mx-1">·</span>
                          <span className="font-semibold text-slate-700">{srv.count} clients</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-extrabold text-emerald-700 text-sm tabular-nums">
                        {formatCurrency(srv.netProfit)}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Profit ({srv.marginPercent.toFixed(0)}%)
                      </div>
                    </div>
                  </div>

                  {/* Profit Margin Visual Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Avg Price: {formatCurrency(srv.avgTicket)}</span>
                      <span>Total Sales: {formatCurrency(srv.totalRevenue)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${Math.min(100, Math.max(5, srv.marginPercent))}%` }}
                        className={`h-full rounded-full ${
                          srv.marginPercent >= 80
                            ? 'bg-emerald-500'
                            : srv.marginPercent >= 60
                            ? 'bg-teal-500'
                            : 'bg-amber-500'
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table (md+ screens) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-4">Rank</th>
                    <th className="py-3 px-4">Service Name</th>
                    <th className="py-3 px-4 text-center">Clients</th>
                    <th className="py-3 px-4 text-right">Avg Price</th>
                    <th className="py-3 px-4 text-right">Direct Cost</th>
                    <th className="py-3 px-4 text-right">Total Revenue</th>
                    <th className="py-3 px-4 text-right">Net Profit</th>
                    <th className="py-3 px-4">Profit Margin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sortedList.map((srv, idx) => (
                    <tr key={srv.serviceId} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-500">#{idx + 1}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{srv.name}</div>
                        <div className="text-[11px] text-slate-400">{srv.category}</div>
                      </td>
                      <td className="py-3 px-4 text-center font-medium text-slate-700 tabular-nums">
                        {srv.count}
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-slate-800 tabular-nums">
                        {formatCurrency(srv.avgTicket)}
                      </td>
                      <td className="py-3 px-4 text-right text-slate-500 tabular-nums">
                        {formatCurrency(srv.totalDirectCost / (srv.count || 1))} / cut
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-slate-900 tabular-nums">
                        {formatCurrency(srv.totalRevenue)}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-700 tabular-nums">
                        {formatCurrency(srv.netProfit)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 sm:w-28 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, Math.max(5, srv.marginPercent))}%` }}
                              className={`h-full rounded-full ${
                                srv.marginPercent >= 80
                                  ? 'bg-emerald-500'
                                  : srv.marginPercent >= 60
                                  ? 'bg-teal-500'
                                  : 'bg-amber-500'
                              }`}
                            />
                          </div>
                          <span className="font-bold text-slate-900 tabular-nums">
                            {srv.marginPercent.toFixed(0)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="py-10 text-center text-xs text-slate-500">
            No sales data available to analyze for this timeframe.
          </div>
        )}
      </div>
    </div>
  );
};
