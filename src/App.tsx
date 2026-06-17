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
  ThumbsUp,
  MapPin
} from 'lucide-react';
import { TRUST_BADGES, INGREDIENTS, BENEFITS, TESTIMONIALS, PRODUCT_PACKAGES, FAQS } from './data';
import { Ingredient, Benefit, Testimonial, ProductPackage } from './types';
import productImage from './assets/images/Front View -tuneup.png';
import familyImage from './assets/images/tuneup_family_1781618517187.jpg';

export default function App() {
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

  // Randomize math verification values on mount
  useEffect(() => {
    setNum1(Math.floor(Math.random() * 8) + 2); // 2 to 9
    setNum2(Math.floor(Math.random() * 8) + 2); // 2 to 9
  }, []);

  // Monitor Active Sections & Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      // Back to top visibility
      if (window.scrollY > 400) {
        setBackToTopVisible(true);
      } else {
        setBackToTopVisible(false);
      }

      // Detect active section
      const sections = ['home', 'product', 'benefits', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Smooth scroll helper
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
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
      const totalBillAmount = 6900 * orderQuantity;
      const totalBottlesCount = orderQuantity;
      const totalCapsCount = orderQuantity * 60;
      const pkgDetail = "Tune-Up+ Herbal Capsules (60 Capsules, 1 Month Course)";

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
          _autoresponse: `Assalam-o-Alaikum! Thank you for your order from Tune-Up+. We have received your order details and will contact you shortly for confirmation.\n\n📋 YOUR ORDER SUMMARY (ORDER KI MAALUMAT):\n-------------------------------------\n👤 Customer Name: ${fullName}\n📦 Product Selected: Tune-Up+ Herbal Capsules\n🔢 Quantity ordered: ${orderQuantity} Bottle(s)\n🧴 Total Bottles: ${totalBottlesCount} Bottle(s) (${totalCapsCount} Capsules)\n💰 Total Bill: Rs. ${totalBillAmount.toLocaleString()} (Cash on Delivery + Free Delivery)\n📍 Shipping Address: ${address}, ${city}\n\nOur customer support and health expert team will contact you within just 2 hours to confirm your active order. For any questions or queries, please call or WhatsApp us at +92 312 0805339.\n\nThank you for choosing Tune-Up+ Pakistan!`
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
          <div className="flex flex-col cursor-pointer" onClick={() => scrollTo('home')}>
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#1a4d2e] flex items-center gap-1">
              TUNE-UP<span className="text-[#d4a743]">+</span>
            </span>
            <span className="text-[9px] md:text-[11px] uppercase tracking-widest font-black text-[#d4a743] leading-none text-right">
              HERBS OF FOODS
            </span>
          </div>

          {/* Desktop Navigation Links (all 5 pages) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-4">
            {[
              { id: 'home', label: 'Home Page' },
              { id: 'product', label: 'Product Section' },
              { id: 'benefits', label: 'Herbal Benefits' },
              { id: 'testimonials', label: 'Reviews' },
              { id: 'contact', label: 'Order Now' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
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

          {/* TWO PROMINENT HEADER BUTTONS - As specifically requested */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* BUTTON 1 (Left): Order on WhatsApp */}
            <a
              href="https://wa.me/923120805339"
              target="_blank"
              rel="noreferrer"
              className="bg-[#d4a743] text-white px-4 py-2.5 rounded-lg font-bold text-xs xl:text-sm flex items-center gap-1.5 shadow-md shadow-[#d4a743]/10 hover:bg-[#c29633] transition-all duration-300 transform hover:scale-[1.05]"
            >
              <span>📞</span> Order on WhatsApp
            </a>

            {/* BUTTON 2 (Right): Order Now (Green theme, Pulse load animation, subtle rotate on hover, links to Contact/Order form) */}
            <button
              onClick={() => scrollTo('contact')}
              className="bg-[#1a4d2e] text-white px-5 py-2.5 rounded-lg font-bold text-xs xl:text-sm flex items-center gap-1.5 shadow-md shadow-[#1a4d2e]/10 hover:bg-[#d4a743] hover:text-white transition-all duration-300 transform hover:scale-[1.05] hover:rotate-[1deg] animate-pulse"
              style={{ animationDuration: '2s' }}
            >
              <span>🛒</span> Order Now
            </button>
          </div>

          {/* Mobile Hamburg menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <a
              href="https://wa.me/923120805339"
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
              <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 border-b pb-2">Page Navigation</h3>
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
                href="https://wa.me/923120805339"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#d4a743] text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>📞 Order on WhatsApp</span>
              </a>
              <button
                onClick={() => scrollTo('contact')}
                className="w-full bg-[#1a4d2e] text-white py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
              >
                <span>🛒 Order Now online</span>
              </button>
              <p className="text-center text-[10px] text-gray-500">
                Any questions? Call us on <span className="text-[#1a4d2e] font-extrabold">+92 312 0805339</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* -------------------- MAIN PAGES WRAPPER -------------------- */}
      <main className="flex-grow">

        {/* ==================== 1. HOME PAGE ==================== */}
        <section id="home" className="relative pt-6 pb-20 md:py-24 bg-gradient-to-tr from-[#fafdfb] via-[#e8f5e9]/20 to-[#f5e6b8]/15 overflow-hidden">
          
          {/* Elegant Botanical Deco Blobs */}
          <div className="absolute top-10 left-[-10%] w-[35%] h-[350px] bg-[#1a4d2e]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-10 right-[-10%] w-[35%] h-[350px] bg-[#d4a743]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Texts Column */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                {/* Brand Banner Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#e8f5e9] border border-[#1a4d2e]/20 text-[#1a4d2e] font-bold text-xs">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#d4a743] animate-ping" />
                  <span className="uppercase tracking-wide">Premium Herbal Formulation of Pakistan</span>
                </div>

                {/* Main Heading paired beautifully in English & Roman Urdu */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-[#1a4d2e] leading-[1.1] tracking-tight">
                  Herbal Sehat aur Tawanai ka <span className="text-[#d4a743] italic font-normal">Asli Bharosa!</span>
                </h1>

                {/* Subtitle in Roman Urdu explaining USP and targeted families */}
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Aapki aur aapki family ki tawanai, joron ke dard ka aaram, aur her khandaan ki immunity ke liye <strong className="text-[#1a4d2e]">TUNE-UP+ capsules</strong>. 100% steroid-free aur PCSIR Lab Tested qudrati ghiza jo jism ko andar se chust banti hai.
                </p>

                {/* Specific roman urdu tagline list with dynamic ticks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-semibold text-gray-700 max-w-lg mx-auto lg:mx-0 pt-2">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#d4a743] flex-shrink-0" />
                    <span>Joron ke dard mein fori araam</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#d4a743] flex-shrink-0" />
                    <span>Sust aur kamzoor jism me tawanai</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#d4a743] flex-shrink-0" />
                    <span>Hazma aur pishab ke masail ka hal</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#d4a743] flex-shrink-0" />
                    <span>Khandaan ke tamam logon ke liye</span>
                  </div>
                </div>

                {/* Primary CTA and phone taglines */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <button
                    onClick={() => scrollTo('contact')}
                    className="w-full sm:w-auto bg-[#1a4d2e] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#1a4d2e]/20 hover:bg-[#d4a743] transition-all duration-300 flex items-center justify-center gap-2 group transform hover:-translate-y-1"
                  >
                    <span>Abhi Order Karein</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                  </button>
                  <a
                    href="https://wa.me/923120805339"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto bg-white border-2 border-[#1a4d2e] text-[#1a4d2e] px-8 py-4 rounded-xl font-bold text-base hover:bg-[#e8f5e9] transition-all duration-300 flex items-center justify-center gap-2 transform hover:-translate-y-1"
                  >
                    <span>📞 Order on Whatsapp</span>
                  </a>
                </div>

                {/* Trust Badge Bar showing phone right under CTAs */}
                <p className="text-xs text-gray-500">
                  Questions? Consult with our Herbal Doctor: <a href="tel:+923120805339" className="text-[#1a4d2e] font-extrabold underline hover:text-[#d4a743]">+92 312 0805339</a>
                </p>

              </div>

              {/* Spectacular 3D Product Mockup Placement Column */}
              <div className="lg:col-span-5 relative flex justify-center">
                
                {/* Golden Circle background aura */}
                <div className="absolute top-[10%] left-[10%] w-[80%] h-[80%] bg-gradient-to-tr from-[#d4a743]/20 to-transparent rounded-full blur-2xl" />

                {/* Interactive Product Frame */}
                <div className="relative bg-white rounded-[32px] p-4 shadow-2xl border border-[#e8f5e9]/80 transition-all duration-500 hover:scale-[1.03] hover:shadow-[#1a4d2e]/10 hover:shadow-3xl max-w-sm sm:max-w-md w-full">
                  
                  {/* Floating Absolute Premium badge */}
                  <div className="absolute -top-3 -right-3 bg-[#d4a743] text-white font-black text-sm px-4 py-2 rounded-full uppercase tracking-widest shadow-lg rotate-12">
                    100% Qudrati!
                  </div>

                  <div className="overflow-hidden rounded-[24px] aspect-square bg-[#fafdfb] flex items-center justify-center">
                    <img 
                      src={productImage} 
                      alt="Tune-Up+ Herbs of Foods Premium Organic Supplement Bottle representing authentic natural wellness"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Safe fallback just in case
                        e.currentTarget.src = "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop";
                      }}
                    />
                  </div>

                  {/* Trust Badge highlights over Image */}
                  <div className="mt-4 pt-4 border-t border-[#e8f5e9] px-2 flex justify-between items-center text-xs text-gray-500 font-bold">
                    <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-[#d4a743]" /> 100% Organics</span>
                    <span className="flex items-center gap-1"><Award className="w-4 h-4 text-[#d4a743]" /> PCSIR Tested</span>
                    <span className="flex items-center gap-1"><Leaf className="w-4 h-4 text-[#d4a743]" /> Safe Natural Formula</span>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ==================== TRUST BADGES SECTION ==================== */}
        <section className="bg-gradient-to-b from-white to-[#e8f5e9]/30 py-8 border-y border-[#e8f5e9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs uppercase tracking-widest font-black text-[#d4a743] mb-6">Hamare Teen Bare Sehat Ke Waade (Trust Guarantees)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TRUST_BADGES.map((badge, idx) => (
                <div key={badge.id} className="bg-white p-6 rounded-2xl border border-[#e8f5e9] hover:border-[#1a4d2e]/30 shadow-sm transition-all duration-300 flex gap-4">
                  <div className="bg-[#e8f5e9] w-12 h-12 rounded-xl flex items-center justify-center text-[#1a4d2e] shrink-0 font-extrabold text-xl shadow-inner">
                    {idx === 0 ? '🚫' : idx === 1 ? '🧪' : '🌿'}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#1a4d2e] flex items-center gap-1">
                      {badge.title} 
                      <span className="text-[10px] bg-[#d4a743] text-white px-1.5 py-0.5 rounded ml-1 font-normal">{badge.urduTitle}</span>
                    </h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 2. PRODUCT DETAILS SECTION ==================== */}
        <section id="product" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest font-black text-[#d4a743] bg-[#f5e6b8] px-3 py-1 rounded-full">Kamil Ghiza, Kamil Ilaj</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1a4d2e]">Tune-Up+ Herbal Capsules Ki Haqeeqat</h2>
              <p className="text-gray-600 font-semibold">Hum koi jhuuti dawa nahi bachtey! Hamari product jism ke har uzv (organ) me asli-shifa or khubiyan faraham karti hai.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Product specifications list (Left Column) */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#e8f5e9]/40 p-6 rounded-3xl border border-[#e8f5e9] space-y-4">
                  <h3 className="font-serif font-extrabold text-[#1a4d2e] text-2xl border-b pb-3 border-[#1a4d2e]/10">Tune-up+ Specifications:</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Tension & Physical Stress:</span>
                      <span className="text-[#1a4d2e] font-extrabold">Instant Relief Adaptogens</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Heavy Anabolic Steroids:</span>
                      <span className="text-red-600 font-black">0% (Completely Clean)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Standard Package Volume:</span>
                      <span className="text-[#1a4d2e] font-extrabold">60 Organic Capsules (1 month course)</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1 border-b border-gray-100">
                      <span className="text-gray-500 font-semibold">Laboratory Validation:</span>
                      <span className="text-[#d4a743] font-black">PCSIR Tested Approved</span>
                    </div>
                    <div className="flex justify-between items-center text-sm py-1">
                      <span className="text-gray-500 font-semibold">Price Rating:</span>
                      <span className="text-green-700 font-extrabold">Affordable for Every Pakistani Families</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Callout for Pakistani audience */}
                <div className="border-l-4 border-[#d4a743] bg-[#f5e6b8]/10 p-5 rounded-r-2xl space-y-2">
                  <p className="font-extrabold text-sm text-[#1a4d2e] uppercase tracking-wider flex items-center gap-2">
                    <Info className="w-5 h-5 text-[#d4a743]" />
                    <span>Aap ke ilaqe me hamari COD sahulat mojud hai!</span>
                  </p>
                  <p className="text-xs text-gray-700">
                    Karachi, Lahore, Faisalabad, pindi ya door daraz ke dehaat, hum cash on delivery bhejain gey. Jab parcel mile tabhi paisey ada karein.
                  </p>
                </div>

                {/* Standard dosage instruction capsule layout */}
                <div className="bg-gradient-to-tr from-[#1a4d2e] to-[#164328] text-white p-6 rounded-3xl relative overflow-hidden">
                  <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
                    <Clock className="w-32 h-32" />
                  </div>
                  <h4 className="font-extrabold text-white text-base">💊 Istemal Karne Ka Tarika (Usages):</h4>
                  <p className="text-xs text-white/80 mt-2 leading-relaxed">
                    Rozana *ek capsule* subah-nashtey se pehly or raat ko Sone(Sleeping) se pehly, neem garam doodh ya paani ke sath lijiye. Joron ki takleef aur be-had thakawat me 2 capsules lene me koi burai nahi.
                  </p>
                </div>

              </div>

              {/* Spectacular Ingredients Showcase (Right Column) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-2xl font-serif font-black text-[#1a4d2e]">Qudrati Jari Bootiyon Ki Powers</h3>
                  <p className="text-sm text-gray-600 mt-1">Har capsule me shamil jari-butiyan qudrati taqat ka khazana hain. Details parhnay ke liye click karein:</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {INGREDIENTS.map((ing) => (
                    <div 
                      key={ing.id}
                      onClick={() => setSelectedIngredient(selectedIngredient?.id === ing.id ? null : ing)}
                      className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                        selectedIngredient?.id === ing.id 
                          ? 'bg-[#e8f5e9] border-[#1a4d2e] shadow-md'
                          : 'bg-[#fafdfb] border-gray-100 hover:border-[#1a4d2e]/30 hover:bg-white'
                      }`}
                    >
                      <div className="flex gap-3 items-start">
                        <img 
                          src={ing.image} 
                          alt={ing.name} 
                          className="w-12 h-12 object-cover rounded-xl border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-grow">
                          <h4 className="font-extrabold text-[#1a4d2e] text-sm flex justify-between items-center">
                            <span>{ing.name}</span>
                            <span className="text-[11px] font-normal text-right text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-100">{ing.urduName}</span>
                          </h4>
                          <h5 className="text-[10px] text-gray-400 italic mt-0.5">{ing.scientificName}</h5>
                          <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">{ing.description}</p>
                        </div>
                      </div>

                      {/* Expanded Section inside the card */}
                      {selectedIngredient?.id === ing.id && (
                        <div className="mt-4 pt-3 border-t border-[#1a4d2e]/10 space-y-2 animate-fadeIn text-xs">
                          <p className="font-bold text-[#1a4d2e] uppercase text-[10px] tracking-widest bg-white/60 p-1 rounded">Benefits & Target Actions:</p>
                          <ul className="space-y-1 text-gray-700 font-medium">
                            {ing.benefits.map((b, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="text-[#d4a743] font-bold">✦</span> {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => {
                      scrollTo('contact');
                    }}
                    className="bg-[#d4a743] hover:bg-[#c29633] text-white font-bold py-3 px-8 rounded-xl transition-all shadow-md inline-flex items-center gap-2 text-sm"
                  >
                    <span>Abhi Consultation Lijiye</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

            {/* Generational Clean Family layout banner matching visual brand mockup */}
            <div className="mt-20 bg-gradient-to-r from-[#1a4d2e] to-[#2e6e47] rounded-[32px] overflow-hidden text-white shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center space-y-6">
                  <span className="text-xs uppercase tracking-widest font-black text-[#d4a743] bg-white/10 px-3 py-1 rounded-full w-fit">Pure Khandani Sehat</span>
                  <h3 className="text-3xl md:text-4xl font-serif font-black leading-tight">Maa, Baap aur Bacho Ke Liye Yaksa Mufeed</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">
                    Tune-up+ ek mukammal khandaani nuskha hai jo aapke ghar ke har fard ko samajhta hai. Jawano(16+) ki nashonuma se lekar buzurgon ki tawanaai tak, hamara 100% qudrati formula aapki sehat ka raaz hai. Apni family ki sehat par samjhota na karein.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
                      <Users className="w-4 h-4 text-[#d4a743]" />
                      <span>Teenagers Boost (16+ Years)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
                      <Sparkles className="w-4 h-4 text-[#d4a743]" />
                      <span>Parents Stamina Workouts</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-xs font-semibold">
                      <CheckCircle className="w-4 h-4 text-[#d4a743]" />
                      <span>Elderly Pain Management</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => scrollTo('contact')}
                      className="bg-[#d4a743] hover:bg-white hover:text-[#1a4d2e] px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all"
                    >
                      Abhi Order Karein
                    </button>
                  </div>
                </div>

                <div className="relative min-h-[300px] lg:h-auto overflow-hidden">
                  <img 
                    src={familyImage} 
                    alt="Happy Pakistani generational family smiling in fresh green garden representing herbal health" 
                    className="w-full h-full object-cover lg:absolute inset-0"
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
        <section id="benefits" className="py-20 bg-gradient-to-b from-[#fafdfb] via-[#e8f5e9]/20 to-white border-t border-[#e8f5e9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest font-black text-[#d4a743] bg-[#f5e6b8] px-3 py-1 rounded-full">Har Maslay Ka Shifa-Bakhsh Hal</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1a4d2e]">Faida Tune-Up Plus Ke!</h2>
              <p className="text-gray-600 font-semibold">
                Clinical testings ke mutabiq ye capsules jism ke mukhtalif hisso me behtar tawanai aur dard ki dafah ka sabab banti hain.
              </p>

              {/* Age Group Suitability filter tabs to gamify benefits discovery */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
                <span className="text-xs font-bold text-gray-500 mr-2 uppercase">Suitable for:</span>
                {['All', 'Teenagers', 'Adults', 'Elderly'].map((group) => (
                  <button
                    key={group}
                    onClick={() => setSelectedAgeGroup(group)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
                      selectedAgeGroup === group
                        ? 'bg-[#1a4d2e] text-white border-[#1a4d2e]'
                        : 'bg-white text-gray-600 border-[#e8f5e9] hover:bg-[#e8f5e9]/30'
                    }`}
                  >
                    {group === 'All' ? '👨‍👩‍👧‍👦 Tamam Logan (All)' : group === 'Teenagers' ? '👶 Teenagers Ke Liye' : group === 'Adults' ? '👨‍💼 Jawan Ke Liye' : '👵 Buzurgon Ke Liye'}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid Layout with 6-8 Benefit Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS
                .filter(b => selectedAgeGroup === 'All' || b.suitableFor.includes(selectedAgeGroup))
                .map((benefit) => {
                  return (
                    <div 
                      key={benefit.id} 
                      className="bg-white p-8 rounded-3xl border border-[#e8f5e9] hover:border-[#1a4d2e]/30 shadow-sm transition-all duration-300 transform hover:-translate-y-1 space-y-4 relative overflow-hidden group"
                    >
                      {/* Subtle green overlay on card hover */}
                      <div className="absolute top-0 left-0 w-full h-1.5 bg-[#d4a743] transition-all group-hover:bg-[#1a4d2e]" />
                      
                      {/* Benefit Headers */}
                      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                        <span className="text-xs uppercase tracking-widest font-black text-[#d4a743]">{benefit.suitableFor.join(' / ')}</span>
                        <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[10px] font-extrabold flex items-center gap-1">🔒 Steroid Free</span>
                      </div>

                      {/* Icon & title */}
                      <div className="space-y-2">
                        <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] flex items-center justify-center text-[#1a4d2e] font-extrabold text-2xl shadow-inner">
                          {benefit.id === 'immunity' ? '🛡️' : 
                          benefit.id === 'energy-stamina' ? '⚡' : 
                          benefit.id === 'bone-joint' ? '🦴' : 
                          benefit.id === 'focus-calm' ? '🧠' : 
                          benefit.id === 'weight-swelling' ? '⚖️' : 
                          benefit.id === 'hair-fall' ? '💇‍♀️' : '🌿'}
                        </div>
                        <h3 className="text-xl font-serif font-black text-[#1a4d2e] group-hover:text-[#d4a743] transition-colors">{benefit.title}</h3>
                        <h4 className="text-xs font-semibold text-emerald-800 tracking-wider bg-[#e8f5e9]/50 w-fit px-2 py-1 rounded">{benefit.subtitle}</h4>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-gray-600 leading-relaxed">{benefit.description}</p>

                      {/* Suitability Badges */}
                      <div className="flex items-center gap-1.5 pt-2">
                        <span className="text-[10px] text-gray-400 font-bold">Safe for:</span>
                        {benefit.suitableFor.map((sf, idx) => (
                          <span key={idx} className="bg-gray-100 text-[#333333] text-[9px] px-2 py-0.5 rounded-full font-bold">
                            {sf}
                          </span>
                        ))}
                      </div>

                    </div>
                  );
                })}
            </div>

            {/* Clean bottom Call To Action for Benefits */}
            <div className="mt-16 text-center space-y-4">
              <p className="text-base font-semibold text-[#1a4d2e] italic">"Apni sehat ka pehla qadam aaj hi rakhein, kyuke tandrusti hi asal hazaar naimat hai!"</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => scrollTo('contact')}
                  className="bg-[#1a4d2e] text-white px-8 py-4 rounded-xl font-bold text-base hover:bg-[#d4a743] transition-all transform hover:scale-105 shadow-md flex items-center gap-2"
                >
                  <span>Abhi Discount Hasil Karein</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 4. TESTIMONIALS SECTION ==================== */}
        <section id="testimonials" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest font-black text-[#d4a743] bg-[#f5e6b8] px-3 py-1 rounded-full">Pakistani Khandanon Ki Zubani</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1a4d2e]">Hamare Khush-haal Customers</h2>
              <p className="text-gray-600 font-semibold">Lahore, Karachi, pindi aur KPK se mard o khawateen ke sachy aur be-rehm reviews jo unho ne khud bhejey.</p>
            </div>

            {/* Testimonials Card Layout Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TESTIMONIALS.map((review) => {
                return (
                  <div 
                    key={review.id} 
                    className="bg-[#fafdfb] p-8 rounded-3xl border border-[#e8f5e9] shadow-sm relative flex flex-col justify-between hover:shadow-md transition-all duration-300"
                  >
                    
                    {/* Quotation raw element accent */}
                    <span className="absolute top-6 right-6 text-6xl text-[#e8f5e9] font-serif pointer-events-none select-none">“</span>

                    <div className="space-y-4">
                      
                      {/* Star Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-[#d4a743] fill-[#d4a743]' : 'text-gray-200'}`} 
                          />
                        ))}
                        <span className="text-xs text-gray-400 font-bold ml-2">({review.rating}.0)</span>
                      </div>

                      {/* Review Text */}
                      <p className="text-sm text-gray-700 leading-relaxed font-serif italic text-right dir-rtl">
                        {review.text}
                      </p>

                    </div>

                    {/* Author Footers */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1a4d2e] text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-[#1a4d2e] truncate">{review.name}</h4>
                        <p className="text-xs text-gray-500 truncate">{review.relation} • <span className="text-[#d4a743] font-semibold">{review.city}</span></p>
                      </div>
                      
                      {/* Small Verified Stamp bubble */}
                      <div className="ml-auto bg-green-50 text-green-700 rounded-full px-2 py-0.5 text-[9px] font-black uppercase flex items-center gap-0.5 tracking-wider">
                        <span>✓</span> Verified Order
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Testimonials bottom Conversion Call */}
            <div className="mt-16 bg-[#fafdfb] border-2 border-dashed border-[#1a4d2e]/20 p-8 rounded-[32px] text-center max-w-4xl mx-auto space-y-4">
              <h3 className="text-xl font-serif font-extrabold text-[#1a4d2e]">Aap bhi TUNE-UP+ capsules tajurba karein aur hamare aglay satisfied customer bany!</h3>
              <p className="text-xs text-gray-500">Hamara formula non-habit forming hai, yani aap kisi bhi waqt baghair kisi mushkil ke ise chour sakte hain.</p>
              <div className="pt-2">
                <button
                  onClick={() => scrollTo('contact')}
                  className="bg-[#d4a743] hover:bg-[#c29633] text-white px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all inline-flex items-center gap-2"
                >
                  <span>Abhi order karein aur khud tajurba karein</span>
                  <ArrowRight className="w-4 h-4 animate-bounce" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ==================== 5. CONTACT / ORDER CHECK-OUT PAGE ==================== */}
        <section id="contact" className="py-20 bg-gradient-to-tr from-[#fafdfb] via-[#e8f5e9]/30 to-[#f5e6b8]/10 border-t border-[#e8f5e9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest font-black text-white bg-red-600 px-3 py-1 rounded-full animate-pulse">Limited Stock • Cash on Delivery</span>
              <h2 className="text-3xl md:text-4xl font-serif font-black text-[#1a4d2e]">Order Form &amp; Asli Raabta Page</h2>
              <p className="text-gray-600 font-semibold">
                Neeche dia gaya form pur karain, "WhatsApp Par Submit Karein" dabaain takay aapka order foran lock ho jaye.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Direct Support Information Panel & Badges (Left Column) */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Contact numbers visual card */}
                <div className="bg-white p-8 rounded-3xl border border-[#e8f5e9] shadow-sm space-y-6">
                  <h3 className="text-xl font-serif font-black text-[#1a4d2e] border-b pb-3 border-[#e8f5e9]">Direct Contact details:</h3>
                  
                  <div className="space-y-4">
                    
                    {/* Clickable Phone block */}
                    <a 
                      href="tel:+923120805339" 
                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#e8f5e9]/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] text-[#1a4d2e] group-hover:bg-[#1a4d2e] group-hover:text-white transition-colors flex items-center justify-center text-xl shrink-0">
                        <PhoneCall className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Call or Phone order:</p>
                        <p className="text-lg font-black text-[#1a4d2e] group-hover:text-[#d4a743] transition-colors">+92 312 0805339</p>
                        <span className="text-[10px] text-gray-400">Available Monday to Sunday (9AM - 11PM)</span>
                      </div>
                    </a>

                    {/* Clickable Email block */}
                    <a 
                      href="mailto:tune.up.plus.herbal@gmail.com" 
                      className="flex items-start gap-4 p-3 rounded-xl hover:bg-[#e8f5e9]/30 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-[#e8f5e9] text-[#1a4d2e] group-hover:bg-[#1a4d2e] group-hover:text-white transition-colors flex items-center justify-center text-xl shrink-0">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="break-all">
                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Official Support Email:</p>
                        <p className="text-sm font-black text-[#1a4d2e] group-hover:text-[#d4a743] transition-colors">tune.up.plus.herbal@gmail.com</p>
                        <span className="text-[10px] text-gray-400">Any business queries or compliance reports</span>
                      </div>
                    </a>

                    {/* Highly prominent big responsive WhatsApp Button */}
                    <a 
                      href="https://wa.me/923120805339?text=Assalam-o-Alaikum%20Tune-Up%2B%20Team%2C%20mujhe%20Tune-Up%2B%20capsules%20order%20karne%20hain"
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-4 px-6 rounded-xl font-bold flex flex-col items-center justify-center gap-0.5 shadow-md transition-all text-base transform hover:-translate-y-0.5 animate-pulse"
                    >
                      <span className="flex items-center gap-2 font-black text-sm sm:text-base">
                        <span className="text-2xl">💬</span> Direct WhatsApp Par Order Karein
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-medium opacity-90">Chat par details bhej kar apna order lagwayain</span>
                    </a>

                  </div>
                </div>

                {/* Delivery details trust section (Free Delivery, Private packaging, COD info) */}
                <div className="bg-gradient-to-br from-[#1a4d2e] to-[#255e3b] text-white p-8 rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 bottom-0 opacity-10">
                    <CheckCircle className="w-48 h-48" />
                  </div>

                  <h3 className="text-lg font-serif font-black text-[#d4a743]">📦 Delivery Information &amp; Secrets</h3>
                  
                  <div className="space-y-4 text-xs font-semibold">
                    <div className="flex gap-3">
                      <span className="text-xl">🚚</span>
                      <div>
                        <p className="text-[#d4a743] font-bold">100% Free Shipping</p>
                        <p className="text-white/80">Pure Pakistan (including small, rural and border sectors) has free home deliveries matching full-scale guidelines.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-xl">💵</span>
                      <div>
                        <p className="text-[#d4a743] font-bold">Cash On Delivery (COD)</p>
                        <p className="text-white/80">Only pay when you officially see and hold your parcel. No advance bank transactions necessary.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-xl">🔒</span>
                      <div>
                        <p className="text-[#d4a743] font-bold">Private Packaging (Raazdari Delivery)</p>
                        <p className="text-white/80">Your product is carefully packed in fully plain boxes or opaque mailers with zero product-level descriptions outside.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Placeholder mapping box or address location */}
                <div className="bg-white p-6 rounded-3xl border border-[#e8f5e9] shadow-sm space-y-3">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-[#d4a743]" /> Head Office Location:
                  </p>
                  <p className="text-sm font-bold text-[#1a4d2e]">TUNE-UP+ Herbal Laboratories, Korangi Road, Karachi, Pakistan.</p>
                  <div className="w-full h-24 bg-gray-100 rounded-2xl flex items-center justify-center text-xs text-gray-400 border border-dashed border-gray-300">
                    🗺️ Google Pakistan Live Map Placeholder
                  </div>
                </div>

              </div>

              {/* Dynamic interactive form or Confirmation Receipt (Right Column) */}
              <div className="lg:col-span-7">
                <div className="bg-white p-6 sm:p-10 rounded-[32px] border border-[#e8f5e9] shadow-md relative transition-all duration-500 overflow-hidden">
                  
                  {orderSubmitted ? (
                    /* Beautiful Custom Order Confirmed Receipt Section */
                    <div className="space-y-6 md:space-y-8 py-4 animate-fadeIn">
                      
                      {/* Top Check Block */}
                      <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                          <CheckCircle className="w-10 h-10" />
                        </div>
                        <h3 className="text-2xl font-serif font-black text-[#1a4d2e]">
                          Aapka Order Confirmed! 🎉
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          Thank you for choosing Tune-Up+! Humne aap ke order ki tafseelat mehfooz kar li hain.
                        </p>
                      </div>

                      {/* Fast Contact Guarantee Info Banner */}
                      <div className="bg-[#f5e6b8] border-2 border-[#d4a743] rounded-2xl p-5 flex gap-4 items-start shadow-sm">
                        <span className="text-2xl animate-pulse">⚡</span>
                        <div>
                          <h4 className="font-extrabold text-[#1a4d2e] text-sm flex items-center gap-2">
                            <span>2 Ghante Ka Raabta Guarantee:</span>
                          </h4>
                          <p className="text-xs text-gray-800 leading-relaxed mt-1 font-bold">
                            Hamari expert support team aapse safe confirmation ke liye <span className="text-red-700 bg-red-50 px-1 border border-red-200 rounded">sirf 2 ghante ke andar (within Just 2 hours)</span> isi mobile/WhatsApp number par rabta karegi aur confirmation ke baad package safe dispatch kiya jaye ga.
                          </p>
                        </div>
                      </div>

                      {/* Clean Professional Invoice Details Table */}
                      <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-xs">
                        <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                            Receipt / Bill No: {`TU-${Date.now().toString().slice(-6)}`}
                          </span>
                          <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                            Cash On Delivery
                          </span>
                        </div>
                        <div className="p-4 space-y-4 text-xs">
                          {/* Invoice Rows */}
                          <div className="grid grid-cols-2 gap-y-2.5 pb-3 border-b border-gray-100">
                            <div>
                              <p className="text-gray-400 font-bold">Customer Name:</p>
                              <p className="font-black text-gray-800 text-sm mt-0.5">{fullName}</p>
                            </div>
                            <div>
                              <p className="text-gray-400 font-bold">Mobile / WhatsApp:</p>
                              <p className="font-black text-gray-800 text-sm mt-0.5">{phoneNumber}</p>
                            </div>
                            <div className="col-span-2 pt-1.5">
                              <p className="text-gray-400 font-bold">Email Address:</p>
                              <p className="font-bold text-gray-800 mt-0.5">{email}</p>
                            </div>
                          </div>

                          <div className="space-y-2 pb-3 border-b border-gray-100 bg-gray-50/50 p-2.5 rounded-xl">
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                              <span>Product Selected:</span>
                              <span className="text-[#1a4d2e] font-black">
                                Tune-Up+ Herbal Capsules
                              </span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                              <span>Quantity (Tadaad):</span>
                              <span className="text-gray-800 font-extrabold">{orderQuantity} Bottle{orderQuantity > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                              <span>Dose & volume:</span>
                              <span className="text-gray-500 font-medium">
                                {orderQuantity * 60} Capsules ({orderQuantity} Month Course)
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-1">
                            <div>
                              <p className="font-extrabold text-[#1a4d2e] text-sm">Total Delivery Bill (COD):</p>
                              <p className="text-[10px] text-gray-400">Pure Pakistan mein Delivery aur safe pack mukammal FREE hai.</p>
                            </div>
                            <div className="text-right">
                              <span className="text-xl font-black text-[#1a4d2e] bg-[#e8f5e9] px-3.5 py-1.5 rounded-xl border border-[#1a4d2e]/10">
                                Rs. {(6900 * orderQuantity).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {address && (
                            <div className="pt-2 border-t border-gray-100 text-[11px]">
                              <p className="text-gray-400 font-bold">Shipping Address / Pata:</p>
                              <p className="font-medium text-gray-700 mt-0.5">{address}, {city}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Call-to-action buttons */}
                      <div className="space-y-3">
                        <a
                          href={`https://wa.me/923120805339?text=${encodeURIComponent(
                            `Assalam-o-Alaikum Tune-Up+ Team, Mene abhi website se order place kiya hai.\n\n📋 ORDER DETAILS:\n👤 Naam (Name): ${fullName}\n📞 Phone Number: ${phoneNumber}\n📧 Email: ${email}\n📦 Product Selected: Tune-Up+ Herbal Capsules\n🔢 Quantity (Tadaad): ${orderQuantity} Bottle(s)\n🧴 Total: ${orderQuantity} Bottle(s) (${orderQuantity * 60} Capsules)\n💰 Total Bill: Rs. ${(6900 * orderQuantity).toLocaleString()}\n📍 City: ${city}\n🏠 Address: ${address}\n\nMeharbani farma kar mera order confirm card check karein!`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded-xl font-bold flex flex-col items-center justify-center gap-0.5 shadow-md transition-all text-sm transform hover:scale-[1.01]"
                        >
                          <span className="flex items-center gap-2 font-black text-sm">
                            <span>💬</span> WhatsApp Par Order Confirm Karein
                          </span>
                          <span className="text-[10px] sm:text-[11px] font-medium opacity-90">Ek click mein apni order details WhatsApp par send karein</span>
                        </a>
                        <button
                          onClick={() => {
                            setOrderSubmitted(false);
                            setFullName('');
                            setPhoneNumber('');
                            setEmail('');
                            setCity('');
                            setAddress('');
                            setNotes('');
                            setUserCaptchaAnswer('');
                            // Randomize new captcha
                            setNum1(Math.floor(Math.random() * 8) + 2);
                            setNum2(Math.floor(Math.random() * 8) + 2);
                          }}
                          className="w-full bg-white border border-gray-300 text-gray-600 py-3 px-4 rounded-xl font-bold text-xs hover:bg-gray-50 transition-colors block text-center"
                        >
                          🔄 Ek Aur Order Place Karein (Order Another)
                        </button>
                      </div>

                    </div>
                  ) : (
                    /* Elegant Form Column */
                    <form 
                      onSubmit={handleFormSubmit}
                      className="space-y-6"
                    >
                      {/* Hidden honey pot fields & security checks */}
                      <input type="text" name="_honey" className="hidden" style={{ display: 'none' }} />
                      
                      {/* Header block for form */}
                      <div className="border-b pb-4 border-[#e8f5e9]">
                        <h3 className="text-xl font-serif font-black text-[#1a4d2e] flex items-center gap-2">
                          <span>📝</span> Mehfooz Order Lagwayen
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">Free delivery and private packaging. Cash on delivery standard across regions.</p>
                      </div>

                      {/* 1. Single Product pricing & Details Showcase */}
                      <div className="space-y-3">
                        <label className="block text-sm font-bold text-gray-700">Selected Supplement (Muntakhib Karda Product) *</label>
                        
                        <div className="bg-gradient-to-tr from-[#1a4d2e] to-[#2e6e47] text-white p-6 rounded-2xl shadow-md space-y-4 border border-[#d4a743]/30 relative overflow-hidden">
                          <div className="absolute right-[-10px] top-[-10px] w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="bg-[#d4a743] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                Original Product
                              </span>
                              <h4 className="font-serif font-black text-xl text-white mt-1.5">
                                Tune-Up+ Herbal Capsules
                              </h4>
                              <p className="text-xs text-emerald-100/90 font-medium">
                                60 Capsules, 1 Month Course (1 Bottle)
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-xs text-[#d4a743] font-bold block uppercase tracking-wider">Price</span>
                              <span className="text-2xl font-black text-[#d4a743]">Rs. 6,900</span>
                              <span className="text-[10px] text-emerald-200 block">per bottle</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 2. Quantity selector dropdown (1 to 5 bottleneck) */}
                      <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div>
                            <span className="text-gray-700 font-extrabold text-sm sm:text-xs">Kitni Bottles Chahiyen? (Order Quantity) *</span>
                            <p className="text-gray-400 text-[10px]">Aap jitni bottles chahte hain unki total tadaad select karein.</p>
                          </div>
                          <select
                            name="Quantity"
                            value={orderQuantity}
                            onChange={(e) => setOrderQuantity(parseInt(e.target.value, 10))}
                            required
                            className="bg-white border border-gray-200 text-sm font-extrabold text-[#1a4d2e] rounded-xl px-4 py-2.5 focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-all cursor-pointer min-w-[150px]"
                          >
                            <option value="1">1 Bottle - Rs. 6,900</option>
                            <option value="2">2 Bottles - Rs. 13,800</option>
                            <option value="3">3 Bottles - Rs. 20,700</option>
                            <option value="4">4 Bottles - Rs. 27,600</option>
                            <option value="5">5 Bottles - Rs. 34,500</option>
                          </select>
                        </div>

                        {/* Hidden input fields as requested for formsubmit compliance */}
                        <input type="hidden" name="Quantity" value={orderQuantity} />
                        <input type="hidden" name="Total Price" value={`Rs. ${(6900 * orderQuantity).toLocaleString()}`} />
                        <input type="hidden" name="Total Bottles" value={orderQuantity} />
                        <input type="hidden" name="Total Capsules" value={orderQuantity * 60} />

                        {/* Interactive Realtime Pricing Breakdown */}
                        {(() => {
                          const pricePerBottle = 6900;
                          const totalBottles = orderQuantity;
                          const totalCapsCount = orderQuantity * 60;
                          const totalBillAmount = pricePerBottle * orderQuantity;

                          // Urdu translation for details
                          const urduDetails = `مجموعی طور پر آپ کو ${totalBottles} بوتل${totalBottles > 1 ? 'یں' : ''} (${totalCapsCount} کیپسول) ملیں ${totalBottles > 1 ? 'گی' : 'گا'} جو کہ ${orderQuantity} مہینے کے کورس کے لیے کافی ہے۔`;

                          return (
                            <div className="bg-[#e8f5e9]/20 border border-[#e8f5e9] p-4 sm:p-5 rounded-2xl text-xs space-y-3.5 transform transition-all duration-300">
                              <div className="flex justify-between items-center pb-2 border-b border-emerald-200/40 text-emerald-950">
                                <span className="font-extrabold text-[11px] uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                                  <span>📊</span> AAPKA BIL KI TAFSEELAT (LIVE CALCULATOR)
                                </span>
                                <span className="bg-[#1a4d2e] text-white text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                                  Autocalculated
                                </span>
                              </div>

                              <div className="grid grid-cols-2 gap-y-2.5 font-semibold text-gray-700">
                                <div className="text-gray-500">Selected Product:</div>
                                <div className="text-right text-[#1a4d2e] font-black">Tune-Up+ Herbal Capsules</div>

                                <div className="text-gray-500 font-medium">Order Quantity:</div>
                                <div className="text-right font-black text-gray-800 bg-white/80 px-2.5 py-0.5 rounded border inline-block ml-auto">
                                  {orderQuantity}x Bottle{orderQuantity > 1 ? 's' : ''}
                                </div>

                                <div className="text-gray-500 font-medium">Total Bottles & Capsules:</div>
                                <div className="text-right font-black text-[#1a4d2e] text-sm sm:text-xs">
                                  {totalBottles} Bottle{totalBottles > 1 ? 's' : ''} ({totalCapsCount} Capsules)
                                </div>

                                <div className="text-gray-500 font-medium">Dose Course Duration:</div>
                                <div className="text-right font-black text-emerald-800">
                                  {orderQuantity} Month{orderQuantity > 1 ? 's' : ''} Course ({orderQuantity} Mahine Ka Course)
                                </div>

                                <div className="text-[#193a23] font-extrabold text-sm border-t border-emerald-200/40 pt-2 shrink-0">Total Bill Amount (COD):</div>
                                <div className="text-right text-base font-black text-[#1a4d2e] border-t border-emerald-200/40 pt-2">
                                  Rs. {totalBillAmount.toLocaleString()}
                                </div>
                              </div>

                              {/* Urdu Information banner matching user identity */}
                              <div className="bg-white/90 border border-emerald-100 p-2.5 rounded-xl text-center text-[10px] sm:text-xs text-emerald-950 font-semibold leading-relaxed">
                                {urduDetails}
                              </div>

                              <div className="bg-[#f5e6b8]/10 text-[#1a4d2e] font-extrabold p-2.5 sm:p-3 rounded-xl text-center text-[11px] sm:text-xs border border-[#1a4d2e]/10">
                                📦 MUKAMMAL FREE DELIVERY + CASH ON DELIVERY Standard Across Pakistan!
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                      {/* 2. Customer Personal Details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="fullname" className="block text-xs font-bold text-gray-700">Apka Pura Naam (Full Name) *</label>
                          <input
                            type="text"
                            id="fullname"
                            placeholder="e.g. Aslam Khan"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                            className="w-full bg-[#fafdfb] rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="phonefield" className="block text-xs font-bold text-gray-700">Whatsapp ya Phone Number *</label>
                          <input
                            type="tel"
                            id="phonefield"
                            placeholder="e.g. 03120805339"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="w-full bg-[#fafdfb] rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email Field Added for customer confirmation copy */}
                      <div className="space-y-1.5">
                        <label htmlFor="emailfield" className="block text-xs font-bold text-gray-700">Apka Email Address (Active Email) *</label>
                        <input
                          type="email"
                          id="emailfield"
                          placeholder="e.g. aslam@gmail.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full bg-[#fafdfb] rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-colors"
                        />
                      </div>

                      {/* 3. Customer Address Details */}
                      <div className="space-y-1.5">
                        <label htmlFor="cityfield" className="block text-xs font-bold text-gray-700">Shehar Select Karein (City) *</label>
                        <input
                          type="text"
                          id="cityfield"
                          placeholder="e.g. Lahore / Karachi / Peshawar"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                          className="w-full bg-[#fafdfb] rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="addressfield" className="block text-xs font-bold text-gray-700">Mukammal Delivery Address *</label>
                        <textarea
                          id="addressfield"
                          rows={3}
                          placeholder="House No, Street, Mohalla, Near landmark, Tehsil and District details"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          required
                          className="w-full bg-[#fafdfb] rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-colors resize-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="notesfield" className="block text-xs font-bold text-gray-700">Makhsoos Hadayat (Special Instructions Optional)</label>
                        <textarea
                          id="notesfield"
                          rows={2}
                          placeholder="e.g. Please call before delivery, deliver in plain package, etc."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-[#fafdfb] rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-colors resize-none"
                        />
                      </div>

                      {/* 2-Hour Contact Guarantee Stamp Container */}
                      <div className="bg-[#f5e6b8]/40 border border-[#d4a743]/30 rounded-2xl p-4 flex gap-3 items-start">
                        <span className="text-xl mt-0.5">⚡</span>
                        <div>
                          <h4 className="font-extrabold text-[#1a4d2e] text-xs">⚡ Fast Contact Guarantee:</h4>
                          <p className="text-xs text-gray-700 leading-relaxed mt-0.5">
                            Order submit karte hi hamari team safe confirmation ke liye <strong>sirf 2 ghante ke andar (within Just 2 hours)</strong> aapse rabta karegi aur customer verification ke baad parcel dispatched hoga.
                          </p>
                        </div>
                      </div>

                      {/* Anti-bot Human Verification Challenge */}
                      <div id="security-check-container" className={`p-4 rounded-2xl border-2 transition-all ${captchaError ? 'bg-red-50 border-red-500' : 'bg-[#e8f5e9]/20 border-[#1a4d2e]/10'}`}>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-sm">🔐</span>
                          <h4 className="font-extrabold text-[#1a4d2e] text-xs uppercase tracking-wider">Insani Shanakht / Human Security Verification *</h4>
                        </div>
                        <p className="text-[11px] text-gray-500 mb-3.5 leading-snug">
                          Spam bots se bachne ke liye meharbani karke is aasan hisab ko hal karein:
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 font-mono text-base font-black text-[#1a4d2e] shadow-sm tracking-widest bg-radial">
                            {num1} + {num2} = ?
                          </div>
                          <input
                            type="number"
                            value={userCaptchaAnswer}
                            onChange={(e) => {
                              setUserCaptchaAnswer(e.target.value);
                              setCaptchaError(false);
                            }}
                            placeholder="Jawab likhein..."
                            required
                            className="flex-1 bg-white rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-extrabold text-[#1a4d2e] focus:border-[#1a4d2e] focus:outline-none focus:ring-1 focus:ring-[#1a4d2e] transition-colors"
                          />
                        </div>

                        {captchaError && (
                          <div className="mt-3 text-xs text-red-600 font-bold flex items-center gap-1 p-2 bg-red-100/50 rounded-lg border border-red-200">
                            <span>⚠️</span> Hisab ka jawab ghalt hai! Meharbani karke durust jawab likhein.
                          </div>
                        )}
                      </div>

                      {/* Display Total Price before checkout */}
                      <div className="bg-[#e8f5e9] p-4 rounded-2xl flex justify-between items-center border border-[#1a4d2e]/10">
                        <div className="text-xs">
                          <span className="font-bold text-[#1a4d2e] block">Total Order Value:</span>
                          <span className="text-gray-500">Free Packaging + COD Inclusive across Pakistan</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-[#1a4d2e]">
                            Rs. {(6900 * orderQuantity).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {submissionError && (
                        <div className="text-xs text-red-600 font-extrabold p-3 bg-red-50 border border-red-200 rounded-2xl">
                          ⚠️ {submissionError}
                        </div>
                      )}

                      {/* Submit Order Details button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg transition-all transform hover:scale-[1.01] flex flex-col items-center justify-center gap-0.5 ${
                          isSubmitting 
                            ? 'bg-gray-400 cursor-not-allowed shadow-none' 
                            : 'bg-[#1a4d2e] shadow-[#1a4d2e]/20 hover:bg-[#d4a743]'
                        }`}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2 font-black text-sm">
                            ⌛ Processing... Please Wait...
                          </span>
                        ) : (
                          <>
                            <span className="text-base font-black">🚀 Confirm Order & Submit Details</span>
                            <span className="text-[11px] font-medium opacity-90">Our health support team will contact you within Just 2 hours!</span>
                          </>
                        )}
                      </button>

                      <div className="text-center text-[10px] text-gray-400">
                        🔒 Safe checkout: Submit details safely. We conform strictly to customer trust laws in Pakistan.
                      </div>

                    </form>
                  )}

                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ==================== FAQS SECTION ==================== */}
        <section className="py-20 bg-white border-t border-[#e8f5e9]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs uppercase tracking-widest font-black text-[#d4a743] bg-[#f5e6b8] px-3 py-1 rounded-full">Sawaal aur Jawab</span>
              <h2 className="text-3xl font-serif font-black text-[#1a4d2e]">Aam Tor Par Poochhe Janay Waley Sawaalat</h2>
              <p className="text-sm text-gray-500 font-semibold">TUNE-UP+ Ke Baaray Mein Kuch Zaroori Maloomat Jo Pakistanis Poochte Hain</p>
            </div>

            <div className="space-y-6">
              {FAQS.map((faq, idx) => (
                <div key={idx} className="bg-[#fafdfb] p-6 rounded-3xl border border-[#e8f5e9] space-y-2">
                  <h3 className="font-extrabold text-base text-[#1a4d2e] flex gap-2">
                    <span className="text-[#d4a743]">Q.</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed pl-6">{faq.a}</p>
                </div>
              ))}
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
                <span className="bg-white/10 px-2 py-1 rounded text-[9px] font-bold">🛡️ PCSIR Tested</span>
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
                  <a href="tel:+923120805339" className="hover:text-[#d4a743] font-bold">+92 312 0805339</a>
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

      {/* FLOAT WHATSAPP ACTIVE ICON (Bottom Right) */}
      <a 
        href="https://wa.me/923120805339"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group"
      >
        <span className="text-3xl">💬</span>
        <span className="absolute right-16 bg-white text-[#333333] border border-[#25D366] text-[10px] px-2 py-1 rounded-lg font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Doctor se Rabta Karein!
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
