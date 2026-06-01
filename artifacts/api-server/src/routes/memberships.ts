import { Router } from "express";
import { db, membershipPlansTable, membershipsTable } from "@workspace/db";
import { CreateMembershipBody } from "@workspace/api-zod";
import { asc } from "drizzle-orm";

const router = Router();

router.get("/membership-plans", async (req, res) => {
  const plans = await db.select().from(membershipPlansTable).orderBy(asc(membershipPlansTable.price));
  res.json(plans.map(plan => ({
    id: plan.id,
    name: plan.name,
    price: parseFloat(plan.price),
    duration: plan.duration,
    features: JSON.parse(plan.features) as string[],
    isPopular: plan.isPopular,
  })));
});

router.post("/memberships", async (req, res) => {
  const parsed = CreateMembershipBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    return;
  }
  const data = parsed.data;
  const [membership] = await db.insert(membershipsTable).values({
    planId: data.planId,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
  }).returning();
  res.status(201).json({ ...membership, createdAt: membership.createdAt.toISOString() });
});

export default router;
