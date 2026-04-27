import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { LayoutDashboard, MessageSquare, Image, Megaphone, LogOut, ChevronRight, Bell } from 'lucide-react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [inquiryCount, setInquiryCount] = useState(0);

    useEffect(() => {
        const q = query(collection(db, 'inquiries'), where('read', '==', false));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setInquiryCount(snapshot.size);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        navigate('/admin/login');
    };

    const sidebarItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: MessageSquare, label: 'Inquiries', path: '/admin/inquiries', badge: inquiryCount },
        { icon: Image, label: 'Gallery', path: '/admin/gallery' },
        { icon: Megaphone, label: 'Announcements', path: '/admin/announcements' },
        { icon: LayoutDashboard, label: 'About Us CMS', path: '/admin/about' },
        { icon: LayoutDashboard, label: 'Pages CMS', path: '/admin/pages' },
        { icon: LayoutDashboard, label: 'Disclosures CMS', path: '/admin/disclosures' },
    ];

    return (
        <div className="min-h-screen flex bg-gray-50 font-sans text-gray-800">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0D2C54] text-white flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="p-6 mt-4">
                    <h2 className="text-2xl font-black tracking-tight mb-1 text-white">Navrachna</h2>
                    <p className="text-accent text-xs font-bold tracking-widest uppercase opacity-80">Admin Console</p>
                </div>
                
                <nav className="flex-1 px-4 space-y-2 mt-8 overflow-y-auto">
                    {sidebarItems.map((item, idx) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <button
                                key={idx}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-semibold text-sm text-left ${
                                    isActive 
                                    ? 'bg-white/15 text-white shadow-lg shadow-black/10' 
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-accent/60'}`} />
                                    {item.label}
                                </div>
                                {item.badge > 0 && (
                                    <span className="bg-red-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-lg shadow-red-500/20 animate-pulse">
                                        {item.badge}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors font-semibold text-sm"
                    >
                        <LogOut className="w-5 h-5" />
                        Log Out
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full mt-2 flex justify-center text-xs text-white/50 hover:text-white transition-colors py-2"
                    >
                        View Live Website
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 p-8 overflow-y-auto">
                <header className="mb-10 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-black text-[#0D2C54] tracking-tight">Welcome Back, Admin</h1>
                        <p className="text-gray-500 text-sm font-medium mt-1">Here is what's happening today.</p>
                    </div>
                </header>
                
                {/* Render the current admin sub-page here */}
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
