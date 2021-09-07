import React from 'react';
import { Stack, Heading, Text } from '@chakra-ui/react';
import {
  PageGetPokemonByNameComp,
  ssrGetPokemonByName,
  ssrGetAllPokemons,
  ssrGetFirstPokemons,
} from '../../../lib/hooks';

import { usePokemonsData } from '../../../context/pokemon.context';

import { DrawerLayout } from '../../../components/layout/drawer.layout';
import { PokemonFragment } from '../../../@types/graphql';

import { withApollo, initializeApollo } from '../../../lib/apollo';
import { GetServerSideProps, GetStaticPaths } from 'next';
import { PokemonDetail } from '../../../components/pokemon';

const PokemonByNamePage: PageGetPokemonByNameComp = (props) => {
  // const { pokemons, loading, getPokemonsByPage } = usePokemonsData();
  const { data: pokemonsData } = ssrGetFirstPokemons.usePage();
  // const [radar, setRadar] = React.useState<Array<PokemonFragment>>(
  //   []
  // );
  // React.useEffect(() => {
  //   let fragment = [];
  //   if (props.data) {
  //     fragment.push(props.data.pokemon);
  //     setRadar(fragment);
  //   }
  // }, []);

  const { data: pokemonData } = props;

  return (
    <DrawerLayout data={pokemonsData?.pokemons}>
      <p>{pokemonData?.pokemon?.name ?? 'Loading'}</p>
      {pokemonsData && (
        <PokemonDetail data={pokemonsData?.pokemons} />
      )}
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
