import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          "welcome": "Welcome to CloudMedia",
          "breaking": "Breaking News",
          "categories": "Categories",
          "politics": "Politics",
          "technology": "Technology",
          "business": "Business",
          "sports": "Sports",
          "entertainment": "Entertainment",
          "developed_by": "Design developed by"
        }
      },
      te: {
        translation: {
          "welcome": "క్లౌడ్ మీడియాకు స్వాగతం",
          "breaking": "తాజా వార్తలు",
          "categories": "వర్గాలు",
          "politics": "రాజకీయాలు",
          "technology": "సాంకేతికత",
          "business": "వ్యాపారం",
          "sports": "క్రీడలు",
          "entertainment": "వినోదం",
          "developed_by": "డిజైన్ అభివృద్ధి చేసినవారు"
        }
      },
      hi: {
        translation: {
          "welcome": "क्लाउड मीडिया में आपका स्वागत है",
          "breaking": "ब्रेकिंग न्यूज़",
          "categories": "श्रेणियाँ",
          "politics": "राजनीति",
          "technology": "तकनीक",
          "business": "व्यापार",
          "sports": "खेल",
          "entertainment": "मनोरंजन",
          "developed_by": "डिजाइन विकसित किया गया है"
        }
      }
    }
  });

export default i18n;
