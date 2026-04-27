import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, BookOpen, Beaker, Globe, Pencil } from 'lucide-react';
import TypingHeadline from './TypingHeadline';

const FloatingIcon = ({ icon: Icon, delay = 0, size = 60, top, left, right, bottom, color = "#1E5AA8", rotate = 0 }) => (
    <motion.div
        className="absolute z-0 pointer-events-none opacity-[0.12] blur-[1px] hidden md:block"
        style={{ top, left, right, bottom }}
        initial={{ y: 0, rotate: rotate }}
        animate={{
            y: [-15, 15, -15],
            rotate: [rotate - 5, rotate + 5, rotate - 5],
        }}
        transition={{
            duration: 7 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: delay
        }}
    >
        <Icon size={size} color={color} strokeWidth={1.5} />
    </motion.div>
);

const Hero = ({ onNavigate }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderImages = [
        "/images/482328501_943736854542621_3514102605852703857_n.jpg",
        "/images/school.jpg",
        "/images/482981259_947732477476392_6692978668766390755_n.jpg",
        "/images/482987461_947737147475925_246103488702271136_n.jpg",
        "/images/509812389_1017939550455684_6887700924622077624_n.jpg"
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15,
            },
        },
    };

    return (
        <div className="relative w-full min-h-[80vh] flex items-center justify-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* Full-width Background Image Slider */}
            <div className="absolute inset-0 z-0 bg-[#0D2C54] overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.img
                        key={currentSlide}
                        src={sliderImages[currentSlide]}
                        alt="Navrachna Public School Campus Showcase"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ 
                            opacity: { duration: 1.5, ease: "easeInOut" },
                            scale: { duration: 6, ease: "easeOut" }
                        }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
                
                {/* Darkened overlay for readability */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] z-10 pointer-events-none"></div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-5xl mx-auto text-center relative z-10"
            >

                {/* Main Heading */}
                <motion.div variants={itemVariants}>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.2] mb-6 drop-shadow-xl w-full flex justify-center">
                        <TypingHeadline />
                    </h1>
                </motion.div>

                {/* Subheading text */}
                <motion.div variants={itemVariants}>
                    <p className="mt-6 text-lg md:text-xl lg:text-2xl leading-relaxed text-gray-100 max-w-3xl mx-auto font-medium drop-shadow-lg">
                        Navrachna Public School is dedicated to academic excellence, holistic development, and nurturing young minds with strong values, innovation, and leadership.
                    </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
                    <motion.button
                        onClick={() => onNavigate('contact')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-lg font-black text-[#0D2C54] transition-all bg-accent hover:bg-yellow-400 rounded-full shadow-lg hover:shadow-xl uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                        Apply for Admission
                    </motion.button>
                    <motion.button
                        onClick={() => onNavigate('admissions')}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto rounded-full bg-transparent px-10 py-4 text-lg font-bold text-white shadow-lg ring-2 ring-inset ring-white transition-all backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                        Explore Academics
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Slider Dots Indicator */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3 pointer-events-auto">
                {sliderImages.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`w-3 h-3 rounded-full transition-all duration-500 shadow-md ${currentSlide === idx ? 'bg-accent scale-125' : 'bg-white/50 hover:bg-white/90'}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Hero;
