import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#0D2C54] via-[#123A6B] to-[#0A2442] text-[#E2E8F0] relative z-10 select-text overflow-hidden font-sans border-t border-white/10 rounded-b-[2rem] sm:rounded-b-none mt-auto">
      {/* Top Banner Section (CTA) */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative border-b border-white/10 bg-[#0A2240]/80 backdrop-blur-sm"
      >
        {/* Subtle radial gradient glow behind CTA */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1E5AA8]/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 hidden sm:flex">
          <h3 className="text-xl md:text-2xl font-semibold text-white text-center md:text-left tracking-wide">
            Admissions Open From Nursery to class 12th For More Details
          </h3>
          <motion.button
            onClick={() => onNavigate('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-[#F4B400] hover:border-[#F4B400] hover:text-[#0D2C54] transition-all duration-300"
          >
            GET IN TOUCH
          </motion.button>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 sm:hidden">
          <h3 className="text-xl md:text-2xl font-semibold text-white text-center md:text-left tracking-wide">
            Admissions Open From Nursery to class 12th For More Details
          </h3>
          <motion.button
            onClick={() => onNavigate('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wider uppercase hover:bg-[#F4B400] hover:border-[#F4B400] hover:text-[#0D2C54] transition-all duration-300"
          >
            GET IN TOUCH
          </motion.button>
        </div>
      </motion.div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {/* Column 1: About Us */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-4 bg-transparent self-start">
              <div className="bg-white p-1 rounded-full flex items-center justify-center shadow-[0_2px_12px_rgba(255,255,255,0.05)]">
                <img src={`${import.meta.env.BASE_URL}images/school-logo.jpg`} alt="Navrachna Public School Logo" className="h-14 w-14 md:h-16 md:w-16 object-cover rounded-full" />
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="font-black text-xl md:text-2xl tracking-tighter text-white">
                  NAVRACHNA
                </span>
                <span className="text-[#F4B400] font-bold text-[10px] md:text-xs tracking-[0.2em] mt-1">
                  PUBLIC SCHOOL
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mt-2">
              Navrachna Public School in has an environment which is not only child-friendly but engaging for children to learn and have fun at the same time.
            </p>
          </motion.div>

          {/* Column 2: Contact Info */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="text-white text-lg font-semibold tracking-wide flex items-center gap-3">
              <span className="w-1 h-5 bg-[#F4B400] rounded-sm"></span>
              Contact Info
            </h4>
            <ul className="flex flex-col gap-5">
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="mt-1 p-2 border border-white/10 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors duration-300 flex-shrink-0">
                  <MapPin className="w-4 h-4 text-[#F4B400]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Address</span>
                  <p className="text-sm text-gray-300 leading-relaxed group-hover:text-[#F4B400] transition-colors duration-300">
                    FAZILPUR (ASAF NAGAR - IQBALPUR ROAD) Roorkee, Uttarakhand, India 247667
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="mt-1 p-2 border border-white/10 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors duration-300 flex-shrink-0">
                  <Phone className="w-4 h-4 text-[#F4B400]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Phone</span>
                  <a href="tel:+919837543910" className="text-sm text-gray-300 group-hover:text-[#F4B400] transition-colors duration-300">
                    +91-9837543910
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4 group cursor-pointer">
                <div className="mt-1 p-2 border border-white/10 rounded-md bg-white/5 group-hover:bg-white/10 transition-colors duration-300 flex-shrink-0">
                  <Mail className="w-4 h-4 text-[#F4B400]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">Email</span>
                  <a href="mailto:navrachnaroorkee@gmail.com" className="text-sm text-gray-300 group-hover:text-[#F4B400] transition-colors duration-300 break-all">
                    navrachnaroorkee@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Like Us */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="text-white text-lg font-semibold tracking-wide flex items-center gap-3">
              <span className="w-1 h-5 bg-[#F4B400] rounded-sm"></span>
              Like Us
            </h4>

            <a 
              href="https://www.facebook.com/NAVRACHNAPUBLICSCHOOLROORKEE/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-[260px] bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 block group"
            >
              <div className="p-3 flex items-center gap-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-sm bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-sm border border-gray-100 p-0.5">
                  <img src={`${import.meta.env.BASE_URL}images/school-logo.jpg`} alt="School Logo" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex flex-col w-full overflow-hidden">
                  <span className="text-[#385898] font-semibold text-[13px] leading-tight group-hover:underline cursor-pointer truncate w-full">Navrachna Public School</span>
                  <div className="mt-1 bg-[#EBEDF0] text-[#4B4F56] text-[11px] font-medium px-2 py-1 rounded flex items-center gap-1.5 w-max">
                    <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current"><path d="M14.5 0H1.5C.67 0 0 .67 0 1.5v13c0 .83.67 1.5 1.5 1.5h7v-5.5h-2v-2h2v-1.5c0-2.3 1.3-3.6 3.4-3.6 1 0 1.8.1 2.1.1v2.4h-1.4c-1.1 0-1.3.5-1.3 1.3v1.3h2.6l-.3 2h-2.3v5.5h3.6c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5z"></path></svg>
                    पेज फ़ॉलो करें
                  </div>
                </div>
              </div>
              <div className="relative h-28 bg-gray-100 w-full overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-500"></div>
                <div className="relative z-10 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center text-white border border-white/50 backdrop-blur-sm group-hover:bg-[#F4B400] group-hover:border-[#F4B400] transition-colors duration-300">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1"><path d="M8 5v14l11-7z"></path></svg>
                </div>
              </div>
            </a>

          </motion.div>

          {/* Column 4: Find Us */}
          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <h4 className="text-white text-lg font-semibold tracking-wide flex items-center gap-3">
              <span className="w-1 h-5 bg-[#F4B400] rounded-sm"></span>
              Find Us
            </h4>
            <a 
              href="https://maps.app.goo.gl/6bAaitheF5rWHvZg6"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-40 rounded-xl overflow-hidden bg-white/5 border border-white/10 relative shadow-md group hover:border-white/30 transition-colors duration-300 block"
            >
              {/* Subtle hover border glow */}
              <div className="absolute inset-0 rounded-xl ring-2 ring-transparent group-hover:ring-[#F4B400]/30 transition-all duration-300 pointer-events-none z-10"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3445.482454519985!2d77.8344583!3d29.8654817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390eb6e7886dedbf%3A0xc3fec3f1396cb2cd!2sNavrachna%20Public%20School%2C%20Asaf%20Nagar!5e0!3m2!1sen!2sin!4v1714481234567!5m2!1sen!2sin"
                className="w-full h-full border-0 absolute inset-0 mix-blend-luminosity group-hover:mix-blend-normal opacity-80 group-hover:opacity-100 transition-all duration-500 ease-in-out pointer-events-none"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location"
              ></iframe>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Copyright Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-gray-400 font-medium tracking-wide">
            Copyright @2025 <span className="mx-2 text-white/30">||</span>
            By Navrachna Public School Roorkee <span className="mx-2 text-white/30">||</span>
            Powered by FSIR Roorkee
          </p>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
