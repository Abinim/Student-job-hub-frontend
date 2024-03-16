import axios from 'axios';

const baseURL = `${import.meta.env.VITE_STUDENT_JOB_HUNT_API}/api`;

const addEmployer = async employerData => {
  try {
    const response = await axios.post(
      `${baseURL}/employers`, // Updated URL here
      employerData
    );
    return response.data;
  } catch (error) {
    console.error('Error adding employer:', error);
    throw error;
  }
};

export { addEmployer };
