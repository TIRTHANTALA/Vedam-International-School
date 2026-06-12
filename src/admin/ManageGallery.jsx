import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaTrash, FaUpload, FaImage, FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: 'campus',
    file: null
  });

  const categories = ['campus', 'events', 'sports', 'academics'];

  // Replace these with your actual Cloudinary details
  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ducxsgryc/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'vedam_gallery';

  useEffect(() => {
    const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const imagesList = [];
      querySnapshot.forEach((doc) => {
        imagesList.push({ id: doc.id, ...doc.data() });
      });
      setImages(imagesList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching images: ", error);
      toast.error('Failed to load images');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!formData.file || !formData.title) {
      toast.error('Please provide a title and select an image');
      return;
    }

    if (CLOUDINARY_URL.includes('YOUR_CLOUD_NAME')) {
      toast.error('Please configure your Cloudinary details in ManageGallery.jsx first!');
      return;
    }

    setUploading(true);

    // 1. Upload to Cloudinary
    const uploadData = new FormData();
    uploadData.append('file', formData.file);
    uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    uploadData.append('folder', 'Vedam School/Gallery');

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: uploadData,
      });
      
      const file = await res.json();
      
      if (file.error) {
        throw new Error(file.error.message);
      }

      const imageUrl = file.secure_url;

      // 2. Save URL to Firestore
      await addDoc(collection(db, 'gallery'), {
        title: formData.title,
        category: formData.category,
        src: imageUrl,
        createdAt: new Date()
      });

      toast.success('Image uploaded successfully!');
      setFormData({ title: '', category: 'campus', file: null });
      // Reset file input
      document.getElementById('file-upload').value = '';
      
    } catch (error) {
      console.error('Upload Error: ', error);
      toast.error(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteDoc(doc(db, 'gallery', id));
        toast.success('Image deleted');
      } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error('Failed to delete image');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark font-heading">Manage Gallery</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Upload Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaUpload className="text-primary" /> Upload New Image
          </h4>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g. Annual Sports Day 2024"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none capitalize"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
              <input 
                type="file" 
                id="file-upload"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
              />
            </div>

            <button 
              type="submit" 
              disabled={uploading}
              className={`w-full py-2 px-4 bg-primary text-white font-bold rounded flex items-center justify-center gap-2 transition-colors ${uploading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
            >
              {uploading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
              {uploading ? 'Uploading...' : 'Upload to Gallery'}
            </button>
          </form>
        </div>

        {/* Image Grid */}
        <div className="lg:col-span-2">
          {loading ? (
             <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-3xl text-primary" /></div>
          ) : images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map(img => (
                <div key={img.id} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                    <div className="flex justify-between items-start">
                      <span className="bg-secondary text-white text-xs px-2 py-1 rounded capitalize">{img.category}</span>
                      <button 
                        onClick={() => handleDelete(img.id)}
                        className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        title="Delete Image"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                    <p className="text-white text-sm font-medium truncate" title={img.title}>{img.title}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <FaImage className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No images found in Firestore.</p>
              <p className="text-sm text-gray-400 mt-1">Upload an image to see it here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageGallery;
