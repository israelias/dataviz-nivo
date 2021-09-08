import React from 'react';
import {
  Flex,
  HStack,
  Button,
  useColorModeValue as mode,
} from '@chakra-ui/react';

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
      top={{ base: '39px', lg: 0 }}
      zIndex={10}
      position="sticky"
      width="100%"
      maxWidth={{ base: '100vw' }}
      bg={mode('#fff', '#141625')}
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
            onClick={() => setPage(page - 1)}
          >
            Previous
          </Button>
          <Button
            fontSize="10px"
            height="44px"
            size="sm"
            disabled={!hasNext}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </HStack>
      </Flex>
    </Flex>
  </>
);

export default Pagination;
