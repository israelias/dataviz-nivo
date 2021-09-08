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
import { withApollo, initializeApollo } from '../../lib/apollo';
import React from 'react';

const AllPokemonsPage: PageGetAllPokemonsComp = (props) => {
  const { data } = ssrGetAllPokemons.usePage();
  // const { data, loading, error } = useGetFirstPokemons();
  // const { data } = props;
  const [filtered, setFiltered] = React.useState<
    Array<PokemonFragment>
  >(data?.pokemons);
  const [offset, setOffset] = React.useState(0);
  const [page, setPage] = React.useState<number>(1);

  // React.useEffect(() => {
  //   console.log(data?.pokemons?.length);
  //   console.log(props?.data?.pokemons?.length);
  // }, [data, props]);
  // console.log(initial?.data?.pokemons?.length);

  switch (offset) {
    case 25:
      setFiltered(data?.pokemons?.slice(-126));
      console.log(1);
      break;
    case 50:
      setFiltered(data?.pokemons?.slice(26, 51));
      break;
    case 75:
      setFiltered(data?.pokemons?.slice(51, 76));
      console.log(1);
      break;
    case 100:
      setFiltered(data?.pokemons?.slice(76, 101));
      break;
    case 125:
      setFiltered(data?.pokemons?.slice(101, 126));
      break;
    case 151:
      setFiltered(data?.pokemons?.slice(126, 151));
      break;
    // default:
    //   setFiltered(data?.pokemons?.slice(-126));
    // break;
  }

  // switch (page) {
  //   case 1:
  //     setOffset(25);
  //     break;
  //   case 2:
  //     setOffset(50);
  //     break;
  //   case 3:
  //     setOffset(75);
  //     break;
  //   case 4:
  //     setOffset(100);
  //     break;
  //   case 5:
  //     setOffset(125);
  //     break;
  //   case 6:
  //     setOffset(150);
  //     break;
  //   default:
  //     // setOffset(25);
  //     break;
  // }

  console.log(filtered);

  React.useEffect(() => {
    if (data) {
      setFiltered(data?.pokemons);
      setPage(1);
    }
  }, []);

  return <DrawerLayout data={filtered} />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo();
  return await ssrGetAllPokemons.getServerPage({}, apolloClient);
};

export default withApollo(AllPokemonsPage);
