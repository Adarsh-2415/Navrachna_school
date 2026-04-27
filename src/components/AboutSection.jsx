import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const AboutSection = () => {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'site_content', 'about_us'), (docSnap) => {
            if (docSnap.exists()) {
                setContent(docSnap.data());
            } else {
                // Fallback to defaults if document isn't initialized yet
                setContent({
                    description: "Navrachna Public School is a co-educational English Medium School from Nursery to class 12th. The School is committed to develop self confidence, discipline, determination, sincerity and loyalty in every child. We believe that learning should be enjoyable, a process of imagination & Innovation, a gradual unfolding of mind. We value and nurture individuality of every child.",
                    facilities: [
                        "Lush green campus with swings and other play equipment for small kids.",
                        "Spacious and well ventilated classrooms specially designed to suit the needs of the little ones.",
                        "Well Stocked library, Computer Room Studio for Painting, Music and Dance.",
                        "Well maintained sport's facilities for various indoor and out door games.",
                        "Literary Club, Science Club, Cultural club.",
                        "Campus is Equipped with CCTV surveillance."
                    ]
                });
            }
        });
        return () => unsubscribe();
    }, []);

    if (!content) return (
        <section id="about" className="py-24 flex justify-center text-primary">
            <Loader2 className="w-8 h-8 animate-spin" />
        </section>
    );
    return (
        <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 lg:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 transition-all">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary mb-6">
                        Welcome to <span className="text-secondary">Navrachna Public School</span>
                    </h2>
                    <div className="w-24 h-1 bg-accent mx-auto rounded-full mb-8" />
                    <p className="text-lg text-gray-600 leading-relaxed text-left md:text-center whitespace-pre-line">
                        {content.description}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-3xl p-4 md:p-8"
                >
                    <h3 className="sr-only">
                        School has state of art facilities including:
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        {content.facilities.map((facility, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 * index }}
                                className="flex items-center bg-[#FDFBF7] p-6 lg:p-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-[#F0ECE1] transition-all hover:shadow-md hover:border-accent/30"
                            >
                                <div className="flex-shrink-0 mr-6">
                                    <div className="w-8 h-8 rounded-full border-2 border-accent flex items-center justify-center">
                                        <CheckCircle2 className="w-5 h-5 text-accent" strokeWidth={3} />
                                    </div>
                                </div>
                                <p className="text-gray-700 leading-relaxed font-medium text-lg">{facility}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AboutSection;
