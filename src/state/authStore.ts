import { StateCreator, create } from 'zustand';
import { UserRole, fetchUserRole } from '../supabase/api';
import { supabase } from '../supabase/supabaseClient';
// import { supabase } from 'src/supabase/supabaseClient';
// import { UserRole } from 'src/supabase/api';

export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  studentId?: string;
  department?: string;
};

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  role: UserRole;
  isLoading: boolean;
  error?: string;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  bootstrap: () => Promise<void>;
}

const createAuthStore: StateCreator<AuthState> = (set) => ({
  isAuthenticated: false,
  user: null,
  role: 'student',
  isLoading: false,
  async login(email, password) {
    set({ isLoading: true, error: undefined });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (!data.user) throw new Error('Missing user');

      const profile = {
        id: data.user.id,
        email: data.user.email ?? email,
        fullName: data.user.user_metadata?.fullName ?? 'Biruk Bejiga',
        studentId: data.user.user_metadata?.studentId ?? 'STD2025001',
        department: data.user.user_metadata?.department ?? 'Accounting and Finance'
      } satisfies AuthUser;

      const profileRole = await fetchUserRole(data.user.id);
      const role = profileRole ?? ((data.user.app_metadata?.role as UserRole) ?? 'student');

      set({ isAuthenticated: true, user: profile, role, isLoading: false });
    } catch (error) {
      console.error(error);
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  async logout() {
    await supabase.auth.signOut();
    set({ isAuthenticated: false, user: null, role: 'student' });
  },
  async bootstrap() {
    set({ isLoading: true });
    const {
      data: { session }
    } = await supabase.auth.getSession();
    if (session?.user) {
      set({
        isAuthenticated: true,
        user: {
          id: session.user.id,
          email: session.user.email ?? '',
          fullName: session.user.user_metadata?.fullName ?? 'Biruk Bejiga',
          studentId: session.user.user_metadata?.studentId ?? 'STD2025001',
          department: session.user.user_metadata?.department ?? 'Accounting and Finance'
        },
        role:
          (await fetchUserRole(session.user.id)) ??
          ((session.user.app_metadata?.role as UserRole) ?? 'student'),
        isLoading: false
      });
    } else {
      set({ isAuthenticated: false, user: null, role: 'student', isLoading: false });
    }
  }
});

export const useAuthStore = create<AuthState>()(createAuthStore);
