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

export const updateJobById = async (id, userId, updateData) => {
    console.log("from put:",id, userId);
  const job = await Job.findOne({ _id: id, userId });

  if (!job) throw new Error("Job not found or unauthorized");

  const allowedFields = ["companyName", "jobTitle", "jobDescription", "applicationDate","jobLocation","applicationLink", "status"];
  allowedFields.forEach((field) => {
    if (updateData[field] !== undefined) job[field] = updateData[field];
  });

  await job.validate(); 
  await job.save();

  return job;
};

export const getJobsByStatus = async (status, userId) => {
  const validStatuses = ["Applied", "Interview", "Offer", "Rejected"];
  if (!validStatuses.includes(status)) {
    throw new Error("Invalid status value");
  }

  const jobs = await Job.find({ status, userId }).sort({ applicationDate: -1 });
  return jobs;
};

export const searchJobs = async (userId, query) => {
  const searchCriteria = {
    userId,
    $or: [
      { companyName: { $regex: query, $options: "i" } },
      { jobTitle: { $regex: query, $options: "i" } },
      { applicationId: isNaN(query) ? null : Number(query) },
    ],
  };
  if (searchCriteria.$or[2].applicationId === null) {
    searchCriteria.$or.pop();
  }

  const jobs = await Job.find(searchCriteria).sort({ createdAt: -1 });
  return jobs;
};

export const deleteJobById = async (id, userId) => {
  const job = await Job.findOneAndDelete({ _id: id, userId });
  if (!job) throw new Error("Job not found or unauthorized");
  return job;
};
