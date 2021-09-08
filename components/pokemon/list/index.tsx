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
  // const first = inViewNum > '001';
  // // && inViewNum < '001';
  // const second = inViewNum > '026';
  // // && inViewNum < '026';
  // const third = inViewNum > '051';
  // // && inViewNum < '051';
  // const fourth = inViewNum > '076';
  // // && inViewNum < '076';
  // const fifth = inViewNum > '101';
  // // && inViewNum < '101';
  // const sixth = inViewNum > '126';
  // // && inViewNum < '126';

  // React.useEffect(() => {
  //   if (first) {
  //     setInViewData(data?.slice(0, 26));
  //   }
  // }, [first]);
  // React.useEffect(() => {
  //   if (second) {
  //     setInViewData(data?.slice(25, 51));
  //   }
  // }, [second]);
  // React.useEffect(() => {
  //   if (third) {
  //     setInViewData(data?.slice(50, 76));
  //   }
  // }, [third]);
  // React.useEffect(() => {
  //   if (fourth) {
  //     setInViewData(data?.slice(75, 101));
  //   }
  // }, [fourth]);
  // React.useEffect(() => {
  //   if (fifth) {
  //     setInViewData(data?.slice(100, 126));
  //   }
  // }, [fifth]);
  // React.useEffect(() => {
  //   if (sixth) {
  //     setInViewData(data?.slice(125, 151));
  //   }
  // }, [sixth]);

  // React.useEffect(() => {
  //   if (first) {
  //     setInViewData(data?.slice(0, 26));
  //   }
  //   if (second) {
  //     setInViewData(data?.slice(25, 51));
  //   }
  //   if (third) {
  //     setInViewData(data?.slice(50, 76));
  //   }
  //   if (fourth) {
  //     setInViewData(data?.slice(75, 101));
  //   }
  //   if (fifth) {
  //     setInViewData(data.slice(100, 126));
  //   }
  //   if (sixth) {
  //     setInViewData(data?.slice(125, 151));
  //   }
  //   setInViewData(data?.slice(25, 51));
  // }, [inViewNum]);

  return (
    <>
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
        {inViewData &&
          inViewData.map((pokemon) => (
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

        <Box height="100%"> </Box>
        <Box
          position="fixed"
          flexShrink={0}
          pl={'24px'}
          bottom={0}
          left={0}
          as={'nav'}
          maxW={{ md: '360px' }}
          w={'100%'}
          width="100%"
          mt="auto"
          pt="16px"
          ml={{ base: '20%vw', lg: '10vw' }}
          spacing={{ base: 0, lg: 8 }}
          right={0}
          mr={'75vw'}
        >
          <Pagination
            hasPrev={true}
            hasNext={true}
            page={1}
            setPage={() => {}}
          />
        </Box>
      </Stack>
    </>
  );
};

export default PokemonDex;
