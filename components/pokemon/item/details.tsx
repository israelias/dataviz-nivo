import React from 'react';
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useMediaQuery,
  useColorModeValue,
  Flex,
  SimpleGrid,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  Stack,
  Container,
} from '@chakra-ui/react';

import { ReactNode } from 'react';

import { PokemonFragment } from '../../../@types/graphql';

interface StatsCardProps {
  title: string;
  stat: string;
  icon?: ReactNode;
}
function StatsCard(props: StatsCardProps) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 1, md: 2 }}
      py={'2'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={'#f1c857'}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel
            color={'#ad9041'}
            fontWeight={'medium'}
            isTruncated
          >
            {title}
          </StatLabel>
          <StatNumber
            color={'#dfcc99'}
            fontSize={'sm'}
            fontWeight={'normal'}
          >
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}
        >
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

const ClassTags = ({ tags }: { tags: Array<any> }) => {
  return (
    <HStack spacing={2} marginTop="3">
      {tags.map((tag) => {
        return (
          <Tag
            size={'md'}
            variant="solid"
            colorScheme="orange"
            key={tag}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const PokemonSignature = ({
  name,
  image,
  date,
}: {
  name: string;
  image: string;
  date: Date;
}) => {
  return (
    <HStack
      marginTop="2"
      spacing="2"
      display="flex"
      alignItems="center"
      color={'#f1c857'}
    >
      <Image
        borderRadius="full"
        border="1px solid"
        borderColor={'#f1c857'}
        boxSize="40px"
        src={image}
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{date.toLocaleDateString()}</Text>
    </HStack>
  );
};

const Details = ({
  number,
  classification,
  weight,
  height,
  image,
  maxCP,
  maxHP,
  name,
}: PokemonFragment) => {
  const [baseLg] = useMediaQuery('(min-width: 39em)');

  return (
    <Stack
      py={8}
      mt={16}
      zIndex={-1}
      // height={selected ? '100vh' : 'unset'}
      as={'section'}
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
      <Heading color={'#f1c857'} as="h1">
        {name}
      </Heading>

      <Wrap spacing="30px" marginTop="5">
        <WrapItem
          width={{ base: '100%', sm: '45%', md: '45%', lg: '75%' }}
        >
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Link
                textDecoration="none"
                _hover={{ textDecoration: 'none' }}
              >
                <Image
                  transform="scale(1.0)"
                  src={image}
                  alt="some text"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Link>
            </Box>

            {classification && <ClassTags tags={[classification]} />}
          </Box>
        </WrapItem>
        <Box
          zIndex="1"
          top={0}
          width="380px"
          position="absolute"
          height="100%"
        >
          <Box
            bgGradient={useColorModeValue(
              'radial(orange.600 1px, transparent 1px)',
              'radial(orange.300 1px, transparent 1px)'
            )}
            backgroundSize="20px 20px"
            opacity="0.4"
            height="100%"
          />
        </Box>
        <Heading
          as="h3"
          fontWeight="semibold"
          color={'#f1c857'}
          fontSize="xl"
          marginTop="2"
        >
          <Link
            textDecoration="none"
            _hover={{ textDecoration: 'none' }}
          >
            {name && `${name}'s`} Stats
          </Link>
        </Heading>

        <WrapItem
          paddingTop="16px"
          spacing="2"
          alignItems="flex-start"
        >
          <SimpleGrid
            // pr={'16px'}
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 5, lg: 4 }}
          >
            {maxCP && (
              <StatsCard
                title={'maxCP'}
                stat={maxCP.toString()}
                // icon={<BsPerson size={'3em'} />}
              />
            )}
            {maxHP && (
              <StatsCard
                title={'maxHP'}
                stat={maxHP.toString()}
                // icon={<FiServer size={'3em'} />}
              />
            )}
            {height && (
              <>
                <StatsCard
                  title={'Min Hgt'}
                  stat={height.minimum.toString()}
                  // icon={<GoLocation size={'3em'} />}
                />
                <StatsCard
                  title={'Max Hgt'}
                  stat={height.maximum.toString()}
                  // icon={<GoLocation size={'3em'} />}
                />
              </>
            )}
            {weight && (
              <>
                <StatsCard
                  title={'Min Wgt'}
                  stat={weight.minimum.toString()}
                  // icon={<GoLocation size={'3em'} />}
                />
                <StatsCard
                  title={'Max Wgt'}
                  stat={weight.maximum.toString()}
                  // icon={<GoLocation size={'3em'} />}
                />
              </>
            )}
          </SimpleGrid>
        </WrapItem>
      </Wrap>
    </Stack>
  );
};

export default Details;
