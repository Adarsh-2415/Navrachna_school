import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ activePage, onNavigate }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Home');
    const [openDropdown, setOpenDropdown] = useState(null);

    const navLinks = [
        { name: 'Home', id: 'home' },
        { name: 'Mandatory Disclosures', id: 'disclosures' },
        { name: 'About Us', href: '#about', id: 'home' },
        {
            name: 'Academics',
            id: 'academics',
            subLinks: [
                { name: 'Admissions', id: 'admissions', href: '#' },
                { name: 'Fee Structure', id: 'fee-structure', href: '#' },
                { name: 'Holidays', id: 'holidays', href: '#' },
                { name: 'Rules and guidelines', id: 'rules', href: '#' },
            ]
        },
        {
            name: 'Infrastructure',
            id: 'infrastructure',
            subLinks: [
                { name: 'Class Room', id: 'classroom', href: '#' },
                { name: 'Computer Lab', id: 'computer-lab', href: '#' },
                { name: 'Library', id: 'library', href: '#' },
            ]
        },
        { name: 'Galleries', id: 'gallery' },
        { name: 'Contact Us', href: '#contact', id: 'home' },
    ];

    // Sync activeTab with activePage prop
    useEffect(() => {
        if (activePage === 'home') {
            setActiveTab('Home');
        } else if (activePage === 'disclosures') {
            setActiveTab('Mandatory Disclosures');
        } else if (activePage === 'home') {
             // Home covers contact section too
             setActiveTab('Home');
        } else if (activePage === 'admissions' || activePage === 'fee-structure' || activePage === 'holidays' || activePage === 'rules') {
            setActiveTab('Academics');
        } else if (activePage === 'gallery') {
            setActiveTab('Galleries');
        }
    }, [activePage]);

    // Google Translate Initialization
    useEffect(() => {
        // Function to initialize the widget
        const initTranslate = () => {
            if (window.google && window.google.translate && window.google.translate.TranslateElement) {
                // Clear the element before initializing to prevent duplicates
                const element = document.getElementById('google_translate_element');
                if (element) {
                    element.innerHTML = '';
                    new window.google.translate.TranslateElement({
                        pageLanguage: 'en',
                        includedLanguages: 'en,hi',
                        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                        autoDisplay: false,
                    }, 'google_translate_element');
                }
            }
        };

        // If script is already there, just init
        if (window.googleTranslateElementInit) {
            initTranslate();
            return;
        }

        window.googleTranslateElementInit = initTranslate;

        const addScript = document.createElement('script');
        addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        addScript.async = true;
        document.body.appendChild(addScript);

        return () => {
            // Cleanup references on unmount to prevent memory leaks or re-init issues
            // but keep the script as it's global
        };
    }, []);

    const handleNavClick = (e, link) => {
        setActiveTab(link.name);
        if (link.id === 'home' && link.href) {
            // Anchor link on home page
            if (activePage !== 'home') {
                e.preventDefault();
                onNavigate('home');
                // Small delay to allow home to render before scrolling
                setTimeout(() => {
                    window.location.hash = link.href;
                }, 100);
            }
        } else if (link.id) {
            e.preventDefault();
            onNavigate(link.id);
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-sm transition-all duration-300">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-22 py-2">
                    {/* Logo Section - Left */}
                    <div className="flex-none flex items-center pr-2">
                        <button
                            onClick={() => onNavigate('home')}
                            className="group flex flex-row items-center gap-3 md:gap-4"
                        >
                            <img src="/images/school-logo.jpg" alt="Navrachna Public School Logo" className="h-14 md:h-[68px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm mix-blend-multiply" />
                            <div className="flex flex-col items-start leading-none hidden sm:flex">
                                <span className="font-black text-xl md:text-2xl tracking-tighter text-[#0D2C54] group-hover:text-primary transition-colors">
                                    NAVRACHNA
                                </span>
                                <span className="text-accent font-bold text-[9px] md:text-xs tracking-[0.2em] mt-1">
                                    PUBLIC SCHOOL
                                </span>
                            </div>
                        </button>
                    </div>

                    {/* Nav Links Section - Center */}
                    <nav className="hidden xl:flex flex-1 justify-center px-2">
                        <ul className="flex items-center space-x-3">
                            {navLinks.map((link) => (
                                <li
                                    key={link.name}
                                    className="relative group/link h-full"
                                    onMouseEnter={() => link.subLinks && setOpenDropdown(link.name)}
                                    onMouseLeave={() => setOpenDropdown(null)}
                                >
                                    <div className="flex items-center h-full">
                                        <a
                                            href={link.href || '#'}
                                            onClick={(e) => !link.subLinks && handleNavClick(e, link)}
                                            className={`text-[12px] font-bold tracking-wider transition-all duration-300 uppercase whitespace-nowrap py-9 block h-full flex items-center gap-1 cursor-pointer ${activeTab === link.name
                                                ? 'text-[#0D2C54]'
                                                : 'text-gray-500 hover:text-[#0D2C54]'
                                                }`}
                                        >
                                            {link.name}
                                            {link.subLinks && (
                                                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            )}
                                            {activeTab === link.name ? (
                                                <motion.div
                                                    layoutId="navHighlight"
                                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent rounded-full"
                                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                                />
                                            ) : (
                                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#0D2C54]/20 group-hover/link:w-full transition-all duration-300 rounded-full" />
                                            )}
                                        </a>
                                    </div>

                                    {/* Dropdown Menu */}
                                    {link.subLinks && (
                                        <AnimatePresence>
                                            {openDropdown === link.name && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-gray-100 shadow-xl rounded-2xl py-3 z-[100]"
                                                >
                                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-4 h-4 bg-white rotate-45 border-t border-l border-gray-100"></div>
                                                    <div className="relative bg-white rounded-2xl overflow-hidden">
                                                        {link.subLinks.map((sub) => (
                                                            <motion.a
                                                                key={sub.name}
                                                                href={sub.href}
                                                                className="relative block px-6 py-3.5 text-sm font-bold text-gray-700 hover:text-primary transition-all duration-300 uppercase tracking-wide border-b border-gray-50 last:border-0 group/sub"
                                                                whileHover={{ x: 6, backgroundColor: "rgba(13, 44, 84, 0.04)" }}
                                                                onClick={(e) => {
                                                                    handleNavClick(e, sub);
                                                                    setOpenDropdown(null);
                                                                }}
                                                            >
                                                                {/* Hover Accent Bar */}
                                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-primary group-hover/sub:h-3/5 transition-all duration-300 rounded-r-full" />

                                                                <span className="relative z-10">{sub.name}</span>
                                                            </motion.a>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Action Section - Right */}
                    <div className="hidden xl:flex flex-none items-center justify-end pl-2 space-x-3">
                        {/* Google Translate Widget Container */}
                        <div className="flex items-center bg-white rounded-full pl-2 pr-1 py-1.5 border-2 border-[#0D2C54]/20 shadow-sm hover:shadow-md transition-all group/translate">
                            <Globe className="w-4 h-4 text-accent ml-1" />
                            <div id="google_translate_element" className="min-w-[140px] h-[24px]"></div>
                        </div>
                    </div>

                    {/* Mobile Menu Button - Right on Mobile */}
                    <div className="flex xl:hidden flex-none items-center pl-4">
                        <button
                            type="button"
                            className="p-2 text-[#0D2C54] hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                    >
                                        <X className="h-7 w-7" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                    >
                                        <Menu className="h-7 w-7" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="xl:hidden bg-white border-t border-gray-100 overflow-hidden shadow-2xl"
                    >
                        <div className="px-6 py-8 space-y-4">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.subLinks ? (
                                        <div>
                                            <button
                                                onClick={() => setOpenDropdown(openDropdown === link.name ? null : link.name)}
                                                className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-lg font-bold transition-all uppercase ${activeTab === link.name || openDropdown === link.name
                                                    ? 'bg-[#0D2C54]/5 text-[#0D2C54]'
                                                    : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                            >
                                                {link.name}
                                                <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openDropdown === link.name ? 'rotate-180' : ''}`} />
                                            </button>
                                            <AnimatePresence>
                                                {openDropdown === link.name && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden pl-4 mt-2 space-y-2"
                                                    >
                                                        {link.subLinks.map((sub) => (
                                                            <motion.a
                                                                key={sub.name}
                                                                href={sub.href}
                                                                onClick={(e) => handleNavClick(e, sub)}
                                                                className="block px-4 py-3 rounded-lg text-base font-bold text-gray-500 hover:text-primary hover:bg-gray-50 transition-all uppercase"
                                                                whileTap={{ scale: 0.98 }}
                                                            >
                                                                {sub.name}
                                                            </motion.a>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <motion.a
                                            key={link.name}
                                            href={link.href || '#'}
                                            onClick={(e) => handleNavClick(e, link)}
                                            className={`block px-4 py-3 rounded-xl text-lg font-bold transition-all uppercase ${activeTab === link.name
                                                ? 'bg-[#0D2C54]/5 text-[#0D2C54] border-l-4 border-accent'
                                                : 'text-gray-600 hover:bg-gray-50'
                                                }`}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {link.name}
                                        </motion.a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
