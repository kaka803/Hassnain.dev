// app/api/projects/route.js

import { connectDb } from "@/lib/db";
import { NextResponse } from "next/server";
import { Project } from "@/models/project";

export async function GET() {
  try {
    await connectDb();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
