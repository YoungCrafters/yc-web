import { UserType } from '@/types/auth';

export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123', // In a real app, this would be hashed
    userType: UserType.MENTEE
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    userType: UserType.MENTEE
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    password: 'password123',
    userType: UserType.MENTOR
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    password: 'password123',
    userType: UserType.MENTOR
  }
]; 