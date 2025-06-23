import mongoose from "mongoose";

const projectScheme = new mongoose.Schema(
  {
    image: {
      type: Object, 
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
      type: String, 
    },
    link: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
  }
);

export const Project = mongoose.models.Project || mongoose.model("Project", projectScheme);