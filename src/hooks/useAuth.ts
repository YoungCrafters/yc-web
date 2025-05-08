import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { SignInFormData, SignUpFormData, User } from '@/types/auth';
import { signInAsync, signUpAsync, signOutAsync } from '@/store/features/authSlice';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector((state) => state.auth);
  const [userState, setUserState] = useState<User | null>(null);

  const handleSignIn = useCallback(
    async (credentials: SignInFormData) => {
      try {
        await dispatch(signInAsync(credentials)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const handleSignUp = useCallback(
    async (userData: SignUpFormData) => {
      try {
        await dispatch(signUpAsync(userData)).unwrap();
        return true;
      } catch (error) {
        return false;
      }
    },
    [dispatch]
  );

  const handleSignOut = useCallback(async () => {
    try {
      await dispatch(signOutAsync()).unwrap();
      return true;
    } catch (error) {
      return false;
    }
  }, [dispatch]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
} 