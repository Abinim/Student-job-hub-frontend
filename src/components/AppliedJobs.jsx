import React, { useState, useEffect, useContext } from 'react';
import { Grid, Text, Box, Button, Flex } from '@chakra-ui/react';
import { getAppliedJobs, unapplyJob } from '../api/jobsportal.api';
import { AuthContext } from '../context/auth.context';

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await getAppliedJobs(user._id);
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

  const handleCancel = async jobId => {
    try {
      await unapplyJob({ jobId: jobId, studentId: user._id });

      // After cancelling, refetch applied jobs to update the list
      const response = await getAppliedJobs(user._id);
      if (!response || !response.data) {
        throw new Error('Failed to fetch applied jobs');
      }
      setJobs(response.data);
    } catch (error) {
      console.log('error cancelling job application', error);
    }
  };
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
      gap={5}
      p={10}
      style={{
        backgroundImage:
          "url('https://www.wallpapers.net/web/wallpapers/download-3d-geometric-black-cube-wallpaper/2880x1800.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {user ? (
        jobs.map((job, index) => (
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
            backgroundColor='#f4a259'
            _hover={{ bg: 'gray.200', boxShadow: 'xl' }}
            bg={backgroundColors[index % backgroundColors.length]}
          >
            <Text fontSize='25px' fontWeight='bold' color='black' mb={2}>
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
            <Button
              colorScheme='red'
              size='lg'
              borderRadius='8px'
              height={30}
              width='100%'
              _hover={{ bg: 'red.600' }}
              onClick={() => handleCancel(job._id)}
            >
              Cancel
            </Button>
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
              "Access to this feature requires authentication. Please log in or
              sign up to proceed."
            </Text>
          </Box>
        </Flex>
      )}
    </Grid>
  );
};

export default AppliedJobs;
