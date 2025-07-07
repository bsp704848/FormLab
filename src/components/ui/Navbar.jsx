import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

export default function Navbar() {
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full z-50 bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="max-w-7xl mx-auto px-1 sm:px-2 lg:px-3">
        <div className="flex justify-between h-16 items-center">

          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h1 className="font-black text-3xl sm:text-4xl text-blue-700 tracking-tight hover:text-blue-800 transition" style={{fontFamily:'MuseoModerno'}}>Formlab</h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <>
                <span className='text-gray-900 font-medium text-base'>Hello , {user.username}</span>
                <button onClick={logout} className='bg-blue-700 text-white px-4 py-2 rounded hover:bg-gray-900 font-medium'>Logout</button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-blue-700 hover:text-blue-900 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 font-medium shadow-sm transition"
                >
                  Register
                </Link>
              </>
            )}

          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-900 hover:text-gray-900 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-gray-100 to-gray-300 rounded-b-lg border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            {user ? (
              <>
                <span className='block text-gray-800 font-medium'>
                  Hello , <span className='font-semibold text-blue-700'>{user.username}</span>
                </span>
                <button onClick={() => {
                  logout();
                  setIsOpen(false)
                }} className='w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 font-semibold shadow-sm transition text-left'>Logout</button>

              </>
            ) : (
              <>

                <Link
                  to="/login"
                  className="block text-blue-600 hover:text-blue-800 font-medium transition"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 font-medium shadow-sm transition"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>

              </>
            )
            }
          </div>
        </div>
      )}
    </nav>
  );
}
