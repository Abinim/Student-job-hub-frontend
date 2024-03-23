// AllJobs.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Grid, Text, Box, Button } from '@chakra-ui/react';
import {
  allJobs,
  applyJob,
  getAppliedJobs,
  unapplyJob,
} from '../api/jobsportal.api';
// import AppliedJobs from './AppliedJobs'; // Import AppliedJobs component
import { AuthContext } from '../context/auth.context';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await allJobs();
        if (!response) {
          throw new Error(`Failed to fetch jobs`);
        }

        console.log('Response data:', response.data);
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

      console.log('Response data:', response.data);
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
      await applyJob({ jobId: jobId, studentId: user._id });

      await fetchAppliedJobs();
    } catch (error) {
      console.log('error applying to job', error);
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

  return (
    <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={5} p={10}>
      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map(job => (
          <Box
            key={job._id}
            maxW='400px'
            mx='auto'
            borderWidth='1px'
            borderRadius='20px'
            overflow='hidden'
            p='20px'
            boxShadow='lg'
            margin='auto'
            mt='0'
            bg='gray.100'
            backgroundColor='#84a59d'
            marginBlock={0}
            padding={40}
            style={{ marginTop: '100px' }}
          >
            <Text fontSize='25px' fontWeight='bold' color={'#fcbf49'} mb={2}>
              {job.companyName}
            </Text>
            <Text fontSize='md' fontWeight='bold' color={'black'} mb={2}>
              {job.address}
            </Text>
            <Text fontSize='md' fontWeight='bold' color={'black'} mb={2}>
              Date: {new Date(job.date.from).toLocaleDateString()} to{' '}
              {new Date(job.date.to).toLocaleDateString()}
            </Text>
            <Text fontSize='md' fontWeight='bold' color={'black'} mb={2}>
              Shift: {job.shift}
            </Text>
            <Text fontSize='md' fontWeight='bold' color={'black'} mb={2}>
              Payment per Hour: ${job.paymentPerHour}
            </Text>
            <Text fontSize='md' fontWeight='bold' color={'black'} mb={4}>
              Description: {job.description}
            </Text>
            {appliedJobs.length &&
            appliedJobs.some(appliedJob => appliedJob._id === job._id) ? (
              <Button
                colorScheme='red'
                size='sm'
                onClick={() => handleCancel(job._id)}
              >
                Cancel
              </Button>
            ) : (
              <Button
                colorScheme='purple'
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
        <Box
          maxW='800px'
          borderWidth='4px'
          borderRadius='20px'
          overflow='hidden'
          p={40}
          boxShadow='lg'
          textAlign='center'
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          zIndex='10'
          backgroundColor='#ffba08'
        >
          <Text fontSize='20px' fontWeight='bold' color='white' mb={2}>
            To view available job listings, please log in to your account first.
            I appreciate your cooperation.
          </Text>
        </Box>
      )}
    </Grid>
  );
};

export default AllJobs;
