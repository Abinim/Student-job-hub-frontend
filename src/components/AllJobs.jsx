// AllJobs.jsx
import React, { useState, useEffect } from 'react';
import { Grid, Text, Box, Button } from '@chakra-ui/react';
import { allJobs } from '../api/jobsportal.api';
import AppliedJobs from './AppliedJobs'; // Import AppliedJobs component

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(() => {
    // Retrieve applied jobs from local storage on component mount
    const storedJobs = localStorage.getItem('appliedJobs');
    return storedJobs ? JSON.parse(storedJobs) : [];
  });

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

  const handleApply = jobId => {
    console.log(`Applying for job with ID ${jobId}`);
    const appliedJob = jobs.find(job => job._id === jobId);
    setAppliedJobs(prevState => [...prevState, appliedJob]);
    // Store applied jobs in local storage
    localStorage.setItem(
      'appliedJobs',
      JSON.stringify([...appliedJobs, appliedJob])
    );
  };

  const handleCancel = jobId => {
    console.log(`Cancelling application for job with ID ${jobId}`);
    setAppliedJobs(prevState => prevState.filter(job => job._id !== jobId));
    // Update local storage after canceling the application
    const updatedAppliedJobs = appliedJobs.filter(job => job._id !== jobId);
    localStorage.setItem('appliedJobs', JSON.stringify(updatedAppliedJobs));
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
            backgroundColor='#6B6F4B'
            marginBlock={0}
            padding={40}
            style={{ marginTop: '100px' }}
          >
            <Text fontSize='25px' fontWeight='bold' color={'white'} mb={2}>
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
            {appliedJobs.some(appliedJob => appliedJob._id === job._id) ? (
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
        <Text>No jobs available</Text>
      )}
      {/* Render AppliedJobs component passing appliedJobs and handleCancel */}
      <AppliedJobs appliedJobs={appliedJobs} handleCancel={handleCancel} />
    </Grid>
  );
};

export default AllJobs;
