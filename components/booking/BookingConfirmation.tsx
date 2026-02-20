"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface BookingConfirmationProps {
    onComplete: () => void;
}

export default function BookingConfirmation({ onComplete }: BookingConfirmationProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md"
        >
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-24 h-24 mx-auto bg-cyan-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_cyan]"
                >
                    <Check size={48} className="text-slate-900" />
                </motion.div>

                <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white mb-2"
                >
                    Booking Confirmed
                </motion.h2>

                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-slate-400 mb-8"
                >
                    Your professional is on the way.
                </motion.p>

                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={onComplete}
                    className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-full border border-white/10 transition-colors"
                >
                    Return to Map
                </motion.button>
            </div>
        </motion.div>
    );
}
