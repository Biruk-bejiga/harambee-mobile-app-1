import { supabase } from './supabaseClient';

export type UserRole = 'student' | 'admin' | 'teacher' | 'head' | 'registrar';

export interface DashboardMetrics {
  cgpa: number;
  credits: number;
  semester: number;
  payments: number;
}

export interface Course {
  code: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
  status?: 'enrolled' | 'available' | 'waitlist';
}

export interface PaymentItem {
  id: string;
  label: string;
  amount: number;
  status: 'paid' | 'unpaid';
  date: string;
}

export const fetchDashboard = async (): Promise<DashboardMetrics> => {
  try {
    const { data, error } = await supabase.rpc('dashboard_metrics');
    if (error) throw error;
    if (data) return data as DashboardMetrics;
  } catch (error) {
    console.warn('Falling back to mocked dashboard metrics', error);
  }

  return {
    cgpa: 3.12,
    credits: 106,
    semester: 3,
    payments: 2710
  };
};

export const fetchCourses = async (): Promise<Course[]> => {
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) throw error;
    if (data) {
      return data as Course[];
    }
  } catch (error) {
    console.warn('Falling back to mocked courses', error);
  }

  return [
    {
      code: 'MGMT4022',
      name: 'Management of Financial Institutions',
      credits: 3,
      instructor: 'Dr. Ahmed Hassan',
      schedule: 'Mon/Wed 10:00-11:30',
      status: 'available'
    },
    {
      code: 'ACCT3011',
      name: 'Advanced Managerial Accounting',
      credits: 4,
      instructor: 'Dr. Saba Bekele',
      schedule: 'Tue/Thu 14:00-16:00',
      status: 'enrolled'
    }
  ];
};

export const fetchPayments = async (): Promise<PaymentItem[]> => {
  try {
    const { data, error } = await supabase.from('payments').select('*');
    if (error) throw error;
    if (data) return data as PaymentItem[];
  } catch (error) {
    console.warn('Falling back to mocked payment data', error);
  }

  return [
    {
      id: 'pay-1',
      label: 'Tuition Fee',
      amount: 630,
      status: 'paid',
      date: '2025-11-11'
    },
    {
      id: 'pay-2',
      label: 'Tuition Fee',
      amount: 630,
      status: 'paid',
      date: '2025-10-13'
    }
  ];
};
*** End Patch