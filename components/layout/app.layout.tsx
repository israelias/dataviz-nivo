import { ReactNode } from 'react';

import { Header } from '../header';
import { Footer } from '../shared/Footer';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
