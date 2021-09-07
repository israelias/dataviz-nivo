import { GetServerSideProps } from 'next';
import {
  PageGetAllPokemonsComp,
  ssrGetAllPokemons,
} from '../../lib/hooks';
import Link from 'next/link';
import { DrawerLayout } from '../../components/layout/drawer.layout';
import { withApollo, initializeApollo } from '../../lib/apollo';

const AllPokemonsPage: PageGetAllPokemonsComp = () => {
  const { data } = ssrGetAllPokemons.usePage();
  // const { getPokemonsByPage } = usePokemonsData();
  // const pokemons = getPokemonsByPage(1);
  // console.log('pokes', pokemons);
  return <DrawerLayout data={data?.pokemons}></DrawerLayout>;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  return await ssrGetAllPokemons.getServerPage({}, apolloClient);
};

export default withApollo(AllPokemonsPage);
