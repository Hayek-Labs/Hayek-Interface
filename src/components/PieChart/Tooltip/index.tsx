import React from 'react';
import { TooltipProps } from 'recharts';

interface Props {
  type: 'pct' | 'dollar';
}

const TooltipTyped: React.FC<TooltipProps<string, string> & Props> = ({
  active,
  payload,
  type,
}) => {
  if (active && payload && payload.length && payload[0].value) {
    const displayValue = (() => {
      const value = payload[0].value;
      switch (type) {
        case 'pct':
          return `${Number.parseFloat(value).toFixed(2)}%`;
        case 'dollar':
          return `$${Number.parseFloat(value).toFixed(2)}`;
      }
    })();
    return (
      <div className="w-60 bg-hblack-3 text-white rounded-lg px-2 py-1 flex flex-col">
        <span className="text-base">{payload[0].name}</span>
        <span className="text-sm">{displayValue}</span>
      </div>
    );
  }

  return null;
};

export const TooltipPct: React.FC<TooltipProps<string, string>> = (props) => {
  return <TooltipTyped {...props} type="pct" />;
};

export const TooltipDollar: React.FC<TooltipProps<string, string>> = (
  props,
) => {
  return <TooltipTyped {...props} type="dollar" />;
};
