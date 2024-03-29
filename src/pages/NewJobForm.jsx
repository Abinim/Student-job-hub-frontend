import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addJob } from '../api/jobsportal.api';

import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Flex,
} from '@chakra-ui/react';
import { AuthContext } from '../context/auth.context';

const NewJobForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    fromDate: '',
    toDate: '',
    shift: '',
    paymentPerHour: '',
    description: '',
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      setFormData({
        companyName: user.companyName || '',
        address: user.companyAddress || '',
        fromDate: '',
        toDate: '',
        shift: '',
        paymentPerHour: '',
        description: '',
      });
    }
  }, [user]);

  const handleEditButtonClick = () => {
    navigate('/');
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Frontend Changes
  const handleSubmit = async e => {
    e.preventDefault();
    const jobPosting = {
      ...formData,

      fromDate: formData.fromDate + ':00',
      toDate: formData.toDate + ':00',
    };
    try {
      const response = await addJob(jobPosting);
      console.log('Job created:', response.data);
      navigate('/my-jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <Flex
      align='center'
      justify='center'
      minH='100vh'
      bg='gray.50'
      px={{ base: '4', md: '8' }}
      p='35'
    >
      <Box
        style={{ borderRadius: '20px' }}
        borderWidth='100px'
        borderRadius='xl'
        overflow='hidden'
        p={25}
        boxShadow='xxl'
        textAlign='center'
        position='absolute'
        top='50%'
        left='50%'
        bg='#F8F9FA'
        transform='translate(-50%, -50%)'
        zIndex='10'
        maxW='400px'
      >
        <Heading as='h1' size='lg' color='purple' mb={4}>
          Create New Job
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id='companyName' mb={4}>
            <FormLabel color='black'>Company Name</FormLabel>
            <Input
              type='text'
              name='companyName'
              value={formData.companyName}
              onChange={handleInputChange}
              required
              variant='filled'
              colorScheme='purple'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <FormControl id='address' mb={4}>
            <FormLabel color='black'>Address</FormLabel>
            <Input
              type='text'
              name='address'
              value={formData.address}
              onChange={handleInputChange}
              required
              variant='filled'
              colorScheme='purple'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <FormControl id='fromDate' mb={4}>
            <FormLabel color='black'>From Date</FormLabel>
            <Input
              type='datetime-local'
              name='fromDate'
              value={formData.fromDate}
              onChange={handleInputChange}
              required
              variant='filled'
              colorScheme='purple'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <FormControl id='toDate' mb={4}>
            <FormLabel color='black'>To Date</FormLabel>
            <Input
              type='datetime-local'
              name='toDate'
              value={formData.toDate}
              onChange={handleInputChange}
              required
              variant='filled'
              colorScheme='purple'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>

          <FormControl id='shift' mb={4}>
            <FormLabel color='black'>Shift</FormLabel>
            <Input
              type='text'
              name='shift'
              value={formData.shift}
              onChange={handleInputChange}
              required
              variant='filled'
              colorScheme='purple'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <FormControl id='paymentPerHour' mb={4}>
            <FormLabel color='black'>Payment Per Hour</FormLabel>
            <Input
              type='number'
              name='paymentPerHour'
              value={formData.paymentPerHour}
              onChange={handleInputChange}
              required
              variant='filled'
              colorScheme='purple'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <FormControl id='description' mb={4}>
            <FormLabel color='black'>Description</FormLabel>
            <Textarea
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              required
              variant='filled'
              colorScheme='purple'
              style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            />
          </FormControl>
          <Button
            type='submit'
            colorScheme='purple'
            mt={20}
            size='lg'
            style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            color={'red'}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default NewJobForm;
