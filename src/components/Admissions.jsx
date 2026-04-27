import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
    GraduationCap,
    ArrowRight,
    CheckCircle2,
    BookOpen,
    Users,
    Beaker,
    Trophy,
    Target,
    Heart
} from 'lucide-react';

const Admissions = ({ onNavigate }) => {
    const highlights = [
        {
            icon: Heart,
            title: "Value-Based Education",
            text: "Development of a student through high quality value based education, focusing on character and ethics.",
            image: "/images/498662672_993513926231580_3587196393297044506_n.jpg"
        },
        {
            icon: Users,
            title: "Expert Educators",
            text: "Highly qualified, experienced, and well-trained dedicated team of teachers committed to student success.",
            image: null
        },
        {
            icon: Target,
            title: "Constant Monitoring",
            text: "Constant evaluation and monitoring of every student to ensure continuous academic and personal growth.",
            image: null
        },
        {
            icon: BookOpen,
            title: "Individual Attention",
            text: "Individual attention and guidance for every student, recognizing unique potential and learning styles.",
            image: null
        },
        {
            icon: Beaker,
            title: "Modern Science Labs",
            text: "Modern well-equipped science labs for Physics, Chemistry, and Biology to foster practical learning.",
            image: "/images/484065500_947736917475948_6274786725347581069_n.jpg"
        },
        {
            icon: Trophy,
            title: "Sports & Games",
            text: "Regular sports and games with a big playground to promote physical fitness and team spirit.",
            image: "/images/483106183_942411058008534_6401002120412312681_n.jpg"
        }
    ];

    const [content, setContent] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'pages', 'admissions'), (docSnap) => {
            if (docSnap.exists()) {
                setContent(docSnap.data());
            } else {
                setContent({
                    title: "Admission Open",
                    subtitle: "Nursery to class 12th",
                    description: "Your journey towards excellence begins here. Join a community dedicated to holistic development and academic brilliance.",
                    cta_text: "Unlock Your Child's Full Potential at Navrachna"
                });
            }
        });
        return () => unsubscribe();
    }, []);

    if (!content) return null;

    return (
        <section className="relative overflow-hidden py-24 bg-gradient-to-b from-white to-gray-50/50">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 overflow-hidden">
                <div className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-20 left-[-10%] w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Hero Content */}
                <div className="text-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 text-primary border border-primary/10 font-bold text-xs uppercase tracking-[0.2em] mb-8"
                    >
                        <GraduationCap className="w-4 h-4" />
                        <span>Admission Open 2026-27</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl lg:text-8xl font-black text-[#0D2C54] mb-8 leading-[1]"
                    >
                        <span className="block mb-2">{content.title}</span>
                        <span className="bg-gradient-to-r from-primary via-[#2B6CB0] to-primary bg-clip-text text-transparent italic">
                            {content.subtitle}
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-500 max-w-2xl mx-auto font-medium"
                    >
                        {content.description}
                    </motion.p>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-start mb-32">
                    {/* Features List (Left) */}
                    <div className="space-y-6">
                        {highlights.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="group flex items-start gap-6 p-6 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all cursor-default"
                            >
                                <div className="flex-none w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-[#0D2C54] group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#0D2C54] mb-2 group-hover:text-primary transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-500 leading-relaxed font-semibold line-clamp-2">
                                        {item.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Visual Showcase (Right) */}
                    <div className="sticky top-32 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            {highlights.filter(h => h.image).map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
                                    viewport={{ once: true }}
                                    className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl ${idx === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C54]/80 via-transparent to-transparent opacity-60" />
                                    <div className="absolute bottom-6 left-8">
                                        <p className="text-white font-black text-lg uppercase tracking-widest">{item.title}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative bg-primary rounded-[4rem] p-12 lg:p-24 overflow-hidden shadow-[0_32px_64px_-16px_rgba(13,44,84,0.3)]"
                >
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,#F4B400_0%,transparent_50%)]" />

                    <div className="relative z-10 max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl lg:text-5xl font-black text-white mb-8 leading-tight">
                            {content.cta_text}
                        </h2>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                            <div
                                className="px-12 py-5 bg-accent text-[#0D2C54] font-black rounded-full shadow-lg shadow-accent/20 transition-all flex items-center gap-3 uppercase tracking-[0.2em] text-sm cursor-default"
                            >
                                Secure Admission <ArrowRight className="w-5 h-5" />
                            </div>
                            <motion.button
                                onClick={() => onNavigate('contact')}
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-12 py-5 bg-white/10 backdrop-blur-xl text-white border border-white/20 font-black rounded-full transition-all uppercase tracking-[0.2em] text-sm"
                            >
                                Inquire Now
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Admissions;
