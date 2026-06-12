import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaWhatsapp, FaPaperPlane } from 'react-icons/fa';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp, doc, onSnapshot } from 'firebase/firestore';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

const Admissions = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    grade: 'Pre-Primary',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [settings, setSettings] = useState({
    contactEmail: 'admissions@vedaminternational.edu',
    contactPhone: '+91 97140 29854',
    address: '123 Education Boulevard, Tech City, ST 12345'
  });

  React.useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setSettings(prev => ({ ...prev, ...docSnap.data() }));
      }
    }, (error) => {
      console.error("Error fetching settings:", error);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add to Firestore
      try {
        await addDoc(collection(db, 'admissions'), {
          ...formData,
          status: 'New',
          createdAt: serverTimestamp()
        });
      } catch (fsError) {
        console.error("Firestore Error:", fsError);
        throw new Error("Database error: " + fsError.message);
      }

      // Send Email using EmailJS
      const templateParams = {
        user_name: formData.parentName, // For Subject and From Name
        from_name: formData.parentName, // For Parent's Name
        phone_number: formData.phone,
        reply_to: formData.email,       // For Email Address and Reply To
        grade: formData.grade,
        message: formData.message
      };

      // Get credentials from environment variables
      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (SERVICE_ID && SERVICE_ID !== "your_service_id_here" && TEMPLATE_ID && PUBLIC_KEY) {
        try {
          await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
            publicKey: PUBLIC_KEY,
          });
        } catch (emailError) {
          console.error("EmailJS Error:", emailError);
          throw new Error("EmailJS error: " + (emailError.text || emailError.message || "Unknown error"));
        }
      } else {
        console.log("EmailJS credentials not found in .env. Form saved to Firestore only.");
      }

      toast.success('Success! Your inquiry has been sent.');
      setFormData({
        parentName: '',
        phone: '',
        email: '',
        grade: 'Pre-Primary',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting inquiry: ", error);
      toast.error(error.message || 'Failed to send the inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Admissions & Inquiry</h1>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">Fill out the form below for admissions or inquiries.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100">

          {/* Contact Info & Buttons */}
          <motion.div
            className="w-full lg:w-5/12 bg-primary text-white p-10 lg:p-12 relative overflow-hidden flex flex-col justify-between"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Decor */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-50 translate-y-1/3 -translate-x-1/4"></div>

            <div className="relative z-10">
              <h2 className="text-3xl font-heading font-bold mb-6">Get In Touch</h2>
              <p className="text-blue-100 mb-10">Have questions? Connect with us via form or quick links.</p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Visit Us</h4>
                    <p className="text-blue-100 text-sm whitespace-pre-line">{settings.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email Us</h4>
                    <p className="text-blue-100 text-sm break-all">{settings.contactEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="relative z-10 mt-12 pt-8 border-t border-blue-800">
              <h4 className="text-sm font-semibold text-blue-200 uppercase tracking-wider mb-4">Quick Connect</h4>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href={`https://wa.me/${settings.contactPhone.replace(/\D/g, '')}?text=Hello,%20I%20would%20like%20to%20know%20more%20about%20admissions.`} target="_blank" rel="noreferrer" className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors shadow-lg shadow-green-500/30">
                  <FaWhatsapp className="text-xl" /> WhatsApp
                </a>
                <a href={`tel:${settings.contactPhone}`} className="flex-1 bg-white hover:bg-gray-100 text-primary py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors shadow-lg">
                  <FaPhoneAlt /> Call Us
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="w-full lg:w-7/12 p-10 lg:p-12"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold font-heading text-dark mb-6">Send an Inquiry</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">Parent's Name</label>
                  <input
                    type="text"
                    id="parentName"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="+1 (234) 567-890"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">Admission for Grade</label>
                <select
                  id="grade"
                  name="grade"
                  value={formData.grade}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white"
                >
                  <option value="Pre-Primary">Pre-Primary</option>
                  <option value="Primary (Grade 1-5)">Primary (Grade 1-5)</option>
                  <option value="Middle (Grade 6-8)">Middle (Grade 6-8)</option>
                  <option value="High School (Grade 9-12)">High School (Grade 9-12)</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message/Query</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-primary hover:bg-blue-800 text-white font-semibold py-4 rounded-xl transition-colors shadow-lg shadow-primary/30 text-lg flex justify-center items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Sending...' : <><FaPaperPlane /> Submit Inquiry</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Admissions;
