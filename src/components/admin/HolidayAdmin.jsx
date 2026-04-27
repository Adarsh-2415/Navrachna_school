import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Calendar, Plus, Trash2, Edit2, Check, X, Palmtree } from 'lucide-react';

const HolidayAdmin = () => {
    // Helper to format YYYY-MM-DD to readable date
    const formatDate = (dateStr) => {
        if (!dateStr || !dateStr.includes('-')) return dateStr;
        try {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
        } catch (e) {
            return dateStr;
        }
    };

    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        year: new Date().getFullYear().toString()
    });
    const [editData, setEditData] = useState({
        name: '',
        date: '',
        year: ''
    });

    useEffect(() => {
        const q = query(collection(db, 'holidays'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setHolidays(data);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.date) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'holidays'), {
                ...formData,
                timestamp: serverTimestamp()
            });
            setFormData({ ...formData, name: '', date: '' });
        } catch (error) {
            console.error("Error adding holiday: ", error);
            alert("Failed to add holiday.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this holiday record?")) {
            await deleteDoc(doc(db, 'holidays', id));
        }
    };

    const startEditing = (holiday) => {
        setEditingId(holiday.id);
        setEditData({
            name: holiday.name,
            date: holiday.date,
            year: holiday.year
        });
    };

    const saveEdit = async (id) => {
        try {
            await updateDoc(doc(db, 'holidays', id), {
                ...editData
            });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating holiday: ", error);
            alert("Failed to update holiday record.");
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500 font-bold">Loading holiday list...</div>;
    }

    return (
        <div className="w-full">
            <div className="pb-8 mb-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h3 className="text-xl font-bold text-[#0D2C54]">Holiday Records</h3>
                    <p className="text-gray-500 text-sm">Add scheduled holidays for the academic year.</p>
                </div>
                <form onSubmit={handleAdd} className="flex-1 w-full max-w-2xl grid grid-cols-1 md:grid-cols-4 gap-2">
                    <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Holiday Name (e.g. Diwali)"
                        className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all"
                        required
                    />
                    <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        onClick={(e) => e.target.showPicker && e.target.showPicker()}
                        className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all cursor-pointer"
                        required
                    />
                    <input
                        type="number"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        placeholder="Year"
                        className="px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all"
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-[#0D2C54] text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#123A6B] transition-colors disabled:opacity-70"
                    >
                        <Plus className="w-5 h-5" />
                        Add Holiday
                    </button>
                </form>
            </div>

            <div className="p-8">
                {holidays.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-2xl">
                        <Palmtree className="w-8 h-8 mx-auto mb-3 opacity-50" />
                        No holidays added yet. Add some fun dates!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="text-[#0D2C54] border-b-2 border-gray-100">
                                    <th className="py-4 px-4 font-black">Holiday Name</th>
                                    <th className="py-4 px-4 font-black">Date</th>
                                    <th className="py-4 px-4 font-black">Year</th>
                                    <th className="py-4 px-4 font-black text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {holidays.map((holiday) => (
                                    <tr key={holiday.id} className="hover:bg-gray-50/50 transition-colors">
                                        {editingId === holiday.id ? (
                                            <>
                                                <td className="py-4 px-4"><input type="text" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} className="w-full px-2 py-1 border rounded" /></td>
                                                <td className="py-4 px-4"><input type="date" value={editData.date} onChange={(e) => setEditData({...editData, date: e.target.value})} onClick={(e) => e.target.showPicker && e.target.showPicker()} className="w-full px-2 py-1 border rounded cursor-pointer" /></td>
                                                <td className="py-4 px-4"><input type="number" value={editData.year} onChange={(e) => setEditData({...editData, year: e.target.value})} className="w-full px-2 py-1 border rounded" /></td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => saveEdit(holiday.id)} className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"><Check className="w-5 h-5" /></button>
                                                        <button onClick={() => setEditingId(null)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="py-4 px-4 font-bold text-[#0D2C54]">{holiday.name}</td>
                                                <td className="py-4 px-4 font-medium">{formatDate(holiday.date)}</td>
                                                <td className="py-4 px-4 text-gray-500">{holiday.year}</td>
                                                <td className="py-4 px-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button onClick={() => startEditing(holiday)} className="p-2 text-gray-400 hover:text-[#0D2C54] hover:bg-blue-50 rounded-lg"><Edit2 className="w-5 h-5" /></button>
                                                        <button onClick={() => handleDelete(holiday.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5" /></button>
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

export default HolidayAdmin;
