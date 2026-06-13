import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaEnvelope, FaLinkedin, FaSpinner } from 'react-icons/fa';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const Faculty = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  // Cloudinary Smart Face Crop
  const getSmartCroppedUrl = (url) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    return url.replace('/upload/', '/upload/c_fill,g_face,w_600,h_600/');
  };

  const [facultyMembers, setFacultyMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const q = query(collection(db, 'faculty'), orderBy('createdAt', 'asc'));
        const querySnapshot = await getDocs(q);
        const list = [];
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setFacultyMembers(list);
      } catch (error) {
        console.error("Error fetching faculty: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
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
            Our Expert Faculty
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
            Meet our team of passionate, highly qualified educators who are dedicated to nurturing the next generation of leaders.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8 pb-10">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <FaSpinner className="animate-spin text-4xl text-primary" />
            </div>
          ) : facultyMembers.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-500">More faculty members will be added soon.</p>
            </div>
          ) : (
            facultyMembers.map((member, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-gray-100 group"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: (index % 4) * 0.1 }}
            >
              <div className="relative h-32 sm:h-60 overflow-hidden bg-gray-100">
                <img 
                  src={member.imageUrl ? getSmartCroppedUrl(member.imageUrl) : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop"} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                {(member.email || member.linkedinUrl) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-end justify-center pb-6 gap-4">
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center hover:bg-secondary hover:text-white transition-colors" title="Email">
                        <FaEnvelope />
                      </a>
                    )}
                    {member.linkedinUrl && (
                      <a href={member.linkedinUrl} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors" title="LinkedIn">
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-6 relative">
                <div className="absolute -top-4 right-3 w-8 h-8 sm:-top-6 sm:right-6 sm:w-12 sm:h-12 bg-secondary text-white rounded-lg sm:rounded-xl shadow-lg flex items-center justify-center text-sm sm:text-2xl transform rotate-12 group-hover:rotate-0 transition-transform">
                  <FaGraduationCap />
                </div>
                <h3 className="text-sm sm:text-xl font-bold font-heading text-dark mb-1 line-clamp-1">{member.name}</h3>
                <p className="text-primary font-medium text-[10px] sm:text-sm mb-2">{member.role}</p>
                <div className="w-6 sm:w-10 h-1 bg-gray-200 mb-2 sm:mb-3"></div>
                <p className="text-[9px] sm:text-xs font-medium text-gray-500 mb-1 sm:mb-2 line-clamp-1">{member.qualification}</p>
                <p className="text-gray-600 leading-snug text-[9px] sm:text-xs line-clamp-2">{member.department ? `Dept: ${member.department}` : "Dedicated to student success."}</p>
              </div>
            </motion.div>
            ))
          )}
        </div>
        
        {/* Join Us CTA */}
        <motion.div 
          className="mt-20 bg-blue-50 rounded-3xl p-10 border border-blue-100 text-center shadow-sm"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-4">Join Our Faculty Team</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">We are always looking for passionate educators to join our dynamic team. If you believe in transformative education, we'd love to hear from you.</p>
          <a href="/contact" className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow-md">
            View Career Opportunities
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Faculty;
