"use client";

import { motion } from "framer-motion";
import { Navigation, Phone, MessageSquare, CheckCircle, Clock, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { useWorkerStore } from "../../store/useWorkerStore";
import { toast } from "sonner";

export default function ActiveJobPanel() {
    const { activeJob, jobStatus, updateJobStatus, completeJob } = useWorkerStore();
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => setElapsed(e => e + 1), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (sec: number) => {
        const m = Math.floor(sec / 60).toString().padStart(2, '0');
        const s = (sec % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    if (!activeJob) return null;

    return (
        <div className="fixed bottom-24 left-4 right-4 z-40 pointer-events-auto">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass-panel p-5 rounded-2xl border border-cyan-500/30 neon-glow"
            >
                {/* Header Status */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <span className="text-xs text-slate-400 uppercase tracking-wider">Current Status</span>
                        <div className="flex items-center gap-2">
                            <span className="relative flex h-3 w-3">
                                <span className={clsx("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                                    jobStatus === 'driving' ? 'bg-cyan-400' : 'bg-green-400')}></span>
                                <span className={clsx("relative inline-flex rounded-full h-3 w-3",
                                    jobStatus === 'driving' ? 'bg-cyan-500' : 'bg-green-500')}></span>
                            </span>
                            <h2 className="text-lg font-bold text-white">
                                {jobStatus === 'driving' ? 'En Route' : 'Working'}
                            </h2>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-slate-400 uppercase tracking-wider">Timer</div>
                        <div className="font-mono text-xl text-cyan-400 font-bold">{formatTime(elapsed)}</div>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-slate-800/50 rounded-xl">
                    <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-xl">
                        👩
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-white">{activeJob.customer}</h3>
                        <p className="text-xs text-slate-400">{activeJob.address}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => toast.info(`Calling ${activeJob.customer}...`)}
                            className="p-2 bg-slate-700 hover:bg-cyan-600 rounded-full transition-colors text-white"
                        >
                            <Phone size={18} />
                        </button>
                        <button
                            onClick={() => toast.info("Opening secure chat channel...")}
                            className="p-2 bg-slate-700 hover:bg-cyan-600 rounded-full transition-colors text-white"
                        >
                            <MessageSquare size={18} />
                        </button>
                    </div>
                </div>

                {/* Secure Payment & Actions */}
                <div className="flex items-center gap-2 mb-4 text-xs text-green-400 bg-green-900/20 p-2 rounded-lg border border-green-500/20">
                    <Shield size={12} />
                    <span>Payment secured by Servora Escrow</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 gap-3">
                    {jobStatus === 'driving' && (
                        <button
                            onClick={() => updateJobStatus('working')}
                            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(8,145,178,0.3)]"
                        >
                            <CheckCircle size={20} /> Mark Arrived & Start Job
                        </button>
                    )}

                    {jobStatus === 'working' && (
                        <button
                            onClick={() => {
                                completeJob();
                                toast.success(`Job Completed! Earnings updated.`);
                            }}
                            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(22,163,74,0.3)]"
                        >
                            <CheckCircle size={20} /> Complete Job (+${activeJob.price})
                        </button>
                    )}

                    {jobStatus === 'driving' && (
                        <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-white/5">
                            <Navigation size={18} /> Navigation Route
                        </button>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
