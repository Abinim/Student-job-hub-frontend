import React, { useEffect, useState } from 'react';
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
import { deleteJob, getJobById, updateJob } from '../api/jobsportal.api';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';

const EditJobForm = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [shift, setShift] = useState('');
  const [paymentPerHour, setPaymentPerHour] = useState('');
  const [description, setDescription] = useState('');

  const navigate = useNavigate();

  const { jobId } = useParams();

  const getJob = async () => {
    try {
      const response = await getJobById(jobId);
      setCompanyName(response.data.companyName);
      setAddress(response.data.address);
      setFromDate(
        moment(response.data.date.from).format('YYYY-MM-DD') +
          'T' +
          moment(response.data.date.from).format('HH:MM')
      );
      setToDate(
        moment(response.data.date.to).format('YYYY-MM-DD') +
          'T' +
          moment(response.data.date.to).format('HH:MM')
      );
      setShift(response.data.shift);
      setPaymentPerHour(response.data.paymentPerHour);
      setDescription(response.data.description);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(jobId);
      navigate('/MyJobs');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJob();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    const updatedJob = {
      _id: jobId,
      companyName,
      address,
      shift,
      date: { from: fromDate, to: toDate },
      paymentPerHour,
      description,
    };

    try {
      const response = await updateJob(updatedJob);
      console.log('Updated:', response.data);

      navigate('/my-jobs');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex
      align='center'
      justify='center'
      minH='100vh'
      bg='gray.50'
      px={{ base: '4', md: '8' }}
    >
      <Box
        style={{ borderRadius: '20px' }}
        maxW='xxxl'
        borderWidth='1px'
        borderRadius='xl'
        overflow='hidden'
        p={8}
        boxShadow='xxl'
        textAlign='center'
        position='absolute'
        top='50%'
        left='50%'
        bg='white'
        transform='translate(-50%, -50%)'
        zIndex='10'
      >
        <Heading as='h1' size='lg' color='purple' mb={4}>
          Edit Below here:
        </Heading>

        <form onSubmit={handleSubmit}>
          <FormControl id='companyName' mb={4}>
            <FormLabel color='black'>Company Name</FormLabel>
            <Input
              type='text'
              name='companyName'
              value={companyName}
              onChange={({ target }) => setCompanyName(target.value)}
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
              value={address}
              onChange={({ target }) => setAddress(target.value)}
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
              value={fromDate}
              onChange={({ target }) => setFromDate(target.value)}
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
              value={toDate}
              onChange={({ target }) => setToDate(target.value)}
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
              value={shift}
              onChange={({ target }) => setShift(target.value)}
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
              value={paymentPerHour}
              onChange={({ target }) => setPaymentPerHour(target.value)}
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
              value={description}
              onChange={({ target }) => setDescription(target.value)}
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
            Update
          </Button>
          <Button
            onClick={handleDelete}
            type='submit'
            colorScheme='purple'
            mt={20}
            size='lg'
            style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
            color={'red'}
          >
            Delete
          </Button>
        </form>
      </Box>
    </Flex>
  );
};

export default EditJobForm;
