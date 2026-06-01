import { Router } from "express";
import { db, jobsTable } from "@workspace/db";
import { eq, ilike, and, or, desc } from "drizzle-orm";
import { CreateJobBody, ListJobsQueryParams } from "@workspace/api-zod";

const router = Router();

router.get("/", async (req, res) => {
  const parsed = ListJobsQueryParams.safeParse(req.query);
  const search = parsed.success ? parsed.data.search : undefined;
  const category = parsed.success ? parsed.data.category : undefined;
  const type = parsed.success ? parsed.data.type : undefined;
  const location = parsed.success ? parsed.data.location : undefined;
  const limit = parsed.success && parsed.data.limit != null ? parsed.data.limit : 20;
  const offset = parsed.success && parsed.data.offset != null ? parsed.data.offset : 0;

  let conditions: ReturnType<typeof eq>[] = [eq(jobsTable.isActive, true)];

  if (category) conditions.push(eq(jobsTable.category, category));
  if (type) conditions.push(eq(jobsTable.type, type as "full_time" | "part_time" | "contract" | "internship" | "remote"));
  if (location) conditions.push(ilike(jobsTable.location, `%${location}%`));

  let baseQuery = db.select().from(jobsTable).where(
    search
      ? and(
          ...conditions,
          or(
            ilike(jobsTable.title, `%${search}%`),
            ilike(jobsTable.companyName, `%${search}%`),
            ilike(jobsTable.description, `%${search}%`)
          )
        )
      : and(...conditions)
  )
  .orderBy(desc(jobsTable.isFeatured), desc(jobsTable.createdAt))
  .limit(limit ?? 20)
  .offset(offset ?? 0);

  const jobs = await baseQuery;

  res.json(jobs.map(job => ({
    ...job,
    createdAt: job.createdAt.toISOString(),
    updatedAt: job.updatedAt.toISOString(),
  })));
});

router.get("/featured", async (req, res) => {
  const jobs = await db.select().from(jobsTable)
    .where(and(eq(jobsTable.isActive, true), eq(jobsTable.isFeatured, true)))
    .orderBy(desc(jobsTable.createdAt))
    .limit(6);

  if (jobs.length < 6) {
    const recent = await db.select().from(jobsTable)
      .where(eq(jobsTable.isActive, true))
      .orderBy(desc(jobsTable.createdAt))
      .limit(6);
    const all = [...jobs, ...recent.filter(j => !jobs.some(fj => fj.id === j.id))].slice(0, 6);
    res.json(all.map(job => ({ ...job, createdAt: job.createdAt.toISOString(), updatedAt: job.updatedAt.toISOString() })));
    return;
  }

  res.json(jobs.map(job => ({ ...job, createdAt: job.createdAt.toISOString(), updatedAt: job.updatedAt.toISOString() })));
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid ID" });
    return;
  }
  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, id)).limit(1);
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json({ ...job, createdAt: job.createdAt.toISOString(), updatedAt: job.updatedAt.toISOString() });
});

router.post("/", async (req, res) => {
  const parsed = CreateJobBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const [job] = await db.insert(jobsTable).values({
    title: data.title,
    companyName: data.companyName,
    companyLogo: data.companyLogo ?? null,
    location: data.location,
    type: data.type as "full_time" | "part_time" | "contract" | "internship" | "remote",
    salary: data.salary ?? null,
    description: data.description,
    category: data.category,
    requirements: data.requirements ?? null,
    isFeatured: data.isFeatured ?? false,
    isActive: true,
  }).returning();

  res.status(201).json({ ...job, createdAt: job.createdAt.toISOString(), updatedAt: job.updatedAt.toISOString() });
});

export default router;
