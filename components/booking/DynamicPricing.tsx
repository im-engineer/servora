"use client";

import { motion } from "framer-motion";
import { TrendingUp, Zap, Clock, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { Service } from "../../types";

interface DynamicPricingProps {
    basePrice: number;
    multiplier?: number;
    isEmergency?: boolean;
}

export default function DynamicPricing({ basePrice, multiplier = 1.0, isEmergency = false }: DynamicPricingProps) {
    const [total, setTotal] = useState(basePrice);

    // Simulate calculation animation
    useEffect(() => {
        let target = basePrice * multiplier;
        if (isEmergency) target += 20; // Emergency surcharge

        // Animate numbers (simple implementation)
        const interval = setInterval(() => {
            setTotal(prev => {
                const diff = target - prev;
                if (Math.abs(diff) < 0.5) return target;
                return prev + diff * 0.2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [basePrice, multiplier, isEmergency]);

    return (
        <div className="p-4 bg-slate-800/50 rounded-xl border border-white/5 space-y-3">
            <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300">Base Rate</span>
                <span className="font-mono text-white">${basePrice.toFixed(2)}</span>
            </div>

            {multiplier > 1 && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center text-sm text-orange-400"
                >
                    <span className="flex items-center gap-1"><TrendingUp size={14} /> Peak Demand</span>
                    <span className="font-mono">x{multiplier.toFixed(1)}</span>
                </motion.div>
            )}

            {isEmergency && (
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center text-sm text-red-400"
                >
                    <span className="flex items-center gap-1"><ShieldAlert size={14} /> Priority Surcharge</span>
                    <span className="font-mono text-red-400">+$20.00</span>
                </motion.div>
            )}

            <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                <span className="text-slate-200 font-bold">Estimated Total</span>
                <motion.span
                    key={total}
                    initial={{ scale: 1.1, color: '#fff' }}
                    animate={{ scale: 1, color: '#22d3ee' }}
                    className="font-mono text-xl font-bold text-cyan-400"
                >
                    ${total.toFixed(2)}
                </motion.span>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-2 justify-end">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-[10px] text-cyan-500 uppercase tracking-wider">Live Pricing</span>
            </div>
        </div>
    );
}
