import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
    Gamepad2,
    Shapes,
    Layers,
    Palette,
    Beaker,
    Lightbulb,
    Wind,
    Star,
    Sparkles,
    CheckCircle2
} from 'lucide-react';

const Classroom = () => {
    const resources = [
        { name: "Toys & Games", icon: Gamepad2, color: "bg-blue-500" },
        { name: "Charts & Models", icon: Shapes, color: "bg-emerald-500" },
        { name: "Experiment Materials", icon: Beaker, color: "bg-purple-500" },
        { name: "Creative Colours", icon: Palette, color: "bg-rose-500" },
        { name: "Inspirational Models", icon: Lightbulb, color: "bg-amber-500" },
        { name: "Observation Kits", icon: Layers, color: "bg-indigo-500" }
    ];

    const features = [
        "Spacious & Large Rooms",
        "Modern Facilities",
        "Neat & Clean Environment",
        "Proper Air Circulation",
        "Activity Based Learning",
        "Inspirational Atmosphere"
    ];



    const [content, setContent] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'pages', 'classroom'), (docSnap) => {
            if (docSnap.exists()) {
                setContent(docSnap.data());
            } else {
                setContent({
                    title: "Nurturing Environments",
                    subtitle: "Elite Infrastructure",
                    description: "Spacious, clean, and modern classrooms designed to inspire curiosity and effective learning.",
                    cta_text: "Creating a space where curiosity leads to lifelong motivation and inspirational learning."
                });
            }
        });
        return () => unsubscribe();
    }, []);

    if (!content) return null;

    return (
        <div className="bg-white min-h-screen">
            {/* Simple & Professional Hero Section */}
            <section className="relative min-h-[600px] lg:h-[85vh] flex items-center justify-center bg-[#0D2C54] pt-28 pb-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/classroom_premium.png"
                        alt="Classroom"
                        className="w-full h-full object-cover opacity-70"
                    />
                    {/* Professional dark-blue overlay for high contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C54] via-transparent to-black/30" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-accent/20 backdrop-blur-md border border-accent/40 text-accent px-8 py-3 rounded-full inline-flex items-center gap-3 mb-8 font-black uppercase tracking-[0.5em] text-[10px] md:text-[12px] shadow-2xl"
                    >
                        <Star className="w-4 h-4 fill-accent" />
                        <span>{content.subtitle}</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-8 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    >
                        {content.title.split(' ')[0]} <br />
                        <span className="text-white relative inline-block">
                            {content.title.split(' ').slice(1).join(' ')}
                            {/* High-end gold highlight bar */}
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="absolute -bottom-2 left-0 h-2 md:h-3 bg-gradient-to-r from-accent to-transparent rounded-full opacity-80"
                            />
                        </span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "100px" }}
                        className="h-1.5 bg-accent mb-8 rounded-full"
                    />

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl lg:text-2xl text-white font-bold max-w-2xl mx-auto leading-relaxed opacity-90 mb-4"
                    >
                        {content.description}
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-24">
                {/* Main Content Card */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100 mb-20"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-[#0D2C54] mb-8 leading-tight">
                                Designed for <br />
                                <span className="text-primary italic">Exploration & Discovery</span>
                            </h2>
                            <p className="text-xl text-gray-500 font-semibold leading-relaxed mb-10 italic">
                                "Classrooms are large enough for children to move around for all activities and have been equipped with modern facilities. All classrooms are neat and clean with proper air circulation."
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                {features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group">
                                            <CheckCircle2 className="w-4 h-4" />
                                        </div>
                                        <span className="text-gray-700 font-bold text-sm tracking-tight">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] blur-2xl" />
                            <p className="relative z-10 text-lg text-gray-600 font-medium leading-[1.8] bg-gray-50/50 p-8 rounded-[2rem] border border-gray-100">
                                Each class has arrangements for Toys, Games, Charts, Models, Colours, Experiment Materials and everything required for children’s observation, experimentation, exploration, motivation and inspirational resulting in effective learning.
                            </p>
                            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-accent/20 rounded-full blur-3xl" />
                        </div>
                    </div>
                </motion.div>

                {/* Resources Grid */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-[#0D2C54] mb-4">Learning Resources</h3>
                    <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {resources.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10, transition: { duration: 0.2 } }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white p-8 rounded-[2.5rem] border border-gray-50 shadow-sm hover:shadow-2xl transition-all duration-500 text-center group cursor-default"
                        >
                            <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-500`}>
                                <item.icon className="w-8 h-8" />
                            </div>
                            <h4 className="text-sm font-black text-[#0D2C54] leading-tight px-2">{item.name}</h4>
                        </motion.div>
                    ))}
                </div>

                {/* Lower Visual Quote */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-12 bg-primary rounded-[4rem] text-center relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                    <Sparkles className="w-12 h-12 text-accent mx-auto mb-6 opacity-50" />
                    <p className="text-2xl md:text-3xl font-black text-white italic max-w-4xl mx-auto leading-relaxed">
                        "{content.cta_text}"
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Classroom;
