import { create } from 'zustand';
import { UserType } from '@/types/auth';

interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user: User | null) => set({ user, error: null }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
  clearAuth: () => set({ user: null, error: null }),
})); 