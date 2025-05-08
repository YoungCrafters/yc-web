import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '@/types/auth';
import { signIn, signUp, signOut } from '@/lib/auth';
import type { SignInFormData, SignUpFormData } from '@/types/auth';

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
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const signInAsync = createAsyncThunk(
  'auth/signIn',
  async (credentials: SignInFormData) => {
    const response = await signIn(credentials);
    return response;
  }
);

export const signUpAsync = createAsyncThunk(
  'auth/signUp',
  async (userData: SignUpFormData) => {
    const response = await signUp(userData);
    return response;
  }
);

export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async () => {
    await signOut();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.error = null;
    },
    clearAuth: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signInAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign in failed';
      })
      // Sign Up
      .addCase(signUpAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload;
        state.error = null;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Sign up failed';
      })
      // Sign Out
      .addCase(signOutAsync.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      });
  },
});

export const { setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer; 