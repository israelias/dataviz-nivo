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
  Stat,
  StatLabel,
  StatNumber,
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
      px={{ base: 2, md: 4 }}
      py={'5'}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}
    >
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'2xl'} fontWeight={'medium'}>
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
    >
      <Image
        borderRadius="full"
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
  const [baseLg] = useMediaQuery(['(min-width: 62em)']);

  return (
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
          <Box>
            <Box>
              {classification && (
                <ClassTags tags={[classification]} />
              )}
            </Box>

            <Heading color={'#f1c857'} fontSize="xl" marginTop="2">
              <Link
                textDecoration="none"
                _hover={{ textDecoration: 'none' }}
              >
                {name}
              </Link>
            </Heading>
          </Box>
          <Box>
            {name && image && (
              <PokemonSignature
                name={name}
                image={image}
                date={new Date('2021-04-06T19:01:27Z')}
              />
            )}
          </Box>
        </Box>
      </WrapItem>
      <WrapItem>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={{ base: 5, lg: 8 }}
        >
          {maxCP && (
            <StatsCard
              title={baseLg ? 'Maximum Combat Power ' : 'maxCP'}
              stat={maxCP.toString()}
              // icon={<BsPerson size={'3em'} />}
            />
          )}
          {maxHP && (
            <StatsCard
              title={baseLg ? 'Maximum Hit Points ' : 'maxHP'}
              stat={maxHP.toString()}
              // icon={<FiServer size={'3em'} />}
            />
          )}
          {height && (
            <StatsCard
              title={baseLg ? 'Height ' : 'Hgt'}
              stat={height.toString()}
              // icon={<GoLocation size={'3em'} />}
            />
          )}
          {weight && (
            <StatsCard
              title={baseLg ? 'Weight ' : 'Wgt'}
              stat={weight.toString()}
              // icon={<GoLocation size={'3em'} />}
            />
          )}
        </SimpleGrid>
      </WrapItem>
    </Wrap>
  );
};

export default Details;
