import React, { useState, useEffect, useContext } from 'react';
import { Grid, Text, Box, Button, Flex } from '@chakra-ui/react';
import {
  allJobs,
  applyJob,
  getAppliedJobs,
  unapplyJob,
} from '../api/jobsportal.api';
import { AuthContext } from '../context/auth.context';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await allJobs();
        if (!response) {
          throw new Error(`Failed to fetch jobs`);
        }
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const response = await getAppliedJobs(user._id);
      if (!response) {
        throw new Error(`Failed to fetch applied jobs`);
      }
      setAppliedJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
    }
  };

  useEffect(() => {
    try {
      if (user) {
        fetchAppliedJobs();
      }
    } catch (error) {}
  }, [user]);

  const handleApply = async jobId => {
    try {
      if (!user || !user._id) {
        console.log('User is not logged in');
        setErrorMessage(
          'Access to this feature requires authentication. Please log in or sign up to proceed.'
        );
        return;
      }

      console.log('Attempting to apply for job with ID:', jobId);
      await applyJob({ jobId: jobId, studentId: user._id });
      await fetchAppliedJobs();
    } catch (error) {
      console.log('Error applying to job:', error);
    }
  };

  const handleCancel = async jobId => {
    try {
      await unapplyJob({ jobId: jobId, studentId: user._id });
      await fetchAppliedJobs();
    } catch (error) {
      console.log('error unapplying to job', error);
    }
  };

  // Predefined array of background colors
  const backgroundColors = [
    '#ef476f',
    '#ffd166',
    '#06d6a0',
    '#99c1b9',
    '#8e7dbe',
  ];

  return (
    <Grid
      templateColumns='repeat(auto-fit, minmax(300px, 1fr))'
      gap={50}
      p={100}
    >
      {errorMessage && (
        <Box
          maxW='800px'
          borderWidth='4px'
          borderRadius='20px'
          overflow='hidden'
          p={30}
          boxShadow='lg'
          textAlign='center'
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex='10'
          bg='white'
        >
          <Text fontSize='2xl' fontWeight='bold' color='red' mb={4}>
            {errorMessage}
          </Text>
          <Button
            colorScheme='red'
            size='lg'
            borderRadius='8px'
            _hover={{ bg: 'red.600' }}
            onClick={() => setErrorMessage('')}
          >
            Cancel
          </Button>
        </Box>
      )}

      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map((job, index) => (
          <Box
            key={job._id}
            mx='auto'
            borderWidth='1px'
            borderRadius='20px'
            overflow='hidden'
            p='20px'
            boxShadow='lg'
            margin='auto'
            mt='0'
            marginBlock={0}
            padding={40}
            style={{ marginTop: '40px' }}
            bg={backgroundColors[index % backgroundColors.length]} // Assigning background color based on index
            // Increased padding for better spacing
          >
            <Text fontSize='25px' fontWeight='bold' color='#310a31' mb={2}>
              {job.companyName}
            </Text>
            <Text fontSize='20px' fontWeight='bold' color='white' mb={4}>
              {job.address}
            </Text>
            <Text fontSize='20px' fontWeight='bold' color='white' mb={2}>
              Date: {new Date(job.date.from).toLocaleDateString()} to{' '}
              {new Date(job.date.to).toLocaleDateString()}
            </Text>
            <Text fontSize='20px' fontWeight='bold' color='white' mb={2}>
              Shift: {job.shift}
            </Text>
            <Text fontSize='20px' fontWeight='bold' color='white' mb={2}>
              Payment per Hour: ${job.paymentPerHour}
            </Text>
            <Text fontSize='20px' fontWeight='bold' color='white' mb={4}>
              Description: {job.description}
            </Text>
            {appliedJobs.length &&
            appliedJobs.some(appliedJob => appliedJob._id === job._id) ? (
              <Button
                colorScheme='purple'
                fontWeight='bold'
                size='lg'
                borderRadius='8px'
                height={30}
                width='100%'
                _hover={{ bg: 'purple.600' }}
                color={'red'}
                onClick={() => handleCancel(job._id)}
              >
                Cancel
              </Button>
            ) : (
              <Button
                colorScheme='purple'
                fontWeight='bold'
                size='lg'
                borderRadius='8px'
                height={30}
                width='100%'
                _hover={{ bg: 'purple.600' }}
                color={'red'}
                onClick={() => handleApply(job._id)}
              >
                Apply
              </Button>
            )}
          </Box>
        ))
      ) : (
        <Flex
          align='center'
          justify='center'
          minH='100vh'
          bg='gray.50'
          px={{ base: '4', md: '8' }}
        >
          <Box
            maxW='800px'
            borderWidth='4px'
            borderRadius='20px'
            overflow='hidden'
            p={8}
            boxShadow='lg'
            textAlign='center'
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            zIndex='10'
            bg='#ffba08'
          >
            <Text fontSize='2xl' fontWeight='bold' color='white' mb={4}>
              To view available job listings, please log in to your account
              first. I appreciate your cooperation.
            </Text>
          </Box>
        </Flex>
      )}
    </Grid>
  );
};

export default AllJobs;
