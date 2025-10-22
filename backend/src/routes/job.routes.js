import express from "express";
import { addJob, getJobs, getJob } from "../controllers/job.controller.js";
import { validateJobInput } from "../middleware/validate.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, validateJobInput, addJob);
router.get("/", protect, getJobs);
router.get("/:id", protect, getJob);

export default router;
