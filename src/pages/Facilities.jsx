import React from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaFlask, FaBasketballBall, FaBookReader, FaBus, FaMedkit } from 'react-icons/fa';

const Facilities = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const facilitiesList = [
    {
      title: "Smart Classrooms",
      icon: <FaLaptopCode />,
      desc: "Equipped with interactive panels and internet for engaging lessons.",
      color: "bg-blue-500"
    },
    {
      title: "Advanced Science Labs",
      icon: <FaFlask />,
      desc: "Fully equipped laboratories for safe, hands-on experience.",
      color: "bg-purple-500"
    },
    {
      title: "Sports Complex",
      icon: <FaBasketballBall />,
      desc: "A sprawling sports arena featuring multiple courts and fields.",
      color: "bg-amber-500"
    },
    {
      title: "Digital Library",
      icon: <FaBookReader />,
      desc: "A massive collection of books and e-resources with study pods.",
      color: "bg-green-500"
    },
    {
      title: "Safe Transport",
      icon: <FaBus />,
      desc: "Modern, GPS-enabled buses ensuring safe transit.",
      color: "bg-red-500"
    },
    {
      title: "Medical Room",
      icon: <FaMedkit />,
      desc: "A well-equipped infirmary to handle medical needs.",
      color: "bg-teal-500"
    }
  ];

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
            Campus Facilities
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
            World-class infrastructure for a safe and stimulating environment.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 relative pb-10">
          {facilitiesList.map((facility, index) => (
            <motion.div 
              key={index}
              className="sticky md:static bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 group"
              style={{ top: `calc(5rem + ${index * 0.5}rem)`, zIndex: index + 10 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`h-2 w-full ${facility.color}`}></div>
              <div className="p-8">
                <div className={`w-16 h-16 rounded-xl text-white text-3xl flex items-center justify-center mb-6 shadow-md transform group-hover:scale-110 transition-transform ${facility.color}`}>
                  {facility.icon}
                </div>
                <h3 className="text-2xl font-bold font-heading mb-3 text-dark group-hover:text-primary transition-colors">{facility.title}</h3>
                <p className="text-gray-600 leading-relaxed">{facility.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action for Tour */}
        <motion.div 
          className="mt-20 bg-dark text-white rounded-3xl p-10 lg:p-16 text-center relative overflow-hidden"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Experience it Yourself</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">Schedule a campus tour to experience our facilities firsthand.</p>
            <a href="/contact" className="inline-block px-8 py-4 bg-secondary text-white font-bold rounded-full hover:bg-amber-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
              Schedule a Campus Tour
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Facilities;
