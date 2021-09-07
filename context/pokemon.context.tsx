import React from 'react';
import {
  QueryResult,
  OperationVariables,
  useQuery,
} from '@apollo/client';

import {
  useGetAllPokemonsLazyQuery,
  PokemonFragment,
  GetAllPokemonsDocument,
  GetAllPokemonsQueryHookResult,
  GetAllPokemonsLazyQueryHookResult,
  useGetAllPokemonsQuery,
  GetAllPokemonsQuery,
} from '../@types/graphql';

import {
  PageGetAllPokemonsComp,
  ssrGetAllPokemons,
} from '../lib/hooks';

/**
 * Third-level Context provider for all user-specific snipetts and collections data.
 * Relies on UserContext's username upon login to fetch user's data.
 *
 * @since 2021-04-08
 */

export type PokemonsReturnType = Array<PokemonFragment>;
// QueryResult<GetAllPokemonsQuery, OperationVariables>;

export enum PokemonActionTypes {
  fetchPokemons,
  fetchPokemonsSuccess,
  fetchPokemonsFailure,
  fetchPokemonsPage,
}

export interface FetchPokemonsAction {
  type: PokemonActionTypes;
  pokemons?: PokemonsReturnType;
  currentPage?: number;
  error?: object;
}

export interface StateInterface {
  pokemons?: PokemonsReturnType;
  currentPage?: number;
  loading: boolean;
  error?: object;
}

const initialState: StateInterface = {
  pokemons: undefined,
  currentPage: 1,
  loading: false,
  error: {},
};

type StatusType = {
  status: string;
};

type PokemonsDataType = {
  pokemons: PokemonsReturnType | undefined;
  loading: boolean;
  error: {} | undefined;
  // previousPage: number;
  page: number;
  // currentPage: number;
  handlePageChange: (nextPage: number) => void;
  getPokemonsByPage: (nextPage: number) => PokemonFragment[];
  // getAllPokemonsData: () => Promise<void>;
  inViewNum: string;
  setInViewNum: React.Dispatch<React.SetStateAction<string>>;
  state: StateInterface;
  dispatch: React.Dispatch<FetchPokemonsAction>;
};

const PokemonsData = React.createContext<PokemonsDataType>(
  undefined!
);

export default function PokemonsDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = React.useReducer(
    (
      state: StateInterface,
      { type, pokemons, currentPage, error }: FetchPokemonsAction
    ) => {
      switch (type) {
        case PokemonActionTypes.fetchPokemons:
          return { ...state, loading: true };

        case PokemonActionTypes.fetchPokemonsSuccess:
          return { ...state, pokemons, currentPage, loading: false };

        case PokemonActionTypes.fetchPokemonsPage:
          return { ...state, pokemons, currentPage, loading: false };

        case PokemonActionTypes.fetchPokemonsFailure:
          return { ...state, error: error, loading: false };

        default:
          return state;
      }
    },
    initialState
  );

  const { pokemons, loading, error } = state;
  const [page, setPage] = React.useState<number>(1);
  const [inViewNum, setInViewNum] = React.useState<string>('001');

  const handlePageChange = (nextPage: number) => {
    dispatch({
      type: PokemonActionTypes.fetchPokemonsPage,
      currentPage: nextPage,
    });
  };

  const perPage = 10;

  const pokemonsContextValue = React.useMemo(
    () => ({
      getPokemonsByPage: (nextPage: number) => {
        if (page < nextPage) {
          setPage(nextPage);
        }
        return (
          pokemons &&
          pokemons.slice(
            page === 1 ? 0 : page * perPage - 1,
            perPage * nextPage + 1
          )
        );
      },

      loading,
      error,
      pokemons,
      state,
      dispatch,
      page,
      handlePageChange,
      inViewNum,
      setInViewNum,
    }),
    [state]
  );

  return (
    <PokemonsData.Provider value={pokemonsContextValue}>
      {children}
    </PokemonsData.Provider>
  );
}

export const usePokemonsData = () => React.useContext(PokemonsData);
