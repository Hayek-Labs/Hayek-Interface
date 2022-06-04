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
import Legend from './Legend';
import { TooltipPct, TooltipDollar } from './Tooltip';
import { GaugeChartContext, generateVisibleMap } from './util';

export type PieChartInfo<T> = T & {
  key: number;
  name: string;
  value: number;
  color: string;
};

interface Props<T extends { color: string; value: number }> {
  data: T[];
  getEntryKey: (entry: T) => string;
  innerRadius?: number;
  outerRadius?: number;
  width?: number;
  height?: number;
  tooltipType: 'pct' | 'dollar';
}

const PieChart: React.FC<Props<any>> = ({ data, getEntryKey, ...props }) => {
  const [visibility, setVisibility] = useState<Record<string, boolean>>(
    generateVisibleMap(data, getEntryKey),
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
      data.map((entry) =>
        visibility[getEntryKey(entry)]
          ? {
              ...entry,
            }
          : {
              ...entry,
              value: 0,
            },
      ),
    [data, getEntryKey, visibility],
  );

  const gaugeChartContextData = useMemo(
    () => ({
      onToggleVisible,
      visibility,
      getEntryKey,
    }),
    [getEntryKey, onToggleVisible, visibility],
  );

  const width = props.width || 200;
  const height = props.height || 350;
  const outerRadius = props.outerRadius || 170;
  const innerRadius = props.innerRadius || 100;
  const tooltipType = props.tooltipType;

  return (
    <GaugeChartContext.Provider value={gaugeChartContextData}>
      <ResponsiveContainer width="100%" height="100%">
        <LibPieChart width={width} height={height}>
          <LibLegend layout="horizontal" content={Legend} />
          <LibTooltip
            content={tooltipType === 'dollar' ? TooltipDollar : TooltipPct}
          />
          <Pie
            data={visibleData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
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

export default PieChart;
