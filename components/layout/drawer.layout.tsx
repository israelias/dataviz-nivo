import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { ApolloError } from '@apollo/client';
import {
  Container,
  Flex,
  Stack,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

import { Header } from '../header';

import { PokemonDetail } from '../pokemon/item';
import { usePokemonsData } from '../../context/pokemon.context';

import { PokemonFragment } from '../../@types/graphql';
import { PokemonSignature } from '../pokemon/item/details';
import PokemonDex from '../pokemon/list';
import Pagination from '../pagination';
import Details from '../pokemon/item/details';
interface DrawerLayoutProps {
  children?: ReactNode;
  data: Array<PokemonFragment>;
  selectedData?: Array<PokemonFragment>;
  selected?: boolean;
  name?: string;
  number?: string;
  image?: string;
  maxHP?: number;
  maxCP?: number;
  weight?: {
    minimum?: string;
    maximum?: string;
  };
  height?: {
    minimum?: string;
    maximum?: string;
  };
  id?: string;
  classification?: string;
  xParam?: string;
  loading?: boolean;
  error?: ApolloError | any;
}

export const DrawerLayout = ({
  children,
  selected,
  name,
  number,
  image,
  maxHP,
  maxCP,
  height,
  weight,
  classification,
  data,
  selectedData,
  loading,
  error,
  id,
  xParam,
}: DrawerLayoutProps) => {
  const {
    dispatch,
    pokemons,
    pokemonsDeck,
    setPokemonsDeck,
    page,
    setPage,
    hasPrev,
    hasNext,
  } = usePokemonsData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  React.useEffect(() => {
    router.events.on('routeChangeComplete', onClose);

    return () => {
      router.events.off('routeChangeComplete', onClose);
    };
  });

  const [inViewData, setInViewData] =
    React.useState<PokemonFragment[]>(data);
  React.useEffect(() => {
    console.log('layout', pokemonsDeck?.length);
  }, [page]);
  return (
    <>
      <Header
        selected={selected}
        number={number}
        id={id}
        name={name}
      />
      <Container maxW={'7xl'} flex={'1 0 auto'} py={8}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: 0, lg: 8 }}
        >
          {loading ? (
            <p>loading...</p>
          ) : selected ? (
            <Details
              id={id}
              maxCP={maxCP}
              classification={classification}
              maxHP={maxHP}
              image={image}
              height={height}
              weight={weight}
              name={name}
              number={number}
            />
          ) : (
            <PokemonDex
              inViewData={inViewData}
              setInViewData={setInViewData}
              data={pokemonsDeck}
              selected={selected}
              name={name}
              number={number}
              xParam={xParam}
            />
          )}

          <PokemonDetail
            inViewData={inViewData}
            setInViewData={setInViewData}
            data={pokemonsDeck}
            selectedData={selectedData}
            selected={selected}
            name={name}
            number={number}
            image={image}
            xParam={xParam}
          />
        </Stack>
      </Container>

      <IconButton
        display={{ base: 'block', lg: 'none' }}
        position={'fixed'}
        bottom={4}
        right={6}
        size={'md'}
        isRound={true}
        onClick={onOpen}
        aria-label={'Toggle Pokedex Menu'}
        bg={'white'}
        css={{
          boxShadow:
            '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)',
        }}
        icon={
          isOpen ? (
            <CloseIcon w={3} h={3} />
          ) : (
            <HamburgerIcon w={5} h={5} />
          )
        }
      />

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader></DrawerHeader>
            <DrawerBody>
              {isOpen && (
                <PokemonDetail
                  inViewData={inViewData}
                  setInViewData={setInViewData}
                  data={data}
                />
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
