import React from 'react';
import { motion } from 'framer-motion';
import { FaBookReader, FaChalkboardTeacher, FaLaptopCode, FaGlobe, FaFlask, FaPalette } from 'react-icons/fa';

const Academics = () => {
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
            Academics
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
            Inspiring curiosity and building a strong foundation for lifelong learning.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        {/* Stages of Learning */}
        <motion.div 
          className="grid lg:grid-cols-3 gap-8 mb-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Pre-Primary */}
          <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-pink-400"></div>
            <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              <FaPalette />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-3 text-dark">Pre-Primary</h3>
            <span className="inline-block py-1 px-3 bg-pink-50 text-pink-600 rounded-full text-xs font-semibold mb-4">Nursery to KG</span>
            <p className="text-gray-600 mb-6">Play-based learning for early cognitive development.</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>• Phonics & Language</li>
              <li>• Creative Arts & Crafts</li>
              <li>• Sensory Play</li>
            </ul>
          </motion.div>

          {/* Primary & Middle */}
          <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-400"></div>
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              <FaBookReader />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-3 text-dark">Primary & Middle</h3>
            <span className="inline-block py-1 px-3 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold mb-4">Grades 1 to 8</span>
            <p className="text-gray-600 mb-6">Building foundational knowledge across core subjects.</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>• Core Academics (Math, Science, Languages)</li>
              <li>• Introduction to Coding</li>
              <li>• Physical Education & Arts</li>
            </ul>
          </motion.div>

          {/* High School */}
          <motion.div variants={fadeInUp} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-400"></div>
            <div className="w-16 h-16 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
              <FaFlask />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-3 text-dark">High School</h3>
            <span className="inline-block py-1 px-3 bg-purple-50 text-purple-600 rounded-full text-xs font-semibold mb-4">Grades 9 to 12</span>
            <p className="text-gray-600 mb-6">Rigorous academic preparation for career aspirations.</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>• Science & Commerce Streams</li>
              <li>• Advanced Laboratories</li>
              <li>• Career Counseling</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Teaching Methodology */}
        <motion.div 
          className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 flex flex-col lg:flex-row mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="w-full lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
            <h2 className="text-3xl font-heading font-bold text-dark mb-6">Our Teaching Methodology</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Our pedagogical approach blends traditional teaching with digital tools for a rich learning experience.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0">
                  <FaChalkboardTeacher />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Experiential Learning</h4>
                  <p className="text-sm text-gray-500">Learning by doing through projects, experiments, and field trips.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-secondary flex items-center justify-center shrink-0">
                  <FaLaptopCode />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Tech-Integrated</h4>
                  <p className="text-sm text-gray-500">Smart classrooms and digital labs for interactive sessions.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-green-100 text-green-500 flex items-center justify-center shrink-0">
                  <FaGlobe />
                </div>
                <div>
                  <h4 className="font-bold text-dark mb-1">Global Perspective</h4>
                  <p className="text-sm text-gray-500">Curriculum designed to build awareness of global issues.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 bg-gray-200">
            <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2070&auto=format&fit=crop" alt="Students in library" className="w-full h-full object-cover" />
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Academics;
