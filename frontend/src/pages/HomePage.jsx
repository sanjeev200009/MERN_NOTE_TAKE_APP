import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import NoteCard from '../components/NoteCard.JSX'
import RateLimitedUI from '../components/RateLimitedUi'
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
    <div className="min-h-screen bg-base-100">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto px-4 py-8 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading...</div>}

        {!loading && notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20'>
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={handleDeleteNote} />
              ))}
          </div>
        )}
        
        {!loading && notes.length === 0 && !isRateLimited && <NoteNotFound />}
      </div>
    </div>
  );
}

export default HomePage
