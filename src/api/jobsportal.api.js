import axios from 'axios';
const baseURL = `${import.meta.env.VITE_STUDENT_JOB_HUNT_API}/api`;

const setAuthorizationHeaders = () => {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  });
};

setAuthorizationHeaders();

export const addEmployer = employer => {
  return axios.post(`${baseURL}/employers`, employer);
};

export const addStudent = student => {
  return axios.post(`${baseURL}/students`, student);
};

export const allJobs = () => {
  return axios.get(`${baseURL}/jobs`);
};

export const myJobs = companyName => {
  return axios.get(`${baseURL}/my-jobs/${companyName}`);
};

export const getAppliedJobs = studentId => {
  return axios.get(`${baseURL}/applied-jobs/${studentId}`);
};

export const applyJob = job => {
  return axios.post(`${baseURL}/jobs/apply/${job.jobId}`, job);
};

export const unapplyJob = job => {
  return axios.post(`${baseURL}/jobs/unapply/${job.jobId}`, job);
};

export const getJob = id => {
  return axios.get(`${baseURL}/jobs/${id}`);
};

export const addJob = job => {
  return axios.post(`${baseURL}/jobs`, job);
};

export const updateJob = updatedJob => {
  return axios.put(`${baseURL}/jobs/${updatedJob._id}`, updatedJob);
};

export const deleteJob = id => {
  return axios.delete(`${baseURL}/jobs/${id}`);
};

export const getJobById = async jobId => {
  return axios.get(`${baseURL}/jobs/${jobId}`);
};
