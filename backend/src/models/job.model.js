import mongoose from "mongoose";

const generateApplicationId = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      minlength: [3, "Company name must be at least 3 characters"],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    jobDescription: {
      type: String,
      trim: true,
    },
    jobLocation: {
      type: String,
      trim: true,
    },
    applicationLink: {
      type: String,
      trim: true,
    },
    applicationDate: {
      type: Date,
      required: [true, "Application date is required"],
      validate: {
        validator: function (value) {
          if (!value || isNaN(value.getTime())) return false;
          const localInputDate = new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate()
          );

          const now = new Date();
          const todayLocal = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
          );
          return localInputDate <= todayLocal;
        },
        message: "Application date cannot be in the future",
      },
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applicationId: {
      type: Number,
      unique: true,
      default: generateApplicationId,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
