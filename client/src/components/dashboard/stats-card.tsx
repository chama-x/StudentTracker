import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconBg: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  iconBg 
}: StatsCardProps) {
  return (
    <Card className="bg-white shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
          </div>
          <div className={cn("p-3 rounded-full", iconBg)}>
            {icon}
          </div>
        </div>
        <div className="mt-4 flex items-center">
          <span className={cn(
            "text-sm font-medium",
            changeType === "positive" ? "text-success" : 
            changeType === "negative" ? "text-error" : 
            "text-gray-600"
          )}>
            {change}
          </span>
          <span className="text-gray-600 text-sm ml-2">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}
