import { NextRequest, NextResponse } from "next/server";
import { getMovieDetails } from "@/src/lib/tmdbServer";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(
  _request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;
    if (!id || !/^\d+$/.test(id)) {
      return NextResponse.json({ error: "Invalid movie ID" }, { status: 400 });
    }

    const data = await getMovieDetails(id);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch movie details";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
