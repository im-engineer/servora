"use client";

import { create } from 'zustand';

export interface Job {
    id: string;
    title: string;
    distance: string;
    price: number;
    time: string;
    customer: string;
    type: 'urgent' | 'standard';
    address: string;
}

interface WorkerState {
    isOnline: boolean;
    earnings: number;
    completedJobs: number;
    rating: number;

    jobs: Job[];
    activeJob: Job | null;
    jobStatus: 'driving' | 'working' | 'completed' | 'idle';

    toggleOnline: () => void;
    acceptJob: (jobId: string) => void;
    rejectJob: (jobId: string) => void;
    updateJobStatus: (status: 'driving' | 'working' | 'completed') => void;
    completeJob: () => void;
}

const mockJobsData: Job[] = [
    { id: '1', title: 'Leaking Pipe Repair', distance: '0.8 miles', price: 120, time: 'Now', customer: 'Alice M.', type: 'urgent', address: '123 Cyber Ave' },
    { id: '2', title: 'Faucet Installation', distance: '2.3 miles', price: 85, time: 'Today, 2pm', customer: 'Bob K.', type: 'standard', address: '456 Neon St' },
    { id: '3', title: 'Boiler Check', distance: '1.5 miles', price: 150, time: 'Tomorrow, 9am', customer: 'Charlie D.', type: 'standard', address: '789 Synth Blvd' },
    { id: '4', title: 'Emergency Locksmith', distance: '3.1 miles', price: 200, time: 'Now', customer: 'David L.', type: 'urgent', address: '101 Data Dr' },
];

export const useWorkerStore = create<WorkerState>((set, get) => ({
    isOnline: true,
    earnings: 1240,
    completedJobs: 14,
    rating: 4.9,

    jobs: mockJobsData,
    activeJob: null,
    jobStatus: 'idle',

    toggleOnline: () => set(state => ({ isOnline: !state.isOnline })),

    acceptJob: (jobId) => {
        const job = get().jobs.find(j => j.id === jobId);
        if (job) {
            set(state => ({
                activeJob: job,
                jobStatus: 'driving',
                jobs: state.jobs.filter(j => j.id !== jobId)
            }));
        }
    },

    rejectJob: (jobId) => {
        set(state => ({
            jobs: state.jobs.filter(j => j.id !== jobId)
        }));
    },

    updateJobStatus: (status) => set({ jobStatus: status }),

    completeJob: () => {
        const { activeJob, earnings, completedJobs } = get();
        if (activeJob) {
            set({
                activeJob: null,
                jobStatus: 'idle',
                earnings: earnings + activeJob.price,
                completedJobs: completedJobs + 1
            });
        }
    }
}));
