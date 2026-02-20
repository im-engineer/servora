"use client";

import { motion } from "framer-motion";
import {
    Map,
    Search,
    Zap,
    MessageSquare,
    User,
    Settings
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

const navItems = [
    { id: 'map', icon: Map, label: 'Map' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'emergency', icon: Zap, label: 'Emergency', alert: true },
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'profile', icon: User, label: 'Profile' },
];

import { useAuthStore } from "../../store/useAuthStore";
import { useUIStore } from "../../store/useUIStore";

export default function NavigationDock() {
    const { activeView, setView } = useUIStore();
    const { user, login } = useAuthStore();

    const cycleRole = () => {
        const roles: ('user' | 'worker' | 'admin')[] = ['user', 'worker', 'admin'];
        const currentIdx = roles.indexOf(user?.role || 'user');
        const nextRole = roles[(currentIdx + 1) % roles.length];
        login(nextRole);
    };

    return (
        <div className="fixed bottom-6 w-full flex justify-center pointer-events-none z-50">
            <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="glass-panel px-6 py-3 rounded-2xl flex items-center gap-6 pointer-events-auto"
            >
                {navItems.map((item) => {
                    const isActive = activeView === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id as any)}
                            className={clsx(
                                "relative group p-3 rounded-xl transition-all duration-300",
                                isActive ? "bg-cyan-500/20 text-cyan-400" : "text-slate-400 hover:text-slate-100",
                                item.alert && "text-orange-500 hover:text-orange-400"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="active-nav"
                                    className="absolute inset-0 bg-cyan-500/10 rounded-xl"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <Icon size={24} className={clsx(item.alert && "animate-pulse")} />
                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                {item.label}
                            </span>
                        </button>
                    );
                })}

                <div className="w-px h-8 bg-white/10 mx-2" />

                <button
                    onClick={cycleRole}
                    className="flex flex-col items-center gap-1 text-[10px] text-slate-500 hover:text-cyan-400 transition-colors"
                >
                    <span className="px-2 py-0.5 bg-slate-800 rounded border border-white/5 uppercase font-bold tracking-wider">
                        {user?.role || 'GUEST'}
                    </span>
                    <span className="text-[9px] opacity-50">v2.1</span>
                </button>
            </motion.div>
        </div>
    );
}
