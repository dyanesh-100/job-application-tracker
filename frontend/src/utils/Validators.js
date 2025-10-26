export const jobValidators = {
  companyName: (value) => {
    if (!value || value.trim() === '') return 'Company name is required';
    if (value.length < 3) return 'Company name must be at least 3 characters';
    return null;
  },

  jobTitle: (value) => {
    if (!value || value.trim() === '') return 'Job title is required';
    return null;
  },

  applicationDate: (value) => {
    if (!value) return 'Application date is required';

    const selectedDate = new Date(value);
    if (isNaN(selectedDate.getTime())) return 'Invalid date';

    const selectedUTC = new Date(Date.UTC(
      selectedDate.getUTCFullYear(),
      selectedDate.getUTCMonth(),
      selectedDate.getUTCDate()
    ));
    const now = new Date();
    const todayUTC = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    ));

    if (selectedUTC > todayUTC) return 'Application date cannot be in the future';
    return null;
  },

  status: (value) => {
    const validStatuses = ['Applied', 'Interview', 'Offer', 'Rejected'];
    if (!validStatuses.includes(value)) return 'Invalid status';
    return null;
  }
};

export const validateJobForm = (formData) => {
  const errors = {};
  errors.companyName = jobValidators.companyName(formData.companyName);
  errors.jobTitle = jobValidators.jobTitle(formData.jobTitle);
  errors.applicationDate = jobValidators.applicationDate(formData.applicationDate);
  errors.status = jobValidators.status(formData.status);

  const hasErrors = Object.values(errors).some((e) => e !== null);
  return { errors, isValid: !hasErrors };
};
