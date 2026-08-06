import React from 'react';
import { Home, ShoppingBag, MessageCircle, AlertTriangle, ArrowLeft, Search, ShieldCheck, Sparkles } from 'lucide-react';

interface NotFoundPageProps {
  onBackToHome: () => void;
  onGoToProductPage: () => void;
}

export default function NotFoundPage({ onBackToHome, onGoToProductPage }: NotFoundPageProps) {
  const whatsappUrl = "https://wa.me/923042351501?text=Assalam-o-Alaikum!%20Mujhe%20Tune-Up%2B%20ke%20bare%20mein%20rehnemai%20chahiye.";

  return (
    <div className="min-h-screen bg-[#fafdfb] text-gray-800 flex flex-col justify-between font-sans selection:bg-[#d4a743] selection:text-white">
      
      {/* Top Header Bar */}
      <header className="bg-[#1a4d2e] text-white py-4 px-4 sm:px-8 border-b border-[#d4a743]/30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={onBackToHome} 
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 bg-[#d4a743] rounded-xl flex items-center justify-center font-black text-[#1a4d2e] text-xl shadow-lg group-hover:scale-105 transition-transform">
              T+
            </div>
            <div>
              <span className="text-lg font-black text-white tracking-tight block">TUNE-UP+</span>
              <span className="text-[10px] text-amber-200/90 font-bold uppercase tracking-widest block -mt-1">Herbs of Foods</span>
            </div>
          </button>

          <button
            onClick={onGoToProductPage}
            className="bg-[#d4a743] hover:bg-white hover:text-[#1a4d2e] text-emerald-950 px-4 py-2 rounded-xl text-xs sm:text-sm font-black shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Product Page</span>
          </button>
        </div>
      </header>

      {/* Main 404 Hero Section */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#1a4d2e]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#d4a743]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl w-full text-center space-y-8 relative z-10 bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-2xl">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1a4d2e]/10 border border-[#1a4d2e]/20 text-[#1a4d2e] font-extrabold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 text-[#d4a743]" />
            <span>Error 404 — Page Not Found</span>
          </div>

          {/* Large 404 Visual Graphic */}
          <div className="relative inline-block">
            <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#1a4d2e] via-[#2d7346] to-[#d4a743] tracking-tighter">
              404
            </h1>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#d4a743] text-emerald-950 font-black px-4 py-1 rounded-full text-xs shadow-lg uppercase tracking-widest whitespace-nowrap">
              Aap Ka Matlooba Page Nahi Mila
            </div>
          </div>

          {/* Description Text in Roman Urdu & English */}
          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Maazrat! Yeh page maujood nahi hai ya remove ho chuka hai.
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Looks like you followed a broken link or typed an incorrect URL. Aap hamarey home page par ja sakte hain ya hamaray herbal product ki tafseelat dekh sakte hain.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Button 1: Go Home */}
            <button
              onClick={onBackToHome}
              className="w-full sm:w-auto bg-[#1a4d2e] hover:bg-[#133d23] text-white px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 transform hover:scale-105 cursor-pointer"
            >
              <Home className="w-5 h-5 text-[#d4a743]" />
              <span>Home Page Par Wapas Jayein</span>
            </button>

            {/* Button 2: Go to Product Page */}
            <button
              onClick={onGoToProductPage}
              className="w-full sm:w-auto bg-[#d4a743] hover:bg-[#c29633] text-emerald-950 px-7 py-3.5 rounded-2xl font-black text-sm sm:text-base shadow-xl transition-all duration-300 inline-flex items-center justify-center gap-2.5 transform hover:scale-105 cursor-pointer border border-amber-300/50"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Tune-Up+ Product Page</span>
            </button>
          </div>

          {/* Secondary Quick Options / WhatsApp Support */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-500">
            <div className="flex items-center gap-2 text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-[#d4a743]" />
              <span>100% Herbal & PCSIR Certified Product</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-900 hover:underline font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-100" />
              <span>Need help? Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </main>

      {/* Clean Footer */}
      <footer className="bg-emerald-950 text-emerald-200/80 py-6 px-4 text-center text-xs border-t border-emerald-900/60">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Tune-Up+ (Herbs of Foods). All rights reserved.</p>
          <div className="flex items-center gap-4 text-amber-200/90 font-semibold">
            <button onClick={onBackToHome} className="hover:underline cursor-pointer">Home</button>
            <span>•</span>
            <button onClick={onGoToProductPage} className="hover:underline cursor-pointer">Tune-Up+ Product</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
