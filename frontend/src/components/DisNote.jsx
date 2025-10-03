import { PenSquare, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import instance from "../lib/axios";
import { toast } from "react-hot-toast";


export const DisNote = ({ note, onDelete }) => {
  const deleteNote = async (noteId) => {
    if(!window.confirm("Are you sure you want to delete this note?")) return;
    
    try {
      await instance.delete(`/notes/${noteId}`);
      toast.success("Note deleted successfully!");
      
      // Call the parent callback to refresh the notes list
      if (onDelete) {
        onDelete(noteId);
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      
      // More specific error handling
      if (error.response?.status === 429) {
        toast.error("Too many requests. Please try again later.");
      } else if (error.response?.status === 404) {
        toast.error("Note not found.");
      } else {
        toast.error("Failed to delete note. Please try again.");
      }
    }
  };

  return (
    <div className="group cursor-pointer">
      <Link
        to={`/note/${note._id}`}
        className="block bg-gradient-to-br from-base-200 to-base-300
            rounded-2xl shadow-xl transition-all duration-500
            border border-primary/20 overflow-hidden 
            transform hover:-translate-y-3 hover:scale-[1.03] relative
            hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20"
      >
    
        <div className="h-3 bg-gradient-to-r from-primary to-secondary relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 opacity-80"></div>
        </div>

        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-base-content mb-3 leading-tight
                     group-hover:text-primary transition-colors duration-300">
            {note.title}
          </h3>

          {/* Content */}
          <p className="text-base-content/70 text-sm leading-relaxed mb-5 opacity-90
                      group-hover:text-base-content/80 transition-opacity duration-300">
            {note.content}
          </p>

          {/* Bottom section */}
          <div className="flex items-center justify-between pt-4 border-t border-primary/20 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-xs text-base-content/60 font-medium">
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
                className="btn btn-sm btn-ghost 
                  text-error hover:bg-error/20 
                  transition-all duration-200 
                  hover:scale-110"
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

        {/* Beautiful blue overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-primary via-secondary to-accent"></div>
        </div>
        
        {/* Subtle shine effect */}
        <div className="absolute top-0 left-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
        </div>
      </Link>
    </div>
  );
};

export default DisNote;
