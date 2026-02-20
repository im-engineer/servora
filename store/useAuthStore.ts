"use client";

import { create } from 'zustand';

type Role = 'user' | 'worker' | 'admin';

interface User {
    id: string;
    name: string;
    role: Role;
    avatar?: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    login: (role: Role) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    login: (role: Role) => {
        // Mock login logic
        const mockUser: User = {
            id: '1',
            name: role === 'admin' ? 'Commander Shepard' : role === 'worker' ? 'Bob the Builder' : 'Alex Mercer',
            role: role,
        };
        set({ isAuthenticated: true, user: mockUser });
    },
    logout: () => set({ isAuthenticated: false, user: null }),
}));
