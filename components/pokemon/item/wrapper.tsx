import React from 'react';
import { Flex } from '@chakra-ui/react';

import { PokemonFragment } from '../../../@types/graphql';

export const WrapperItem = ({
  data,
  inViewData,
  setInViewData,
  selected,
  name,
  number,
  children,
}: {
  data: Array<PokemonFragment>;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
  children: React.ReactNode;
  selected?: boolean;
  name?: string;
  number?: string;
  xParam?: string;
}) => {
  return (
    <Flex
      direction={'column'}
      w={'full'}
      position="fixed"
      right={0}
      marginLeft={{ lg: '380px' }}
      maxW={{ lg: 'calc(100% - 16rem)' }}
      py={8}
      mt={20}
    >
      {children}
    </Flex>
  );
};

export default WrapperItem;
