import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaTrash, FaPlus, FaCalendarAlt, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    file: null
  });

  // Cloudinary details for image upload
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ducxsgryc/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'vedam_gallery';

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const q = query(collection(db, 'events'), orderBy('date', 'asc'));
      const querySnapshot = await getDocs(q);
      const eventsList = [];
      querySnapshot.forEach((doc) => {
        eventsList.push({ id: doc.id, ...doc.data() });
      });
      setEvents(eventsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching events: ", error);
      toast.error('Failed to load events');
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.file) {
      toast.error('Please select a cover image for the event');
      return;
    }

    if (CLOUDINARY_URL.includes('YOUR_CLOUD_NAME')) {
      toast.error('Please configure your Cloudinary details in ManageEvents.jsx first!');
      return;
    }

    setUploading(true);

    try {
      // 1. Upload Cover Image to Cloudinary
      const uploadData = new FormData();
      uploadData.append('file', formData.file);
      uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      uploadData.append('folder', 'Vedam School/Events');

      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: uploadData,
      });
      
      const fileRes = await res.json();
      if (fileRes.error) throw new Error(fileRes.error.message);
      
      const imageUrl = fileRes.secure_url;

      // 2. Save Event to Firestore
      // Format date to something like "Oct 15, 2024" to match the frontend design
      const dateObj = new Date(formData.date);
      const formattedDate = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      await addDoc(collection(db, 'events'), {
        title: formData.title,
        date: formattedDate,
        rawDate: formData.date, // Store raw date for sorting
        time: formData.time,
        location: formData.location,
        description: formData.description,
        image: imageUrl,
        createdAt: new Date()
      });

      toast.success('Event created successfully!');
      
      // Reset Form
      setFormData({ title: '', date: '', time: '', location: '', description: '', file: null });
      document.getElementById('event-file-upload').value = '';
      fetchEvents();
      
    } catch (error) {
      console.error('Error creating event: ', error);
      toast.error(`Failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteDoc(doc(db, 'events', id));
        toast.success('Event deleted');
        fetchEvents();
      } catch (error) {
        toast.error('Failed to delete event');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark font-heading">Manage Events</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Event Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaPlus className="text-primary" /> Create New Event
          </h4>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Event Title</label>
              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary" placeholder="Annual Sports Day" />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Date</label>
                <input type="date" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Time</label>
                <input type="text" required value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} className="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary" placeholder="10:00 AM" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Location</label>
              <input type="text" required value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} className="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary" placeholder="Main Auditorium" />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea required rows="3" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-2 text-sm border border-gray-300 rounded outline-none focus:ring-1 focus:ring-primary" placeholder="Short description of the event..."></textarea>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Cover Image</label>
              <input type="file" id="event-file-upload" accept="image/*" required onChange={handleFileChange} className="w-full text-xs text-gray-500 file:mr-2 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-primary hover:file:bg-blue-100" />
            </div>

            <button type="submit" disabled={uploading} className={`w-full py-2 px-4 mt-2 bg-primary text-white text-sm font-bold rounded flex items-center justify-center gap-2 transition-colors ${uploading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
              {uploading ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              {uploading ? 'Publishing...' : 'Publish Event'}
            </button>
          </form>
        </div>

        {/* Events List */}
        <div className="lg:col-span-2">
          {loading ? (
             <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-3xl text-primary" /></div>
          ) : events.length > 0 ? (
            <div className="space-y-4">
              {events.map(event => (
                <div key={event.id} className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-full sm:w-32 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-bold text-gray-900 truncate">{event.title}</h5>
                      <button onClick={() => handleDelete(event.id)} className="text-red-400 hover:text-red-600 p-1"><FaTrash /></button>
                    </div>
                    <div className="flex gap-3 text-xs font-medium text-gray-500 mb-2">
                      <span className="bg-gray-100 px-2 py-1 rounded">{event.date}</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">{event.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <FaCalendarAlt className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No events scheduled.</p>
              <p className="text-sm text-gray-400 mt-1">Create an event using the form to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageEvents;
