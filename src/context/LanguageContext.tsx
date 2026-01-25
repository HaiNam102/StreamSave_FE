import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../constants/translations';

type Language = 'en' | 'vn';
type Translations = typeof translations.en;

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguageState] = useState<Language>('vn'); // Default to VN

    useEffect(() => {
        // Load from local storage on mount
        const savedLang = localStorage.getItem('app_language') as Language;
        if (savedLang && (savedLang === 'en' || savedLang === 'vn')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        localStorage.setItem('app_language', lang);
        setLanguageState(lang);
    };

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
