import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const applicationStatusEnum = pgEnum("application_status", ["pending", "reviewing", "accepted", "rejected"]);

export const internshipApplicationsTable = pgTable("internship_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  university: text("university").notNull(),
  fieldOfStudy: text("field_of_study").notNull(),
  yearOfStudy: text("year_of_study"),
  cvUrl: text("cv_url"),
  coverLetter: text("cover_letter"),
  startDate: text("start_date").notNull(),
  status: applicationStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertInternshipApplicationSchema = createInsertSchema(internshipApplicationsTable).omit({ id: true, status: true, createdAt: true });
export type InsertInternshipApplication = z.infer<typeof insertInternshipApplicationSchema>;
export type InternshipApplication = typeof internshipApplicationsTable.$inferSelect;

export const shaqotagApplicationsTable = pgTable("shaqotag_applications", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  occupation: text("occupation").notNull(),
  experience: text("experience").notNull(),
  skills: text("skills"),
  cvUrl: text("cv_url"),
  coverLetter: text("cover_letter"),
  preferredSector: text("preferred_sector"),
  status: applicationStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertShaqotagApplicationSchema = createInsertSchema(shaqotagApplicationsTable).omit({ id: true, status: true, createdAt: true });
export type InsertShaqotagApplication = z.infer<typeof insertShaqotagApplicationSchema>;
export type ShaqotagApplication = typeof shaqotagApplicationsTable.$inferSelect;
