import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';

// Helper to generate the bento box sizes for the imported images
const getBentoSize = (index, totalLength) => {
    // Handling the final row for 47 images to prevent blank spaces at the end
    // (47 % 7 leaves 5 remaining items). The last two items need to fill the remaining row.
    if (totalLength === 47) {
        if (index === 45) return 'md:col-span-2 col-span-1 row-span-1'; // Penultimate wide
        if (index === 46) return 'md:col-span-2 col-span-1 row-span-1'; // Final wide
    }

    if (totalLength === 48) {
        if (index === 47) return 'md:col-span-2 col-span-1 row-span-1'; // Force last item landscape
    }

    // Specific Override for index 18: should be portrait/tall
    if (index === 18) {
        return 'md:col-span-1 md:row-span-2 col-span-1 row-span-1'; // Tall
    }

    // Standard pattern to repeat the bento sizes
    const pattern = [
        'md:col-span-2 md:row-span-2 col-span-1 row-span-1', // Large Wide
        'col-span-1 row-span-1', // Square
        'md:col-span-1 md:row-span-2 col-span-1 row-span-1', // Tall
        'col-span-1 row-span-1', // Square
        'md:col-span-2 col-span-1 row-span-1', // Wide
        'col-span-1 row-span-1', // Square
        'col-span-1 row-span-1' // Square
    ];
    return pattern[index % pattern.length];
};

// List of all new 47 image filenames provided in the public folder
const imageFiles = [
    "482244657_948859270697046_1911849737861344986_n.jpg",
    "482249029_948859357363704_4530492633132783894_n.jpg",
    "482325421_943739331209040_7051521685158623015_n.jpg",
    "482328501_943736854542621_3514102605852703857_n.jpg",
    "school.jpg",
    "482981259_947732477476392_6692978668766390755_n.jpg",
    "482984569_947737084142598_6119002586274186650_n.jpg",
    "482987461_947737147475925_246103488702271136_n.jpg",
    "482988217_947737070809266_4501483783927818766_n.jpg",
    "483106183_942411058008534_6401002120412312681_n.jpg",
    "483444078_943736717875968_6267256151590222234_n.jpg",
    "484065500_947736917475948_6274786725347581069_n.jpg",
    "484073607_947737157475924_2594236654993976121_n.jpg",
    "484098552_948391964077110_8629329330957668310_n.jpg",
    "484168732_947737120809261_1402968853216808328_n.jpg",
    "484351390_947732484143058_5503767297695214411_n.jpg",
    "484599193_948859407363699_9034063397987157345_n.jpg",
    "484629475_948392000743773_3804311994333968891_n.jpg",
    "484651457_948374887412151_6127269280883331168_n.jpg",
    "484698220_948859484030358_2261861571828917806_n.jpg",
    "484790968_948859154030391_1580150324730536192_n.jpg",
    "484875266_948859244030382_2061972923574032327_n.jpg",
    "485187028_948859280697045_8306320597851957725_n.jpg",
    "490822186_967706845478955_3433369480060652273_n.jpg",
    "498662672_993513926231580_3587196393297044506_n.jpg",
    "504057246_1006506028265703_3612765264938177387_n.jpg",
    "509812389_1017939550455684_6887700924622077624_n.jpg",
    "561360257_1111023534480618_5157595731424400310_n.jpg",
    "561533317_1111023167813988_5621357260555894616_n.jpg",
    "565360230_1111023621147276_9068453021524193902_n.jpg",
    "583032339_1135670565349248_3636096411982503555_n.jpg",
    "598155090_1156390373277267_1054844702589574118_n.jpg",
    "619337093_1190934356489535_4157400195201787716_n.jpg",
    "622217181_1190931973156440_8503932967500745981_n.jpg",
    "622260829_1190932756489695_6263067791117909188_n.jpg",
    "622366997_1190936079822696_4705298347288973066_n.jpg",
    "622371541_1190936013156036_3698024360921014071_n.jpg",
    "622378240_1190936193156018_1471731612193004918_n.jpg",
    "622380560_1190931269823177_8731326164328778947_n.jpg",
    "622678783_1190932516489719_5863082296130544859_n.jpg",
    "622682887_1190936246489346_4859008588651098700_n.jpg",
    "623799441_1190931723156465_487889426722852196_n.jpg",
    "624119034_1190933099822994_8035847084375257334_n.jpg",
    "624416764_1190935876489383_3987188416078467085_n.jpg",
    "624462624_1190931386489832_8814793803758274795_n.jpg",
    "624840630_1190932303156407_6509099557325043578_n.jpg",
    "625080124_1190933549822949_7107608296686972158_n.jpg",
    "625089994_1190936139822690_6840924778873079502_n.jpg"
];

// Static images array
const staticImageFiles = imageFiles.map((filename, i) => ({
    id: `static-${i}`,
    src: `/images/${filename}`,
    title: `Gallery Image ${i + 1}`
}));

