/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import HeroImage from '../../assets/hero.svg';
import DragDropImage from '../../assets/dragdrop.svg';
import JsonImage from '../../assets/json.svg';
import HtmlImage from '../../assets/html.svg';
import IntegrationImage from '../../assets/integration.svg';
import useAuthStore from '../../store/authStore';

export default function Home() {
  const user = useAuthStore((state) => state.user)
  const navigate = useNavigate()
  return (
    <div>

      <section className="bg-gradient-to-r from-gray-100 to-gray-300 ">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-10 md:mb-0"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600 mb-6"
              style={{
                textShadow: `-0.0625em 0.0625em 0 white,-0.0875em 0.0875em 0 lightblue`
              }}>
              Build Dynamic Forms Effortlessly
            </h1>
            <p className="text-base sm:text-lg text-gray-900 mb-8">
              FormLab lets you create highly dynamic, drag-and-drop forms. Design complex forms visually without writing complex code. Fast, elegant, and intuitive.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate(user ? '/formBuilder' : '/login')}
                className="bg-blue-600 text-white px-4 py-2 text-sm sm:px-6 sm:py-3 sm:text-base rounded hover:bg-blue-700 font-medium hover:rounded-3xl transition-all duration-300 ease-in-out
"              >
                Get Started
              </button>


              {!user &&
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </Link>
              }
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="md:w-1/2 flex justify-center"
          >
            <img
              src={HeroImage}
              alt="Dynamic Form Builder"
              className="w-full max-w-md"
            />
          </motion.div>
        </div>
      </section>

      <section className=" bg-gradient-to-r from-gray-100 to-gray-300 ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-4"
        >
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-center text-blue-600 mb-12"
            style={{
                textShadow: `-0.0625em 0.0625em 0 black,-0.0875em 0.0875em 0 lightblue`
              }}>

            <Typewriter
              words={[
                'Why FormLab?',
                'Build Dynamic Forms Effortlessly.',
                'Drag & Drop Your Perfect Form.',
                'Export HTML or JSON Instantly.',
                'Fast. Flexible. FormLab.'
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={50}
              deleteSpeed={30}
              delaySpeed={2000}
            />
          </h2>
          <FeatureRow
            title="Drag & Drop Builder"
            desc="Effortlessly drag form fields, reorder sections, and create beautiful forms visually."
            img={DragDropImage}
            reverse={false}
          />

          <FeatureRow
            title="Dynamic Field Logic"
            desc="Add conditions to show/hide fields dynamically based on user input, without any complex code."
            img={IntegrationImage}
            reverse={true}
          />

          <FeatureRow
            title="Copy HTML Instantly"
            desc="Export your designed form as HTML with a single click and embed it into any website."
            img={HtmlImage}
            reverse={false}
          />

          <FeatureRow
            title="Copy JSON for Integration"
            desc="Copy JSON representations of your form for easy integration into any frontend or backend application."
            img={JsonImage}
            reverse={true}
          />
        </motion.div>
      </section>


    </div>
  );
}

function FeatureRow({ title, desc, img, reverse }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col md:flex-row items-center ${reverse ? 'md:flex-row-reverse' : ''
        }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2"
      >
        <img
          src={img}
          alt={title}
          className="w-full max-w-md mx-auto "
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 md:px-10 mt-6 md:mt-0"
      >
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-4"
          style={{
                textShadow: `-0.0625em 0.0625em 0 white,-0.0875em 0.0875em 0 lightblue`
              }}>

          {title}
        </h3>
        <p className="text-gray-900 text-base sm:text-lg">{desc}</p>

      </motion.div>
    </motion.div>
  );
}
