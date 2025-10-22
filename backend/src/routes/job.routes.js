import express from "express";
import { addJob, getJobs, getJob, updateJob, deleteJob, getJobsByStatusFilter } from "../controllers/job.controller.js";
import { validateJobInput } from "../middleware/validate.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, validateJobInput, addJob);
router.get("/", protect, getJobs);
router.get("/:id", protect, getJob);
router.put("/:id", protect, validateJobInput, updateJob); 
router.get("/status/:status", protect, getJobsByStatusFilter);
router.delete("/:id", protect, deleteJob); 

export default router;
