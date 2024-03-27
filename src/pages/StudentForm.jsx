// StudentSignupPage.jsx
import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import Form from '../components/Form';

const StudentForm = () => {
  return (
    <Flex
      align='center'
      justify='center'
      minH='100vh'
      bg='gray.50'
      px={{ base: '4', md: '8' }}
    >
      <Box
        style={{ borderRadius: '20px' }}
        maxW='xxxl'
        borderWidth='1px'
        borderRadius='xl'
        overflow='hidden'
        p={60}
        boxShadow='xxl'
        textAlign='center'
        position='absolute'
        top='50%'
        left='50%'
        bg='white'
        transform='translate(-50%, -50%)'
        zIndex='10'
      >
        <Heading as='h1' size='xl' mb={6} color='black'>
          Student Form
        </Heading>
        <Form userType='student' />
      </Box>
    </Flex>
  );
};

export default StudentForm;
