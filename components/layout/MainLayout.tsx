"use client";

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';

// Dynamically import Map to avoid SSR issues with Leaflet
const CityMap = dynamic(() => import('../map/CityMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900 animate-pulse" />
});

interface MainLayoutProps {
    children?: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-900 text-slate-100">
            {/* Background Map Layer */}
            <div className="absolute inset-0 z-0">
                <CityMap />
            </div>

            {/* Grid Overlay for "Tech" feel */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-grid-pattern opacity-30" />

            {/* UI Overlay Layer */}
            <div className="relative z-20 w-full h-full pointer-events-none">
                {/* Child components must enable pointer-events-auto themselves */}
                {children}
            </div>
        </div>
    );
}
