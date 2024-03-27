import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import Form from '../components/Form';

const EmployerForm = () => {
  return (
    <Flex
      align='center'
      justify='center'
      minH='100vh'
      bg='gray.50'
      px={{ base: '4', md: '8' }}
    >
      <Box
        maxW='xl'
        borderWidth='1px'
        borderRadius='20'
        overflow='hidden'
        p={60}
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
    </Flex>
  );
};

export default EmployerForm;
