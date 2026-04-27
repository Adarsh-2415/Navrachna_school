import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Wifi, Gamepad2, Users2, BookOpen, Trophy, Leaf, HeartHandshake, Lightbulb } from 'lucide-react';

const infrastructureData = [
    {
        title: "Campus Facilities",
        icon: <Building2 className="w-8 h-8" />,
        image: "/images/school.jpg",
        description: "Lush green campus with proper ventilated class rooms, well-stocked library, sufficient wash rooms, and safe environment (CCTV surveillance). Full power backup through inverter and generator."
    },
    {
        title: "Modern Labs",
        icon: <Lightbulb className="w-8 h-8" />,
        image: "/images/484168732_947737120809261_1402968853216808328_n.jpg",
        description: "Well equipped science, maths and computer labs for practical understanding."
    },
    {
        title: "Indoor & Outdoor Sports",
        icon: <Gamepad2 className="w-8 h-8" />,
        image: "/images/509812389_1017939550455684_6887700924622077624_n.jpg",
        description: "Plenty of space for indoor and outdoor games. Students hone skills in Cricket, Volleyball, Badminton, Football, Table Tennis, Chess, Carrom, and more."
    },
    {
        title: "House Activities",
        icon: <Users2 className="w-8 h-8" />,
        image: "/images/482981259_947732477476392_6692978668766390755_n.jpg",
        description: "Interhouse sports and activities like craft, public speaking, quiz, sewing, and fireless cooking keep the atmosphere vibrant while building discipline and cooperation."
    },
    {
        title: "Annual Function & Exhibition",
        icon: <Trophy className="w-8 h-8" />,
        image: "/images/484698220_948859484030358_2261861571828917806_n.jpg",
        description: "Scientific and cultural creativity is celebrated through vast annual exhibitions. Achievers across all spheres are proudly awarded."
    },
    {
        title: "Eco Awareness",
        icon: <Leaf className="w-8 h-8" />,
        image: "/images/504057246_1006506028265703_3612765264938177387_n.jpg",
        description: "Namami Gange projects, posters, and IIT Roorkee prizes reflect our eco-efforts."
    },
    {
        title: "Social Issues & Future Guidance",
        icon: <HeartHandshake className="w-8 h-8" />,
        image: "/images/598155090_1156390373277267_1054844702589574118_n.jpg",
        description: "Students learn the ill effects of bad habits through campaigns. Reputed mentors from IIT and CBRI guide students, helping alumni crack Delhi University & HNBGU via CUET."
    }
];

const Infrastructure = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeItem = infrastructureData[activeIndex];

    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden bg-gray-50/30">
            {/* Soft background aesthetics */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent -z-10"></div>
            
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 relative z-10"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-6">
                    World-Class <span className="text-secondary relative">
                        Infrastructure
                        <span className="absolute bottom-1 left-0 w-full h-3 bg-accent/30 -z-10 rounded-full transform -rotate-1"></span>
                    </span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Providing a nurturing and well-equipped environment to foster complete physical, mental, and intellectual development.
                </p>
            </motion.div>

            {/* INTERACTIVE TAB LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 relative z-10 max-w-6xl mx-auto">
                
                {/* Sidebar Navigation */}
                <div className="flex lg:flex-col w-full lg:w-[35%] overflow-x-auto lg:overflow-y-auto gap-3 pb-4 lg:pb-0 lg:pr-2 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {infrastructureData.map((item, idx) => (
                        <button 
                            key={idx} 
                            onClick={() => setActiveIndex(idx)}
                            className={`flex-none snap-start flex items-center gap-4 text-left p-3 sm:p-4 rounded-2xl transition-all duration-300 min-w-[240px] lg:min-w-0 border ${
                                activeIndex === idx 
                                ? 'bg-[#0D2C54] text-white shadow-xl lg:scale-[1.02] border-[#0D2C54]' 
                                : 'bg-white hover:bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-300 shadow-sm'
                            }`}
                        >
                            <div className={`flex-shrink-0 p-2.5 rounded-xl transition-colors duration-300 ${
                                activeIndex === idx ? 'bg-white/20 text-white' : 'bg-[#0D2C54]/5 text-[#0D2C54]'
                            }`}>
                                {item.icon}
                            </div>
                            <span className={`font-bold text-sm sm:text-base line-clamp-2 ${activeIndex === idx ? 'text-white' : 'text-gray-800'}`}>
                                {item.title}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Main Display Area */}
                <div className="lg:w-[65%] min-h-[350px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: 20, scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -20, scale: 0.98 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="relative rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] h-full flex flex-col justify-end"
                        >
                            <div className="absolute inset-0 z-0">
                                <motion.img 
                                    key={`img-${activeIndex}`}
                                    initial={{ scale: 1.1, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                    src={activeItem.image} 
                                    alt={activeItem.title} 
                                    className="w-full h-full object-cover" 
                                />
                                {/* Overlay Gradients for readability */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>
                            </div>
                            
                            <div className="relative z-10 flex flex-col h-full justify-end items-start p-6 sm:p-10 lg:p-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="max-w-xl bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 rounded-[2rem] shadow-2xl"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="p-3 bg-accent/20 rounded-2xl text-accent backdrop-blur-xl border border-accent/30 shadow-lg shadow-accent/10">
                                            {React.cloneElement(activeItem.icon, { className: "w-6 h-6" })}
                                        </div>
                                        <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                                            {activeItem.title}
                                        </h3>
                                    </div>
                                    
                                    <p className="text-gray-100 text-lg sm:text-xl leading-relaxed font-medium drop-shadow-sm">
                                        {activeItem.description}
                                    </p>
                                    
                                    <div className="mt-6 flex gap-2">
                                        <div className="w-12 h-1 bg-accent rounded-full"></div>
                                        <div className="w-4 h-1 bg-white/30 rounded-full"></div>
                                        <div className="w-2 h-1 bg-white/10 rounded-full"></div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
                
            </div>
        </section>
    );
};

export default Infrastructure;