const Gallery = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [dynamicImages, setDynamicImages] = useState([]);

    // Fetch dynamic images uploaded by Admin
    useEffect(() => {
        const q = query(collection(db, 'gallery_images'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                src: doc.data().url,
                title: 'Special Event'
            }));
            setDynamicImages(data);
        });
        return () => unsubscribe();
    }, []);

    // Combine dynamic and static images, then compute bento sizes
    const allImages = [...dynamicImages, ...staticImageFiles].map((img, i, arr) => ({
        ...img,
        size: getBentoSize(i, arr.length)
    }));

    // Navigate to previous image
    const handlePrev = (e) => {
        if (e) e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex(selectedImageIndex === 0 ? allImages.length - 1 : selectedImageIndex - 1);
        }
    };

    const handleNext = (e) => {
        if (e) e.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex(selectedImageIndex === allImages.length - 1 ? 0 : selectedImageIndex + 1);
        }
    };

    // Keyboard navigation handlers
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedImageIndex(null);
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedImageIndex]);

    // Prevent background scrolling when lightbox is open
    useEffect(() => {
        if (selectedImageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedImageIndex]);

    return (
        <div className="py-20 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-[#F4F9FF] to-[#FFFFFF] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Enhanced Dramatic Header Section */}
                <div className="text-center mb-24 relative z-10">
                    {/* Decorative Glowing Background */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-[800px] h-[300px] bg-gradient-to-r from-blue-400/10 via-[#F3B605]/10 to-transparent rounded-[100%] blur-[80px] -z-10 pointer-events-none"></div>

                    {/* Premium Pulse Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 mb-8 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] border border-[#F3B605]/30 hover:border-[#F3B605]/60 transition-colors"
                    >
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F3B605] animate-pulse shadow-[0_0_8px_rgba(243,182,5,0.8)]"></span>
                        <span className="text-[#F3B605] font-bold text-xs md:text-sm tracking-[0.25em] uppercase pl-1">
                            Our Legacy
                        </span>
                    </motion.div>

                    {/* Monumental Typography with SVG Underline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                        className="text-[44px] sm:text-[56px] md:text-[72px] lg:text-[84px] font-black tracking-tighter mb-8 leading-[1.05] text-[#0B2C56] uppercase"
                    >
                        <span className="block md:inline-block md:mr-4">A GLIMPSE INTO </span>
                        <span className="relative inline-block mt-2 md:mt-0">
                            {/* Rich Gradient Text */}
                            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#F3B605] via-[#FFD147] to-[#F3B605]">
                                EXCELLENCE
                            </span>
                            {/* Decorative Swoosh/Underline */}
                            <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full h-[18px] md:h-[24px] text-[#F3B605]/30 -z-10" viewBox="0 0 200 24" preserveAspectRatio="none">
                                <path d="M0,20 Q100,-5 200,20 L200,24 L0,24 Z" fill="currentColor" />
                            </svg>
                        </span>
                    </motion.h1>

                    {/* Refined Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                        className="text-lg md:text-[22px] text-[#556172]/90 max-w-3xl mx-auto font-medium leading-[1.7] tracking-wide"
                    >
                        Explore the vibrant life, state-of-the-art facilities, and unforgettable<br className="hidden md:block" /> moments at Navrachna Public School.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:auto-rows-[280px]">
                    {allImages.map((img, index) => (
                        <motion.div
                            layoutId={`image-container-${img.id}`}
                            key={img.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                            transition={{ duration: 0.5, delay: (index % 12) * 0.05 }}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`relative rounded-3xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-2xl transition-all duration-500 ${img.size} min-h-[250px] md:min-h-0 bg-gray-100 flex items-center justify-center`}
                        >
                            {/* Image with subtle continuous scale and active scale on hover */}
                            <motion.img
                                src={img.src}
                                alt={img.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-110"
                                loading="lazy"
                            />

                            {/* Magnetic Hover Overlay */}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                    className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white transform scale-0 group-hover:scale-100 transition-transform duration-300"
                                >
                                    <Maximize2 size={28} strokeWidth={2} />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Fullscreen Lightbox Slider using createPortal */}
            {createPortal(
                <AnimatePresence>
                    {selectedImageIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            {/* Selected Image */}
                            <div className="relative w-full h-full flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={selectedImageIndex}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        src={allImages[selectedImageIndex].src}
                                        alt={allImages[selectedImageIndex].title}
                                        className="max-w-full max-h-[90vh] object-contain select-none shadow-2xl rounded-xl"
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Top Right Close Button */}
                            <motion.button
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setSelectedImageIndex(null)}
                                className="absolute top-6 right-6 lg:top-8 lg:right-8 z-[10000] w-12 h-12 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/20 hover:bg-white/30 cursor-pointer"
                            >
                                <X size={24} strokeWidth={2.5} />
                            </motion.button>

                            {/* Left Prev Button */}
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrev}
                                className="absolute left-4 lg:left-8 z-[10000] w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/20 hover:bg-white/30 cursor-pointer"
                            >
                                <ChevronLeft size={32} strokeWidth={2.5} className="ml-[-2px]" />
                            </motion.button>

                            {/* Right Next Button */}
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNext}
                                className="absolute right-4 lg:right-8 z-[10000] w-14 h-14 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors border border-white/20 hover:bg-white/30 cursor-pointer"
                            >
                                <ChevronRight size={32} strokeWidth={2.5} className="mr-[-2px]" />
                            </motion.button>

                            {/* Image Counter */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10000] px-4 py-2 bg-black/50 backdrop-blur-md text-white/90 rounded-full font-medium text-sm tracking-widest border border-white/10"
                            >
                                {selectedImageIndex + 1} / {allImages.length}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Gallery;
