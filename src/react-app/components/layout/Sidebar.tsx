import { 
  Home, Compass, Zap, MonitorPlay, 
  PlaySquare, History, Film, Clock, 
  ThumbsUp, Flame, Music2, Clapperboard, 
  Newspaper, Trophy, Radio, Satellite, 
  Cpu, Globe, Shield, MessageSquare, 
  TrendingUp, BarChart2, Star, Layers
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const sidebarItems = {
  main: [
    { name: 'Mission Hub', icon: Home, path: '/' },
    { name: 'Live Signals', icon: Radio, path: '/news' },
    { name: 'Trending Intel', icon: Flame, path: '/feed/trending' },
    { name: 'Global Swarm', icon: Globe, path: '/network' },
  ],
  sectors: [
    { name: 'IT & Startup', icon: Zap, path: '/industry/it' },
    { name: 'Hyper Finance', icon: Newspaper, path: '/industry/finance' },
    { name: 'Sports Pulse', icon: Trophy, path: '/industry/sports' },
    { name: 'Health Node', icon: Flame, path: '/industry/health' },
    { name: 'Entertain Hub', icon: Music2, path: '/industry/entertainment' },
    { name: 'Web3 & Crypto', icon: Layers, path: '/industry/crypto' },
  ],
  intelligence: [
    { name: 'Agent Insights', icon: Cpu, path: '/insights' },
    { name: 'Strategic Feed', icon: Star, path: '/strategic' },
    { name: 'Verified Docs', icon: Shield, path: '/docs' },
  ]
};

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 dark:bg-black/90 z-[60] xl:hidden" 
          onClick={() => {}} 
        />
      )}

      <aside className={`
        fixed xl:sticky top-20 left-0 h-[calc(100vh-80px)] 
        bg-white dark:bg-[#060606] z-[70] xl:z-40 
        transition-all duration-500 ease-in-out border-r border-zinc-100 dark:border-white/5
        ${isOpen ? 'translate-x-0 w-[280px]' : '-translate-x-full xl:translate-x-0 xl:w-[88px]'}
        overflow-y-auto no-scrollbar
      `}>
        <div className={`py-8 flex flex-col ${!isOpen && 'xl:items-center xl:px-0'}`}>
          
          {/* Main Intelligence */}
          <div className="pb-8 space-y-1">
            {sidebarItems.main.map((item) => (
              <SidebarItem key={item.name} item={item} isOpen={isOpen} active={location.pathname === item.path} />
            ))}
          </div>

          <div className="mx-6 h-[1px] bg-zinc-100 dark:bg-white/5 my-4" />

          {/* Global Sectors */}
          <div className="py-4">
            {isOpen && <h3 className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-600 font-tech">Global Sectors</h3>}
            {sidebarItems.sectors.map((item) => (
              <SidebarItem key={item.name} item={item} isOpen={isOpen} active={location.pathname === item.path} />
            ))}
          </div>

          <div className="mx-6 h-[1px] bg-zinc-100 dark:bg-white/5 my-4" />

          {/* Intelligence Access */}
          <div className="py-4">
             {isOpen && <h3 className="px-8 py-4 text-[10px] font-black uppercase tracking-[0.4em] text-red-600 font-tech">Protocols</h3>}
             {sidebarItems.intelligence.map((item) => (
              <SidebarItem key={item.name} item={item} isOpen={isOpen} active={location.pathname === item.path} />
            ))}
          </div>

          {/* Minimal Brand Footer */}
          {isOpen && (
            <div className="px-8 py-12 space-y-8">
               <div className="bg-zinc-50 dark:bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3">
                     <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
                     <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">Live Node</span>
                  </div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-relaxed">
                     Synced with GuideIT Neural Backbone. <br /> Signal Clear.
                  </p>
               </div>
               <div className="space-y-4">
                  <div className="flex flex-wrap gap-x-4 gap-y-2 opacity-50 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                     <Link to="/about">Mission</Link>
                     <Link to="/legal">Legal</Link>
                     <Link to="/ethics">Ethics</Link>
                  </div>
                  <p className="text-[8px] font-black uppercase tracking-[0.4em] text-zinc-600">© 2026 CLOUDMEDIA HUB</p>
               </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

function SidebarItem({ item, isOpen, active }: { item: any, isOpen: boolean, active: boolean }) {
  return (
    <Link
      to={item.path}
      className={`flex items-center px-6 py-4 mx-2 rounded-2xl transition-all group relative ${
        active 
          ? 'bg-zinc-950 dark:bg-white text-white dark:text-black shadow-xl ring-4 ring-black/5 dark:ring-white/5' 
          : 'hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 hover:text-red-600'
      } ${!isOpen && 'xl:flex-col xl:justify-center xl:gap-2 xl:px-0 xl:py-5 xl:w-[72px] xl:mx-auto xl:rounded-3xl'}`}
    >
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="absolute left-0 w-1 h-6 bg-red-600 rounded-full"
        />
      )}
      <item.icon className={`w-5 h-5 shrink-0 ${active && 'animate-pulse'}`} />
      {isOpen ? (
          <span className="ml-6 text-[11px] font-black uppercase tracking-widest truncate">{item.name}</span>
      ) : (
          <span className="text-[8px] font-black uppercase tracking-tighter text-center group-hover:text-red-600 transition-colors">{item.name}</span>
      )}
    </Link>
  );
}
