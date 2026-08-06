import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Leaf, 
  Sparkles, 
  PhoneCall, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  Plus, 
  Minus, 
  Menu, 
  X, 
  ArrowUp, 
  Info, 
  ChevronDown, 
  Users, 
  Sparkle,
  BadgeAlert,
  ClipboardCheck,
  ShoppingBag,
  HelpCircle,
  Clock,
  ThumbsUp
} from 'lucide-react';
import { TRUST_BADGES, INGREDIENTS, BENEFITS, TESTIMONIALS, PRODUCT_PACKAGES, FAQS } from './data';
import { Ingredient, Benefit, Testimonial, ProductPackage } from './types';
import productImage from './assets/images/tuneup_premium_bottle_1781620630182.jpg';
import familyImage from './assets/images/tuneup_family_1781618517187.jpg';
import HeroCarousel from './components/HeroCarousel';
import BenefitsSection from './components/BenefitsSection';
import OrderContactSection from './components/OrderContactSection';
import TuneUpPlusProductPage from './components/TuneUpPlusProductPage';
import NotFoundPage from './components/NotFoundPage';

export default function App() {
  // Route state
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Trigger Meta Pixel PageView on client-side route changes & pass test_event_code if present
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      const urlParams = new URLSearchParams(window.location.search);
      const testCode = urlParams.get('test_event_code');
      const pixelOptions = testCode ? { test_event_code: testCode } : {};

      (window as any).fbq('track', 'PageView', {}, pixelOptions);
    }
  }, [currentPath]);

  const navigateToProductPage = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/tuneupplus/');
      setCurrentPath('/tuneupplus/');
      window.scrollTo(0, 0);

      // Track InitiateCheckout in Meta Pixel
      if ((window as any).fbq) {
        const urlParams = new URLSearchParams(window.location.search);
        const testCode = urlParams.get('test_event_code');
        const pixelOptions = testCode ? { test_event_code: testCode } : {};

        (window as any).fbq('track', 'InitiateCheckout', {
          content_name: 'Tune-Up+ Organic Herbal Capsules',
          currency: 'PKR',
          value: 6900
        }, pixelOptions);
      }
    }
  };

  const navigateToHome = () => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', '/');
      setCurrentPath('/');
      window.scrollTo(0, 0);
    }
  };

  // Navigation & Screen States
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [backToTopVisible, setBackToTopVisible] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  // Interaction States
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('All');
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);
  
  // Order System States
  const [selectedPackage, setSelectedPackage] = useState<string>('couple');
  const [orderQuantity, setOrderQuantity] = useState<number>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Anti-bot Human Verification States
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(8);
  const [userCaptchaAnswer, setUserCaptchaAnswer] = useState('');
  const [captchaError, setCaptchaError] = useState(false);

  // Dynamic pricing and packaging helpers for live inputs
  const activePkg = PRODUCT_PACKAGES.find(p => p.id === selectedPackage) || PRODUCT_PACKAGES[1];
  const totalPriceCalculated = activePkg.price * orderQuantity;
  const totalBottlesCalculated = (activePkg.id === 'starter' ? 1 : activePkg.id === 'couple' ? 2 : 4) * orderQuantity;
  const totalCapsCountCalculated = activePkg.capsuleCount * orderQuantity;

  // Randomize math verification values on mount
  useEffect(() => {
    setNum1(Math.floor(Math.random() * 8) + 2); // 2 to 9
    setNum2(Math.floor(Math.random() * 8) + 2); // 2 to 9
  }, []);

  // Monitor Scroll for Back to Top or Active Section Spy (Continuous Scrolling layout style)
  useEffect(() => {
    const handleScroll = () => {
      // 1. Back to top visibility
      if (window.scrollY > 400) {
        setBackToTopVisible(true);
      } else {
        setBackToTopVisible(false);
      }

      // 2. Active section detection (Scroll Spy)
      const sections = ['home', 'product', 'benefits', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 120; // safe header offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Route dispatching
  if (currentPath.includes('tuneupplus')) {
    return <TuneUpPlusProductPage onBackToMain={navigateToHome} />;
  }

  // Handle 404 for unknown routes (anything other than root '/')
  const isRootPath = currentPath === '/' || currentPath === '' || currentPath === '/index.html' || currentPath.startsWith('/#');
  if (!isRootPath) {
    return <NotFoundPage onBackToHome={navigateToHome} onGoToProductPage={navigateToProductPage} />;
  }

  // Smooth-scroll navigation helper for solid single-page experience
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - 80; // 80px sticky header spacer
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    setMobileMenuOpen(false);
  };



  // Submit Handler for Form via AJAX FormSubmit.co
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verify Captcha response
    const correctAnswer = num1 + num2;
    if (parseInt(userCaptchaAnswer, 10) !== correctAnswer) {
      setCaptchaError(true);
      const secEl = document.getElementById('security-check-container');
      if (secEl) {
        secEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setCaptchaError(false);
    setIsSubmitting(true);
    setSubmissionError('');

    try {
      const activePkg = PRODUCT_PACKAGES.find(p => p.id === selectedPackage) || PRODUCT_PACKAGES[1];
      const totalBillAmount = activePkg.price * orderQuantity;
      const totalBottlesCount = (activePkg.id === 'starter' ? 1 : activePkg.id === 'couple' ? 2 : 4) * orderQuantity;
      const totalCapsCount = activePkg.capsuleCount * orderQuantity;
      const pkgDetail = `${activePkg.name} (${activePkg.volume})`;

      // FormSubmit Setup Explanation:
      // FormSubmit.co is a zero-backend form endpoint. This submits a JSON payload using AJAX.
      // 1. First submission prompts a confirmation email to tune.up.plus.herbal@gmail.com.
      // 2. Once confirmed, formsubmit will auto-reply to the customer (_email) and notify the admin.
      const response = await fetch("https://formsubmit.co/ajax/tune.up.plus.herbal@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          Name: fullName,
          Phone: phoneNumber,
          email: email,
          _email: email,
          _replyto: email,
          City: city,
          Address: address,
          "Selected Package": pkgDetail,
          "Package Quantity": orderQuantity,
          "Total Bottles": totalBottlesCount,
          "Total Capsules": totalCapsCount,
          "Total Price": `Rs. ${totalBillAmount.toLocaleString()}`,
          "Order Notes": notes || 'None',
          _subject: `New Order from Tune-Up+ - Rs. ${totalBillAmount.toLocaleString()} (${fullName})`,
          _template: "box",
          _captcha: "true",
          _autoresponse: `Assalam-o-Alaikum! Thank you for your order from Tune-Up+. We have received your order details and will contact you shortly for confirmation.\n\n📋 YOUR ORDER SUMMARY (ORDER KI MAALUMAT):\n-------------------------------------\n👤 Customer Name: ${fullName}\n📦 Product Selected: Tune-Up+ Herbal Capsules - ${pkgDetail}\n🔢 Quantity ordered: ${orderQuantity} Pack(s)\n🧴 Total Bottles: ${totalBottlesCount} Bottle(s) (${totalCapsCount} Capsules)\n💰 Total Bill: Rs. ${totalBillAmount.toLocaleString()} (Cash on Delivery + Free Delivery)\n📍 Shipping Address: ${address}, ${city}\n\nOur customer support and health expert team will contact you within just 2 hours to confirm your active order. For any questions or queries, please call or WhatsApp us at +92 304 2351501.\n\nThank you for choosing Tune-Up+ Pakistan!`
        })
      });

      if (response.ok) {
        setOrderSubmitted(true);
        // Scroll to the contact section top smoothly to see receipt
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        throw new Error("Failed to submit the form.");
      }
    } catch (err: any) {
      console.error("FormSubmit Error:", err);
      setSubmissionError("Order submit karne mein error pesha-aya hai. Meharbani karke dubara click karein ya screenshot le kar seedha hamare WhatsApp support button se contact karein.");
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="min-h-screen flex flex-col bg-[#fafdfb] relative overflow-x-hidden antialiased text-[#333333]">
      
      {/* Alert Top Bar */}
      {alertVisible && (
        <div className="bg-[#1a4d2e] text-white py-2 px-4 text-center text-xs md:text-sm font-semibold flex items-center justify-center gap-2 relative z-50 transition-all duration-300">
          <Sparkle className="w-4 h-4 text-[#d4a743] animate-spin" style={{ animationDuration: '4s' }} />
          <span>🔥 Premium Offer: Free Cash on Delivery (COD) and Safe Private Packaging across Pakistan this week!</span>
          <button 
            onClick={() => setAlertVisible(false)} 
            className="absolute right-3 p-1 rounded hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STICKY HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e8f5e9] shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo and Urdu Tagline */}
          <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollTo('home')}>
            <img 
              src="/favicon.svg" 
              alt="Tune-Up+ Logo" 
              className="w-10 h-10 md:w-12 md:h-12 object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
            />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black tracking-tight text-[#1a4d2e] flex items-center gap-0.5 leading-tight">
                TUNE-UP<span className="text-[#d4a743]">+</span>
              </span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-extrabold text-[#d4a743] leading-none">
                HERBS OF FOODS
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links (all 5 pages) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {[
              { id: 'home', label: 'Home Page' },
              { id: 'tuneupplus', label: 'Product Page (/tuneupplus/)', isPage: true },
              { id: 'product', label: 'Product Section' },
              { id: 'benefits', label: 'Herbal Benefits' },
              { id: 'testimonials', label: 'Reviews' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => link.isPage ? navigateToProductPage() : scrollTo(link.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-[#1a4d2e] bg-[#e8f5e9]'
                    : 'text-gray-600 hover:text-[#1a4d2e] hover:bg-[#fafdfb]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* TWO PROMINENT HEADER BUTTONS */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* BUTTON 1 (Left): Order on WhatsApp */}
            <a
              href="https://wa.me/923042351501"
              target="_blank"
              rel="noreferrer"
              className="bg-[#d4a743] text-white px-4 py-2.5 rounded-lg font-bold text-xs xl:text-sm flex items-center gap-1.5 shadow-md shadow-[#d4a743]/10 hover:bg-[#c29633] transition-all duration-300 transform hover:scale-[1.05]"
            >
              <span>📞</span> Order on WhatsApp
            </a>

            {/* BUTTON 2 (Right): Order Now */}
            <button
              onClick={navigateToProductPage}
              className="bg-[#1a4d2e] text-white px-5 py-2.5 rounded-lg font-bold text-xs xl:text-sm flex items-center gap-1.5 shadow-md shadow-[#1a4d2e]/10 hover:bg-[#d4a743] hover:text-white transition-all duration-300 transform hover:scale-[1.05] hover:rotate-[1deg] animate-pulse cursor-pointer"
              style={{ animationDuration: '2s' }}
            >
              <span>🛒</span> Order Now
            </button>
          </div>

          {/* Mobile Hamburg menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="https://wa.me/923042351501"
              className="bg-[#d4a743] text-white p-2 rounded-lg font-bold text-xs flex items-center gap-1"
            >
              <span>📞</span> WhatsApp
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-[#e8f5e9] hover:text-[#1a4d2e] transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute right-0 top-20 w-3/4 max-w-sm bg-white h-[calc(100vh-80px)] shadow-2xl p-6 flex flex-col justify-between" onClick={e => e.stopPropagation()}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b pb-3">
                <img src="/favicon.svg" alt="Tune-Up+ Logo" className="w-8 h-8 object-contain" />
                <div className="flex flex-col">
                  <span className="text-lg font-black text-[#1a4d2e]">TUNE-UP<span className="text-[#d4a743]">+</span></span>
                  <span className="text-[8px] uppercase tracking-widest font-extrabold text-[#d4a743] -mt-1">HERBS OF FOODS</span>
                </div>
              </div>
              {[
                { id: 'home', label: 'Home Page (گھر)' },
                { id: 'product', label: 'Product Page (مصنوعات)' },
                { id: 'benefits', label: 'Benefits (فوائد)' },
                { id: 'testimonials', label: 'Testimonials (تاثرات)' },
                { id: 'contact', label: 'Order & Contact (آرڈر کریں)' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center justify-between ${
                    activeSection === link.id
                      ? 'text-[#1a4d2e] bg-[#e8f5e9]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t mt-auto">
              <a
                href="https://wa.me/923042351501"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#d4a743] text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>📞 Order on WhatsApp</span>
              </a>
              <button
                onClick={navigateToProductPage}
                className="w-full bg-[#1a4d2e] text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <span>🛒 Order Now online</span>
              </button>
              <p className="text-center text-[10px] text-gray-500">
                Any questions? Call us on <span className="text-[#1a4d2e] font-extrabold">+92 304 2351501</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- MAIN PAGES WRAPPER -------------------- */}
      <main className="flex-grow">

            {/* ==================== 1. HOME PAGE CAROUSEL HEADER ==================== */}
            <HeroCarousel
              productImage={productImage}
              onOrderClick={navigateToProductPage}
              onMoreClick={() => scrollTo('benefits')}
            />

        {/* ==================== TRUST BADGES SECTION ==================== */}
        <section className="bg-gradient-to-b from-white via-[#f4faf5] to-white py-12 border-y border-[#e8f5e9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#d4a743]/10 text-[#8c6c22] border border-[#d4a743]/30 text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-[#d4a743]" />
                Hamare Teen Bare Sehat Ke Waade
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRUST_BADGES.map((badge, idx) => (
                <div 
                  key={badge.id} 
                  className="group bg-white p-7 rounded-3xl border border-[#e8f5e9] hover:border-[#d4a743] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                >
                  {/* Top Gold Hover Gradient Line */}
                  <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1a4d2e] via-[#d4a743] to-[#1a4d2e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-[#e8f5e9] to-[#f4faf5] border border-[#1a4d2e]/10 w-14 h-14 rounded-2xl flex items-center justify-center text-[#1a4d2e] shrink-0 font-extrabold text-2xl shadow-sm group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#1a4d2e] group-hover:text-white transition-all duration-300">
                      {idx === 0 ? '🚫' : idx === 1 ? '🧪' : '🌿'}
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="font-serif font-black text-lg text-[#1a4d2e] group-hover:text-[#d4a743] transition-colors duration-300">
                          {badge.title}
                        </h3>
                        <span className="text-[10px] bg-[#d4a743] text-white px-2 py-0.5 rounded-full font-extrabold shadow-sm">
                          {badge.urduTitle}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-[#1a4d2e]">
                    <span className="flex items-center gap-1 text-[#d4a743]">
                      <CheckCircle className="w-3.5 h-3.5" /> Guaranteed
                    </span>
                    <span className="text-gray-400 font-mono text-[10px]">100% Authentic</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 2. PRODUCT DETAILS SECTION ==================== */}
        <section id="product" className="py-20 bg-gradient-to-b from-white via-[#fafdfb] to-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1a4d2e]/10 text-[#1a4d2e] font-black text-xs uppercase tracking-wider border border-[#1a4d2e]/20">
                <Sparkles className="w-4 h-4 text-[#d4a743]" />
                <span>Kamil Ghiza, Kamil Ilaj</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1a4d2e] tracking-tight">
                Tune-Up+ Herbal Capsules Ki Haqeeqat
              </h2>
              <p className="text-gray-600 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Hum koi jhuuti dawa nahi bechte! Hamari product jism ke har uzv (organ) ko ash-shifa khubiyan faraham karti hai.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Product specifications list (Left Column) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Specifications Card */}
                <div className="bg-white p-7 rounded-3xl border-2 border-[#e8f5e9] shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#e8f5e9] rounded-full blur-2xl -z-10 group-hover:bg-[#d4a743]/10 transition-colors" />

                  <div className="flex items-center justify-between border-b pb-4 border-[#1a4d2e]/10">
                    <h3 className="font-serif font-black text-[#1a4d2e] text-2xl flex items-center gap-2">
                      <Award className="w-6 h-6 text-[#d4a743]" />
                      <span>Specifications</span>
                    </h3>
                    <span className="text-[10px] bg-[#1a4d2e] text-white px-2.5 py-1 rounded-full font-bold">
                      Verified
                    </span>
                  </div>
                  
                  <div className="space-y-3.5 mt-4">
                    <div className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-gray-100 hover:bg-[#f4faf5] px-2 rounded-lg transition-colors">
                      <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-[#1a4d2e]" /> Physical Stress:
                      </span>
                      <span className="text-[#1a4d2e] font-extrabold bg-[#e8f5e9] px-2.5 py-1 rounded-md text-xs">
                        Instant Adaptogens
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-gray-100 hover:bg-[#f4faf5] px-2 rounded-lg transition-colors">
                      <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" /> Steroid Content:
                      </span>
                      <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md font-black text-xs border border-emerald-200">
                        0% (100% Clean)
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-gray-100 hover:bg-[#f4faf5] px-2 rounded-lg transition-colors">
                      <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                        <Leaf className="w-4 h-4 text-[#1a4d2e]" /> Pack Volume:
                      </span>
                      <span className="text-[#1a4d2e] font-extrabold text-xs">
                        60 Organic Capsules
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm py-2 border-b border-gray-100 hover:bg-[#f4faf5] px-2 rounded-lg transition-colors">
                      <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#d4a743]" /> Lab Testing:
                      </span>
                      <span className="text-[#d4a743] bg-[#f5e6b8]/50 px-2.5 py-1 rounded-md font-black text-xs border border-[#d4a743]/30">
                        PCSIR Tested
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm py-2 hover:bg-[#f4faf5] px-2 rounded-lg transition-colors">
                      <span className="text-gray-600 font-semibold flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-[#1a4d2e]" /> Target Audience:
                      </span>
                      <span className="text-green-700 font-extrabold text-xs">
                        Whole Family (16+ Yrs)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dynamic COD Delivery Banner */}
                <div className="border-2 border-[#d4a743]/40 bg-gradient-to-r from-[#fffdfa] via-[#fdf8ee] to-[#fffdfa] p-5 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-[#d4a743] text-white flex items-center justify-center shrink-0 font-bold text-2xl shadow-md group-hover:scale-110 transition-transform">
                      🚚
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                        </span>
                        <p className="font-extrabold text-sm text-[#1a4d2e] uppercase tracking-wider">
                          Cash On Delivery In Pakistan
                        </p>
                      </div>
                      <p className="text-xs text-gray-700 font-medium leading-relaxed">
                        Karachi, Lahore, Pindi, Faisalabad ya kisi bhi gaon me — parcel milne par hi cash ada karein!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Standard dosage instruction capsule layout */}
                <div className="bg-gradient-to-tr from-[#1a4d2e] via-[#144227] to-[#0d2e1b] text-white p-7 rounded-3xl shadow-xl border border-[#d4a743]/30 relative overflow-hidden group hover:shadow-2xl transition-all">
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform">
                    <Clock className="w-36 h-36" />
                  </div>
                  <div className="relative z-10 space-y-3">
                    <div className="inline-flex items-center gap-2 bg-[#d4a743] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                      💊 Istemal Ka Tarika
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                      Rozana <strong className="text-white font-extrabold underline underline-offset-2">1 capsule</strong> subah-nashtey ya raat ke khaney ke baad neem garam doodh ya paani ke sath lijiye. Joron ki zayada takleef me 2 capsules le sakte hain.
                    </p>
                  </div>
                </div>

              </div>

              {/* Ingredients Showcase (Right Column) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-4 border-gray-200">
                  <div>
                    <h3 className="text-2xl font-serif font-black text-[#1a4d2e]">Qudrati Jari Bootiyon Ki Powers</h3>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Details dekhne ke liye card par click karein:</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#d4a743] bg-[#f5e6b8]/50 px-3 py-1 rounded-full w-fit">
                    100% Pure Organic Extracts
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {INGREDIENTS.map((ing) => {
                    const isSelected = selectedIngredient?.id === ing.id;
                    return (
                      <div 
                        key={ing.id}
                        onClick={() => setSelectedIngredient(isSelected ? null : ing)}
                        className={`p-5 rounded-3xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                          isSelected 
                            ? 'bg-[#f4faf5] border-[#1a4d2e] shadow-xl scale-[1.02]'
                            : 'bg-white border-[#e8f5e9] hover:border-[#d4a743] hover:shadow-lg hover:-translate-y-1'
                        }`}
                      >
                        {/* Top corner active badge */}
                        {isSelected && (
                          <div className="absolute top-0 right-0 bg-[#1a4d2e] text-white text-[9px] font-bold px-3 py-0.5 rounded-bl-xl shadow-sm">
                            Active Details
                          </div>
                        )}

                        <div className="flex gap-4 items-start">
                          <div className="relative overflow-hidden rounded-2xl w-14 h-14 shrink-0 border border-gray-200 shadow-sm">
                            <img 
                              src={ing.image} 
                              alt={ing.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>

                          <div className="flex-grow space-y-1">
                            <div className="flex items-center justify-between gap-1">
                              <h4 className="font-extrabold text-[#1a4d2e] text-sm group-hover:text-[#d4a743] transition-colors">
                                {ing.name}
                              </h4>
                              <span className="text-[10px] font-bold text-emerald-800 bg-[#e8f5e9] px-2 py-0.5 rounded-md border border-emerald-100 shrink-0">
                                {ing.urduName}
                              </span>
                            </div>
                            <p className="text-[10px] text-gray-400 font-serif italic">{ing.scientificName}</p>
                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed font-medium pt-1">
                              {ing.description}
                            </p>
                          </div>
                        </div>

                        {/* Expanded Section inside the card */}
                        {isSelected && (
                          <div className="mt-4 pt-3 border-t border-[#1a4d2e]/15 space-y-2 text-xs animate-fadeIn">
                            <p className="font-bold text-[#1a4d2e] uppercase text-[10px] tracking-widest bg-white/80 p-1.5 rounded-lg border border-[#e8f5e9]">
                              Key Health Benefits:
                            </p>
                            <ul className="space-y-1.5 text-gray-700 font-medium pl-1">
                              {ing.benefits.map((b, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs">
                                  <span className="text-[#d4a743] font-black">✦</span> {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="text-center pt-2">
                  <button 
                    onClick={navigateToProductPage}
                    className="bg-[#d4a743] hover:bg-[#1a4d2e] text-emerald-950 hover:text-white font-black py-3.5 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2 text-sm transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>Tune-Up+ Product Page Par Jayein</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

              </div>

            </div>

            {/* Generational Clean Family layout banner matching visual brand mockup */}
            <div className="bg-gradient-to-r from-[#1a4d2e] via-[#144227] to-[#0e2d1a] rounded-[32px] overflow-hidden text-white shadow-2xl border-2 border-[#d4a743]/30 relative">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center space-y-6 relative z-10">
                  <div className="inline-flex items-center gap-2 bg-[#d4a743] text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider w-fit shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-white" /> Pure Khandani Sehat
                  </div>

                  <h3 className="text-3xl md:text-4xl font-serif font-black leading-tight text-white">
                    Maa, Baap Aur Bachon Ke Liye Yaksa Mufeed!
                  </h3>

                  <p className="text-emerald-100 text-sm md:text-base leading-relaxed font-medium">
                    Tune-Up+ ek mukammal khandaani nuskha hai jo aapke ghar ke har fard ko samajhta hai. Bachon ki nashonuma se lekar buzurgon ki tawanaai tak, hamara 100% qudrati formula aapki sehat ka raaz hai.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 pt-1">
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
                      <Users className="w-4 h-4 text-[#d4a743]" />
                      <span>Kids Boost (16+ Years)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
                      <Sparkles className="w-4 h-4 text-[#d4a743]" />
                      <span>Parents Vitality & Stamina</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold border border-white/20">
                      <CheckCircle className="w-4 h-4 text-[#d4a743]" />
                      <span>Elderly Pain Relief</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={navigateToProductPage}
                      className="bg-[#d4a743] hover:bg-white hover:text-[#1a4d2e] px-8 py-3.5 rounded-2xl text-sm font-black shadow-xl transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105 cursor-pointer"
                    >
                      <span>Abhi Order Karein</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[320px] lg:h-auto overflow-hidden group">
                  <img 
                    src={familyImage} 
                    alt="Happy Pakistani generational family smiling in fresh green garden representing herbal health" 
                    className="w-full h-full object-cover lg:absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1a4d2e] via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

          </div>
        </section>
        {/* ==================== 3. BENEFITS PAGE ==================== */}
        <BenefitsSection onOrderClick={navigateToProductPage} />
        {/* ==================== 4. TESTIMONIALS SECTION ==================== */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-[#fafdfb] via-white to-[#fafdfb] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a743]/10 text-[#8c6c22] border border-[#d4a743]/30 text-xs font-black uppercase tracking-widest">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Google Verified Reviews • 4.9 ★★★★★ Rating</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#1a4d2e] tracking-tight">
                Hamare Khush-haal Customers
              </h2>

              <p className="text-gray-600 font-medium text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                Lahore, Karachi, Pindi, Peshawar aur KPK se mard o khawateen ke sachy aur verified reviews.
              </p>
            </div>

            {/* Testimonials Card Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TESTIMONIALS.map((review) => {
                return (
                  <div 
                    key={review.id} 
                    className="group bg-white p-8 rounded-3xl border-2 border-[#e8f5e9] hover:border-[#d4a743] shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative flex flex-col justify-between overflow-hidden"
                  >
                    {/* Top Gold Hover Accent */}
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1a4d2e] via-[#d4a743] to-[#1a4d2e] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Quotation raw element accent */}
                    <span className="absolute top-4 right-6 text-7xl text-[#1a4d2e]/10 group-hover:text-[#d4a743]/20 font-serif pointer-events-none select-none transition-colors duration-300">“</span>

                    <div className="space-y-5 relative z-10">
                      
                      {/* Google Review Badge & Star Rating */}
                      <div className="flex items-center justify-between border-b pb-4 border-gray-100">
                        <div className="flex items-center gap-1.5">
                          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                          <span className="text-[11px] font-bold text-gray-500">Google Review</span>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${i < review.rating ? 'text-[#d4a743] fill-[#d4a743]' : 'text-gray-200'}`} 
                            />
                          ))}
                        </div>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-serif italic text-right dir-rtl pt-1">
                        {review.text}
                      </p>

                    </div>

                    {/* Author Footers */}
                    <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#1a4d2e] to-[#2e6e47] text-white flex items-center justify-center font-black text-base shrink-0 shadow-md group-hover:scale-105 transition-transform">
                          {review.name.charAt(0)}
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-serif font-black text-sm text-[#1a4d2e] group-hover:text-[#d4a743] transition-colors truncate">
                            {review.name}
                          </h4>
                          <p className="text-xs text-gray-500 truncate font-medium">
                            {review.relation} • <span className="text-[#d4a743] font-bold">{review.city}</span>
                          </p>
                        </div>
                      </div>
                      
                      {/* Verified Badge */}
                      <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase flex items-center gap-1 shrink-0">
                        <CheckCircle className="w-3 h-3 text-emerald-600" /> Verified
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Testimonials bottom Conversion Call */}
            <div className="bg-gradient-to-r from-[#1a4d2e] via-[#144227] to-[#0e2d1a] border-2 border-[#d4a743]/40 p-8 sm:p-12 rounded-[32px] text-center max-w-4xl mx-auto space-y-5 text-white shadow-2xl relative overflow-hidden group">
              <div className="inline-flex items-center gap-2 bg-[#d4a743] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                <Sparkles className="w-4 h-4 text-white" /> 100% Satisfaction Guarantee
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white leading-snug">
                Aap bhi TUNE-UP+ capsules tajurba karein aur hamare aglay satisfied customer banein!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-xl mx-auto leading-relaxed">
                Hamara formula 100% organic aur non-habit forming hai, yani aap kisi bhi waqt baghair kisi side-effect ke ise chour sakte hain.
              </p>
              <div className="pt-2">
                <button
                  onClick={navigateToProductPage}
                  className="bg-[#d4a743] hover:bg-white hover:text-[#1a4d2e] text-white px-9 py-4 rounded-2xl font-black text-base shadow-xl transition-all duration-300 inline-flex items-center gap-2 transform hover:scale-105 cursor-pointer"
                >
                  <span>Abhi Order Karein Aur Khud Tajurba Karein</span>
                  <ArrowRight className="w-5 h-5 animate-bounce" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 5. CONTACT / ORDER SECTION ==================== */}
        <OrderContactSection productImage={productImage} />

        {/* ==================== FAQS SECTION ==================== */}
        <section className="py-20 bg-gradient-to-b from-[#f7fcf8] to-white border-t border-[#e8f5e9]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-black text-[#1a4d2e] bg-[#e8f5e9] border border-[#2e6e47]/30 px-4 py-1.5 rounded-full shadow-sm">
                <span className="text-[#d4a743]">❓</span> Sawaal aur Jawab (FAQs)
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#1a4d2e] tracking-tight">
                Aam Tor Par Poochhe Janay Waley Sawaalat
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-semibold max-w-lg mx-auto">
                TUNE-UP+ Ke Baaray Mein Kuch Zaroori Maloomat Jo Pakistanis Poochte Hain
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-white p-6 rounded-3xl border border-[#e8f5e9] shadow-md hover:shadow-xl hover:border-[#d4a743]/50 transition-all duration-300 space-y-3 group"
                >
                  <h3 className="font-serif font-black text-base sm:text-lg text-[#1a4d2e] flex items-start gap-3 leading-snug">
                    <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#1a4d2e] to-[#2e6e47] text-[#d4a743] flex items-center justify-center text-sm font-black shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      Q{idx + 1}
                    </span>
                    <span className="pt-0.5">{faq.q}</span>
                  </h3>
                  <div className="pl-11 border-l-2 border-[#d4a743]/30 ml-4 py-1">
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Helpline Banner below FAQs */}
            <div className="mt-12 p-6 rounded-3xl bg-[#1a4d2e] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl border border-emerald-700/50">
              <div className="text-center sm:text-left space-y-1">
                <h4 className="font-serif font-black text-lg text-[#d4a743]">Koyi Aur Sawaal Hai?</h4>
                <p className="text-xs text-emerald-100 font-medium">Hamari herbal team aapse rabte ke liye hamesha available hai.</p>
              </div>
              <a
                href="https://wa.me/923042351501?text=Assalam-o-Alaikum!%20Mene%20FAQs%20dekhe%20hain%20aur%20mujhe%20aur%20jankari%20chahiye."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25d366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 cursor-pointer shrink-0"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Doctor Consultation</span>
              </a>
            </div>

          </div>
        </section>

      </main>

      {/* FOOTER SECTION */}
      <footer className="bg-[#1a4d2e] text-white pt-16 pb-8 border-t border-[#2e6e47] relative overflow-hidden">
        
        {/* Aesthetic design details inside footer */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand column */}
            <div className="space-y-4 text-center md:text-left">
              <span className="text-2xl font-black tracking-tight text-white flex items-center justify-center md:justify-start gap-1">
                TUNE-UP<span className="text-[#d4a743]">+</span>
              </span>
              <p className="text-xs text-white/70 leading-relaxed uppercase tracking-widest font-bold">
                Tagline: Herbs of Foods
              </p>
              <p className="text-xs text-white/80 leading-relaxed max-w-sm">
                Steroid-free, PCSIR lab vetted 100% natural herbal pills meticulously balanced for energetic life cycles, immune fortification, bone support and joint flexibility. Safe for parents and kids.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#d4a743]">Quick Pages Links:</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollTo('home')} className="hover:text-[#d4a743] hover:underline transition-all">Home Page (گھر)</button></li>
                <li><button onClick={() => scrollTo('product')} className="hover:text-[#d4a743] hover:underline transition-all">Product Specifications (مصنوعات)</button></li>
                <li><button onClick={() => scrollTo('benefits')} className="hover:text-[#d4a743] hover:underline transition-all">Health Benefits (فوائد)</button></li>
                <li><button onClick={() => scrollTo('testimonials')} className="hover:text-[#d4a743] hover:underline transition-all">Customer Reviews (کامیابی کی داستانیں)</button></li>
                <li><button onClick={() => scrollTo('contact')} className="hover:text-[#d4a743] hover:underline transition-all">Place Secure Order (آرڈر کریں)</button></li>
              </ul>
            </div>

            {/* Compliance Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#d4a743]">Compliance Standards:</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                Tune-Up+ is manufactured matching the highest standards. We test our batches in Pakistan's primary PCSIR Labs to conform with federal safety guidelines. Zero steroids guarantee.
              </p>
              <div className="flex gap-2">
                <span className="bg-white/10 px-2 py-1 rounded text-[9px] font-bold">🛡️ PCSIR Lab Tested</span>
                <span className="bg-white/10 px-2 py-1 rounded text-[9px] font-bold">🧪 Steroid-Free</span>
                <span className="bg-white/10 px-2 py-1 rounded text-[9px] font-bold">🌿 100% Organic</span>
              </div>
            </div>

            {/* Support Center */}
            <div className="space-y-4 text-center md:text-left">
              <h4 className="font-bold text-sm uppercase tracking-widest text-[#d4a743]">Contact Support Centre:</h4>
              <div className="space-y-2 text-xs">
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span>📞</span>
                  <a href="tel:+923042351501" className="hover:text-[#d4a743] font-bold">+92 304 2351501</a>
                </p>
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span>✉️</span>
                  <a href="mailto:tune.up.plus.herbal@gmail.com" className="hover:text-[#d4a743] break-all">tune.up.plus.herbal@gmail.com</a>
                </p>
                <p className="text-[10px] text-white/50">
                  Copyright © {new Date().getFullYear()} TUNE-UP+ Pakistan. All Rights Reserved. Co-operating matching "Herbs of Foods" trademark bounds.
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 text-center text-xs text-white/60">
            Design paired beautifully following minimalist corporate standards. Active security rule compliance maintained seamlessly.
          </div>

        </div>
      </footer>

      {/* FLOAT WHATSAPP ACTIVE ICON (Bottom Right - Mobile & Desktop) */}
      <a 
        href="https://wa.me/923042351501?text=Assalam-o-Alaikum!%20Mujhe%20Tune-Up%2B%20ke%20bare%20mein%20rehnemai%20chahiye."
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 bg-[#25d366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full flex items-center gap-2 shadow-2xl hover:scale-105 transition-transform cursor-pointer border-2 border-white animate-bounce"
        aria-label="WhatsApp Doctor Support"
      >
        <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 fill-white shrink-0" />
        <span className="text-xs sm:text-sm font-black tracking-wide text-white">
          WhatsApp Chat
        </span>
      </a>

      {/* BACK TO TOP FLOATING BUTTON */}
      {backToTopVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-50 bg-[#1a4d2e]/90 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/10 hover:bg-[#d4a743] hover:scale-110 transition-all"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

    </div>
  );
}
