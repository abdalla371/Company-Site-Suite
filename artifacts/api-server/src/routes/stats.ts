import { Router } from "express";
import { db, jobsTable, companiesTable, membershipsTable, internshipApplicationsTable, shaqotagApplicationsTable } from "@workspace/db";
import { count, eq } from "drizzle-orm";

const router = Router();

router.get("/summary", async (req, res) => {
  const [jobCount] = await db.select({ count: count() }).from(jobsTable).where(eq(jobsTable.isActive, true));
  const [companyCount] = await db.select({ count: count() }).from(companiesTable);
  const [memberCount] = await db.select({ count: count() }).from(membershipsTable);
  const [internshipCount] = await db.select({ count: count() }).from(internshipApplicationsTable);
  const [shaqotagCount] = await db.select({ count: count() }).from(shaqotagApplicationsTable);

  res.json({
    totalJobs: Number(jobCount?.count ?? 0),
    totalCompanies: Number(companyCount?.count ?? 0),
    totalMembers: Number(memberCount?.count ?? 0),
    totalApplications: Number(internshipCount?.count ?? 0) + Number(shaqotagCount?.count ?? 0),
  });
});

export default router;
