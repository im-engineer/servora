"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Edit2, Trash2, User, Briefcase, Shield, CheckCircle, XCircle } from "lucide-react";
import { useUserStore, SystemUser } from "../../store/useUserStore";
import { clsx } from "clsx";
import { toast } from "sonner";

export default function UserManagement() {
    const { users, addUser, deleteUser, toggleStatus } = useUserStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // New User Form State
    const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', department: '' });

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreateUser = () => {
        if (!newUser.name || !newUser.email) return toast.error("Name and Email are required");

        addUser(newUser as any);
        setIsModalOpen(false);
        setNewUser({ name: '', email: '', role: 'user', department: '' });
        toast.success("User created successfully");
    };

    return (
        <div className="space-y-6">
            {/* Header Actions */}
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-white/5">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-slate-800 border-none rounded-xl pl-10 pr-4 py-2 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500 outline-none w-64"
                    />
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-bold transition-colors"
                >
                    <Plus size={20} /> Add User
                </button>
            </div>

            {/* Users Table */}
            <div className="glass-panel rounded-2xl overflow-hidden border border-white/5 overflow-x-auto">
                <table className="w-full text-left min-w-[600px]">
                    <thead className="bg-slate-800/50 text-slate-400 uppercase text-xs tracking-wider">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Department</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {filteredUsers.map((user) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="hover:bg-white/5 transition-colors"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-white font-medium">{user.name}</div>
                                            <div className="text-xs text-slate-500">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className={clsx(
                                        "px-2 py-1 rounded-full text-xs font-bold border",
                                        user.role === 'admin' ? "bg-purple-500/20 text-purple-400 border-purple-500/30" :
                                            user.role === 'worker' ? "bg-orange-500/20 text-orange-400 border-orange-500/30" :
                                                "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                                    )}>
                                        {user.role.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 text-slate-300">
                                    {user.department || '-'}
                                </td>
                                <td className="p-4">
                                    <button
                                        onClick={() => toggleStatus(user.id)}
                                        className={clsx(
                                            "flex items-center gap-2 text-xs font-bold transition-opacity hover:opacity-80",
                                            user.status === 'active' ? "text-green-400" : "text-red-400"
                                        )}
                                    >
                                        {user.status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                                        {user.status.toUpperCase()}
                                    </button>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors">
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="p-2 hover:bg-red-900/30 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
                {filteredUsers.length === 0 && (
                    <div className="p-8 text-center text-slate-500">No users found matching your search.</div>
                )}
            </div>

            {/* Add User Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
                    >
                        <h2 className="text-xl font-bold text-white mb-6">Create New User</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Full Name</label>
                                <input
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-cyan-500"
                                    placeholder="John Doe"
                                    value={newUser.name}
                                    onChange={e => setNewUser({ ...newUser, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Email Address</label>
                                <input
                                    className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-cyan-500"
                                    placeholder="john@example.com"
                                    value={newUser.email}
                                    onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-slate-400 mb-1">Role</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {['user', 'worker', 'admin'].map(role => (
                                        <button
                                            key={role}
                                            onClick={() => setNewUser({ ...newUser, role: role as any })}
                                            className={clsx(
                                                "p-2 rounded-lg text-sm font-bold capitalize transition-colors border",
                                                newUser.role === role ? "bg-cyan-600 border-cyan-500 text-white" : "bg-slate-800 border-white/5 text-slate-400 hover:bg-slate-700"
                                            )}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {newUser.role === 'worker' && (
                                <div>
                                    <label className="block text-xs text-slate-400 mb-1">Department</label>
                                    <select
                                        className="w-full bg-slate-800 border border-white/10 rounded-lg p-3 text-white outline-none focus:border-cyan-500"
                                        value={newUser.department}
                                        onChange={e => setNewUser({ ...newUser, department: e.target.value })}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Plumbing">Plumbing</option>
                                        <option value="Electrical">Electrical</option>
                                        <option value="Cleaning">Cleaning</option>
                                        <option value="Moving">Moving</option>
                                        <option value="Tech">Tech Support</option>
                                    </select>
                                </div>
                            )}

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreateUser}
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-3 rounded-xl font-bold transition-colors"
                                >
                                    Create Account
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
