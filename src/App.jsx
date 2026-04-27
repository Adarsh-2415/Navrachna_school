import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Atom, Sparkles, BookOpen, Globe, Pencil } from 'lucide-react';
import AnnouncementBar from './components/AnnouncementBar';
import Header from './components/Header';
import Hero from './components/Hero';
import KeyFeatures from './components/KeyFeatures';
import AboutSection from './components/AboutSection';
import Infrastructure from './components/Infrastructure';
import VisionMission from './components/VisionMission';
import WhyNavrachna from './components/WhyNavrachna';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Disclosures from './pages/Disclosures';
import RulesGuidelines from './pages/RulesGuidelines';
import Classroom from './pages/Classroom';
import Admissions from './pages/Admissions';
import Library from './pages/Library';
import ComputerLab from './pages/ComputerLab';
import Gallery from './pages/Gallery';
import FeeStructure from './pages/FeeStructure';
import HolidayList from './pages/HolidayList';

const FloatingIcon = ({ icon: Icon, delay = 0, size = 60, top, left, right, bottom, color = "#000000", rotate = 0 }) => (
  <motion.div
    className="absolute z-50 pointer-events-none hidden md:block"
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
    <Icon size={size} color={color} strokeWidth={1.8} />
  </motion.div>
);

function App() {
  const [activePage, setActivePage] = useState('home');

  // Scroll to top when page changes
  useEffect(() => {
    if (window.location.hash.includes('contact')) {
        return; // Don't scroll to top if we are navigating to contact
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Handle hash changes for anchor scrolling (especially for #contact)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#contact') {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial check
    handleHashChange();
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page) => {
    if (page === 'contact' || page === 'contact-us') {
      window.location.hash = 'contact';
      if (activePage !== 'home') {
        setActivePage('home');
        setTimeout(() => {
          const element = document.getElementById('contact');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        const element = document.getElementById('contact');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      setActivePage(page);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E1EDF9] via-[#F4F9FF] to-[#FDFBF7] font-sans antialiased selection:bg-primary/20">

      {/* Outer gradient container (Full-screen background gradient) */}
      <div className="absolute inset-0 z-[-1] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>

      {/* Main container */}
      <div className="w-full bg-white/70 backdrop-blur-2xl overflow-hidden relative flex flex-col min-h-screen">

        <AnnouncementBar />
        <Header activePage={activePage} onNavigate={handleNavigate} />

        <main className="flex-1 flex flex-col justify-center relative">
          {activePage === 'home' ? (
            <>
              <Hero onNavigate={handleNavigate} />
              <KeyFeatures />
              <AboutSection />
              <Infrastructure />
              <VisionMission />
              <WhyNavrachna />
              <ContactSection />
            </>
          ) : activePage === 'disclosures' ? (
            <Disclosures />
          ) : activePage === 'admissions' ? (
            <Admissions onNavigate={handleNavigate} />
          ) : activePage === 'rules' ? (
            <RulesGuidelines />
          ) : activePage === 'classroom' ? (
            <Classroom />
          ) : activePage === 'computer-lab' ? (
            <ComputerLab />
          ) : activePage === 'library' ? (
            <Library />
          ) : activePage === 'gallery' ? (
            <Gallery />
          ) : activePage === 'fee-structure' ? (
            <FeeStructure />
          ) : activePage === 'holidays' ? (
            <HolidayList />
          ) : ['infrastructure'].includes(activePage) ? (
            <Infrastructure />
          ) : null}

          {/* Global Decorative Floating Doodles in crisp absolute layout frame */}
          <FloatingIcon icon={Rocket} size={50} top="12%" left="3%" rotate={15} />
          <FloatingIcon icon={Globe} size={45} top="28%" right="3%" rotate={-10} />
          <FloatingIcon icon={Atom} size={42} top="44%" left="2%" rotate={30} />
          <FloatingIcon icon={Pencil} size={40} top="60%" right="2%" rotate={45} />
          <FloatingIcon icon={Sparkles} size={35} top="75%" left="4%" />
          <FloatingIcon icon={BookOpen} size={38} top="90%" right="4%" rotate={-20} />
        </main>

        <Footer activePage={activePage} onNavigate={handleNavigate} />
      </div>
      <WhatsAppButton />
    </div>
  );
}

export default App;
