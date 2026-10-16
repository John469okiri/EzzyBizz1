import { ServiceItem, StaffMember, Sale, Expense, BusinessNote, User, Booking } from '../types';

export const INITIAL_USER: User = {
  id: 'user_demo_1',
  name: 'John Mwangi',
  email: 'john@ezzybizz.com',
  businessName: 'Ezzy Cuts & Grooming Lounge',
  businessType: 'barbershop',
  currency: 'KSh',
  isDemo: true,
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv_1',
    name: 'Classic Fade & Lineup',
    category: 'Barbering',
    defaultPrice: 500,
    estimatedDirectCost: 35, // blade, neck paper, spirit/aftershave
    durationMinutes: 30,
    active: true,
  },
  {
    id: 'srv_2',
    name: 'Executive Fade + Beard Sculpt',
    category: 'VIP Packages',
    defaultPrice: 1200,
    estimatedDirectCost: 95, // hot towel, beard oil, razor, balm
    durationMinutes: 45,
    active: true,
  },
  {
    id: 'srv_3',
    name: 'Hot Towel Shave & Steam Facial',
    category: 'Beard & Shave',
    defaultPrice: 800,
    estimatedDirectCost: 110, // eucalyptus towel, shave butter, astringent
    durationMinutes: 35,
    active: true,
  },
  {
    id: 'srv_4',
    name: 'Kids Cut & Cartoon Parting',
    category: 'Barbering',
    defaultPrice: 400,
    estimatedDirectCost: 25,
    durationMinutes: 25,
    active: true,
  },
  {
    id: 'srv_5',
    name: 'Hair Dye / Jet Black Tint',
    category: 'Coloring',
    defaultPrice: 1000,
    estimatedDirectCost: 220, // color dye cream, developer, gloves, wash
    durationMinutes: 40,
    active: true,
  },
  {
    id: 'srv_6',
    name: 'Dreadlocks Retwist & Wash',
    category: 'Hair Care',
    defaultPrice: 1800,
    estimatedDirectCost: 150, // clarifying shampoo, twisting gel, dryer time
    durationMinutes: 75,
    active: true,
  },
  {
    id: 'srv_7',
    name: 'VIP Full King Grooming Session',
    category: 'VIP Packages',
    defaultPrice: 2500,
    estimatedDirectCost: 280, // haircut, beard, wash, mask, massage, juice
    durationMinutes: 90,
    active: true,
  },
  {
    id: 'srv_8',
    name: 'Beard Trim & Hydrating Balm',
    category: 'Beard & Shave',
    defaultPrice: 400,
    estimatedDirectCost: 30,
    durationMinutes: 20,
    active: true,
  },
  {
    id: 'srv_9',
    name: 'Scalp Scrub & Head Massage',
    category: 'Hair Care',
    defaultPrice: 700,
    estimatedDirectCost: 75,
    durationMinutes: 30,
    active: true,
  },
  {
    id: 'srv_10',
    name: 'Gentlemen Express Manicure',
    category: 'Spa & Nails',
    defaultPrice: 800,
    estimatedDirectCost: 90,
    durationMinutes: 35,
    active: true,
  },
];

export const INITIAL_STAFF: StaffMember[] = [
  { id: 'stf_1', name: 'Brian (Lead Barber)', role: 'Master Barber', commissionRate: 0.35, phone: '+254 712 345 678', active: true },
  { id: 'stf_2', name: 'Kelvin (Fade Specialist)', role: 'Barber & Stylist', commissionRate: 0.30, phone: '+254 722 987 654', active: true },
  { id: 'stf_3', name: 'Grace (Loctician & Groomer)', role: 'Loctician & Spa', commissionRate: 0.35, phone: '+254 733 112 233', active: true },
  { id: 'stf_4', name: 'Samuel (Junior Barber)', role: 'Apprentice Barber', commissionRate: 0.25, phone: '+254 799 445 566', active: true },
];

function getRelativeDateStr(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().split('T')[0];
}

