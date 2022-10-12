import React from 'react';

export const GaugeChartContext = React.createContext<{
  onToggleVisible: (key: string) => void;
  visibility: Record<string, boolean>;
  getEntryKey: (entry: object) => string;
}>(undefined!);

export const generateVisibleMap = <T>(
  data: T[],
  getEntryKey: (entry: T) => string,
) => {
  const map: Record<string, boolean> = {};

  data.forEach((entry) => {
    map[getEntryKey(entry)] = true;
  });

  return map;
};

const COLORS = [
  '#b4299b',
  '#9300c4',
  '#00d0ff',
  '#ff8042',
  '#e6ba1c',
  '#2f49d1',
  '#10b981',
  '#ef4444',
  '#aeaeae',
  '#0e0304',
];

export const getMockPieChartWeights = <T extends object>(
  vals: T[],
  totalWeight: number,
  passedColors?: string[],
) => {
  let weightRemaining = totalWeight;
  const colors = passedColors || COLORS;
  return vals.map((val, i) => {
    const weight =
      i === vals.length - 1 ? weightRemaining : weightRemaining * Math.random();
    weightRemaining = weightRemaining - weight;
    return {
      ...val,
      value: weight,
      color: colors[i % colors.length],
    };
  });
};
