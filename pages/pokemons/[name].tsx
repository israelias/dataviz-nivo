import React from 'react';
import {
  PageGetPokemonByNameComp,
  ssrGetPokemonByName,
  ssrGetAllPokemons,
} from '../../lib/hooks';

import { DrawerLayout } from '../../components/layout/drawer.layout';
import { usePokemonsData } from '../../context/pokemon.context';

import { withApollo, initializeApollo } from '../../lib/apollo';
import { GetServerSideProps, GetStaticPaths } from 'next';

const PokemonByNamePage: PageGetPokemonByNameComp = (props) => {
  const { loading, error } = usePokemonsData();
  const namePageProps = ssrGetAllPokemons.usePage();
  const {
    dispatch,
    pokemons,
    pokemonsDeck,
    setPokemonsDeck,
    page,
    setPage,
    hasPrev,
    hasNext,
  } = usePokemonsData();

  return (
    <DrawerLayout
      selected
      loading={namePageProps?.loading || loading}
      error={props?.error || error}
      image={props?.data?.pokemon?.image}
      maxHP={props?.data?.pokemon?.maxHP}
      maxCP={props?.data?.pokemon?.maxCP}
      height={props?.data?.pokemon?.height}
      weight={props?.data?.pokemon?.weight}
      classification={props?.data?.pokemon?.classification}
      id={props?.data?.pokemon?.id}
      number={props.data?.pokemon.number}
      name={props.data?.pokemon.name}
      data={[props?.data?.pokemon]}
      selectedData={[props?.data?.pokemon]}
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
