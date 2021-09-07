import React from 'react';
import NextLink from 'next/link';

import {
  Link,
  useColorModeValue,
  Stack,
  HStack,
  Avatar,
  Text,
  StyleProps,
} from '@chakra-ui/react';

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

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper = () => {
  React.forwardRef<HTMLDivElement, WrapperProps>(
    ({ children }, ref) => (
      <Stack
        as="div"
        height={'75px'}
        minWidth={'300px'}
        maxWidth={'380px'}
        spacing={1}
        ref={ref}
      >
        {children}
      </Stack>
    )
  );
};

export const NavItem = ({
  href,
  children,
  asPath,
  inView,
  name,
  image,
  number,
  inViewNum,
}: {
  href: string;
  children?: React.ReactNode;
  asPath: string;
  inView: boolean;
  name: string;
  image: string;
  number: string;
  inViewNum?: number;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
}) => {
  const isActive = asPath === href || inViewNum === parseInt(number);

  const activeBg = useColorModeValue('green.50', 'green.900');
  const forwardRef = React.useRef<HTMLDivElement>();

  return (
    <Stack
      ref={forwardRef}
      height={'75px'}
      // width={'100%'}
      maxWidth={'320px'}
      spacing={1}
    >
      <NextLink href={`/pokemons/${href}`} passHref>
        <Link
          fontSize={'sm'}
          rounded={'md'}
          px={3}
          py={2}
          ml={'-12px!important'}
          bg={isActive ? '#f1c857' : '#3f414b'}
          border={'1px solid'}
          borderColor="transparent"
          _hover={{
            bg: isActive ? '#f1c857' : '#3f414b',
            borderColor: '#f1c857',
          }}
        >
          <HStack>
            <PokemonAvatar name={name} image={image} />
            <Text
              fontWeight={isActive ? 600 : 400}
              color={isActive ? '#3f414b' : '#f1c857'}
            >
              {number}
            </Text>
            <Text color={isActive ? '#2d2f36' : '#ededed'}>
              {name}
            </Text>
          </HStack>
        </Link>
      </NextLink>
    </Stack>
  );
};
