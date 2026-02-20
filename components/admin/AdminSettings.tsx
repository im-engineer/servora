"use client";

import { motion } from "framer-motion";
import { Save, Bell, Lock, Globe, Moon } from "lucide-react";

export default function AdminSettings() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
        >
            <div className="glass-panel p-8 rounded-2xl border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Globe className="text-cyan-400" /> General Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-slate-400 text-sm">System Name</label>
                        <input type="text" value="Servora City OS" className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-cyan-500" readOnly />
                    </div>
                    <div className="space-y-2">
                        <label className="text-slate-400 text-sm">Timezone</label>
                        <select className="w-full bg-slate-800 border border-white/10 rounded-xl p-3 text-white outline-none">
                            <option>UTC-5 (Eastern Time)</option>
                            <option>UTC+0 (GMT)</option>
                            <option>UTC+1 (CET)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="glass-panel p-8 rounded-2xl border border-white/5">
                <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <Bell className="text-yellow-400" /> Notifications
                </h2>
                <div className="space-y-4">
                    {['Critical System Alerts', 'New User Registrations', 'Payment Failures'].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-white/5">
                            <span className="text-slate-300">{item}</span>
                            <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out bg-cyan-600 rounded-full cursor-pointer">
                                <span className="absolute left-6 top-1 w-4 h-4 bg-white rounded-full transition-transform transform translate-x-0"></span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(8,145,178,0.3)] transition-all">
                    <Save size={20} /> Save Changes
                </button>
            </div>
        </motion.div>
    );
}
