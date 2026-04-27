import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, MessageSquare, Mail, Facebook, Instagram, Twitter, Video, CheckCircle2 } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await addDoc(collection(db, "inquiries"), {
                ...formData,
                timestamp: serverTimestamp(),
                read: false
            });
            setSuccess(true);
            setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            setTimeout(() => setSuccess(false), 5000);
        } catch (error) {
            console.error("Error submitting inquiry: ", error);
            alert("Something went wrong. Please try again or call us directly.");
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#0D2C54]">Contact Us</h2>
            </div>

            <div className="relative flex flex-col lg:flex-row gap-10 items-stretch">
                {/* Form Container */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_50px_-12px_rgba(0,0,0,0.08)] border border-gray-100 relative z-10"
                >
                    <h3 className="text-2xl font-bold text-[#0D2C54] mb-2">Send us a message</h3>
                    <p className="text-gray-500 mb-10 max-w-lg leading-relaxed">
                        Do you have a question? A complaint? Or need any help to choose the right path for your child. Feel free to contact us
                    </p>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0D2C54] ml-1">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your first name"
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 transition-all outline-none text-gray-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0D2C54] ml-1">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your Last name"
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 transition-all outline-none text-gray-700"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0D2C54] ml-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                    className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 transition-all outline-none text-gray-700"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-[#0D2C54] ml-1">Contact Details</label>
                                <div className="flex gap-2">
                                    <div className="flex items-center gap-1.5 px-3 py-4 rounded-2xl bg-white border border-gray-200 font-medium text-gray-700">
                                        <span>+91</span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter your contact number"
                                        className="flex-1 px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 transition-all outline-none text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#0D2C54] ml-1">Message</label>
                            <textarea
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Enter your message"
                                className="w-full px-6 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[#0D2C54] focus:ring-2 focus:ring-[#0D2C54]/10 transition-all outline-none text-gray-700 resize-none"
                            ></textarea>
                        </div>

                        <div className="flex justify-center md:justify-end pt-4 items-center gap-4">
                            {success && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-3 rounded-xl border border-emerald-100"
                                >
                                    <CheckCircle2 className="w-5 h-5" />
                                    Message sent successfully!
                                </motion.div>
                            )}
                            <button
                                type="submit"
                                disabled={submitting || success}
                                className="bg-[#0D2C54] disabled:bg-gray-400 text-white px-10 py-4 rounded-full font-bold shadow-lg hover:bg-[#123A6B] transition-all transform hover:-translate-y-1 disabled:hover:translate-y-0"
                            >
                                {submitting ? 'Sending...' : 'Send a Message'}
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Info Card Container */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:w-[400px] bg-[#0D2C54] rounded-[2rem] p-8 md:p-10 pb-10 text-white shadow-2xl relative flex flex-col items-start select-text"
                >
                    <div className="w-full">
                        <h3 className="text-xl font-bold mb-8 leading-tight">Hi! We are always here<br />to help you.</h3>

                        <div className="space-y-6">
                            <div className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">Address:</p>
                                    <p className="font-bold text-sm leading-snug">FAZILPUR (ASAF NAGAR – IQBALPUR ROAD) Roorkee, Uttarakhand, India 247667</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <MessageSquare className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">SMS / Whatsapp</p>
                                    <p className="font-bold text-lg">+91 9837543910</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-5 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <div className="p-3 bg-white/10 rounded-xl">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-0.5">Email:</p>
                                    <p className="font-bold break-all">navrachnaroorkee@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 w-full">
                        <div className="w-full h-[1px] bg-white/10 mb-6"></div>
                        <p className="text-sm font-bold mb-6">Connect with us</p>
                        <div className="flex gap-5">
                            <a href="https://www.facebook.com/NAVRACHNAPUBLICSCHOOLROORKEE/" target="_blank" rel="noopener noreferrer" className="p-1 hover:text-accent transition-colors"><Facebook className="w-6 h-6" /></a>
                            <a href="#" className="p-1 hover:text-accent transition-colors"><Instagram className="w-6 h-6" /></a>
                            <a href="#" className="p-1 hover:text-accent transition-colors"><Twitter className="w-6 h-6" /></a>
                            <a href="#" className="p-1 hover:text-accent transition-colors"><Video className="w-6 h-6" /></a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;
