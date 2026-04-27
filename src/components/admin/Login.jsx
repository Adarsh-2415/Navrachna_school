import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { Lock, Mail, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F4F9FF] px-4 font-sans">
            <div className="max-w-md w-full bg-white rounded-[2rem] p-8 shadow-2xl border border-gray-100">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#0D2C54]/5 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0D2C54]">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black text-[#0D2C54] mb-2">Admin Panel</h2>
                    <p className="text-gray-500 font-medium text-sm">Sign in to manage Navrachna Website</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl flex items-start gap-3 text-sm font-medium">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#0D2C54] ml-1">Email Address</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-11 pr-6 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 transition-all outline-none text-gray-700"
                                placeholder="admin@navrachna.edu"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#0D2C54] ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-6 py-4 rounded-xl bg-gray-50/50 border border-gray-200 focus:bg-white focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 transition-all outline-none text-gray-700"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#0D2C54] hover:bg-[#123A6B] text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'}
                    </button>
                    
                    <button
                        type="button"
                        onClick={() => navigate('/')}
                        className="w-full mt-4 text-sm font-bold text-gray-500 hover:text-[#0D2C54] transition-colors"
                    >
                        &larr; Back to Website
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
