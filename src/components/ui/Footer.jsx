import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';


export default function Footer() {
  const navigate = useNavigate();

  return (

    <footer className="relative bg-gradient-to-r from-blue-200 to-blue-400  text-gray-800 md:pt-16 pt-32 pb-8 overflow-hidden min-h-[400px] md:min-h-0">


      <div className="absolute top-0 left-0 w-full rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-[110px]"
        >
          <defs>
            <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>
          </defs>
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="url(#footerGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex flex-col items-center md:items-start space-y-2 md:mb-0 min-w-[250px]">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}
            className="focus:outline-none"
          >
            <h1
              className="font-extrabold text-5xl text-blue-800 hover:cursor-pointer"
              style={{
                fontFamily: 'MuseoModerno',
                textShadow: `-0.0625em 0.0625em 0 black,-0.0875em 0.0875em 0 lightblue`
              }}
            >
              Formlab
            </h1>
          </button>
          <div className="mt-2 text-gray-900 text-sm text-center md:text-left w-full">
            1234 Innovation Drive, Suite 100,<br />
            Tech City, CA 90001, USA
          </div>
        </div>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-md font-bold md:mb-0 mt-4 md:mt-20 md:mr-28">

          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              navigate('/');
            }}
            className="hover:underline transition inline-block text-center hover:cursor-pointer"
          >
            Home
          </button>

          <Link
            to="/login"
            className="hover:underline transition inline-block text-center hover:cursor-pointer"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="hover:underline transition inline-block text-center hover:cursor-pointer"
          >
            Register
          </Link>
          <Link
            to="/formBuilder"
            className="hover:underline transition inline-block text-center hover:cursor-pointer"
          >
            Form Builder
          </Link>
        </div>

        <div className="flex space-x-4 pt-8">
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            <FaFacebook className="w-5 h-5" />
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-pink-500 transition"
          >
            <FaInstagram className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-sky-700 transition"
          >
            <FaTwitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-700 transition"
          >
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="relative z-10 pt-6 md:pt-12 text-center text-sm font-semibold text-gray-900">
        &copy; {new Date().getFullYear()} FormLab. All rights reserved.
      </div>
    </footer>

    

  );
}