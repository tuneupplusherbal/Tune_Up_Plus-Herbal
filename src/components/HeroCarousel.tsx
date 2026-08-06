import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight, ShieldCheck, Award, Leaf, Activity } from 'lucide-react';
import sugarControlImg from '../assets/images/sugar_control_patient_1786020736570.jpg';
import jointPainImg from '../assets/images/joint_pain_elderly_1786020752499.jpg';
import memoryStressImg from '../assets/images/memory_stress_student_1786020764403.jpg';
import happyFamilyImg from '../assets/images/happy_family_health_1786020779692.jpg';
import heartCareImg from '../assets/images/heart_care_patient_1786021338944.jpg';

interface HeroCarouselProps {
  productImage: string;
  onOrderClick: () => void;
  onMoreClick: () => void;
}

export interface CarouselSlide {
  id: number;
  bgGradient: string;
  badgeIcon: string;
  badgeLabelUrdu: string;
  badgeLabelRoman: string;
  headingUrdu: string;
  headingRoman: string;
  subTextUrdu: string;
  subTextRoman: string;
  buttonTextUrdu: string;
  buttonTextRoman: string;
  buttonType: 'gold' | 'green';
  slideImage?: string;
  imageCaption: string;
  taglineBadge: string;
}

const slides: CarouselSlide[] = [
  {
    id: 1,
    bgGradient: 'from-[#0f381f] via-[#1a4d2e] to-[#134024]',
    badgeIcon: '🩸',
    badgeLabelUrdu: 'قدرتی شوگر کنٹرول',
    badgeLabelRoman: 'Qudrati Sugar Control Formula',
    headingUrdu: 'شوگر کنٹرول کا قدرتی حل',
    headingRoman: 'Sugar Control Ka Qudrati Hal',
    subTextUrdu: 'Tune-Up+ شوگر لیول کو متوازن رکھنے اور قدرتی انسولین فنکشن کو سپورٹ کرنے میں مددگار',
    subTextRoman: 'Tune-Up+ sugar level ko mutawazin rakhne aur qudrati tawanai bahal rakhne mein madadgar',
    buttonTextUrdu: 'مزید جانیں',
    buttonTextRoman: 'Mazeed Janein',
    buttonType: 'gold',
    slideImage: sugarControlImg,
    imageCaption: 'Blood Sugar Monitoring & Natural Regulation • Qudrati Sugar Care',
    taglineBadge: 'Sugar Balance Support',
  },
  {
    id: 2,
    bgGradient: 'from-[#144227] via-[#1a4d2e] to-[#1f4a2d]',
    badgeIcon: '🦴',
    badgeLabelUrdu: 'جوڑوں اور ہڈیوں کا راحت',
    badgeLabelRoman: 'Joron Aur Hadiyon Ki Rahat',
    headingUrdu: 'جوڑوں کے درد سے نجات',
    headingRoman: 'Joron Ke Dard Se Nijaat',
    subTextUrdu: 'Tune-Up+ جوڑوں، پٹھوں اور ہڈیوں کو مضبوط بنائے اور روزمرہ کی حرکت آسان کرے',
    subTextRoman: 'Tune-Up+ joron, pathon aur hadiyon ko mazboot banaye aur harkat me aasani peda kare',
    buttonTextUrdu: 'مزید جانیں',
    buttonTextRoman: 'Mazeed Janein',
    buttonType: 'gold',
    slideImage: jointPainImg,
    imageCaption: 'Joint & Muscle Pain Relief • Joron Aur Pathon Ka Hal',
    taglineBadge: 'Joints & Bone Relief',
  },
  {
    id: 3,
    bgGradient: 'from-[#0c2e19] via-[#144227] to-[#1a4d2e]',
    badgeIcon: '🧠',
    badgeLabelUrdu: 'دماغی چستی اور یادداشت',
    badgeLabelRoman: 'Dimaghi Chusti Aur Yaaddasht',
    headingUrdu: 'یادداشت اور دماغی چستی',
    headingRoman: 'Yaaddasht Aur Dimaghi Chusti',
    subTextUrdu: 'Tune-Up+ دماغی کارکردگی، یادداشت اور ذہنی تناؤ کو بہتر بنانے کے لیے بہترین انتخاب',
    subTextRoman: 'Tune-Up+ dimaghi karkardgi, yaaddasht aur zehni tanao ko kam karne me mufeed',
    buttonTextUrdu: 'مزید جانیں',
    buttonTextRoman: 'Mazeed Janein',
    buttonType: 'gold',
    slideImage: memoryStressImg,
    imageCaption: 'Memory Boost & Stress Relief • Dimaghi Tawanai',
    taglineBadge: 'Brain & Memory Focus',
  },
  {
    id: 4,
    bgGradient: 'from-[#163e26] via-[#1a4d2e] to-[#10331e]',
    badgeIcon: '🫀',
    badgeLabelUrdu: 'دل کی صحت اور تحفظ',
    badgeLabelRoman: 'Dil Ki Sehat Aur Hifazat',
    headingUrdu: 'دل کی صحت اور شریانوں کا تحفظ',
    headingRoman: 'Dil Ki Sehat Aur Heart Care',
    subTextUrdu: 'Tune-Up+ کولیسٹرول، بلڈ پریشر اور دل کے نظام کو مضبوط اور صحت مند بنانے میں معاون',
    subTextRoman: 'Tune-Up+ cholesterol aur blood pressure ko mutawazin rakh kar dil ko taqat de',
    buttonTextUrdu: 'مزید جانیں',
    buttonTextRoman: 'Mazeed Janein',
    buttonType: 'gold',
    slideImage: heartCareImg,
    imageCaption: 'Heart Health & Cholesterol Balance • Dil Ki Rahat',
    taglineBadge: 'Heart & Cholesterol Care',
  },
  {
    id: 5,
    bgGradient: 'from-[#1a4d2e] via-[#134024] to-[#0f381f]',
    badgeIcon: '🌿',
    badgeLabelUrdu: 'ہر عمر کے لیے مکمل تحفظ',
    badgeLabelRoman: 'Mukammal Family Sehat Tahaffuz',
    headingUrdu: 'مکمل صحت کا تحفظ',
    headingRoman: 'Mukammal Sehat Ka Tahaffuz',
    subTextUrdu: 'پاؤں کے ناخن سے لے کر سر کے بالوں تک — Tune-Up+ آپ کا اور آپ کی فیملی کا حقیقی ساتھی',
    subTextRoman: 'Pao ke naakhun se le kar sar ke baalon tak — Tune-Up+ aap ka qudrati sathi',
    buttonTextUrdu: 'آج ہی آرڈر کریں',
    buttonTextRoman: 'Aaj Hi Order Karein',
    buttonType: 'green',
    slideImage: happyFamilyImg,
    imageCaption: 'Complete Family Health & Vitality • 100% Pure Organic',
    taglineBadge: 'Complete Family Sehat',
  },
];

