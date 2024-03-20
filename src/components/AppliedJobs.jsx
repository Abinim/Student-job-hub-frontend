// import React, { useState, useEffect, useContext } from 'react';
// import { Grid, Text, Box, Button } from '@chakra-ui/react';
// import { appliedJobs } from '../api/jobsportal.api'; // Assuming you have an API function to fetch applied jobs
// import { AuthContext } from '../context/auth.context';
// import { Link } from 'react-router-dom';

// const AppliedJobs = () => {
//   const [jobs, setJobs] = useState([]);
//   const { user } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const response = await appliedJobs(user.companyName); // Adjust this based on your API endpoint
//         if (!response || !response.data) {
//           throw new Error('Failed to fetch applied jobs');
//         }
//         console.log('Response data:', response.data);
//         setJobs(response.data);
//       } catch (error) {
//         console.error('Error fetching applied jobs:', error.message);
//       }
//     };

//     user && fetchJobs();
//   }, [user]);

//   return (
//     <Grid templateColumns='repeat(auto-fit, minmax(300px, 1fr))' gap={5} p={10}>
//       {Array.isArray(jobs) && jobs.length > 0 ? (
//         jobs.map(job => (
//           <Box
//             key={job._id}
//             maxW='400px'
//             mx='auto'
//             borderWidth='1px'
//             borderRadius='20'
//             overflow='hidden'
//             p='20px'
//             boxShadow='lg'
//             margin='auto'
//             mt='200px'
//             backgroundColor='#1D769A'
//             _hover={{ bg: 'gray.200', boxShadow: 'xl' }}
//           >
//             <Text fontSize='25px' fontWeight='bold' color='white' mb={2}>
//               {job.companyName}
//             </Text>
//             <Text fontSize='20px' fontWeight='bold' color='white' mb={2}>
//               {job.address}
//             </Text>
//             <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
//               Date: {new Date(job.date.from).toLocaleDateString()} to{' '}
//               {new Date(job.date.to).toLocaleDateString()}
//             </Text>
//             <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
//               Shift: {job.shift}
//             </Text>
//             <Text fontSize='md' fontWeight='bold' color='black' mb={2}>
//               Payment per Hour: ${job.paymentPerHour}
//             </Text>
//             <Text fontSize='md' fontWeight='bold' color='black' mb={4}>
//               Description: {job.description}
//             </Text>
//             {/* You can add more details or actions here */}
//           </Box>
//         ))
//       ) : (
//         <Text></Text>
//       )}
//     </Grid>
//   );
// };

// export default AppliedJobs;
