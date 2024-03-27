import React, { useState, useEffect, useContext } from 'react';
import { Grid, Text, Box, Button, Flex } from '@chakra-ui/react';
import { myJobs } from '../api/jobsportal.api';
import { AuthContext } from '../context/auth.context';
import { Link } from 'react-router-dom';

// import Jobs from './Job';

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await myJobs(user.companyName);
        if (!response) {
          throw new Error(`Failed to fetch jobs`);
        }
        console.log('Response data:', response.data);
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error.message);
      }
    };

    user && fetchJobs();
  }, [user]);

  const handleApply = jobId => {
    console.log(`Applying for job with ID ${jobId}`);
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
      backgroundColor='#2b2d42'
      style={{
        backgroundImage:
          "url('https://wallpapercrafter.com/desktop3/935559-cube-play-random-luck-points-numbers-eyes-magic.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {Array.isArray(jobs) && jobs.length > 0 ? (
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
            backgroundColor='#06d6a0'
            _hover={{ bg: 'gray.200', boxShadow: 'xl' }}
            bg={backgroundColors[index % backgroundColors.length]}
          >
            <Text fontSize='25px' fontWeight='bold' color={'black'} mb={2}>
              {job.companyName}
            </Text>
            <Text fontSize='20px' fontWeight='bold' color={'white'} mb={2}>
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
            <Button
              as={Link}
              to={`/edit-jobs/${job._id}`}
              type='submit'
              colorScheme='purple'
              mt={20}
              size='lg'
              style={{
                fontSize: '20px',
                padding: '1px',
                borderRadius: '8px',
              }}
              color={'red'}
              bg='purple.500'
              _hover={{ bg: 'purple.600' }}
            >
              Edit
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
      {/* <Jobs jobs={jobs} handleApply={handleApply} />{' '} */}
      {/* Render Jobs component outside the loop */}
    </Grid>
  );
};

export default MyJobs;
