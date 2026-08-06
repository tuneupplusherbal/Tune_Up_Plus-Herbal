import React, { useState } from 'react';
import { Mail, Globe, MessageSquare, ShoppingCart, CheckCircle } from 'lucide-react';

interface OrderContactSectionProps {
  productImage: string;
}

export default function OrderContactSection({ productImage }: OrderContactSectionProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const unitPrice = 6900;
  const totalPrice = quantity * unitPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Meharbani karke Naam, Phone aur Address likhein!');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const message = `Assalam-o-Alaikum! Mene website par Tune-Up+ Order place kiya hai:\n\n👤 Naam: ${name}\n📞 Phone: ${phone}\n📧 Email: ${email || 'N/A'}\n🏠 Address: ${address}\n🔢 Quantity: ${quantity} Pack(s)\n💰 Total Price: Rs. ${totalPrice.toLocaleString()}`;
      const waUrl = `https://wa.me/923042351501?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    }, 400);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with dark transparent overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{ backgroundImage: `url(${productImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#081a0f]/90 via-[#0a2114]/85 to-[#06140c]/95 backdrop-blur-[3px]" />

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        
        {/* Split Layout: 50% Form | 50% Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">

          {/* LEFT SIDE (50%): Order Form */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-[24px] shadow-2xl flex flex-col justify-between text-white hover:border-[#d4a743]/50 transition-all duration-300">
            <div>
              <div className="mb-6 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📞</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                    Order Karein
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  Apni sehat ka pehla qadam rakhein
                </p>
              </div>

              {isSubmitted ? (
                <div className="space-y-6 py-6 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-serif font-black text-white">
                      Aapka Order Confirmed! 🎉
                    </h3>
                    <p className="text-xs text-gray-200 leading-relaxed max-w-sm mx-auto">
                      Shukriya <strong className="text-white">{name}</strong>! Aapka order receive ho chuka hai.
                    </p>
                  </div>

                  <div className="bg-white/10 border border-white/20 p-4 rounded-xl text-left text-xs space-y-2">
                    <p className="text-gray-300"><strong className="text-white">Quantity:</strong> {quantity} Pack(s)</p>
                    <p className="text-gray-300"><strong className="text-white">Total Bill:</strong> <span className="text-[#d4a743] font-black text-sm">Rs. {totalPrice.toLocaleString()}</span></p>
                    <p className="text-gray-300"><strong className="text-white">Address:</strong> {address}</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName('');
                      setPhone('');
                      setEmail('');
                      setAddress('');
                      setQuantity(1);
                    }}
                    className="w-full bg-[#d4a743] hover:bg-[#c29633] text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg"
                  >
                    🔄 Ek Aur Order Place Karein
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* 1. Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Apka naam likhein"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:border-[#d4a743] focus:ring-2 focus:ring-[#d4a743]/50 focus:outline-none rounded-xl px-4 py-3 text-sm transition-all"
                    />
                  </div>

                  {/* 2. Phone */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:border-[#d4a743] focus:ring-2 focus:ring-[#d4a743]/50 focus:outline-none rounded-xl px-4 py-3 text-sm transition-all"
                    />
                  </div>

                  {/* 3. Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:border-[#d4a743] focus:ring-2 focus:ring-[#d4a743]/50 focus:outline-none rounded-xl px-4 py-3 text-sm transition-all"
                    />
                  </div>

                  {/* 4. Address */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">
                      Address *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Ghar ka pata aur shehar"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-white/10 text-white placeholder-gray-300 border border-white/30 focus:border-[#d4a743] focus:ring-2 focus:ring-[#d4a743]/50 focus:outline-none rounded-xl px-4 py-2.5 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* 5. Quantity Dropdown */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-white uppercase tracking-wider">
                      Quantity *
                    </label>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full bg-[#123820] text-white border border-white/30 focus:border-[#d4a743] focus:ring-2 focus:ring-[#d4a743]/50 focus:outline-none rounded-xl px-4 py-3 text-sm font-bold transition-all cursor-pointer"
                    >
                      <option value={1}>1 Pack - Rs. 6,900</option>
                      <option value={2}>2 Packs - Rs. 13,800</option>
                      <option value={3}>3 Packs - Rs. 20,700</option>
                      <option value={4}>4 Packs - Rs. 27,600</option>
                      <option value={5}>5 Packs - Rs. 34,500</option>
                    </select>
                  </div>

                  {/* Auto-calculated Total Price */}
                  <div className="bg-white/15 border border-white/20 p-3.5 rounded-xl flex items-center justify-between mt-2">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">Total Price:</span>
                    <span className="text-xl font-black text-[#d4a743]">
                      Rs. {totalPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#d4a743] hover:bg-[#c29633] active:scale-[0.98] text-white font-black py-4 px-6 rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 text-base mt-4"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{isSubmitting ? 'Processing...' : '🛒 Order Now'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT SIDE (50%): Contact Info */}
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-[24px] shadow-2xl flex flex-col justify-between text-white hover:border-[#25d366]/50 transition-all duration-300">
            <div className="space-y-6">
              
              {/* Heading */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📞</span>
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight">
                    Rabta Karein
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200 font-medium">
                  Hum aapse rabte ke liye hamesha tayyar hain
                </p>
              </div>

              {/* Contact Info Items */}
              <div className="space-y-4 pt-2">
                
                {/* Phone & Helpline */}
                <a 
                  href="tel:+923042351501" 
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-[#d4a743] hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a4d2e] to-[#2e6e47] border border-[#d4a743]/50 text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform shrink-0">
                    <span className="text-xl">📞</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-amber-200/90 uppercase tracking-widest">Helpline & Direct Call</p>
                    <p className="text-base sm:text-lg font-black text-white group-hover:text-[#d4a743] transition-colors">+92 304 2351501</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/923042351501?text=Assalam-o-Alaikum%20Tune-Up%2B%20Team%2C%20mujhe%20Tune-Up%2B%20capsules%20ke%20bare%20me%20rabta%20karna%20hai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-[#25d366] hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25d366] text-white flex items-center justify-center font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform shrink-0">
                    <MessageSquare className="w-6 h-6 fill-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest">WhatsApp Support (24/7)</p>
                    <p className="text-base sm:text-lg font-black text-white group-hover:text-[#25d366] transition-colors">+92 304 2351501</p>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href="mailto:tune.up.plus.herbal@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-[#d4a743] hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4a743] to-[#b38528] text-emerald-950 flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform shrink-0">
                    <Mail className="w-6 h-6 text-emerald-950" />
                  </div>
                  <div className="min-w-0 break-all">
                    <p className="text-[10px] font-black text-amber-200/90 uppercase tracking-widest">Official Email</p>
                    <p className="text-xs sm:text-sm font-black text-white group-hover:text-[#d4a743] transition-colors">tune.up.plus.herbal@gmail.com</p>
                  </div>
                </a>

                {/* Website */}
                <a 
                  href="https://www.tuneupplus.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform shrink-0">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest">Official Website</p>
                    <p className="text-sm font-black text-white group-hover:text-emerald-300 transition-colors">www.tuneupplus.com</p>
                  </div>
                </a>

              </div>

            </div>

            {/* Direct WhatsApp CTA Button & Guarantee Badges */}
            <div className="mt-8 pt-4 border-t border-white/15 space-y-4">
              <a 
                href="https://wa.me/923042351501?text=Assalam-o-Alaikum%20Tune-Up%2B%20Team%2C%20mujhe%20Tune-Up%2B%20capsules%20ke%20bare%20me%20rabta%20karna%20hai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-[#25d366] to-[#1da851] hover:from-[#20ba59] hover:to-[#178f43] active:scale-[0.98] text-white font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-2xl flex items-center justify-center gap-2 text-base border border-emerald-300/40 cursor-pointer animate-cta-shake"
              >
                <MessageSquare className="w-5 h-5 fill-white shrink-0" />
                <span>💬 Chat on WhatsApp (+92 304 2351501)</span>
              </a>

              {/* Trust Features */}
              <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-extrabold text-amber-200/90 pt-1">
                <div className="bg-black/20 p-2 rounded-xl border border-white/10">
                  🚚 Free Delivery
                </div>
                <div className="bg-black/20 p-2 rounded-xl border border-white/10">
                  💵 Cash on Delivery
                </div>
                <div className="bg-black/20 p-2 rounded-xl border border-white/10">
                  🌿 100% Organic
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
