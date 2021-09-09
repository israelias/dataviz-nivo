import React, { ReactNode } from 'react';
import { Stack, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PokemonFragment } from '../../../@types/graphql';
import { usePokemonsData } from '../../../context/pokemon.context';

import InViewItem from './inView';
import WrapperItem from './wrapper';
import NavItem from './navItem';
import Pagination from '../../pagination';

const PokemonDex = ({
  data,
  inViewData,
  setInViewData,
  selected,
  name,
  number,
  xParam,
}: {
  data: Array<PokemonFragment>;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
  selected?: boolean;
  name?: string;
  number?: string;
  xParam?: string;
}) => {
  const { asPath } = useRouter();
  const [inView, setInView] = React.useState(false);
  const { inViewNum: providerNum, setInViewNum: providerSetNum } =
    usePokemonsData();
  const [inViewNum, setInViewNum] =
    React.useState<string>(providerNum);

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
  const router = useRouter();

  return (
    <>
      <Stack
        py={8}
        mt={16}
        height={selected ? '100vh' : 'unset'}
        as={'nav'}
        spacing={1}
        maxW={{ md: '360px' }}
        w={'100%'}
        flexShrink={0}
        pl={'24px'}
        position={selected ? 'absolute' : 'unset'}
        justifyContent={'center'}
        display={{ base: 'none', lg: 'flex' }}
        bg={'#2d2f36'}
        zIndex={'banner'}
      >
        {data &&
          data.map((pokemon) => (
            <InViewItem
              key={`inView-${pokemon?.id}`}
              data={data}
              inViewData={inViewData}
              setInViewData={setInViewData}
              selected={selected}
              name={name}
              number={number}
              xParam={xParam}
            >
              <NavItem
                href={pokemon?.name}
                asPath={asPath}
                name={pokemon?.name}
                number={pokemon?.number}
                image={pokemon?.image}
                inView={inView}
                inViewData={inViewData}
                setInViewData={setInViewData}
                inViewNum={inViewNum}
                selected={selected}
                xParam={xParam}
              />
            </InViewItem>
          ))}

        <Box></Box>
        <Stack
          mt="auto"
          zIndex={'banner'}
          bottom={0}
          position="sticky"
          width={'100%'}
        >
          <Box
            position="sticky"
            ml={'-24px!important'}
            bottom={0}
            maxW={{ md: '360px' }}
          >
            <Pagination
              hasPrev={hasPrev}
              hasNext={hasNext}
              page={page}
              setPage={setPage}
            />
          </Box>
        </Stack>
      </Stack>
    </>
  );
};

export default PokemonDex;
