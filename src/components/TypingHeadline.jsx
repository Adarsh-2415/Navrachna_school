import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sequence = [
    { text: "We don't just build students.", highlightStart: 28, pause: 2000 },
    { text: "We build leaders", highlightStart: 9, pause: 2000 },
    { text: "We build innovators", highlightStart: 9, pause: 1500 },
    { text: "We build thinkers", highlightStart: 9, pause: 1500 },
    { text: "We build achievers", highlightStart: 9, pause: 1500 },
    { text: "We build dreamers", highlightStart: 9, pause: 1500 },
];

export default function TypingHeadline() {
    const [index, setIndex] = useState(0);
    const [currentText, setCurrentText] = useState(sequence[0].text);
    const [isBackspacing, setIsBackspacing] = useState(false);
    const [isFading, setIsFading] = useState(true);

    useEffect(() => {
        if (isFading) {
            // Initial fade-in wait phase
            const timer = setTimeout(() => {
                setIsFading(false);
                setIsBackspacing(true);
            }, sequence[0].pause);
            return () => clearTimeout(timer);
        }

        const currentItem = sequence[index];
        const nextIndex = (index + 1) % sequence.length;
        const nextItem = sequence[nextIndex];

        const getCommonPrefixLength = (s1, s2) => {
            let i = 0;
            while (i < s1.length && i < s2.length && s1[i] === s2[i]) {
                i++;
            }
            return i;
        };

        const prefixLen = getCommonPrefixLength(currentItem.text, nextItem.text);

        if (isBackspacing) {
            if (currentText.length > prefixLen) {
                const timer = setTimeout(() => {
                    setCurrentText(prev => prev.slice(0, -1));
                }, 40); // slightly faster backspacing
                return () => clearTimeout(timer);
            } else {
                setIsBackspacing(false);
                setIndex(nextIndex);
            }
        } else {
            // Typing
            if (currentText.length < currentItem.text.length) {
                const timer = setTimeout(() => {
                    setCurrentText(currentItem.text.slice(0, currentText.length + 1));
                }, 80); // natural typing pace
                return () => clearTimeout(timer);
            } else {
                // Done typing, pause before backspacing
                const timer = setTimeout(() => {
                    setIsBackspacing(true);
                }, currentItem.pause);
                return () => clearTimeout(timer);
            }
        }
    }, [currentText, isBackspacing, isFading, index]);

    const highlightStart = sequence[index].highlightStart;

    const renderText = () => {
        const staticText = currentText.slice(0, highlightStart);
        const dynamicText = currentText.slice(highlightStart);

        return (
            <>
                <span className="text-white">{staticText}</span>
                {dynamicText && (
                    <span 
                        className="text-accent font-bold"
                        style={{ textShadow: "0 0 10px rgba(244,180,0,0.4)" }}
                    >
                        {dynamicText}
                    </span>
                )}
            </>
        );
    };

    return (
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-block mx-auto text-center whitespace-nowrap"
        >
            {renderText()}
            <span className="inline-block w-[3px] h-[0.9em] bg-white ml-2 align-middle cursor-blink"></span>

            <style>{`
                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .cursor-blink {
                    animation: blink 1s infinite;
                }
            `}</style>
        </motion.span>
    );
}
