import { create } from 'zustand';

type Role = 'student' | 'admin' | 'teacher' | 'head' | 'registrar';

interface AuthState {
  isAuthenticated: boolean;
  role: Role;
  user?: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  signIn: (payload: AuthState['user'], role?: Role) => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  role: 'student',
  user: undefined,
  signIn: (user, role = 'student') =>
    set({
      isAuthenticated: true,
      user,
      role
    }),
  signOut: () =>
    set({
      isAuthenticated: false,
      user: undefined,
      role: 'student'
    })
}));
