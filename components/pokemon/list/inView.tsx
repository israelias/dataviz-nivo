import React from 'react';

import { InView } from 'react-intersection-observer';

import { PokemonFragment } from '../../../@types/graphql';

export const InViewItem = ({
  data,
  inViewData,
  setInViewData,
  selected,
  name,
  number,
  xParam,
  setInViewNum,
  children,
}: {
  data: Array<PokemonFragment>;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
  selected?: boolean;
  name?: string;
  number?: string;
  xParam?: string;
  children?: React.ReactNode;
  inView?: boolean;
  setInView?: React.Dispatch<React.SetStateAction<boolean>>;
  setInViewNum?: React.Dispatch<React.SetStateAction<string>>;
}) => (
  <InView
    delay={1000}
    threshold={1}
    triggerOnce={true}
    onChange={(inView, entry) => {
      // setInViewNum(number?.toString());
      console.log('inView', number);
    }}
  >
    {children}
  </InView>
);

export default InViewItem;
