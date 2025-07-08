import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import StudentList from "@/components/students/student-list";
import StudentRegistrationModal from "@/components/students/student-registration-modal";

export default function Students() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        <StudentRegistrationModal>
          <Button className="bg-primary hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Add Student
          </Button>
        </StudentRegistrationModal>
      </div>
      
      <StudentList />
    </div>
  );
}
