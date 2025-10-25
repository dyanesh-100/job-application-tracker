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
    const today = new Date();
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
    
    if (selectedDate > endOfToday) return 'Application date cannot be in the future';
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
  
  const hasErrors = Object.values(errors).some(error => error !== null);
  return { errors, isValid: !hasErrors };
};