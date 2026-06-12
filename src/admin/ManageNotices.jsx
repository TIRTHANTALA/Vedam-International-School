import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaTrash, FaPlus, FaSpinner, FaBullhorn } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isImportant: false
  });

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const q = query(collection(db, 'notices'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setNotices(list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notices: ", error);
      toast.error('Failed to load notices');
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      await addDoc(collection(db, 'notices'), {
        ...formData,
        date: new Date().toISOString().split('T')[0],
        createdAt: new Date()
      });
      toast.success('Notice added successfully!');
      setFormData({ title: '', content: '', isImportant: false });
      fetchNotices();
    } catch (error) {
      console.error('Error adding notice: ', error);
      toast.error('Failed to add notice');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await deleteDoc(doc(db, 'notices', id));
        toast.success('Notice deleted');
        fetchNotices();
      } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error('Failed to delete notice');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark font-heading">Manage Notices</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaPlus className="text-primary" /> Add Notice
          </h4>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notice Title</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Holiday on Friday"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content / Description</label>
              <textarea 
                required
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none resize-none"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                placeholder="Details of the notice..."
              ></textarea>
            </div>

            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="isImportant"
                className="w-4 h-4 text-primary rounded focus:ring-primary"
                checked={formData.isImportant}
                onChange={(e) => setFormData({...formData, isImportant: e.target.checked})}
              />
              <label htmlFor="isImportant" className="text-sm font-medium text-gray-700">Mark as Important (Highlight)</label>
            </div>

            <button 
              type="submit" 
              disabled={adding}
              className={`w-full py-2 px-4 bg-primary text-white font-bold rounded flex items-center justify-center gap-2 transition-colors ${adding ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {adding ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              {adding ? 'Adding...' : 'Add Notice'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          {loading ? (
             <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-3xl text-primary" /></div>
          ) : notices.length > 0 ? (
            <div className="space-y-4">
              {notices.map(item => (
                <div key={item.id} className={`p-4 rounded-xl shadow-sm border flex gap-4 items-start ${item.isImportant ? 'bg-red-50 border-red-100' : 'bg-white border-gray-100'}`}>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl shrink-0 ${item.isImportant ? 'bg-red-100 text-red-500' : 'bg-blue-50 text-primary'}`}>
                    <FaBullhorn />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h5 className={`font-bold ${item.isImportant ? 'text-red-700' : 'text-gray-900'}`}>{item.title}</h5>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2 whitespace-pre-wrap">{item.content}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-100 rounded transition-colors shrink-0"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <FaBullhorn className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No notices found.</p>
              <p className="text-sm text-gray-400 mt-1">Publish notices using the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageNotices;
