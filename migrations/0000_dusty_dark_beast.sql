CREATE TABLE "assignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"title" text NOT NULL,
	"course" text NOT NULL,
	"grade" numeric(5, 2),
	"max_grade" numeric(5, 2) DEFAULT '100',
	"submission_date" text,
	"due_date" text NOT NULL,
	"status" text DEFAULT 'Pending'
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true,
	CONSTRAINT "courses_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" integer NOT NULL,
	"course" text NOT NULL,
	"overall_grade" numeric(5, 2),
	"attendance_rate" numeric(5, 2),
	"last_updated" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"course" text NOT NULL,
	"date_of_birth" text NOT NULL,
	"grade" text DEFAULT 'N/A',
	"status" text DEFAULT 'Active',
	"enrollment_date" text NOT NULL,
	"last_activity" text NOT NULL,
	"avatar" text,
	CONSTRAINT "students_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_student_id_students_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."students"("id") ON DELETE no action ON UPDATE no action;