import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const Contact = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const [settings, setSettings] = useState({
    contactEmail: 'info@vedaminternational.edu',
    contactPhone: '+91 97140 29854',
    address: '123 Education Boulevard,\nTech City, State 12345',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x0%3A0x0!2zMDCsMDAnMDAuMCJOIDAwwrAwMCcwMC4wIlE!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus'
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
    <div className="pt-10 pb-20 bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-50 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <motion.div 
            className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          ></motion.div>
          <motion.p 
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            We are here to answer your questions. Reach out to us via phone, email, or visit our campus.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Details Cards */}
          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-primary text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Visit Campus</h3>
            <p className="text-gray-600 mb-4 whitespace-pre-line">{settings.address}</p>
            <a href="#map" className="text-primary font-semibold hover:underline">Get Directions</a>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-secondary text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-amber-50 text-secondary rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              <FaPhoneAlt />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Reception: {settings.contactPhone}</p>
            <a href={`tel:${settings.contactPhone}`} className="text-secondary font-semibold hover:underline">Call Now</a>
          </motion.div>

          <motion.div 
            className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-green-500 text-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
              <FaEnvelope />
            </div>
            <h3 className="text-xl font-bold font-heading mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">{settings.contactEmail}</p>
            <a href={`mailto:${settings.contactEmail}`} className="text-green-500 font-semibold hover:underline">Send Email</a>
          </motion.div>
        </div>

        {/* Office Hours & Map */}
        <motion.div 
          className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="w-full lg:w-1/3 bg-dark text-white p-10 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/3"></div>
            <h3 className="text-2xl font-bold font-heading mb-6 flex items-center gap-3">
              <FaClock className="text-secondary" /> Office Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-300">Mon - Fri:</span>
                <span className="font-semibold">8:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-gray-700 pb-2">
                <span className="text-gray-300">Saturday:</span>
                <span className="font-semibold">9:00 AM - 1:00 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span className="text-gray-300">Sunday & Holidays:</span>
                <span className="font-semibold text-red-400">Closed</span>
              </li>
            </ul>
            <div className="mt-8 p-4 bg-gray-800 rounded-lg border-l-4 border-secondary">
              <p className="text-sm text-gray-300">For admissions inquiries outside of office hours, please fill out the form on our <a href="/admissions" className="text-secondary hover:underline font-semibold">Admissions page</a>.</p>
            </div>
          </div>
          
          <div className="w-full lg:w-2/3 h-[400px] lg:h-auto" id="map">
            {/* Google Map Embed Placeholder */}
            <iframe 
              src="https://www.google.com/maps?q=Vedam+International+School,+Karadva-Eklera+Rd,+Surat,+Gujarat&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              title="School Location Map"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
