import React, { useState, useEffect } from 'react';
import { Grid, Text, Button, Box } from '@chakra-ui/react';
import axios from 'axios';

const AllJobsWithEditButton = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/api/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  const handleEditButtonClick = jobId => {
    console.log('Edit job:', jobId);
  };

  return (
    <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={5} p={10}>
      {jobs.map(job => (
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
          mt='20px'
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
            Date: {job.date.from} to {job.date.to}
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
            onClick={() => handleEditButtonClick(job._id)}
          >
            Edit
          </Button>
        </Box>
      ))}
    </Grid>
  );
};

export default AllJobsWithEditButton;
