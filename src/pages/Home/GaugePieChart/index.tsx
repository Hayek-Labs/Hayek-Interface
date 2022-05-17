import {
  PieChart as LibPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { pools } from '../../Gauge/VoteCard/Votes';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

let weightRemaining = 100;
const mockPoolWeights = pools.map((pool, i) => {
  const weight =
    i === pools.length - 1 ? weightRemaining : weightRemaining * Math.random();
  weightRemaining = weightRemaining - weight;
  return {
    ...pool,
    name: `${pool.name} ${pool.coin1}-${pool.coin2}`,
    value: weight,
  };
});

const COLORS = [
  '#ff299b',
  '#9300c4',
  '#00d0ff',
  '#ff8042',
  '#f7b91c',
  '#2f49d1',
  '#10b981',
  '#ef4444',
  '#1e1e1e',
  '#0e0304',
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  index,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {mockPoolWeights[index].name}
    </text>
  );
};

const PieChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LibPieChart width={200} height={350}>
        <Legend layout="horizontal" />
        <Pie
          data={mockPoolWeights}
          cx="50%"
          cy="50%"
          labelLine={false}
          // label={renderCustomizedLabel}
          outerRadius={170}
          innerRadius={100}
          dataKey="value"
        >
          {mockPoolWeights.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </LibPieChart>
    </ResponsiveContainer>
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
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default PieChartCard;
