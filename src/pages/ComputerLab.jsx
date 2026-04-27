import React from 'react';
import { motion } from 'framer-motion';
import {
    Cpu,
    Monitor,
    Zap,
    Search,
    Gamepad2,
    Rocket,
    CheckCircle2,
    Star
} from 'lucide-react';

const ComputerLab = () => {
    const objectives = [
        {
            icon: Lightbulb,
            title: "Stimulated Thinking",
            text: "To develop the concepts and stimulate the thinking of a child through interactive computing."
        },
        {
            icon: Search,
            title: "Analytical Ability",
            text: "To promote the ability to analyze the facts behind the key concept using digital tools."
        },
        {
            icon: Gamepad2,
            title: "Fun Learning",
            text: "To make students comfortable with the use of computers so that they have fun in using them."
        },
        {
            icon: Rocket,
            title: "Future Interest",
            text: "To arise the interest of students about computers and emerging technologies."
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Professional Hero Section */}
            <section className="relative min-h-[600px] lg:h-[80vh] flex items-center justify-center bg-[#0D2C54] pt-28 pb-48 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={`${import.meta.env.BASE_URL}images/lab_premium.png`}
                        alt="Computer Lab"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2C54] via-transparent to-black/40" />
                </div>

                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto flex flex-col items-center justify-center h-full">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/20 backdrop-blur-md border border-primary/30 text-white px-8 py-3 rounded-full inline-flex items-center gap-3 mb-8 font-black uppercase tracking-[0.4em] text-[10px] md:text-[12px] shadow-2xl"
                    >
                        <Cpu className="w-4 h-4 text-accent" />
                        <span>Digital Excellence Center</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter mb-8 drop-shadow-2xl"
                    >
                        Creative <br />
                        <span className="text-accent relative inline-block italic">
                            Computing
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="absolute -bottom-2 left-0 h-2 bg-white/20 rounded-full"
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl lg:text-2xl text-white/90 font-bold max-w-3xl mx-auto leading-relaxed border-l-4 border-accent pl-6 text-left mb-6"
                    >
                        "Computers nowadays are not only about computing, they are about living." Proficiency has become a key to success in the modern world.
                    </motion.p>
                </div>
            </section>

            {/* Main Content Card */}
            <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-[3rem] p-10 md:p-20 shadow-[0_40px_80px_-15px_rgba(13,44,84,0.15)] border border-gray-100"
                >
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-[#0D2C54] mb-8 leading-tight">
                            Mastering the <span className="text-primary italic">Digital Frontier</span>
                        </h2>
                        <p className="text-xl text-gray-500 font-semibold leading-relaxed">
                            The students are given ample opportunities to explore all wings of Computer technology. Our course is meticulously designed to impart expertise in day-to-day computing needs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {objectives.map((obj, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group flex items-start gap-6 p-8 rounded-[2.5rem] bg-gray-50/50 border border-transparent hover:border-primary/20 hover:bg-white hover:shadow-xl transition-all duration-500"
                            >
                                <div className="flex-none w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                    <obj.icon className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-black text-[#0D2C54] mb-3 group-hover:text-primary transition-colors">
                                        {obj.title}
                                    </h3>
                                    <p className="text-gray-500 font-bold leading-relaxed">
                                        {obj.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tech Highlights */}
                <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "High-Speed Access", desc: "Dedicated fiber backbone for seamless research.", icon: Zap },
                        { title: "Advanced Software", desc: "Access to professional creative and dev suites.", icon: CheckCircle2 },
                        { title: "Expert Support", desc: "Dedicated IT faculty to guide explorations.", icon: Star }
                    ].map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="bg-[#0D2C54] p-10 rounded-[3rem] text-white relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-accent/10 transition-colors" />
                            <item.icon className="w-10 h-10 text-accent mb-6" />
                            <h4 className="text-2xl font-black mb-4">{item.title}</h4>
                            <p className="text-white/70 font-bold">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Required for the mapping in objectives
const Lightbulb = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
);

export default ComputerLab;
