import { NextResponse } from "next/server";
import { getTrendingMovies } from "@/src/lib/tmdbServer";

export async function GET() {
  try {
    const data = await getTrendingMovies();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch trending movies";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
