import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';
import { AppProps, NextWebVitalsMetric } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { theme } from '../theme';
import PokemonsDataProvider from '../context/pokemon.context';
import AuthProvider from '../context/auth.context';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }: AppProps) {
  // const apolloClient = useApollo(pageProps);

  return (
    <>
      <PokemonsDataProvider>
        <AuthProvider>
          <ChakraProvider theme={theme}>
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <link
                rel="shortcut icon"
                type="image/x-icon"
                href="/favicon.png"
              />
              <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
              />
              <link
                href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap"
                rel="stylesheet"
              />
            </Head>
            <Component {...pageProps} />
          </ChakraProvider>
        </AuthProvider>
      </PokemonsDataProvider>
    </>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}
