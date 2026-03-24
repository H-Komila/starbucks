"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft, FaXmark } from "react-icons/fa6";
import { FaCircleCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
// Reducerlarni import qilamiz
import { addToCart, removeFromCart, decrementQuantity } from '@/store/cartSlice'; 

const CartPage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const [isSuccess, setIsSuccess] = useState(false);

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = cartItems.length > 0 ? 2.00 : 0;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[#0b0b0b] text-white pt-28 pb-20 px-6">
            <div className="container mx-auto max-w-5xl">
                
                <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-[#00704A] transition-colors mb-8 group">
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back to Shop</span>
                </Link>

                <h1 className="text-4xl md:text-5xl font-black mb-10">Your <span className="text-[#00704A]">Cart</span></h1>

                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-6">
                            <AnimatePresence>
                                {cartItems.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="flex items-center gap-4 bg-[#141414] p-4 md:p-6 rounded-[30px] border border-white/5"
                                    >
                                        <div className="relative w-20 h-20 md:w-28 md:h-28 bg-[#1a1a1a] rounded-2xl shrink-0 overflow-hidden">
                                            <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold">{item.name}</h3>
                                            <p className="text-[#00704A] font-bold">${item.price.toFixed(2)}</p>
                                        </div>

                                        {/* MIQDORNI BOSHQARISH */}
                                        <div className="hidden md:flex items-center bg-[#0b0b0b] rounded-full px-4 py-2 border border-white/10">
                                            <button 
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                className={`transition-colors ${item.quantity > 1 ? 'hover:text-[#00704A]' : 'opacity-30 cursor-not-allowed'}`}
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus size={14} />
                                            </button>
                                            <span className="mx-6 font-bold text-lg">{item.quantity}</span>
                                            <button 
                                                onClick={() => dispatch(addToCart(item))} 
                                                className="hover:text-[#00704A] transition-colors"
                                            >
                                                <FaPlus size={14} />
                                            </button>
                                        </div>

                                        {/* O'CHIRISH TUGMASI */}
                                        <button 
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="p-3 text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <FaTrash size={20} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* ORDER SUMMARY */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#141414] p-8 rounded-[40px] border border-[#00704A]/20 sticky top-32">
                                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-gray-400">
                                        <span>Subtotal</span>
                                        <span className="text-white font-bold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-400">
                                        <span>Shipping</span>
                                        <span className="text-white font-bold">${shipping.toFixed(2)}</span>
                                    </div>
                                    <div className="h-[1px] bg-white/10 my-4" />
                                    <div className="flex justify-between text-xl font-black text-[#00704A]">
                                        <span>Total</span>
                                        <span>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsSuccess(true)} className="w-full bg-[#00704A] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-wider active:scale-95 shadow-lg shadow-[#00704A]/20">
                                    Checkout Now
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#141414] rounded-[40px] border border-dashed border-white/10">
                        <h2 className="text-2xl font-bold text-gray-500 mb-6">Your cart is empty</h2>
                        <Link href="/" className="inline-block bg-[#00704A] text-white px-10 py-4 rounded-full font-bold">Go to Shop</Link>
                    </div>
                )}
            </div>
            
            {/* SUCCESS MODAL (AnimatePresence bilan) */}
            <AnimatePresence>
                {isSuccess && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSuccess(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            className="relative bg-[#141414] border border-[#00704A]/30 w-full max-w-sm p-10 rounded-[50px] text-center shadow-2xl"
                        >
                            <button onClick={() => setIsSuccess(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
                                <FaXmark size={24} />
                            </button>
                            <div className="flex justify-center mb-6">
                                <div className="bg-[#00704A]/20 p-6 rounded-full">
                                    <FaCircleCheck className="text-[#00704A] text-7xl" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-black mb-4">Success!</h2>
                            <p className="text-gray-400 mb-8 font-medium">Your order has been placed successfully.</p>
                            <button onClick={() => setIsSuccess(false)} className="w-full bg-white text-black py-4 rounded-2xl font-black hover:bg-gray-200 transition-all active:scale-95">
                                AWESOME
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CartPage;