export const validateJobInput = (req, res, next) => {
  const { companyName, jobTitle, applicationDate, status } = req.body;

  if (!companyName || companyName.length < 3) {
    return res.status(400).json({
      message: "Company name must be at least 3 characters long",
    });
  }

  if (!jobTitle) {
    return res.status(400).json({ message: "Job title is required" });
  }

  if (!applicationDate) {
    return res.status(400).json({ message: "Application date is required" });
  }

  const [year, month, day] = applicationDate.split('-').map(Number);
  const selectedDate = new Date(year, month - 1, day); // local midnight

  if (isNaN(selectedDate.getTime())) {
    return res.status(400).json({ message: "Invalid application date" });
  }
  const now = new Date();
  const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (selectedDate > todayLocal) {
    return res
      .status(400)
      .json({ message: "Application date cannot be in the future" });
  }

  if (status && !["Applied", "Interview", "Offer", "Rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  next();
};
