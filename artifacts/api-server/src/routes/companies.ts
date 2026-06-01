import { Router } from "express";
import { db, companiesTable } from "@workspace/db";
import { desc } from "drizzle-orm";

const router = Router();

router.get("/", async (req, res) => {
  const companies = await db.select().from(companiesTable)
    .orderBy(desc(companiesTable.openPositions))
    .limit(10);

  res.json(companies.map(c => ({
    ...c,
    createdAt: c.createdAt.toISOString(),
  })));
});

export default router;
