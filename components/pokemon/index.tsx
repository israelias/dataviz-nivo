import React from 'react';
import {
  Box,
  Text,
  HStack,
  IconButton,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { Pokemon, PokemonFragment } from '../../@types/graphql';

import { Radar } from './radar';

export const PokemonDetail = ({
  data,
  inViewData,
  setInViewData,
  selected,
  name,
  number,
}: {
  data: Array<PokemonFragment>;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
  selected?: boolean;
  name?: string;
  number?: string;
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
      <Radar
        inViewData={inViewData}
        setInViewData={setInViewData}
        data={data}
        selected={selected}
        name={name}
        number={number}
      />
    </Flex>
  );
};
