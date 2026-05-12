import { NextRequest, NextResponse } from "next/server";

const BASE = "https://www.carqueryapi.com/api/0.3/";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cmd = searchParams.get("cmd");
  const make = searchParams.get("make") ?? "";
  const model = searchParams.get("model") ?? "";
  const year = searchParams.get("year") ?? "";

  if (!cmd) {
    return NextResponse.json({ error: "Missing cmd" }, { status: 400 });
  }

  const allowed = ["getMakes", "getModels", "getTrims", "getModel"];
  if (!allowed.includes(cmd)) {
    return NextResponse.json({ error: "Invalid cmd" }, { status: 400 });
  }

  const params = new URLSearchParams({ cmd });
  if (make) params.set("make", make);
  if (model) params.set("model", model);
  if (year) params.set("year", year);

  try {
    const res = await fetch(`${BASE}?${params.toString()}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 86400 }, // cache 24h
    });

    if (!res.ok) {
      return NextResponse.json({ error: "CarQuery error" }, { status: 502 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to reach CarQuery" }, { status: 502 });
  }
}
