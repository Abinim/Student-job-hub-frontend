import React, { useContext } from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { AuthContext } from '../context/auth.context';

const Jobs = ({ jobs, handleApply, handleCancel }) => {
  const { user } = useContext(AuthContext);

  const isApplied = jobId => {
    if (user && user.appliedJobs) {
      return user.appliedJobs.includes(jobId);
    }

    return false;
  };

  return (
    <>
      {jobs.map(job => (
        <Box key={job._id} p={4} borderWidth='1px' borderRadius='md' mb={4}>
          <Heading as='h3' size='md'>
            {job.companyName}
          </Heading>
          <Text fontSize='sm' color='gray.500'>
            {job.address}
          </Text>
          <Text mt={2}>{job.description}</Text>
          {user.role === 'student' && isApplied(job._id) ? (
            <Button
              mt={4}
              colorScheme='red'
              onClick={() => handleCancel(job._id)}
            >
              Cancel
            </Button>
          ) : (
            <Button
              mt={4}
              colorScheme='teal'
              onClick={() => handleApply(job._id)}
            >
              {isApplied(job._id) ? 'Applied' : 'Apply Now'}
            </Button>
          )}
        </Box>
      ))}
    </>
  );
};

export default Jobs;
