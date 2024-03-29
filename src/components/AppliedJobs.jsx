import React, { useState, useEffect, useContext } from 'react';
import { Grid, Text, Box, Button, Flex } from '@chakra-ui/react';
import { getAppliedJobs, unapplyJob } from '../api/jobsportal.api';
import { AuthContext } from '../context/auth.context';

const AppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await getAppliedJobs(user._id);
        if (!response || !response.data) {
          throw new Error('Failed to fetch applied jobs');
        }
        setJobs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applied jobs:', error.message);
        setLoading(false);
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
      pb={300}
      style={{
        backgroundImage:
          "url('https://www.wallpapers.net/web/wallpapers/download-3d-geometric-black-cube-wallpaper/2880x1800.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {user ? (
        loading ? (
          <Text>Loading...</Text>
        ) : jobs.length > 0 ? (
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
              <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
                Shift: {job.shift}
              </Text>
              <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
                Payment per Hour: €{job.paymentPerHour}
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
                _hover={{ bg: 'red.600', color: 'white' }}
                boxShadow='0px 4px 6px rgba(50, 50, 93, 0.11), 0px 1px 3px rgba(0, 0, 0, 0.08)'
                transition='all 0.25s'
                position='relative'
                overflow='hidden'
                outline='none'
                border='none'
                cursor='pointer'
                background='linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)'
                color='white'
                onClick={() => handleCancel(job._id)}
              >
                <Flex alignItems='center' justify='center'>
                  <Text mr={2} fontWeight='bold'>
                    Cancel
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
              maxW='400px'
              borderWidth='1px'
              borderRadius='20px'
              overflow='hidden'
              p='20px'
              boxShadow='lg'
              backgroundColor='white'
              textAlign='center'
            >
              <Text fontSize='xl' fontWeight='bold' color='red.500' mb={4}>
                Currently, you haven't applied to any jobs.
              </Text>
              <Text fontSize='md' color='gray.700' mb={4}>
                "Please apply first to view the available jobs here."
              </Text>

              {/* You can add additional content or actions here */}
            </Box>
          </Flex>
        )
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
