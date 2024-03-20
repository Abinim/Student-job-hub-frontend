import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import Form from '../components/Form';

const EmployerForm = () => {
  return (
    <Box
      maxW='xl'
      borderWidth='1px'
      borderRadius='20'
      overflow='hidden'
      p={8}
      boxShadow='lg'
      textAlign='center'
      position='absolute'
      top='50%'
      left='50%'
      bg='white'
      transform='translate(-50%, -50%)'
      zIndex='10'
    >
      <Heading as='h1' size='xl' mb={6} color='black'>
        Employer Form
      </Heading>
      <Form userType='employer' />
    </Box>
  );
};

export default EmployerForm;
