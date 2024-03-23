// StudentSignupPage.jsx
import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Form from '../components/Form';

const StudentForm = () => {
  return (
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
  );
};

export default StudentForm;
