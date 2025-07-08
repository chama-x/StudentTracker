import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus, Download, PieChart } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function QuickActions() {
  const { toast } = useToast();

  const handleExportData = async () => {
    try {
      const response = await fetch('/api/export/students');
      if (!response.ok) {
        throw new Error('Failed to export data');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'students.csv';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Export successful",
        description: "Student data has been exported to CSV",
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Failed to export student data",
        variant: "destructive",
      });
    }
  };

  const handleGenerateReport = () => {
    toast({
      title: "Report generated",
      description: "Academic performance report has been generated",
    });
  };

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Link href="/registration">
            <Button className="w-full bg-primary text-white hover:bg-blue-700 transition-colors duration-200">
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Student
            </Button>
          </Link>
          <Button 
            className="w-full bg-secondary text-white hover:bg-green-700 transition-colors duration-200"
            onClick={handleExportData}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button 
            className="w-full bg-accent text-white hover:bg-orange-600 transition-colors duration-200"
            onClick={handleGenerateReport}
          >
            <PieChart className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
