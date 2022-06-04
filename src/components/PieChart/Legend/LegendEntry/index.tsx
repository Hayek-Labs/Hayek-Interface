import clsx from 'clsx';
import React from 'react';

const LegendEntry: React.FC<{
  payload: { key: string; color: string; name: string };
  visible: boolean;
  onToggleVisible: (key: string) => void;
  getEntryKey: (entry: any) => string;
}> = ({ payload, visible, onToggleVisible, getEntryKey }) => {
  return (
    <li
      className={clsx(
        'recharts-legend-item inline-flex mr-[10px] flex-row items-center',
        `legend-item-${payload.key}`,
        visible ? '' : 'line-through decoration-white',
      )}
      onClick={() => {
        onToggleVisible(getEntryKey(payload));
      }}
    >
      <div
        className="w-3 h-2 mr-1"
        style={{
          backgroundColor: payload.color,
        }}
      />
      <span
        className="recharts-legend-item-text"
        style={{
          color: payload.color,
        }}
      >
        {payload.name}
      </span>
    </li>
  );
};

export default LegendEntry;
