import React from 'react';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PokemonFragment } from '../../../@types/graphql';

import { RadarDefault, RadarDetail } from '../radars';
import WrapperItem from './wrapper';

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
  xParam?: string;
}) => {
  const router = useRouter();
  const show = router.pathname.includes(name);
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
      {selected ? (
        <RadarDetail
          inViewData={inViewData}
          setInViewData={setInViewData}
          data={data}
          selected={selected}
          name={name}
          number={number}
        />
      ) : (
        <RadarDefault
          inViewData={inViewData}
          setInViewData={setInViewData}
          data={data}
          selected={selected}
          name={name}
          number={number}
        />
      )}
    </Flex>
  );
};
