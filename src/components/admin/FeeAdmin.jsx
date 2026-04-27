import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { CreditCard, Plus, Trash2, Edit2, Check, X, ClipboardList } from 'lucide-react';

const FeeAdmin = () => {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        class: '',
        amount: '',
        details: ''
    });
    const [editData, setEditData] = useState({
        class: '',
        amount: '',
        details: ''
    });

    useEffect(() => {
        const q = query(collection(db, 'fee_structure'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setFees(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!formData.class || !formData.amount) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'fee_structure'), {
                ...formData,
                timestamp: serverTimestamp()
            });
            setFormData({ class: '', amount: '', details: '' });
        } catch (error) {
            console.error("Error adding fee: ", error);
            alert("Failed to add fee structure.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this fee record?")) {
            await deleteDoc(doc(db, 'fee_structure', id));
        }
    };

    const startEditing = (fee) => {
        setEditingId(fee.id);
        setEditData({
            class: fee.class,
            amount: fee.amount,
            details: fee.details || ''
        });
    };

    const saveEdit = async (id) => {
        try {
            await updateDoc(doc(db, 'fee_structure', id), {
                ...editData
            });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating fee: ", error);
            alert("Failed to update fee record.");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500 font-bold">Loading fee structure...</div>;
    }

    return (
        <div className="w-full">
            <div className="pb-8 mb-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-[#0D2C54]">Fee Records</h3>
                    <p className="text-gray-500 text-sm">Add and manage class-wise fee details.</p>
                </div>
                <form onSubmit={handleAdd} className="flex-1 w-full max-w-2xl grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                        type="text"
                        value={formData.class}
                        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                        placeholder="Class (e.g. Nursery)"
                        className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all"
                        required
                    />
                    <input
                        type="text"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        placeholder="Fee Amount"
                        className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all"
                        required
                    />
                    <input
                        type="text"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        placeholder="Additional Details"
                        className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all"
                    />
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-[#0D2C54] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#123A6B] transition-colors disabled:opacity-70"
                    >
                        <Plus className="w-5 h-5" />
                        Add Record
                    </button>
                </form>
            </div>

            <div className="p-8">
                {fees.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-2xl">
                        <ClipboardList className="w-8 h-8 mx-auto mb-3 opacity-50" />
                        No fee structure added yet. Use the form above!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#0D2C54] border-b-2 border-gray-100">
                                    <th className="py-4 px-4 font-black">Class</th>
                                    <th className="py-4 px-4 font-black">Monthly/Annual Fee</th>
                                    <th className="py-4 px-4 font-black">Other Details</th>
                                    <th className="py-4 px-4 font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {fees.map((fee) => (
                                    <tr key={fee.id} className="hover:bg-gray-50/50 transition-colors">
                                        {editingId === fee.id ? (
                                            <>
                                                <td className="py-4 px-4"><input type="text" value={editData.class} onChange={(e) => setEditData({...editData, class: e.target.value})} className="w-full px-2 py-1 border rounded" /></td>
                                                <td className="py-4 px-4"><input type="text" value={editData.amount} onChange={(e) => setEditData({...editData, amount: e.target.value})} className="w-full px-2 py-1 border rounded" /></td>
                                                <td className="py-4 px-4"><input type="text" value={editData.details} onChange={(e) => setEditData({...editData, details: e.target.value})} className="w-full px-2 py-1 border rounded" /></td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => saveEdit(fee.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><Check className="w-5 h-5" /></button>
                                                        <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="py-4 px-4 font-bold text-[#0D2C54]">{fee.class}</td>
                                                <td className="py-4 px-4 font-medium">{fee.amount}</td>
                                                <td className="py-4 px-4 text-gray-500 text-sm">{fee.details || '-'}</td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => startEditing(fee)} className="p-2 text-gray-400 hover:text-[#0D2C54] hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button>
                                                        <button onClick={() => handleDelete(fee.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeeAdmin;
