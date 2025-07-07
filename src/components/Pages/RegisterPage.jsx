import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeOff, CircleAlert } from 'lucide-react';
import axios from 'axios';
import LoginImage from '../../assets/login.svg';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/ui/Loader';
import { Tooltip } from 'react-tooltip';

const RegisterSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    'Invalid email format'
  ).required('Email is required'),
  password: Yup.string().matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
    'Password must be at least 10 characters and include uppercase, lowercase, number, and special character'
  ).required('Password is required'),
});

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    setLoading(true) 
    await new Promise((resolve) => setTimeout(resolve, 300));

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, values);
      console.log(response.data);
      toast.success('Registered successfully!');
      resetForm();

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Registration failed');
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {loading && <Loader />}
      <Link to="/"  className="hidden md:block absolute top-4 left-4">
        <h1 className='font-bold text-5xl text-blue-800'
          style={{
                  fontFamily: 'MuseoModerno',
                  textShadow: `-0.0625em 0.0625em 0 black,-0.0875em 0.0875em 0 lightblue`
                }}>FL</h1>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="hidden md:flex justify-center items-center p-8">
          <img src={LoginImage} alt="Auth" className="max-h-[500px] w-auto object-contain mb-8" />
        </div>

        <div className="flex flex-col justify-center items-center h-full p-8">

        <div className="block md:hidden mb-8">
    <Link to="/">
              <h1 className="text-5xl font-bold text-blue-800 text-center animate-bounce bg-white rounded-full p-2"
                style={{
                  fontFamily: 'MuseoModerno',
                  textShadow: `-0.0625em 0.0625em 0 black,-0.0875em 0.0875em 0 lightblue`
                }}>
        FL
      </h1>
    </Link>
  </div>
          <div className="max-w-md w-full">
            <Formik
              initialValues={{ username: '', email: '', password: '' }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
              validateOnChange={true}
              validateOnBlur={true}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label className="block mb-1 font-medium">Username</label>
                    <Field name="username" className="w-full border border-gray-300 p-2 rounded" />
                    <ErrorMessage name="username" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium">Email</label>
                    <Field name="email" type="email" className="w-full border border-gray-300 p-2 rounded" />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div className="relative">
                    <label className="flex items-center gap-2 mb-1 font-medium">
                      Password
                      <CircleAlert
                        className="h-5 w-5 text-orange-700 cursor-pointer"
                        data-tooltip-id="passwordTooltip"
                      />
                    </label>
                    <Tooltip
                      id="passwordTooltip"
                      place="top"
                      variant="info"
                      content="Password must be at least 10 characters and include uppercase, lowercase, number, and special character."
                      style={{
                        fontSize: "12px",
                        padding: "16px",
                        maxWidth: "200px",
                        borderRadius: "25px 10px 25px 10px",
                        backgroundColor: "#1e40af",
                        color: "white"
                      }}
                    />

                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      maxLength={10}
                      className="w-full border border-gray-300 p-2 rounded pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-9 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div>
                    <p>
                      Already registered?{' '}
                      <Link to="/login" className="text-blue-500">
                        Login
                      </Link>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
