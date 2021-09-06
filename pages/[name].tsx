import {
  PageGetPokemonByNameComp,
  ssrGetPokemonByName,
  ssrGetAllPokemons,
} from '../lib/hooks';

import { withApollo, initializeApollo } from '../lib/apollo';
import { GetServerSideProps, GetStaticPaths } from 'next';

const PokemonByNamePage: PageGetPokemonByNameComp = (props) => {
  return (
    <div>
      <p>{props?.data?.pokemon?.name ?? 'Loading'}</p>
    </div>
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const apolloClient = initializeApollo();

//   const { props } = await ssrGetAllPokemons.getServerPage(
//     {},
//     apolloClient
//   );
//   const paths =
//     props?.data?.pokemons.map((pokemon) => ({
//       params: { name: pokemon.name },
//     })) || [];

//   return {
//     paths,
//     fallback: false,
//   };
// };

export default withApollo(
  ssrGetPokemonByName.withPage((arg) => ({
    variables: {
      name: arg?.query?.name?.toString() || '',
    },
  }))(PokemonByNamePage)
);
