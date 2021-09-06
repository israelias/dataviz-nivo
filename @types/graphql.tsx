import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Represents a Pokémon's attack types */
export type Attack = {
  __typename?: 'Attack';
  /** The name of this Pokémon attack */
  name?: Maybe<Scalars['String']>;
  /** The type of this Pokémon attack */
  type?: Maybe<Scalars['String']>;
  /** The damage of this Pokémon attack */
  damage?: Maybe<Scalars['Int']>;
};

/** Represents a Pokémon */
export type Pokemon = {
  __typename?: 'Pokemon';
  /** The ID of an object */
  id: Scalars['ID'];
  /** The identifier of this Pokémon */
  number?: Maybe<Scalars['String']>;
  /** The name of this Pokémon */
  name?: Maybe<Scalars['String']>;
  /** The minimum and maximum weight of this Pokémon */
  weight?: Maybe<PokemonDimension>;
  /** The minimum and maximum weight of this Pokémon */
  height?: Maybe<PokemonDimension>;
  /** The classification of this Pokémon */
  classification?: Maybe<Scalars['String']>;
  /** The type(s) of this Pokémon */
  types?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The type(s) of Pokémons that this Pokémon is resistant to */
  resistant?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** The attacks of this Pokémon */
  attacks?: Maybe<PokemonAttack>;
  /** The type(s) of Pokémons that this Pokémon weak to */
  weaknesses?: Maybe<Array<Maybe<Scalars['String']>>>;
  fleeRate?: Maybe<Scalars['Float']>;
  /** The maximum CP of this Pokémon */
  maxCP?: Maybe<Scalars['Int']>;
  /** The evolutions of this Pokémon */
  evolutions?: Maybe<Array<Maybe<Pokemon>>>;
  /** The evolution requirements of this Pokémon */
  evolutionRequirements?: Maybe<PokemonEvolutionRequirement>;
  /** The maximum HP of this Pokémon */
  maxHP?: Maybe<Scalars['Int']>;
  image?: Maybe<Scalars['String']>;
};

/** Represents a Pokémon's attack types */
export type PokemonAttack = {
  __typename?: 'PokemonAttack';
  /** The fast attacks of this Pokémon */
  fast?: Maybe<Array<Maybe<Attack>>>;
  /** The special attacks of this Pokémon */
  special?: Maybe<Array<Maybe<Attack>>>;
};

/** Represents a Pokémon's dimensions */
export type PokemonDimension = {
  __typename?: 'PokemonDimension';
  /** The minimum value of this dimension */
  minimum?: Maybe<Scalars['String']>;
  /** The maximum value of this dimension */
  maximum?: Maybe<Scalars['String']>;
};

/** Represents a Pokémon's requirement to evolve */
export type PokemonEvolutionRequirement = {
  __typename?: 'PokemonEvolutionRequirement';
  /** The amount of candy to evolve */
  amount?: Maybe<Scalars['Int']>;
  /** The name of the candy to evolve */
  name?: Maybe<Scalars['String']>;
};

/** Query any Pokémon by number or name */
export type Query = {
  __typename?: 'Query';
  query?: Maybe<Query>;
  pokemons?: Maybe<Array<Maybe<Pokemon>>>;
  pokemon?: Maybe<Pokemon>;
};


/** Query any Pokémon by number or name */
export type QueryPokemonsArgs = {
  first: Scalars['Int'];
};


/** Query any Pokémon by number or name */
export type QueryPokemonArgs = {
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type PokemonFragment = { __typename?: 'Pokemon', id: string, number?: Maybe<string>, name?: Maybe<string>, image?: Maybe<string>, classification?: Maybe<string>, weight?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }>, height?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }> };

export type GetFirstPokemonsQueryVariables = Exact<{
  first: Scalars['Int'];
}>;


export type GetFirstPokemonsQuery = { __typename?: 'Query', pokemons?: Maybe<Array<Maybe<{ __typename?: 'Pokemon', id: string, number?: Maybe<string>, name?: Maybe<string>, image?: Maybe<string>, classification?: Maybe<string>, weight?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }>, height?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }> }>>> };

export type GetPokemonByIdQueryVariables = Exact<{
  id?: Maybe<Scalars['String']>;
}>;


export type GetPokemonByIdQuery = { __typename?: 'Query', pokemon?: Maybe<{ __typename?: 'Pokemon', id: string, number?: Maybe<string>, name?: Maybe<string>, image?: Maybe<string>, classification?: Maybe<string>, weight?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }>, height?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }> }> };

export type GetPokemonByNameQueryVariables = Exact<{
  name?: Maybe<Scalars['String']>;
}>;


export type GetPokemonByNameQuery = { __typename?: 'Query', pokemon?: Maybe<{ __typename?: 'Pokemon', id: string, number?: Maybe<string>, name?: Maybe<string>, image?: Maybe<string>, classification?: Maybe<string>, weight?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }>, height?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }> }> };

