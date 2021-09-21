import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
  colors: {
    discord: '#7289da',
    deckBg: '#2d2f36',
    deckHeaderBg: '#3f414b',
    footerBg: '#1f1f1f',
    highlight: '#f1c857',
    text: '#ededed',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
  styles: {
    global: {
      'html, #__next': {
        height: '100%',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
      },
      '.body': {
        // todo check how to do this without breaking the site
        // height: '100%', // Push footer to bottom
        overflowY: 'scroll', // Always show scrollbar to avoid flickering
      },
      html: {
        scrollBehavior: 'smooth',
      },
      body: {
        backgroundColor: '#3b3e46',
      },
      '#nprogress': {
        pointerEvents: 'none',
      },
      '#nprogress .bar': {
        background: '#f1c857',
        position: 'fixed',
        zIndex: '1031',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
      },
    },
  },
});
