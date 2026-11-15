import { NextRequest, NextResponse } from "next/server";
import { searchMovies } from "@/src/lib/tmdbServer";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";

    const sanitized = query.trim().slice(0, 100);
    if (!sanitized) {
      return NextResponse.json({ results: [] });
    }

    const data = await searchMovies(sanitized);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to search movies";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
