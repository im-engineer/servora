"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Target, Zap, Wrench, Truck, Home, Smartphone, X, Plus } from "lucide-react";
import { clsx } from "clsx";
import { useUIStore, ServiceItem } from "../../store/useUIStore";
import { toast } from "sonner";

export default function ServiceRadar() {
    const [isOpen, setIsOpen] = useState(false);
    const { services, addService } = useUIStore();

    const handleServiceClick = (service: ServiceItem) => {
        toast.info(`Selected ${service.label}`, {
            description: "Searching for available workers..."
        });
        setIsOpen(false);
    }

    const handleAddService = () => {
        const newService = {
            id: `custom-${Date.now()}`,
            icon: Zap,
            label: 'New Service',
            color: 'text-white',
            bg: 'bg-white/10',
            type: 'custom',
            available: true,
            count: 1
        };
        addService(newService);
        toast.success("New Service Slot Added");
    }

    return (
        <div className="absolute bottom-24 right-4 z-50 pointer-events-auto">
            <div className="relative flex items-center justify-center w-64 h-64 pointer-events-none">
                {/* Radar Button */}
                <div className="absolute bottom-0 right-0 pointer-events-auto">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={clsx(
                            "w-16 h-16 rounded-full glass-panel neon-glow flex items-center justify-center transition-all duration-300 z-50",
                            isOpen ? "bg-cyan-500/20 rotate-45" : "hover:bg-slate-800"
                        )}
                    >
                        {isOpen ? <X className="text-cyan-400" /> : <Target className="text-cyan-400 animate-spin-slow" />}
                    </button>
                </div>

                {/* Radial Menu Items */}
                <AnimatePresence>
                    {isOpen && services.map((service, index) => {
                        // Calculate angle for radial distribution
                        const angle = (index / (services.length)) * 90; // Distributed over 90 degrees
                        const radius = 100; // Distance from center button
                        const radian = (angle * Math.PI) / 180;
                        const x = -Math.cos(radian) * radius;
                        const y = -Math.sin(radian) * radius;

                        return (
                            <motion.button
                                key={service.id}
                                onClick={() => handleServiceClick(service)}
                                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                animate={{ x, y, opacity: 1, scale: 1 }}
                                exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    delay: index * 0.05
                                }}
                                className={clsx(
                                    "absolute bottom-2 right-2 w-12 h-12 rounded-full glass-panel flex items-center justify-center pointer-events-auto group",
                                    service.bg
                                )}
                            >
                                <service.icon size={20} className={service.color} />

                                {/* Tooltip */}
                                <span className="absolute right-full mr-2 bg-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                    {service.label}
                                </span>
                            </motion.button>
                        );
                    })}

                    {/* Add Button (Dynamic) */}
                    {isOpen && (
                        <motion.button
                            onClick={handleAddService}
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                            animate={{ x: -140, y: 0, opacity: 1, scale: 0.8 }} // Positioned clearly
                            exit={{ opacity: 0 }}
                            className="absolute bottom-2 right-2 w-10 h-10 rounded-full border border-white/20 bg-slate-800 hover:bg-white/10 flex items-center justify-center pointer-events-auto text-slate-400 hover:text-white"
                        >
                            <Plus size={18} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
