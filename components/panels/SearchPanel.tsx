import { Search, Filter, MapPin, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { toast } from "sonner";

export default function SearchPanel() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const categories = ["Plumbing", "Electrical", "Cleaning", "Moving", "Tech Repair"];

    // Mock search results
    const [results, setResults] = useState<string[]>([]);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        setLoading(true);
        const timer = setTimeout(() => {
            const matches = categories.filter(c => c.toLowerCase().includes(query.toLowerCase()));
            setResults(matches);
            setLoading(false);
        }, 500); // Simulate network delay

        return () => clearTimeout(timer);
    }, [query]);

    const handleSelect = (item: string) => {
        setIsExpanded(false);
        setQuery("");
        toast.success(`Searching for available ${item} experts...`, {
            description: "Scanning nearby workers..."
        });
    }

    return (
        <motion.div
            className="absolute top-4 right-4 z-50 pointer-events-auto flex flex-col items-end"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Search Bar */}
            <div
                className={clsx(
                    "glass-panel rounded-xl flex items-center transition-all duration-300 relative overflow-hidden",
                    isExpanded ? "w-80 p-3" : "w-12 h-12 p-0 justify-center cursor-pointer hover:bg-slate-800/80"
                )}
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                {loading ? <Loader2 size={20} className="text-cyan-400 animate-spin flex-shrink-0" /> : <Search
                    size={20}
                    className={clsx("text-cyan-400 flex-shrink-0", isExpanded ? "mr-3" : "")}
                />}

                {isExpanded && (
                    <input
                        autoFocus
                        type="text"
                        placeholder="What do you need help with?"
                        className="bg-transparent border-none outline-none text-slate-100 text-sm w-full placeholder:text-slate-500"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onBlur={() => {
                            // Delay blur to allow clicking on results
                            setTimeout(() => {
                                if (!query) setIsExpanded(false);
                            }, 200);
                        }}
                    />
                )}

                {isExpanded && (
                    <button className="text-slate-500 hover:text-cyan-400 ml-2">
                        <Filter size={16} />
                    </button>
                )}
            </div>

            {/* Expanded Suggestions */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-80 mt-2 glass-panel rounded-xl overflow-hidden"
                    >
                        <div className="p-2">
                            {query && results.length > 0 && (
                                <div className="mb-2">
                                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-2">Best Matches</p>
                                    {results.map(res => (
                                        <button
                                            key={res}
                                            onClick={() => handleSelect(res)}
                                            className="w-full text-left px-3 py-2 text-sm text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400 rounded-lg transition-colors flex justify-between items-center group"
                                        >
                                            {res}
                                            <span className="text-xs text-slate-500 group-hover:text-cyan-500">24 nearby</span>
                                        </button>
                                    ))}
                                    <div className="border-t border-white/5 my-2" />
                                </div>
                            )}

                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-2 px-2">Popular Categories</p>
                            <div className="flex flex-wrap gap-2 px-2 pb-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => handleSelect(cat)}
                                        className="text-xs bg-slate-800 hover:bg-cyan-900/30 text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded-full transition-colors border border-white/5"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <div className="border-t border-white/5 my-1" />

                            <button className="w-full text-left px-3 py-2 text-sm text-slate-400 hover:bg-white/5 hover:text-cyan-400 flex items-center gap-2 transition-colors">
                                <MapPin size={14} />
                                <span>Search specifically in this area</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
