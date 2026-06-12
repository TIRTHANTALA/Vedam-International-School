import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight, FiChevronDown } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import LanguageSelector from './LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const [settings, setSettings] = useState({
    schoolName: 'Vedam International School',
    logoUrl: 'https://res.cloudinary.com/ducxsgryc/image/upload/v1780933683/logo_pgqryv.png'
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(prev => ({ ...prev, ...docSnap.data() }));
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
    });
    
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { 
      name: 'Academics', 
      path: '/academics',
      dropdown: [
        { name: 'Curriculum', path: '/academics' },
        { name: 'Facilities', path: '/facilities' },
        { name: 'Our Faculty', path: '/faculty' }
      ]
    },
    { 
      name: 'Campus Life', 
      path: '#',
      dropdown: [
        { name: 'Photo Gallery', path: '/gallery' },
        { name: 'Events', path: '/events' }
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-white shadow-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group relative z-50">
            <img 
              src={settings.logoUrl || "https://res.cloudinary.com/ducxsgryc/image/upload/v1780933683/logo_pgqryv.png"} 
              alt={`${settings.schoolName} Logo`} 
              className={`h-24 md:h-32 w-auto transition-transform duration-300 group-hover:scale-105 object-contain ${
                isScrolled ? '-my-4 md:-my-6' : '-my-6 md:-my-12'
              }`}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-medium">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link 
                  to={link.path} 
                  className={`nav-link flex items-center gap-1 transition-colors hover:text-primary py-2 ${
                    location.pathname === link.path ? 'text-primary font-bold' : 'text-gray-700'
                  }`}
                >
                  {link.name} {link.dropdown && <FiChevronDown className="mt-0.5 transition-transform duration-300 group-hover:rotate-180" />}
                </Link>
                {link.dropdown && (
                  <div className="absolute left-0 top-full mt-1 w-48 bg-white border border-gray-100 shadow-xl rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-left -translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="py-2">
                      {link.dropdown.map((subLink) => (
                        <Link 
                          key={subLink.name} 
                          to={subLink.path} 
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary hover:font-medium transition-colors"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4 ml-2">
              <LanguageSelector />
              <Link 
                to="/admissions" 
                className="px-6 py-2.5 bg-primary text-white rounded-full hover:bg-blue-800 hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center gap-2"
              >
                Enroll Now <FiArrowRight />
              </Link>
            </div>
          </nav>

          {/* Mobile Menu Actions */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            <LanguageSelector />
            <button 
              className="text-gray-700 text-2xl focus:outline-none" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Nav Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full shadow-lg overflow-hidden"
          >
            <div className="flex flex-col py-4 px-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col border-b border-gray-100 pb-2">
                  <div className="flex justify-between items-center">
                    <Link 
                      to={link.path} 
                      className={`text-lg font-medium mobile-link ${
                        location.pathname === link.path ? 'text-primary' : 'text-gray-700 hover:text-primary'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </div>
                  {link.dropdown && (
                    <div className="flex flex-col pl-4 mt-2 space-y-3 border-l-2 border-blue-100">
                      {link.dropdown.map((subLink) => (
                        <Link 
                          key={subLink.name} 
                          to={subLink.path} 
                          className="text-gray-600 hover:text-primary text-base"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link 
                to="/admissions" 
                className="text-primary font-bold text-lg pt-2 flex items-center gap-2"
              >
                Enroll Now <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
