import { NextResponse } from "next/server";

interface CacheOptions {
  sMaxAge: number;
  staleWhileRevalidate?: number;
}

export function jsonWithCache<T>(data: T, options: CacheOptions) {
  const staleWhileRevalidate =
    options.staleWhileRevalidate ?? options.sMaxAge;

  return NextResponse.json(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${options.sMaxAge}, stale-while-revalidate=${staleWhileRevalidate}`,
    },
  });
}

export function jsonError(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}
