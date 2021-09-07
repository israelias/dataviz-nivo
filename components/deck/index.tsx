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
  const { asPath } = useRouter();
  const [inView, setInView] = React.useState(false);
  const { inViewNum: providerNum, setInViewNum: providerSetNum } =
    usePokemonsData();
  const [inViewNum, setInViewNum] =
    React.useState<string>(providerNum);
  const first = inViewNum > '001';
  // && inViewNum < '001';
  const second = inViewNum > '026';
  // && inViewNum < '026';
  const third = inViewNum > '051';
  // && inViewNum < '051';
  const fourth = inViewNum > '076';
  // && inViewNum < '076';
  const fifth = inViewNum > '101';
  // && inViewNum < '101';
  const sixth = inViewNum > '126';
  // && inViewNum < '126';

  React.useEffect(() => {
    if (first) {
      setInViewData(data.slice(0, 26));
    } else if (second) {
      setInViewData(data.slice(25, 51));
    } else if (third) {
      setInViewData(data.slice(50, 76));
    } else if (fourth) {
      setInViewData(data.slice(75, 101));
    } else if (fifth) {
      setInViewData(data.slice(100, 126));
    } else if (sixth) {
      setInViewData(data.slice(125, 151));
    } else {
      setInViewData(data.slice(25, 51));
    }
  }, []);

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
            delay={1000}
            threshold={1}
            triggerOnce={true}
            onChange={(inView, entry) => {
              setInView;
              setInViewNum(pokemon.number.toString());
              console.log('inView', pokemon.number);
              // console.log('Inview:', inView, pokemon.name);
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
