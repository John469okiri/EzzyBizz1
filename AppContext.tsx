import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  User,
  Sale,
  Expense,
  BusinessNote,
  ServiceItem,
  StaffMember,
  TimeFilter,
  BusinessType,
  Booking,
  BookingStatus,
  PaymentMethod,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_SERVICES,
  INITIAL_STAFF,
  generateInitialSales,
  generateInitialExpenses,
  generateInitialNotes,
  generateInitialBookings,
} from '../data/initialData';

const STORAGE_KEY = 'ezzybizz_app_state_v3';

export interface ServiceProfitability {
  serviceId: string;
  name: string;
  category: string;
  count: number;
  totalRevenue: number;
  totalDirectCost: number;
  netProfit: number;
  marginPercent: number;
  avgTicket: number;
}

interface AppContextType {
  user: User | null;
  services: ServiceItem[];
  staff: StaffMember[];
  sales: Sale[];
  expenses: Expense[];
  notes: BusinessNote[];
  bookings: Booking[];
  timeFilter: TimeFilter;
  setTimeFilter: (filter: TimeFilter) => void;
  // Auth
  login: (email: string, pass: string) => boolean;
  signup: (name: string, businessName: string, businessType: BusinessType, email: string, pass: string) => boolean;
  loginAsDemo: () => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  // Sales CRUD
  addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => void;
  updateSale: (id: string, updates: Partial<Sale>) => void;
  deleteSale: (id: string) => void;
  // Expenses CRUD
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  // Notes CRUD
  addNote: (note: Omit<BusinessNote, 'id' | 'createdAt'>) => void;
  updateNote: (id: string, updates: Partial<BusinessNote>) => void;
  toggleNoteCompleted: (id: string) => void;
  deleteNote: (id: string) => void;
  // Bookings CRUD
  addBooking: (booking: Omit<Booking, 'id' | 'bookingRef' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  deleteBooking: (id: string) => void;
  convertBookingToSale: (bookingId: string, paymentMethod?: PaymentMethod) => void;
  // Services & Staff
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;
  addStaff: (member: Omit<StaffMember, 'id'>) => void;
  updateStaff: (id: string, updates: Partial<StaffMember>) => void;
  // Computed Data for Current Filter
  filteredSales: Sale[];
  filteredExpenses: Expense[];
  metrics: {
    revenue: number;
    expenses: number;
    netProfit: number;
    profitMargin: number;
    transactionsCount: number;
    avgSpendPerClient: number;
  };
  serviceProfitability: ServiceProfitability[];
  paymentBreakdown: { method: string; count: number; total: number; percent: number }[];
  staffBreakdown: { name: string; cutsCount: number; totalSales: number; estimatedCommission: number }[];
  formatCurrency: (amount: number) => string;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function isWithinFilter(dateStr: string, filter: TimeFilter): boolean {
  const itemDate = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - itemDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  switch (filter) {
    case 'today':
      return diffDays === 0;
    case 'yesterday':
      return diffDays === 1;
    case 'week':
      return diffDays >= 0 && diffDays <= 7;
    case 'month':
      return diffDays >= 0 && diffDays <= 30;
    case 'all':
    default:
      return true;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load state from local storage or defaults
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_services');
      return saved ? JSON.parse(saved) : INITIAL_SERVICES;
    } catch {
      return INITIAL_SERVICES;
    }
  });

