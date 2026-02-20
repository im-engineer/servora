"use client";

import { create } from 'zustand';

export type UserRole = 'user' | 'worker' | 'admin';

export interface SystemUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    status: 'active' | 'suspended';
    department?: string; // For workers (e.g., Plumbing, Electrical)
    avatar?: string;
}

interface UserState {
    users: SystemUser[];
    addUser: (user: Omit<SystemUser, 'id' | 'status'>) => void;
    updateUser: (id: string, updates: Partial<SystemUser>) => void;
    deleteUser: (id: string) => void;
    toggleStatus: (id: string) => void;
}

const mockUsers: SystemUser[] = [
    { id: '1', name: 'Alex Mercer', email: 'alex@servora.com', role: 'user', status: 'active' },
    { id: '2', name: 'Bob Builder', email: 'bob@servora.com', role: 'worker', department: 'Construction', status: 'active' },
    { id: '3', name: 'Commander Shepard', email: 'admin@servora.com', role: 'admin', status: 'active' },
    { id: '4', name: 'Sarah Connor', email: 'sarah@servora.com', role: 'user', status: 'suspended' },
    { id: '5', name: 'Mario Rossi', email: 'mario@plumber.com', role: 'worker', department: 'Plumbing', status: 'active' },
];

export const useUserStore = create<UserState>((set) => ({
    users: mockUsers,

    addUser: (userData) => set((state) => ({
        users: [...state.users, {
            ...userData,
            id: Math.random().toString(36).substr(2, 9),
            status: 'active'
        }]
    })),

    updateUser: (id, updates) => set((state) => ({
        users: state.users.map(u => u.id === id ? { ...u, ...updates } : u)
    })),

    deleteUser: (id) => set((state) => ({
        users: state.users.filter(u => u.id !== id)
    })),

    toggleStatus: (id) => set((state) => ({
        users: state.users.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u)
    }))
}));
