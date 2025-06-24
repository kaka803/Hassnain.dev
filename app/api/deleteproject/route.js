import { connectDb } from "@/lib/db";
import { Project } from "@/models/project";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDb();
    const { id } = await req.json();

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (project.image?.public_id) {
      await cloudinary.uploader.destroy(project.image.public_id);
    }

    await Project.findByIdAndDelete(id);

    return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
