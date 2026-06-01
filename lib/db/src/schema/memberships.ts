import { pgTable, serial, text, integer, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const membershipPlansTable = pgTable("membership_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  duration: text("duration").notNull(),
  features: text("features").notNull(),
  isPopular: boolean("is_popular").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMembershipPlanSchema = createInsertSchema(membershipPlansTable).omit({ id: true, createdAt: true });
export type InsertMembershipPlan = z.infer<typeof insertMembershipPlanSchema>;
export type MembershipPlan = typeof membershipPlansTable.$inferSelect;

export const membershipsTable = pgTable("memberships", {
  id: serial("id").primaryKey(),
  planId: integer("plan_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMembershipSchema = createInsertSchema(membershipsTable).omit({ id: true, status: true, createdAt: true });
export type InsertMembership = z.infer<typeof insertMembershipSchema>;
export type Membership = typeof membershipsTable.$inferSelect;
