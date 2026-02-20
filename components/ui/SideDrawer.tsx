"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ReactNode } from "react";

interface SideDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    position?: 'left' | 'right';
}

export default function SideDrawer({
    isOpen,
    onClose,
    title,
    children,
    position = 'right'
}: SideDrawerProps) {

    const variants = {
        hidden: { x: position === 'right' ? '100%' : '-100%', opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className={`fixed top-0 bottom-0 ${position === 'right' ? 'right-0' : 'left-0'} 
                        w-full max-w-md z-50 glass-panel border-l border-white/10`}
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="p-6 border-b border-white/10 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-cyan-400 neon-text">{title}</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                                {children}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
