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
      gap={10}
      p={60}
      backgroundColor='#2b2d42'
      className='jobs-background'
    >
      {Array.isArray(jobs) && jobs.length > 0 ? (
        jobs.map((job, index) => (
          <Flex key={job._id} align='center' justify='center'>
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
              mt='180px'
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
              <Box fontSize='md' fontWeight='bold' color='white' mb={2}>
                <Text color='black'>Date:</Text>
                <Flex alignItems='center'>
                  <Text mx={2} color='white'>
                    <Text color='black'>
                      {new Date(job.date.from).toLocaleDateString([], {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      })}
                    </Text>
                    <Text color='black'> From: </Text>
                    <Text color='white'>
                      {new Date(job.date.from).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </Text>
                  <Text mx={20} color='white'>
                    <Text color='black'>
                      {new Date(job.date.to).toLocaleDateString([], {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                      })}
                    </Text>
                    <Text color='black'> To: </Text>
                    <Text color='white'>
                      {new Date(job.date.to).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </Text>
                </Flex>
              </Box>

              <Text fontSize='md' fontWeight='bold' color={'black'} mb={2}>
                Shift: {job.shift}
              </Text>
              <Text fontSize='md' fontWeight='bold' color={'black'} mb={2}>
                Payment per Hour: €{job.paymentPerHour}
              </Text>
              <Text fontSize='md' fontWeight='bold' color={'black'} mb={4}>
                Description: {job.description}
              </Text>
              <Button
                as={Link}
                to={`/edit-jobs/${job._id}`}
                type='submit'
                colorScheme='red'
                size='lg'
                borderRadius='8px'
                height={30}
                width='100%'
                _hover={{ bg: 'red.600', color: 'white' }}
                boxShadow='0px 4px 6px rgba(50, 50, 93, 0.11), 0px 1px 3px rgba(0, 0, 0, 0.08)'
                transition='all 0.25s'
                position='relative'
                overflow='hidden'
                outline='none'
                border='none'
                textDecoration='none'
                cursor='pointer'
                background='linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)'
                color='white'
              >
                <Flex alignItems='center' justify='center'>
                  <Text mr={2} fontWeight='bold'>
                    Edit
                  </Text>
                  <Box
                    w='10px'
                    h='10px'
                    bg='white'
                    transform='rotate(45deg)'
                    position='absolute'
                    top='-5px'
                    left='100%'
                    zIndex='1'
                    opacity='0'
                    transition='all 0.25s'
                  />
                </Flex>
              </Button>
            </Box>
          </Flex>
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
              {user
                ? "Currently you didn't post any jobs. Please check this page only if you've posted any jobs."
                : 'Access to this feature requires authentication. Please log in or sign up to proceed.'}
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
