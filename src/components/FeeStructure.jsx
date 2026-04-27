import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { CreditCard, Info, AlertCircle } from 'lucide-react';

const FeeStructure = () => {
    const [fees, setFees] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Header section */}
            <section className="bg-[#0D2C54] py-20 px-6 text-center text-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
                    >
                        Fee <span className="text-secondary italic">Structure</span>
                    </motion.h1>
                    <p className="text-lg md:text-xl text-blue-100/80 font-medium">✨ Academic Session 2026-27 ✨</p>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-[80px]" />
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6 py-20">
                {fees.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-[3rem] p-12 md:p-20 text-center"
                    >
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <AlertCircle className="w-10 h-10 text-primary animate-pulse" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#0D2C54] mb-4">Coming Soon</h2>
                        <p className="text-xl text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                            Our academic fee structure is currently being updated for the next session. 
                            <span className="block mt-4 text-primary font-bold">Working Under Progress...</span>
                        </p>
                        <div className="mt-10 inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full text-primary font-bold shadow-sm border border-blue-100">
                           <Info className="w-5 h-5" /> Please check back in a few days
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 border border-gray-100 overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="py-6 px-8 text-[#0D2C54] font-black uppercase tracking-wider">Class</th>
                                        <th className="py-6 px-8 text-[#0D2C54] font-black uppercase tracking-wider">Estimated Fee</th>
                                        <th className="py-6 px-8 text-[#0D2C54] font-black uppercase tracking-wider">Details / Remarks</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {fees.map((item, idx) => (
                                        <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="py-6 px-8 font-black text-[#0D2C54] text-lg group-hover:text-primary transition-colors">{item.class}</td>
                                            <td className="py-6 px-8 font-bold text-gray-700">{item.amount}</td>
                                            <td className="py-6 px-8 text-gray-500 font-medium italic">{item.details || 'Regular Academic Fee'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-8 bg-gray-50/50 border-t border-gray-100 text-center">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                                * Detailed fee break-up available at the school office.
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default FeeStructure;
