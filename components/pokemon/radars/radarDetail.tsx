import React from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { PokemonFragment } from '../../../@types/graphql';
import { usePokemonsData } from '../../../context/pokemon.context';
import { DetailTheme } from './configs';

const MotionBox = motion(Box);
const RadarDetail = ({
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
  return (
    <MotionBox key={'box-detail-radar'} height="80vh">
      {data && (
        <ResponsiveRadar
          key={'detail-radar'}
          data={data.map((d) => ({
            name: d?.name,
            maxCP: d?.maxCP,
            maxHP: d?.maxHP,
            maxHeight: parseInt(d?.height?.maximum),
            maxWeight: parseInt(d?.weight?.maximum),
          }))}
          keys={['maxCP', 'maxHP', 'maxHeight', 'maxWeight']}
          indexBy="name"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 120 }}
          curve="linearClosed"
          borderWidth={20}
          borderColor={{ theme: 'background' }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={36}
          enableDots={true}
          dotSize={41}
          dotColor={{ theme: 'background' }}
          dotBorderWidth={2}
          dotBorderColor={{
            from: 'color',
            modifiers: [['brighter', 1.6]],
          }}
          enableDotLabel={true}
          dotLabel="value"
          dotLabelYOffset={-24}
          colors={{ scheme: 'nivo' }}
          fillOpacity={1}
          blendMode="multiply"
          animate={true}
          // @ts-ignore
          motionConfig="wobbly"
          isInteractive={true}
          labelSkipWidth={12}
          labelSkipHeight={12}
          theme={DetailTheme}
          labelTextColor={{
            from: 'color',
            modifiers: [['brighter', 1.6]],
          }}
          legends={[
            {
              anchor: 'top-left',
              direction: 'column',
              translateX: -50,
              translateY: -60,
              itemWidth: 80,
              itemHeight: 20,
              itemTextColor: '#999',
              symbolSize: 12,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#fafafa',
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

export default RadarDetail;
