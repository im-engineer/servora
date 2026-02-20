"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Users, DollarSign, Zap } from "lucide-react";

// Mock Data
const data = [
    { name: '00:00', bookings: 40 },
    { name: '04:00', bookings: 30 },
    { name: '08:00', bookings: 200 },
    { name: '12:00', bookings: 278 },
    { name: '16:00', bookings: 189 },
    { name: '20:00', bookings: 239 },
    { name: '24:00', bookings: 100 },
];

export default function CommandCenter() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Active Jobs" value="124" icon={Activity} color="text-cyan-400" border="border-cyan-500/20" />
                <StatCard title="Online Workers" value="48" icon={Users} color="text-green-400" border="border-green-500/20" />
                <StatCard title="Daily Revenue" value="$12.4k" icon={DollarSign} color="text-purple-400" border="border-purple-500/20" />
                <StatCard title="Emergency Alerts" value="2" icon={Zap} color="text-red-400" border="border-red-500/20" alert />
            </div>

            {/* Charts & Heatmap Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-slate-200 mb-6">Live Booking Volume</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" stroke="#475569" />
                                <YAxis stroke="#475569" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                                    itemStyle={{ color: '#22d3ee' }}
                                />
                                <Area type="monotone" dataKey="bookings" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="glass-panel p-6 rounded-2xl border border-white/5">
                    <h3 className="text-lg font-bold text-slate-200 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3 text-sm p-3 hover:bg-white/5 rounded-lg transition-colors border-l-2 border-transparent hover:border-cyan-400"
                            >
                                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                                <div>
                                    <p className="text-slate-300">New booking for <span className="text-white font-bold">Plumbing</span></p>
                                    <p className="text-xs text-slate-500">2 minutes ago • Downtown</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Heatmap Area Placeholders */}
            <div className="glass-panel p-6 rounded-2xl border border-white/5 relative overflow-hidden h-96">
                <h3 className="text-lg font-bold text-slate-200 mb-4 absolute top-6 left-6 z-10">Real-time Demand Heatmap</h3>

                <div className="absolute inset-0 bg-slate-900">
                    {/* Simulate Heatmap with gradients */}
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full animate-pulse" />
                    <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 right-1/2 w-48 h-48 bg-orange-500/10 blur-[80px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                    {/* Grid Overlay */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                </div>

                <div className="absolute bottom-6 right-6 flex gap-4 text-xs z-10">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-cyan-500 rounded-full" /> High Demand</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-purple-500 rounded-full" /> Moderate</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-orange-500 rounded-full" /> Surge Pricing</div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, border, alert }: any) {
    return (
        <div className={`glass-panel p-6 rounded-2xl border ${border} relative overflow-hidden group`}>
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl bg-white/5 ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={24} />
                </div>
                {alert && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
            </div>
            <div className="text-3xl font-bold text-white mb-1 font-mono">{value}</div>
            <div className="text-xs text-slate-400 uppercase tracking-wider">{title}</div>
        </div>
    );
}
