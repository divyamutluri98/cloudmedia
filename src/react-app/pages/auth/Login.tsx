import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from '@/react-app/components/layout/Layout';
import { useAuthStore } from '../../stores/authStore';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Rocket, ShieldCheck, ChevronRight, Fingerprint, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/react-app/components/ui/card';
import { Button } from '@/react-app/components/ui/button';
import { Badge } from '@/react-app/components/ui/badge';
import { Input } from '@/react-app/components/ui/input';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuthStore();
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegistering) {
        // Fallback for registration
        await new Promise(r => setTimeout(r, 1000));
        navigate('/account');
      } else {
        await login(formData.email, formData.password);
        const from = (location.state as any)?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      setError(err.message || 'Authentication sequence failed. Check satellite link.');
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Magic UI Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10"></div>
        
        {/* Floating Binary background effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none text-[8px] font-mono leading-none break-all dark:text-white">
            {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="whitespace-nowrap">
                    {Math.random() > 0.5 ? "10110100101111000101010101101010101010101010" : "00101101010101101011010101011010101010101010"}
                </div>
            ))}
        </div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
           className="w-full max-w-2xl relative z-10"
        >
          <Card className="bg-white/40 dark:bg-black/40 backdrop-blur-3xl border-4 border-white/5 dark:border-white/5 rounded-[3.5rem] shadow-3xl overflow-hidden shadow-red-600/5">
             <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left Side: Branding/Visual */}
                <div className="bg-zinc-950 p-10 text-white flex flex-col justify-between relative overflow-hidden hidden md:flex">
                   <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-600/20 via-transparent to-transparent"></div>
                   <div className="relative z-10 space-y-6">
                      <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center transform rotate-12 shadow-2xl shadow-red-600/20">
                         <Rocket className="w-6 h-6" />
                      </div>
                      <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">
                         Synchronize <br /> <span className="text-red-500">Global Pulse</span>
                      </h2>
                      <p className="text-zinc-600 text-xs font-black uppercase tracking-widest leading-loose">
                         Access the most high-fidelity intelligence network in the unified hemisphere.
                      </p>
                   </div>
                   
                   <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase text-zinc-500 tracking-widest">
                         <ShieldCheck className="w-4 h-4 text-green-500" />
                         Satellite Encryption: v4.2
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                         <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="h-full bg-red-600"
                         />
                      </div>
                   </div>
                </div>

                {/* Right Side: Form */}
                <div className="p-10 md:p-14">
                  <header className="mb-10 space-y-3">
                    <Badge variant="secondary" className="bg-red-500/10 text-red-600 border-none px-3 py-1 rounded-lg text-[8px] font-black tracking-widest">
                       AUTHENTICATION
                    </Badge>
                    <CardTitle className="text-3xl font-black uppercase tracking-tighter dark:text-white">
                       {isRegistering ? 'Create Signal' : 'Secure Entry'}
                    </CardTitle>
                    <CardDescription className="text-zinc-500 font-bold text-xs uppercase tracking-tight">
                       {isRegistering ? 'Initialize your global identity' : 'Access your intelligence dashboard'}
                    </CardDescription>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    <AnimatePresence>
                      {error && (
                        <motion.div 
                           initial={{ opacity: 0, height: 0 }}
                           animate={{ opacity: 1, height: 'auto' }}
                           exit={{ opacity: 0, height: 0 }}
                           className="flex items-center gap-3 text-red-600 bg-red-500/10 p-4 rounded-2xl border border-red-500/20"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0 animate-pulse" />
                          <span className="text-[10px] font-bold uppercase tracking-tight">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-5">
                      {isRegistering && (
                        <div className="group space-y-2">
                           <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-red-500 transition-colors">Digital Identity</label>
                           <div className="relative">
                              <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                              <Input
                                type="text"
                                placeholder="FULL NAME"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="pl-12 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-2xl h-12 text-xs font-bold focus-visible:ring-2 ring-red-600 transition-all uppercase placeholder:text-zinc-600"
                              />
                           </div>
                        </div>
                      )}

                      <div className="group space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-red-500 transition-colors">Signal Uplink</label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="COMM_LINK@CLOUD.INC"
                            required
                            className="pl-12 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-2xl h-12 text-xs font-bold focus-visible:ring-2 ring-red-600 transition-all uppercase placeholder:text-zinc-600"
                          />
                        </div>
                      </div>

                      <div className="group space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 group-focus-within:text-red-500 transition-colors">Access Key</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-red-600 transition-colors" />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                            required
                            className="pl-12 pr-12 bg-zinc-100/50 dark:bg-zinc-900/50 border-none rounded-2xl h-12 text-xs font-bold focus-visible:ring-2 ring-red-600 transition-all uppercase placeholder:text-zinc-600"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative w-4 h-4 rounded-md border-2 border-zinc-200 dark:border-zinc-800 flex items-center justify-center group-hover:border-red-600 transition-colors overflow-hidden">
                           <input type="checkbox" className="absolute inset-0 opacity-0 cursor-pointer" />
                           <div className="w-2 h-2 bg-red-600 rounded-sm scale-0 transition-transform"></div>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Auto-Sync</span>
                      </label>
                      <button type="button" className="text-[10px] font-black uppercase tracking-widest text-red-600 hover:tracking-[0.2em] transition-all">Forgot Origin?</button>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 bg-red-600 hover:bg-zinc-950 dark:hover:bg-white dark:hover:text-black text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl shadow-red-500/20 active:scale-95 flex items-center justify-center gap-3 group/btn"
                    >
                      {isLoading ? 'Processing Signal...' : (isRegistering ? 'Finalize Protocol' : 'Verify Identity')}
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </form>

                  <div className="relative my-8 px-2 flex items-center gap-4">
                     <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-white/5"></div>
                     <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.3em] whitespace-nowrap">Satellite SSO</span>
                     <div className="flex-1 h-[1px] bg-zinc-200 dark:bg-white/5"></div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      type="button"
                      onClick={() => useAuthStore.getState().signInWithGoogle()}
                      className="flex-1 flex items-center justify-center gap-4 px-6 py-4 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 transition-all active:scale-95 group shadow-sm border border-transparent hover:border-zinc-200 dark:hover:border-white/5"
                    >
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400 group-hover:text-black dark:group-hover:text-white transition-colors">Google Uplink</span>
                    </button>
                    
                    <button 
                      type="button"
                      className="p-4 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-2xl hover:bg-white dark:hover:bg-zinc-800 transition-all active:scale-95 group shadow-sm border border-transparent hover:border-zinc-200 dark:hover:border-white/5"
                    >
                      <Zap className="w-4 h-4 text-zinc-400 group-hover:text-amber-500 transition-colors" />
                    </button>
                  </div>

                  <p className="mt-8 text-center text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    {isRegistering ? 'Existing Operator?' : 'New Operator?'} {' '}
                    <button 
                       onClick={() => setIsRegistering(!isRegistering)}
                       className="text-red-600 hover:tracking-[0.2em] transition-all ml-2"
                    >
                      {isRegistering ? 'Return to Base' : 'Initialize Command'}
                    </button>
                  </p>
                </div>
             </div>
          </Card>
          
          <footer className="mt-12 text-center opacity-30">
             <p className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-500">Cloud Media Intelligence Network v4.9.0 - SSL SECURED</p>
          </footer>
        </motion.div>
      </div>
    </Layout>
  );
}
