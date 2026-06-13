import React from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
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
            Terms of Service
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
            Rules and guidelines for using our website.
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
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">1. Acceptance of Terms</h2>
              <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">2. Intellectual Property</h2>
              <p>All content published and made available on our site is the property of Vedam International School. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">3. User Contributions</h2>
              <p>Users may post inquiries or feedback on our site. By posting publicly, you agree not to act illegally or violate the rights of others, including intellectual property or privacy rights.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">4. Admissions Data</h2>
              <p>Submitting an admissions inquiry form does not guarantee enrollment. The school management reserves the right to review and accept applications based on its institutional criteria.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold font-heading text-dark mb-4">5. Limitation of Liability</h2>
              <p>Vedam International School will not be liable for any actions, claims, losses, damages, liabilities and expenses including legal fees from your use of the site.</p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
