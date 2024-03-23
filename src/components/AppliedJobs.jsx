import React, { useState, useEffect, useContext } from 'react';
import { Grid, Text, Box } from '@chakra-ui/react';
import { getAppliedJobs } from '../api/jobsportal.api';
import { AuthContext } from '../context/auth.context';

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await getAppliedJobs(user.jobId);
        if (!response || !response.data) {
          throw new Error('Failed to fetch applied jobs');
        }
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching applied jobs:', error.message);
      }
    };

    user && fetchAppliedJobs();
  }, [user]);

  return (
    <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={5} p={10}>
      {jobs.map(job => (
        <Box
          key={job._id}
          maxW='400px'
          mx='auto'
          borderWidth='1px'
          borderRadius='20'
          overflow='hidden'
          p='20px'
          boxShadow='lg'
          margin='auto'
          mt='200px'
          backgroundColor='#1D769A'
          _hover={{ bg: 'gray.200', boxShadow: 'xl' }}
        >
          <Text fontSize='25px' fontWeight='bold' color='white' mb={2}>
            {job.companyName}
          </Text>
          <Text fontSize='20px' fontWeight='bold' color='white' mb={2}>
            {job.address}
          </Text>
          <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
            Date: {new Date(job.date.from).toLocaleDateString()} to{' '}
            {new Date(job.date.to).toLocaleDateString()}
          </Text>
          <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
            Shift: {job.shift}
          </Text>
          <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
            Payment per Hour: ${job.paymentPerHour}
          </Text>
          <Text fontSize='md' fontWeight='bold' color='black' mb={4}>
            Description: {job.description}
          </Text>
        </Box>
      ))}
    </Grid>
  );
};

export default AppliedJobs;
