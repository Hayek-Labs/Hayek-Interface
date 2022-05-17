import { useContext } from 'react';
import { ContentType } from 'recharts/types/component/DefaultLegendContent';
import { getEntryKey, GaugeChartContext, PoolWithChartInfo } from '..';
import LegendEntry from './LegendEntry';

const Legend: ContentType = (props) => {
  const { payload } = props;

  const { onToggleVisible, visibility } = useContext(GaugeChartContext);

  if (payload !== undefined) {
    return (
      <ul className="recharts-default-legend p-0 m-0 text-center">
        {payload.map((entry) => {
          const payload = entry.payload as any as PoolWithChartInfo;
          return (
            <LegendEntry
              key={payload.key}
              payload={payload}
              onToggleVisible={onToggleVisible}
              visible={visibility[getEntryKey(payload)]}
            />
          );
        })}
      </ul>
    );
  }

  return null;
};

export default Legend;
