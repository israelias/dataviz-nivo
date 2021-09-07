import {
  Box,
  Flex,
  Container,
  Stack,
  useDisclosure,
  IconButton,
  Icon,
  Heading,
} from '@chakra-ui/react';
import {
  CloseIcon,
  HamburgerIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Logo } from '../shared/Logo';
import { TextUnderline } from '../shared/TextUnderline';
import { MobileNav } from './mobilenav.header';
import { DesktopNav } from './desktopnav.header';

export const Header = ({ selected }: { selected?: boolean }) => {
  const { isOpen: isMobileNavOpen, onToggle } = useDisclosure();
  const router = useRouter();
  return (
    <Box>
      <Flex
        as={'header'}
        pos="fixed"
        top="0"
        w={'full'}
        minH={'60px'}
        boxShadow={'sm'}
        zIndex="999"
        justify={'center'}
        css={{
          backdropFilter: 'saturate(180%) blur(5px)',
          backgroundColor: '#3b3e46',
        }}
      >
        <Container as={Flex} maxW={'7xl'} align={'center'}>
          <Flex
            flex={{ base: '0', md: 'auto' }}
            ml={{ base: -2 }}
            mr={{ base: 6, md: 0 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isMobileNavOpen ? (
                  <CloseIcon w={3} h={3} />
                ) : (
                  <HamburgerIcon w={5} h={5} />
                )
              }
              variant={'ghost'}
              size={'sm'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>

          <Flex
            flex={{ base: 1, md: 'auto' }}
            justify={{ base: 'start', md: 'start' }}
          >
            <Link href={'/'} passHref>
              <Stack
                as={'a'}
                direction={'row'}
                alignItems={'center'}
                spacing={{ base: 2, sm: 4 }}
              >
                <Icon as={Logo} w={{ base: 8 }} h={{ base: 8 }} />
                <Heading
                  as={'h1'}
                  fontSize={'xl'}
                  color={'#b0964c'}
                  display={{ base: 'none', md: 'block' }}
                >
                  <TextUnderline>Poke</TextUnderline>dex
                </Heading>
              </Stack>
            </Link>
          </Flex>

          <Stack
            direction={'row'}
            align={'center'}
            spacing={{ base: 6, md: 8 }}
            flex={{ base: 1, md: 'auto' }}
            justify={'flex-end'}
          >
            <DesktopNav display={{ base: 'none', md: 'flex' }} />
            {selected && (
              <IconButton
                size={'sm'}
                variant={'outline'}
                borderColor={'#f1c857'}
                aria-label={'Toggle Color Mode'}
                onClick={() => router.back()}
                icon={<ArrowBackIcon color={'#f1c857'} size={24} />}
              />
            )}
          </Stack>
        </Container>
      </Flex>
      <MobileNav isOpen={isMobileNavOpen} />
    </Box>
  );
};
