import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, User, Phone, MoreVertical, ArrowLeft } from "lucide-react";
import { useWorkerStore } from "../../store/useWorkerStore";

interface Message {
    id: string;
    text: string;
    sender: 'me' | 'other';
    time: string;
}

export default function ChatView() {
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "Hi! I'm on my way.", sender: 'other', time: '10:30 AM' },
        { id: '2', text: "Great, see you soon!", sender: 'me', time: '10:31 AM' },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { activeJob } = useWorkerStore(); // Assuming we might want to chat with active job customer/worker

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'me',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, newMessage]);
        setInput("");

        // Mock auto-reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thanks for the update!",
                sender: 'other',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm pointer-events-auto"
        >
            <div className="w-full max-w-md h-[80vh] glass-panel rounded-2xl flex flex-col overflow-hidden border border-white/10 shadow-2xl relative">
                {/* Header */}
                <div className="p-4 border-b border-white/5 bg-slate-900/80 backdrop-blur-md flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <button className="p-2 hover:bg-white/5 rounded-full text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="w-10 h-10 rounded-full bg-cyan-600/20 flex items-center justify-center border border-cyan-500/30">
                            <User size={20} className="text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-white font-bold text-sm">John Plumber</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-green-400">Online</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-1">
                        <button className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-cyan-400 transition-colors">
                            <Phone size={20} />
                        </button>
                        <button className="p-2 hover:bg-white/5 rounded-full text-slate-400 hover:text-white transition-colors">
                            <MoreVertical size={20} />
                        </button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/30 scrollbar-thin">
                    <div className="text-center text-xs text-slate-500 my-4">Today</div>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`
                                max-w-[80%] p-3 rounded-2xl text-sm relative group
                                ${msg.sender === 'me'
                                    ? 'bg-cyan-600 text-white rounded-br-none'
                                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-white/5'}
                            `}>
                                {msg.text}
                                <div className={`text-[10px] opacity-50 mt-1 text-right`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-slate-900/80 backdrop-blur-md">
                    <div className="relative flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 bg-slate-800/50 border border-white/10 text-white rounded-full px-5 py-3 outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-600"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:hover:bg-cyan-600 rounded-full text-white shadow-lg shadow-cyan-500/20 transition-all"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
