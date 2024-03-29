import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  Flex,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { login } from '../api/auth.api';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    const user = { email, password };

    try {
      const response = await login(user);

      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      console.log('error login', error.response.data.message);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
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
        w={{ base: '90%', md: '50%' }}
        maxW='400px'
        borderRadius='20px'
        p='35'
        boxShadow='md'
        bg='white'
      >
        <Text textAlign='center' as='h2' fontSize='xl' mb='6'>
          Log in to your account
        </Text>
        <form onSubmit={handleSubmit}>
          {error && (
            <Text color='red' mb='4' textAlign='center'>
              {error}
            </Text>
          )}
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              placeholder='Enter your email'
              autoFocus
              style={{ height: '25px', width: '200px' }}
            />
          </FormControl>
          <FormControl isRequired mt='4'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              placeholder='Enter your password'
              style={{ height: '25px', width: '200px' }}
            />
          </FormControl>
          <Button
            type='submit'
            mt='20'
            colorScheme='teal'
            size='lg'
            isLoading={isLoading}
            loadingText='Logging in...'
            borderRadius='full'
            _hover={{ bg: 'teal.600' }}
            style={{ height: '25px', width: '200px' }}
          >
            Login
          </Button>
        </form>

        <Text textAlign='center' mt='8'>
          If you don't have an account yet, click on{' '}
          <ChakraLink as={Link} to='/signup' color='red'>
            Sign Up
          </ChakraLink>{' '}
          to create one.
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
