"use client";
import { useState, useEffect } from "react";
import Loading from "@/components/Loading/Loading";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "@/store/ReduxProvider"; // Providerni import qiling
import './globals.css';

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2 soniyadan keyin loadingni o'chirish
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        {isLoading && <Loading />}
        <ReduxProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}