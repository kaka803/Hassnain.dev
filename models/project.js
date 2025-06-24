import mongoose from "mongoose";

const projectScheme = new mongoose.Schema(
  {
    image: {
      url: String,
      public_id: String,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: String
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectScheme);
