import { 
  students, 
  courses, 
  assignments, 
  progress,
  type Student, 
  type InsertStudent,
  type Course,
  type InsertCourse,
  type Assignment,
  type InsertAssignment,
  type Progress,
  type InsertProgress
} from "@shared/schema";

export interface IStorage {
  // Students
  getStudents(): Promise<Student[]>;
  getStudent(id: number): Promise<Student | undefined>;
  getStudentByEmail(email: string): Promise<Student | undefined>;
  createStudent(student: InsertStudent): Promise<Student>;
  updateStudent(id: number, student: Partial<InsertStudent>): Promise<Student | undefined>;
  deleteStudent(id: number): Promise<boolean>;
  searchStudents(query: string): Promise<Student[]>;
  
  // Courses
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Assignments
  getAssignments(): Promise<Assignment[]>;
  getAssignmentsByStudent(studentId: number): Promise<Assignment[]>;
  createAssignment(assignment: InsertAssignment): Promise<Assignment>;
  updateAssignment(id: number, assignment: Partial<InsertAssignment>): Promise<Assignment | undefined>;
  
  // Progress
  getProgress(): Promise<Progress[]>;
  getProgressByStudent(studentId: number): Promise<Progress[]>;
  createProgress(progress: InsertProgress): Promise<Progress>;
  updateProgress(id: number, progress: Partial<InsertProgress>): Promise<Progress | undefined>;
  
  // Statistics
  getStatistics(): Promise<{
    totalStudents: number;
    activeCourses: number;
    averageGrade: number;
    attendanceRate: number;
  }>;
}

export class MemStorage implements IStorage {
  private students: Map<number, Student> = new Map();
  private courses: Map<number, Course> = new Map();
  private assignments: Map<number, Assignment> = new Map();
  private progress: Map<number, Progress> = new Map();
  private currentStudentId = 1;
  private currentCourseId = 1;
  private currentAssignmentId = 1;
  private currentProgressId = 1;

  constructor() {
    // Initialize with some default courses
    this.initializeCourses();
  }

  private initializeCourses() {
    const defaultCourses = [
      { name: "Computer Science", code: "CS101", description: "Introduction to Computer Science", isActive: true },
      { name: "Mathematics", code: "MATH101", description: "Advanced Mathematics", isActive: true },
      { name: "Physics", code: "PHYS101", description: "General Physics", isActive: true },
      { name: "Chemistry", code: "CHEM101", description: "General Chemistry", isActive: true },
      { name: "Biology", code: "BIO101", description: "General Biology", isActive: true },
    ];

    defaultCourses.forEach(course => {
      const newCourse: Course = { ...course, id: this.currentCourseId++ };
      this.courses.set(newCourse.id, newCourse);
    });
  }

  // Students
  async getStudents(): Promise<Student[]> {
    return Array.from(this.students.values());
  }

  async getStudent(id: number): Promise<Student | undefined> {
    return this.students.get(id);
  }

  async getStudentByEmail(email: string): Promise<Student | undefined> {
    return Array.from(this.students.values()).find(student => student.email === email);
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const now = new Date().toISOString();
    const student: Student = {
      ...insertStudent,
      id: this.currentStudentId++,
      enrollmentDate: now,
      lastActivity: now,
      avatar: null,
    };
    this.students.set(student.id, student);
    return student;
  }

  async updateStudent(id: number, updates: Partial<InsertStudent>): Promise<Student | undefined> {
    const student = this.students.get(id);
    if (!student) return undefined;

    const updatedStudent: Student = {
      ...student,
      ...updates,
      lastActivity: new Date().toISOString(),
    };
    this.students.set(id, updatedStudent);
    return updatedStudent;
  }

  async deleteStudent(id: number): Promise<boolean> {
    return this.students.delete(id);
  }

  async searchStudents(query: string): Promise<Student[]> {
    const students = Array.from(this.students.values());
    const lowerQuery = query.toLowerCase();
    return students.filter(student => 
      student.name.toLowerCase().includes(lowerQuery) ||
      student.email.toLowerCase().includes(lowerQuery) ||
      student.course.toLowerCase().includes(lowerQuery)
    );
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const course: Course = {
      ...insertCourse,
      id: this.currentCourseId++,
    };
    this.courses.set(course.id, course);
    return course;
  }

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    return Array.from(this.assignments.values());
  }

  async getAssignmentsByStudent(studentId: number): Promise<Assignment[]> {
    return Array.from(this.assignments.values()).filter(assignment => assignment.studentId === studentId);
  }

  async createAssignment(insertAssignment: InsertAssignment): Promise<Assignment> {
    const assignment: Assignment = {
      ...insertAssignment,
      id: this.currentAssignmentId++,
    };
    this.assignments.set(assignment.id, assignment);
    return assignment;
  }

  async updateAssignment(id: number, updates: Partial<InsertAssignment>): Promise<Assignment | undefined> {
    const assignment = this.assignments.get(id);
    if (!assignment) return undefined;

    const updatedAssignment: Assignment = {
      ...assignment,
      ...updates,
    };
    this.assignments.set(id, updatedAssignment);
    return updatedAssignment;
  }

  // Progress
  async getProgress(): Promise<Progress[]> {
    return Array.from(this.progress.values());
  }

  async getProgressByStudent(studentId: number): Promise<Progress[]> {
    return Array.from(this.progress.values()).filter(p => p.studentId === studentId);
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const progressRecord: Progress = {
      ...insertProgress,
      id: this.currentProgressId++,
    };
    this.progress.set(progressRecord.id, progressRecord);
    return progressRecord;
  }

  async updateProgress(id: number, updates: Partial<InsertProgress>): Promise<Progress | undefined> {
    const progressRecord = this.progress.get(id);
    if (!progressRecord) return undefined;

    const updatedProgress: Progress = {
      ...progressRecord,
      ...updates,
    };
    this.progress.set(id, updatedProgress);
    return updatedProgress;
  }

  // Statistics
  async getStatistics(): Promise<{
    totalStudents: number;
    activeCourses: number;
    averageGrade: number;
    attendanceRate: number;
  }> {
    const students = Array.from(this.students.values());
    const courses = Array.from(this.courses.values());
    const progressRecords = Array.from(this.progress.values());

    const totalStudents = students.length;
    const activeCourses = courses.filter(c => c.isActive).length;
    
    const gradesWithNumbers = progressRecords
      .map(p => p.overallGrade)
      .filter((grade): grade is string => grade !== null)
      .map(grade => parseFloat(grade))
      .filter(grade => !isNaN(grade));
    
    const averageGrade = gradesWithNumbers.length > 0 
      ? gradesWithNumbers.reduce((sum, grade) => sum + grade, 0) / gradesWithNumbers.length
      : 0;

    const attendanceRates = progressRecords
      .map(p => p.attendanceRate)
      .filter((rate): rate is string => rate !== null)
      .map(rate => parseFloat(rate))
      .filter(rate => !isNaN(rate));
    
    const attendanceRate = attendanceRates.length > 0
      ? attendanceRates.reduce((sum, rate) => sum + rate, 0) / attendanceRates.length
      : 0;

    return {
      totalStudents,
      activeCourses,
      averageGrade: Math.round(averageGrade * 10) / 10,
      attendanceRate: Math.round(attendanceRate * 10) / 10,
    };
  }
}

export const storage = new MemStorage();
