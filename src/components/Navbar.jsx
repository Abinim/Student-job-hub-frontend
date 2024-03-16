import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  Link,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AuthContext } from '../context/auth.context';
import Header from './Header';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box
      as='nav'
      p={4}
      boxShadow='md'
      position='fixed'
      top='0'
      left='0'
      right='0'
      zIndex='1000'
      width='100%'
      bg='gray.800'
    >
      <Flex
        justify='space-between'
        align='center'
        maxWidth='1200px'
        mx='auto'
        px={4}
      >
        <Link as={RouterLink} to='/'>
          <Image src='/images/Student.jpg' alt='Logo' w='90px' />
        </Link>
        <Header />
        <Menu isOpen={menuOpen}>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            color='white'
            fontSize='24px'
            display={{ base: 'block', md: 'none' }}
            variant='outline'
            onClick={toggleMenu}
          />
          <MenuList
            bg='white'
            color='black'
            border='1px solid #7EA0B7'
            borderRadius='12px'
            boxShadow='0px 8px 12px rgba(0, 0, 0, 0.1)'
            minWidth='240px'
            zIndex='100'
            opacity={menuOpen ? '1' : '0'}
            visibility={menuOpen ? 'visible' : 'hidden'}
            transition='opacity 0.3s, visibility 0.3s'
            onMouseLeave={() => setMenuOpen(false)}
            p={4}
          >
            {!user ? (
              <MenuItem as={RouterLink} to='/login' color='black'>
                Login
              </MenuItem>
            ) : (
              <MenuItem onClick={handleLogout} color='black'>
                Logout
              </MenuItem>
            )}
            <MenuItem as={RouterLink} to='/employer-form' color='black'>
              Employer Form
            </MenuItem>
            <MenuItem as={RouterLink} to='/student-form' color='black'>
              Student Form
            </MenuItem>
            <MenuItem as={RouterLink} to='/all-jobs' color='black'>
              All Jobs
            </MenuItem>
            <MenuItem as={RouterLink} to='/my-jobs' color='black'>
              My Jobs
            </MenuItem>
            <MenuItem as={RouterLink} to='/new-job-form' color='black'>
              New Job Form
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Navbar;
