"use client"; // Brauzer funksiyalari va animatsiya uchun shart

import React from 'react';
import Image from 'next/image'; // Next.js optimallashgan rasm komponenti
import Link from 'next/link';   // Tezkor o'tishlar uchun
import { SlArrowUpCircle } from "react-icons/sl";
import { FaInstagram, FaPhoneAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  // Yuqoriga ohista chiqish funksiyasi
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Animatsiya konfiguratsiyasi
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-neutral-900 text-white py-12 mt-10 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asosiy qismlar gridi */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 border-b border-gray-800 pb-12"
        >
          {/* Logo - Next.js Image ishlatildi */}
          <motion.div variants={fadeInUp} className="col-span-2 lg:col-span-1">
            <Link href="/">
              <div className="relative w-[120px] h-[40px] cursor-pointer hover:scale-105 transition-transform">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  fill 
                  className="object-contain"
                  priority 
                />
              </div>
            </Link>
          </motion.div>

          {/* Menyu bo'limlari */}
          {[
            { title: "Main", links: ["Buy", "More"] },
            { title: "We make", links: ["Process"] },
            { title: "Products", links: ["Cappuccino", "Fast", "Specialty"] },
            { title: "Events", links: ["Drinks", "Eat"] },
          ].map((section, idx) => (
            <motion.div variants={fadeInUp} key={idx} className="flex flex-col gap-3">
              <h3 className="font-semibold text-orange-400 uppercase tracking-wider text-sm">
                {section.title}
              </h3>
              {section.links.map((link) => (
                <Link 
                  key={link} 
                  href="#" 
                  className="text-gray-400 hover:text-orange-300 transition-colors duration-200"
                >
                  {link}
                </Link>
              ))}
            </motion.div>
          ))}

          {/* Kontaktlar */}
          <motion.div variants={fadeInUp} className="flex flex-col gap-3 items-start lg:items-end">
            <h3 className="font-semibold text-orange-400 uppercase tracking-wider text-sm">Contacts</h3>
            <Link href="https://instagram.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-all">
              <FaInstagram /> <span>Instagram</span>
            </Link>
            <button 
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="mt-4 text-4xl text-orange-500 hover:text-orange-400 transition-all hover:-translate-y-1 active:scale-95"
            >
              <SlArrowUpCircle />
            </button>
          </motion.div>
        </motion.div>

        {/* Pastki mualliflik qismi */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6 text-gray-500 text-sm"
        >
          <div className="flex items-center gap-3 bg-neutral-800/50 px-4 py-2 rounded-full">
            <FaPhoneAlt className="text-orange-500" />
            <span className="text-gray-300 font-medium">+998-99-999-99-99</span>
          </div>
          
          <p>© {new Date().getFullYear()} Barcha huquqlar himoyalangan.</p>
          
          <div className="flex gap-6 text-2xl">
             <Link href="#" className="hover:text-orange-400 transition-colors">
                <FaInstagram />
             </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;