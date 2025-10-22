import {
  createJob,
  getAllJobs,
  getJobById,
} from "../services/job.service.js";

export const addJob = async (req, res) => {
  try {
    const jobData = { ...req.body, userId: req.userId };
    const job = await createJob(jobData);
    return res.status(201).json(job);
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs(req.userId);
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getJob = async (req, res) => {
  try {
    const job = await getJobById(req.params.id, req.userId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    return res.status(200).json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
