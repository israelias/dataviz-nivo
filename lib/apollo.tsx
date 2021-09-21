import { NextComponentType } from 'next';
import { useMemo } from 'react';
import {
  ApolloClient,
  NormalizedCacheObject,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { IncomingMessage, ServerResponse } from 'http';

import fetch from 'cross-fetch';

// https://github.com/correttojs/graphql-codegen-apollo-next-ssr/blob/main/example/src/withApollo.tsx

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

export type ApolloClientContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

function createIsomorphLink(context: ApolloClientContext = {}) {
  const { HttpLink } = require('@apollo/client');
  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
  });
}

export const withApollo =
  (Comp: NextComponentType) => (props: any) => {
    return (
      <ApolloProvider
        client={getApolloClient(undefined, props.apolloState)}
      >
        <Comp />
      </ApolloProvider>
    );
  };

export const getApolloClient = (
  ctx?: ApolloClientContext,
  initialState?: NormalizedCacheObject
) => {
  if (ctx) {
    return new ApolloClient({
      ssrMode: typeof window === 'undefined',
      link: createIsomorphLink(ctx),
      cache: new InMemoryCache(),
    });
  }

  const httpLink = createHttpLink({
    uri: 'https://graphql-pokemon2.vercel.app',
    fetch: fetch,
  });
  const cache = new InMemoryCache().restore(initialState || {});
  return new ApolloClient({
    link: httpLink,
    cache,
    connectToDevTools: true,
  });
};

export function initializeApollo(
  initialState: any = null,
  // Pages with Next.js data fetching methods, like `getStaticProps`, can send
  // a custom context which will be used by `SchemaLink` to server render pages
  context?: ApolloClientContext
) {
  const _apolloClient = apolloClient ?? getApolloClient(context);

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(initialState: any) {
  const store = useMemo(
    () => getApolloClient(initialState),
    [initialState]
  );
  return store;
}
