import { Router } from "express";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { createHash } from "crypto";
import { RegisterBody, LoginBody } from "@workspace/api-zod";

const router = Router();

function hashPassword(password: string): string {
  const secret = process.env.SESSION_SECRET ?? "ses_secret";
  return createHash("sha256").update(password + secret).digest("hex");
}

router.post("/register", async (req, res) => {
  const parsed = RegisterBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed", details: parsed.error.issues });
    return;
  }
  const { fullName, email, password, phone, role } = parsed.data;

  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }

  const passwordHash = hashPassword(password);
  const [user] = await db.insert(usersTable).values({ fullName, email, phone: phone ?? null, passwordHash, role: role as "job_seeker" | "employer" }).returning();

  const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString("base64");

  res.status(201).json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    },
    token,
  });
});

router.post("/login", async (req, res) => {
  const parsed = LoginBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Validation failed" });
    return;
  }
  const { email, password } = parsed.data;

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!user) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const passwordHash = hashPassword(password);
  if (user.passwordHash !== passwordHash) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString("base64");

  res.json({
    user: {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    },
    token,
  });
});

router.post("/logout", (req, res) => {
  res.json({ success: true, message: "Logged out successfully" });
});

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  try {
    const token = authHeader.slice(7);
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const [userId] = decoded.split(":");
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, parseInt(userId))).limit(1);
    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }
    res.json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      role: user.role,
      createdAt: user.createdAt.toISOString(),
    });
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
