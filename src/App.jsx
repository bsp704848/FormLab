import React from 'react';
import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/ui/MainLayout';
import Home from './components/Pages/Homepage';
import Login from './components/Pages/LoginPage';
import Register from './components/Pages/RegisterPage';
import { Toaster } from 'react-hot-toast'
import FormBuilder from './components/builder/FormBuilder'
import MyForms from './components/ui/MyForms';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route
          path="/myForms"
          element={
            <ProtectedRoute>
              <MainLayout>
                <MyForms />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/formBuilder"
          element={
            <ProtectedRoute>
              <FormBuilder />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<ProtectedRoute guestOnly={true}><Login /></ProtectedRoute>} />
        <Route path="/register" element={<ProtectedRoute guestOnly={true}><Register /></ProtectedRoute>} />

      </Routes>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            color: 'white',
          },
          success: {
            style: {
              background: '#40D734',
            },
          },
          error: {
            style: {
              background: '#E0452C',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
