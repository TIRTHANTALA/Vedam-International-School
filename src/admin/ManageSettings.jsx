import React, { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaSave, FaSpinner, FaCog, FaInfoCircle, FaShareAlt, FaImages } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageSettings = () => {
  const [loading, setLoading] = useState(true);
  const [savingInfo, setSavingInfo] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);
  const [savingMedia, setSavingMedia] = useState(false);
  
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
    const unsub = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
      if (docSnap.exists()) {
        setFormData(prev => ({ ...prev, ...docSnap.data() }));
      }
      setLoading(false);
    }, (error) => {
      console.error("Error fetching settings: ", error);
      toast.error('Failed to load settings');
      setLoading(false);
    });
    
    return () => unsub();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveToFirestore = async (dataToSave, successMessage) => {
    try {
      await setDoc(doc(db, 'settings', 'general'), {
        ...dataToSave,
        updatedAt: new Date()
      }, { merge: true });
      toast.success(successMessage);
    } catch (error) {
      console.error('Error saving settings: ', error);
      toast.error('Failed to save settings');
      throw error;
    }
  };

  const handleSaveInfo = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    await saveToFirestore({
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      address: formData.address
    }, 'General information saved!');
    setSavingInfo(false);
  };

  const handleSaveSocial = async (e) => {
    e.preventDefault();
    setSavingSocial(true);
    await saveToFirestore({
      facebookUrl: formData.facebookUrl,
      instagramUrl: formData.instagramUrl,
      twitterUrl: formData.twitterUrl,
      youtubeUrl: formData.youtubeUrl
    }, 'Social links saved!');
    setSavingSocial(false);
  };

  const handleSaveMedia = async (e) => {
    e.preventDefault();
    setSavingMedia(true);
    try {
      let finalLogoUrl = formData.logoUrl;
      let finalHomeImageUrl = formData.homeImageUrl;
      let finalCampusVideoUrl = formData.campusVideoUrl;

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
        toast.loading('Uploading logo...', { id: 'mediaToast' });
        finalLogoUrl = await uploadToCloudinary(logoFile, 'Vedam School/Settings');
      }
      if (homeImageFile) {
        toast.loading('Uploading Home Page Image...', { id: 'mediaToast' });
        finalHomeImageUrl = await uploadToCloudinary(homeImageFile, 'Vedam School/Settings');
      }
      if (campusVideoFile) {
        toast.loading('Uploading Campus Video...', { id: 'mediaToast' });
        finalCampusVideoUrl = await uploadToCloudinary(campusVideoFile, 'Vedam School/Settings');
      }

      await saveToFirestore({
        logoUrl: finalLogoUrl,
        homeImageUrl: finalHomeImageUrl,
        campusVideoUrl: finalCampusVideoUrl
      }, 'Media assets saved successfully!');

      setLogoFile(null);
      setHomeImageFile(null);
      setCampusVideoFile(null);
      if(document.getElementById('logo-upload')) document.getElementById('logo-upload').value = '';
      if(document.getElementById('home-img-upload')) document.getElementById('home-img-upload').value = '';
      if(document.getElementById('campus-video-upload')) document.getElementById('campus-video-upload').value = '';
      
      toast.dismiss('mediaToast');
    } catch (error) {
      toast.dismiss('mediaToast');
      console.error(error);
    } finally {
      setSavingMedia(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-20"><FaSpinner className="animate-spin text-4xl text-primary" /></div>;
  }

  return (
    <div className="font-sans max-w-5xl space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-blue-100">
          <FaCog className="animate-spin-slow" />
        </div>
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 font-heading">Website Settings</h2>
          <p className="text-gray-500 text-sm mt-1">Manage your website's core information, media, and links individually.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-8">
          {/* General Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
              <div className="w-8 h-8 bg-blue-100 text-primary rounded-full flex items-center justify-center"><FaInfoCircle /></div>
              <h3 className="font-bold text-gray-800">General Information</h3>
            </div>
            <form onSubmit={handleSaveInfo} className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email</label>
                  <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Phone</label>
                  <input type="text" name="contactPhone" value={formData.contactPhone} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none transition-shadow" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Physical Address</label>
                <textarea name="address" rows="3" value={formData.address} onChange={handleChange} className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none transition-shadow"></textarea>
              </div>
              <div className="flex justify-end pt-2 border-t border-gray-50">
                <button type="submit" disabled={savingInfo} className={`mt-2 py-2.5 px-6 bg-primary text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-colors shadow-sm ${savingInfo ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'}`}>
                  {savingInfo ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Info
                </button>
              </div>
            </form>
          </div>

          {/* Social Links Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
              <div className="w-8 h-8 bg-pink-100 text-pink-500 rounded-full flex items-center justify-center"><FaShareAlt /></div>
              <h3 className="font-bold text-gray-800">Social Media Links</h3>
            </div>
            <form onSubmit={handleSaveSocial} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Facebook</label>
                <input type="url" name="facebookUrl" value={formData.facebookUrl} onChange={handleChange} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Instagram</label>
                <input type="url" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Twitter</label>
                <input type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="https://..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">YouTube</label>
                <input type="url" name="youtubeUrl" value={formData.youtubeUrl} onChange={handleChange} className="w-full p-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none transition-shadow" placeholder="https://..." />
              </div>
              <div className="md:col-span-2 flex justify-end pt-4 border-t border-gray-50">
                <button type="submit" disabled={savingSocial} className={`py-2.5 px-6 bg-pink-600 text-white text-sm font-bold rounded-lg flex items-center gap-2 transition-colors shadow-sm ${savingSocial ? 'opacity-70 cursor-not-allowed' : 'hover:bg-pink-700'}`}>
                  {savingSocial ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Links
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Media Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-fit hover:shadow-md transition-shadow">
          <div className="p-5 border-b border-gray-50 flex items-center gap-3 bg-gray-50/50">
            <div className="w-8 h-8 bg-amber-100 text-amber-500 rounded-full flex items-center justify-center"><FaImages /></div>
            <h3 className="font-bold text-gray-800">Media Assets</h3>
          </div>
          <form onSubmit={handleSaveMedia} className="p-6 space-y-6">
            
            <div className="p-5 bg-amber-50/30 rounded-xl border border-amber-100">
              <label className="block text-sm font-bold text-gray-800 mb-1">School Logo</label>
              <p className="text-xs text-gray-500 mb-3">Transparent PNG works best.</p>
              <input id="logo-upload" type="file" accept="image/*" className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-amber-100 file:text-amber-700 hover:file:bg-amber-200 cursor-pointer" onChange={(e) => setLogoFile(e.target.files[0])} />
              {logoFile ? <p className="text-xs text-green-600 mt-2 font-medium">Ready to upload: {logoFile.name}</p> : formData.logoUrl && <p className="text-xs text-gray-500 mt-2 truncate">Current: {formData.logoUrl}</p>}
            </div>

            <div className="p-5 bg-gray-50/50 rounded-xl border border-gray-100">
              <label className="block text-sm font-bold text-gray-800 mb-1">Home Page Hero Image</label>
              <p className="text-xs text-gray-500 mb-3">High resolution landscape image.</p>
              <input id="home-img-upload" type="file" accept="image/*" className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer" onChange={(e) => setHomeImageFile(e.target.files[0])} />
              {homeImageFile ? <p className="text-xs text-green-600 mt-2 font-medium">Ready to upload: {homeImageFile.name}</p> : formData.homeImageUrl && <p className="text-xs text-gray-500 mt-2 truncate">Current: {formData.homeImageUrl}</p>}
            </div>

            <div className="p-5 bg-gray-50/50 rounded-xl border border-gray-100">
              <label className="block text-sm font-bold text-gray-800 mb-1">Campus Tour Video</label>
              <p className="text-xs text-gray-500 mb-3">MP4 format recommended (Max 50MB).</p>
              <input id="campus-video-upload" type="file" accept="video/*" className="w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-gray-200 file:text-gray-700 hover:file:bg-gray-300 cursor-pointer" onChange={(e) => setCampusVideoFile(e.target.files[0])} />
              {campusVideoFile ? <p className="text-xs text-green-600 mt-2 font-medium">Ready to upload: {campusVideoFile.name}</p> : formData.campusVideoUrl && <p className="text-xs text-gray-500 mt-2 truncate">Current: {formData.campusVideoUrl}</p>}
            </div>

            <div className="flex justify-end pt-2 border-t border-gray-50">
              <button type="submit" disabled={savingMedia} className={`mt-2 py-2.5 px-6 bg-amber-500 text-white text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm w-full sm:w-auto ${savingMedia ? 'opacity-70 cursor-not-allowed' : 'hover:bg-amber-600'}`}>
                {savingMedia ? <FaSpinner className="animate-spin" /> : <FaSave />} Upload & Save Media
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default ManageSettings;
