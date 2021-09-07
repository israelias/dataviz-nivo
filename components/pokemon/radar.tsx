// install (please make sure versions match peerDependencies)
// yarn add @nivo/core @nivo/radar
import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
// import { MotionBox } from '../shared/MotionBox';
import { PokemonFragment } from '../../@types/graphql';
import { usePokemonsData } from '../../context/pokemon.context';
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const MotionBox = motion(Box);
export const Radar = ({
  data,
  inViewData,
  setInViewData,
}: {
  data: Array<PokemonFragment>;
  inViewData?: Array<PokemonFragment>;
  setInViewData?: React.Dispatch<
    React.SetStateAction<PokemonFragment[]>
  >;
}) => {
  const { inViewNum } = usePokemonsData();
  const local =
    inViewData &&
    inViewData.map((d) => ({
      name: d.name,
      maxCP: d.maxCP,
      maxHP: d.maxHP,
    }));

  return (
    <MotionBox height="80vh">
      <ResponsiveRadar
        data={local}
        keys={['maxCP', 'maxHP']}
        indexBy="name"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
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
    </MotionBox>
  );
};
