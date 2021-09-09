import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { PokemonFragment } from '../../../@types/graphql';
import { usePokemonsData } from '../../../context/pokemon.context';
import { DexTheme } from './configs';

const MotionBox = motion(Box);
export const RadarDefault = ({
  data,
  inViewData,
  setInViewData,
  selected,
  name,
  number,
}: {
  data: Array<PokemonFragment>;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
  selected?: boolean;
  name?: string;
  number?: string;
}) => {
  const { inViewNum } = usePokemonsData();

  return (
    <MotionBox height="80vh">
      {data && (
        <ResponsiveRadar
          key={'default-radar'}
          // data={data.map((d) => ({
          //   name: d?.name,
          //   maxCP: d?.maxCP,
          //   maxHP: d?.maxHP,
          //   maxHeight: parseInt(d?.height?.maximum),
          //   maxWeight: parseInt(d?.weight?.maximum),
          // }))}
          data={data}
          keys={['maxCP', 'maxHP']}
          indexBy="name"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 120 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: 'color' }}
          gridLevels={5}
          gridShape="linear"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotBorderColor={{ from: 'color' }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-12}
          colors={{ scheme: 'nivo' }}
          fillOpacity={0.25}
          blendMode="multiply"
          animate={true}
          // @ts-ignore
          motionConfig="wobbly"
          isInteractive={true}
          theme={DexTheme}
          legends={[
            {
              anchor: 'top-right',
              direction: 'column',
              translateX: -100,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#e6e6e6',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#f1c857',
                  },
                },
              ],
            },
          ]}
        />
      )}
    </MotionBox>
  );
};

export default RadarDefault;
