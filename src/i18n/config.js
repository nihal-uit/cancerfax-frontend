import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { detectUserLocation, getLanguageFromCountry } from '../services/geolocationService';

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: {} },
      es: { translation: {} },
      fr: { translation: {} },
      de: { translation: {} },
      zh: { translation: {} },
      it: { translation: {} },
      pt: { translation: {} },
      ru: { translation: {} },
      ja: { translation: {} },
      ko: { translation: {} },
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferredLanguage',
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Auto-detect language from location (only on first load)
const initializeLanguageFromLocation = async () => {
  const savedLanguage = localStorage.getItem('preferredLanguage');
  if (savedLanguage) {
    // User has already set a preference, use it
    i18n.changeLanguage(savedLanguage);
    return;
  }

  try {
    const locationData = await detectUserLocation();
    if (locationData?.country) {
      const lang = getLanguageFromCountry(locationData.country);
      if (lang && i18n.hasResourceBundle(lang, 'translation')) {
        i18n.changeLanguage(lang);
        localStorage.setItem('preferredLanguage', lang);
        console.log(`🌍 Language auto-detected: ${lang} (from ${locationData.country})`);
      }
    }
  } catch (error) {
    console.warn('Failed to detect location for language:', error);
    // Use browser language as fallback
    const browserLang = navigator.language.split('-')[0];
    if (i18n.hasResourceBundle(browserLang, 'translation')) {
      i18n.changeLanguage(browserLang);
    }
  }
};

// Initialize on first load
initializeLanguageFromLocation();

export default i18n;


