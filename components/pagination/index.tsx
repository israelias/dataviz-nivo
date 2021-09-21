import React from 'react';
import { Flex, HStack, Button } from '@chakra-ui/react';

const Pagination = ({
  hasPrev,
  hasNext,
  page,
  setPage,
}: {
  hasPrev: boolean | undefined;
  hasNext: boolean | undefined;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => (
  <>
    <Flex
      id="pagination"
      height="62px"
      pr={'-24px'}
      top={{ base: '39px', lg: 0 }}
      zIndex={10}
      position="sticky"
      width="100%"
      bg={'#1f1f1f'}
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        pl="10px"
        pr="10px"
      >
        <HStack
          display="flex"
          spacing={8}
          alignItems="center"
          width="100%"
          justifyContent="space-between"
        >
          <Button
            fontSize="10px"
            height="44px"
            size="sm"
            disabled={!hasPrev}
            cursor="pointer"
            bg={'#3b3e46'}
            color={'#fafafa'}
            onClick={() => setPage(page === 1 ? 1 : page - 1)}
          >
            Previous
          </Button>
          <Button
            fontSize="10px"
            height="44px"
            size="sm"
            cursor="pointer"
            bg={'#3b3e46'}
            color={'#fafafa'}
            onClick={() => setPage(0)}
          >
            RePool
          </Button>
          <Button
            fontSize="10px"
            height="44px"
            size="sm"
            disabled={!hasNext}
            cursor="pointer"
            onClick={() => setPage(page === 6 ? 6 : page + 1)}
            bg={'#3b3e46'}
            color={'#fafafa'}
            zIndex={1}
          >
            {page === 0 ? 'Start' : 'Next'}
          </Button>
        </HStack>
      </Flex>
    </Flex>
  </>
);

export default Pagination;
