"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaBagShopping, FaHeart, FaBars, FaXmark, FaMoon, FaSun, FaUser, FaLock } from "react-icons/fa6";
import { motion, AnimatePresence } from 'framer-motion';
// Redux hookini import qilamiz
import { useSelector } from 'react-redux';

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // REDUX-DAN MA'LUMOTLARNI OLAMIZ
  // Savatdagi mahsulotlarning umumiy miqdorini hisoblaymiz
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Sevimlilar ro'yxati uzunligini olamiz
  const wishlistCount = useSelector((state) => state.cart.favorites.length);

  // Dark mode holatini boshqarish
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Select', path: '/select' },
    { name: 'Shop', path: '/shop' },
    
  ];

  return (
    <>
      <nav className="bg-white dark:bg-[#1e1e1e] transition-colors duration-300 sticky top-0 z-40 shadow-sm border-b dark:border-gray-800">
        <div className="container flex justify-between items-center mx-auto px-4 py-3">
          
          {/* Logo */}
          <Link href="/" className="z-50 shrink-0">
            <img src="/logo.png" alt="Logo" className="h-10 sm:h-12 w-[120px] object-contain" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 font-bold text-gray-700 dark:text-gray-200">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="hover:text-[#006241] dark:hover:text-[#00754a] transition-all uppercase text-[13px] tracking-widest">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all text-gray-600 dark:text-gray-300"
            >
              {darkMode ? <FaSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-xl" />}
            </button>
            
            {/* Wishlist Button - Sevimlilar sahifasiga o'tadi */}
            <Link href="/wishlist" className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors hidden sm:block group">
              <FaHeart size={20} className="group-hover:text-red-500 transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white dark:border-[#1e1e1e]">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Cart Button - Savat sahifasiga o'tadi */}
            <Link href="/cart" className="relative p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300 transition-colors group">
              <FaBagShopping size={20} className="group-hover:text-[#006241] transition-colors" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#006241] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full border-2 border-white dark:border-[#1e1e1e]">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Sign In Button */}
            <button 
              onClick={() => setShowLogin(true)}
              className="hidden md:block bg-[#006241] hover:bg-[#00754a] text-white px-7 py-2 rounded-full font-bold text-sm transition-all active:scale-95 whitespace-nowrap"
            >
              Sign In
            </button>

            {/* Burger Button (Mobile) */}
            <button 
              className="md:hidden p-2 text-2xl text-gray-700 dark:text-white" 
              onClick={() => setIsOpen(true)}
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDE MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-[300px] bg-white dark:bg-[#1e1e1e] z-[70] shadow-2xl p-8 md:hidden"
            >
              <div className="flex justify-end mb-10">
                <button onClick={() => setIsOpen(false)} className="text-3xl dark:text-white hover:rotate-90 transition-transform duration-300">
                  <FaXmark />
                </button>
              </div>
              <ul className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.path} 
                      onClick={() => setIsOpen(false)}
                      className="text-2xl font-black text-gray-800 dark:text-white hover:text-[#006241] block transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                
                {/* Mobile Icons for Wishlist/Cart */}
                <div className="flex flex-col gap-4 mt-4">
                  <Link href="/wishlist" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-gray-700 dark:text-white font-bold">
                    <FaHeart className="text-red-500" /> Wishlist ({wishlistCount})
                  </Link>
                  <Link href="/cart" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-gray-700 dark:text-white font-bold">
                    <FaBagShopping className="text-[#006241]" /> Cart ({cartCount})
                  </Link>
                </div>

                <div className="h-[1px] bg-gray-200 dark:bg-gray-700 my-2" />
                <button 
                  onClick={() => { setIsOpen(false); setShowLogin(true); }}
                  className="w-full bg-[#006241] text-white py-4 rounded-full font-bold text-lg active:scale-95 transition-all"
                >
                  Sign In
                </button>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* --- LOGIN MODAL --- */}
      <AnimatePresence>
        {showLogin && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogin(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative bg-white dark:bg-[#252525] w-full max-w-md p-10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setShowLogin(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <FaXmark size={28} />
              </button>

              <div className="text-center mb-10">
                <h2 className="text-4xl font-black mb-2 dark:text-white">Kirish</h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">Loyiha imkoniyatlaridan foydalaning</p>
              </div>
              
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative group">
                  <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#006241] transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Login yoki Email" 
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-[#1a1a1a] dark:text-white rounded-2xl outline-none border-2 border-transparent focus:border-[#006241] focus:bg-white transition-all font-medium"
                  />
                </div>
                <div className="relative group">
                  <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#006241] transition-colors" />
                  <input 
                    type="password" 
                    placeholder="Parol" 
                    className="w-full pl-14 pr-6 py-4 bg-gray-50 dark:bg-[#1a1a1a] dark:text-white rounded-2xl outline-none border-2 border-transparent focus:border-[#006241] focus:bg-white transition-all font-medium"
                  />
                </div>
                
                <div className="text-right">
                   <span className="text-sm text-[#006241] font-bold cursor-pointer hover:underline">Parolni unutdingizmi?</span>
                </div>

                <button className="w-full bg-[#006241] hover:bg-[#00754a] text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-green-900/20 transition-all active:scale-[0.98] mt-4">
                  HISOBGA KIRISH
                </button>
              </form>
              
              <div className="text-center mt-10 border-t dark:border-gray-800 pt-6">
                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
                  Hisobingiz yo'qmi? <span className="text-[#006241] dark:text-[#00754a] font-black cursor-pointer hover:underline ml-1">RO'YXATDAN O'TISH</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;