import { PenSquare, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import instance from "../lib/axios";
import { toast } from "react-hot-toast";


export const NoteCard = ({ note }) => {

  
  const deleteNote = async (e, noteId) => {
    if(!window.confirm("Are you sure to delete this note ")) return;
    try {
      await instance.delete(`notes/${noteId}`);
      // Optionally, you can add a callback to refresh the notes list after deletion
    } catch (error) {
      console.error("Error deleting note:", error);
      // Handle error (e.g., show a toast notification)
    }
  };

  return (
    <div className="group cursor-pointer">
      <Link
        to={`/note/${note._id}`}
        className="block bg-slate-900 
            rounded-2xl shadow-xl transition-all duration-300 
            border border-white overflow-hidden 
            transform hover:-translate-y-2 hover:scale-[1.02] relative"
      >
    
        <div className="h-2 bg-[#0d9b65] relative">
        </div>

        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-white mb-3 leading-tight">
            {note.title}
          </h3>

          {/* Content */}
          <p className="text-gray-300 text-sm leading-relaxed mb-5 opacity-90">
            {note.content}
          </p>

          {/* Bottom section */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-600/50 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00FF9D] rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-400 font-medium">
                {new Date(note.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
              <button
                className="p-2 rounded-xl bg-[#00FF9D]/10 hover:bg-[#00FF9D]/20 
                  text-[#00FF9D] transition-all duration-200 
                  hover:scale-110 border border-[#00FF9D]/20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Edit functionality here
                }}
              >
                <PenSquare className="h-4 w-4" />
              </button>
              <button
                className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 
                  text-red-400 transition-all duration-200 
                  hover:scale-110 border border-red-500/20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  deleteNote(note._id);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-[#00FF9D]/10 to-transparent"></div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
