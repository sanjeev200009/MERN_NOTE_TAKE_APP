import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import instance from "../lib/axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import RateLimitedUI from "../components/RateLimitedUi";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    if(!title.trim() || !content.trim()){
      toast.error("Title and Content cannot be empty");
      setLoading(false);
      return;
    }

  setLoading(true);
  
    try {
      const postData = await instance.post('notes', {
        title,
        content
      });
      console.log("Note saved successfully:", postData.data);
      toast.success("Note created successfully!");
      // Redirect to home page after successful creation
      navigate('/');
    } catch (error) {
      console.error("Error while creating note:", error);
      if (error.response?.status === 429) {
        setIsRateLimited(true);
        toast.error("slow down you are creating notes too fast",{
          duration: 4000,
          icon: '⚠️',
        });
      } else {
        toast.error("Something went wrong while creating the note");
      }
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="min-h-screen bg-slate-800">
      <div className="container mx-auto px-4 py-8">
           <div className="max-w-2xl mx-auto">
                 <Link to={"/"} className="btn btn-ghost mb-6 text-white hover:text-[#0d9b65] hover:bg-slate-700/50">
                 <ArrowLeftIcon className="size-5" />
                 Back to notes
                 </Link>
                 
                 {/* Rate Limited Message */}
               {isRateLimited && <RateLimitedUI />}
                 
                 {/* Create Note Form */}
                 <div className="bg-slate-900 rounded-2xl shadow-xl border border-white overflow-hidden">
                   {/* Top accent bar to match NoteCard */}
                   <div className="h-2 bg-[#0d9b65] relative"></div>
                   
                   <div className="p-8">
                     <h2 className="text-2xl font-bold text-white mb-8">Create New Note</h2>
                     
                     <form onSubmit={handleSubmit}>
                       {/* Title Input */}
                       <div className="mb-6">
                         <label className="block text-white font-semibold mb-3">
                           Title
                         </label>
                         <input 
                           type="text" 
                           placeholder="Enter note title..." 
                           className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#0d9b65] focus:ring-1 focus:ring-[#0d9b65] transition-colors" 
                           value={title}
                           onChange={(e) => setTitle(e.target.value)}
                         />
                       </div>
                       
                       {/* Content Textarea */}
                       <div className="mb-8">
                         <label className="block text-white font-semibold mb-3">
                           Content
                         </label>
                         <textarea 
                           className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#0d9b65] focus:ring-1 focus:ring-[#0d9b65] transition-colors h-32 resize-none" 
                           placeholder="Write your note content here..."
                           value={content}
                           onChange={(e) => setContent(e.target.value)}
                         ></textarea>
                       </div>
                       
                       {/* Submit Button */}
                       <div className="flex justify-end">
                         <button 
                           type="submit" 
                           className={`px-6 py-3 bg-[#0d9b65] hover:bg-[#0b8555] text-white font-semibold rounded-xl transition-all duration-200 ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-105'}`}
                           disabled={loading}
                         >
                           {loading ? 'Creating...' : 'Create Note'}
                         </button>
                       </div>
                     </form>
                   </div>
                 </div>
           </div>
      </div>
    </div>
  )
}

export default CreatePage