export function generateInitialSales(): Sale[] {
  const today = getRelativeDateStr(0);
  const yesterday = getRelativeDateStr(1);
  const day2 = getRelativeDateStr(2);
  const day3 = getRelativeDateStr(3);
  const day4 = getRelativeDateStr(4);
  const day5 = getRelativeDateStr(5);
  const day6 = getRelativeDateStr(6);
  const day10 = getRelativeDateStr(10);
  const day14 = getRelativeDateStr(14);

  return [
    // Today's Sales
    {
      id: 'sal_01',
      date: today,
      time: '09:15',
      serviceId: 'srv_1',
      serviceName: 'Classic Fade & Lineup',
      category: 'Barbering',
      amount: 500,
      paymentMethod: 'M-Pesa',
      barberName: 'Brian (Lead Barber)',
      customerName: 'David K.',
      notes: 'Clean low taper fade',
      createdAt: Date.now() - 3600000 * 5,
    },
    {
      id: 'sal_02',
      date: today,
      time: '10:00',
      serviceId: 'srv_2',
      serviceName: 'Executive Fade + Beard Sculpt',
      category: 'VIP Packages',
      amount: 1200,
      paymentMethod: 'M-Pesa',
      barberName: 'Kelvin (Fade Specialist)',
      customerName: 'Otieno Maina',
      notes: 'Hot towel with mint aftershave',
      createdAt: Date.now() - 3600000 * 4,
    },
    {
      id: 'sal_03',
      date: today,
      time: '11:20',
      serviceId: 'srv_4',
      serviceName: 'Kids Cut & Cartoon Parting',
      category: 'Barbering',
      amount: 400,
      paymentMethod: 'Cash',
      barberName: 'Samuel (Junior Barber)',
      customerName: 'Mama Junior',
      notes: 'Lightning bolt parting',
      createdAt: Date.now() - 3600000 * 3,
    },
    {
      id: 'sal_04',
      date: today,
      time: '12:45',
      serviceId: 'srv_6',
      serviceName: 'Dreadlocks Retwist & Wash',
      category: 'Hair Care',
      amount: 1800,
      paymentMethod: 'M-Pesa',
      barberName: 'Grace (Loctician & Groomer)',
      customerName: 'Marcus W.',
      notes: 'Organic shea butter lock twist',
      createdAt: Date.now() - 3600000 * 2,
    },
    {
      id: 'sal_05',
      date: today,
      time: '14:10',
      serviceId: 'srv_3',
      serviceName: 'Hot Towel Shave & Steam Facial',
      category: 'Beard & Shave',
      amount: 800,
      paymentMethod: 'M-Pesa',
      barberName: 'Brian (Lead Barber)',
      customerName: 'Ambassador Joe',
      notes: 'Very sensitive skin, used aloe balm',
      createdAt: Date.now() - 3600000 * 1,
    },
    {
      id: 'sal_06',
      date: today,
      time: '15:30',
      serviceId: 'srv_7',
      serviceName: 'VIP Full King Grooming Session',
      category: 'VIP Packages',
      amount: 2500,
      paymentMethod: 'Card',
      barberName: 'Kelvin (Fade Specialist)',
      customerName: 'Eng. Patrick',
      notes: 'Attending evening wedding event',
      createdAt: Date.now() - 1800000,
    },

    // Yesterday's Sales
    {
      id: 'sal_07',
      date: yesterday,
      time: '09:40',
      serviceId: 'srv_1',
      serviceName: 'Classic Fade & Lineup',
      category: 'Barbering',
      amount: 500,
      paymentMethod: 'M-Pesa',
      barberName: 'Samuel (Junior Barber)',
      customerName: 'Alex N.',
      createdAt: Date.now() - 86400000 * 1,
    },
    {
      id: 'sal_08',
      date: yesterday,
      time: '11:00',
      serviceId: 'srv_5',
      serviceName: 'Hair Dye / Jet Black Tint',
      category: 'Coloring',
      amount: 1000,
      paymentMethod: 'M-Pesa',
      barberName: 'Kelvin (Fade Specialist)',
      customerName: 'Pastor Robert',
      createdAt: Date.now() - 86400000 * 1 + 3600000,
    },
    {
      id: 'sal_09',
      date: yesterday,
      time: '13:15',
      serviceId: 'srv_2',
      serviceName: 'Executive Fade + Beard Sculpt',
      category: 'VIP Packages',
      amount: 1200,
      paymentMethod: 'Cash',
      barberName: 'Brian (Lead Barber)',
      customerName: 'Stephen O.',
      createdAt: Date.now() - 86400000 * 1 + 7200000,
    },
    {
      id: 'sal_10',
      date: yesterday,
      time: '15:00',
      serviceId: 'srv_1',
      serviceName: 'Classic Fade & Lineup',
      category: 'Barbering',
      amount: 500,
      paymentMethod: 'M-Pesa',
      barberName: 'Brian (Lead Barber)',
      customerName: 'Moses K.',
      createdAt: Date.now() - 86400000 * 1 + 10800000,
    },
    {
      id: 'sal_11',
      date: yesterday,
      time: '17:30',
      serviceId: 'srv_10',
      serviceName: 'Gentlemen Express Manicure',
      category: 'Spa & Nails',
      amount: 800,
      paymentMethod: 'M-Pesa',
      barberName: 'Grace (Loctician & Groomer)',
      customerName: 'Dr. Kimani',
      createdAt: Date.now() - 86400000 * 1 + 14400000,
    },

    // Past Days (This Week & Earlier)
    {
      id: 'sal_12',
      date: day2,
      time: '10:30',
      serviceId: 'srv_7',
      serviceName: 'VIP Full King Grooming Session',
      category: 'VIP Packages',
      amount: 2500,
      paymentMethod: 'M-Pesa',
      barberName: 'Brian (Lead Barber)',
      customerName: 'Kiprono S.',
      createdAt: Date.now() - 86400000 * 2,
    },
    {
      id: 'sal_13',
      date: day2,
      time: '14:20',
      serviceId: 'srv_1',
      serviceName: 'Classic Fade & Lineup',
      category: 'Barbering',
      amount: 500,
      paymentMethod: 'Cash',
      barberName: 'Kelvin (Fade Specialist)',
      customerName: 'Hassan B.',
      createdAt: Date.now() - 86400000 * 2 + 3600000,
    },
    {
      id: 'sal_14',
      date: day3,
      time: '11:15',
      serviceId: 'srv_2',
      serviceName: 'Executive Fade + Beard Sculpt',
      category: 'VIP Packages',
      amount: 1200,
      paymentMethod: 'M-Pesa',
      barberName: 'Brian (Lead Barber)',
      customerName: 'Ian G.',
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: 'sal_15',
      date: day3,
      time: '16:00',
      serviceId: 'srv_6',
      serviceName: 'Dreadlocks Retwist & Wash',
      category: 'Hair Care',
      amount: 1800,
      paymentMethod: 'M-Pesa',
      barberName: 'Grace (Loctician & Groomer)',
      customerName: 'Trevor K.',
      createdAt: Date.now() - 86400000 * 3 + 7200000,
    },
    {
      id: 'sal_16',
      date: day4,
      time: '12:00',
      serviceId: 'srv_1',
      serviceName: 'Classic Fade & Lineup',
      category: 'Barbering',
      amount: 500,
      paymentMethod: 'M-Pesa',
      barberName: 'Samuel (Junior Barber)',
      customerName: 'Collins M.',
      createdAt: Date.now() - 86400000 * 4,
    },
    {
      id: 'sal_17',
      date: day5,
      time: '10:00',
      serviceId: 'srv_3',
      serviceName: 'Hot Towel Shave & Steam Facial',
      category: 'Beard & Shave',
      amount: 800,
      paymentMethod: 'Cash',
      barberName: 'Kelvin (Fade Specialist)',
      customerName: 'Erick N.',
      createdAt: Date.now() - 86400000 * 5,
    },
    {
      id: 'sal_18',
      date: day6,
      time: '15:45',
      serviceId: 'srv_9',
      serviceName: 'Scalp Scrub & Head Massage',
      category: 'Hair Care',
      amount: 700,
      paymentMethod: 'M-Pesa',
      barberName: 'Grace (Loctician & Groomer)',
      customerName: 'Simon L.',
      createdAt: Date.now() - 86400000 * 6,
    },
    {
      id: 'sal_19',
      date: day10,
      time: '13:30',
      serviceId: 'srv_7',
      serviceName: 'VIP Full King Grooming Session',
      category: 'VIP Packages',
      amount: 2500,
      paymentMethod: 'M-Pesa',
      barberName: 'Brian (Lead Barber)',
      customerName: 'Senator guest',
      createdAt: Date.now() - 86400000 * 10,
    },
    {
      id: 'sal_20',
      date: day14,
      time: '11:45',
      serviceId: 'srv_2',
      serviceName: 'Executive Fade + Beard Sculpt',
      category: 'VIP Packages',
      amount: 1200,
      paymentMethod: 'M-Pesa',
      barberName: 'Kelvin (Fade Specialist)',
      customerName: 'Antony W.',
      createdAt: Date.now() - 86400000 * 14,
    },
  ];
}

