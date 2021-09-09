import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { PokemonFragment } from '../../../@types/graphql';
import { usePokemonsData } from '../../../context/pokemon.context';

const MotionBox = motion(Box);
const RadarRedux = ({
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
    data &&
    data.map((d) => ({
      name: d.name,
      maxCP: d.maxCP,
      maxHP: d.maxHP,
    }));

  return (
    <MotionBox key={'box-redux-radar'} height="80vh">
      {data && (
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
          theme={{ textColor: '#759cb6' }}
          legends={[
            {
              anchor: 'top-right',
              direction: 'column',
              translateX: -100,
              translateY: -40,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999',
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

export default RadarRedux;
