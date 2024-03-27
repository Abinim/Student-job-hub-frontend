import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllJobs from './components/AllJobs';
import Login from './pages/Login';
import EmployerForm from './pages/EmployerForm';
import StudentForm from './pages/StudentForm';
import Signup from './pages/Signup';
import NewJobForm from './pages/NewJobForm';
import AppliedJobs from './components/AppliedJobs';
import AboutProject from './components/AboutProject';
import Map from './components/Map';

import './App.css';
import MyJobs from './components/MyJobs';
import EditJobForm from './components/EditJobForm';
import Footer from './components/Footer';
function App() {
  const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/all-jobs' element={<AllJobs />} />
        <Route path='/my-jobs' element={<MyJobs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/employer-form' element={<EmployerForm />} />
        <Route path='/student-form' element={<StudentForm />} />
        <Route path='/new-job-form' element={<NewJobForm />} />
        <Route path='/edit-jobs/:jobId' element={<EditJobForm />} />
        <Route path='/applied-jobs' element={<AppliedJobs />} />
        <Route path='/about-project' element={<AboutProject />} />
        <Route path='/map' element={<Map apiKey={apiKey} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
