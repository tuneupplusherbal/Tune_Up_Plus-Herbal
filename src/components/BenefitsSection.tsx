import React from 'react';
import { ShieldCheck, Award, Leaf, CheckCircle, ChevronRight, FileCheck, Sparkles } from 'lucide-react';
import pcsirImg from '../assets/images/pcsir_certificate_report_1786021131619.jpg';
import flatlayImg from '../assets/images/tuneup_bottle_flatlay_1786021147949.jpg';

interface BenefitsSectionProps {
  onOrderClick: () => void;
}

export interface BenefitCardItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

const benefitCards: BenefitCardItem[] = [
  {
    id: 'shugar',
    icon: '🩸',
    title: 'Shugar Control',
    description: 'Qudrati tor par shugar ko mutawazan rakhein',
  },
  {
    id: 'dil',
    icon: '🫀',
    title: 'Dil Ki Hifazat',
    description: 'Dil ko mazboot aur sehat mand rakhein',
  },
  {
    id: 'joron',
    icon: '🦴',
    title: 'Joron Ka Dard',
    description: 'Joron aur hadiyon ki kamzori door karein',
  },
  {
    id: 'dimagh',
    icon: '🧠',
    title: 'Yaddasht Aur Dimagh',
    description: 'Dimaghi chusti aur yaddasht barhayein',
  },
  {
    id: 'tawanai',
    icon: '⚡',
    title: 'Tawanai Aur Stamina',
    description: 'Din bhar chust aur active rahein',
  },
  {
    id: 'prostate',
    icon: '🚽',
    title: 'Prostate Health',
    description: 'Pishab ke masail mein madad',
  },
  {
    id: 'bal-jild',
    icon: '💇',
    title: 'Bal Aur Jild',
    description: 'Bal girne se rokay, jild ko nikhare',
  },
  {
    id: 'immunity',
    icon: '🛡️',
    title: 'Quwwat-e-Madaffat',
    description: 'Bimariyon se bachaye, immunity barhaye',
  },
];

