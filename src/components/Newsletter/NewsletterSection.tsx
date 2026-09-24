import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, Mail } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#0F1416] text-white border-t border-white/10 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C5A880]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
        
        {/* Top Tag */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#C5A880] text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Exclusive Haven House Club</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Join Our Newsletter For Secret Rates
        </h2>

        <p className="text-sm text-slate-400 max-w-xl mx-auto font-light leading-relaxed">
          Sign up to receive private seasonal promotions, Barry coastal travel guides, and exclusive 15% discount codes for your future reservations.
        </p>

        {/* Subscription Form */}
        <div className="max-w-xl mx-auto">
          {isSubscribed ? (
            <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-4 flex items-center justify-center gap-3 text-emerald-300 animate-fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold">
                Thank you! You're subscribed. Use promo code <strong>HAVEN10</strong> for 10% off your direct booking.
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-full pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:border-transparent transition-all"
                />
              </div>

              <button
                type="submit"
                className="gold-btn px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-slate-500 mt-3 font-light">
            We value your privacy. Unsubscribe at any time with one click.
          </p>
        </div>

      </div>
    </section>
  );
};
