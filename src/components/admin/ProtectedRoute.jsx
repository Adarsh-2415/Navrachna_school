import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const ProtectedRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F9FF]">
                <div className="w-10 h-10 border-4 border-[#0D2C54]/20 border-t-[#0D2C54] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default ProtectedRoute;
