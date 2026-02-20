"use client";

import { useEmergency } from "../../store/EmergencyContext";
import { clsx } from "clsx";
import { Zap, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function EmergencyToggle() {
    const { isEmergency, toggleEmergency } = useEmergency();

    return (
        <div className="fixed top-24 right-4 z-50 pointer-events-auto">
            <button
                onClick={toggleEmergency}
                className={clsx(
                    "relative group flex items-center justify-center w-14 h-14 rounded-full transition-all duration-500 shadow-xl border border-white/10",
                    isEmergency
                        ? "bg-red-600 shadow-[0_0_30px_red] animate-pulse"
                        : "bg-slate-800/80 hover:bg-slate-700 glass-panel"
                )}
            >
                <Zap
                    size={24}
                    className={clsx("transition-transform duration-300", isEmergency ? "text-white scale-125" : "text-slate-400 group-hover:text-cyan-400")}
                />

                {isEmergency && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1.5 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="absolute inset-0 rounded-full border-2 border-red-500 opacity-0"
                    />
                )}
            </button>

            {isEmergency && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full right-0 mt-2 bg-red-950/90 border border-red-500/30 text-red-200 text-xs p-2 rounded-lg whitespace-nowrap shadow-xl backdrop-blur-md"
                >
                    <div className="flex items-center gap-2 font-bold">
                        <AlertTriangle size={12} /> EMERGENCY MODE ACTIVE
                    </div>
                    <div className="text-[10px] opacity-75 mt-1">
                        Priority dispatch enabled.<br />Prices surged.
                    </div>
                </motion.div>
            )}
        </div>
    );
}
