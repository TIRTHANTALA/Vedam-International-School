import React, { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaSave, FaSpinner, FaCog } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageSettings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [homeImageFile, setHomeImageFile] = useState(null);
  const [campusVideoFile, setCampusVideoFile] = useState(null);
  const [formData, setFormData] = useState({
    schoolName: 'Vedam International School',
    contactEmail: 'info@vedamschool.com',
    contactPhone: '+91 98765 43210',
    address: '123 Education Lane, Knowledge City',
    facebookUrl: '',
    instagramUrl: '',
    twitterUrl: '',
    youtubeUrl: '',
    logoUrl: '',
    homeImageUrl: '',
    campusVideoUrl: ''
  });

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ducxsgryc/auto/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'vedam_gallery';

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'general');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData({ ...formData, ...docSnap.data() });
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching settings: ", error);
      toast.error('Failed to load settings');
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalLogoUrl = formData.logoUrl;
      let finalHomeImageUrl = formData.homeImageUrl;
      let finalCampusVideoUrl = formData.campusVideoUrl;

      // Helper function to upload to Cloudinary
      const uploadToCloudinary = async (file, folder) => {
        const uploadData = new FormData();
        uploadData.append('file', file);
        uploadData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
        uploadData.append('folder', folder);
        
        const res = await fetch(CLOUDINARY_URL, {
          method: 'POST',
          body: uploadData,
        });
        
        const data = await res.json();
        if (data.error) throw new Error(data.error.message);
        return data.secure_url;
      };

      if (logoFile) {
        toast.loading('Uploading logo...', { id: 'uploadToast' });
        finalLogoUrl = await uploadToCloudinary(logoFile, 'Vedam School/Settings');
        toast.success('Logo uploaded!', { id: 'uploadToast' });
      }

      if (homeImageFile) {
        toast.loading('Uploading Home Page Image...', { id: 'uploadToast' });
        finalHomeImageUrl = await uploadToCloudinary(homeImageFile, 'Vedam School/Settings');
        toast.success('Home Image uploaded!', { id: 'uploadToast' });
      }

      if (campusVideoFile) {
        toast.loading('Uploading Campus Video...', { id: 'uploadToast' });
        finalCampusVideoUrl = await uploadToCloudinary(campusVideoFile, 'Vedam School/Settings');
        toast.success('Campus Video uploaded!', { id: 'uploadToast' });
      }

      await setDoc(doc(db, 'settings', 'general'), {
        ...formData,
        logoUrl: finalLogoUrl,
        homeImageUrl: finalHomeImageUrl,
        campusVideoUrl: finalCampusVideoUrl,
        updatedAt: new Date()
      }, { merge: true });
      
      setFormData(prev => ({ 
        ...prev, 
        logoUrl: finalLogoUrl,
        homeImageUrl: finalHomeImageUrl,
        campusVideoUrl: finalCampusVideoUrl
      }));
      setLogoFile(null);
      setHomeImageFile(null);
      setCampusVideoFile(null);
      if(document.getElementById('logo-upload')) document.getElementById('logo-upload').value = '';
      if(document.getElementById('home-img-upload')) document.getElementById('home-img-upload').value = '';
      if(document.getElementById('campus-video-upload')) document.getElementById('campus-video-upload').value = '';
      
      toast.success('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings: ', error);
      toast.error('Failed to save settings');
      toast.dismiss('uploadToast');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-4xl text-primary" /></div>;
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans max-w-4xl">
      <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark font-heading flex items-center gap-2">
          <FaCog className="text-primary" /> Website Settings
        </h3>
      </div>
      
      <form onSubmit={handleSave} className="p-6 space-y-8">
        
        {/* General Details */}
        <section>
          <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">General Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
              <input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Logo</label>
              <input 
                id="logo-upload"
                type="file" 
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100 cursor-pointer"
                onChange={(e) => setLogoFile(e.target.files[0])}
              />
              {logoFile ? (
                <p className="text-xs text-green-600 mt-1">Selected: {logoFile.name}</p>
              ) : formData.logoUrl ? (
                <p className="text-xs text-gray-500 mt-1 truncate">Current: {formData.logoUrl}</p>
              ) : null}
            </div>
          </div>
        </section>

        {/* Home Page Content */}
        <section>
          <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Home Page Content</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Home Page Hero Image</label>
              <input 
                id="home-img-upload"
                type="file" 
                accept="image/*"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100 cursor-pointer"
                onChange={(e) => setHomeImageFile(e.target.files[0])}
              />
              {homeImageFile ? (
                <p className="text-xs text-green-600 mt-1">Selected: {homeImageFile.name}</p>
              ) : formData.homeImageUrl ? (
                <p className="text-xs text-gray-500 mt-1 truncate">Current: {formData.homeImageUrl}</p>
              ) : null}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Campus Tour Video</label>
              <input 
                id="campus-video-upload"
                type="file" 
                accept="video/*"
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100 cursor-pointer"
                onChange={(e) => setCampusVideoFile(e.target.files[0])}
              />
              {campusVideoFile ? (
                <p className="text-xs text-green-600 mt-1">Selected: {campusVideoFile.name}</p>
              ) : formData.campusVideoUrl ? (
                <p className="text-xs text-gray-500 mt-1 truncate">Current: {formData.campusVideoUrl}</p>
              ) : null}
            </div>
          </div>
        </section>

        {/* Contact Details */}
        <section>
          <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Contact Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
              <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Physical Address</label>
              <textarea name="address" rows="2" value={formData.address} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none resize-none"></textarea>
            </div>
          </div>
        </section>

        {/* Social Links */}
        <section>
          <h4 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Social Media Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input type="url" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label>
              <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter URL</label>
              <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label>
              <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            disabled={saving}
            className={`py-2 px-6 bg-primary text-white font-bold rounded flex items-center justify-center gap-2 transition-colors ${saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}
          >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSettings;
