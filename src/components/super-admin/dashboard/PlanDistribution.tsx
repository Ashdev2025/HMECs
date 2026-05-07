import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Pluse", value: 45 },
  { name: "Pro", value: 35 },
  { name: "Basic", value: 20 },
];

const colors = ["#7c3aed", "#2563eb", "#f97316"];


const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const RADIAN = Math.PI / 180;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;

  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PlanDistribution() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        Plan Distribution
      </h2>

      <div className="mt-4 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel} // ✅ FIX HERE
            >
              {data.map((_, index) => (
                <Cell key={index} fill={colors[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: colors[index] }}
              />
              <span className="text-gray-600 dark:text-gray-300">
                {item.name}
              </span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">
              {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}