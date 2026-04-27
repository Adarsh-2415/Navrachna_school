import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const AnnouncementBar = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        // Fetch all announcements ordered by newest first, then filter for active in JS to avoid needing complex Firestore indexes
        const q = query(collection(db, 'announcements'), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs
                .map(doc => doc.data())
                .filter(data => data.active)
                .map(data => data.text);
            setAnnouncements(data);
        });

        return () => unsubscribe();
    }, []);

    // Fallback fallback text if db is empty or no active announcements
    const displayTexts = announcements.length > 0 
        ? announcements 
        : ["🎓 Admissions Open 2026–27 | Nursery to Class 12 | Apply Now"];

    return (
        <div className="w-full bg-[#0D2C54] h-10 md:h-12 overflow-hidden flex items-center relative border-b border-white/10 group select-none">
            {/* Main Marquee Wrapper */}
            <div className="flex whitespace-nowrap marquee-wrapper">
                {/* We duplicate the content to ensure it fills the screen for a seamless loop */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center px-4 animate-marquee group-hover:pause-animation">
                        <span className="text-white text-[11px] sm:text-xs md:text-sm lg:text-base font-medium tracking-wide flex items-center">
                            {displayTexts.map((text, idx) => (
                                <React.Fragment key={idx}>
                                    <span className="text-[#F4B400] font-bold mr-2 uppercase tracking-tighter flex items-center gap-2">
                                        {text}
                                    </span>
                                    {idx < displayTexts.length - 1 && <span className="opacity-40 mx-3">|</span>}
                                </React.Fragment>
                            ))}
                        </span>
                        {/* Spacer between segments */}
                        <div className="w-12 md:w-24"></div>
                    </div>
                ))}
            </div>

            {/* Subtle gloss effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"></div>
        </div>
    );
};

export default AnnouncementBar;
