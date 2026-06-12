import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase/config';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FaUsers, FaImages, FaCalendarAlt, FaSignOutAlt, FaTachometerAlt, FaTrash, FaCheck, FaUserTie, FaCog, FaWhatsapp, FaPhoneAlt, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

import ManageGallery from './ManageGallery';
import ManageEvents from './ManageEvents';
import ManageFaculty from './ManageFaculty';
import ManageSettings from './ManageSettings';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ inquiries: 0, gallery: 0, events: 0 });
  const [inquiries, setInquiries] = useState([]);
  const [schoolLogo, setSchoolLogo] = useState('');
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'inquiries', 'gallery', 'events', 'faculty', 'settings'
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let unsubAdmissions, unsubGallery, unsubEvents, unsubSettings;

    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Setup Realtime Listeners
        const inqQuery = query(collection(db, 'admissions'), orderBy('createdAt', 'desc'));
        unsubAdmissions = onSnapshot(inqQuery, (snapshot) => {
          const inquiriesList = [];
          let newCount = 0;
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.status === 'New') newCount++;
            inquiriesList.push({ id: doc.id, ...data });
          });
          setInquiries(inquiriesList);
          setStats(prev => ({ ...prev, inquiries: newCount }));
        });

        unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
          setStats(prev => ({ ...prev, gallery: snapshot.size }));
        });

        unsubEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
          setStats(prev => ({ ...prev, events: snapshot.size }));
        });

        unsubSettings = onSnapshot(doc(db, 'settings', 'general'), (docSnap) => {
          if (docSnap.exists()) {
            setSchoolLogo(docSnap.data().logoUrl);
          }
        });

      } else {
        navigate('/admin');
      }
      setLoading(false);
    });

    return () => {
      unsubscribeAuth();
      if (unsubAdmissions) unsubAdmissions();
      if (unsubGallery) unsubGallery();
      if (unsubEvents) unsubEvents();
      if (unsubSettings) unsubSettings();
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success('Logged out');
      navigate('/admin');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await updateDoc(doc(db, 'admissions', id), {
        status: 'Read'
      });
      setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status: 'Read' } : inq));
      setStats(prev => ({ ...prev, inquiries: Math.max(0, prev.inquiries - 1) }));
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        const inqToDelete = inquiries.find(inq => inq.id === id);
        await deleteDoc(doc(db, 'admissions', id));
        setInquiries(inquiries.filter(inq => inq.id !== id));
        if (inqToDelete && inqToDelete.status === 'New') {
          setStats(prev => ({ ...prev, inquiries: Math.max(0, prev.inquiries - 1) }));
        }
        toast.success('Inquiry deleted');
      } catch (error) {
        toast.error('Failed to delete inquiry');
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="flex h-screen bg-gray-100 font-sans overflow-hidden w-full relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-blue-50 border-r border-blue-100 flex flex-col shadow-2xl lg:shadow-xl z-30 shrink-0 h-full`}>
        <div className="p-4 border-b border-blue-100 flex items-center justify-between shrink-0">
          <img src={schoolLogo || "https://res.cloudinary.com/ducxsgryc/image/upload/v1780933683/logo_pgqryv.png"} alt="Logo" className="h-16 lg:h-32 w-auto max-w-[150px] lg:max-w-full object-contain mix-blend-multiply" />
          <button className="lg:hidden text-gray-400 hover:text-red-500 p-2" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <button
            onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${activeTab === 'overview' ? 'bg-primary text-white shadow-md' : 'text-blue-900 hover:bg-blue-100/50 hover:text-primary'}`}
          >
            <FaTachometerAlt /> Dashboard
          </button>
          <button
            onClick={() => { setActiveTab('inquiries'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${activeTab === 'inquiries' ? 'bg-primary text-white shadow-md' : 'text-blue-900 hover:bg-blue-100/50 hover:text-primary'}`}
          >
            <FaUsers /> Inquiries {stats.inquiries > 0 && activeTab !== 'inquiries' && <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">{stats.inquiries}</span>}
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${activeTab === 'gallery' ? 'bg-primary text-white shadow-md' : 'text-blue-900 hover:bg-blue-100/50 hover:text-primary'}`}
          >
            <FaImages /> Manage Gallery
          </button>
          <button
            onClick={() => { setActiveTab('events'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${activeTab === 'events' ? 'bg-primary text-white shadow-md' : 'text-blue-900 hover:bg-blue-100/50 hover:text-primary'}`}
          >
            <FaCalendarAlt /> Manage Events
          </button>
          <button
            onClick={() => { setActiveTab('faculty'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${activeTab === 'faculty' ? 'bg-primary text-white shadow-md' : 'text-blue-900 hover:bg-blue-100/50 hover:text-primary'}`}
          >
            <FaUserTie /> Manage Faculty
          </button>

          <button
            onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 p-3 rounded-lg font-medium transition-all ${activeTab === 'settings' ? 'bg-primary text-white shadow-md' : 'text-blue-900 hover:bg-blue-100/50 hover:text-primary'}`}
          >
            <FaCog /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-blue-100 shrink-0">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 w-full p-3 rounded-lg transition-colors font-medium border border-red-100">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        <header className="bg-white shadow-sm p-4 px-4 lg:px-8 flex justify-between items-center z-10 border-b border-gray-200 shrink-0">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden text-gray-600 hover:text-primary p-1 bg-gray-100 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-800 font-heading capitalize">{activeTab}</h1>
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
              className="flex items-center gap-3 hover:bg-gray-50 p-1.5 rounded-full transition-colors focus:outline-none"
            >
              <div className="text-sm font-medium text-gray-600 hidden sm:block">{user?.email}</div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold shadow-sm">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </div>
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-100 shadow-xl rounded-xl z-50 overflow-hidden py-1 transform origin-top-right transition-all">
                <div className="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
                  <p className="text-xs text-gray-500 mb-0.5">Signed in as</p>
                  <p className="text-sm font-bold text-gray-900 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button 
                    onMouseDown={(e) => { e.preventDefault(); handleLogout(); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3 font-medium"
                  >
                    <FaSignOutAlt className="text-red-400" /> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 lg:p-8">

          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div onClick={() => setActiveTab('inquiries')} className="cursor-pointer bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">New Inquiries</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.inquiries}</p>
                  </div>
                  <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    <FaUsers />
                  </div>
                </div>

                <div onClick={() => setActiveTab('gallery')} className="cursor-pointer bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Gallery Images</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.gallery}</p>
                  </div>
                  <div className="w-14 h-14 bg-amber-50 text-secondary rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    <FaImages />
                  </div>
                </div>

                <div onClick={() => setActiveTab('events')} className="cursor-pointer bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                  <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">Upcoming Events</p>
                    <p className="text-3xl font-bold text-gray-800">{stats.events}</p>
                  </div>
                  <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center text-2xl shadow-sm">
                    <FaCalendarAlt />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <h3 className="text-xl font-bold text-dark font-heading mb-4">Welcome to Vedam Admin Dashboard</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">Use the sidebar to navigate between managing parent inquiries, uploading new photos to the gallery, and adding upcoming school events.</p>
              </div>
            </>
          )}

          {activeTab === 'inquiries' && (
            <>
              {/* Inquiries Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                  <h3 className="text-xl font-bold text-dark font-heading">Recent Admissions Inquiries</h3>
                  <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-xs font-bold">Real-time</span>
                </div>
                <div className="overflow-x-auto">
                  {inquiries.length > 0 ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                          <th className="p-4 font-semibold">Date</th>
                          <th className="p-4 font-semibold">Parent Name</th>
                          <th className="p-4 font-semibold">Contact Info</th>
                          <th className="p-4 font-semibold">Grade</th>
                          <th className="p-4 font-semibold">Message</th>
                          <th className="p-4 font-semibold">Status</th>
                          <th className="p-4 font-semibold text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
                        {inquiries.map((inq) => (
                          <tr key={inq.id} className={`hover:bg-blue-50/50 transition-colors ${inq.status === 'New' ? 'bg-blue-50/20' : ''}`}>
                            <td className="p-4 whitespace-nowrap">
                              {inq.createdAt?.toDate ? inq.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </td>
                            <td className="p-4 font-medium text-gray-900">{inq.parentName}</td>
                            <td className="p-4">
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center gap-3">
                                  <span className="text-gray-900 font-medium">{inq.phone}</span>
                                  <div className="flex gap-2">
                                    <a href={`https://wa.me/${inq.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="text-green-500 hover:text-green-600 bg-green-50 p-1 rounded transition-colors" title="Message on WhatsApp"><FaWhatsapp /></a>
                                    <a href={`tel:${inq.phone}`} className="text-blue-500 hover:text-blue-600 bg-blue-50 p-1 rounded transition-colors" title="Call Parent"><FaPhoneAlt /></a>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-gray-500 text-xs">{inq.email}</span>
                                  <a href={`mailto:${inq.email}?subject=Reply from Vedam International School`} className="text-gray-400 hover:text-gray-600 bg-gray-100 p-1 rounded transition-colors" title="Email Parent"><FaEnvelope size={10} /></a>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 whitespace-nowrap">
                              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium border border-gray-200">
                                {inq.grade}
                              </span>
                            </td>
                            <td className="p-4 max-w-xs truncate" title={inq.message}>{inq.message}</td>
                            <td className="p-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${inq.status === 'New' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                {inq.status || 'New'}
                              </span>
                            </td>
                            <td className="p-4 text-center whitespace-nowrap">
                              <div className="flex items-center justify-center gap-2">
                                {inq.status === 'New' && (
                                  <button onClick={() => handleMarkAsRead(inq.id)} className="p-2 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded transition-colors" title="Mark as Read">
                                    <FaCheck />
                                  </button>
                                )}
                                <button onClick={() => handleDelete(inq.id)} className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded transition-colors" title="Delete">
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="p-12 text-center text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 text-2xl mx-auto mb-4">
                        <FaUsers />
                      </div>
                      <p className="text-lg font-medium text-gray-600">No inquiries found</p>
                      <p className="text-sm mt-1">When parents fill out the admissions form, they will appear here.</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'gallery' && <ManageGallery />}
          {activeTab === 'events' && <ManageEvents />}
          {activeTab === 'faculty' && <ManageFaculty />}
          {activeTab === 'settings' && <ManageSettings />}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
