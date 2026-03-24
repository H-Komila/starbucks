"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaBagShopping, FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleFavorite } from '@/store/cartSlice';

const WishlistPage = () => {
  const dispatch = useDispatch();
  
  // 1. Redux'dan favorites ID-larini olamiz
  const favoriteIds = useSelector((state) => state.cart.favorites);
  
  // 2. Mahsulotlar ro'yxati (Aslida bu API-dan yoki umumiy JSON'dan kelishi kerak)
  // Hozircha sevimli deb belgilanganlarini filtrlab ko'rsatamiz
  const allProducts = [
    { id: 1, name: "Fast Coffee", price: 7.45, image: "/header.png" },
    { id: 2, name: "Dark Roast", price: 7.55, image: "/header3.png" },
    { id: 3, name: "Cappuccino", price: 7.35, image: "/header2.png" },
    // ... barcha mahsulotlar
  ];

  const wishlistItems = allProducts.filter(product => favoriteIds.includes(product.id));

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white pt-28 pb-20 px-6">
      <div className="container mx-auto">
        <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-[#00704A] transition-colors mb-8 group">
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Shop</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-black mb-10">Sevimlilar <span className="text-red-500">Ro'yxati</span></h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence>
              {wishlistItems.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-[#141414] p-6 rounded-[40px] border border-white/5 relative group"
                >
                  {/* O'CHIRISH: toggleFavorite'ni qayta chaqiramiz */}
                  <button 
                    onClick={() => dispatch(toggleFavorite(item.id))}
                    className="absolute top-6 right-6 text-gray-500 hover:text-red-500 transition-colors z-10"
                  >
                    <FaTrash size={18} />
                  </button>

                  <div className="relative h-48 w-full mb-6">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-[#00704A] font-black text-xl mb-6">${item.price}</p>

                  <button 
                    onClick={() => dispatch(addToCart(item))}
                    className="w-full flex items-center justify-center gap-3 bg-[#00704A] hover:bg-[#008d5d] text-white py-4 rounded-2xl font-bold transition-all active:scale-95"
                  >
                    <FaBagShopping />
                    <span>Savatga qo'shish</span>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-20 bg-[#141414] rounded-[40px] border border-dashed border-white/10">
            <h2 className="text-2xl font-bold text-gray-500">Sevimlilar ro'yxati bo'sh</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;