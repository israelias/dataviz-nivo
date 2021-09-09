import React from 'react';
import { ApolloError } from '@apollo/client';

import { PokemonFragment } from '../@types/graphql';

export type PokemonsReturnType = Array<PokemonFragment>;

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
  error?: ApolloError | any;
}

export interface StateInterface {
  pokemons?: PokemonsReturnType;
  currentPage?: number;
  loading: boolean;
  error?: ApolloError | any;
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
  pokemonsDeck: PokemonsReturnType | undefined;
  setPokemonsDeck: React.Dispatch<
    React.SetStateAction<PokemonsReturnType>
  >;
  loading: boolean;
  error: {} | undefined;
  hasPrev: boolean;
  hasNext: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;

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
  const [pokemonsDeck, setPokemonsDeck] = React.useState<
    PokemonsReturnType | undefined
  >(undefined!);
  const [page, setPage] = React.useState<number>(0);

  const [hasNext, setHasNext] = React.useState<boolean>(true);
  const [hasPrev, setHasPrev] = React.useState<boolean>(false);
  const [inViewNum, setInViewNum] = React.useState<string>('001');

  React.useEffect(() => {
    if (pokemons) {
      setPokemonsDeck(pokemons);
    }
  }, [state]);

  console.log(page);

  React.useEffect(() => {
    if (page === 1) {
      setPokemonsDeck(pokemons?.slice(0, 26));
    }
    if (page === 2) {
      setPokemonsDeck(pokemons?.slice(25, 51));
    }
    if (page === 3) {
      setPokemonsDeck(pokemons?.slice(50, 76));
    }
    if (page === 4) {
      setPokemonsDeck(pokemons?.slice(75, 101));
    }
    if (page === 5) {
      setPokemonsDeck(pokemons?.slice(100, 126));
    }
    if (page === 6) {
      setPokemonsDeck(pokemons?.slice(125, 151));
    }
    if (page === 0) {
      setPokemonsDeck(pokemons);
    }
  }, [page, pokemons]);

  React.useEffect(() => {
    if (page < 7 && page > 1) {
      setHasPrev(true);
    } else {
      setHasPrev(false);
    }
    if (page === 6) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }
  }, [page, pokemonsDeck]);

  return (
    <PokemonsData.Provider
      value={{
        pokemonsDeck,
        setPokemonsDeck,
        loading,
        error,
        pokemons,
        state,
        dispatch,
        page,
        setPage,
        hasPrev,
        hasNext,
        inViewNum,
        setInViewNum,
      }}
    >
      {children}
    </PokemonsData.Provider>
  );
}

export const usePokemonsData = () => React.useContext(PokemonsData);
