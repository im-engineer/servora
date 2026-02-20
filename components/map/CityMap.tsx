"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import WorkerMarker from "./WorkerMarker";

// Fix Leaflet marker icon issue in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png";

// Custom dark map styles (CartoDB Dark Matter)
const DARK_TILES = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';

export default function CityMap() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Client-side only fix for icons
        (async () => {
            // logic to fix icons if needed, or just relying on CDN
        })();
    }, []);

    if (!mounted) return <div className="w-full h-full bg-slate-900 animate-pulse" />;

    return (
        <MapContainer
            center={[40.7128, -74.0060]} // NYC Default
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-full z-0 outline-none"
            zoomControl={false} // We will add custom controls or hide them for immersion
        >
            <TileLayer
                attribution={ATTRIBUTION}
                url={DARK_TILES}
            />

            {/* Mock Workers */}
            {[
                { id: '1', name: 'John D.', role: 'worker', location: { lat: 40.7128, lng: -74.0060 }, status: 'available', rating: 4.8, jobsCompleted: 124, avatar: '', services: ['plumbing'] },
                { id: '2', name: 'Mike R.', role: 'worker', location: { lat: 40.7200, lng: -74.0100 }, status: 'busy', rating: 4.9, jobsCompleted: 89, avatar: '', services: ['electrical'] },
                { id: '3', name: 'Sarah L.', role: 'worker', location: { lat: 40.7150, lng: -73.9900 }, status: 'available', rating: 5.0, jobsCompleted: 45, avatar: '', services: ['cleaning'] },
            ].map((worker) => (
                // @ts-ignore - Dynamic import typing issue
                <WorkerMarker
                    key={worker.id}
                    worker={worker as any}
                    onClick={(w) => {
                        // Mock service for now, in real app we'd select service first or from worker
                        const mockService = {
                            id: 'srv-1',
                            name: w.services[0] ? w.services[0].charAt(0).toUpperCase() + w.services[0].slice(1) : 'Service',
                            category: 'General',
                            basePrice: 50,
                            icon: 'Wrench',
                            description: 'Standard service'
                        };
                        // We need to dynamic import store or pass handler. 
                        // For now let's just log. To make it work we need the store hook.
                        // But hooks inside callback? No. We need to use the store outside.
                        console.log("Worker clicked:", w);
                        window.dispatchEvent(new CustomEvent('open-booking', { detail: { worker: w, service: mockService } }));
                    }}
                />
            ))}
        </MapContainer>
    );
}