export function generateInitialExpenses(): Expense[] {
  const today = getRelativeDateStr(0);
  const yesterday = getRelativeDateStr(1);
  const day3 = getRelativeDateStr(3);
  const day7 = getRelativeDateStr(7);
  const day12 = getRelativeDateStr(12);

  return [
    {
      id: 'exp_01',
      date: today,
      category: 'Clipper Blades & Supplies',
      description: 'Pack of Dorco razor blades + Barbicide sanitizer spray',
      amount: 650,
      paidBy: 'John (Owner)',
      receiptNo: 'RCP-8812',
      createdAt: Date.now() - 3600000 * 6,
    },
    {
      id: 'exp_02',
      date: today,
      category: 'Snacks & Tea for Clients',
      description: 'Ginger tea bags, fresh milk, and biscuits for client lounge',
      amount: 320,
      paidBy: 'Grace',
      createdAt: Date.now() - 3600000 * 3,
    },
    {
      id: 'exp_03',
      date: yesterday,
      category: 'Electricity (Tokens)',
      description: 'KPLC prepaid electricity tokens for clippers, towels warmer & AC',
      amount: 1500,
      paidBy: 'John (Owner)',
      receiptNo: 'KPLC-99381',
      createdAt: Date.now() - 86400000 * 1,
    },
    {
      id: 'exp_04',
      date: day3,
      category: 'Water Bill',
      description: 'Nairobi water delivery top-up for hair wash station',
      amount: 800,
      paidBy: 'John (Owner)',
      createdAt: Date.now() - 86400000 * 3,
    },
    {
      id: 'exp_05',
      date: day7,
      category: 'Internet & M-Pesa Charges',
      description: 'Safaricom 5G Wi-Fi monthly bundle for shop & client music stream',
      amount: 2500,
      paidBy: 'John (Owner)',
      receiptNo: 'SAF-39201',
      createdAt: Date.now() - 86400000 * 7,
    },
    {
      id: 'exp_06',
      date: day12,
      category: 'Equipment & Maintenance',
      description: 'Wahl clipper blade sharpening & motor oil service',
      amount: 900,
      paidBy: 'Brian (Lead Barber)',
      createdAt: Date.now() - 86400000 * 12,
    },
  ];
}

