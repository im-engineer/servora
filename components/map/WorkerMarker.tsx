"use client";

import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Worker } from "../../types";
import { clsx } from "clsx";

interface WorkerMarkerProps {
    worker: Worker;
    onClick: (worker: Worker) => void;
}

const createCustomIcon = (worker: Worker) => {
    const color = worker.status === 'available' ? '#06B6D4' :
        worker.status === 'busy' ? '#F97316' : '#64748B';

    // Custom HTML for the icon to support CSS animations
    const html = `
    <div class="relative w-8 h-8 flex items-center justify-center">
      <div class="absolute inset-0 rounded-full border-2 border-white/20" style="background-color: ${color}20"></div>
      <div class="absolute inset-0 rounded-full animate-ping opacity-75" style="background-color: ${color}40"></div>
      <div class="relative w-4 h-4 rounded-full border-2 border-slate-900 shadow-lg" style="background-color: ${color}"></div>
    </div>
  `;

    return L.divIcon({
        html,
        className: "custom-marker-icon", // We'll need to ensure this class doesn't conflict or add size
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });
};

export default function WorkerMarker({ worker, onClick }: WorkerMarkerProps) {
    return (
        <Marker
            position={[worker.location.lat, worker.location.lng]}
            icon={createCustomIcon(worker)}
            eventHandlers={{
                click: () => onClick(worker),
            }}
        >
            <Popup className="glass-popup">
                <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden">
                            {/* Avatar placeholder */}
                            <div className="w-full h-full bg-slate-800" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-slate-100">{worker.name}</h3>
                            <p className="text-xs text-slate-500 capitalize">{worker.status}</p>
                        </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                        ⭐ {worker.rating} • {worker.jobsCompleted} jobs
                    </p>
                </div>
            </Popup>
        </Marker>
    );
}
