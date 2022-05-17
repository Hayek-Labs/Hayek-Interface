import React from 'react';
import { TooltipProps } from 'recharts';

const Tooltip: React.FC<TooltipProps<string, string>> = ({
  active,
  payload,
}) => {
  if (active && payload && payload.length && payload[0].value) {
    const value = payload[0].value;
    return (
      <div className="w-60 bg-hblack-3 text-white rounded-lg px-2 py-1 flex flex-col">
        <span className="text-base">{payload[0].name}</span>
        <span className="text-sm">{Number.parseFloat(value).toFixed(2)}%</span>
      </div>
    );
  }

  return null;
};

export default Tooltip;
