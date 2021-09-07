import { GetServerSideProps } from 'next';
import {
  PageGetAllPokemonsComp,
  PageGetFirstPokemonsComp,
  ssrGetFirstPokemons,
  ssrGetAllPokemons,
} from '../../lib/hooks';
import Link from 'next/link';
import { DrawerLayout } from '../../components/layout/drawer.layout';
import { withApollo, initializeApollo } from '../../lib/apollo';
import { PokemonDetail } from '../../components/pokemon';

const FirstPokemonsPage: PageGetFirstPokemonsComp = (props) => {
  // const { data } = ssrGetFirstPokemons.usePage();
  const { data } = props;
  return (
    <DrawerLayout data={data?.pokemons}>
      {/* {data?.pokemons?.map((pokemon, k) => (
        <div key={pokemon.id}>
          <Link href={`/pokemons/${pokemon.name}`}>
            <a>{pokemon.name}</a>
          </Link>
        </div>
      ))} */}
      <PokemonDetail data={data?.pokemons} />
    </DrawerLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async () => {
//   const apolloClient = initializeApollo();
//   return await ssrGetAllPokemons.getServerPage({}, apolloClient);
// };

// export default withApollo(AllPokemonsPage);
export const getServerSideProps: GetServerSideProps = async ({
  params,
}) => {
  const apolloClient = initializeApollo();
  const res = await ssrGetFirstPokemons.getServerPage(
    {
      variables: {
        first: parseInt(params?.first.toString()) || 10,
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
  ssrGetFirstPokemons.withPage((arg) => ({
    variables: {
      first: parseInt(arg?.query?.first.toString()) || 10,
    },
  }))(FirstPokemonsPage)
);
