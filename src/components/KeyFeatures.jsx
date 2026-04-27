import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Monitor, Beaker, Sparkles } from 'lucide-react';

const features = [
  {
    title: "IIT Alumni Mentorship",
    icon: <GraduationCap className="w-7 h-7" />,
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20"
  },
  {
    title: "Smart Classrooms",
    icon: <Monitor className="w-7 h-7" />,
    color: "bg-emerald-500",
    shadow: "shadow-emerald-500/20"
  },
  {
    title: "Science Labs",
    icon: <Beaker className="w-7 h-7" />,
    color: "bg-purple-500",
    shadow: "shadow-purple-500/20"
  },
  {
    title: "Holistic Development",
    icon: <Sparkles className="w-7 h-7" />,
    color: "bg-rose-500",
    shadow: "shadow-rose-500/20"
  }
];

const KeyFeatures = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="bg-white rounded-[2.5rem] p-8 h-full border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden">
              {/* Subtle background glow */}
              <div className={`absolute top-0 left-0 w-24 h-24 ${feature.color} opacity-0 group-hover:opacity-[0.03] rounded-full blur-3xl -ml-12 -mt-12 transition-opacity duration-500`}></div>
              
              {/* Icon Container - Matching the 2nd reference image style */}
              <div className={`flex-shrink-0 mb-8 p-5 ${feature.color} rounded-[1.5rem] text-white shadow-lg ${feature.shadow} transform group-hover:scale-110 transition-transform duration-500 ease-out`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl md:text-2xl font-black text-[#0D2C54] tracking-tight group-hover:text-[#1e3a8a] transition-colors duration-300">
                {feature.title}
              </h3>
              
              <div className="mt-6 w-10 h-1 bg-gray-100 rounded-full group-hover:w-20 group-hover:bg-accent transition-all duration-500"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
