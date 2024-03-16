import React, { useState, useEffect } from 'react';
import { Grid, Text, Button, Box } from '@chakra-ui/react';

const Home = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Response data:', data);
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <Grid templateColumns='1fr' gap={5} p={100}>
      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map(job => (
          <Box key={job._id} p={4} borderWidth='1px' borderRadius='md' mb={4}>
            <Text fontSize='xl'>{job.companyName}</Text>
            <Text fontSize='md' mt={2}>
              {job.address}
            </Text>
            <Text mt={2}>{job.description}</Text>
          </Box>
        ))
      ) : (
        <Text>Welcome to the JobHunt zone</Text>
      )}
    </Grid>
  );
};

export default Home;
