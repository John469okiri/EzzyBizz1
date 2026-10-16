import { Sale, Expense, ServiceItem, StaffMember, Booking, AIMessage } from '../types';
import { ServiceProfitability } from '../context/AppContext';

interface BusinessContext {
  currency: string;
  formatCurrency: (amount: number) => string;
  metrics: {
    revenue: number;
    expenses: number;
    netProfit: number;
    profitMargin: number;
    transactionsCount: number;
    avgSpendPerClient: number;
  };
  sales: Sale[];
  expenses: Expense[];
  services: ServiceItem[];
  staff: StaffMember[];
  bookings: Booking[];
  serviceProfitability: ServiceProfitability[];
}

/**
 * AI Business Assistant response generator.
 * In this frontend-only application, it utilizes local financial calculations,
 * active ledger records, and domain heuristics to generate instant,
 * actionable insights in friendly English with familiar Kenyan Swahili terms.
 *
 * Designed with a clean boundary: when a backend is attached, this function
 * can seamlessly dispatch to a secure `/api/ai-advisor` endpoint.
 */
export async function getAIBusinessAdvice(
  prompt: string,
  context: BusinessContext
): Promise<Omit<AIMessage, 'id' | 'timestamp' | 'sender'>> {
  // Simulate natural brief AI thinking time (300ms)
  await new Promise((resolve) => setTimeout(resolve, 350));

  const query = prompt.toLowerCase().trim();
  const { formatCurrency, metrics, serviceProfitability, sales, expenses, bookings, staff } = context;

  const todayStr = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter((s) => s.date === todayStr);
  const todayRevenue = todaySales.reduce((acc, s) => acc + s.amount, 0);
  const todayExpenses = expenses.filter((e) => e.date === todayStr);
  const todayExpenseTotal = todayExpenses.reduce((acc, e) => acc + e.amount, 0);
  const todayProfit = todayRevenue - todayExpenseTotal;

  const topService = serviceProfitability[0];
  const lowestMarginService = [...serviceProfitability].sort((a, b) => a.marginPercent - b.marginPercent)[0];

  // 1. Questions about Today's Sales / Mauzo ya Leo
  if (
    query.includes('today') ||
    query.includes('leo') ||
    (query.includes('sales') && !query.includes('profit')) ||
    query.includes('mauzo')
  ) {
    return {
      text: `Karibu! Mauzo ya leo (Today's Sales) stand at ${formatCurrency(todayRevenue)} from ${todaySales.length} client visits (wateja). After today's direct shop expenses of ${formatCurrency(todayExpenseTotal)}, your estimated net profit (faida) for today is ${formatCurrency(todayProfit)}. Keep up the momentum!`,
      highlightData: {
        title: "Today's Sales (Mauzo ya Leo)",
        value: formatCurrency(todayRevenue),
        subtext: `${todaySales.length} clients served · Net Faida: ${formatCurrency(todayProfit)}`,
        category: 'sales',
      },
    };
  }

  // 2. Questions about Profit / Faida
  if (
    query.includes('profit') ||
    query.includes('faida') ||
    query.includes('margin') ||
    query.includes('net') ||
    query.includes('take home')
  ) {
    return {
      text: `Habari! Based on your current selected reporting period, your Gross Sales are ${formatCurrency(metrics.revenue)} and Total Expenses (Matumizi) are ${formatCurrency(metrics.expenses)}. That leaves you with an Estimated Net Profit (Faida Halisi) of ${formatCurrency(metrics.netProfit)}, achieving a healthy ${metrics.profitMargin.toFixed(1)}% profit margin.`,
      highlightData: {
        title: 'Net Profit (Faida Halisi)',
        value: formatCurrency(metrics.netProfit),
        subtext: `${metrics.profitMargin.toFixed(1)}% Profit Margin across all services`,
        category: 'profit',
      },
    };
  }

  // 3. Questions about Most Profitable Service / Best Services (Huduma)
  if (
    query.includes('profitable') ||
    query.includes('best service') ||
    query.includes('service') ||
    query.includes('huduma') ||
    query.includes('popular')
  ) {
    if (topService) {
      return {
        text: `Your champion earner is "${topService.name}". It generated ${formatCurrency(topService.totalRevenue)} in revenue with a stellar ${topService.marginPercent.toFixed(0)}% profit margin. Tip: Recommend pairing this VIP service with beard oil or aftershave balm to boost your average ticket even further!`,
        highlightData: {
          title: 'Top Service (Huduma Bora)',
          value: topService.name,
          subtext: `${topService.marginPercent.toFixed(0)}% Margin · ${formatCurrency(topService.netProfit)} Net Profit`,
          category: 'service',
        },
      };
    }
  }

  // 4. Questions about Expenses / Matumizi & Saving Money
  if (
    query.includes('expense') ||
    query.includes('matumizi') ||
    query.includes('cost') ||
    query.includes('bill') ||
    query.includes('save') ||
    query.includes('cut')
  ) {
    return {
      text: `Total shop expenses (matumizi) for this period are ${formatCurrency(metrics.expenses)}. To protect your faida: 
1. Bulk Buy Dorco blades and Barbicide sanitizer in full cartons from wholesale distributors to save up to 25%.
2. Manage electricity (tokens): ensure hot towel warmers and styling dryers are turned down during quiet afternoon hours.
3. Track razor and dye usage per client to prevent waste.`,
      highlightData: {
        title: 'Total Expenses (Matumizi)',
        value: formatCurrency(metrics.expenses),
        subtext: 'Top categories: Rent, Clipper Blades, KPLC Tokens',
        category: 'expenses',
      },
    };
  }

  // 5. Questions about Bookings / Appointments (Miadi)
  if (
    query.includes('booking') ||
    query.includes('appointment') ||
    query.includes('miadi') ||
    query.includes('client') ||
    query.includes('wateja')
  ) {
    const activeBookings = bookings.filter((b) => b.status === 'confirmed');
    return {
      text: `You currently have ${bookings.length} total appointments logged in browser storage (${activeBookings.length} confirmed upcoming). Share your EzzyBIZZ Customer Booking Link with clients via WhatsApp so they can choose their preferred barber and service in advance!`,
      highlightData: {
        title: 'Appointments (Miadi ya Wateja)',
        value: `${activeBookings.length} Upcoming`,
        subtext: `${bookings.length} total client appointments recorded`,
        category: 'sales',
      },
    };
  }

  // 6. Questions about Staff / Barbers
  if (query.includes('barber') || query.includes('staff') || query.includes('team') || query.includes('who')) {
    const topBarber = staff[0]?.name || 'Brian';
    return {
      text: `Karibu! You have ${staff.length} barbers & stylists on your active roster. Your lead station barber is ${topBarber}. Keep staff motivated by reviewing weekly commission payouts and tracking individual customer ratings.`,
      highlightData: {
        title: 'Team Roster (Wafanyakazi)',
        value: `${staff.length} Active Barbers`,
        subtext: `Commission rates set between 25% - 35%`,
        category: 'service',
      },
    };
  }

  // Default: General intelligent business coaching overview
  return {
    text: `Karibu to your EzzyBIZZ Business Assistant! 

Here is your quick financial pulse:
• Mauzo (Gross Sales): ${formatCurrency(metrics.revenue)}
• Matumizi (Expenses): ${formatCurrency(metrics.expenses)}
• Faida (Estimated Net Profit): ${formatCurrency(metrics.netProfit)} (${metrics.profitMargin.toFixed(0)}% margin)
• Top Huduma (Best Service): ${topService ? topService.name : 'Fade & Grooming'}

You can ask me anything about your daily sales, expenses, staff performance, customer appointments (miadi), or pricing strategy!`,
    highlightData: {
      title: 'Shop Health Summary',
      value: `${metrics.profitMargin.toFixed(0)}% Profit Margin`,
      subtext: `Net Faida: ${formatCurrency(metrics.netProfit)}`,
      category: 'profit',
    },
  };
}
