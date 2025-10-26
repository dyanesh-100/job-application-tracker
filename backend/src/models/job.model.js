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
          // Normalize both input date and today's date to UTC date-only (ignore time)
          const inputUTCDate = new Date(Date.UTC(
            value.getUTCFullYear(),
            value.getUTCMonth(),
            value.getUTCDate()
          ));

          const today = new Date();
          const todayUTC = new Date(Date.UTC(
            today.getUTCFullYear(),
            today.getUTCMonth(),
            today.getUTCDate()
          ));

          return inputUTCDate <= todayUTC;
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
