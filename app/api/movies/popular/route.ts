import { NextResponse } from "next/server";
import { getPopularMovies } from "@/src/lib/tmdbServer";

export async function GET() {
  try {
    const data = await getPopularMovies();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch popular movies";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
