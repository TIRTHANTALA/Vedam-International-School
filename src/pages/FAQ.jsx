import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaQuestionCircle } from 'react-icons/fa';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-4">
      <button 
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none text-dark font-semibold transition-colors hover:bg-gray-50"
        onClick={onClick}
      >
        <span className="pr-4">{question}</span>
        <FaChevronDown className={`text-primary transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-5 text-gray-600 bg-white"
          >
            <div className="pt-2 border-t border-gray-50">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "What is the admission process?",
      answer: "The admission process starts with filling out the online inquiry form. After that, our admission counselor will contact you to schedule a campus visit and an interaction session. Upon successful interaction, you can proceed with the document submission and fee payment."
    },
    {
      question: "Do you provide school transportation?",
      answer: "Yes, we have a comprehensive fleet of air-conditioned buses covering all major routes in the city. All buses are equipped with GPS tracking and female attendants for safety."
    },
    {
      question: "What extracurricular activities are offered?",
      answer: "We offer a wide range of activities including football, basketball, swimming, classical & western dance, vocal music, robotics, coding club, and various art & craft programs."
    },
    {
      question: "What is the student-to-teacher ratio?",
      answer: "We maintain a healthy student-to-teacher ratio of 25:1 to ensure personalized attention and optimal learning outcomes for every child."
    },
    {
      question: "Are meals provided at school?",
      answer: "Yes, our school cafeteria provides nutritious, wholesome, and hygienic vegetarian meals and snacks planned by a certified nutritionist."
    },
    {
      question: "Which curriculum does the school follow?",
      answer: "We offer multiple streams including English Medium, Gujarati Medium, and Marathi Medium, following the State Board curriculum integrated with modern pedagogical practices."
    }
  ];

  return (
    <div className="pt-10 pb-20 overflow-hidden bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-primary text-white py-20 relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply opacity-50 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary rounded-full mix-blend-multiply opacity-50 translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 flex justify-center items-center gap-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaQuestionCircle className="text-secondary" /> FAQ
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
            Find answers to common questions about admissions, fees, curriculum, and more.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </motion.div>

        <div className="mt-12 text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-dark mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">If you cannot find answer to your question in our FAQ, you can always contact us. We will answer to you shortly!</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-secondary text-white font-semibold rounded-full hover:bg-amber-600 transition-colors shadow-md">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
