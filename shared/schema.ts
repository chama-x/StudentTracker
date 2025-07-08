import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  course: text("course").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  grade: text("grade").default("N/A"),
  status: text("status").default("Active"),
  enrollmentDate: text("enrollment_date").notNull(),
  lastActivity: text("last_activity").notNull(),
  avatar: text("avatar"),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description"),
  isActive: boolean("is_active").default(true),
});

export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  title: text("title").notNull(),
  course: text("course").notNull(),
  grade: decimal("grade", { precision: 5, scale: 2 }),
  maxGrade: decimal("max_grade", { precision: 5, scale: 2 }).default("100"),
  submissionDate: text("submission_date"),
  dueDate: text("due_date").notNull(),
  status: text("status").default("Pending"), // Pending, Submitted, Graded, Late
});

export const progress = pgTable("progress", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => students.id),
  course: text("course").notNull(),
  overallGrade: decimal("overall_grade", { precision: 5, scale: 2 }),
  attendanceRate: decimal("attendance_rate", { precision: 5, scale: 2 }),
  lastUpdated: text("last_updated").notNull(),
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  enrollmentDate: true,
  lastActivity: true,
  avatar: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertAssignmentSchema = createInsertSchema(assignments).omit({
  id: true,
});

export const insertProgressSchema = createInsertSchema(progress).omit({
  id: true,
});

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = z.infer<typeof insertAssignmentSchema>;
export type Progress = typeof progress.$inferSelect;
export type InsertProgress = z.infer<typeof insertProgressSchema>;
