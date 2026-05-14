import React, { useState, useEffect } from "react";
import { Plus, Search, RefreshCw, Box, AlertCircle, X, CheckCircle2 } from "lucide-react";
import { userService } from "../../services/userService";

const MachineManagement: React.FC = () => {
    const [machines, setMachines] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [subscription, setSubscription] = useState<any>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Form State
    const [formData, setFormData] = useState({
        name: "",
        serial_number: "",
        model: "",
        status: "active"
    });

    const fetchMachines = async () => {
        setLoading(true);
        try {
            const data = await userService.getMachines();
            setMachines(data || []); 
        } catch (err) {
            console.error("Failed to fetch machines:", err);
            toast.error("Failed to load machines");
        } finally {
            setLoading(false);
        }
    };

    const fetchSubscription = async () => {
        try {
            const res = await userService.getActiveSubscription();
            setSubscription(res);
        } catch (err) {
            console.error("Failed to fetch subscription:", err);
        }
    };

    useEffect(() => {
        fetchMachines();
        fetchSubscription();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await userService.registerMachine(formData);
            setIsAddModalOpen(false);
            setFormData({ name: "", serial_number: "", model: "", status: "active" });
            fetchMachines();
        } catch (err) {
            console.error("Failed to add machine:", err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredMachines = machines.filter(m => 
        m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.serial_number?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 text-slate-900 dark:bg-[#050b18] dark:text-white md:p-6">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-2xl font-black md:text-3xl">
                        Machine Management
                    </h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        View and manage your fleet of machines and equipment.
                    </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                        onClick={fetchMachines}
                        disabled={loading}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                        <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                    </button>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        disabled={subscription && subscription.machine_limit !== null && machines.length >= subscription.machine_limit}
                        className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                        <Plus size={18} />
                        Add Machine
                    </button>
                </div>
            </div>

            {subscription && subscription.machine_limit !== null && (
                <div className={`mb-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between ${
                    machines.length >= subscription.machine_limit 
                    ? "border-red-200 bg-red-50 dark:border-red-900/30 dark:bg-red-500/5" 
                    : "border-blue-100 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-500/5"
                }`}>
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                            machines.length >= subscription.machine_limit ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                        }`}>
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">Machine Limit Monitoring</h3>
                            <p className="text-sm text-slate-500">
                                You have used <span className="font-bold text-slate-900 dark:text-white">{machines.length}</span> of <span className="font-bold text-slate-900 dark:text-white">{subscription.machine_limit}</span> slots available in your <span className="font-bold text-blue-600 uppercase">{subscription.plan_name}</span> plan.
                            </p>
                        </div>
                    </div>

                    {machines.length >= subscription.machine_limit && (
                        <a 
                            href="/plans" 
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition"
                        >
                            Upgrade Now
                        </a>
                    )}
                </div>
            )}

            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search machines by name or serial..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm outline-none focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:border-blue-500"
                    />
                </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                {loading ? (
                    <div className="flex h-64 flex-col items-center justify-center gap-4">
                        <RefreshCw size={40} className="animate-spin text-blue-600" />
                        <p className="text-slate-500">Loading machines...</p>
                    </div>
                ) : filteredMachines.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 text-xs font-bold uppercase tracking-wider text-slate-500 dark:bg-slate-800/50">
                                <tr>
                                    <th className="px-6 py-4">Machine Name</th>
                                    <th className="px-6 py-4">Serial Number</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Last Maintenance</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {filteredMachines.map((machine) => (
                                    <tr key={machine.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                                        <td className="px-6 py-4 font-medium">{machine.name}</td>
                                        <td className="px-6 py-4 text-slate-500">{machine.serial_number}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">{machine.last_maintenance || "N/A"}</td>
                                        <td className="px-6 py-4">...</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex h-80 flex-col items-center justify-center gap-4 text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                            <Box size={40} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">No machines or equipments added now</h3>
                            <p className="mx-auto mt-1 max-w-xs text-sm text-slate-500">
                                You haven't registered any machines yet. Click the "Add Machine" button to get started.
                            </p>
                        </div>
                        <button className="mt-2 flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700">
                            <Plus size={18} />
                            Add Your First Machine
                        </button>
                    </div>
                )}
            </div>

            {/* Add Machine Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl dark:bg-slate-900">
                        <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-slate-800">
                            <h2 className="text-xl font-bold">Add New Machine</h2>
                            <button 
                                onClick={() => setIsAddModalOpen(false)}
                                className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Machine Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Excavator EX-001"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Serial Number
                                    </label>
                                    <input
                                        type="text"
                                        name="serial_number"
                                        required
                                        value={formData.serial_number}
                                        onChange={handleInputChange}
                                        placeholder="e.g. SN-987654321"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Model / Type
                                    </label>
                                    <input
                                        type="text"
                                        name="model"
                                        required
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        placeholder="e.g. Caterpillar 320D"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-300">
                                        Status
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800"
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-70"
                                >
                                    {isSubmitting ? "Adding..." : "Add Machine"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MachineManagement;