export type GetAllPokemonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllPokemonsQuery = { __typename?: 'Query', pokemons?: Maybe<Array<Maybe<{ __typename?: 'Pokemon', id: string, number?: Maybe<string>, name?: Maybe<string>, image?: Maybe<string>, classification?: Maybe<string>, weight?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }>, height?: Maybe<{ __typename?: 'PokemonDimension', minimum?: Maybe<string>, maximum?: Maybe<string> }> }>>> };

export const PokemonFragmentDoc = gql`
    fragment pokemon on Pokemon {
  id
  number
  name
  image
  classification
  weight {
    minimum
    maximum
  }
  height {
    minimum
    maximum
  }
}
    `;
export const GetFirstPokemonsDocument = gql`
    query GetFirstPokemons($first: Int!) {
  pokemons(first: $first) {
    ...pokemon
  }
}
    ${PokemonFragmentDoc}`;

/**
 * __useGetFirstPokemonsQuery__
 *
 * To run a query within a React component, call `useGetFirstPokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFirstPokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFirstPokemonsQuery({
 *   variables: {
 *      first: // value for 'first'
 *   },
 * });
 */
export function useGetFirstPokemonsQuery(baseOptions: Apollo.QueryHookOptions<GetFirstPokemonsQuery, GetFirstPokemonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFirstPokemonsQuery, GetFirstPokemonsQueryVariables>(GetFirstPokemonsDocument, options);
      }
export function useGetFirstPokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFirstPokemonsQuery, GetFirstPokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFirstPokemonsQuery, GetFirstPokemonsQueryVariables>(GetFirstPokemonsDocument, options);
        }
export type GetFirstPokemonsQueryHookResult = ReturnType<typeof useGetFirstPokemonsQuery>;
export type GetFirstPokemonsLazyQueryHookResult = ReturnType<typeof useGetFirstPokemonsLazyQuery>;
export type GetFirstPokemonsQueryResult = Apollo.QueryResult<GetFirstPokemonsQuery, GetFirstPokemonsQueryVariables>;
export const GetPokemonByIdDocument = gql`
    query GetPokemonById($id: String) {
  pokemon(id: $id) {
    ...pokemon
  }
}
    ${PokemonFragmentDoc}`;

/**
 * __useGetPokemonByIdQuery__
 *
 * To run a query within a React component, call `useGetPokemonByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPokemonByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokemonByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPokemonByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPokemonByIdQuery, GetPokemonByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPokemonByIdQuery, GetPokemonByIdQueryVariables>(GetPokemonByIdDocument, options);
      }
export function useGetPokemonByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPokemonByIdQuery, GetPokemonByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPokemonByIdQuery, GetPokemonByIdQueryVariables>(GetPokemonByIdDocument, options);
        }
export type GetPokemonByIdQueryHookResult = ReturnType<typeof useGetPokemonByIdQuery>;
export type GetPokemonByIdLazyQueryHookResult = ReturnType<typeof useGetPokemonByIdLazyQuery>;
export type GetPokemonByIdQueryResult = Apollo.QueryResult<GetPokemonByIdQuery, GetPokemonByIdQueryVariables>;
export const GetPokemonByNameDocument = gql`
    query GetPokemonByName($name: String) {
  pokemon(name: $name) {
    ...pokemon
  }
}
    ${PokemonFragmentDoc}`;

/**
 * __useGetPokemonByNameQuery__
 *
 * To run a query within a React component, call `useGetPokemonByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPokemonByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokemonByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetPokemonByNameQuery(baseOptions?: Apollo.QueryHookOptions<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>(GetPokemonByNameDocument, options);
      }
export function useGetPokemonByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>(GetPokemonByNameDocument, options);
        }
export type GetPokemonByNameQueryHookResult = ReturnType<typeof useGetPokemonByNameQuery>;
export type GetPokemonByNameLazyQueryHookResult = ReturnType<typeof useGetPokemonByNameLazyQuery>;
export type GetPokemonByNameQueryResult = Apollo.QueryResult<GetPokemonByNameQuery, GetPokemonByNameQueryVariables>;
export const GetAllPokemonsDocument = gql`
    query GetAllPokemons {
  pokemons(first: 151) {
    ...pokemon
  }
}
    ${PokemonFragmentDoc}`;

/**
 * __useGetAllPokemonsQuery__
 *
 * To run a query within a React component, call `useGetAllPokemonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPokemonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPokemonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllPokemonsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPokemonsQuery, GetAllPokemonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPokemonsQuery, GetAllPokemonsQueryVariables>(GetAllPokemonsDocument, options);
      }
export function useGetAllPokemonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPokemonsQuery, GetAllPokemonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPokemonsQuery, GetAllPokemonsQueryVariables>(GetAllPokemonsDocument, options);
        }
export type GetAllPokemonsQueryHookResult = ReturnType<typeof useGetAllPokemonsQuery>;
export type GetAllPokemonsLazyQueryHookResult = ReturnType<typeof useGetAllPokemonsLazyQuery>;
export type GetAllPokemonsQueryResult = Apollo.QueryResult<GetAllPokemonsQuery, GetAllPokemonsQueryVariables>;