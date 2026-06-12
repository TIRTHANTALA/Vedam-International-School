import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaTrash, FaPlus, FaSpinner, FaQuoteLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const q = query(collection(db, 'testimonials'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setTestimonials(list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching testimonials: ", error);
      toast.error('Failed to load testimonials');
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await addDoc(collection(db, 'testimonials'), {
        ...formData,
        createdAt: new Date()
      });
      toast.success('Testimonial added successfully!');
      setFormData({ name: '', role: '', content: '' });
      fetchTestimonials();
    } catch (error) {
      console.error('Error adding testimonial: ', error);
      toast.error('Failed to add testimonial');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this testimonial?')) {
      try {
        await deleteDoc(doc(db, 'testimonials', id));
        toast.success('Testimonial removed');
        fetchTestimonials();
      } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error('Failed to remove testimonial');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark font-heading">Manage Testimonials</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaPlus className="text-primary" /> Add Testimonial
          </h4>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Rahul Sharma"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Relationship</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Parent, Alumni"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review Content</label>
              <textarea 
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none resize-none"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="What did they say about the school?"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={adding}
              className={`w-full py-2 px-4 bg-primary text-white font-bold rounded flex items-center justify-center gap-2 transition-colors ${adding ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {adding ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              {adding ? 'Adding...' : 'Add Testimonial'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          {loading ? (
             <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-3xl text-primary" /></div>
          ) : testimonials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map(item => (
                <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col h-full relative">
                  <FaQuoteLeft className="text-gray-200 text-3xl absolute top-4 right-4" />
                  <p className="text-gray-600 italic mb-4 text-sm relative z-10 flex-grow">"{item.content}"</p>
                  <div className="flex justify-between items-end mt-auto">
                    <div>
                      <h5 className="font-bold text-gray-900">{item.name}</h5>
                      <p className="text-xs text-primary font-medium">{item.role}</p>
                    </div>
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Remove"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <FaQuoteLeft className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No testimonials found.</p>
              <p className="text-sm text-gray-400 mt-1">Add testimonials using the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTestimonials;
