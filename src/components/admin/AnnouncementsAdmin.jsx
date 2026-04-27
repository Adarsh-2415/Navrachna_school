import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Megaphone, Plus, Trash2, Edit2, Check, X, BellRing } from 'lucide-react';

const AnnouncementsAdmin = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newText, setNewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    useEffect(() => {
        const q = query(collection(db, 'announcements'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setAnnouncements(data);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newText.trim()) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'announcements'), {
                text: newText.trim(),
                timestamp: serverTimestamp(),
                active: true
            });
            setNewText('');
        } catch (error) {
            console.error("Error adding announcement: ", error);
            alert("Failed to add announcement.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this announcement?")) {
            await deleteDoc(doc(db, 'announcements', id));
        }
    };

    const startEditing = (announcement) => {
        setEditingId(announcement.id);
        setEditText(announcement.text);
    };

    const saveEdit = async (id) => {
        try {
            await updateDoc(doc(db, 'announcements', id), {
                text: editText.trim()
            });
            setEditingId(null);
        } catch (error) {
            console.error("Error updating announcement: ", error);
            alert("Failed to update announcement.");
        }
    };

    const toggleActive = async (id, currentStatus) => {
        try {
            await updateDoc(doc(db, 'announcements', id), {
                active: !currentStatus
            });
        } catch (error) {
            console.error("Error toggling status: ", error);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500 font-bold">Loading announcements...</div>;
    }

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#0D2C54]/10 rounded-lg">
                        <Megaphone className="w-6 h-6 text-[#0D2C54]" />
                    </div>
                    <h3 className="text-2xl font-black text-[#0D2C54]">Announcements Banner</h3>
                </div>
                <p className="text-gray-500 text-sm font-medium ml-12">
                    Manage the scrolling text banner shown at the top of the homepage.
                </p>
                
                <form onSubmit={handleAdd} className="mt-8 flex gap-3 ml-12">
                    <input
                        type="text"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                        placeholder="Type a new announcement/headline here..."
                        className="flex-1 px-5 py-3 rounded-xl border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 outline-none transition-all"
                        required
                    />
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-[#0D2C54] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#123A6B] transition-colors disabled:opacity-70"
                    >
                        <Plus className="w-5 h-5" />
                        Add New
                    </button>
                </form>
            </div>

            <div className="p-8">
                {announcements.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 font-medium border-2 border-dashed border-gray-100 rounded-2xl">
                        <BellRing className="w-8 h-8 mx-auto mb-3 opacity-50" />
                        No announcements yet. Add one above!
                    </div>
                ) : (
                    <div className="space-y-4">
                        {announcements.map((announcement) => (
                            <div key={announcement.id} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${announcement.active ? 'border-gray-200 bg-white shadow-sm' : 'border-gray-100 bg-gray-50 opacity-75'}`}>
                                
                                <div className="flex-1 mr-4">
                                    {editingId === announcement.id ? (
                                        <div className="flex gap-2 w-full">
                                            <input 
                                                type="text" 
                                                value={editText} 
                                                onChange={(e) => setEditText(e.target.value)}
                                                className="flex-1 px-3 py-2 border rounded-lg outline-none focus:border-[#0D2C54]"
                                                autoFocus
                                            />
                                            <button onClick={() => saveEdit(announcement.id)} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100"><Check className="w-5 h-5" /></button>
                                            <button onClick={() => setEditingId(null)} className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-200"><X className="w-5 h-5" /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-4">
                                            <button 
                                                onClick={() => toggleActive(announcement.id, announcement.active)}
                                                className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-20 transition-colors ${announcement.active ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                                            >
                                                {announcement.active ? 'Active' : 'Hidden'}
                                            </button>
                                            <span className={`text-lg font-medium ${!announcement.active && 'line-through text-gray-400'}`}>
                                                {announcement.text}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {editingId !== announcement.id && (
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => startEditing(announcement)}
                                            className="p-2 text-gray-400 hover:text-[#0D2C54] hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Edit2 className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(announcement.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnnouncementsAdmin;
