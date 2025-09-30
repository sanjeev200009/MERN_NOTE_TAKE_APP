import { PenSquare, Trash2 } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export const NoteCard = ({ note }) => {
  return (
    <div className="group cursor-pointer">
      <Link
        to={`/note/${note._id}`}
        className="block bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 
          rounded-2xl shadow-xl transition-all duration-300 
          border border-slate-700/50 overflow-hidden 
          transform hover:-translate-y-2 hover:scale-[1.02] relative"
      >
        {/* Top accent with animated gradient */}
        <div className="h-2 bg-gradient-to-r from-[#00FF9D] via-[#00E6B8] to-[#00D4AA] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
        </div>

        <div className="p-6 relative z-10">
          {/* Title without hover color */}
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
                {new Date(note.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
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
                  // Delete functionality here
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
