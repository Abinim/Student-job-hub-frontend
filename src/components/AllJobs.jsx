import React, { useState, useEffect } from 'react';
import { Grid, Text, Box, Button } from '@chakra-ui/react';
import { allJobs } from '../api/jobsportal.api';
// import Jobs from './Job';

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);

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
            borderRadius='lg'
            overflow='hidden'
            p='20px'
            boxShadow='lg'
            margin='auto'
            mt='200px'
            bg='gray.100'
            backgroundColor='#f9f9f9'
          >
            <Text fontSize='xl' fontWeight='bold' color={'black'} mb={2}>
              {job.companyName}
            </Text>
            <Text fontSize='md' fontWeight='semibold' color={'black'} mb={2}>
              {job.address}
            </Text>
            <Text fontSize='md' color={'black'} mb={2}>
              Date: {new Date(job.date.from).toLocaleDateString()} to{' '}
              {new Date(job.date.to).toLocaleDateString()}
            </Text>
            <Text fontSize='md' color={'black'} mb={2}>
              Shift: {job.shift}
            </Text>
            <Text fontSize='md' color={'black'} mb={2}>
              Payment per Hour: ${job.paymentPerHour}
            </Text>
            <Text fontSize='md' color={'black'} mb={4}>
              Description: {job.description}
            </Text>
            <Button
              colorScheme='blue'
              color={'red'}
              onClick={() => handleApply(job._id)}
            >
              Apply
            </Button>
          </Box>
        ))
      ) : (
        <Text>No jobs available</Text>
      )}
      {/* <Jobs jobs={jobs} handleApply={handleApply} />{' '} */}
      {/* Render Jobs component outside the loop */}
    </Grid>
  );
};

export default AllJobs;
