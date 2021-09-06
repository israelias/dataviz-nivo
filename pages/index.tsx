import { GetServerSideProps } from 'next';
import {
  PageGetAllPokemonsComp,
  ssrGetAllPokemons,
} from '../lib/hooks';
import Link from 'next/link';
import { withApollo, initializeApollo } from '../lib/apollo';

const AllPokemonsPage: PageGetAllPokemonsComp = () => {
  const { data } = ssrGetAllPokemons.usePage();
  return (
    <div>
      {data?.pokemons?.map((pokemon, k) => (
        <div key={pokemon.id}>
          <Link href={`/${pokemon.name}`}>
            <a>{pokemon.name}</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  // const continents = await ssrContinents.getServerPage();
  return await ssrGetAllPokemons.getServerPage({}, apolloClient);
};

export default withApollo(AllPokemonsPage);
