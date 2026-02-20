"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, CreditCard, ChevronRight, X } from "lucide-react";
import { Worker, Service } from "../../types";
import { clsx } from "clsx";
import DynamicPricing from "./DynamicPricing";

interface BookingPanelProps {
    service: Service;
    worker?: Worker;
    onClose: () => void;
    onConfirm: () => void;
}

export default function BookingPanel({ service, worker, onClose, onConfirm }: BookingPanelProps) {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-md glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 neon-glow"
            >
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-cyan-950/30">
                    <h2 className="text-lg font-bold text-cyan-400">Book {service.name}</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 1 && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 bg-slate-800/50 rounded-xl border border-white/5">
                                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                                    {worker?.avatar || "👤"}
                                </div>
                                <div>
                                    <p className="text-sm text-slate-400">Professional</p>
                                    <p className="font-bold text-white">{worker?.name || "Any Available Pro"}</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-400 uppercase">Select Date</label>
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {['Today', 'Tomorrow', 'Sat 18', 'Sun 19'].map((d, i) => (
                                        <button
                                            key={d}
                                            onClick={() => setDate(d)}
                                            className={clsx(
                                                "px-4 py-2 rounded-lg text-sm border transition-all whitespace-nowrap",
                                                date === d
                                                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                                    : "bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700"
                                            )}
                                        >
                                            {d}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs text-slate-400 uppercase">Select Time</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setTime(t)}
                                            className={clsx(
                                                "py-2 rounded-lg text-sm border transition-all",
                                                time === t
                                                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                                    : "bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700"
                                            )}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                disabled={!date || !time}
                                onClick={() => setStep(2)}
                                className="w-full mt-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                            >
                                Continue <ChevronRight size={18} />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-xs text-slate-400 uppercase">Pricing Breakdown</p>
                                <DynamicPricing
                                    basePrice={service.basePrice}
                                    multiplier={1.2} // Mock multiplier
                                    isEmergency={false} // Mock state
                                />
                            </div>

                            <button
                                onClick={onConfirm}
                                className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold py-3 rounded-xl neon-glow transition-all active:scale-95 flex items-center justify-center gap-2"
                            >
                                <CreditCard size={18} /> Confirm Booking
                            </button>

                            <button
                                onClick={() => setStep(1)}
                                className="w-full text-slate-400 hover:text-white text-sm"
                            >
                                Back
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
