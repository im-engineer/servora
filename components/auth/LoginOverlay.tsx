"use client";

import { motion } from "framer-motion";
import { User, Briefcase, ShieldCheck, ArrowRight } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";
import { clsx } from "clsx";
import { useState } from "react";

export default function LoginOverlay() {
    const login = useAuthStore(state => state.login);
    const [selectedRole, setSelectedRole] = useState<'user' | 'worker' | 'admin'>('user');

    const handleLogin = () => {
        login(selectedRole);
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 bg-grid-pattern">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-cyan-900/20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md p-8 glass-panel rounded-2xl border border-white/10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-cyan-400 neon-text tracking-widest mb-2">SERVORA</h1>
                    <p className="text-slate-400 text-sm uppercase tracking-wide">Smart Service Ecosystem Access</p>
                </div>

                <div className="space-y-4 mb-8">
                    <RoleOption
                        role="user"
                        icon={User}
                        label="Resident"
                        desc="Book services & request help"
                        selected={selectedRole === 'user'}
                        onClick={() => setSelectedRole('user')}
                    />
                    <RoleOption
                        role="worker"
                        icon={Briefcase}
                        label="Service Provider"
                        desc="Accept jobs & manage gigs"
                        selected={selectedRole === 'worker'}
                        onClick={() => setSelectedRole('worker')}
                    />
                    <RoleOption
                        role="admin"
                        icon={ShieldCheck}
                        label="System Command"
                        desc="Monitor city operations"
                        selected={selectedRole === 'admin'}
                        onClick={() => setSelectedRole('admin')}
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] group"
                >
                    <span>Initialize Session</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
            </motion.div>
        </div>
    );
}

function RoleOption({ role, icon: Icon, label, desc, selected, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 text-left",
                selected
                    ? "bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
            )}
        >
            <div className={clsx(
                "p-3 rounded-lg transition-colors",
                selected ? "bg-cyan-500 text-white" : "bg-slate-800 text-slate-400"
            )}>
                <Icon size={24} />
            </div>
            <div>
                <h3 className={clsx("font-bold text-lg", selected ? "text-white" : "text-slate-300")}>{label}</h3>
                <p className="text-xs text-slate-500">{desc}</p>
            </div>
        </button>
    );
}
