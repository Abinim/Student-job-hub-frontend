import React, { useContext, useState } from 'react';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';
import { AuthContext } from '../context/auth.context';
import { addEmployer, addStudent } from '../api/jobsportal.api';
import { Navigate, useNavigate } from 'react-router-dom';

const Form = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    university: '',
    age: '',
    address: '',
    degree: '',
    experience: '',
    companyAddress: '',
    tripAdvisorRanking: '',
    restaurantTypes: [],
  });

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    const userCompleted = formData;
    userCompleted.userId = user._id;
    try {
      let response;
      if (userType === 'employer') {
        response = await addEmployer(userCompleted);
      } else {
        response = await addStudent(userCompleted);
      }

      if (response && response.data) {
        console.log('Operation successful:', response.data);
      } else {
        console.error('Error: Response or response.data is undefined');
      }

      if (userType === 'employer') {
        navigate('/new-job-form');
      } else {
        navigate('/all-jobs');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
      maxW='2xl'
      borderWidth='2px'
      borderRadius='xl'
      overflow='hidden'
      p={8}
      boxShadow='xl'
      margin='auto'
      mt={20}
      bg='gray.100'
    >
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Name'
            style={{ height: '30px', width: '200px' }}
          />
        </FormControl>
        {userType === 'employer' && (
          <>
            <FormControl isRequired>
              <FormLabel>Company Name</FormLabel>
              <Input
                type='text'
                name='companyName'
                value={formData.companyName}
                onChange={handleChange}
                placeholder='Company Name'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Company Address</FormLabel>
              <Input
                type='text'
                name='companyAddress'
                value={formData.companyAddress}
                onChange={handleChange}
                placeholder='Company Address'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>TripAdvisor Ranking</FormLabel>
              <Input
                type='number'
                name='tripAdvisorRanking'
                value={formData.tripAdvisorRanking}
                onChange={handleChange}
                placeholder='TripAdvisor Ranking'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Restaurant Types</FormLabel>
              <Input
                type='text'
                name='restaurantTypes'
                value={formData.restaurantTypes}
                onChange={handleChange}
                placeholder='Enter restaurant types separated by commas'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
          </>
        )}
        {userType === 'student' && (
          <>
            <FormControl isRequired>
              <FormLabel>University</FormLabel>
              <Input
                type='text'
                name='university'
                value={formData.university}
                onChange={handleChange}
                placeholder='University'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Age</FormLabel>
              <Input
                type='number'
                name='age'
                value={formData.age}
                onChange={handleChange}
                placeholder='Age'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Input
                type='text'
                name='address'
                value={formData.address}
                onChange={handleChange}
                placeholder='Address'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Degree</FormLabel>
              <Input
                type='text'
                name='degree'
                value={formData.degree}
                onChange={handleChange}
                placeholder='Degree'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Experience</FormLabel>
              <Input
                type='text'
                name='experience'
                value={formData.experience}
                onChange={handleChange}
                placeholder='Experience'
                style={{ height: '30px', width: '200px' }}
              />
            </FormControl>
          </>
        )}
        <Button
          type='submit'
          colorScheme='purple'
          size='lg'
          borderRadius='8px'
          width='100%'
          _hover={{ bg: 'purple.600' }}
          color={'red'}
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default Form;
