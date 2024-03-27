import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';

function Home() {
  return (
    <Box
      p='6'
      bg='transparent'
      margin='0 auto'
      borderRadius='50px'
      minHeight='100vh'
      pt='160px'
    >
      <Flex direction='column' alignItems='center'>
        <Box
          className='box-animation'
          bg='#ef476f'
          p='30px'
          borderRadius='20px'
          boxShadow='lg'
          mb='6'
        >
          <Heading as='h1' size='xl' textAlign='center' color='white'>
            Welcome to Our Student Jobs Portal
          </Heading>
          <Text fontSize='lg' textAlign='center' color='white'>
            We provide short-term and part-time job opportunities tailored for
            students.
          </Text>
        </Box>
        <Box
          className='box-animation'
          bg='#ffd166'
          p='30'
          margin={'50px'}
          borderRadius='20px'
          boxShadow='lg'
          mb='6'
        >
          <Heading as='h2' size='lg' color='white' mb='4'>
            Available Jobs
          </Heading>
          <Text color='white' fontSize='lg' mb='4'>
            Explore our latest job opportunities and kickstart your career!
          </Text>
          <Button
            as={RouterLink}
            to='/all-jobs'
            colorScheme='green'
            size='lg'
            mx='auto'
            display='block'
            color={'red'}
          >
            View Available Jobs
          </Button>
        </Box>
        <Box
          className='box-animation'
          bg='#06d6a0'
          p='20'
          margin={'50px'}
          borderRadius='20px'
          boxShadow='lg'
        >
          <Heading as='h2' size='lg' color='white' mb='4'>
            Our Projects
          </Heading>
          <Text color='white'>
            Explore further insights about our project. Simply click the link
            below for more information:
          </Text>

          <Button
            as={RouterLink}
            to='/about-project'
            colorScheme='teal'
            size='lg'
            mx='auto'
            display='block'
          >
            About Project
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}

export default Home;
