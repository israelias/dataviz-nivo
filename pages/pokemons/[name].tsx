import React from 'react';
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
  console.log('name', data?.pokemons?.length);

  return (
    <DrawerLayout
      selected
      id={props?.data?.pokemon?.id}
      number={props.data?.pokemon.number}
      name={props.data?.pokemon.name}
      data={[props?.data?.pokemon]}
    >
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
        name: params?.name?.toString().toLowerCase() || '',
      },
    },
    apolloClient
  );

  if (res.props.error || !res.props.data) {
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
      name: arg?.query?.name?.toString().toLowerCase() || '',
    },
  }))(PokemonByNamePage)
);
