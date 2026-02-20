import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Users, Map, Settings, LogOut, Bell, Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

import { useAuthStore } from "../../store/useAuthStore";

import dynamic from 'next/dynamic';
import UserManagement from "./UserManagement";
import AdminSettings from "./AdminSettings";

// Reusing the global map for Admin view, dynamically imported to avoid SSR window error
const CityMap = dynamic(() => import('../map/CityMap'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-slate-900 animate-pulse flex items-center justify-center text-slate-500 text-sm">Loading Map Engine...</div>
});

const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
    { id: 'map', icon: Map, label: 'Live Map' },
    { id: 'users', icon: Users, label: 'Users & Workers' },
    { id: 'settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [active, setActive] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(false); // Mobile state
    const logout = useAuthStore(state => state.logout);

    // Filter children based on active tab
    // Ideally we'd use a routing solution but for this single-page dashboard we'll switch components
    const renderContent = () => {
        switch (active) {
            case 'users':
                return <UserManagement />;
            case 'settings':
                return <AdminSettings />;
            case 'map':
                return (
                    <div className="h-[calc(100vh-8rem)] w-full rounded-2xl overflow-hidden border border-white/10 relative">
                        <CityMap />
                        <div className="absolute top-4 left-4 z-[1000] bg-slate-900/80 backdrop-blur p-4 rounded-xl border border-white/10">
                            <h3 className="text-white font-bold">Live Fleet Tracking</h3>
                            <p className="text-xs text-slate-400">Real-time worker positions</p>
                        </div>
                    </div>
                );
            case 'dashboard':
            default:
                return children;
        }
    };

    return (
        <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/80 backdrop-blur-md border-b border-white/5 z-50 flex items-center justify-between px-4">
                <div className="font-bold text-cyan-400 tracking-widest">SERVORA OS</div>
                <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-white">
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar - Desktop & Mobile */}
            <AnimatePresence>
                {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
                    <motion.aside
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        className={clsx(
                            "fixed lg:relative inset-y-0 left-0 w-64 glass-panel border-r border-white/5 flex flex-col z-[60] bg-slate-950/95 lg:bg-transparent lg:translate-x-0 transition-transform",
                            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                        )}
                    >
                        {/* Branding */}
                        <div className="h-20 hidden lg:flex items-center justify-center border-b border-white/5">
                            <h1 className="text-2xl font-bold text-cyan-400 tracking-widest neon-text">
                                SERVORA
                                <span className="text-[10px] text-slate-400 block tracking-[0.3em] font-normal text-center">ADMIN OS</span>
                            </h1>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-2 mt-16 lg:mt-0">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActive(item.id);
                                        setSidebarOpen(false);
                                    }}
                                    className={clsx(
                                        "w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                                        active === item.id
                                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                    )}
                                >
                                    <item.icon size={20} className={active === item.id ? "text-cyan-400" : "group-hover:text-white"} />
                                    <span className="font-medium">{item.label}</span>
                                    {active === item.id && (
                                        <motion.div layoutId="admin-active" className="ml-auto w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                                    )}
                                </button>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-white/5">
                            <button
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors"
                            >
                                <LogOut size={20} />
                                <span>Logout</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden pt-16 lg:pt-0">
                {/* Header - Desktop */}
                <header className="hidden lg:flex h-16 border-b border-white/5 items-center justify-between px-8 bg-slate-900/50 backdrop-blur-sm z-40">
                    <h2 className="font-bold text-lg text-white capitalize">{active.replace('-', ' ')}</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 animate-pulse">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            SYSTEM OPTIMAL
                        </div>
                        <button className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                        </button>
                    </div>
                </header>

                {/* Dynamic Content Background */}
                <div className="absolute inset-0 z-0 bg-grid-pattern opacity-10 pointer-events-none" />

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative z-10 scrollbar-thin">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
