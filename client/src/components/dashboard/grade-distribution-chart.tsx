import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'A', value: 35, color: 'hsl(142, 76%, 36%)' },
  { name: 'B', value: 40, color: 'hsl(207, 90%, 54%)' },
  { name: 'C', value: 18, color: 'hsl(36, 100%, 50%)' },
  { name: 'D', value: 5, color: 'hsl(0, 84.2%, 60.2%)' },
  { name: 'F', value: 2, color: 'hsl(0, 0%, 62%)' },
];

export default function GradeDistributionChart() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Grade Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
