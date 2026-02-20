"use client";

import { useAuthStore } from "../../store/useAuthStore";
import { useWorkerStore } from "../../store/useWorkerStore";
import { motion } from "framer-motion";
import { User, Settings, LogOut, DollarSign, Star, Briefcase, CreditCard, Shield, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ProfileView() {
    const { user, logout } = useAuthStore();
    const { earnings, rating, completedJobs } = useWorkerStore();
    const isWorker = user?.role === 'worker';

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm pointer-events-auto"
        >
            <div className="w-full max-w-md glass-panel p-8 rounded-2xl border border-white/10 relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 shadow-xl flex items-center justify-center mb-4">
                        <User size={40} className="text-slate-400" />
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-1">{user?.name || 'Guest User'}</h2>
                    <p className="text-cyan-400 text-sm uppercase tracking-widest mb-8">{user?.role || 'Visitor'}</p>

                    {/* Worker Stats - Only for Workers */}
                    {isWorker ? (
                        <div className="grid grid-cols-3 gap-4 w-full mb-8">
                            <div className="bg-slate-800/50 p-4 rounded-xl text-center">
                                <DollarSign size={20} className="mx-auto text-green-400 mb-2" />
                                <div className="text-xl font-bold text-white">${earnings}</div>
                                <div className="text-[10px] text-slate-400 uppercase">Earnings</div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl text-center">
                                <Star size={20} className="mx-auto text-yellow-400 mb-2" />
                                <div className="text-xl font-bold text-white">{rating}</div>
                                <div className="text-[10px] text-slate-400 uppercase">Rating</div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl text-center">
                                <Briefcase size={20} className="mx-auto text-purple-400 mb-2" />
                                <div className="text-xl font-bold text-white">{completedJobs}</div>
                                <div className="text-[10px] text-slate-400 uppercase">Jobs</div>
                            </div>
                        </div>
                    ) : (
                        // User Stats/Quick info
                        <div className="grid grid-cols-2 gap-4 w-full mb-8">
                            <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                                    <Briefcase size={20} />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-white">4</div>
                                    <div className="text-[10px] text-slate-400 uppercase">Active Bookings</div>
                                </div>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3 border border-white/5">
                                <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                    <Star size={20} />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-white">4.8</div>
                                    <div className="text-[10px] text-slate-400 uppercase">User Rating</div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="w-full space-y-4">
                        {/* Wallet Section - Differentiated */}
                        <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                                    <CreditCard size={16} /> {isWorker ? 'Earnings Wallet' : 'Payment Methods'}
                                </h3>
                                <span className="text-xs text-green-400">{isWorker ? '+12% vs last week' : 'Primary: Visa **** 4242'}</span>
                            </div>

                            {isWorker ? (
                                <>
                                    <div className="text-2xl font-bold text-white font-mono">${earnings + 1500}</div>
                                    <div className="flex gap-2 mt-3">
                                        <button className="flex-1 bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 text-xs py-2 rounded-lg transition-colors border border-cyan-500/20">
                                            Cash Out
                                        </button>
                                        <button className="flex-1 bg-white/5 hover:bg-white/10 text-slate-300 text-xs py-2 rounded-lg transition-colors border border-white/5">
                                            History
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex gap-2 mt-2">
                                        <div className="flex-1 p-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                                            <span className="font-bold text-slate-300">Visa</span>
                                        </div>
                                        <div className="flex-1 p-2 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center">
                                            <span className="font-bold text-slate-300">Apple Pay</span>
                                        </div>
                                        <button className="p-2 bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30">
                                            <Settings size={18} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="space-y-2">
                            <ProfileItem icon={Settings} label="Settings" onClick={() => toast.info("Settings panel coming soon")} />
                            <ProfileItem icon={Shield} label="Security & Privacy" onClick={() => toast.info("Security Settings coming soon")} />
                            <ProfileItem icon={MessageSquare} label="Help & Support" onClick={() => toast.info("Support ticket created")} />
                        </div>

                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors mt-2 border border-transparent hover:border-red-500/20"
                        >
                            <div className="p-2 bg-slate-800 rounded-lg"><LogOut size={20} /></div>
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function ProfileItem({ icon: Icon, label, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 text-slate-300 transition-colors border border-transparent hover:border-white/5"
        >
            <div className="p-2 bg-slate-800 rounded-lg text-cyan-400"><Icon size={20} /></div>
            <span className="font-medium">{label}</span>
        </button>
    )
}