  const [staff, setStaff] = useState<StaffMember[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_staff');
      return saved ? JSON.parse(saved) : INITIAL_STAFF;
    } catch {
      return INITIAL_STAFF;
    }
  });

  const [sales, setSales] = useState<Sale[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_sales');
      return saved ? JSON.parse(saved) : generateInitialSales();
    } catch {
      return generateInitialSales();
    }
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_expenses');
      return saved ? JSON.parse(saved) : generateInitialExpenses();
    } catch {
      return generateInitialExpenses();
    }
  });

  const [notes, setNotes] = useState<BusinessNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_notes');
      return saved ? JSON.parse(saved) : generateInitialNotes();
    } catch {
      return generateInitialNotes();
    }
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY + '_bookings');
      return saved ? JSON.parse(saved) : generateInitialBookings();
    } catch {
      return generateInitialBookings();
    }
  });

  const [timeFilter, setTimeFilter] = useState<TimeFilter>('week');

  // Local storage persistence
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + '_user', JSON.stringify(user));
      localStorage.setItem(STORAGE_KEY + '_services', JSON.stringify(services));
      localStorage.setItem(STORAGE_KEY + '_staff', JSON.stringify(staff));
      localStorage.setItem(STORAGE_KEY + '_sales', JSON.stringify(sales));
      localStorage.setItem(STORAGE_KEY + '_expenses', JSON.stringify(expenses));
      localStorage.setItem(STORAGE_KEY + '_notes', JSON.stringify(notes));
      localStorage.setItem(STORAGE_KEY + '_bookings', JSON.stringify(bookings));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [user, services, staff, sales, expenses, notes, bookings]);

  const currency = user?.currency || 'KSh';

  const formatCurrency = (amount: number): string => {
    return `${currency} ${Number(amount).toLocaleString('en-KE', {
      maximumFractionDigits: 0,
    })}`;
  };

  // Auth functions
  const login = (email: string) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0] || 'Barber Owner',
      email,
      businessName: 'Ezzy Cuts Grooming Lounge',
      businessType: 'barbershop',
      currency: 'KSh',
      isDemo: true,
    };
    setUser(newUser);
    return true;
  };

  const signup = (
    name: string,
    businessName: string,
    businessType: BusinessType,
    email: string
  ) => {
    const newUser: User = {
      id: 'usr_' + Date.now(),
      name,
      email,
      businessName: businessName || 'My EzzyBIZZ Shop',
      businessType,
      currency: 'KSh',
      isDemo: true,
    };
    setUser(newUser);
    return true;
  };

  const loginAsDemo = () => {
    setUser(INITIAL_USER);
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  // CRUD for Sales
  const addSale = (saleData: Omit<Sale, 'id' | 'createdAt'>) => {
    const newSale: Sale = {
      ...saleData,
      id: 'sal_' + Date.now() + Math.random().toString(36).substring(2, 6),
      createdAt: Date.now(),
    };
    setSales((prev) => [newSale, ...prev]);
  };

  const updateSale = (id: string, updates: Partial<Sale>) => {
    setSales((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteSale = (id: string) => {
    setSales((prev) => prev.filter((s) => s.id !== id));
  };

  // CRUD for Expenses
  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExp: Expense = {
      ...expenseData,
      id: 'exp_' + Date.now() + Math.random().toString(36).substring(2, 6),
      createdAt: Date.now(),
    };
    setExpenses((prev) => [newExp, ...prev]);
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // CRUD for Notes
  const addNote = (noteData: Omit<BusinessNote, 'id' | 'createdAt'>) => {
    const newNote: BusinessNote = {
      ...noteData,
      id: 'not_' + Date.now() + Math.random().toString(36).substring(2, 6),
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id: string, updates: Partial<BusinessNote>) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...updates } : n)));
  };

  const toggleNoteCompleted = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, completed: !n.completed } : n))
    );
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  // CRUD for Bookings
  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingRef' | 'createdAt'>): Booking => {
    const randomRef = 'EZB-' + Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: 'bk_' + Date.now() + Math.random().toString(36).substring(2, 5),
      bookingRef: randomRef,
      createdAt: Date.now(),
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  const convertBookingToSale = (bookingId: string, paymentMethod: PaymentMethod = 'M-Pesa') => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    // 1. Mark booking as completed
    updateBookingStatus(bookingId, 'completed');

    // 2. Add as completed sale in sales ledger
    const matchingService = services.find((s) => s.id === booking.serviceId || s.name === booking.serviceName);

    addSale({
      date: booking.date,
      time: booking.time,
      serviceId: booking.serviceId || matchingService?.id || 'srv_1',
      serviceName: booking.serviceName,
      category: matchingService?.category || 'Barbering',
      amount: booking.price,
      paymentMethod,
      barberName: booking.barberName || 'Brian (Lead Barber)',
      customerName: booking.customerName,
      notes: `Booked via Customer Link (Ref: ${booking.bookingRef})`,
    });
  };

  // Services & Staff
  const addService = (srvData: Omit<ServiceItem, 'id'>) => {
    const newSrv: ServiceItem = {
      ...srvData,
      id: 'srv_' + Date.now(),
    };
    setServices((prev) => [...prev, newSrv]);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addStaff = (memberData: Omit<StaffMember, 'id'>) => {
    const newStf: StaffMember = {
      ...memberData,
      id: 'stf_' + Date.now(),
    };
    setStaff((prev) => [...prev, newStf]);
  };

  const updateStaff = (id: string, updates: Partial<StaffMember>) => {
    setStaff((prev) => prev.map((st) => (st.id === id ? { ...st, ...updates } : st)));
  };

  const resetDemoData = () => {
    setUser(INITIAL_USER);
    setServices(INITIAL_SERVICES);
    setStaff(INITIAL_STAFF);
    setSales(generateInitialSales());
    setExpenses(generateInitialExpenses());
    setNotes(generateInitialNotes());
    setBookings(generateInitialBookings());
    setTimeFilter('week');
  };

  // Filtered lists based on timeFilter
  const filteredSales = useMemo(() => {
    return sales.filter((s) => isWithinFilter(s.date, timeFilter));
  }, [sales, timeFilter]);

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => isWithinFilter(e.date, timeFilter));
  }, [expenses, timeFilter]);

  // Overall Metrics
  const metrics = useMemo(() => {
    const revenue = filteredSales.reduce((acc, s) => acc + s.amount, 0);
    const totalExp = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);
    const netProfit = revenue - totalExp;
    const profitMargin = revenue > 0 ? (netProfit / revenue) * 100 : 0;
    const transactionsCount = filteredSales.length;
    const avgSpendPerClient = transactionsCount > 0 ? revenue / transactionsCount : 0;

    return {
      revenue,
      expenses: totalExp,
      netProfit,
      profitMargin,
      transactionsCount,
      avgSpendPerClient,
    };
  }, [filteredSales, filteredExpenses]);

  // Service Profitability comparison
  const serviceProfitability = useMemo(() => {
    const serviceMap = new Map<string, ServiceItem>();
    services.forEach((s) => serviceMap.set(s.id, s));

    const breakdown: Record<
      string,
      { count: number; totalRevenue: number; name: string; category: string; directCostUnit: number }
    > = {};

    filteredSales.forEach((sale) => {
      const srv = serviceMap.get(sale.serviceId);
      const name = sale.serviceName;
      const category = sale.category || srv?.category || 'Barbering';
      const directCostUnit = srv?.estimatedDirectCost ?? (sale.amount * 0.1);

      if (!breakdown[name]) {
        breakdown[name] = {
          count: 0,
          totalRevenue: 0,
          name,
          category,
          directCostUnit,
        };
      }
      breakdown[name].count += 1;
      breakdown[name].totalRevenue += sale.amount;
    });

    return Object.values(breakdown)
      .map((item) => {
        const totalDirectCost = item.count * item.directCostUnit;
        const netProfit = item.totalRevenue - totalDirectCost;
        const marginPercent = item.totalRevenue > 0 ? (netProfit / item.totalRevenue) * 100 : 0;
        const avgTicket = item.count > 0 ? item.totalRevenue / item.count : 0;

        return {
          serviceId: item.name,
          name: item.name,
          category: item.category,
          count: item.count,
          totalRevenue: item.totalRevenue,
          totalDirectCost,
          netProfit,
          marginPercent,
          avgTicket,
        };
      })
      .sort((a, b) => b.netProfit - a.netProfit);
  }, [filteredSales, services]);

  // Payment Breakdown
  const paymentBreakdown = useMemo(() => {
    const methods: Record<string, { count: number; total: number }> = {
      'M-Pesa': { count: 0, total: 0 },
      'Cash': { count: 0, total: 0 },
      'Card': { count: 0, total: 0 },
      'Bank Transfer': { count: 0, total: 0 },
    };

    let grandTotal = 0;
    filteredSales.forEach((sale) => {
      const pm = sale.paymentMethod || 'M-Pesa';
      if (!methods[pm]) {
        methods[pm] = { count: 0, total: 0 };
      }
      methods[pm].count += 1;
      methods[pm].total += sale.amount;
      grandTotal += sale.amount;
    });

    return Object.entries(methods)
      .map(([method, data]) => ({
        method,
        count: data.count,
        total: data.total,
        percent: grandTotal > 0 ? Math.round((data.total / grandTotal) * 100) : 0,
      }))
      .filter((p) => p.count > 0)
      .sort((a, b) => b.total - a.total);
  }, [filteredSales]);

  // Staff breakdown
  const staffBreakdown = useMemo(() => {
    const map: Record<string, { cutsCount: number; totalSales: number; commissionRate: number }> = {};
    const staffMap = new Map<string, StaffMember>();
    staff.forEach((st) => staffMap.set(st.name, st));

    filteredSales.forEach((sale) => {
      const sName = sale.barberName || 'Unassigned';
      if (!map[sName]) {
        const found = staffMap.get(sName);
        map[sName] = {
          cutsCount: 0,
          totalSales: 0,
          commissionRate: found?.commissionRate ?? 0.3,
        };
      }
      map[sName].cutsCount += 1;
      map[sName].totalSales += sale.amount;
    });

    return Object.entries(map).map(([name, data]) => ({
      name,
      cutsCount: data.cutsCount,
      totalSales: data.totalSales,
      estimatedCommission: data.totalSales * data.commissionRate,
    })).sort((a, b) => b.totalSales - a.totalSales);
  }, [filteredSales, staff]);

  return (
    <AppContext.Provider
      value={{
        user,
        services,
        staff,
        sales,
        expenses,
        notes,
        bookings,
        timeFilter,
        setTimeFilter,
        login,
        signup,
        loginAsDemo,
        logout,
        updateUser,
        addSale,
        updateSale,
        deleteSale,
        addExpense,
        updateExpense,
        deleteExpense,
        addNote,
        updateNote,
        toggleNoteCompleted,
        deleteNote,
        addBooking,
        updateBookingStatus,
        deleteBooking,
        convertBookingToSale,
        addService,
        updateService,
        addStaff,
        updateStaff,
        filteredSales,
        filteredExpenses,
        metrics,
        serviceProfitability,
        paymentBreakdown,
        staffBreakdown,
        formatCurrency,
        resetDemoData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
