import React from 'react';
import axios from 'axios';

const DeleteJob = ({ jobId }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/jobs/${jobId}`);
      console.log('Job deleted:', response.data);
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  return <button onClick={handleDelete}>Delete Job</button>;
};

export default DeleteJob;
