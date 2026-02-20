"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Ambulance, Flame, Phone, AlertTriangle } from "lucide-react";
import { useEmergency } from "../../store/EmergencyContext";
import { clsx } from "clsx";

export default function EmergencyView() {
    const { isEmergency, toggleEmergency } = useEmergency();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm pointer-events-auto"
        >
            <div className="w-full max-w-lg">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-4 animate-pulse">
                        <ShieldAlert size={40} className="text-red-500" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Emergency Assistance</h2>
                    <p className="text-slate-400">Select the type of emergency to alert nearby units.</p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <EmergencyButton icon={Ambulance} label="Medical" color="bg-red-500" />
                    <EmergencyButton icon={Flame} label="Fire" color="bg-orange-500" />
                    <EmergencyButton icon={ShieldAlert} label="Police" color="bg-blue-600" />
                    <EmergencyButton icon={AlertTriangle} label="Disaster" color="bg-yellow-500" text="text-black" />
                </div>

                <div className="glass-panel p-6 rounded-2xl border-t-4 border-red-500 text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Global Emergency Mode</h3>
                    <p className="text-sm text-slate-400 mb-6">
                        Activating this will alert all nearby service providers and override standard routing.
                    </p>

                    <button
                        onClick={toggleEmergency}
                        className={clsx(
                            "w-full py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-3",
                            isEmergency
                                ? "bg-slate-800 text-red-500 border border-red-500"
                                : "bg-red-600 hover:bg-red-500 text-white shadow-red-600/30"
                        )}
                    >
                        <Phone className={isEmergency ? "animate-none" : "animate-bounce"} />
                        {isEmergency ? "DEACTIVATE ALERT" : "ACTIVATE SOS BEACON"}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}

function EmergencyButton({ icon: Icon, label, color, text = "text-white" }: any) {
    return (
        <button className={`group relative overflow-hidden rounded-xl p-6 flex flex-col items-center justify-center gap-3 transition-transform active:scale-95 hover:brightness-110 ${color}`}>
            <Icon size={32} className={text} />
            <span className={`font-bold ${text}`}>{label}</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
    )
}
