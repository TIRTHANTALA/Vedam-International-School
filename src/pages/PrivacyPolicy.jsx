import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="pt-10 pb-20 overflow-hidden bg-gray-50 min-h-screen">
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
            Privacy Policy
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
            Your privacy is critically important to us.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div 
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">1. Information We Collect</h2>
              <p>We only collect information about you if we have a reason to do so—for example, to provide our services, to communicate with you, or to make our services better. This includes data submitted via our admissions and contact forms such as name, phone number, and email address.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">2. How We Use Information</h2>
              <p>We use the information we collect to communicate with you regarding school admissions, events, and important updates. We do not sell your personal information to third-party marketing companies.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">3. Security</h2>
              <p>While no online service is 100% secure, we work very hard to protect information about you against unauthorized access, use, alteration, or destruction, and take reasonable measures to do so.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">4. Cookies</h2>
              <p>Our website may use cookies and similar tracking technologies to track the activity on our site and hold certain information to improve user experience.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">5. Policy Changes</h2>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
