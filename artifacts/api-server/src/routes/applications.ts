import { Router } from "express";
import { db, internshipApplicationsTable, shaqotagApplicationsTable } from "@workspace/db";
import { desc } from "drizzle-orm";
import { CreateInternshipApplicationBody, CreateShaqotagApplicationBody } from "@workspace/api-zod";

const router = Router();

router.get("/internship-applications", async (req, res) => {
  const apps = await db.select().from(internshipApplicationsTable).orderBy(desc(internshipApplicationsTable.createdAt));
  res.json(apps.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

router.post("/internship-applications", async (req, res) => {
  const parsed = CreateInternshipApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const [app] = await db.insert(internshipApplicationsTable).values({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? null,
    university: data.university,
    fieldOfStudy: data.fieldOfStudy,
    yearOfStudy: data.yearOfStudy ?? null,
    cvUrl: data.cvUrl ?? null,
    coverLetter: data.coverLetter ?? null,
    startDate: data.startDate,
  }).returning();
  res.status(201).json({ ...app, createdAt: app.createdAt.toISOString() });
});

router.get("/shaqotag-applications", async (req, res) => {
  const apps = await db.select().from(shaqotagApplicationsTable).orderBy(desc(shaqotagApplicationsTable.createdAt));
  res.json(apps.map(a => ({ ...a, createdAt: a.createdAt.toISOString() })));
});

router.post("/shaqotag-applications", async (req, res) => {
  const parsed = CreateShaqotagApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const [app] = await db.insert(shaqotagApplicationsTable).values({
    fullName: data.fullName,
    email: data.email,
    phone: data.phone ?? null,
    occupation: data.occupation,
    experience: data.experience,
    skills: data.skills ?? null,
    cvUrl: data.cvUrl ?? null,
    coverLetter: data.coverLetter ?? null,
    preferredSector: data.preferredSector ?? null,
  }).returning();
  res.status(201).json({ ...app, createdAt: app.createdAt.toISOString() });
});

export default router;
