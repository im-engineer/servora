"use client";

import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { MapPin, Clock, X, Check, DollarSign } from "lucide-react";
import { clsx } from "clsx";
import { useWorkerStore, Job } from "../../store/useWorkerStore";
import ActiveJobPanel from "./ActiveJobPanel";

export default function JobFeed() {
    const { jobs, activeJob, acceptJob, rejectJob } = useWorkerStore();

    const handleSwipe = (id: string, direction: 'left' | 'right') => {
        if (direction === 'right') {
            acceptJob(id);
        } else {
            rejectJob(id);
        }
    };

    if (activeJob) {
        return <ActiveJobPanel />;
    }

    return (
        <div className="fixed bottom-24 left-4 right-4 z-40 h-48 flex items-center justify-center pointer-events-none">
            <AnimatePresence>
                {jobs.map((job, index) => (
                    <JobCard key={job.id} job={job} index={index} onSwipe={handleSwipe} total={jobs.length} />
                ))}
            </AnimatePresence>
            {jobs.length === 0 && (
                <div className="text-slate-500 text-sm pointer-events-auto bg-slate-900/80 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                    No new jobs available. Scanning area...
                </div>
            )}
        </div>
    );
}

function JobCard({ job, index, onSwipe, total }: { job: Job, index: number, onSwipe: (id: string, dir: 'left' | 'right') => void, total: number }) {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-10, 10]);
    const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);
    const bg = useTransform(x, [-150, 0, 150], ["rgba(239, 68, 68, 0.2)", "rgba(15, 23, 42, 0.6)", "rgba(34, 197, 94, 0.2)"]);

    const isTop = index === 0;

    return (
        <motion.div
            style={{ x, rotate, opacity, backgroundColor: bg as any }}
            drag={isTop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x;
                if (swipe < -10000 || offset.x < -100) onSwipe(job.id, 'left');
                else if (swipe > 10000 || offset.x > 100) onSwipe(job.id, 'right');
            }}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{
                scale: isTop ? 1 : 0.9 + (0.1 * ((total - index - 1) * 0.05)), // Stack effect
                y: isTop ? 0 : 10 * index,
                opacity: 1,
                zIndex: total - index
            }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className={clsx(
                "absolute w-full max-w-sm glass-panel p-5 rounded-2xl border border-white/10 shadow-2xl pointer-events-auto cursor-grab active:cursor-grabbing",
                job.type === 'urgent' && "border-orange-500/30"
            )}
        >
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-white text-lg">{job.title}</h3>
                    <p className="text-slate-400 text-sm">{job.customer}</p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="font-mono text-cyan-400 text-xl font-bold">${job.price}</span>
                    {job.type === 'urgent' && <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider animate-pulse">Urgent</span>}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-800/50 p-2 rounded-lg flex items-center gap-2">
                    <MapPin size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-300">{job.distance}</span>
                </div>
                <div className="bg-slate-800/50 p-2 rounded-lg flex items-center gap-2">
                    <Clock size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-300">{job.time}</span>
                </div>
            </div>

            {isTop && (
                <div className="absolute inset-0 flex justify-between items-center px-8 opacity-0 pointer-events-none transition-opacity duration-300" style={{ opacity: x.get() !== 0 ? 0.5 : 0 }}>
                    <div className="bg-red-500/80 p-4 rounded-full"><X size={32} color="white" /></div>
                    <div className="bg-green-500/80 p-4 rounded-full"><Check size={32} color="white" /></div>
                </div>
            )}

            <div className="text-center text-[10px] text-slate-600 uppercase tracking-widest">
                Swipe Right to Accept • Left to Skip
            </div>
        </motion.div>
    );
}
