import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { Project } from "@/models/project";
import { connectDb } from "@/lib/db";
export async function POST(req) {
  try {
    await connectDb();
    const body = await req.json();
    const { imageBase64, title, description, tags, link } = body;

    if (!imageBase64 || !title || !description || !tags || !link) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(imageBase64, {
      folder: "projects",
    });

    // Save to DB
    const newProject = new Project({
      image: {
        url: uploadRes.secure_url,
        public_id: uploadRes.public_id,
      },
      title,
      description,
      tags,
      link,
    });

    await newProject.save();

    return NextResponse.json({ message: "Project uploaded", project: newProject }, { status: 201 });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
