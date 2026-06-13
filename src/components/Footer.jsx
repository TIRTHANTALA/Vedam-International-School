import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaAngleRight, FaHeart } from 'react-icons/fa';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [settings, setSettings] = useState({
    schoolName: 'Vedam International School',
    contactEmail: 'info@vedaminternational.edu',
    contactPhone: '+91 97140 29854',
    address: '123 Education Boulevard,\nTech City, State 12345',
    facebookUrl: '#',
    instagramUrl: '#',
    twitterUrl: '#',
    youtubeUrl: '#',
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

  return (
    <footer className="bg-dark text-white pt-12 pb-8 border-t-4 border-secondary mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="lg:col-span-1 flex flex-row lg:flex-col gap-5 items-start">
            <div className="bg-white p-2 lg:p-3 rounded-xl shadow-sm shrink-0">
              <img 
                src={settings.logoUrl || "https://res.cloudinary.com/ducxsgryc/image/upload/v1780933683/logo_pgqryv.png"} 
                alt={`${settings.schoolName} Logo`} 
                className="h-16 lg:h-20 w-auto object-contain"
              />
            </div>
            <div>
              <p className="text-gray-400 text-xs lg:text-sm mb-3 lg:mb-5 leading-relaxed">
                Dedicated to shaping character and careers since 2005. Nurturing globally minded, confident, and compassionate leaders.
              </p>
              <div className="flex flex-wrap gap-2 lg:gap-4">
                {settings.facebookUrl && <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all text-sm"><FaFacebookF /></a>}
                {settings.twitterUrl && <a href={settings.twitterUrl} target="_blank" rel="noreferrer" className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all text-sm"><FaTwitter /></a>}
                {settings.instagramUrl && <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gradient-to-tr hover:from-yellow-400 hover:to-purple-600 hover:text-white transition-all text-sm"><FaInstagram /></a>}
                {settings.youtubeUrl && <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all text-sm"><FaYoutube /></a>}
              </div>
            </div>
          </div>

          {/* Mobile 2-column wrapper for Links & Resources */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold font-heading mb-6 border-b border-gray-700 pb-2 inline-block">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/about" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs" /> About Us</Link></li>
                <li><Link to="/academics" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs" /> Academics</Link></li>
                <li><Link to="/facilities" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs" /> Facilities</Link></li>
                <li><Link to="/events" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs" /> Events</Link></li>
                <li><Link to="/admissions" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs" /> Admissions</Link></li>
                <li><Link to="/gallery" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs" /> Campus Life</Link></li>
              </ul>
            </div>

            {/* Legal/Resources */}
            <div>
              <h3 className="text-lg font-bold font-heading mb-6 border-b border-gray-700 pb-2 inline-block">Resources</h3>
              <ul className="space-y-3">
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs shrink-0" /> Privacy Policy</Link></li>
                <li><Link to="/terms-of-service" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs shrink-0" /> Terms of Service</Link></li>
                <li><Link to="/mandatory-disclosures" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs shrink-0" /> Disclosures</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-secondary transition-colors text-sm flex items-center gap-2"><FaAngleRight className="text-xs shrink-0" /> FAQ</Link></li>
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold font-heading mb-6 border-b border-gray-700 pb-2 inline-block">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <FaMapMarkerAlt className="mt-1 text-secondary shrink-0" />
                <span className="whitespace-pre-line">{settings.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaPhoneAlt className="text-secondary shrink-0" />
                <a href={`tel:${settings.contactPhone}`} className="hover:text-white transition-colors">{settings.contactPhone}</a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <FaEnvelope className="text-secondary shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-white transition-colors break-all">{settings.contactEmail}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex justify-center items-center">
          <p className="text-gray-500 text-sm text-center">
            &copy; {currentYear} {settings.schoolName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