export default function BenefitsSection({ onOrderClick }: BenefitsSectionProps) {
  return (
    <section id="benefits" className="py-16 md:py-24 bg-gradient-to-b from-[#fafdfb] via-[#f4faf5] to-white border-t border-[#e8f5e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* SECTION TOP HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a4d2e]/10 border border-[#1a4d2e]/20 text-[#1a4d2e] font-extrabold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#d4a743]" />
            <span>100% Pure Natural Formula • Steroid Free</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1a4d2e] tracking-tight">
            Tune-Up+ Ke Fawaid
          </h2>
          <p className="text-gray-600 font-medium text-base sm:text-lg max-w-2xl mx-auto">
            Qudrati jari bootiyon se tayyar karda Tune-Up+ capsules aapki aur aapki family ki mukammal sehat aur tawanai ke liye ek behtareen intikhab hain.
          </p>
        </div>

        {/* PRODUCT SHOWCASE FEATURE BANNER */}
        <div className="bg-gradient-to-r from-[#1a4d2e] to-[#0e2c1a] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-[#d4a743]/30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a743]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Text on Left */}
            <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
              <span className="bg-[#d4a743] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                Herbs of Foods Organic Supplement
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-white leading-snug">
                Ek Capsule — Be-Shumar Health Benefits!
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Pao ke naakhun se le kar sar ke baalon tak — Tune-Up+ aapke jism ke tamamm qudrati nizam ko active aur sehat mand rakhne me madad karta hai.
              </p>

              {/* Badges */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs font-bold text-[#f0d48f]">
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#d4a743]" /> 100% Steroid Free
                </span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#d4a743]" /> PCSIR Lab Certified
                </span>
                <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 flex items-center gap-1.5">
                  <Leaf className="w-4 h-4 text-[#d4a743]" /> Pure Organic Formula
                </span>
              </div>

              {/* CTA Button to Product Page */}
              <div className="pt-3">
                <button
                  onClick={onOrderClick}
                  className="bg-[#d4a743] hover:bg-white hover:text-[#1a4d2e] text-emerald-950 font-black px-7 py-3.5 rounded-2xl text-base shadow-xl transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105 cursor-pointer"
                >
                  <span>Abhi Order Karein — Product Page</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product Image on Right */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-[#d4a743]/40 max-w-sm w-full transform transition-transform duration-500 hover:scale-105 group">
                <img
                  src={flatlayImg}
                  alt="Tune-Up+ Bottle and Herbal Capsules Flatlay"
                  className="w-full h-64 sm:h-72 object-cover"
                  referrerPolicy="no-referrer"
                />

                {/* Attractive Price Ribbon Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-gradient-to-r from-[#d4a743] via-[#f7e8a9] to-[#d4a743] text-emerald-950 font-black px-3.5 py-1.5 rounded-full shadow-2xl border-2 border-amber-100 flex items-center gap-1.5 shadow-amber-500/30 transform hover:scale-105 transition-all">
                    <Sparkles className="w-4 h-4 text-emerald-950 fill-emerald-950 animate-pulse" />
                    <span className="text-sm sm:text-base font-black tracking-tight">Rs.6900</span>
                    <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ml-0.5 shadow-sm">
                      30% OFF
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-center">
                  <p className="text-white font-black text-xs uppercase tracking-wider">TUNE-UP+ HERBS OF FOODS</p>
                  <p className="text-[#f0d48f] text-[11px] font-semibold">60 Pure Organic Dietary Capsules</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE: 8 BENEFIT CARDS GRID (4 cols desktop / 2 cols tablet / 1 col mobile) */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-serif font-black text-[#1a4d2e]">
              Tune-Up+ Ke Key Benefits
            </h3>
            <p className="text-xs text-gray-500 font-semibold mt-1">
              Jism ke tamaam aaza ki hifazat aur behtareen karkardgi ke liye
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefitCards.map((card) => (
              <div
                key={card.id}
                className="bg-white p-6 rounded-2xl border border-[#e8f5e9] shadow-md hover:shadow-xl hover:border-[#d4a743] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Gold Top Accent Line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-[#e8f5e9] group-hover:bg-[#d4a743] transition-colors duration-300" />

                <div className="space-y-4">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-[#f4faf5] border border-[#e8f5e9] flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 group-hover:bg-[#e8f5e9] transition-all duration-300">
                    {card.icon}
                  </div>

                  {/* Title & Description */}
                  <div className="space-y-2">
                    <h4 className="text-lg font-serif font-black text-[#1a4d2e] group-hover:text-[#d4a743] transition-colors duration-300">
                      {card.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#555555] font-medium leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                {/* Bottom Verified Tick */}
                <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-[#1a4d2e]">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#d4a743]" /> Verified Benefit
                  </span>
                  <span className="text-gray-400 font-mono text-[10px]">100% Natural</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM: FULL-WIDTH PCSIR LAB TESTED SECTION */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#e8f5e9] shadow-xl space-y-8 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a4d2e]/10 text-[#1a4d2e] font-black text-xs uppercase tracking-wider">
              <FileCheck className="w-4 h-4 text-[#d4a743]" />
              <span>PCSIR Government Approved Lab Verified</span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#1a4d2e]">
              🧪 PCSIR Lab Tested
            </h3>

            <p className="text-sm sm:text-base text-[#555555] font-semibold leading-relaxed max-w-2xl mx-auto">
              Tune-Up+ PCSIR Laboratories Lahore mein test shuda. Heavy metals (Arsenic, Lead, Cadmium, Mercury) aur bacteria (E. coli, Salmonella) se pak paya gaya.
            </p>
          </div>

          {/* Certificate Image Frame */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-4xl bg-[#fafdfb] p-3 sm:p-6 rounded-2xl border border-[#e8f5e9] shadow-lg overflow-hidden group">
              <img
                src={pcsirImg}
                alt="PCSIR Laboratories Complex Lahore Official Test Report for Tune-Up+ Capsules"
                className="w-full h-auto object-contain rounded-xl max-h-[600px] mx-auto shadow-md transition-transform duration-500 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />

              {/* Certificate Quick Badges */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="bg-[#e8f5e9] p-2.5 rounded-xl border border-[#1a4d2e]/20">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Arsenic & Lead</p>
                  <p className="text-xs font-black text-[#1a4d2e]">Not Detected (Pass)</p>
                </div>
                <div className="bg-[#e8f5e9] p-2.5 rounded-xl border border-[#1a4d2e]/20">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Mercury & Cadmium</p>
                  <p className="text-xs font-black text-[#1a4d2e]">Not Detected (Pass)</p>
                </div>
                <div className="bg-[#e8f5e9] p-2.5 rounded-xl border border-[#1a4d2e]/20">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">E. coli & Salmonella</p>
                  <p className="text-xs font-black text-[#1a4d2e]">Absent (100% Safe)</p>
                </div>
                <div className="bg-[#d4a743]/10 p-2.5 rounded-xl border border-[#d4a743]/30">
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Steroid Test</p>
                  <p className="text-xs font-black text-[#8c6c22]">100% Steroid Free</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order CTA button */}
          <div className="text-center pt-2">
            <button
              onClick={onOrderClick}
              className="bg-[#1a4d2e] hover:bg-[#d4a743] text-white px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg shadow-xl transition-all duration-300 inline-flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Abhi Order Karein (Order Now)</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
