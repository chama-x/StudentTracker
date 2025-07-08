import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', grade: 78 },
  { month: 'Feb', grade: 82 },
  { month: 'Mar', grade: 85 },
  { month: 'Apr', grade: 83 },
  { month: 'May', grade: 87 },
  { month: 'Jun', grade: 85 },
];

export default function PerformanceChart() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Performance Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[70, 100]} />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="grade" 
              stroke="hsl(207, 90%, 54%)" 
              strokeWidth={2}
              dot={{ fill: "hsl(207, 90%, 54%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
