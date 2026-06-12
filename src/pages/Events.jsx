import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaArrowRight, FaSpinner, FaTimes } from 'react-icons/fa';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';

const Events = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsList = [];
        
        // Get today's date at midnight for comparison
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          
          // Parse the event date (fallback to 'date' if 'rawDate' is missing)
          const eventDateStr = data.rawDate || data.date;
          if (eventDateStr) {
            const eventDate = new Date(eventDateStr);
            // Only add if the event date is today or in the future
            if (eventDate >= today) {
              eventsList.push({ id: doc.id, ...data });
            }
          } else {
            eventsList.push({ id: doc.id, ...data });
          }
        });

        // Sort events chronologically (soonest first)
        eventsList.sort((a, b) => {
          const dateA = new Date(a.rawDate || a.date);
          const dateB = new Date(b.rawDate || b.date);
          return dateA - dateB;
        });
        
        // Fallback to placeholder if nothing in Firestore yet
        if (eventsList.length === 0) {
          setUpcomingEvents([
            {
              id: '1',
              title: "Annual Science Exhibition",
              date: "Oct 15, 2024",
              time: "10:00 AM - 4:00 PM",
              location: "Main Auditorium",
              description: "Students from grades 6-12 will showcase their innovative science projects and working models. Parents are welcome to attend.",
              image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2132&auto=format&fit=crop"
            },
            {
              id: '2',
              title: "Inter-School Basketball Tournament",
              date: "Nov 02-05, 2024",
              time: "8:00 AM onwards",
              location: "School Sports Complex",
              description: "Vedam International hosts the regional inter-school basketball championship. Come cheer for our home team!",
              image: "https://images.unsplash.com/photo-1515523110800-9415d13b84a8?q=80&w=1887&auto=format&fit=crop"
            }
          ]);
        } else {
          setUpcomingEvents(eventsList);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

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
            News & Events
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
            Stay updated with the latest happenings, upcoming events, and important announcements at Vedam.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        


        {/* Upcoming Events List */}
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold text-dark mb-8 flex items-center gap-3">
            <FaCalendarAlt className="text-primary" /> Upcoming Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex flex-col group"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-full relative overflow-hidden h-60 shrink-0">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg text-center p-2 min-w-[70px] shadow-lg">
                    <span className="block text-secondary font-bold text-xl">{event.date.split(' ')[1] ? event.date.split(' ')[1].replace(',', '') : event.date.split('-')[2] || '01'}</span>
                    <span className="block text-dark font-semibold text-xs uppercase">{event.date.split(' ')[0]}</span>
                  </div>
                </div>
                
                <div className="w-full p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-heading text-dark mb-4 group-hover:text-primary transition-colors line-clamp-2">{event.title}</h3>
                  <div className="flex flex-col gap-3 mb-4 text-sm font-medium text-gray-500">
                    <span className="flex items-center gap-2"><FaClock className="text-secondary shrink-0" /> <span className="truncate">{event.time}</span></span>
                    <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-secondary shrink-0" /> <span className="truncate">{event.location}</span></span>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm mb-6 line-clamp-3">{event.description}</p>
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => setSelectedEvent(event)}
                      className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:text-blue-800 transition-colors"
                    >
                      View Details <FaArrowRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        

      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="relative h-64 w-full shrink-0">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors backdrop-blur-md"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="p-8 overflow-y-auto">
                <h3 className="text-2xl font-bold font-heading text-dark mb-4">{selectedEvent.title}</h3>
                <div className="flex flex-wrap gap-4 mb-6 text-sm font-medium text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="flex items-center gap-2"><FaCalendarAlt className="text-secondary" /> {selectedEvent.date}</span>
                  <span className="flex items-center gap-2"><FaClock className="text-secondary" /> {selectedEvent.time}</span>
                  <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-secondary" /> {selectedEvent.location}</span>
                </div>
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedEvent.description}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Events;
