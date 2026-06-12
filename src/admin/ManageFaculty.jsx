import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { FaTrash, FaUserPlus, FaSpinner, FaUserTie } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    department: '',
    qualification: '',
    email: '',
    linkedinUrl: '',
    imageUrl: ''
  });

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/ducxsgryc/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'vedam_gallery';

  useEffect(() => {
    const q = query(collection(db, 'faculty'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const facultyList = [];
      querySnapshot.forEach((doc) => {
        facultyList.push({ id: doc.id, ...doc.data() });
      });
      setFaculty(facultyList);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching faculty: ", error);
      toast.error('Failed to load faculty');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
        uploadData.append('folder', 'Vedam School/Faculty');

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

      await addDoc(collection(db, 'faculty'), {
        ...formData,
        imageUrl: finalImageUrl,
        createdAt: new Date()
      });
      toast.success('Faculty member added successfully!');
      setFormData({ name: '', role: '', department: '', qualification: '', email: '', linkedinUrl: '', imageUrl: '' });
      setImageFile(null);
      document.getElementById('faculty-image-upload').value = '';
    } catch (error) {
      console.error('Error adding faculty: ', error);
      toast.error('Failed to add faculty member');
      toast.dismiss('uploadToast');
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      try {
        await deleteDoc(doc(db, 'faculty', id));
        toast.success('Faculty member removed');
      } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error('Failed to remove faculty member');
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-sans">
      <div className="p-6 border-b border-gray-100 bg-white flex justify-between items-center">
        <h3 className="text-xl font-bold text-dark font-heading">Manage Faculty</h3>
      </div>
      
      <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Form */}
        <div className="lg:col-span-1 bg-gray-50 p-6 rounded-xl border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FaUserPlus className="text-primary" /> Add Faculty Member
          </h4>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Dr. Jane Smith"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role / Designation</label>
              <input 
                type="text" 
                required
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                placeholder="e.g. Principal, Senior Teacher"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                placeholder="e.g. Science, Mathematics"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualification</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.qualification}
                onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                placeholder="e.g. Ph.D., M.Sc., B.Ed."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID (Optional)</label>
              <input 
                type="email" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="teacher@school.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile URL (Optional)</label>
              <input 
                type="url" 
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-primary outline-none"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({...formData, linkedinUrl: e.target.value})}
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photo</label>
              <input 
                id="faculty-image-upload"
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
              {adding ? <FaSpinner className="animate-spin" /> : <FaUserPlus />}
              {adding ? 'Adding...' : 'Add Faculty'}
            </button>
          </form>
        </div>

        {/* Faculty List */}
        <div className="lg:col-span-2">
          {loading ? (
             <div className="flex justify-center py-10"><FaSpinner className="animate-spin text-3xl text-primary" /></div>
          ) : faculty.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {faculty.map(member => (
                <div key={member.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {member.imageUrl ? (
                      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <FaUserTie className="text-gray-400 text-2xl" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-gray-900 truncate">{member.name}</h5>
                    <p className="text-sm text-primary font-medium truncate">{member.role}</p>
                    <p className="text-xs text-gray-500 truncate">{member.department} • {member.qualification}</p>
                  </div>
                  <button 
                    onClick={() => handleDelete(member.id)}
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
              <FaUserTie className="mx-auto text-4xl text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No faculty members found.</p>
              <p className="text-sm text-gray-400 mt-1">Add faculty details using the form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageFaculty;
