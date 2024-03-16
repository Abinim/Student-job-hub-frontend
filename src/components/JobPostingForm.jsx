// JobPostingForm.jsx
import React, { useState, useContext } from 'react';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    fromDate: '',
    toDate: '',
    shift: '',
    paymentPerHour: '',
    description: '',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(`/jobs`, formData);
      console.log(response.data);
    } catch (error) {
      console.error('Job posting failed:', error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        name='companyName'
        value={formData.companyName}
        onChange={handleChange}
        placeholder='Company Name'
        required
      />
      <input
        type='text'
        name='address'
        value={formData.address}
        onChange={handleChange}
        placeholder='Address'
        required
      />
      <input
        type='text'
        name='fromDate'
        value={formData.fromDate}
        onChange={handleChange}
        placeholder='From Date'
        required
      />
      <input
        type='text'
        name='toDate'
        value={formData.toDate}
        onChange={handleChange}
        placeholder='To Date'
        required
      />
      <input
        type='text'
        name='shift'
        value={formData.shift}
        onChange={handleChange}
        placeholder='Shift'
        required
      />
      <input
        type='number'
        name='paymentPerHour'
        value={formData.paymentPerHour}
        onChange={handleChange}
        placeholder='Payment Per Hour'
        required
      />
      <textarea
        name='description'
        value={formData.description}
        onChange={handleChange}
        placeholder='Description'
        required
      />
      <button type='submit'>Post Job</button>
    </form>
  );
};

export default JobPostingForm;
