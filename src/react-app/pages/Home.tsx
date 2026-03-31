import { Layout } from "@/react-app/components/layout/Layout";
import { NewsGrid } from "@/react-app/components/home/NewsGrid";
import { HeroSlider } from "@/react-app/components/home/HeroSlider";
import { StudioLocations } from "@/react-app/components/home/StudioLocations";
import { motion } from "framer-motion";
import { Radio, Satellite, Zap } from "lucide-react";

export default function Home() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full bg-white dark:bg-[#060606] min-h-screen"
      >
        {/* Global Network Ticker: World Best News Standard */}
        <div className="bg-red-600 text-white py-3 px-8 flex items-center gap-6 overflow-hidden relative z-50 shadow-2xl">
           <div className="flex items-center gap-2 shrink-0">
              <Radio className="w-4 h-4 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] font-tech text-red-50">Global Intelligence Dispatch</span>
           </div>
           <div className="flex-1 overflow-hidden">
              <div className="animate-marquee whitespace-nowrap flex gap-12 items-center text-[11px] font-black uppercase tracking-widest text-white/90">
                 <span>[SIGNAL_01]: Neural network expansion in Hyderabad IT Hub complete...</span>
                 <span className="text-red-300">●</span>
                 <span>[SIGNAL_02]: Global markets shift toward agentic automation...</span>
                 <span className="text-red-300">●</span>
                 <span>[SIGNAL_03]: New deep-sea fiber protocols active in Atlantic nodes...</span>
                 <span className="text-red-300">●</span>
                 <span>[SIGNAL_04]: Entertainment industry adopts sentient hologram streaming...</span>
              </div>
           </div>
           <div className="shrink-0 flex items-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
              <span className="text-[9px] font-black uppercase tracking-widest text-red-50 opacity-50">SYNCED_00:00:23</span>
           </div>
        </div>

        {/* Hero Showcase */}
        <section className="mb-20">
           <HeroSlider />
        </section>

        {/* Main Intelligence Grid */}
        <NewsGrid />

        {/* Global Studio Infrastructure Section (High-Fidelity) */}
        <section className="py-24 border-t border-zinc-100 dark:border-white/5 bg-zinc-50 dark:bg-zinc-950/20">
            <div className="max-w-[1600px] mx-auto px-8">
               <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 px-4">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-red-600 font-tech font-black text-[10px] uppercase tracking-[0.4em]">
                        <Satellite className="w-5 h-5" /> Transmission Infrastructure
                     </div>
                     <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] tracking-tighter uppercase dark:text-white max-w-[15ch]">
                        A Global <br /> <span className="text-red-600">Syncronised</span> <br /> Network.
                     </h2>
                  </div>
                  <div className="max-w-md space-y-6">
                     <p className="text-zinc-500 text-lg font-medium leading-relaxed uppercase tracking-tight">
                        We don't just report news. Our agentic swarms monitor global frequencies to deliver truth at the speed of thought across 56 languages.
                     </p>
                     <div className="p-8 bg-white dark:bg-white/5 rounded-[2.5rem] border border-zinc-100 dark:border-white/5 shadow-2xl flex items-center gap-6 group hover:translate-y-[-5px] transition-all">
                        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:rotate-12 transition-transform">
                           <Zap className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Signal Density</p>
                           <p className="text-2xl font-black text-zinc-900 dark:text-white font-display uppercase tracking-widest">99.9% Pulse</p>
                        </div>
                     </div>
                  </div>
               </div>
               <StudioLocations />
            </div>
        </section>
      </motion.div>
    </Layout>
  );
}
