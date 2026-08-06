import React, { useState } from 'react';
import { 
  CheckCircle, 
  Star, 
  ShoppingCart, 
  ShieldCheck, 
  Award, 
  Leaf, 
  MessageSquare, 
  Phone, 
  X, 
  Sparkles, 
  Truck, 
  Lock, 
  ArrowLeft,
  Clock,
  ChevronLeft,
  ChevronRight,
  ZoomIn
} from 'lucide-react';

import bottleImg from '../assets/images/tuneup_premium_bottle_1781620630182.jpg';
import flatlayImg from '../assets/images/tuneup_bottle_flatlay_1786021147949.jpg';
import pcsirReportImg from '../assets/images/pcsir_certificate_report_1786021131619.jpg';
import capsulesSpillImg from '../assets/images/tuneup_product_1781618495850.jpg';
import herbsBottleImg from '../assets/images/heart_care_patient_1786021338944.jpg';
import familyImg from '../assets/images/tuneup_family_1781618517187.jpg';

interface TuneUpPlusProductPageProps {
  onBackToMain?: () => void;
}

export default function TuneUpPlusProductPage({ onBackToMain }: TuneUpPlusProductPageProps) {
  // Product Gallery State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Popup Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Form State for Live Price Calculation
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const unitPrice = 6900;
  const totalPrice = quantity * unitPrice;

  // Multiple Product Images
  const productImages = [
    {
      id: 1,
      src: bottleImg,
      title: 'Front View (Tune-Up+ Bottle)',
      alt: 'Tune-Up+ Herbal Capsules Front View'
    },
    {
      id: 2,
      src: flatlayImg,
      title: 'Flatlay View (Bottle with Herbs & Tea)',
      alt: 'Tune-Up+ Flatlay with Mint, Herbs and Tea'
    },
    {
      id: 3,
      src: pcsirReportImg,
      title: 'PCSIR Lab Test Report (100% Certified)',
      alt: 'PCSIR Lab Test Report Certificate'
    },
    {
      id: 4,
      src: capsulesSpillImg,
      title: 'Capsules View (Spilled with Ingredients)',
      alt: 'Tune-Up+ Capsules Spilled with Herbal Ingredients'
    },
    {
      id: 5,
      src: herbsBottleImg,
      title: 'Natural Herbs View (Bottle with Fresh Herbs)',
      alt: 'Tune-Up+ Herbal Ingredients View'
    },
    {
      id: 6,
      src: familyImg,
      title: 'Lifestyle View (Happy Health)',
      alt: 'Tune-Up+ Lifestyle View'
    }
  ];

  const handleNextImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const openOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const closeOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  // Form Submit Handler for Order Modal
  const handleModalOrderSubmit = (e: React.FormEvent) => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Meharbani karke Naam, Phone aur Address likhein!');
      e.preventDefault();
      return;
    }

    // Helper to get test_event_code from URL if testing
    const urlParams = new URLSearchParams(window.location.search);
    const testCode = urlParams.get('test_event_code');
    const pixelOptions = testCode ? { test_event_code: testCode } : {};

    // Track Meta Pixel Purchase & Lead Events
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: totalPrice,
        currency: 'PKR',
        content_name: 'Tune-Up+ Organic Herbal Capsules',
        content_type: 'product',
        num_items: quantity
      }, pixelOptions);

      (window as any).fbq('track', 'Lead', {
        content_name: 'Tune-Up+ Order Lead',
        value: totalPrice,
        currency: 'PKR'
      }, pixelOptions);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafdfb] text-gray-800 font-sans relative">
      
      {/* Top Bar Navigation */}
      <nav className="bg-[#0f331f] text-white py-3 px-4 sm:px-8 border-b border-[#d4a743]/30 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onBackToMain && (
              <button 
                onClick={onBackToMain}
                className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Main Website</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#d4a743] animate-pulse" />
              <span className="font-serif font-black text-base sm:text-xl text-white tracking-wide">
                TUNE-UP<span className="text-[#d4a743]">+</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-[#d4a743] text-emerald-950 font-black px-2 py-0.5 rounded uppercase tracking-wider ml-1">
                Official Store
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923042351501"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-xs font-bold bg-[#25d366] text-white px-3 py-1.5 rounded-lg hover:bg-[#20ba59] transition-all shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white" />
              <span>+92 304 2351501</span>
            </a>
            <button
              onClick={openOrderModal}
              className="bg-[#d4a743] hover:bg-[#c29633] text-white font-black text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Order Now</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION (Product Display & Buy Box) ================= */}
      <section className="bg-gradient-to-br from-[#0a2717] via-[#1a4d2e] to-[#4d3711] text-white py-10 sm:py-14 md:py-18 px-4 sm:px-6 lg:px-8 border-b border-[#d4a743]/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Product Gallery (400x400 Square Image + 6 Thumbnails) */}
          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <div className="w-full max-w-[420px] bg-white/10 p-3 sm:p-4 rounded-3xl border border-white/20 backdrop-blur-md shadow-2xl hover:border-[#d4a743]/80 transition-all duration-300">
              
              {/* Main Product Image (400x400 aspect ratio) */}
              <div 
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-full aspect-square max-w-[400px] mx-auto overflow-hidden rounded-2xl bg-gradient-to-b from-[#133e24] to-[#0a2314] border-2 border-[#d4a743]/50 cursor-pointer group shadow-2xl flex items-center justify-center p-2"
              >
                <img
                  src={productImages[selectedImageIndex].src}
                  alt={productImages[selectedImageIndex].alt}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-500 transform group-hover:scale-105"
                />

                {/* Left/Right Navigation Arrows on Main Image */}
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#d4a743] text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10 shadow-lg"
                  title="Previous Image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#d4a743] text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm z-10 shadow-lg"
                  title="Next Image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Floating Badge top-left */}
                <div className="absolute top-3 left-3 bg-[#d4a743] text-emerald-950 font-black px-3 py-1 rounded-full text-xs shadow-xl flex items-center gap-1 border border-amber-200">
                  <Sparkles className="w-3.5 h-3.5 fill-emerald-950" />
                  <span>Rs. 6,900</span>
                </div>

                {/* Zoom Hint Icon top-right */}
                <div className="absolute top-3 right-3 bg-black/60 hover:bg-[#d4a743] text-white hover:text-emerald-950 p-2 rounded-full text-xs shadow-lg backdrop-blur-sm transition-all flex items-center gap-1 border border-white/20">
                  <ZoomIn className="w-4 h-4" />
                </div>

                {/* Quality Seal bottom-right */}
                <div className="absolute bottom-3 right-3 bg-[#0a2717]/90 text-amber-300 font-bold px-2.5 py-1 rounded-lg text-[10px] sm:text-xs border border-amber-400/40 backdrop-blur-sm">
                  {productImages[selectedImageIndex].title}
                </div>
              </div>

              {/* Thumbnails Row (6 Product Images) */}
              <div className="mt-4 pt-2 border-t border-white/10">
                <p className="text-[11px] font-bold text-amber-200/90 mb-2 text-center uppercase tracking-wider">
                  Select Product Image ({selectedImageIndex + 1} of {productImages.length})
                </p>
                <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center p-0.5 ${
                        idx === selectedImageIndex 
                          ? 'border-[#d4a743] ring-2 ring-[#d4a743] scale-105 bg-[#d4a743]/20' 
                          : 'border-white/20 opacity-70 hover:opacity-100 hover:border-amber-300 bg-black/30'
                      }`}
                    >
                      <img 
                        src={img.src} 
                        alt={img.alt} 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Specs bar (3 Feature Badges) */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] sm:text-xs font-bold text-emerald-100">
                <div className="bg-white/10 py-2 px-1 rounded-xl border border-white/10 flex items-center justify-center gap-1">
                  <span>💊 60 Capsules</span>
                </div>
                <div className="bg-white/10 py-2 px-1 rounded-xl border border-white/10 flex items-center justify-center gap-1">
                  <span>🧪 PCSIR Tested</span>
                </div>
                <div className="bg-white/10 py-2 px-1 rounded-xl border border-white/10 flex items-center justify-center gap-1">
                  <span>🌿 Steroid-Free</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info, Trust Badges, Price & Order Button */}
          <div className="lg:col-span-6 space-y-5 text-left">
            
            {/* Brand Header */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#d4a743] text-emerald-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow">
                  BRAND: TUNE-UP+
                </span>
                <span className="bg-white/10 text-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20">
                  SUB-BRAND: HERBS OF FOODS
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-white tracking-tight leading-tight">
                Tune-Up+ Herbal Capsules
              </h1>

              <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
                60 Capsules — 1 Month Complete Herbal Course | PCSIR Tested & Certified | 100% Steroid-Free
              </p>
            </div>

            {/* TRUST BADGES SECTION (4 Badges in a Row/Grid) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              
              {/* Badge 1: Trusted Quality */}
              <div className="bg-emerald-950/80 border border-emerald-400/50 p-2.5 rounded-xl flex items-center gap-2 text-emerald-200 text-xs font-black shadow-md">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>✅ Trusted Quality</span>
              </div>

              {/* Badge 2: 1000+ Trusted Customers */}
              <div className="bg-amber-950/80 border border-amber-400/50 p-2.5 rounded-xl flex items-center gap-2 text-amber-200 text-xs font-black shadow-md">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>⭐ 1000+ Customers</span>
              </div>

              {/* Badge 3: Free Delivery */}
              <div className="bg-white/10 border border-white/20 p-2.5 rounded-xl flex items-center gap-2 text-white text-xs font-bold shadow-md">
                <Truck className="w-4 h-4 text-amber-300 shrink-0" />
                <span>🚚 Free Delivery in PK</span>
              </div>

              {/* Badge 4: 100% Herbal Formula */}
              <div className="bg-emerald-900/60 border border-emerald-300/40 p-2.5 rounded-xl flex items-center gap-2 text-emerald-100 text-xs font-bold shadow-md">
                <Leaf className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>🌿 100% Herbal</span>
              </div>
            </div>

            {/* PRICE DISPLAY SECTION */}
            <div className="bg-gradient-to-r from-white/15 to-white/5 border border-amber-300/30 p-5 rounded-2xl backdrop-blur-md space-y-2 shadow-xl">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl md:text-5xl font-black text-[#d4a743] drop-shadow-md">
                  Rs. 6,900
                </span>
                <span className="text-xl sm:text-2xl text-gray-300 line-through font-bold">
                  Rs. 9,900
                </span>
                <span className="bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-lg uppercase tracking-wider animate-pulse shadow-md">
                  Save Rs. 3,000 (30% OFF)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-amber-100 font-semibold pt-1 border-t border-white/10">
                <span>🇵🇰 Pakistani Currency (PKR)</span>
                <span>•</span>
                <span>🚚 Free Delivery Across All Cities</span>
                <span>•</span>
                <span>💵 Cash on Delivery</span>
              </div>
            </div>

            {/* CTA ORDER BUTTON */}
            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={openOrderModal}
                className="w-full bg-[#d4a743] hover:bg-[#e2b54e] active:scale-[0.98] text-emerald-950 font-black text-xl sm:text-2xl py-4 px-8 rounded-2xl transition-all duration-300 shadow-2xl flex items-center justify-center gap-3 border-2 border-amber-200 cursor-pointer group animate-cta-shake"
              >
                <ShoppingCart className="w-7 h-7 text-emerald-950 group-hover:scale-110 transition-transform" />
                <span>Order Now — Cash on Delivery</span>
              </button>

              <div className="flex flex-wrap items-center justify-between text-xs text-gray-200 font-semibold pt-1 px-1">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-300" /> No Advance Payment
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-300" /> Dispatch Within 24 Hours
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-300" /> 100% Safe Private Packaging
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* LIGHTBOX / ZOOM MODAL */}
      {isLightboxOpen && (
        <div 
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#0a2717] border-2 border-[#d4a743] rounded-3xl p-4 sm:p-6 text-white shadow-2xl flex flex-col items-center space-y-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-red-600 text-white p-2 rounded-full transition-all shadow-lg z-20"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Title */}
            <div className="text-center space-y-1">
              <h3 className="text-lg font-bold text-[#d4a743]">
                {productImages[selectedImageIndex].title}
              </h3>
              <p className="text-xs text-gray-300">
                Image {selectedImageIndex + 1} of {productImages.length} — Click arrows to navigate
              </p>
            </div>

            {/* Large Image in Lightbox */}
            <div className="relative w-full max-w-[500px] aspect-square rounded-2xl overflow-hidden bg-black/40 flex items-center justify-center border border-white/20">
              <img
                src={productImages[selectedImageIndex].src}
                alt={productImages[selectedImageIndex].alt}
                className="w-full h-full object-contain rounded-xl"
              />

              <button
                type="button"
                onClick={handlePrevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#d4a743] text-white p-3 rounded-full transition-all shadow-xl"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={handleNextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-[#d4a743] text-white p-3 rounded-full transition-all shadow-xl"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Lightbox Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto max-w-full p-1">
              {productImages.map((img, idx) => (
                <button
                  key={img.id}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    idx === selectedImageIndex ? 'border-[#d4a743] scale-110' : 'border-white/30 opacity-60'
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 3. MIDDLE SECTION (Features - 3 Cards) ================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-[#d4a743] bg-[#f5e6b8] px-3.5 py-1 rounded-full">
              Why Choose TUNE-UP+
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#1a4d2e]">
              Hamari Teen Badi Khususiyaat
            </h2>
          </div>

          {/* 3 Feature Cards in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1: PCSIR Lab Tested */}
            <div className="bg-[#fafdfb] p-6 sm:p-8 rounded-3xl border-2 border-[#e8f5e9] hover:border-[#d4a743] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f5e9] text-[#1a4d2e] group-hover:bg-[#d4a743] group-hover:text-white flex items-center justify-center text-2xl shadow-md transition-all duration-300">
                🧪
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-black text-[#1a4d2e]">
                  PCSIR Lab Tested
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Heavy metals aur harmful bacteria se pak. PCSIR Laboratories Lahore se certified aur shuda safe formula.
                </p>
              </div>
            </div>

            {/* Feature 2: 100% Natural */}
            <div className="bg-[#fafdfb] p-6 sm:p-8 rounded-3xl border-2 border-[#e8f5e9] hover:border-[#d4a743] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f5e9] text-[#1a4d2e] group-hover:bg-[#d4a743] group-hover:text-white flex items-center justify-center text-2xl shadow-md transition-all duration-300">
                🌿
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-black text-[#1a4d2e]">
                  100% Natural
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Koi chemical, koi steroid nahi. Khalis jari bootiyon se tayyar karda jo aap ki sehat ka qudrati khayal rakhe.
                </p>
              </div>
            </div>

            {/* Feature 3: 1000+ Trusted Customers */}
            <div className="bg-[#fafdfb] p-6 sm:p-8 rounded-3xl border-2 border-[#e8f5e9] hover:border-[#d4a743] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f5e9] text-[#1a4d2e] group-hover:bg-[#d4a743] group-hover:text-white flex items-center justify-center text-2xl shadow-md transition-all duration-300">
                ⭐
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-black text-[#1a4d2e]">
                  1000+ Trusted Customers
                </h3>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                  Pakistan bhar mein hazardon khush-haal khandan TUNE-UP+ par aetmad karte hain. Verified result aur positive feedback.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= 4. BOTTOM SECTION (Description + WhatsApp Contact) ================= */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#fafdfb] to-[#e8f5e9]/40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Product Description */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#e8f5e9] shadow-lg space-y-5">
            <div className="border-b pb-4 border-gray-100">
              <span className="text-xs font-black uppercase tracking-wider text-[#d4a743] bg-[#f5e6b8] px-3 py-1 rounded-full">
                Product Tafseelat
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#1a4d2e] mt-2">
                TUNE-UP+ Kya Hai Aur Kaise Kam Karta Hai?
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
              <p className="bg-[#e8f5e9]/40 p-4 rounded-xl border border-[#1a4d2e]/10 text-[#1a4d2e] font-semibold">
                Tune-Up+ qudrati jari bootiyon se bana ek khalis herbal supplement hai.
              </p>

              <p>
                Ye shugar, dil, jigar, gurday, joron ka dard, bal, jild, tawanai aur yaddasht ke liye mufeed hai.
              </p>

              <p>
                PCSIR Laboratories Lahore mein test shuda aur steroid-free paya gaya.
              </p>

              <div className="bg-[#fafdfb] border border-emerald-200 p-4 rounded-2xl space-y-2">
                <h4 className="font-serif font-black text-[#1a4d2e] text-base flex items-center gap-2">
                  <span>📋</span> Istemal Ka Tariqa (Dosage):
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-gray-600">
                  <li><strong>Quantity:</strong> 60 Capsules (1 Month Course)</li>
                  <li><strong>Tariqa:</strong> Rozana 2 capsules (Ek subah, ek shaam khane ke baad paani ke sath)</li>
                  <li><strong>Parez:</strong> Koi sakht parez nahi, qudrati khorak ke sath shamil karein.</li>
                </ul>
              </div>
            </div>

            {/* Secondary Order Button in Description */}
            <div className="pt-2">
              <button
                onClick={openOrderModal}
                className="w-full bg-[#1a4d2e] hover:bg-[#d4a743] text-white hover:text-emerald-950 font-black py-4 px-6 rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 text-base sm:text-lg animate-cta-shake cursor-pointer border-2 border-[#d4a743]"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>🛒 Order Now — Cash on Delivery (Rs. 6,900)</span>
              </button>
            </div>
          </div>

          {/* Right Side: WhatsApp Contact Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0c2e1b] to-[#1a4d2e] text-white p-6 sm:p-8 rounded-3xl border border-[#d4a743]/40 shadow-2xl flex flex-col justify-between items-center text-center space-y-6">
            
            <div className="space-y-4 w-full">
              
              {/* Large WhatsApp Green Icon */}
              <div className="w-20 h-20 bg-[#25d366] text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl ring-4 ring-[#25d366]/30">
                <MessageSquare className="w-10 h-10 fill-white" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-serif font-black text-white">
                  WhatsApp Karein
                </h3>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  Direct hamari health support team se rabta karein
                </p>
              </div>

              <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
                <p className="text-xs text-gray-300 font-bold uppercase tracking-wider">Official Number</p>
                <p className="text-xl sm:text-2xl font-black text-amber-300 tracking-wide mt-1">
                  +92 304 2351501
                </p>
                <p className="text-[11px] text-emerald-200 mt-1">
                  Available 24/7 for order and support
                </p>
              </div>
            </div>

            {/* WhatsApp CTA Button */}
            <a
              href="https://wa.me/923042351501?text=Assalam-o-Alaikum%20Tune-Up%2B%20Herbal%20Capsules%20ke%20bare%20me%20rabta%20karna%20hai"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25d366] hover:bg-[#20ba59] active:scale-[0.98] text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 text-base"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>💬 Message Us</span>
            </a>

          </div>

        </div>
      </section>

      {/* Footer minimal */}
      <footer className="bg-[#0f331f] text-white py-6 px-4 text-center border-t border-white/10 text-xs text-gray-400">
        <div className="max-w-6xl mx-auto space-y-2">
          <p className="font-bold text-amber-300">TUNE-UP+ • Herbs of Foods</p>
          <p>© {new Date().getFullYear()} Tune-Up+ Herbal. All Rights Reserved. Cash on Delivery Nationwide.</p>
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP BUTTON (Fixed Bottom Right - Mobile & Desktop) ================= */}
      <a
        href="https://wa.me/923042351501?text=Assalam-o-Alaikum%20Tune-Up%2B%20Product%20Page%20se%20rabta%20karna%20hai"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25d366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 border-2 border-white animate-bounce cursor-pointer"
        aria-label="WhatsApp Support"
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-white shrink-0" />
        <span className="text-xs sm:text-sm font-black tracking-wide text-white">
          WhatsApp Chat
        </span>
      </a>

      {/* ================= ORDER FORM POPUP MODAL ================= */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#e8f5e9] flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#0c2e1b] to-[#1a4d2e] text-white p-5 flex items-center justify-between border-b border-[#d4a743]/30 shrink-0">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-[#d4a743]" />
                <h3 className="text-lg font-serif font-black text-white">
                  Order Form — Cash on Delivery
                </h3>
              </div>
              <button
                onClick={closeOrderModal}
                className="bg-white/10 hover:bg-white/20 text-white p-1.5 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Scrollable Form */}
            <div className="p-6 overflow-y-auto space-y-4">
              
              <div className="bg-[#f5e6b8]/50 border border-[#d4a743]/50 p-3 rounded-2xl text-xs text-[#1a4d2e] font-bold flex items-center justify-between">
                <span>Product: TUNE-UP+ Capsules</span>
                <span className="bg-[#1a4d2e] text-amber-300 px-2.5 py-0.5 rounded-lg text-[11px] font-black">
                  60 Capsules
                </span>
              </div>

              {/* FormSubmit.co Integration Form */}
              <form
                action="https://formsubmit.co/tune.up.plus.herbal@gmail.com"
                method="POST"
                onSubmit={handleModalOrderSubmit}
                className="space-y-4"
              >
                {/* Hidden Required FormSubmit.co Configuration Fields */}
                <input type="hidden" name="_subject" value="New Order from Tune-Up+ Product Page" />
                <input type="hidden" name="_autoresponse" value="Thank you for your order! We will contact you shortly. - Tune-Up+ Team" />
                <input type="hidden" name="_captcha" value="true" />
                <input type="hidden" name="_template" value="box" />
                <input type="hidden" name="Product Name" value="TUNE-UP+ Herbal Capsules (60 Capsules)" />
                <input type="hidden" name="Calculated Total Price" value={`Rs. ${totalPrice.toLocaleString()}`} />

                {/* 1. Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Full Name (Naam) *
                  </label>
                  <input
                    type="text"
                    name="Name"
                    required
                    placeholder="Apka poora naam"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/30 focus:outline-none rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
                  />
                </div>

                {/* 2. Phone */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="Phone"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/30 focus:outline-none rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
                  />
                </div>

                {/* 3. Email */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="Email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/30 focus:outline-none rounded-xl px-4 py-2.5 text-sm font-medium transition-all"
                  />
                </div>

                {/* 4. Address */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Complete Address (Ghar Ka Pata) *
                  </label>
                  <textarea
                    name="Address"
                    required
                    rows={2}
                    placeholder="Ghar/Dukaan ka number, street, mohalla aur shehar"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/30 focus:outline-none rounded-xl px-4 py-2.5 text-sm font-medium transition-all resize-none"
                  />
                </div>

                {/* 5. Quantity Dropdown */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Quantity (Kitne Pack Sets?) *
                  </label>
                  <select
                    name="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-full bg-gray-50 border border-gray-300 text-gray-900 focus:border-[#1a4d2e] focus:ring-2 focus:ring-[#1a4d2e]/30 focus:outline-none rounded-xl px-4 py-2.5 text-sm font-bold transition-all cursor-pointer"
                  >
                    <option value={1}>1 Pack (60 Capsules) — Rs. 6,900</option>
                    <option value={2}>2 Packs (120 Capsules) — Rs. 13,800</option>
                    <option value={3}>3 Packs (180 Capsules) — Rs. 20,700</option>
                    <option value={4}>4 Packs (240 Capsules) — Rs. 27,600</option>
                    <option value={5}>5 Packs (300 Capsules) — Rs. 34,500</option>
                  </select>
                </div>

                {/* 6. Auto-Calculated Total Price Display */}
                <div className="bg-[#e8f5e9] border border-[#1a4d2e]/20 p-4 rounded-2xl flex items-center justify-between mt-2">
                  <div>
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-wider block">
                      Total Payable (COD):
                    </span>
                    <span className="text-[10px] text-emerald-800 font-semibold">
                      Free Home Delivery Nationwide
                    </span>
                  </div>
                  <span className="text-2xl font-black text-[#1a4d2e]">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  className="w-full bg-[#d4a743] hover:bg-[#c29633] active:scale-[0.98] text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 text-base mt-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>🛒 Submit Order (Cash on Delivery)</span>
                </button>
              </form>

              <div className="text-center text-[10px] text-gray-400 pt-1">
                🔒 Safe & Secure Order. COD available all over Pakistan.
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
