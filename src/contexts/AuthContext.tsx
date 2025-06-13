// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/common';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios mock para desarrollo
const MOCK_USERS: User[] = [
    {
        id: '1',
        name: 'Alexandra Torres',
        email: 'alexandra.torres@ingenieriacivil.com',
        role: 'admin',
        department: 'Gestión de Proyectos MEP',
        avatar: '/avatar-placeholder.jpg',
        isActive: true,
    },
    {
        id: '2',
        name: 'Piero Fernández',
        email: 'piero.fernandez@subcontratista.com',
        role: 'subcontractor',
        department: 'Sistemas Mecánicos',
        avatar: '/avatar-placeholder.jpg',
        isActive: true,
    },
    {
        id: '3',
        name: 'Bryan Vargas',
        email: 'bryan.vargas@subcontratista.com',
        role: 'subcontractor',
        department: 'Plomería',
        avatar: '/avatar-placeholder.jpg',
        isActive: true,
    }
];

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simular verificación de autenticación al cargar
        const checkAuth = () => {
            const savedUser = localStorage.getItem('civil_eng_user');
            if (savedUser) {
                try {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                } catch (error) {
                    console.error('Error parsing saved user:', error);
                    localStorage.removeItem('civil_eng_user');
                }
            }
            setIsLoading(false);
        };

        // Simular delay de red
        setTimeout(checkAuth, 500);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);

        // Simular llamada a API
        return new Promise((resolve) => {
            setTimeout(() => {
                // Buscar usuario por email
                let selectedUser = null;
                
                if (email === 'alexandra.torres@ingenieriacivil.com' && password === 'admin123') {
                    selectedUser = MOCK_USERS[0]; // Alexandra (admin)
                } else if (email === 'piero.fernandez@subcontratista.com' && password === 'sub123') {
                    selectedUser = MOCK_USERS[1]; // Piero (subcontractor)
                } else if (email === 'bryan.vargas@subcontratista.com' && password === 'sub123') {
                    selectedUser = MOCK_USERS[2]; // Bryan (subcontractor)
                } else if (email === 'admin@civil.com' && password === 'admin123') {
                    selectedUser = MOCK_USERS[0]; // Default admin
                }

                if (selectedUser) {
                    setUser(selectedUser);
                    localStorage.setItem('civil_eng_user', JSON.stringify(selectedUser));
                    setIsLoading(false);
                    resolve(true);
                } else {
                    setIsLoading(false);
                    resolve(false);
                }
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('civil_eng_user');
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        logout,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}