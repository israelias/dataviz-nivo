import { ReactNode } from 'react';

import { Header } from '../header';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      {children}
      < />
    </>
  );
};
