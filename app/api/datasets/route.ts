import { dataset, orgs, subscriptions } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { and, asc, desc, eq, ilike, or, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const session = await auth();
    const { searchParams } = new URL(request.url);
    const sector = searchParams.get("sector") ?? "";
    const format = searchParams.get("format") ?? "";
    const sort = searchParams.get("sort") ?? "";
    const source = searchParams.get("source") ?? "";
    const search = searchParams.get("search") ?? "";

    const data = await db.select({
        id: dataset.id,
        title: dataset.title,
        format: dataset.format,
        name: orgs.name,
        slug: orgs.slug,
        desc: dataset.desc,
        sector: dataset.sector,
        metadata: dataset.meta,
        views: dataset.views,
        downloads: dataset.downloads,
        date: dataset.updatedAt,
        // check if user is subscribed to the dataset using exists
        subscribed: session != null ? sql<boolean>`EXISTS (SELECT 1 FROM ${subscriptions} WHERE ${subscriptions.setId} = ${dataset.id} AND ${subscriptions.userId} = ${session?.user?.id})` : sql<boolean>`false`
    }).from(dataset)
        .leftJoin(orgs, eq(dataset.orgId, orgs.id))
        .where(and(
            // session != null ? eq(subscriptions.userId, Number(session.user?.id)) : ilike(orgs.name, "%%"),
            sector != "" ? eq(dataset.sector, sector) : undefined,
            format != "" ? eq(dataset.format, format) : undefined,
            source != "" ? eq(orgs.kind, source) : undefined,
            search != "" ? ilike(dataset.title, `%${search}%`) : undefined,
        ))
        .orderBy(sort ? (sort === "Newest" ? desc(dataset.updatedAt) : sort === "Oldest" ? asc(dataset.updatedAt) : sort === "Most Viewed" ? desc(dataset.views) : desc(dataset.downloads)) : desc(dataset.updatedAt)).limit(30);
    return NextResponse.json({ data });
}
