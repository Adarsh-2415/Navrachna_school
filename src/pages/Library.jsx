import React from 'react';
import { motion } from 'framer-motion';
import {
    Book,
    BookOpen,
    Library as LibraryIcon,
    Newspaper,
    GraduationCap,
    Sparkles,
    MousePointer2,
    Users
} from 'lucide-react';

const Library = () => {
    const collections = [
        { name: "Course Books", icon: Book },
        { name: "Story Books", icon: Sparkles },
        { name: "Magazines", icon: Newspaper },
        { name: "Encyclopedias", icon: LibraryIcon },
        { name: "Dictionaries", icon: BookOpen },
        { name: "Newspapers", icon: MousePointer2 }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Elegant Hero Section */}
            <section className="relative min-h-[600px] lg:h-[80vh] flex items-center justify-center bg-[#0D2C54] pt-28 pb-32 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/library_premium.png"
                        alt="Library"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C54] via-transparent to-black/30" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-accent/20 backdrop-blur-md border border-accent/40 text-accent px-8 py-3 rounded-full inline-flex items-center gap-3 mb-8 font-black uppercase tracking-[0.4em] text-[10px] md:text-[12px] shadow-2xl"
                    >
                        <LibraryIcon className="w-4 h-4" />
                        <span>The Knowledge Hub</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-8 drop-shadow-2xl"
                    >
                        Learning <br />
                        <span className="text-white relative inline-block">
                            Sanctuary
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="absolute -bottom-2 left-0 h-2 bg-accent rounded-full"
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl lg:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed italic"
                    >
                        "The School library is a learning resource centre designed to foster the love for reading in every student."
                    </motion.p>
                </div>
            </section>

            {/* Main Content Card */}
            <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] p-10 md:p-20 shadow-[0_40px_80px_-15px_rgba(13,44,84,0.1)] border border-gray-100"
                >
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-[#0D2C54] mb-8 leading-tight">
                                Curated <br />
                                <span className="text-primary italic">Collections</span>
                            </h2>
                            <p className="text-xl text-gray-500 font-semibold leading-relaxed mb-10">
                                Our library is stocked with a wide and diverse collection of reading materials, attached to a spacious reading area for students and faculty alike.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Extensive Reading Material",
                                    "Quiet & Wide Reading Areas",
                                    "Faculty Research Support",
                                    "Fostering Reading Habits"
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-4 text-[#0D2C54] font-bold">
                                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                            <Users className="w-3.5 h-3.5" />
                                        </div>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            {collections.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="p-8 bg-gray-50 rounded-[2.5rem] text-center group hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-500 border border-transparent hover:border-primary/10"
                                >
                                    <item.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                                    <span className="block text-sm font-black text-[#0D2C54] uppercase tracking-wider">{item.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Lower Badge Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-32 p-16 bg-[#FDFBF7] rounded-[4rem] text-center border-2 border-accent/20 relative overflow-hidden"
                >
                    <BookOpen className="w-12 h-12 text-[#0D2C54] mx-auto mb-6 opacity-30" />
                    <h3 className="text-3xl font-black text-[#0D2C54] mb-4">A Universe in Every Page</h3>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        From encyclopedias to modern newspapers, our treasure trove of knowledge is constantly updated to meet the evolving needs of our learners.
                    </p>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </div>
    );
};

export default Library;
