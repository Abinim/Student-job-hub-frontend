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

import './App.css';
import MyJobs from './components/MyJobs';
import EditJobForm from './components/EditJobForm';

function App() {
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
      </Routes>
    </div>
  );
}

export default App;
