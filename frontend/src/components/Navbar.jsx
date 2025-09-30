import React from 'react'
import { Link } from 'react-router-dom'
import { Home, FileText, Plus, BookOpen } from 'lucide-react'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg border-b border-base-300">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl font-bold text-emerald-600 hover:text-emerald-700">
          <BookOpen className="w-6 h-6 mr-2" />
          MERN Notes
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          <li>
            <Link to="/" className="btn btn-ghost btn-sm hover:bg-emerald-50 hover:text-emerald-700">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/notes" className="btn btn-ghost btn-sm hover:bg-emerald-50 hover:text-emerald-700">
              <FileText className="w-4 h-4 mr-1" />
              All Notes
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="navbar-end">
        <Link to="/create" className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none btn-sm gap-2 shadow-md hover:shadow-lg transition-all duration-200">
          <Plus className="w-4 h-4" />
          Create Note
        </Link>
      </div>
      
      {/* Mobile menu */}
      <div className="navbar-start lg:hidden">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
          </label>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li>
              <Link to="/" className="flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/notes" className="flex items-center gap-2 hover:bg-emerald-50 hover:text-emerald-700">
                <FileText className="w-4 h-4" />
                All Notes
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar