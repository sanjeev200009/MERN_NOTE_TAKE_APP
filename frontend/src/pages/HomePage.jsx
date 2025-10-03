import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import DisNote from '../components/DisNote'
import RateLimit from '../components/RateLimit'
import NoteNotFound from '../components/NoteNotFound'
import instance from '../lib/axios'
import { toast } from 'react-hot-toast'
const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const response = await instance.get('notes');
      console.log('Full response:', response.data);
      // Backend returns: { success: true, data: [...notes], count: number }
      setNotes(response.data.data || []);
      setIsRateLimited(false);
    } catch (error) {
      console.error("Error while fetching notes:", error);
        if(error.response?.status === 429) {
          setIsRateLimited(true);
        }else{
          toast.error("Something went wrong");
        }
    }finally{
      setLoading(false);
    }
  };

  const handleDeleteNote = (deletedNoteId) => {
    // Remove the deleted note from the state
    setNotes(prevNotes => prevNotes.filter(note => note._id !== deletedNoteId));
  };

  useEffect(() => {
    fetchNotes();
  }, []); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <Navbar />
      {isRateLimited && <RateLimit />}

      <div className='max-w-7xl mx-auto px-4 py-8 mt-6'>
        {loading && (
          <div className='text-center py-10'>
            <div className="loading loading-spinner loading-lg text-primary"></div>
            <p className="text-primary mt-4 text-lg">Loading your notes...</p>
          </div>
        )}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
              {notes.map((note) => (
                <DisNote key={note._id} note={note} onDelete={handleDeleteNote} />
              ))}
          </div>
        )}
        
        {!loading && notes.length === 0 && !isRateLimited && <NoteNotFound />}
      </div>
    </div>
  );
}

export default HomePage
