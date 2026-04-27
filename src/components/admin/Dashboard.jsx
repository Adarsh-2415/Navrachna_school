import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot, where, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Users, TrendingUp, Clock, ChevronRight, Bell, Calendar } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        today: 0,
        recent: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Start date for today (midnight)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayTimestamp = Timestamp.fromDate(todayStart);

        const q = query(collection(db, 'inquiries'), orderBy('timestamp', 'desc'));
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allInquiries = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const todayCount = allInquiries.filter(inq => {
                if (!inq.timestamp) return false;
                const date = inq.timestamp.toDate();
                return date >= todayStart;
            }).length;

            setStats({
                total: allInquiries.length,
                today: todayCount,
                recent: allInquiries.slice(0, 3) // Last 3
            });
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center p-20 text-gray-400 font-bold">
            <Bell className="w-5 h-5 animate-bounce mr-2" /> Initializing Dashboard...
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Inquiries Card */}
                <div 
                    onClick={() => navigate('/admin/inquiries')}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-accent hover:shadow-xl hover:shadow-accent/5 transition-all cursor-pointer group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-4 bg-accent/10 rounded-2xl text-accent group-hover:bg-accent group-hover:text-white transition-colors">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <TrendingUp className="text-emerald-500 w-5 h-5" />
                    </div>
                    <h3 className="text-4xl font-black text-[#0D2C54] mb-1">{stats.total}</h3>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">Total Inquiries</p>
                </div>

                {/* Today's Inquiries Card */}
                <div 
                    onClick={() => navigate('/admin/inquiries')}
                    className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/5 transition-all cursor-pointer group"
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <Calendar className="w-6 h-6" />
                        </div>
                        <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">Live Updates</span>
                    </div>
                    <h3 className="text-4xl font-black text-[#0D2C54] mb-1">{stats.today}</h3>
                    <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">New Today</p>
                </div>

                {/* Quick Action Card */}
                <div 
                    onClick={() => navigate('/admin/pages')}
                    className="bg-[#0D2C54] p-8 rounded-[2.5rem] shadow-lg shadow-black/10 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
                >
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="p-4 bg-white/10 w-fit rounded-2xl text-white">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-white/60 font-bold text-sm uppercase tracking-wider mb-2">CMS Management</p>
                            <div className="flex items-center gap-2 text-white font-black text-xl">
                                Update Website <ChevronRight className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                    {/* Decorative glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent text-white rounded-xl">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-[#0D2C54] tracking-tight">Recent Inquiries</h3>
                            <p className="text-sm text-gray-500 font-medium">Last 3 messages from the contact form.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/admin/inquiries')}
                        className="text-accent font-bold text-sm hover:underline flex items-center gap-1"
                    >
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="p-4">
                    {stats.recent.length === 0 ? (
                        <div className="py-12 text-center text-gray-400 font-medium">
                            No recent activity found.
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {stats.recent.map((inq) => (
                                <div 
                                    key={inq.id}
                                    onClick={() => navigate('/admin/inquiries')}
                                    className="p-6 rounded-3xl hover:bg-gray-50 transition-all cursor-pointer border border-transparent hover:border-gray-200 group"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-[#0D2C54]/5 rounded-2xl flex items-center justify-center text-[#0D2C54] font-black group-hover:bg-[#0D2C54] group-hover:text-white transition-all text-lg">
                                                {inq.firstName?.[0]}{inq.lastName?.[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-black text-[#0D2C54] group-hover:text-accent transition-colors">{inq.firstName} {inq.lastName}</h4>
                                                <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-0.5">
                                                    {inq.timestamp ? inq.timestamp.toDate().toLocaleString() : 'Just now'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full font-bold group-hover:bg-[#0D2C54]/5 group-hover:text-[#0D2C54] transition-all">
                                            New Message
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-600 text-sm line-clamp-1 italic font-medium">
                                        "{inq.message}"
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
