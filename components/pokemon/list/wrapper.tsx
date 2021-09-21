import React from 'react';

import { Stack } from '@chakra-ui/react';

import { PokemonFragment } from '../../../@types/graphql';

export const WrapperItem = ({
  data,
  inViewData,
  setInViewData,
  selected,
  name,
  number,
  xParam,
  children,
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
  children?: React.ReactNode;
}) => (
  <Stack
    py={8}
    mt={16}
    // height={selected ? '100vh' : 'unset'}
    as={'nav'}
    spacing={1}
    maxW={{ md: '360px' }}
    w={'100%'}
    flexShrink={0}
    pl={'24px'}
    // position={selected ? 'absolute' : 'unset'}
    justifyContent={'center'}
    display={{ base: 'none', lg: 'flex' }}
    bg={'#2d2f36'}
  >
    {children}
  </Stack>
);

export default WrapperItem;
