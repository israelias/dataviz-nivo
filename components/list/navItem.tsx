import React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Link, Stack, HStack, Avatar, Text } from '@chakra-ui/react';

import { PokemonFragment } from '../../@types/graphql';

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

export const NavItem = ({
  href,
  children,
  asPath,
  inView,
  name,
  image,
  number,
  inViewNum,
  selected,
  xParam,
}: {
  href: string;
  children?: React.ReactNode;
  asPath: string;
  inView: boolean;
  name: string;
  image: string;
  number: string;
  inViewNum?: string;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
  selected?: boolean;
  xParam?: string;
}) => {
  const isActive = asPath === href || inViewNum === number;
  const forwardRef = React.useRef<HTMLDivElement>();
  const router = useRouter();
  // Option to use Shallow Routing that changes the URL without refreshing page
  // router.push('/?counter=10', '/about?counter=10', { shallow: true });
  return (
    <Stack
      ref={forwardRef}
      height={'75px'}
      maxWidth={'320px'}
      spacing={1}
    >
      <NextLink
        href={`/pokemons/${encodeURIComponent(href)}`}
        passHref
      >
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