export default function HeroCarousel({ productImage, onOrderClick, onMoreClick }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Unconditional continuous Auto-slide effect every 3 seconds (3000ms) - NO PAUSE ON HOVER
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const currentSlide = slides[currentIndex];

  return (
    <section 
      id="home"
      className="relative w-full overflow-hidden text-white"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Gradient Container with transition */}
      <div className={`w-full bg-gradient-to-r ${currentSlide.bgGradient} transition-all duration-700 ease-in-out py-10 md:py-16 px-4 sm:px-6 lg:px-8 relative`}>
        
        {/* Subtle decorative glowing background light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4a743]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#1a4d2e]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[420px]">
            
            {/* LEFT TEXT COLUMN */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left transition-opacity duration-500">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold shadow-sm">
                <span className="text-base">{currentSlide.badgeIcon}</span>
                <span className="font-sans" dir="rtl">{currentSlide.badgeLabelUrdu}</span>
                <span className="hidden sm:inline-block text-white/40">•</span>
                <span className="hidden sm:inline-block text-[#f0d48f] font-semibold">{currentSlide.badgeLabelRoman}</span>
              </div>

              {/* Headings: Urdu + Roman Urdu */}
              <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-snug" dir="rtl">
                  {currentSlide.headingUrdu}
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#f0d48f] tracking-wide">
                  {currentSlide.headingRoman}
                </h2>
              </div>

              {/* Sub-text: Urdu + Roman Urdu */}
              <div className="space-y-2 max-w-2xl mx-auto lg:mx-0">
                <p className="text-base sm:text-lg text-gray-100 font-medium leading-relaxed" dir="rtl">
                  {currentSlide.subTextUrdu}
                </p>
                <p className="text-xs sm:text-sm text-emerald-100/80 font-normal">
                  {currentSlide.subTextRoman}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
                {currentSlide.buttonType === 'gold' ? (
                  <button
                    onClick={onMoreClick}
                    className="w-full sm:w-auto bg-[#d4a743] hover:bg-[#c29633] text-white px-8 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-[#d4a743]/20 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <span dir="rtl">{currentSlide.buttonTextUrdu}</span>
                    <span className="text-xs opacity-90">({currentSlide.buttonTextRoman})</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <button
                    onClick={onOrderClick}
                    className="w-full sm:w-auto bg-[#1a4d2e] hover:bg-[#133a22] text-white border-2 border-[#d4a743] px-8 py-3.5 rounded-xl font-bold text-base sm:text-lg shadow-xl shadow-black/20 transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <ShoppingCart className="w-5 h-5 text-[#d4a743]" />
                    <span dir="rtl">{currentSlide.buttonTextUrdu}</span>
                    <span className="text-xs text-[#f0d48f]">({currentSlide.buttonTextRoman})</span>
                  </button>
                )}

                <a
                  href="https://wa.me/923042351501"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>💬 WhatsApp Order</span>
                </a>
              </div>

              {/* Quick Trust Bar */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-emerald-100/90 font-medium">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#f0d48f]" /> 100% Organic</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#f0d48f]" /> PCSIR Lab Tested</span>
                <span className="flex items-center gap-1.5"><Leaf className="w-4 h-4 text-[#f0d48f]" /> Steroid-Free Guarantee</span>
              </div>

            </div>

            {/* RIGHT PRODUCT / PAIN POINTS DISPLAY COLUMN */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-xs sm:max-w-sm">
                
                {/* Floating Badge */}
                <div className="absolute -top-3 -right-3 z-20 bg-[#d4a743] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg transform rotate-6 border border-white/30 flex items-center gap-1">
                  <span>100% Pure Organic</span>
                </div>

                {/* Display Card */}
                <div className="bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-3xl shadow-2xl border border-white/40 transform transition-transform duration-500 hover:scale-[1.02]">
                  <div className="overflow-hidden rounded-2xl aspect-square bg-[#f8faf8] relative flex items-center justify-center">
                    <img
                      src={currentSlide.slideImage || productImage}
                      alt={currentSlide.headingRoman}
                      className="w-full h-full object-cover rounded-2xl transition-all duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = productImage;
                      }}
                    />
                    
                    {/* Corner badge overlay */}
                    <div className="absolute bottom-3 left-3 bg-[#1a4d2e]/90 text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-md flex items-center gap-1.5 border border-white/20 shadow-md">
                      <Activity className="w-3.5 h-3.5 text-[#d4a743]" />
                      <span>{currentSlide.taglineBadge}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-gray-800 space-y-1">
                    <p className="font-extrabold text-xs sm:text-sm text-[#1a4d2e] uppercase tracking-wide">
                      TUNE-UP+ HERBS OF FOODS
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-gray-500 font-semibold">
                      {currentSlide.imageCaption}
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* CONTROLS & NAVIGATION DOTS */}
        <div className="max-w-7xl mx-auto mt-6 flex items-center justify-between pt-2 border-t border-white/10 relative z-20">
          
          {/* Slide counter indicator */}
          <div className="text-xs text-white/70 font-semibold tracking-wider">
            Slide <span className="text-[#f0d48f] font-bold">{currentIndex + 1}</span> / {slides.length}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-8 bg-[#f0d48f]'
                    : 'w-2.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Previous / Next Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous Slide"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all backdrop-blur-sm border border-white/20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Slide"
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-all backdrop-blur-sm border border-white/20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
