import React, { ReactNode } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Link,
  Avatar,
  HStack,
  Stack,
  Text,
  StackProps,
  useColorModeValue,
} from '@chakra-ui/react';

import { InView } from 'react-intersection-observer';

import { NavItem } from './navItem';

import { PokemonFragment } from '../../@types/graphql';
import { usePokemonsData } from '../../context/pokemon.context';

export const PokemonAvatar = ({
  name,
  image,
}: {
  name: string;
  image: string;
}) => {
  return (
    <Avatar height={'44px'} width={'44px'} name={name} src={image} />
  );
};

export const PokemonItem = ({
  data,
  inViewData,
  setInViewData,
}: {
  data: Array<PokemonFragment>;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
}) => {
  const { asPath, pathname } = useRouter();
  const [inView, setInView] = React.useState(false);
  const { inViewNum, setInViewNum } = usePokemonsData();

  React.useMemo(() => {
    if (inViewNum < 0o25 && inViewNum > 0o01) {
      setInViewData(data.slice(0, 26));
    } else if (inViewNum < 0o51 && inViewNum > 0o26) {
      setInViewData(data.slice(0o25, 51));
    } else if (inViewNum < 0o76 && inViewNum > 0o51) {
      setInViewData(data.slice(50, 76));
    } else if (inViewNum < 101 && inViewNum > 0o76) {
      setInViewData(data.slice(75, 101));
    } else if (inViewNum < 126 && inViewNum > 101) {
      setInViewData(data.slice(100, 126));
    } else if (inViewNum < 151 && inViewNum > 126) {
      setInViewData(data.slice(125, 151));
    } else {
      setInViewData(data.slice(25, 51));
    }
  }, [inViewNum]);

  return (
    <Stack
      py={8}
      mt={16}
      as={'nav'}
      spacing={1}
      maxW={{ md: '360px' }}
      w={'100%'}
      flexShrink={0}
      pl={'24px'}
      justifyContent={'center'}
      display={{ base: 'none', lg: 'flex' }}
      bg={'#2d2f36'}
    >
      {inViewData &&
        inViewData.map((pokemon) => (
          <InView
            key={`inView-${pokemon.id}`}
            onChange={(inView, entry) => {
              setInView;

              console.log('Inview:', inView, pokemon.name);
            }}
          >
            <NavItem
              href={pokemon.name}
              asPath={asPath}
              name={pokemon.name}
              number={pokemon.number}
              image={pokemon.image}
              inView={inView}
              inViewData={inViewData}
              setInViewData={setInViewData}
              inViewNum={inViewNum}
            />
          </InView>
        ))}
    </Stack>
  );
};
