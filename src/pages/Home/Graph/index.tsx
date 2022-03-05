import { useHover } from '@/util/useHover';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import Icon from '../Icon';

const graphData = [
  'Nov',
  'Dec',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
].map((i) => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name: i,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});

const CustomTooltip = () => (
  <div className="rounded-xl overflow-hidden tooltip-head">
    <div className="flex items-center justify-between p-2">
      <div className="">Revenue</div>
      <Icon path="res-react-dash-options" className="w-2 h-2" />
    </div>
    <div className="tooltip-body text-center p-3">
      <div className="text-white font-bold">$1300.50</div>
      <div className="">Revenue from 230 sales</div>
    </div>
  </div>
);

const Graph = () => {
  const [lineStroke, setLineStroke] = useState('url(#paint1_linear)');
  const [ref, isHovering] = useHover<HTMLDivElement>();

  useEffect(() => {
    setLineStroke(isHovering ? 'url(#paint0_linear)' : 'url(#paint1_linear)');
  }, [isHovering]);

  return (
    <div className="flex p-4 h-full flex-col">
      <div className="">
        <div className="flex items-center">
          <div className="font-bold text-white">Your Work Summary</div>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="w-4 h-4" />
          <div className="ml-2">Last 9 Months</div>
          <div className="ml-6 w-5 h-5 flex justify-center items-center rounded-full icon-background">
            ?
          </div>
        </div>
        <div className="font-bold ml-5">Nov - July</div>
      </div>

      <div className="flex-grow" ref={ref}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
              </linearGradient>
              <linearGradient id="paint1_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#444" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth="2"
              stroke="#252525"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={lineStroke}
              strokeWidth={(4.0 / 3.0).toString()}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graph;
