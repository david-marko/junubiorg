import { data, dataset } from "@/db/schema";
import { db } from "@/lib/db";
import { desc, eq, sql } from "drizzle-orm";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    const sets = await db.select().from(data).where(eq(data.setId, Number(id))).orderBy(desc(data.id));
    await db.update(dataset).set({ views: sql`${dataset.views} + 1` }).where(eq(dataset.id, Number(id)));
    return NextResponse.json({ sets });
}