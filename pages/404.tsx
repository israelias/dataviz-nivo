import {
  Container,
  Icon,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import { TextUnderline } from '../components/shared/underline';
import NextLink from 'next/link';

export const NotFound = () => {
  return (
    <Flex align={'center'} justify={'center'} h={'100vh'} w={'full'}>
      <Stack
        as={Container}
        bg={'#1c1d1f'}
        rounded={'xl'}
        p={8}
        spacing={6}
        maxW={'lg'}
        align={'center'}
        textAlign={'center'}
      >
        <Stack>
          <TextUnderline>Poke</TextUnderline>dex
        </Stack>
        <Stack spacing={2}>
          <Heading>Page not found</Heading>
          <Text>
            This page was not found. You may have mistyped the address
            or the page may have moved as this project is currently in
            development.
          </Text>
        </Stack>
        <Flex>
          <NextLink href={'/'} passHref>
            <Button
              as={'a'}
              rounded={'full'}
              bg={'#f1c857'}
              color={'white'}
              _hover={{
                bg: '#3f414b',
              }}
            >
              Take me to the home page
            </Button>
          </NextLink>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default NotFound;
