"use client";

import MainLayout from "../../components/layout/MainLayout";
import NavigationDock from "../../components/ui/NavigationDock";
import SearchPanel from "../../components/panels/SearchPanel";
import ServiceRadar from "../../components/panels/ServiceRadar";
import BookingOverlay from "../../components/booking/BookingOverlay";
import JobFeed from "../../components/worker/JobFeed";
import AdminLayout from "../../components/admin/AdminLayout";
import CommandCenter from "../../components/admin/CommandCenter";
import clsx from "clsx";
import { Toaster } from "sonner";
import { EmergencyProvider, useEmergency } from "../../store/EmergencyContext";
import EmergencyToggle from "../../components/modes/EmergencyToggle";
import { useSocket } from "../../hooks/useSocket";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../../store/useAuthStore";
import LoginOverlay from "../../components/auth/LoginOverlay";
import { useUIStore } from "../../store/useUIStore";
import ChatView from "../../components/views/ChatView";
import ProfileView from "../../components/views/ProfileView";
import EmergencyView from "../../components/views/EmergencyView";

export default function Home() {
  return (
    <EmergencyProvider>
      <HomeContent />
      <Toaster theme="dark" position="top-center" />
    </EmergencyProvider>
  );
}

function HomeContent() {
  const { isEmergency } = useEmergency();
  useSocket(); // Activate simulation

  const { isAuthenticated, user, logout } = useAuthStore();
  const { activeView } = useUIStore();
  const role = user?.role || 'user';

  if (!isAuthenticated) {
    return <LoginOverlay />;
  }

  return (
    <MainLayout>
      {role === 'admin' && (
        <div className="fixed inset-0 z-[100] bg-slate-950">
          <AdminLayout>
            <CommandCenter />
          </AdminLayout>
        </div>
      )}

      {/* Global Emergency Overlay Effect */}
      <div
        className={clsx(
          "absolute inset-0 z-0 pointer-events-none transition-all duration-1000 mix-blend-overlay",
          isEmergency ? "bg-red-900/40" : "bg-transparent"
        )}
      />

      {/* Top Branding / Status */}
      <div className="absolute top-4 left-4 z-50 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={clsx(
            "glass-panel p-4 rounded-xl flex items-center gap-3 transition-all duration-500",
            isEmergency ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.4)]" : "neon-glow"
          )}
        >
          <div className={`w-3 h-3 rounded-full ${isEmergency ? 'bg-red-500 animate-ping' : 'bg-cyan-400'}`} />
          <div>
            <h1 className={clsx("text-xl font-bold tracking-widest transition-colors", isEmergency ? "text-red-500" : "text-cyan-400 neon-text")}>
              SERVORA
            </h1>
            <p className={clsx("text-[10px] uppercase tracking-wider transition-colors", isEmergency ? "text-red-300 font-bold" : "text-slate-400")}>
              System Status: {isEmergency ? 'EMERGENCY' : 'OPTIMAL'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* User Mode Components */}
      {role === 'user' && (
        <>
          {activeView === 'map' && (
            <>
              <div className="absolute top-4 right-4 z-50 pointer-events-auto">
                <SearchPanel />
              </div>
              <ServiceRadar />
              <BookingOverlay />
            </>
          )}

          {activeView === 'chat' && <ChatView />}
          {activeView === 'profile' && <ProfileView />}
          {activeView === 'emergency' && <EmergencyView />}
          {activeView === 'search' && (
            <div className="absolute inset-0 bg-slate-900/80 z-40 flex items-center justify-center p-8">
              <div className="w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-white mb-8">Global Search</h2>
                <SearchPanel />
              </div>
            </div>
          )}
        </>
      )}

      {/* Worker Mode Components */}
      {role === 'worker' && (
        <>
          {activeView === 'map' && <JobFeed />}
          {activeView === 'chat' && <ChatView />}
          {activeView === 'profile' && <ProfileView />}
          {activeView === 'emergency' && <EmergencyView />}
        </>
      )}

      {/* Common Components */}
      <EmergencyToggle />
      <NavigationDock />

      {/* Logout Button (Restored as requested) */}
      {role !== 'admin' && (
        <div className="absolute bottom-6 left-6 z-[60] pointer-events-auto">
          <button
            onClick={logout}
            className="bg-slate-900/90 hover:bg-red-900/90 hover:text-red-100 text-xs text-slate-400 px-4 py-2.5 rounded-full border border-white/10 hover:border-red-500/50 transition-all shadow-lg backdrop-blur-md flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>Terminate Session</span>
          </button>
        </div>
      )}
    </MainLayout>
  );
}
