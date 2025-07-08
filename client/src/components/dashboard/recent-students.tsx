import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import type { Student } from "@shared/schema";

export default function RecentStudents() {
  const { data: students, isLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const recentStudents = students?.slice(0, 3) || [];

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
      case "A+":
      case "A-":
        return "text-success";
      case "B":
      case "B+":
      case "B-":
        return "text-primary";
      case "C":
      case "C+":
      case "C-":
        return "text-warning";
      default:
        return "text-gray-600";
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">Recent Students</CardTitle>
          <Link href="/students">
            <Button variant="ghost" className="text-primary hover:text-blue-700 text-sm font-medium">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))
          ) : recentStudents.length > 0 ? (
            recentStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-gray-600">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-800">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getGradeColor(student.grade || 'N/A')}`}>
                    {student.grade || 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatTimeAgo(student.lastActivity)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No students registered yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
