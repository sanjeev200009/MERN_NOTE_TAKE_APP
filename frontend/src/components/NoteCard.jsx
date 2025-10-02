import { PenSquare, Trash2 } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import instance from "../lib/axios";
import { toast } from "react-hot-toast";


export const NoteCard = ({ note, onDelete }) => {
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
        className="block bg-base-200 
            rounded-2xl shadow-xl transition-all duration-300 
            border border-base-300 overflow-hidden 
            transform hover:-translate-y-2 hover:scale-[1.02] relative
            hover:border-primary/30"
      >
    
        <div className="h-2 bg-primary relative">
        </div>

        <div className="p-6 relative z-10">
          <h3 className="text-xl font-bold text-base-content mb-3 leading-tight">
            {note.title}
          </h3>

          {/* Content */}
          <p className="text-base-content/70 text-sm leading-relaxed mb-5 opacity-90">
            {note.content}
          </p>

          {/* Bottom section */}
          <div className="flex items-center justify-between pt-4 border-t border-base-300/50 backdrop-blur-sm">
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
                  text-primary hover:bg-primary/20 
                  transition-all duration-200 
                  hover:scale-110"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Edit functionality here
                }}
              >
                <PenSquare className="h-4 w-4" />
              </button>
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

        {/* Subtle overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="w-full h-full bg-gradient-to-br from-transparent via-[#00FF9D]/10 to-transparent"></div>
        </div>
      </Link>
    </div>
  );
};

export default NoteCard;
