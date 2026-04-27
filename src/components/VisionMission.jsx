import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Rocket } from 'lucide-react';

const VisionMission = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">

                {/* Vision Column */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center text-center group"
                >
                    {/* Vision Icon */}
                    <motion.div
                        className="w-24 h-24 mb-6 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                    >
                        <Eye className="w-12 h-12 text-primary fill-primary/10 stroke-[2.5px]" />
                    </motion.div>

                    {/* Vision Heading */}
                    <h3 className="text-2xl font-bold text-primary mb-4 relative">
                        Vision
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
                    </h3>

                    {/* Vision Text */}
                    <p className="text-gray-700 leading-relaxed max-w-md mx-auto mt-4 text-base md:text-lg">
                        To provide a happy, caring and stimulating environment where children will recognise and achieve their fullest potential, so that they can make their best contribution to society.
                    </p>
                </motion.div>

                {/* Mission Column */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-col items-center text-center group"
                >
                    {/* Mission Icon */}
                    <motion.div
                        className="w-24 h-24 mb-6 rounded-full bg-accent flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out"
                        whileHover={{ y: -10, rotate: 15 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Rocket className="w-12 h-12 text-primary fill-primary/10 stroke-[2.5px]" />
                    </motion.div>

                    {/* Mission Heading */}
                    <h3 className="text-2xl font-bold text-primary mb-4 relative">
                        Mission
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent rounded-full group-hover:w-full transition-all duration-300"></span>
                    </h3>

                    {/* Mission Text */}
                    <p className="text-gray-700 leading-relaxed max-w-md mx-auto mt-4 text-base md:text-lg">
                        To develop young children with active and creative minds, a sense of understanding and compassion for all, and the courage to act on their beliefs. We aim for the total development of each child: spiritual, moral, intellectual, social, emotional and physical.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};

export default VisionMission;
