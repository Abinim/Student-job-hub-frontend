import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';

const AboutProject = () => {
  return (
    <Box
      className='box-animation'
      p='6'
      bg='transparent'
      margin='0 auto'
      borderRadius='50px'
      minHeight='100vh'
      pt='135px'
    >
      <Flex direction='column' alignItems='center'>
        <Box
          bg='#f6bd60'
          p='30px'
          borderRadius='20px'
          boxShadow='lg'
          mb='20'
          maxW='800px'
          color='white'
          textAlign='center'
        >
          <Heading textColor={'red'} as='h1' size='lg' mb='10'>
            Benefits for Students
          </Heading>
          <Text textColor={'black'} fontSize='lg' mb='4'>
            This project offers numerous benefits for students. With flexible
            job schedules tailored to fit their college commitments, students
            can seamlessly balance work and study. Additionally, the platform
            provides opportunities for students to earn money while pursuing
            their education, empowering them to achieve financial independence
            and self-sufficiency.
          </Text>
        </Box>
        <Box
          className='box-animation'
          bg='#f7ede2'
          p='30px'
          borderRadius='20px'
          boxShadow='lg'
          mb='20'
          maxW='800px'
          color='white'
          textAlign='center'
        >
          <Heading textColor={'blue'} as='h1' size='lg' mb='10'>
            Benefits for Workers
          </Heading>
          <Text textColor={'black'} fontSize='lg' mb='4'>
            Workers can benefit greatly from our platform. They gain access to a
            wide range of temporary job opportunities, allowing them to choose
            positions that align with their skills and preferences.
            Additionally, our platform ensures competitive wages for workers,
            providing them with fair compensation for their contributions.
          </Text>
        </Box>
        <Box
          className='box-animation'
          bg='#f5cac3'
          p='30px'
          borderRadius='20px'
          boxShadow='lg'
          mb='20'
          maxW='800px'
          color='white'
          textAlign='center'
        >
          <Heading textColor={'#2a9d8f'} as='h1' size='lg' mb='10'>
            Overall Benefits
          </Heading>
          <Text textColor={'black'} fontSize='lg'>
            Our project offers a host of benefits for both students and workers
            alike. By promoting student independence and providing solutions for
            workforce shortages, our platform fosters community engagement and
            economic growth. Through our innovative approach, we aim to
            revolutionize the way students and workers connect in the job
            market.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default AboutProject;
