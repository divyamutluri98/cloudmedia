import { useEffect, useState } from 'react';
import { Radio, Eye, MessageCircle, Share2, TrendingUp, Zap, RadioTower, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

const LIVE_FEEDS = [
  {
    id: 'l1',
    title: 'HYDERABAD TECH SUMMIT: GOV AND NVDIA SIGN AI PROTOCOL',
    location: 'Hyderabad, India',
    viewers: 12400,
    thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1000',
    type: 'EVENT'
  },
  {
    id: 'l2',
    title: 'SPACEX STARSHIP FLIGHT 7: PRE-LAUNCH PREP UNDERWAY',
    location: 'Starbase, Texas',
    viewers: 450000,
    thumbnail: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=1000',
    type: 'BREAKING'
  },
  {
    id: 'l3',
    title: 'GLOBAL AI SOVEREIGNTY SUMMIT: 50 NATIONS REACH AGREEMENT',
    location: 'Geneva, Switzerland',
    viewers: 89000,
    thumbnail: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1000',
    type: 'CONFERENCE'
  }
];

export function LiveReel() {
  const [activeFeed, setActiveFeed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeed((prev) => (prev + 1) % LIVE_FEEDS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="px-4 md:px-10 py-16 space-y-10 relative overflow-hidden">
      {/* Magic Particles */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-600/10 blur-[1px]"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter flex items-center gap-3 font-display">
            <RadioTower className="w-8 h-8 text-red-600 animate-pulse" />
            Live Intelligence
            </h2>
            <p className="text-xs font-black text-zinc-500 uppercase tracking-[0.4em] ml-1">
               Synchronized Global Satellite Feeds <span className="text-red-500 mx-2">●</span> Active Uplink
            </p>
        </div>
        
        <div className="flex items-center gap-6 bg-zinc-100 dark:bg-zinc-900 px-6 py-4 rounded-[2rem] border dark:border-white/5 shadow-inner">
           <div className="flex -space-x-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800">
                    <img src={`https://i.pravatar.cc/150?u=${i+10}`} className="w-full h-full rounded-full" />
                </div>
              ))}
           </div>
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
              <span className="text-red-600 font-black animate-pulse mr-2 font-tech text-base tracking-wider">940K</span> Watching Now
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Active Feed */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={LIVE_FEEDS[activeFeed].id}
              initial={{ opacity: 0, x: -20, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 1.02 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[400px] md:h-[650px] rounded-[3.5rem] overflow-hidden border-4 border-white/5 shadow-3xl group"
            >
              <img 
                src={LIVE_FEEDS[activeFeed].thumbnail} 
                className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent"></div>
              
              <div className="absolute top-10 left-10 flex flex-col gap-3">
                <Badge className="bg-red-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                   <Wifi className="w-3.5 h-3.5 mr-2 animate-bounce" /> LIVE STREAM
                </Badge>
                <div className="glassy border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white font-tech">
                   {LIVE_FEEDS[activeFeed].type}
                </div>
              </div>

              <div className="absolute bottom-10 left-10 right-10 space-y-6">
                <div className="bg-white/10 backdrop-blur-2xl px-6 py-3 rounded-full inline-flex items-center gap-3 border border-white/5">
                   <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-blink"></div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-white">{LIVE_FEEDS[activeFeed].location}</span>
                </div>
                <h3 className="text-3xl md:text-6xl font-black text-white leading-none uppercase tracking-tighter max-w-4xl font-display">
                  {LIVE_FEEDS[activeFeed].title}
                </h3>
                
                <div className="flex items-center gap-10 pt-4">
                   <div className="flex items-center gap-2 text-red-500 font-black text-xs uppercase font-tech">
                      <Eye className="w-5 h-5 animate-pulse" />
                      {LIVE_FEEDS[activeFeed].viewers.toLocaleString()} VIEWS
                   </div>
                   <div className="flex items-center gap-3 text-zinc-400 font-black text-[10px] uppercase tracking-widest font-tech">
                      <Zap className="w-4 h-4" /> LATENCY: 22ms
                   </div>
                </div>
              </div>
              
              {/* Magic Beam Element Overlay if possible or just more gradients */}
              <div className="absolute top-0 right-0 h-full w-[200px] bg-gradient-to-l from-white/5 to-transparent skew-x-12 transform group-hover:translate-x-full transition-transform duration-[2s]"></div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Sidebar Feeds */}
        <div className="space-y-6">
          {LIVE_FEEDS.map((feed, idx) => (
            <Card 
                key={feed.id}
                onClick={() => setActiveFeed(idx)}
                className={`relative overflow-hidden cursor-pointer rounded-[2rem] transition-all duration-500 hover:scale-105 ${activeFeed === idx ? 'border-2 border-red-600 shadow-2xl shadow-red-600/20' : 'border dark:border-white/5 hover:border-red-600/30'}`}
            >
               <CardContent className="p-0">
                  <div className="relative aspect-video">
                     <img src={feed.thumbnail} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                     <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                        <div className="flex items-center gap-2 text-[8px] font-black text-white uppercase tracking-widest font-tech">
                           <div className={`w-1.5 h-1.5 rounded-full ${activeFeed === idx ? 'bg-red-600 animate-pulse' : 'bg-zinc-500'}`}></div>
                           {feed.type}
                        </div>
                        <h4 className="text-xs font-black text-white uppercase line-clamp-1 mt-1 font-display">{feed.title}</h4>
                     </div>
                  </div>
               </CardContent>
            </Card>
          ))}
          
          <div className="p-6 bg-red-600 rounded-[2rem] text-white space-y-4 shadow-3xl shadow-red-600/20 animate-pulse">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest">Upcoming Signal</span>
                <Wifi className="w-4 h-4" />
             </div>
             <h4 className="text-sm font-black uppercase leading-[1.2] font-display">FED INTEREST RATE ANNOUNCEMENT: GLOBAL MARKET REACTION</h4>
             <span className="bg-black/20 px-3 py-1 rounded-lg text-[9px] font-black inline-block font-tech">14:00 GMT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
