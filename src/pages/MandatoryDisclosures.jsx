import React from 'react';
import { motion } from 'framer-motion';

const MandatoryDisclosures = () => {
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
            Mandatory Disclosures
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
            Official school information and affiliations.
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
          <div className="space-y-6 text-gray-700 leading-relaxed">
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 border border-gray-200 font-semibold w-1/3">Detail</th>
                    <th className="p-4 border border-gray-200 font-semibold w-2/3">Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 border border-gray-200 font-medium">Name of the School</td>
                    <td className="p-4 border border-gray-200">Vedam International School</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 border border-gray-200 font-medium">Affiliation No.</td>
                    <td className="p-4 border border-gray-200">Not Applicable (Sample)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-medium">State/Board</td>
                    <td className="p-4 border border-gray-200">State Education Board</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 border border-gray-200 font-medium">School Code</td>
                    <td className="p-4 border border-gray-200">12345</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-medium">Complete Address</td>
                    <td className="p-4 border border-gray-200">123 Education Boulevard, Tech City, State 12345</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="p-4 border border-gray-200 font-medium">Principal Name & Qualification</td>
                    <td className="p-4 border border-gray-200">Mrs. Sharma (M.A., B.Ed.)</td>
                  </tr>
                  <tr>
                    <td className="p-4 border border-gray-200 font-medium">School Email ID</td>
                    <td className="p-4 border border-gray-200">info@vedaminternational.edu</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 mt-8 italic">* This information is provided as per the guidelines of educational authorities for public disclosure.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MandatoryDisclosures;
