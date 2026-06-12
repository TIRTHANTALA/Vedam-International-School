import React, { useState, useEffect, useRef } from 'react';
import { FiGlobe } from 'react-icons/fi';

const languages = [
  { code: 'en', label: 'English - EN' },
  { code: 'hi', label: 'हिन्दी - HI' },
  { code: 'gu', label: 'ગુજરાતી - GU' },
  { code: 'mr', label: 'मराठी - MR' },
  { code: 'bn', label: 'বাংলা - BN' },
  { code: 'ta', label: 'தமிழ் - TA' },
  { code: 'te', label: 'తెలుగు - TE' }
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState(languages[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check cookies to see if there's a selected language
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match) {
      const selectedCode = match[2].split('/').pop();
      const lang = languages.find(l => l.code === selectedCode);
      if (lang) setCurrentLang(lang);
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setIsOpen(false);
    
    // Dispatch change event to the hidden Google Translate combo box
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = lang.code;
      select.dispatchEvent(new Event('change'));
    } else {
      // Fallback: set cookie and reload
      document.cookie = `googtrans=/en/${lang.code}; path=/`;
      document.cookie = `googtrans=/en/${lang.code}; domain=.${window.location.hostname}; path=/`;
      window.location.reload();
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-full hover:bg-gray-900 transition-colors shadow-sm text-sm font-medium"
      >
        <FiGlobe className="text-lg" />
        <span className="hidden lg:inline">{currentLang.label.split(' ')[0]}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden py-2">
          <div className="px-4 py-2 text-xs font-semibold text-gray-400 border-b border-gray-50 mb-1 uppercase tracking-wider">
            Change Language
          </div>
          {languages.map((lang) => (
            <label 
              key={lang.code} 
              className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer hover:bg-blue-50 transition-colors ${currentLang.code === lang.code ? 'bg-blue-50 text-primary' : 'text-gray-700'}`}
              onClick={() => handleLanguageChange(lang)}
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${currentLang.code === lang.code ? 'border-primary' : 'border-gray-300'}`}>
                {currentLang.code === lang.code && <div className="w-2 h-2 rounded-full bg-primary"></div>}
              </div>
              <span className="text-sm font-medium">{lang.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
