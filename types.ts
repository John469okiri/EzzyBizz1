export type BusinessType = 'barbershop' | 'salon' | 'spa' | 'nails' | 'combo';

export type PaymentMethod = 'M-Pesa' | 'Cash' | 'Card' | 'Bank Transfer';

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  businessType: BusinessType;
  currency: string;
  isDemo: boolean;
  phone?: string;
  tillNumber?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: 'Barbering' | 'Beard & Shave' | 'Hair Care' | 'Coloring' | 'Spa & Nails' | 'VIP Packages';
  defaultPrice: number;
  estimatedDirectCost: number; // cost of blades, creams, shampoo, etc.
  durationMinutes: number;
  active: boolean;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  commissionRate: number; // e.g. 0.3 for 30%
  phone?: string;
  active: boolean;
}

export interface Sale {
  id: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  serviceId: string;
  serviceName: string;
  category: string;
  amount: number;
  paymentMethod: PaymentMethod;
  barberName: string;
  customerName?: string;
  notes?: string;
  createdAt: number;
}

export type ExpenseCategory =
  | 'Rent & Premises'
  | 'Clipper Blades & Supplies'
  | 'Electricity (Tokens)'
  | 'Water Bill'
  | 'Staff Commission & Wages'
  | 'Internet & M-Pesa Charges'
  | 'Equipment & Maintenance'
  | 'Snacks & Tea for Clients'
  | 'Marketing & Signage'
  | 'Miscellaneous';

export interface Expense {
  id: string;
  date: string; // YYYY-MM-DD
  category: ExpenseCategory;
  description: string;
  amount: number;
  paidBy: string;
  receiptNo?: string;
  createdAt: number;
}

export interface BusinessNote {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  content: string;
  category: 'Daily Target' | 'Inventory Alert' | 'Client Feedback' | 'Equipment' | 'General';
  priority: 'normal' | 'important' | 'urgent';
  completed?: boolean;
  createdAt: number;
}

export type BookingStatus = 'confirmed' | 'in-progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  bookingRef: string;
  customerName: string;
  customerPhone: string;
  serviceId: string;
  serviceName: string;
  price: number;
  barberName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  status: BookingStatus;
  notes?: string;
  createdAt: number;
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
  highlightData?: {
    title?: string;
    value?: string;
    subtext?: string;
    category?: 'sales' | 'profit' | 'service' | 'expenses';
  };
}

export type TimeFilter = 'today' | 'yesterday' | 'week' | 'month' | 'all';
