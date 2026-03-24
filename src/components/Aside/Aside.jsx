"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

const Aside = () => {
    const asideImages = ["/aside.png", "/aside3.png"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % asideImages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [asideImages.length]);

    return (
        <section className="relative bg-[#0b0b0b] text-white py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* CHAP TOMON: SLAYDER */}
                    <div className="relative">
                        {/* Orqa fondagi yashil dekor */}
                        <div className="absolute -left-4 -bottom-4 w-full h-full bg-[#1e3932] -z-10 rounded-sm" />

                        {/* Rasm konteyneri - overflow-visible qilindi nishon yarmi chiqib turishi uchun */}
                        <div className="relative h-[400px] md:h-[550px] w-full rounded-sm shadow-2xl bg-[#141414]">

                            <div className="absolute inset-0 overflow-hidden rounded-sm">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ duration: 0.7, ease: "easeInOut" }}
                                        className="absolute inset-0 w-full h-full"
                                    >
                                        <Image
                                            src={asideImages[index]}
                                            alt={`Cafe slide ${index}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* "WE HAVE" BADGE - RASMNING USTIGA VA O'NG CHEKASIGA JOYLANDI */}
                            <motion.div
                                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                // z-30 rasm va hamma narsadan ustun turishini ta'minlaydi
                                // -right-12 orqali nishonning yarmi rasmning tashqarisiga chiqarildi
                                className="absolute top-10 -right-8 md:-right-16 z-30 flex items-center justify-center drop-shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                            >
                                <div
                                    className="bg-[#55a349] w-24 h-24 md:w-36 md:h-36 flex flex-col items-center justify-center text-center leading-tight shadow-2xl"
                                    style={{
                                        clipPath: "polygon(50% 0%, 61% 10%, 75% 5%, 78% 20%, 93% 20%, 90% 35%, 100% 50%, 90% 65%, 93% 80%, 78% 80%, 75% 95%, 61% 90%, 50% 100%, 39% 90%, 25% 95%, 22% 80%, 7% 80%, 10% 65%, 0% 50%, 10% 35%, 7% 20%, 22% 20%, 25% 5%, 39% 10%)"
                                    }}
                                >
                                    <span className="text-sm md:text-xl font-black">WE</span>
                                    <span className="text-sm md:text-xl font-black">HAVE</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* O'NG TOMON: MATNLAR */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-6 lg:pl-10" // Nishon matnga yaqin kelib qolmasligi uchun padding
                    >
                        <h2 className="text-5xl md:text-7xl font-bold leading-tight">
                            We make <br />
                            <span className="text-[#00704A]">delicious</span>
                        </h2>

                        <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                            Only in 2021 we have made more than 100,000 orders for you, your loved ones, all of you, and in 2022 we are ready to destroy the market.
                        </p>

                        {/* Cooking Process Video Section */}
                        <div className="relative mt-8 group cursor-pointer w-full max-w-md">
                            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10">
                                <Image
                                    src="/aside2.png"
                                    alt="Cooking process"
                                    fill
                                    className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        className="flex items-center gap-3 bg-[#00704A] px-6 py-3 rounded-full shadow-xl"
                                    >
                                        <div className="bg-white text-[#00704A] p-1.5 rounded-full">
                                            <Play size={16} fill="currentColor" />
                                        </div>
                                        <span className="font-semibold text-sm md:text-base">Cooking Process</span>
                                    </motion.div>
                                </div>
                            </div>

                            <div className="absolute -right-16 -bottom-12 w-64 h-64 pointer-events-none -z-10">
                                <svg
                                    className="w-full h-full "
                                    viewBox="0 0 200 200"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M20,150 C50,100 120,120 180,50"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M40,160 C70,110 140,130 200,60"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M60,170 C90,120 160,140 220,70"
                                        stroke="white"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Aside;