import StatsCard from "@/components/dashboard/stats-card";
import PerformanceChart from "@/components/dashboard/performance-chart";
import GradeDistributionChart from "@/components/dashboard/grade-distribution-chart";
import RecentStudents from "@/components/dashboard/recent-students";
import QuickActions from "@/components/dashboard/quick-actions";
import { Users, Book, TrendingUp, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface Statistics {
  totalStudents: number;
  activeCourses: number;
  averageGrade: number;
  attendanceRate: number;
}

export default function Dashboard() {
  const { data: statistics, isLoading } = useQuery<Statistics>({
    queryKey: ["/api/statistics"],
  });

  return (
    <div className="space-y-8">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-12 w-20 mb-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))
        ) : (
          <>
            <StatsCard
              title="Total Students"
              value={statistics?.totalStudents || 0}
              change="+12%"
              changeType="positive"
              icon={<Users className="text-primary text-xl" />}
              iconBg="bg-primary bg-opacity-10"
            />
            <StatsCard
              title="Active Courses"
              value={statistics?.activeCourses || 0}
              change="+3"
              changeType="positive"
              icon={<Book className="text-secondary text-xl" />}
              iconBg="bg-secondary bg-opacity-10"
            />
            <StatsCard
              title="Average Grade"
              value={statistics?.averageGrade || 0}
              change="+2.1"
              changeType="positive"
              icon={<TrendingUp className="text-accent text-xl" />}
              iconBg="bg-accent bg-opacity-10"
            />
            <StatsCard
              title="Attendance Rate"
              value={`${statistics?.attendanceRate || 0}%`}
              change="+1.5%"
              changeType="positive"
              icon={<Calendar className="text-success text-xl" />}
              iconBg="bg-success bg-opacity-10"
            />
          </>
        )}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceChart />
        <GradeDistributionChart />
      </div>

      {/* Recent Students and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentStudents />
        </div>
        <QuickActions />
      </div>
    </div>
  );
}