export function generateInitialNotes(): BusinessNote[] {
  const today = getRelativeDateStr(0);
  const yesterday = getRelativeDateStr(1);
  const day2 = getRelativeDateStr(2);

  return [
    {
      id: 'not_01',
      date: today,
      title: 'Target: 25 Haircuts & 5 VIP Packages Today',
      content: 'Saturday peak rush expected from 11 AM to 6 PM. Brian taking station 1, Kelvin on station 2, Grace handling lock retwists in station 3.',
      category: 'Daily Target',
      priority: 'important',
      completed: false,
      createdAt: Date.now() - 3600000 * 4,
    },
    {
      id: 'not_02',
      date: today,
      title: 'Restock Beard Oils & Hair Color Dyes',
      content: 'Running low on dark brown and jet black dye tubes. Supplier Kamau in River Road delivering 6 boxes on Monday morning.',
      category: 'Inventory Alert',
      priority: 'urgent',
      completed: false,
      createdAt: Date.now() - 3600000 * 2,
    },
    {
      id: 'not_03',
      date: yesterday,
      title: 'Positive feedback on Eucalyptus Hot Towels',
      content: 'Client Otieno loved the eucalyptus essential oil towel steam before the shave. Let us make this the standard protocol for all beard sculpts.',
      category: 'Client Feedback',
      priority: 'normal',
      completed: true,
      createdAt: Date.now() - 86400000 * 1,
    },
    {
      id: 'not_04',
      date: day2,
      title: 'Station 2 Clipper Charger Cord Replaced',
      content: 'New genuine Wahl cord fitted. Backups stored in the drawer under the reception counter.',
      category: 'Equipment',
      priority: 'normal',
      completed: true,
      createdAt: Date.now() - 86400000 * 2,
    },
  ];
}

export function generateInitialBookings(): Booking[] {
  const today = getRelativeDateStr(0);
  const tomorrow = getRelativeDateStr(-1);

  return [
    {
      id: 'bk_01',
      bookingRef: 'EZB-4081',
      customerName: 'Kariuki Evans',
      customerPhone: '+254 722 100 200',
      serviceId: 'srv_2',
      serviceName: 'Executive Fade + Beard Sculpt',
      price: 1200,
      barberName: 'Brian (Lead Barber)',
      date: today,
      time: '16:30',
      status: 'confirmed',
      notes: 'Prefers mint steam towel and clipper cut #1.5',
      createdAt: Date.now() - 3600000 * 2,
    },
    {
      id: 'bk_02',
      bookingRef: 'EZB-4082',
      customerName: 'Sammy Mwangi',
      customerPhone: '+254 711 345 678',
      serviceId: 'srv_7',
      serviceName: 'VIP Full King Grooming Session',
      price: 2500,
      barberName: 'Kelvin (Fade Specialist)',
      date: today,
      time: '18:00',
      status: 'confirmed',
      notes: 'Attending gala event in Nairobi West',
      createdAt: Date.now() - 3600000 * 3,
    },
    {
      id: 'bk_03',
      bookingRef: 'EZB-4083',
      customerName: 'Beatrice Achieng',
      customerPhone: '+254 733 987 112',
      serviceId: 'srv_6',
      serviceName: 'Dreadlocks Retwist & Wash',
      price: 1800,
      barberName: 'Grace (Loctician & Groomer)',
      date: tomorrow,
      time: '11:00',
      status: 'confirmed',
      notes: 'Organic twisting butter only',
      createdAt: Date.now() - 3600000 * 6,
    },
  ];
}

