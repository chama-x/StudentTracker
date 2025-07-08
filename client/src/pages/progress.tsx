import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import type { Student, Assignment } from "@shared/schema";

export default function ProgressTracking() {
  const [selectedStudent, setSelectedStudent] = useState<string>("");

  const { data: students, isLoading: studentsLoading } = useQuery<Student[]>({
    queryKey: ["/api/students"],
  });

  const { data: assignments, isLoading: assignmentsLoading } = useQuery<Assignment[]>({
    queryKey: ["/api/assignments"],
  });

  const filteredAssignments = assignments?.filter(assignment => 
    !selectedStudent || selectedStudent === "all" || assignment.studentId === parseInt(selectedStudent)
  ) || [];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "graded":
        return "bg-green-100 text-green-800";
      case "submitted":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "late":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getGradePercentage = (grade: string | null, maxGrade: string | null) => {
    if (!grade || !maxGrade) return 0;
    return (parseFloat(grade) / parseFloat(maxGrade)) * 100;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Progress Tracking</h1>
        <Select value={selectedStudent} onValueChange={setSelectedStudent}>
          <SelectTrigger className="w-64">
            <SelectValue placeholder="Select a student" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Students</SelectItem>
            {students?.map((student) => (
              <SelectItem key={student.id} value={student.id.toString()}>
                {student.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {studentsLoading || assignmentsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-4" />
                <Skeleton className="h-8 w-full mb-4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredAssignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssignments.map((assignment) => {
                const student = students?.find(s => s.id === assignment.studentId);
                const gradePercentage = getGradePercentage(assignment.grade, assignment.maxGrade);
                
                return (
                  <Card key={assignment.id} className="bg-white shadow-sm">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg font-semibold text-gray-800">
                            {assignment.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {student?.name} - {assignment.course}
                          </p>
                        </div>
                        <Badge className={getStatusColor(assignment.status || 'Pending')}>
                          {assignment.status || 'Pending'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {assignment.grade && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-700">Grade</span>
                              <span className="text-sm font-medium text-gray-900">
                                {assignment.grade}/{assignment.maxGrade}
                              </span>
                            </div>
                            <Progress value={gradePercentage} className="h-2" />
                            <p className="text-xs text-gray-500 mt-1">
                              {gradePercentage.toFixed(1)}%
                            </p>
                          </div>
                        )}
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Due Date:</span>
                            <p className="font-medium">{formatDate(assignment.dueDate)}</p>
                          </div>
                          {assignment.submissionDate && (
                            <div>
                              <span className="text-gray-600">Submitted:</span>
                              <p className="font-medium">{formatDate(assignment.submissionDate)}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-gray-500">
                  {selectedStudent ? "No assignments found for this student" : "No assignments available"}
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
