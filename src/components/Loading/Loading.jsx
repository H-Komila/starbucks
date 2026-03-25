"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[999] bg-[#0b0b0b] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Logo atrofidagi aylanuvchi yashil xalqa */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-24 h-24 border-4 border-t-[#00704A] border-r-transparent border-b-[#00704A]/20 border-l-transparent rounded-full"
        />
        
        {/* Markazdagi logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-12 h-12 object-contain"
          />
        </motion.div>
      </div>

      {/* Yuklanmoqda matni */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="mt-6 text-[#00704A] font-bold tracking-widest text-sm uppercase"
      >
        Loading...
      </motion.p>
    </div>
  );
};

export default Loading;