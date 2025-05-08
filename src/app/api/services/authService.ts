import api from './api';

interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegistrationUserData {
    first_name: string,
    last_name: string,
    username: string;
    email: string;
    password1: string,
    password2: string,
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user?: {
        pk: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string
    };
}

interface RegistrationResponse {
    detail: string;
}

// Auth service functions 
export const useLogin = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/v1/auth/login/', credentials);
    return response.data;
};

export const useRegister = async (userData: RegistrationUserData): Promise<RegistrationResponse> => {
    const response = await api.post<RegistrationResponse>('/v1/auth/registration/', userData);
    return response.data;
}

export const logout = async (): Promise<void> => {
    await api.post<void>('/v1/auth/logout/');
    localStorage.removeItem('access');
};

export const checkAuthStatus = async (): Promise<{ isAuthenticated: boolean, user?: AuthResponse['user'] }> => {
    const response = await api.get<{ isAuthenticated: boolean; user?: AuthResponse['user']; }>('/v1/auth/status/'); // TODO verify correct end point to check auth status
    return response.data;
};