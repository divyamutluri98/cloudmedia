import { useTranslation } from 'react-i18next';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు', flag: '🇮🇳' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
  { code: 'fi', name: 'Suomi', flag: '🇫🇮' },
  { code: 'no', name: 'Norsk', flag: '🇳🇴' },
  { code: 'da', name: 'Dansk', flag: '🇩🇰' },
  { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'hu', name: 'Magyar', flag: '🇭🇺' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
  { code: 'ms', name: 'Bahasa Melayu', flag: '🇲🇾' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  { code: 'he', name: 'עברית', flag: '🇮🇱' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
  { code: 'bn', name: 'বাংলা', flag: '🇧🇩' },
  { code: 'ur', name: 'اردو', flag: '🇵🇰' },
  { code: 'mr', name: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'fil', name: 'Filipino', flag: '🇵🇭' },
  { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
  { code: 'sk', name: 'Slovenčina', flag: '🇸🇰' },
  { code: 'hr', name: 'Hrvatski', flag: '🇭🇷' },
  { code: 'sr', name: 'Српски', flag: '🇷🇸' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
  { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
  { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  { code: 'is', name: 'Íslenska', flag: '🇮🇸' },
  { code: 'ga', name: 'Gaeilge', flag: '🇮🇪' },
  { code: 'mt', name: 'Malti', flag: '🇲🇹' },
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
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
