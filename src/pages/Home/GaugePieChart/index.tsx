import React from 'react';
import { useMemo } from 'react';
import { useCallback, useState } from 'react';
import {
  PieChart as LibPieChart,
  Pie,
  Cell,
  Legend as LibLegend,
  ResponsiveContainer,
  Tooltip as LibTooltip,
} from 'recharts';
import { Pool, pools } from '../../Gauge/VoteCard/Votes';
import HomeRenderIfVisible from '../HomeRenderIfVisible';
import Legend from './Legend';
import Tooltip from './Tooltip';

const COLORS = [
  '#ff299b',
  '#9300c4',
  '#00d0ff',
  '#ff8042',
  '#f7b91c',
  '#2f49d1',
  '#10b981',
  '#ef4444',
  '#aeaeae',
  '#0e0304',
];

let weightRemaining = 100;
const mockPoolWeights: PoolWithChartInfo[] = pools.map((pool, i) => {
  const weight =
    i === pools.length - 1 ? weightRemaining : weightRemaining * Math.random();
  weightRemaining = weightRemaining - weight;
  return {
    ...pool,
    name: `${pool.name} ${pool.coin1}-${pool.coin2}`,
    value: weight,
    color: COLORS[i % COLORS.length],
  };
});

export type PoolWithChartInfo = Pool & {
  name: string;
  value: number;
  color: string;
};

export const GaugeChartContext = React.createContext<{
  onToggleVisible: (key: string) => void;
  visibility: Record<string, boolean>;
}>(undefined!);

export const getEntryKey = (entry: PoolWithChartInfo) => {
  return `${entry.name} ${entry.coin1}-${entry.coin2}`;
};

const generateVisibleMap = (data: PoolWithChartInfo[]) => {
  const map: Record<string, boolean> = {};

  data.forEach((entry) => {
    map[getEntryKey(entry)] = true;
  });

  return map;
};

const PieChart = () => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    generateVisibleMap(mockPoolWeights),
  );

  const onToggleVisible = useCallback((key: string) => {
    setVisibility((prevVisibility) => {
      const newVisibility = {
        ...prevVisibility,
      };

      newVisibility[key] = !newVisibility[key];

      return newVisibility;
    });
  }, []);

  const visibleData = useMemo(
    () =>
      mockPoolWeights.map((pool) =>
        visibility[getEntryKey(pool)]
          ? pool
          : {
              ...pool,
              value: 0,
            },
      ),
    [visibility],
  );

  const gaugeChartContextData = useMemo(
    () => ({
      onToggleVisible,
      visibility,
    }),
    [onToggleVisible, visibility],
  );

  return (
    <GaugeChartContext.Provider value={gaugeChartContextData}>
      <ResponsiveContainer width="100%" height="100%">
        <LibPieChart width={200} height={350}>
          <LibLegend layout="horizontal" content={Legend} />
          <LibTooltip content={Tooltip} />
          <Pie
            data={visibleData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={170}
            innerRadius={100}
            dataKey="value"
            animationBegin={200}
          >
            {visibleData.map((entry) => (
              <Cell key={`cell ${getEntryKey(entry)}`} fill={entry.color} />
            ))}
          </Pie>
        </LibPieChart>
      </ResponsiveContainer>
    </GaugeChartContext.Provider>
  );
};

const PieChartCard: React.FC = () => {
  return (
    <div className="w-full lg:w-2/3 p-2 flex flex-col items-center justify-center">
      <div className="rounded-lg w-full bg-card h-[30rem] px-4 py-2 box-border flex flex-col">
        <div className="flex items-center">
          <span className="font-bold text-white inline-flex flex-row items-center">
            veHAS Pool Weights
          </span>
        </div>
        <div className="flex h-[30rem] flex-col">
          <HomeRenderIfVisible height="480px">
            <PieChart />
          </HomeRenderIfVisible>
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
