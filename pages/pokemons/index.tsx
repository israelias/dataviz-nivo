import { GetServerSideProps } from 'next';
import {
  PageGetAllPokemonsComp,
  PageGetFirstPokemonsComp,
  ssrGetAllPokemons,
  ssrGetFirstPokemons,
  useGetFirstPokemons,
} from '../../lib/hooks';
import { PokemonFragment } from '../../@types/graphql';
import { DrawerLayout } from '../../components/layout/drawer.layout';
import {
  usePokemonsData,
  PokemonActionTypes,
} from '../../context/pokemon.context';
import { withApollo, initializeApollo } from '../../lib/apollo';
import React from 'react';

const AllPokemonsPage: PageGetAllPokemonsComp = (props) => {
  const { data, loading, error } = ssrGetAllPokemons.usePage();
  const {
    dispatch,
    pokemons,
    pokemonsDeck,
    setPokemonsDeck,
    page,
    setPage,
    hasPrev,
    hasNext,
    state,
  } = usePokemonsData();

  React.useEffect(() => {
    dispatch({
      type: PokemonActionTypes.fetchPokemons,
    });
    if (data) {
      // setPokemonsDeck(data?.pokemons);
      dispatch({
        type: PokemonActionTypes.fetchPokemonsSuccess,
        pokemons: data?.pokemons,
      });
      setPokemonsDeck(data?.pokemons);
    } else {
      dispatch({
        type: PokemonActionTypes.fetchPokemonsFailure,
      });
    }
  }, [data]);

  console.log('apollo', data, loading, error);
  console.log('provider', pokemonsDeck);
  console.log('next', props?.data?.pokemons);

  // console.log(filtered);
  React.useEffect(() => {
    console.log('deck', pokemonsDeck);
  }, []);

  return (
    <DrawerLayout
      loading={loading || state?.loading}
      error={error || state?.error}
      data={pokemonsDeck || data?.pokemons}
    />
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  return await ssrGetAllPokemons.getServerPage({}, apolloClient);
};

export default withApollo(AllPokemonsPage);
