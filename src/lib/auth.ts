import { SignInFormData, SignUpFormData } from '@/types/auth';
import { mockSignIn, mockSignUp, mockSignOut } from '@/mocks/endpoints';

export const signIn = async (credentials: SignInFormData) => {
  return mockSignIn(credentials);
};

export const signUp = async (userData: SignUpFormData) => {
  return mockSignUp(userData);
};

export const signOut = async () => {
  return mockSignOut();
};

// import { SignInFormData, SignUpFormData } from '@/types/auth';

// /**
//  * Sign in a user with email and password
//  * @param credentials User credentials
//  * @returns Promise with user data or error
//  */
// export async function signIn(credentials: SignInFormData) {
//   try {
//     const response = await fetch('/api/auth/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//     });

//     if (!response.ok) {
//       throw new Error('Authentication failed');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Sign in error:', error);
//     throw error;
//   }
// }

// /**
//  * Sign up a new user
//  * @param userData User registration data
//  * @returns Promise with user data or error
//  */
// export async function signUp(userData: SignUpFormData) {
//   try {
//     const response = await fetch('/api/auth/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error('Registration failed');
//     }

//     return await response.json();
//   } catch (error) {
//     console.error('Sign up error:', error);
//     throw error;
//   }
// }

// /**
//  * Sign out the current user
//  * @returns Promise<void>
//  */
// export async function signOut() {
//   try {
//     const response = await fetch('/api/auth/signout', {
//       method: 'POST',
//     });

//     if (!response.ok) {
//       throw new Error('Sign out failed');
//     }
//   } catch (error) {
//     console.error('Sign out error:', error);
//     throw error;
//   }
// } 