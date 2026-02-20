"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

// Simulation events
const EVENTS = [
    { type: 'booking_update', message: 'Worker accepted your request', role: 'user' },
    { type: 'location_update', message: 'Worker is 2 mins away', role: 'user' },
    { type: 'system_alert', message: 'Heavy rain in your area. Demand surging.', role: 'all' },
    { type: 'job_offer', message: 'New Urgent Job: Pipe burst (0.5 miles)', role: 'worker' },
    { type: 'payment', message: 'Payment received: $120.00', role: 'worker' },
    { type: 'admin_alert', message: 'Suspicious activity detected in Zone 4', role: 'admin' },
];

export function useSocket() {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Simulate connection
        const timer = setTimeout(() => setIsConnected(true), 1000);

        // Simulate random events
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];

                // In a real app we'd filter by role here or on server
                // For demo, we just toast random things occasionally to show "liveness"
                toast(event.message, {
                    description: new Date().toLocaleTimeString(),
                    action: {
                        label: 'View',
                        onClick: () => console.log('View event', event)
                    }
                });
            }
        }, 10000); // Every 10 seconds

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return { isConnected };
}
