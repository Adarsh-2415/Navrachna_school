import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Calendar, Palmtree, MapPin } from 'lucide-react';

const HolidayList = () => {
    const [holidays, setHolidays] = useState([]);
    const [loading, setLoading] = useState(true);

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
                        Academic <span className="text-secondary italic">Holidays</span>
                    </motion.h1>
                    <p className="text-lg md:text-xl text-blue-100/80 font-medium">✨ Session 2026-27 ✨</p>
                </div>
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-[80px]" />
                </div>
            </section>

            <div className="max-w-5xl mx-auto px-6 py-20">
                {holidays.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-[3rem] p-12 md:p-20 text-center"
                    >
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <Palmtree className="w-10 h-10 text-emerald-600 animate-bounce" />
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#0D2C54] mb-4">Coming Soon</h2>
                        <p className="text-xl text-gray-500 font-medium max-w-md mx-auto leading-relaxed">
                            The academic holiday list is being finalized. 
                            <span className="block mt-4 text-emerald-600 font-bold">Working Under Progress...</span>
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {holidays.map((holiday, idx) => (
                            <motion.div
                                key={holiday.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all group flex flex-col items-center text-center"
                            >
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <Calendar className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-black text-[#0D2C54] mb-2">{holiday.name}</h3>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="px-4 py-1.5 bg-accent/20 text-[#0D2C54] rounded-full text-sm font-black whitespace-nowrap">
                                        {formatDate(holiday.date)}
                                    </span>
                                    <span className="text-gray-400 font-bold text-sm">{holiday.year}</span>
                                </div>
                                <div className="mt-auto w-full pt-4 border-t border-gray-50 flex items-center justify-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                                    <MapPin className="w-3 h-3" /> Campus Closed
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Important Notes */}
                <div className="mt-16 bg-gray-50 rounded-[2.5rem] p-8 md:p-10 border border-gray-100">
                    <h4 className="flex items-center gap-3 text-lg font-black text-[#0D2C54] mb-4 uppercase tracking-wider">
                        <Info className="w-5 h-5 text-accent" /> Important Notes:
                    </h4>
                    <ul className="space-y-3 text-gray-500 font-medium list-disc ml-5">
                        <li>Holidays are subject to change based on government directives.</li>
                        <li>School office may remain open on specific holidays (confirm via notice).</li>
                        <li>Vacation dates will be announced separately via school circulars.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

const Info = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
);

export default HolidayList;
