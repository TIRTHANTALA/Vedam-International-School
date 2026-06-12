import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaTrash, FaPlus, FaSpinner, FaBuilding } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    iconName: '',
    imageUrl: ''
  });

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ducxsgryc/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'vedam_gallery';

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const q = query(collection(db, 'facilities'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setFacilities(list);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities: ", error);
      toast.error('Failed to load facilities');
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setAdding(true);
    try {
      let finalImageUrl = formData.imageUrl;

      if (imageFile) {
        toast.loading('Uploading image...', { id: 'uploadToast' });
        
        const uploadData = new FormData();
        uploadData.append('file', imageFile);
        uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        uploadData.append('folder', 'Vedam School/Facilities');

        const res = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: uploadData,
        });
        
        const file = await res.json();
        
        if (file.error) {
          throw new Error(file.error.message);
        }

        finalImageUrl = file.secure_url;
        toast.success('Image uploaded!', { id: 'uploadToast' });
      }

      await addDoc(collection(db, 'facilities'), {
        ...formData,
        imageUrl: finalImageUrl,
        createdAt: new Date()
      });
      toast.success('Facility added successfully!');
      setFormData({ title: '', description: '', iconName: '', imageUrl: '' });
      setImageFile(null);
      document.getElementById('facility-image-upload').value = '';
      fetchFacilities();
    } catch (error) {
      console.error('Error adding facility: ', error);
      toast.error('Failed to add facility');
      toast.dismiss('uploadToast');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this facility?')) {
      try {
        await deleteDoc(doc(db, 'facilities', id));
        toast.success('Facility removed');
        fetchFacilities();
      } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error('Failed to remove facility');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark font-heading">Manage Facilities</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaPlus className="text-primary" /> Add Facility
          </h4>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Science Laboratory"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                required
                rows="3"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none resize-none"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Brief description of the facility..."
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">React Icon Name (Optional)</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.iconName}
                onChange={(e) => setFormData({...formData, iconName: e.target.value})}
                placeholder="e.g. FaFlask"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
              <input 
                id="facility-image-upload"
                type="file" 
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100 cursor-pointer"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              {imageFile && <p className="text-xs text-green-600 mt-1">Selected: {imageFile.name}</p>}
            </div>

            <button 
              type="submit" 
              disabled={adding}
              className={`w-full py-2 px-4 bg-primary text-white font-bold rounded flex items-center justify-center gap-2 transition-colors ${adding ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {adding ? <FaSpinner className="animate-spin" /> : <FaPlus />}
              {adding ? 'Adding...' : 'Add Facility'}
            </button>
          </form>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          {loading ? (
             <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-3xl text-primary" /></div>
          ) : facilities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-primary text-2xl shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                      <FaBuilding />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-gray-900 truncate">{item.title}</h5>
                    <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors shrink-0"
                    title="Remove"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <FaBuilding className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No facilities found.</p>
              <p className="text-sm text-gray-400 mt-1">Add facilities using the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageFacilities;
