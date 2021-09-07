import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';
import {
  PageGetPokemonByNameComp,
  ssrGetPokemonByName,
  ssrGetAllPokemons,
} from '../../lib/hooks';

import { usePokemonsData } from '../../context/pokemon.context';

import { DrawerLayout } from '../../components/layout/drawer.layout';
import { PokemonFragment } from '../../@types/graphql';

import { withApollo, initializeApollo } from '../../lib/apollo';
import { GetServerSideProps, GetStaticPaths } from 'next';

const PokemonByNamePage: PageGetPokemonByNameComp = (props) => {
  const { setInViewNum } = usePokemonsData();

  const { data } = ssrGetAllPokemons.usePage();

  React.useEffect(() => {
    if (props.data) {
      setInViewNum(props.data.pokemon.number.toString());
    }
  }, []);

  return (
    <DrawerLayout data={data?.pokemons}>
      <p>{props?.data?.pokemon?.name ?? 'Loading'}</p>
    </DrawerLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const apolloClient = initializeApollo();
  const res = await ssrGetPokemonByName.getServerPage(
    {
      variables: {
        name: params?.name?.toString() || '',
      },
    },
    apolloClient
  );

  if (res.props.error || !res.props.data?.pokemon) {
    return {
      notFound: true,
    };
  }
  return {
    props: { res },
  };
};

export default withApollo(
  ssrGetPokemonByName.withPage((arg) => ({
    variables: {
      name: arg?.query?.name?.toString() || '',
    },
  }))(PokemonByNamePage)
);
