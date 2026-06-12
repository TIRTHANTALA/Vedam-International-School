import React from 'react';
import { motion } from 'framer-motion';
import { FaRocket, FaEye, FaHeart, FaCheck, FaHistory } from 'react-icons/fa';

const About = () => {
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
    <div className="pt-10 pb-20 overflow-hidden bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-50 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About Vedam International
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
            Dedicated to shaping character and careers since 2005. Nurturing globally minded, confident, and compassionate leaders.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        {/* Introduction */}
        <motion.div 
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100 mb-16 flex flex-col lg:flex-row gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="w-full lg:w-1/2">
            <img src="https://res.cloudinary.com/ducxsgryc/image/upload/v1781266560/ChatGPT_Image_Jun_12_2026_05_33_36_PM_-_Edited_nyahfm.png" alt="School Campus" className="rounded-2xl shadow-lg w-full h-auto object-cover aspect-video bg-gray-200" />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-heading font-bold text-dark mb-4">Welcome to Our Community</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Vedam International School was founded with a simple yet powerful premise: every child is unique and has the potential to excel given the right environment and guidance. Over the past nearly two decades, we have evolved into a premier educational institution known for academic excellence and holistic development.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our state-of-the-art campus, highly qualified faculty, and progressive curriculum ensure that students are not just prepared for exams, but for life. We blend traditional values with modern pedagogy to create an enriching learning experience.
            </p>
          </div>
        </motion.div>

        {/* Mission, Vision, Values (Reused from Home but expanded) */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Mission */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-primary hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 text-primary rounded-xl flex items-center justify-center text-3xl mb-6">
              <FaRocket />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-dark">Our Mission</h3>
            <p className="text-gray-600">To ignite a passion for learning, foster intellectual growth, and cultivate compassionate global citizens through innovative and inclusive education. We strive to provide a safe, nurturing environment where every student can achieve their full potential.</p>
          </motion.div>
          
          {/* Vision */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-secondary hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-amber-100 text-secondary rounded-xl flex items-center justify-center text-3xl mb-6">
              <FaEye />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-dark">Our Vision</h3>
            <p className="text-gray-600">To be a premier institution that inspires excellence, creativity, and resilience, empowering students to lead and succeed in a dynamic world. We envision a community of lifelong learners who contribute positively to society.</p>
          </motion.div>
          
          {/* Values */}
          <motion.div variants={fadeInUp} className="bg-white p-8 rounded-2xl shadow-md border-t-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-3xl mb-6">
              <FaHeart />
            </div>
            <h3 className="text-2xl font-bold font-heading mb-4 text-dark">Core Values</h3>
            <ul className="text-gray-600 space-y-3">
              <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0" /> <span><strong>Integrity:</strong> We act with honesty and strong moral principles.</span></li>
              <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0" /> <span><strong>Excellence:</strong> We strive to do our best in all endeavors.</span></li>
              <li className="flex items-start gap-3"><FaCheck className="text-green-500 mt-1 flex-shrink-0" /> <span><strong>Inclusion:</strong> We embrace diversity and foster a sense of belonging.</span></li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-bold text-dark mb-2">Our Journey</h2>
            <p className="text-gray-500">Milestones that define our legacy.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 before:to-transparent">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <FaHistory />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-light p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-lg text-dark">Foundation</h4>
                  <span className="font-semibold text-secondary">2005</span>
                </div>
                <p className="text-gray-600 text-sm">Vedam International School was established with just 50 students and 5 teachers in a small campus.</p>
              </div>
            </div>
            
            {/* Timeline Item 2 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <FaHistory />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-light p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-lg text-dark">Campus Expansion</h4>
                  <span className="font-semibold text-secondary">2012</span>
                </div>
                <p className="text-gray-600 text-sm">Moved to the current state-of-the-art 10-acre campus with modern facilities and sports complex.</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                <FaHistory />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-light p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-lg text-dark">Digital Transformation</h4>
                  <span className="font-semibold text-secondary">2018</span>
                </div>
                <p className="text-gray-600 text-sm">Introduced smart classrooms, digital library, and comprehensive STEM robotics labs.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
