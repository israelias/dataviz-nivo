import {
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import {
  PageGetAllPokemonsComp,
  ssrGetAllPokemons,
} from '../lib/hooks';
import Link from 'next/link';
import { DrawerLayout } from '../components/layout/drawer.layout';
import { AppLayout } from '../components/layout/app.layout';
import { withApollo, initializeApollo } from '../lib/apollo';

import { useAuth } from '../context/auth.context';
import {
  PokemonActionTypes,
  usePokemonsData,
} from '../context/pokemon.context';
import React from 'react';

const LoginPage: PageGetAllPokemonsComp = () => {
  const { dispatch } = usePokemonsData();

  const { data } = ssrGetAllPokemons.usePage();

  const { email, setEmail, password, setPassword, handleSignIn } =
    useAuth();
  React.useEffect(() => {
    if (data) {
      dispatch({
        type: PokemonActionTypes.fetchPokemonsSuccess,
        pokemons: data.pokemons,
      });
    }
  }, []);

  return (
    <AppLayout>
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
          <form id="login" onSubmit={handleSignIn}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                placeholder="admin@admin.com"
                _placeholder={{ color: 'gray.500' }}
                border="1px solid"
                borderColor="transparent"
                _focus={{
                  borderColor: '#f1c857',
                }}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                border="1px solid"
                borderColor="transparent"
                _focus={{
                  borderColor: '#f1c857',
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </form>
          <Stack spacing={6}>
            <Button
              type="submit"
              form="login"
              bg={'#f1c857'}
              color={'white'}
              _hover={{
                bg: '#3f414b',
              }}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </AppLayout>
  );
};

// export default LoginPage;
export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  return await ssrGetAllPokemons.getServerPage({}, apolloClient);
};

export default withApollo(LoginPage);
