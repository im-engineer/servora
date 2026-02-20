import { create } from 'zustand';
import { Zap, Wrench, Truck, Home, Smartphone, Leaf, LucideIcon } from "lucide-react";

export type ViewType = 'map' | 'search' | 'booking' | 'chat' | 'profile' | 'emergency';

export interface ServiceItem {
    id: string;
    label: string;
    icon: any;
    color: string;
    bg: string;
    type: string;
    available: boolean;
    count: number;
    name?: string; // Optional for backward compatibility if needed, but label is preferred
}

interface UIState {
    activeView: ViewType;
    setView: (view: ViewType) => void;

    services: ServiceItem[];
    addService: (service: ServiceItem) => void;
}

export const useUIStore = create<UIState>((set) => ({
    activeView: 'map',
    setView: (view) => set({ activeView: view }),

    services: [
        { id: '1', label: 'Plumbing', icon: Wrench, color: 'text-cyan-400', bg: 'bg-cyan-500/20', type: 'plumber', available: true, count: 12 },
        { id: '2', label: 'Electrical', icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-500/20', type: 'electrician', available: true, count: 8 },
        { id: '3', label: 'Cleaning', icon: Home, color: 'text-green-400', bg: 'bg-green-500/20', type: 'cleaning', available: true, count: 15 },
        { id: '4', label: 'Moving', icon: Truck, color: 'text-purple-400', bg: 'bg-purple-500/20', type: 'moving', available: true, count: 5 },
        { id: '5', label: 'Tech Support', icon: Smartphone, color: 'text-blue-400', bg: 'bg-blue-500/20', type: 'tech', available: true, count: 20 },
        { id: '6', label: 'Landscaping', icon: Leaf, color: 'text-emerald-400', bg: 'bg-emerald-500/20', type: 'garden', available: true, count: 6 },
    ],
    addService: (service) => set((state) => ({ services: [...state.services, service] })),
}));
