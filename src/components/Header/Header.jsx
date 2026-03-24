"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
    // Slayder rasmlari massivi
    const images = ["/header.png", "/header2.png", "/header.png"]; 
    const [index, setIndex] = useState(0);

    // Avtomatik almashtirish (5 soniya)
    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section className="relative min-h-screen bg-[#0b0b0b] text-white overflow-hidden pt-20 md:pt-28">
            {/* Orqa fondagi nur */}
            <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-[#1e3932] rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    
                    {/* CHAP TOMON: MATNLAR */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
                        className="flex flex-col gap-6 md:gap-8 mt-10"
                    >
                        <motion.div variants={fadeInUp}>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
                                New Cafe by <br />
                                <span className="text-[#00704A]">StarBucks</span>
                            </h1>
                            <p className="mt-6 text-gray-400 text-lg max-w-md leading-relaxed">
                                Have time to buy the most harmonious drinks in the new Starbucks coffee and don't forget about the discount!
                            </p>
                        </motion.div>

                        <motion.div variants={fadeInUp} className="flex gap-4">
                            <button className="px-8 py-3.5 bg-[#00704A] hover:bg-[#005e3e] text-white rounded-full font-semibold transition-all shadow-lg active:scale-95">
                                Select a coffee
                            </button>
                            <button className="px-10 py-3.5 border border-gray-600 hover:bg-white hover:text-black rounded-full font-semibold transition-all active:scale-95">
                                More
                            </button>
                        </motion.div>

                        {/* Statistika */}
                        <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mt-4 border-t border-gray-800 pt-8">
                            {["9k+", "2k+", "28+"].map((num, i) => (
                                <div key={i}>
                                    <h2 className="text-2xl md:text-4xl font-bold italic tracking-tighter">{num.replace('+', '')} <span className="text-[#00704A]">+</span></h2>
                                    <p className="text-[10px] md:text-xs text-gray-500 mt-2 uppercase tracking-widest">
                                        {i === 0 ? "Premium Users" : i === 1 ? "Happy Customer" : "Awards Winning"}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* O'NG TOMON: TEPADAN TUSHADIGAN SLAYDER */}
                    <div className="relative flex justify-center lg:justify-end select-none h-[500px] md:h-[650px] w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index} // Key o'zgarganda animatsiya ishlaydi
                                initial={{ opacity: 0, y: -150 }} // Tepadan tushish
                                animate={{ opacity: 1, y: 0 }}   // Joyiga kelish
                                exit={{ opacity: 0, y: 150 }}    // Pastga chiqib ketish
                                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                                className="relative w-[320px] h-[400px] md:w-[500px] md:h-[650px]"
                            >
                                <Image
                                    src={images[index]}
                                    alt="Starbucks Cup Slider"
                                    fill
                                    className="object-contain z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                    priority
                                />

                                {/* Diskont Badge - Har doim rasm bilan birga harakatlanadi */}
                                <div className="absolute top-10 right-4 md:right-10 z-20 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: [0, 5, 0] }}
                                        transition={{ repeat: Infinity, duration: 4 }}
                                        className="bg-[#55a349] w-24 h-24 md:w-32 md:h-32 flex items-center justify-center drop-shadow-xl"
                                        style={{
                                            clipPath: "polygon(50% 0%, 58% 12%, 71% 6%, 74% 20%, 88% 18%, 86% 32%, 98% 38%, 91% 50%, 98% 62%, 86% 68%, 88% 82%, 74% 80%, 71% 94%, 58% 88%, 50% 100%, 42% 88%, 29% 94%, 26% 80%, 12% 82%, 14% 68%, 2% 62%, 9% 50%, 2% 38%, 14% 32%, 12% 18%, 26% 20%, 29% 6%, 42% 12%)"
                                        }}
                                    >
                                        <span className="text-3xl md:text-4xl font-black text-white italic">45%</span>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Orqa chiziqlar (Slayderdan mustaqil, o'zgarmaydi) */}
                        <svg className="absolute top-0 right-0 w-full h-full pointer-events-none z-0" viewBox="0 0 400 600">
                            <path d="M30,530 C80,430 230,480 380,330" stroke="white" fill="transparent" strokeWidth="1" />
                            <path d="M50,550 C100,450 250,500 400,350" stroke="white" fill="transparent" strokeWidth="1" />
                            <path d="M70,570 C120,470 270,520 420,370" stroke="white" fill="transparent" strokeWidth="1" />
                        </svg>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Header;