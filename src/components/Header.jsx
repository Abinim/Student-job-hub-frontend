import React, { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { Flex, Text } from '@chakra-ui/react';

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <Flex align='center' mr={4}>
      {user && (
        <Text fontSize='20px' fontWeight='bold' color={'white'} mr={2}>
          Hello, {user.name}! <br /> Let's find some opportunities.
        </Text>
      )}
    </Flex>
  );
};

export default Header;
