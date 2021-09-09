import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { PokemonFragment } from '../../../@types/graphql';

import { RadarDefault, RadarDetail } from '../radars';
import WrapperItem from './wrapper';
import { PokemonSignature } from './details';
export const PokemonDetail = ({
  data,
  inViewData,
  setInViewData,
  selected,
  name,
  image,
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
  image?: string;
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
      {selected && name && image && (
        <Box position="fixed" bottom={0} right={0} p={'24px'}>
          <PokemonSignature
            name={name}
            image={image}
            date={new Date('2021-09-09T19:01:27Z')}
          />
        </Box>
      )}
    </Flex>
  );
};
