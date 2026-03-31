import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'cn', name: 'Chinese', flag: '🇨🇳' },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGES.find(l => l.code === i18n.language) || LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 glassy rounded-2xl hover:border-red-600 transition-all border border-zinc-200 dark:border-zinc-800"
      >
        <div className="w-8 h-8 rounded-xl bg-red-600/10 flex items-center justify-center border border-red-600/20">
          <Globe className="w-4 h-4 text-red-600" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Language</span>
          <span className="text-xs font-bold uppercase tracking-tighter dark:text-white flex items-center gap-1">
            {currentLanguage.name} <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </span>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-4 w-64 glassy rounded-3xl border-zinc-200 dark:border-zinc-800 shadow-3xl overflow-hidden z-[1001]"
          >
            <div className="p-4 grid grid-cols-1 gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                    i18n.language === lang.code 
                      ? 'bg-red-600 text-white shadow-lg' 
                      : 'hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-600 dark:text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-sm font-bold uppercase tracking-tighter">{lang.name}</span>
                  </div>
                  {i18n.language === lang.code && <Check className="w-4 h-4" />}
                </button>
              ))}
              <div className="mt-4 p-3 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-[10px] font-black uppercase text-zinc-400 tracking-widest text-center">
                  +48 more languages available via AI
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
