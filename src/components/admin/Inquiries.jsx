import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, writeBatch, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Mail, Phone, Clock, Trash2, ShieldAlert, CheckCircle2 } from 'lucide-react';

const Inquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setInquiries(data);
            setLoading(false);
        });

        // Mark all unread as read when entering this page
        const markAllRead = async () => {
            const qUnread = query(collection(db, 'inquiries'), where('read', '==', false));
            const querySnapshot = await getDocs(qUnread);
            
            if (!querySnapshot.empty) {
                const batch = writeBatch(db);
                querySnapshot.forEach((doc) => {
                    batch.update(doc.ref, { read: true });
                });
                await batch.commit();
            }
        };

        markAllRead();

        return () => unsubscribe();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this message?")) {
            await deleteDoc(doc(db, 'inquiries', id));
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-gray-500 font-bold">Loading inquiries...</div>;
    }

    return (
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h3 className="text-2xl font-black text-[#0D2C54] mb-1">Contact Inquiries</h3>
                    <p className="text-gray-500 text-sm font-medium">Messages submitted through the website Contact form.</p>
                </div>
                <div className="bg-[#0D2C54]/10 text-[#0D2C54] px-4 py-2 rounded-xl font-bold text-sm">
                    {inquiries.length} Total
                </div>
            </div>

            <div className="divide-y divide-gray-100">
                {inquiries.length === 0 ? (
                    <div className="p-16 text-center text-gray-400 font-medium">
                        No inquiries yet. When someone fills out the contact form, it will appear here!
                    </div>
                ) : (
                    inquiries.map((inq) => (
                        <div key={inq.id} className="p-8 hover:bg-gray-50/50 transition-colors">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-lg font-bold text-gray-800">{inq.firstName} {inq.lastName}</h4>
                                        {inq.read === false && (
                                            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wide">
                                                New
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500 font-medium">
                                        <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {inq.email}</span>
                                        <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {inq.phone}</span>
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 
                                            {inq.timestamp ? new Date(inq.timestamp.toDate()).toLocaleString() : 'Just now'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {inq.read && <CheckCircle2 className="w-5 h-5 text-emerald-500 opacity-50" title="Read" />}
                                    <button 
                                        onClick={() => handleDelete(inq.id)}
                                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white border border-gray-100 p-5 rounded-2xl text-gray-600 shadow-sm">
                                {inq.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Inquiries;
