import {
  Stack,
  Box,
  BoxProps,
  Link,
  useColorModeValue,
  Text,
  Flex,
  Icon,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { NavItem } from './navData';
import { ChevronRightIcon } from '@chakra-ui/icons';

export const DesktopNav = (props: BoxProps) => {
  return <Stack direction={'row'} spacing={4} {...props}></Stack>;
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <NextLink href={href!} passHref={true}>
      <Link
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('green.50', 'gray.900') }}
      >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'green.400' }}
              fontWeight={500}
            >
              {label}
            </Text>
            <Text fontSize={'sm'}>{subLabel}</Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{
              opacity: '100%',
              transform: 'translateX(0)',
            }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon
              color={'green.400'}
              w={5}
              h={5}
              as={ChevronRightIcon}
            />
          </Flex>
        </Stack>
      </Link>
    </NextLink>
  );
};
