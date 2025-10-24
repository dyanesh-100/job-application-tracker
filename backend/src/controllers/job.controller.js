import {
  createJob,
  getAllJobs,
  getJobById,
  getJobsByStatus,
  updateJobById,
  deleteJobById,
  searchJobs,
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

export const updateJob = async (req, res) => {
  try {
    const updatedJob = await updateJobById(req.params.id, req.userId, req.body);
    return res.status(200).json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    return res.status(400).json({ message: error.message });
  }
};

export const getJobsByStatusFilter = async (req, res) => {
  try {
    const { status } = req.params;
    const userId = req.userId; 

    const jobs = await getJobsByStatus(status, userId);

    res.status(200).json(jobs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchJobApplications = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const jobs = await searchJobs(req.userId, query.trim());
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error searching jobs:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteJob = async (req, res) => {
  try {
    await deleteJobById(req.params.id, req.userId);
    return res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    return res.status(400).json({ message: error.message });
  }
};


