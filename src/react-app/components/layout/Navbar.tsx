import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, Bell, User, Mic, Moon, Sun, Globe } from "lucide-react";
import { Button } from "@/react-app/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { t, i18n } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'te', name: 'Telugu', flag: '🇮🇳' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="glassy-dense sticky top-0 z-50 h-20 flex items-center justify-between px-8 shadow-2xl border-b border-white/10"
    >
      {/* Left section: Menu & Logo */}
      <div className="flex items-center gap-6 min-w-[200px]">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 p-2"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
        </Button>
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-all shadow-xl shadow-red-500/20">
             <img
               src="https://019cf758-a10c-7c16-b496-a0ca72c24170.mochausercontent.com/logo.PNG"
               alt="logo"
               className="h-6 w-auto invert"
             />
          </div>
          <span className="text-2xl font-black tracking-tighter hidden sm:inline-block dark:text-white uppercase">
            CLOUD<span className="text-red-600">MEDIA</span><span className="text-[12px] align-top ml-0.5 font-black uppercase text-zinc-400">NEWS</span>
          </span>
        </Link>
      </div>

      {/* Center section: Intelligence Search */}
      <div className="flex-1 max-w-[600px] mx-8 hidden md:flex items-center gap-4">
        <div className="flex flex-1 items-center bg-zinc-100 dark:bg-zinc-900 border border-transparent dark:border-white/5 rounded-2xl px-5 py-3 focus-within:ring-2 ring-red-600 transition-all shadow-inner">
          <Search className="w-4 h-4 text-zinc-500 mr-3" />
          <input
            type="text"
            placeholder={t('search') || 'Scan Intelligence Feed...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/search?q=${searchQuery}`)}
            className="w-full bg-transparent outline-none text-sm font-bold dark:text-white placeholder-zinc-500 tracking-tight"
          />
        </div>
        <Button variant="ghost" size="icon" className="rounded-2xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 shadow-sm border dark:border-white/5">
          <Mic className="w-4 h-4 text-zinc-500" />
        </Button>
      </div>

      {/* Right section: System Actions */}
      <div className="flex items-center gap-3 min-w-[200px] justify-end">
        {/* Language Switcher */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`rounded-2xl transition-all ${isLangMenuOpen ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          >
            <Globe className="w-5 h-5 text-red-600" />
          </Button>
          
          <AnimatePresence>
            {isLangMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="absolute right-0 mt-4 w-48 bg-white dark:bg-zinc-950 border border-zinc-200/50 dark:border-white/10 rounded-3xl shadow-3xl overflow-hidden p-2 z-[60]"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full px-4 py-3 rounded-2xl text-left text-xs font-black uppercase tracking-widest flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors ${i18n.language === lang.code ? 'text-red-600 bg-red-50 dark:bg-red-950/20' : 'text-zinc-600 dark:text-zinc-400'}`}
                  >
                    {lang.name}
                    <span className="text-lg">{lang.flag}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 relative hidden sm:flex">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full animate-ping"></span>
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
        </Button>

        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800"
          onClick={toggleDarkMode}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-indigo-500" />}
        </Button>

        <Link to="/login">
            <Button variant="ghost" size="icon" className="rounded-2xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-red-600 hover:text-white transition-all shadow-xl">
            <User className="w-5 h-5" />
            </Button>
        </Link>
      </div>
    </motion.nav>
  );
}
