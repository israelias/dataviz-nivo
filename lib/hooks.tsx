import * as Types from '../@types/graphql';

import * as Operations from '../@types/graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router';
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import type { NormalizedCacheObject } from '@apollo/client';
export async function getServerPageGetFirstPokemons(
  options: Omit<
    Apollo.QueryOptions<Types.GetFirstPokemonsQueryVariables>,
    'query'
  >,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.GetFirstPokemonsQuery>({
    ...options,
    query: Operations.GetFirstPokemonsDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useGetFirstPokemons = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetFirstPokemonsQuery,
    Types.GetFirstPokemonsQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetFirstPokemonsDocument, options);
};
export type PageGetFirstPokemonsComp = React.FC<{
  data?: Types.GetFirstPokemonsQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetFirstPokemons =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.GetFirstPokemonsQuery,
      Types.GetFirstPokemonsQueryVariables
    >
  ) =>
  (WrappedComponent: PageGetFirstPokemonsComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(
      Operations.GetFirstPokemonsDocument,
      options
    );
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetFirstPokemons = {
  getServerPage: getServerPageGetFirstPokemons,
  withPage: withPageGetFirstPokemons,
  usePage: useGetFirstPokemons,
};
export async function getServerPageGetPokemonById(
  options: Omit<
    Apollo.QueryOptions<Types.GetPokemonByIdQueryVariables>,
    'query'
  >,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.GetPokemonByIdQuery>({
    ...options,
    query: Operations.GetPokemonByIdDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useGetPokemonById = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetPokemonByIdQuery,
    Types.GetPokemonByIdQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetPokemonByIdDocument, options);
};
export type PageGetPokemonByIdComp = React.FC<{
  data?: Types.GetPokemonByIdQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetPokemonById =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.GetPokemonByIdQuery,
      Types.GetPokemonByIdQueryVariables
    >
  ) =>
  (WrappedComponent: PageGetPokemonByIdComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(
      Operations.GetPokemonByIdDocument,
      options
    );
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetPokemonById = {
  getServerPage: getServerPageGetPokemonById,
  withPage: withPageGetPokemonById,
  usePage: useGetPokemonById,
};
export async function getServerPageGetPokemonByName(
  options: Omit<
    Apollo.QueryOptions<Types.GetPokemonByNameQueryVariables>,
    'query'
  >,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.GetPokemonByNameQuery>({
    ...options,
    query: Operations.GetPokemonByNameDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useGetPokemonByName = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetPokemonByNameQuery,
    Types.GetPokemonByNameQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetPokemonByNameDocument, options);
};
export type PageGetPokemonByNameComp = React.FC<{
  data?: Types.GetPokemonByNameQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetPokemonByName =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.GetPokemonByNameQuery,
      Types.GetPokemonByNameQueryVariables
    >
  ) =>
  (WrappedComponent: PageGetPokemonByNameComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(
      Operations.GetPokemonByNameDocument,
      options
    );
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetPokemonByName = {
  getServerPage: getServerPageGetPokemonByName,
  withPage: withPageGetPokemonByName,
  usePage: useGetPokemonByName,
};
export async function getServerPageGetAllPokemons(
  options: Omit<
    Apollo.QueryOptions<Types.GetAllPokemonsQueryVariables>,
    'query'
  >,
  apolloClient: Apollo.ApolloClient<NormalizedCacheObject>
) {
  const data = await apolloClient.query<Types.GetAllPokemonsQuery>({
    ...options,
    query: Operations.GetAllPokemonsDocument,
  });

  const apolloState = apolloClient.cache.extract();

  return {
    props: {
      apolloState: apolloState,
      data: data?.data,
      error: data?.error ?? data?.errors ?? null,
    },
  };
}
export const useGetAllPokemons = (
  optionsFunc?: (
    router: NextRouter
  ) => QueryHookOptions<
    Types.GetAllPokemonsQuery,
    Types.GetAllPokemonsQueryVariables
  >
) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetAllPokemonsDocument, options);
};
export type PageGetAllPokemonsComp = React.FC<{
  data?: Types.GetAllPokemonsQuery;
  error?: Apollo.ApolloError;
}>;
export const withPageGetAllPokemons =
  (
    optionsFunc?: (
      router: NextRouter
    ) => QueryHookOptions<
      Types.GetAllPokemonsQuery,
      Types.GetAllPokemonsQueryVariables
    >
  ) =>
  (WrappedComponent: PageGetAllPokemonsComp): NextPage =>
  (props) => {
    const router = useRouter();
    const options = optionsFunc ? optionsFunc(router) : {};
    const { data, error } = useQuery(
      Operations.GetAllPokemonsDocument,
      options
    );
    return <WrappedComponent {...props} data={data} error={error} />;
  };
export const ssrGetAllPokemons = {
  getServerPage: getServerPageGetAllPokemons,
  withPage: withPageGetAllPokemons,
  usePage: useGetAllPokemons,
};
