import Job from "../models/job.model.js";

export const createJob = async (data) => {
  const job = await Job.create(data);
  return job;
};

export const getAllJobs = async (userId) => {
  const jobs = await Job.find({ userId }).sort({ createdAt: -1 });
  return jobs;
};

export const getJobById = async (id, userId) => {
  const job = await Job.findOne({ _id: id, userId });
  return job;
};
