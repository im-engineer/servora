import { create } from 'zustand';
import { Service, Worker } from '../types';

interface BookingState {
    isOpen: boolean;
    selectedService: Service | null;
    selectedWorker: Worker | null;
    openBooking: (service: Service, worker?: Worker) => void;
    closeBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
    isOpen: false,
    selectedService: null,
    selectedWorker: null,
    openBooking: (service, worker) => set({ isOpen: true, selectedService: service, selectedWorker: worker || null }),
    closeBooking: () => set({ isOpen: false, selectedService: null, selectedWorker: null }),
}));
