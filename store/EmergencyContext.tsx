"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface EmergencyContextType {
    isEmergency: boolean;
    toggleEmergency: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export function EmergencyProvider({ children }: { children: ReactNode }) {
    const [isEmergency, setIsEmergency] = useState(false);

    const toggleEmergency = () => setIsEmergency(prev => !prev);

    return (
        <EmergencyContext.Provider value={{ isEmergency, toggleEmergency }}>
            {/* 
         We can inject global styles or classes here if needed, 
         but for now we'll just provide the state 
      */}
            {children}
        </EmergencyContext.Provider>
    );
}

export function useEmergency() {
    const context = useContext(EmergencyContext);
    if (context === undefined) {
        throw new Error("useEmergency must be used within an EmergencyProvider");
    }
    return context;
}
