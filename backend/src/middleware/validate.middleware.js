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

  const inputUTCDate = new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  ));
  const today = new Date();
  const todayUTC = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  ));

  if (inputUTCDate > todayUTC) {
    return res.status(400).json({ message: "Application date cannot be in the future" });
  }

  if (status && !["Applied", "Interview", "Offer", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  next();
};
