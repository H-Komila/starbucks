"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../store/cartSlice"; // Store yo'lingizni tekshiring

const products = [
  { id: 1, name: "Fast Coffee", description: "Our cafe will serve you quickly", price: 7.45, volume: "330 ml", image: "/header.png" },
  { id: 2, name: "Dark Roast", description: "Rich and bold morning energy", price: 7.55, volume: "330 ml", image: "/header3.png" },
  { id: 3, name: "Cappuccino", description: "Perfect balance of espresso and milk", price: 7.35, volume: "330 ml", image: "/header2.png" },
  { id: 4, name: "Latte Art", description: "Special morning energy with style", price: 8.20, volume: "350 ml", image: "/header.png" },
  { id: 5, name: "Espresso", description: "Strong and concentrated shot", price: 6.50, volume: "100 ml", image: "/header3.png" },
  { id: 6, name: "Mocha", description: "Chocolate flavored coffee delight", price: 7.90, volume: "330 ml", image: "/header2.png" },
];

const Article = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const dispatch = useDispatch();
  // Redux-dan sevimlilar ro'yxatini olamiz
  const favorites = useSelector((state) => state.cart.favorites);

  // Navigatsiya funksiyalari
  const nextSlide = () => {
    if (startIndex + visibleCount < products.length) {
      setStartIndex(prev => prev + 1);
    } else {
      setStartIndex(0);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(prev => prev - 1);
    } else {
      setStartIndex(products.length - visibleCount);
    }
  };

  return (
    <section className="bg-[#0b0b0b] text-white py-20 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-8">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            New Our <br />
            <span className="text-[#00704A]">Products</span>
          </motion.h2>
          
          <div className="flex flex-col gap-6">
            <motion.p 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-gray-400 text-lg max-w-xl"
            >
              Have time to buy the most harmonious drinks in the new Starbucks coffee and don't forget about the discount!
            </motion.p>
            
            {/* SLIDER CONTROLS */}
            <div className="flex gap-4">
              <button 
                onClick={prevSlide} 
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={nextSlide} 
                className="w-12 h-12 rounded-full border border-[#00704A] flex items-center justify-center text-[#00704A] hover:bg-[#00704A] hover:text-white transition-all"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* PRODUCTS SLIDER */}
        <div className="relative">
          <motion.div 
            className="flex gap-8"
            animate={{ x: `calc(-${startIndex * (100 / visibleCount)}% )` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {products.map((item) => (
              <motion.div
                key={item.id}
                className="min-w-[100%] md:min-w-[calc(33.333%-22px)] relative p-8 rounded-[40px] flex flex-col items-center text-center border border-white/10 bg-[#0d0d0d] hover:border-[#00704A]/50 transition-colors group"
              >
                {/* FAVORITE BUTTON (HEART) */}
                <button 
                  onClick={() => dispatch(toggleFavorite(item.id))}
                  className="absolute top-6 right-8 z-20 p-2 hover:scale-120 transition-transform active:scale-90"
                >
                  <Heart 
                    size={26} 
                    className={`transition-all duration-300 ${
                      favorites.includes(item.id) 
                        ? "fill-red-500 text-red-500 scale-110" 
                        : "text-gray-500 hover:text-gray-300"
                    }`} 
                  />
                </button>

                {/* BACKGROUND GLOW */}
                <div className="absolute top-10 w-32 h-32 bg-[#00704A] rounded-full blur-[60px] opacity-10 group-hover:opacity-20 transition-opacity" />
                
                {/* IMAGE AREA */}
                <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#1e3932]/30 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500" />
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    width={180}
                    height={180}
                    className="z-10 object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)] group-hover:rotate-6 transition-transform duration-500"
                  />
                </div>

                <h3 className="text-3xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-500 mb-6 text-sm line-clamp-1">{item.description}</p>
                
                {/* PRICE & VOLUME */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-2xl font-bold italic">${item.price}</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-500">{item.volume}</span>
                </div>

                {/* BUY BUTTON (ADD TO CART) */}
                <motion.button
                  onClick={() => dispatch(addToCart(item))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00704A] text-white px-10 py-3 rounded-full font-semibold shadow-lg shadow-[#00704A]/20 hover:bg-[#008d5e] transition-colors"
                >
                  Buy Product
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Article;