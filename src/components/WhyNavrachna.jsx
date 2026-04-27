import React from 'react';
import { motion } from 'framer-motion';

const WhyNavrachna = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-14 lg:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-900/5 transition-all">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="max-w-5xl mx-auto text-center flex flex-col items-center"
                >
                    <div className="relative inline-block mb-10">
                        <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-gray-900 z-10 relative">
                            Why Navrachna Public School ?
                        </h2>
                        {/* Custom double red underline mimicking the screenshot */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] flex flex-col gap-1.5 z-0 pointer-events-none">
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                className="h-1.5 w-full bg-[#E05B5B] rounded-full transform -rotate-1 origin-left"
                            />
                            <motion.div
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                                className="h-1 w-[85%] bg-[#E87A7A] rounded-full ml-auto transform rotate-1 origin-right"
                            />
                        </div>
                    </div>

                    <p className="text-lg md:text-xl lg:text-xl text-gray-700 leading-relaxed text-left md:text-center mt-4 mb-10">
                        Navrachna Public School is a co-educational <strong className="font-bold text-gray-900 italic">English Medium School from Nursery to class 12th</strong>.
                        The School is committed to develop self confidence, discipline, determination, sincerity and loyalty in every child.
                        We believe that learning should be enjoyable, a process of imagination & Innovation, a gradual unfolding of mind.
                        We value and nurture individuality of every child.
                    </p>

                    <div className="bg-[#FDFBF7] p-8 md:p-10 rounded-3xl border border-[#F0ECE1] shadow-sm w-full text-left">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-8 h-1 bg-accent rounded-full inline-block"></span>
                            School has state of art facilities including :-
                        </h3>
                        <ul className="space-y-4 text-gray-700 text-lg">
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-accent text-2xl leading-none mt-1">•</span>
                                Lush green campus with swings and other play equipment for small kids.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-accent text-2xl leading-none mt-1">•</span>
                                Spacious and well ventilated classrooms specially designed to suit the needs of the little ones.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.3 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-accent text-2xl leading-none mt-1">•</span>
                                Well Stocked library, Computer Room Studio for Painting, Music and Dance.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.4 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-accent text-2xl leading-none mt-1">•</span>
                                Well maintained sport's facilities for various indoor and outdoor games.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.5 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-accent text-2xl leading-none mt-1">•</span>
                                Literary Club, Science Club, Cultural club.
                            </motion.li>
                            <motion.li
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                                className="flex items-start gap-4"
                            >
                                <span className="text-accent text-2xl leading-none mt-1">•</span>
                                Campus is Equipped with CCTV surveillance.
                            </motion.li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default WhyNavrachna;
