// ParentComponent.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditJobForm from './EditJobForm';
import axios from 'axios';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';

function ParentComponent() {
  const [companyName, setCompanyName] = useState('');
  const [companyDetails, setCompanyDetails] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/jobs/${companyName}`);
      console.log('Fetched company data:', response.data);
      setCompanyDetails(response.data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  return (
    <Box
      maxW='400px'
      mx='auto'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      p='20px'
      boxShadow='lg'
      margin='auto'
      mt='200px'
      bg='gray.100'
      backgroundColor='#f9f9f9'
    >
      <Heading as='h1' size='lg' color='purple' mb={4}>
        Edit Job Form
      </Heading>
      <FormControl id='companyName' mb={4}>
        <FormLabel color='black'>Search Company Name</FormLabel>
        <Input
          type='text'
          value={companyName}
          onChange={e => setCompanyName(e.target.value)}
          variant='filled'
          colorScheme='purple'
          style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
        />
      </FormControl>
      <Button
        onClick={handleSearch}
        colorScheme='purple'
        mt={4}
        size='lg'
        style={{ fontSize: '20px', padding: '1px', borderRadius: '8px' }}
      >
        Search
      </Button>
      {companyDetails && <EditJobForm formData={companyDetails} />}
    </Box>
  );
}

export default ParentComponent;
