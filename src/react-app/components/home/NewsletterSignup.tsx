import { useState } from 'react';
import { Mail, CheckCircle, X, Shield, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email, subscribed_at: new Date().toISOString() }]);

      if (error) throw error;

      setSuccess(true);
      setEmail('');
      
      setTimeout(() => setSuccess(false), 8000);
    } catch (err: any) {
      setError(err.message || 'Failed to subscribe. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-zinc-950 dark:bg-black rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-15px_rgba(0,0,0,0.5)] border-4 border-white/5"
      >
        {/* Futuristic Background Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:bg-red-600/20 transition-all"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>
        
        <div className="container mx-auto px-10 md:px-20 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left side - Content */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                   <div className="w-12 h-0.5 bg-red-600"></div>
                   <span className="text-xs font-black uppercase tracking-[0.4em] text-red-600">Premium Intel</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
                  The News <br /> 
                  <span className="text-zinc-500">Wait is Over.</span>
                </h2>
                <p className="text-zinc-400 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
                  Leverage our proprietary AI analysis delivered straight to your secure communication channel every morning. 
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 shadow-lg"><Shield className="w-5 h-5 text-red-500" /></div>
                  <div>
                    <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">Zero Spam</h4>
                    <p className="text-zinc-500 text-xs font-bold leading-relaxed">No bloat. Only critical news signals and market alerts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shrink-0 shadow-lg"><Zap className="w-5 h-5 text-red-500" /></div>
                  <div>
                    <h4 className="text-white font-black text-sm uppercase tracking-widest mb-1">Real-Time</h4>
                    <p className="text-zinc-500 text-xs font-bold leading-relaxed">Breaking news delivered within 60 seconds of verification.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="lg:col-span-5">
              <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-3xl p-10 md:p-12 rounded-[3.5rem] border border-white/10 shadow-2xl">
                <div className="space-y-3 mb-8">
                   <h3 className="text-2xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                      <TrendingUp className="w-6 h-6 text-red-600" /> Join 10M+
                   </h3>
                   <p className="text-zinc-500 text-xs font-black uppercase tracking-widest">Readers globally trust Cloud Media.</p>
                </div>

                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-600 group-focus-within:text-red-500 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER SECURE EMAIL"
                    className="w-full pl-16 pr-6 py-5 bg-white/10 border-2 border-transparent focus:border-red-600/50 rounded-[2rem] outline-none text-white text-xs font-black placeholder:text-zinc-700 placeholder:tracking-widest transition-all shadow-inner"
                    disabled={loading || success}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading || success}
                  className={`w-full py-6 px-10 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] transition-all transform active:scale-95 shadow-2xl ${
                    success
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-white text-zinc-950 hover:bg-red-600 hover:text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Transmitting...' : success ? '✓ Secured!' : 'Subscribe Now'}
                </button>

                <AnimatePresence>
                   {error && (
                     <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-600/5 p-4 rounded-2xl border border-red-600/20"
                     >
                       <X className="w-4 h-4 shrink-0" />
                       <span>{error}</span>
                     </motion.div>
                   )}

                   {success && (
                     <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 text-green-500 text-[10px] font-black uppercase tracking-widest bg-green-600/5 p-4 rounded-2xl border border-green-600/20"
                     >
                       <CheckCircle className="w-4 h-4 shrink-0" />
                       <span>Verification Email Transmitted. Check your inbox.</span>
                     </motion.div>
                   )}
                </AnimatePresence>

                <p className="text-center text-[9px] font-black uppercase tracking-[0.25em] text-zinc-700 leading-relaxed pt-4">
                   Encrypted by Cloud AI. <br /> Unsubscribe anytime with one tap.
                </p>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
