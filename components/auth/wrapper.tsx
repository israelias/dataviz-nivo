import { Flex, Stack } from '@chakra-ui/react';
import LoginForm from './form';

import React from 'react';

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg="#1c1d1f"
    >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg="#2d2f36"
        rounded={'md'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        {children}
      </Stack>
    </Flex>
  );
};

export default Wrapper;
