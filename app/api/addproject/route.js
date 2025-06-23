import { connectDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { Project } from "@/models/project";


export async function POST(request) {
  try {
    const { image, title, description, tags, link } = await request.json();
    
    if (!image || !title || !description || !tags || !link) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDb();

    const newProject = new Project({
      image,
      title,
      description,
      tags,
      link,
    });

    await newProject.save();

    return NextResponse.json({ message: "Project added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
  }
}