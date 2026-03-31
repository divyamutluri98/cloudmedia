import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, Bell, User, Globe, Moon, Sun, Radio, Satellite, Zap, ShieldCheck } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState(true); // Default to dark for world-class feel
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className={`sticky top-0 z-50 h-20 flex items-center justify-between px-8 transition-all duration-500 ${
      scrolled 
      ? "bg-white/80 dark:bg-black/80 backdrop-blur-3xl border-b border-zinc-200 dark:border-white/5 h-16" 
      : "bg-white dark:bg-[#060606] border-b border-transparent"
    }`}>
      
      {/* Brand & Menu */}
      <div className="flex items-center gap-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/5 p-3 group"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 stroke-[2] group-hover:rotate-90 transition-transform" />
        </Button>
        <Link to="/" className="flex items-center gap-2 group transition-all">
          <img src="/favicon.png" className="w-8 h-8 rounded-lg shadow-lg group-hover:scale-110 transition-transform" alt="CMN" />
          <span className="text-xl font-black uppercase tracking-tighter dark:text-white group-hover:text-red-600 transition-colors">
            Cloud Media<span className="text-red-600 ml-0.5 font-black tracking-tighter">News</span>
          </span>
        </Link>
      </div>

      {/* High-Fidelity Navigation Links (BBC/CNN Style) */}
      <div className="hidden lg:flex items-center gap-10 px-12 border-l border-zinc-100 dark:border-white/5 ml-8 h-full">
         <Link to="/news" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors">Dispatch</Link>
         <Link to="/industry/it" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors">Network</Link>
         <Link to="/advertise" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors">strategic</Link>
         <Link to="/about" className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-red-600 transition-colors">Mission</Link>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-6 justify-end flex-1 max-w-xl">
        <div className="hidden md:flex flex-1 items-center bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/10 rounded-2xl h-12 px-6 focus-within:ring-2 ring-red-600 transition-all">
          <Search className="w-4 h-4 text-zinc-400 mr-4" />
          <input
            type="text"
            placeholder="SIGNAL_SEARCH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${searchQuery}`)}
            className="bg-transparent outline-none text-xs font-black uppercase tracking-widest flex-1 dark:text-white placeholder:text-zinc-600"
          />
          <div className="flex items-center gap-2 pl-4 border-l border-white/10 shrink-0">
             <span className="text-[9px] font-black text-zinc-600">ALT+K</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />

          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/5 relative"
            onClick={toggleDarkMode}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-zinc-100 dark:hover:bg-white/5 relative hidden sm:flex">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
          </Button>

          <Link to="/login">
            <Button className="bg-zinc-950 dark:bg-white text-white dark:text-black hover:bg-red-600 hover:text-white px-8 h-12 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95">
               Uplink
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
