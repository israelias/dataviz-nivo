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

const Error = ({ statusCode }) => {
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
        <Stack spacing={2}>
          <Stack>
            <TextUnderline>Poke</TextUnderline>dex
          </Stack>
          <Heading>
            {statusCode ? statusCode.toString() : 'Page not found'}
          </Heading>
          <Text>
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
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

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res
    ? res.statusCode
    : err
    ? err.statusCode
    : 404;
  return { statusCode };
};

export default Error;
