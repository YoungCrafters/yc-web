import { mockUsers } from './data';
import { SignInFormData, SignUpFormData, UserType } from '@/types/auth';

export const mockSignIn = async (credentials: SignInFormData) => {
  // Add debug logging
  console.log('Mock users:', mockUsers);
  console.log('Credentials received:', credentials);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const user = mockUsers.find(
    u => u.email === credentials.username&& 
    u.password === credentials.password 
    
  );

  console.log('Found user:', user);

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Remove password from returned user data
  const { password, ...userWithoutPassword } = user;
  
  // Store user data in localStorage
  localStorage.setItem('user', JSON.stringify(userWithoutPassword));
  
  return userWithoutPassword;
};

export const mockSignUp = async (userData: SignUpFormData) => {
  console.log('Sign up data received:', userData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Check if user already exists
  if (mockUsers.some(u => u.email === userData.email)) {
    throw new Error('User already exists');
  }

  const newUser = {
    id: String(mockUsers.length + 1),
    name: `${userData.firstName} ${userData.lastName}`,
    userType: '' as UserType, // Replace 'user' with the appropriate UserType value
    email: userData.email,
    password: userData.password,
  };

  
  mockUsers.push(newUser);
  console.log('New user created:', newUser);

  // Remove password from returned user data
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const mockSignOut = async () => {
  // Clear user data from localStorage
  localStorage.removeItem('user');
  console.log('Sign out requested');
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return true;
};

// Add a function to check if user is already authenticated
export const checkAuth = () => {
  const storedUser = localStorage.getItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};