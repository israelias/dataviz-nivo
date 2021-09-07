import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { PokemonFragment } from '../../@types/graphql';
import { usePokemonsData } from '../../context/pokemon.context';

const MotionBox = motion(Box);
export const Radar = ({
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
  const local =
    inViewData &&
    inViewData.map((d) => ({
      name: d?.name,
      maxCP: d?.maxCP,
      maxHP: d?.maxHP,
    }));

  const borderWidth = selected ? 5 : 2;
  const gridLevels = selected ? 12 : 5;
  const gridShape = selected ? 'linear' : 'circular';
  const dotSize = selected ? 30 : 10;
  const dotBorderColor = selected
    ? { labels: { text: 'fill' } }
    : { from: 'color' };
  const fillOpacity = selected ? 1 : 0.25;
  return (
    <MotionBox height="80vh">
      {inViewData && (
        <ResponsiveRadar
          data={inViewData.map((d) => ({
            name: d?.name,
            maxCP: d?.maxCP,
            maxHP: d?.maxHP,
          }))}
          keys={['maxCP', 'maxHP']}
          indexBy="name"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={borderWidth}
          borderColor={{ from: 'color' }}
          gridLevels={gridLevels}
          gridShape={gridShape}
          gridLabelOffset={36}
          enableDots={true}
          dotSize={dotSize}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotBorderColor={{
            from: selected ? 'labels.text.fill' : 'color',
          }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-12}
          colors={{ scheme: 'nivo' }}
          fillOpacity={fillOpacity}
          blendMode="multiply"
          animate={true}
          // @ts-ignore
          motionConfig="wobbly"
          isInteractive={true}
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
