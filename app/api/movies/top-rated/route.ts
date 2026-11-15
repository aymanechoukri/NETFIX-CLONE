import { NextResponse } from "next/server";
import { getTopRatedMovies } from "@/src/lib/tmdbServer";

export async function GET() {
  try {
    const data = await getTopRatedMovies();
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch top rated movies";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
