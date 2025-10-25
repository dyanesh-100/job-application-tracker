export const validateJobInput = (req, res, next) => {
  const { companyName, jobTitle, applicationDate, status } = req.body;

  if (!companyName || companyName.length < 3) {
    return res
      .status(400)
      .json({ message: "Company name must be at least 3 characters long" });
  }

  if (!jobTitle) {
    return res.status(400).json({ message: "Job title is required" });
  }

  if (!applicationDate) {
    return res.status(400).json({ message: "Application date is required" });
  }

  const date = new Date(applicationDate);
  if (isNaN(date.getTime())) {
    return res.status(400).json({ message: "Invalid application date" });
  }

  const today = new Date();
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
  
  if (date > endOfToday) {
    return res
      .status(400)
      .json({ message: "Application date cannot be in the future" });
  }

  if (status && !["Applied", "Interview", "Offer", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  next();
};