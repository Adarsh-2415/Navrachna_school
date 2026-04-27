import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import {
    ClipboardCheck,
    ShieldAlert,
    Star,
    Clock,
    Info,
    CheckCircle2,
    DoorOpen,
    Users,
    Cpu,
    Tv,
    MessageSquare,
    Trophy,
    Trees,
    Palette,
    FileText
} from 'lucide-react';

const RulesGuidelines = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'pages', 'rules'), (docSnap) => {
            if (docSnap.exists()) {
                setContent(docSnap.data());
            } else {
                setContent({
                    title: "Rules & Guidelines",
                    subtitle: "Discipline & Harmony",
                    description: "Nurturing discipline, excellence, and character in every student.",
                    cta_text: "Training minds, building values, and shaping a brighter future.",
                    warning_msg: "Use of foul language and/or abusive behaviour may lead to suspension.",
                    generalRules: [
                        "Students are not allowed to go out of the campus during school hours, including recess time.",
                        "No student shall be absent from class without sufficient reason. Parents/Guardians must clearly state the reason for the absence in the Leave Record of the School Diary.",
                        "Timely deposition of fee is necessary as per the prescribed schedule given at the time of admission.",
                        "The school prescribes uniform for all students. Every student should attend the school in the prescribed uniform. Students are expected to take pride in their personal appearance and to conform to all rules governing the school uniform. It is to instill a sense of belonging, camaraderie among fellow students.",
                        "Students will not wear ornaments/carry valuables in school.",
                        "Detailed guidelines are given in school diary."
                    ]
                });
            }
        });
        return () => unsubscribe();
    }, []);

    const disciplinePoints = [
        {
            title: "Integral Learning",
            text: "Discipline is an integral part of the learning process. To develop self-control a student must be trained to live in harmony with others.",
            icon: ClipboardCheck
        },
        {
            title: "Respectful Environment",
            text: "Bullying and harassment at school along with other disruptive activities are unacceptable. Use of foul language and/or abusive behaviour may lead to suspension.",
            icon: ShieldAlert
        },
        {
            title: "Punctuality & Assembly",
            text: "All students shall be in the school premises a few minutes before the morning bell and take part in the solemn morning assembly in an orderly and respectful manner.",
            icon: Clock
        },
        {
            title: "Cleanliness",
            text: "The school premises and classrooms must be kept clean and tidy.",
            icon: CheckCircle2
        }
    ];

    const specialFeatures = [
        { title: "Qualified Faculty", icon: Users, desc: "Qualified and trained faculty dedicated to student growth." },
        { title: "Spacious Rooms", icon: DoorOpen, desc: "Spacious and well ventilated rooms for comfortable learning." },
        { title: "Computer Resource", icon: Cpu, desc: "Modern Computer Resource centre for digital literacy." },
        { title: "Audio Visual Room", icon: Tv, desc: "Audio visual Room for an immersive visual learning Experience." },
        { title: "Spoken English", icon: MessageSquare, desc: "Strong emphasis on spoken English and communication skills." },
        { title: "Co-curricular", icon: Trophy, desc: "Rich Co-curricular activities for all-round development." },
        { title: "Excursion Trips", icon: Trees, desc: "Trips to expose the children to nature and history." },
        { title: "Kids Park", icon: Trees, desc: "A safe and fun kids park for physical activity." },
        { title: "Art & Craft", icon: Palette, desc: "Holistic learning through creative Art and Craft." }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    if (!content) return null;

    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <section className="bg-gradient-to-b from-[#0D2C54] to-[#1A3A6A] py-20 px-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary rounded-full blur-[80px]" />
                </div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
                    >
                        {content.title} <br className="md:hidden" /><span className="text-accent italic">{content.subtitle}</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-blue-100/80 font-medium"
                    >
                        {content.description}
                    </motion.p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-20 divide-y divide-gray-100">
                {/* General Rules */}
                <section className="pb-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <FileText className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-[#0D2C54]">General Rules</h2>
                    </div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {(content.generalRules || []).map((rule, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="p-6 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all group lg:p-8"
                            >
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold flex-none mt-1 group-hover:bg-primary group-hover:text-white transition-colors">
                                        {idx + 1}
                                    </div>
                                    <p className="text-gray-600 font-semibold leading-relaxed">
                                        {rule}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Discipline */}
                <section className="py-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-accent/10 rounded-2xl flex items-center justify-center text-accent">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-[#0D2C54]">Discipline</h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {disciplinePoints.map((point, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col h-full"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.15, rotate: 8, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                                    className="w-14 h-14 bg-[#0D2C54] rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg cursor-pointer"
                                >
                                    <point.icon className="w-7 h-7" />
                                </motion.div>
                                <h3 className="text-xl font-black text-[#0D2C54] mb-4">{point.title}</h3>
                                <p className="text-gray-500 font-semibold leading-relaxed mb-6">
                                    {point.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-2xl">
                        <div className="flex gap-4">
                            <Info className="w-6 h-6 text-red-500 flex-none" />
                            <p className="text-red-700 font-bold italic">
                                {content.warning_msg}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Special Features */}
                <section className="pt-20">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <Star className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-[#0D2C54]">Special Features</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {specialFeatures.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                viewport={{ once: true }}
                                className="p-8 rounded-[2.5rem] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
                            >
                                <motion.div
                                    whileHover={{ scale: 1.15, rotate: -8, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                                    className="w-16 h-16 bg-gray-50 rounded-[1.5rem] flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-gray-100 group-hover:border-transparent"
                                >
                                    <feature.icon className="w-8 h-8" />
                                </motion.div>
                                <h3 className="text-xl font-black text-[#0D2C54] mb-3 group-hover:text-primary transition-colors">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-500 font-semibold leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Final CTA/Note */}
            <section className="bg-gray-50 py-16 px-6 text-center">
                <div className="max-w-2xl mx-auto p-12 rounded-[3.5rem] bg-white border border-gray-100 shadow-xl">
                    <p className="text-[#0D2C54] font-black text-2xl leading-relaxed italic">
                        "{content.cta_text}"
                    </p>
                </div>
            </section>
        </div>
    );
};

export default RulesGuidelines;
