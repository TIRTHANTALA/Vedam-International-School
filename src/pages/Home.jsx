import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlayCircle, FaRocket, FaEye, FaHeart, FaCheck, FaLaptopCode, FaFlask, FaBasketballBall, FaBookReader, FaUserGraduate, FaUsers, FaCalendarAlt, FaFileInvoiceDollar, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaClock } from 'react-icons/fa';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

const Home = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const [settings, setSettings] = useState({
    homeImageUrl: '',
    campusVideoUrl: '',
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
    <div className="overflow-hidden">
      {/* Notice Ticker */}
      <div className="bg-red-600 text-white text-sm py-2 relative z-30 overflow-hidden flex items-center group cursor-pointer">
        <div className="animate-ticker whitespace-nowrap flex-shrink-0 group-hover:[animation-play-state:paused]">
          <span className="font-semibold mr-2">🔔 IMPORTANT NOTICE:</span> 
          Admissions for the Academic Year 2026-27 are now open! Limited seats available.
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-10 pb-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-blue-50 z-0"></div>
        <div className="absolute top-0 right-0 w-2/3 h-full bg-primary rounded-l-[150px] opacity-10 z-0 hidden lg:block translate-x-10"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            <motion.div 
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-secondary bg-opacity-20 text-secondary font-semibold text-sm mb-6 border border-secondary border-opacity-30">
                Nurturing Future Leaders
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-dark mb-6 leading-tight">
                Empowering Minds, <br /> <span className="text-primary">Shaping Futures.</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Holistic education meeting modern innovation. Fostering curiosity, character, and continuous growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/about" className="px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-blue-800 transition-all text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Learn More <FaArrowRight />
                </Link>
                <a href="#tour" className="px-8 py-3 bg-white text-primary border border-primary font-semibold rounded-full hover:bg-blue-50 transition-all text-center flex items-center justify-center gap-2 shadow-sm transform hover:-translate-y-1">
                  <FaPlayCircle className="text-secondary text-xl" /> Campus Tour
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl glass-effect border-4 border-white bg-gray-100 flex items-center justify-center">
                {settings.homeImageUrl ? (
                  <img src={settings.homeImageUrl} alt="Students at Vedam" className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700" />
                ) : (
                  <span className="text-gray-400">Image will appear here</span>
                )}
              </div>
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary rounded-full opacity-20 blur-2xl z-[-1]"></div>
              <div className="absolute -bottom-10 left-10 w-40 h-40 bg-primary rounded-full opacity-20 blur-2xl z-[-1]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">About Vedam</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">Preparing students for the challenges of tomorrow.</p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Mission */}
            <motion.div variants={fadeInUp} className="bg-light p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-blue-100 text-primary rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FaRocket />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-dark">Our Mission</h3>
              <p className="text-gray-600">Igniting a passion for learning and cultivating global citizens through inclusive education.</p>
            </motion.div>
            
            {/* Vision */}
            <motion.div variants={fadeInUp} className="bg-light p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-amber-100 text-secondary rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                <FaEye />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-dark">Our Vision</h3>
              <p className="text-gray-600">Inspiring excellence and empowering students to lead in a dynamic world.</p>
            </motion.div>
            
            {/* Values */}
            <motion.div variants={fadeInUp} className="bg-light p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <FaHeart />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-dark">Core Values</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Integrity & Respect</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Innovation in Learning</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Empathy & Inclusion</li>
                <li className="flex items-center gap-2"><FaCheck className="text-green-500" /> Excellence in Action</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Virtual Campus Tour */}
      <section id="tour" className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              className="w-full lg:w-1/3"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Virtual Campus Tour</h2>
              <div className="w-16 h-1 bg-secondary mb-6 rounded-full"></div>
              <p className="text-gray-300 mb-8">Experience our modern classrooms, sports fields, and advanced labs from the comfort of your home.</p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3"><FaLaptopCode className="text-secondary text-xl" /> Smart Classrooms</li>
                <li className="flex items-center gap-3"><FaFlask className="text-secondary text-xl" /> Advanced Science Labs</li>
                <li className="flex items-center gap-3"><FaBasketballBall className="text-secondary text-xl" /> Premium Sports Complex</li>
                <li className="flex items-center gap-3"><FaBookReader className="text-secondary text-xl" /> Digital Library</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-2/3"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-700 group bg-gray-900 flex items-center justify-center">
                {settings.campusVideoUrl ? (
                  <video 
                    className="absolute top-0 left-0 w-full h-full object-cover" 
                    src={settings.campusVideoUrl} 
                    autoPlay 
                    muted 
                    loop 
                    controls
                  />
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-800">
                    <FaPlayCircle className="text-4xl mb-2 opacity-50" />
                    <span>No video uploaded yet</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-primary/20 pointer-events-none group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>



      {/* Contact Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
            <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">Reach out to us via phone, email, or visit our campus.</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="bg-white p-5 rounded-xl shadow border-t-4 border-primary text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 bg-blue-50 text-primary rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-lg font-bold font-heading mb-1">Visit Campus</h3>
              <p className="text-gray-600 mb-2 text-sm whitespace-pre-line">{settings.address}</p>
              <a href="#map" className="text-primary text-sm font-semibold hover:underline">Get Directions</a>
            </motion.div>

            <motion.div 
              className="bg-white p-5 rounded-xl shadow border-t-4 border-secondary text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-amber-50 text-secondary rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                <FaPhoneAlt />
              </div>
              <h3 className="text-lg font-bold font-heading mb-1">Call Us</h3>
              <p className="text-gray-600 mb-2 text-sm">Reception: {settings.contactPhone}</p>
              <a href={`tel:${settings.contactPhone}`} className="text-secondary text-sm font-semibold hover:underline">Call Now</a>
            </motion.div>

            <motion.div 
              className="bg-white p-5 rounded-xl shadow border-t-4 border-green-500 text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-xl mx-auto mb-3">
                <FaEnvelope />
              </div>
              <h3 className="text-lg font-bold font-heading mb-1">Email Us</h3>
              <p className="text-gray-600 mb-2 text-sm">{settings.contactEmail}</p>
              <a href={`mailto:${settings.contactEmail}`} className="text-green-500 text-sm font-semibold hover:underline">Send Email</a>
            </motion.div>
          </div>

          <motion.div 
            className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 flex flex-col lg:flex-row min-h-[400px] lg:min-h-[450px]"
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
            </div>
            
            <div className="w-full lg:w-2/3 h-[300px] lg:h-auto min-h-[300px]" id="map">
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
      </section>

      {/* Quick CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Ready to shape your child's future?</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto text-lg">Join the Vedam family and build a foundation for success.</p>
            <Link to="/admissions" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
              Apply for Admission Now <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
