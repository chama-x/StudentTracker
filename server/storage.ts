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
import { db } from "./db";
import { eq, ilike, or, sql } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  constructor() {
    // Initialize default courses if they don't exist
    this.initializeCourses();
  }

  private async initializeCourses() {
    try {
      const existingCourses = await db.select().from(courses).limit(1);
      
      if (existingCourses.length === 0) {
        const defaultCourses = [
          { name: "Computer Science", code: "CS101", description: "Introduction to Computer Science", isActive: true },
          { name: "Mathematics", code: "MATH101", description: "Advanced Mathematics", isActive: true },
          { name: "Physics", code: "PHYS101", description: "General Physics", isActive: true },
          { name: "Chemistry", code: "CHEM101", description: "General Chemistry", isActive: true },
          { name: "Biology", code: "BIO101", description: "General Biology", isActive: true },
        ];

        await db.insert(courses).values(defaultCourses);
      }
    } catch (error) {
      console.warn("Failed to initialize default courses:", error);
    }
  }

  // Students
  async getStudents(): Promise<Student[]> {
    return await db.select().from(students).orderBy(students.id);
  }

  async getStudent(id: number): Promise<Student | undefined> {
    const result = await db.select().from(students).where(eq(students.id, id)).limit(1);
    return result[0];
  }

  async getStudentByEmail(email: string): Promise<Student | undefined> {
    const result = await db.select().from(students).where(eq(students.email, email)).limit(1);
    return result[0];
  }

  async createStudent(insertStudent: InsertStudent): Promise<Student> {
    const now = new Date().toISOString();
    const studentData = {
      ...insertStudent,
      enrollmentDate: now,
      lastActivity: now,
      avatar: null,
    };

    const result = await db.insert(students).values(studentData).returning();
    return result[0];
  }

  async updateStudent(id: number, updates: Partial<InsertStudent>): Promise<Student | undefined> {
    const updateData = {
      ...updates,
      lastActivity: new Date().toISOString(),
    };

    const result = await db
      .update(students)
      .set(updateData)
      .where(eq(students.id, id))
      .returning();
    
    return result[0];
  }

  async deleteStudent(id: number): Promise<boolean> {
    const result = await db.delete(students).where(eq(students.id, id)).returning();
    return result.length > 0;
  }

  async searchStudents(query: string): Promise<Student[]> {
    const searchTerm = `%${query}%`;
    return await db
      .select()
      .from(students)
      .where(
        or(
          ilike(students.name, searchTerm),
          ilike(students.email, searchTerm),
          ilike(students.course, searchTerm)
        )
      )
      .orderBy(students.id);
  }

  // Courses
  async getCourses(): Promise<Course[]> {
    return await db.select().from(courses).orderBy(courses.id);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    const result = await db.select().from(courses).where(eq(courses.id, id)).limit(1);
    return result[0];
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const result = await db.insert(courses).values(insertCourse).returning();
    return result[0];
  }

  // Assignments
  async getAssignments(): Promise<Assignment[]> {
    return await db.select().from(assignments).orderBy(assignments.id);
  }

  async getAssignmentsByStudent(studentId: number): Promise<Assignment[]> {
    return await db
      .select()
      .from(assignments)
      .where(eq(assignments.studentId, studentId))
      .orderBy(assignments.id);
  }

  async createAssignment(insertAssignment: InsertAssignment): Promise<Assignment> {
    const result = await db.insert(assignments).values(insertAssignment).returning();
    return result[0];
  }

  async updateAssignment(id: number, updates: Partial<InsertAssignment>): Promise<Assignment | undefined> {
    const result = await db
      .update(assignments)
      .set(updates)
      .where(eq(assignments.id, id))
      .returning();
    
    return result[0];
  }

  // Progress
  async getProgress(): Promise<Progress[]> {
    return await db.select().from(progress).orderBy(progress.id);
  }

  async getProgressByStudent(studentId: number): Promise<Progress[]> {
    return await db
      .select()
      .from(progress)
      .where(eq(progress.studentId, studentId))
      .orderBy(progress.id);
  }

  async createProgress(insertProgress: InsertProgress): Promise<Progress> {
    const result = await db.insert(progress).values(insertProgress).returning();
    return result[0];
  }

  async updateProgress(id: number, updates: Partial<InsertProgress>): Promise<Progress | undefined> {
    const result = await db
      .update(progress)
      .set(updates)
      .where(eq(progress.id, id))
      .returning();
    
    return result[0];
  }

  // Statistics
  async getStatistics(): Promise<{
    totalStudents: number;
    activeCourses: number;
    averageGrade: number;
    attendanceRate: number;
  }> {
    // Get total students count
    const totalStudentsResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(students);
    
    // Get active courses count
    const activeCoursesResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(courses)
      .where(eq(courses.isActive, true));
    
    // Get average grade from progress records
    const avgGradeResult = await db
      .select({ 
        avg: sql<number>`avg(cast(${progress.overallGrade} as decimal))` 
      })
      .from(progress)
      .where(sql`${progress.overallGrade} is not null and ${progress.overallGrade} != ''`);
    
    // Get average attendance rate
    const avgAttendanceResult = await db
      .select({ 
        avg: sql<number>`avg(cast(${progress.attendanceRate} as decimal))` 
      })
      .from(progress)
      .where(sql`${progress.attendanceRate} is not null and ${progress.attendanceRate} != ''`);

    return {
      totalStudents: Number(totalStudentsResult[0]?.count || 0),
      activeCourses: Number(activeCoursesResult[0]?.count || 0),
      averageGrade: Math.round((Number(avgGradeResult[0]?.avg) || 0) * 10) / 10,
      attendanceRate: Math.round((Number(avgAttendanceResult[0]?.avg) || 0) * 10) / 10,
    };
  }
}

export const storage = new DatabaseStorage();
