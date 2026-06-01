import { pgTable, serial, text, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const jobTypeEnum = pgEnum("job_type", ["full_time", "part_time", "contract", "internship", "remote"]);

export const jobsTable = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  companyName: text("company_name").notNull(),
  companyLogo: text("company_logo"),
  location: text("location").notNull(),
  type: jobTypeEnum("type").notNull(),
  salary: text("salary"),
  description: text("description").notNull(),
  category: text("category").notNull(),
  requirements: text("requirements"),
  isFeatured: boolean("is_featured").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertJobSchema = createInsertSchema(jobsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobsTable.$inferSelect;
