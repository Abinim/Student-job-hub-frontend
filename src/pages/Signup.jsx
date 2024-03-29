import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth.api';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    const user = { email, password, name };

    try {
      await signup(user);
      navigate('/login');
    } catch (error) {
      console.log('Error signup', error);
      setError(error.response.data.message);
    }
  };

  return (
    <Flex
      align='center'
      justify='center'
      minH='100vh'
      bg='gray.50'
      px={{ base: '4', md: '8' }}
    >
      <Box
        maxW='400px'
        mx='auto'
        mt='200px'
        p='50px'
        borderWidth='1px'
        borderRadius='20px'
        backgroundColor='#f9f9f9'
      >
        <Text
          textAlign='center'
          as={'h2'}
          color='black'
          fontSize='xl'
          mb='20px'
        >
          Sign Up
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel color='black'>Email</FormLabel>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ height: '25px', width: '200px' }}
            />
          </FormControl>
          <FormControl mt='20px'>
            <FormLabel color='black'>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              style={{ height: '25px', width: '200px' }}
            />
          </FormControl>
          <FormControl mt='20px'>
            <FormLabel color='black'>Name</FormLabel>
            <Input
              type='text'
              name='name'
              value={name}
              onChange={({ target }) => setName(target.value)}
              style={{ height: '25px', width: '200px' }}
            />
          </FormControl>
          <Button
            type='submit'
            mt='20px'
            colorScheme='blue'
            bg={'white'}
            style={{ height: '25px', width: '200px' }}
          >
            Sign up
          </Button>
        </form>
        {error && (
          <Text color='red' mt='20px'>
            {error}
          </Text>
        )}
        <Text textAlign='center' color='black' mt='20px'>
          Already have an account?{' '}
          <ChakraLink as={Link} to={'/login'} color='red'>
            Login
          </ChakraLink>
        </Text>
      </Box>
    </Flex>
  );
};

export default Signup;
