import { connectDb } from "@/lib/db";
import { Project } from "@/models/project";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    await connectDb();

    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 });
    }

    // Find the project first
    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // 🗑️ Step 1: Delete image from local folder
    if (project.image && project.image.url) {
      const imagePath = path.join(process.cwd(), "public", project.image.url);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath); // Delete file
      }
    }

    // 🗑️ Step 2: Delete project from DB
    await Project.findByIdAndDelete(id);

    return NextResponse.json({ message: "Project and image deleted ✅" });
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
