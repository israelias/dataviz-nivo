import { Stack, Button } from '@chakra-ui/react';

import { GetServerSideProps } from 'next';
import {
  PageGetAllPokemonsComp,
  ssrGetAllPokemons,
} from '../lib/hooks';

import { AppLayout } from '../components/layout/app.layout';
import { withApollo, initializeApollo } from '../lib/apollo';

import { LoginForm, LoginWrapper } from '../components/auth';

import { useAuth } from '../context/auth.context';
import {
  PokemonActionTypes,
  usePokemonsData,
} from '../context/pokemon.context';
import React from 'react';

const LoginPage: PageGetAllPokemonsComp = (props) => {
  const { error } = props;
  const { dispatch, pokemonsDeck } = usePokemonsData();
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
      <LoginWrapper>
        <LoginForm
          email={email}
          setEmail={setEmail}
          setPassword={setPassword}
          password={password}
          handleSignIn={handleSignIn}
        />
        <Stack spacing={6}>
          <Button
            type="submit"
            form="login"
            bg={'#f1c857'}
            color={'white'}
            _hover={{
              bg: '#3f414b',
            }}
            // TODO This is a Mock using `admin@admin.com`. Router is defined in `AuthContext`
            // onClick={() => {
            //   history.push({ pathname: '/pokemons' });
            // }}
          >
            Login
          </Button>
        </Stack>
      </LoginWrapper>
    </AppLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  return await ssrGetAllPokemons.getServerPage({}, apolloClient);
};

export default withApollo(LoginPage);
