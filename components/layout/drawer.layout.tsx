import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
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
import { Footer } from '../shared/Footer';
import { Navigation } from '../shared/Navigation';
import { PokemonItem } from '../deck';
import { PokemonDetail } from '../pokemon';
import { Logo } from '../shared/Logo';
import { PokemonFragment } from '../../@types/graphql';

interface DrawerLayoutProps {
  children?: ReactNode;
  data: Array<PokemonFragment>;
}

export const DrawerLayout = ({
  children,
  data,
}: DrawerLayoutProps) => {
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

  // React.useEffect(() => {
  //   if (data) {
  //     setInViewData(data.slice(0, 26));
  //   }
  // }, [data]);

  return (
    <>
      <Header />
      <Container maxW={'7xl'} flex={'1 0 auto'} py={8}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: 0, lg: 8 }}
        >
          <PokemonItem
            inViewData={inViewData}
            setInViewData={setInViewData}
            data={data}
          />
          <PokemonDetail
            inViewData={inViewData}
            setInViewData={setInViewData}
            data={data}
          />
        </Stack>
      </Container>
      <Footer />

      <IconButton
        display={{ base: 'block', lg: 'none' }}
        position={'fixed'}
        bottom={4}
        right={6}
        size={'md'}
        isRound={true}
        onClick={onOpen}
        aria-label={'Toggle Docs Menu'}
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
            <DrawerHeader>
              <Icon as={Logo} w={10} h={10} />
            </DrawerHeader>
            <DrawerBody>
              <Navigation />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};
