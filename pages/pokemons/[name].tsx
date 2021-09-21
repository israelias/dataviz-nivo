import React from 'react';
import {
  Container,
  Icon,
  Stack,
  Flex,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import {
  PageGetPokemonByNameComp,
  ssrGetPokemonByName,
  ssrGetAllPokemons,
} from '../../lib/hooks';
import NextLink from 'next/link';

import { usePokemonsData } from '../../context/pokemon.context';

import { DrawerLayout } from '../../components/layout/drawer.layout';
import { PokemonFragment } from '../../@types/graphql';

import { withApollo, initializeApollo } from '../../lib/apollo';
import { GetServerSideProps, GetStaticPaths } from 'next';

const PokemonByNamePage: PageGetPokemonByNameComp = (props) => {
  const { setInViewNum } = usePokemonsData();

  const { data } = ssrGetAllPokemons.usePage();

  const [local, setLocal] = React.useState<PokemonFragment[]>(
    data?.pokemons
  );

  React.useEffect(() => {
    if (props.data) {
      setInViewNum(props.data.pokemon.number.toString());
    }
  }, []);

  React.useEffect(() => {
    if (data?.pokemons && data.pokemons !== undefined) {
      setLocal(data.pokemons);
    }
  }, [data]);

  return local ? (
    <DrawerLayout data={local}>
      <p>{props?.data?.pokemon?.name ?? 'Loading'}</p>
    </DrawerLayout>
  ) : (
    <Flex align={'center'} justify={'center'} h={'100vh'} w={'full'}>
      <Stack
        as={Container}
        bg={'#1c1d1f'}
        rounded={'xl'}
        p={8}
        spacing={6}
        maxW={'lg'}
        align={'center'}
        textAlign={'center'}
      >
        {/* <Icon as={Logo} w={10} h={10} /> */}
        <Stack spacing={2}>
          <Heading>Page not found</Heading>
          <Text>
            This page was not found. You may have mistyped the address
            or the page may have moved as this project is currently in
            development.
          </Text>
        </Stack>
        <Flex>
          <NextLink href={'/'} passHref>
            <Button
              as={'a'}
              rounded={'full'}
              bg={'#f1c857'}
              color={'white'}
              _hover={{
                bg: '#3f414b',
              }}
            >
              Take me to the home page
            </Button>
          </NextLink>
        </Flex>
      </Stack>
    </Flex>
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
