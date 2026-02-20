export type UserRole = 'user' | 'worker' | 'admin';

export interface User {
    id: string;
    name: string;
    avatar: string;
    role: UserRole;
    location: { lat: number; lng: number };
}

export interface Service {
    id: string;
    name: string;
    category: string;
    basePrice: number;
    icon: string; // lucide icon name
    description: string;
}

export interface Worker {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    jobsCompleted: number;
    status: 'available' | 'busy' | 'offline';
    location: { lat: number; lng: number };
    services: string[]; // Service IDs
    distance?: number; // Calculated distance from user
}

export interface Booking {
    id: string;
    userId: string;
    workerId: string;
    serviceId: string;
    status: 'pending' | 'accepted' | 'started' | 'completed' | 'cancelled';
    totalPrice: number;
    timestamp: number;
    location: { lat: number; lng: number };
}
