import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import jobsRouter from "./jobs";
import companiesRouter from "./companies";
import applicationsRouter from "./applications";
import membershipsRouter from "./memberships";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/jobs", jobsRouter);
router.use("/companies", companiesRouter);
router.use(applicationsRouter);
router.use(membershipsRouter);
router.use("/stats", statsRouter);

export default router;
