import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

const cleanText = (text) => {
  if (!text) return "غير محدد";
  return text
    .split("\n")
    .pop()
    .replace(/[^a-zA-Z0-9\u0600-\u06FF\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const normalizeLocation = (loc) => {
  const l = loc?.toLowerCase().trim() || "";
  if (l.includes("tripoli") || l.includes("طرابلس") || l.includes("السراج"))
    return "طرابلس";
  if (l.includes("benghazi") || l.includes("بنغازي")) return "بنغازي";
  if (l.includes("misrata") || l.includes("مصراتة")) return "مصراتة";
  return loc;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const searchQuery = searchParams.get("query");

  try {
    if (searchQuery) {
      const count = await prisma.job.count({
        where: {
          OR: [
            { title: { contains: searchQuery, mode: "insensitive" } },
            { description: { contains: searchQuery, mode: "insensitive" } },
          ],
        },
      });
      return NextResponse.json({ count });
    }

    const [totalJobs, salaryAggr, rawLocations, rawTitles, categories] =
      await Promise.all([
        prisma.job.count(),
        prisma.job.aggregate({
          _avg: { minSalary: true, maxSalary: true },
          where: { minSalary: { gt: 500, lt: 40000 } },
        }),
        prisma.job.groupBy({ by: ["location"], _count: { location: true } }),
        prisma.job.groupBy({
          by: ["title"],
          _count: { title: true },
          orderBy: { _count: { title: "desc" } },
          take: 40,
        }),
        prisma.job.groupBy({
          by: ["category"],
          _count: { category: true },
          _avg: { minSalary: true, maxSalary: true },
          orderBy: { _count: { category: "desc" } },
          take: 8,
        }),
      ]);

    const locationMap = {};
    rawLocations.forEach((loc) => {
      const name = normalizeLocation(loc.location || "أخرى");
      locationMap[name] = (locationMap[name] || 0) + loc._count.location;
    });

    const titleMap = {};
    rawTitles.forEach((t) => {
      const name = cleanText(t.title);
      titleMap[name] = (titleMap[name] || 0) + t._count.title;
    });

    return NextResponse.json({
      overview: {
        totalJobs,
        avgMinSalary: Math.round(salaryAggr._avg.minSalary || 0),
        avgMaxSalary: Math.round(salaryAggr._avg.maxSalary || 0),
      },
      locations: Object.entries(locationMap)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      trendingTitles: Object.entries(titleMap)
        .map(([title, count]) => ({ title, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      marketInsights: categories.map((cat) => ({
        category: cleanText(cat.category?.split("-")[0] || "عام"),
        count: cat._count.category,
        avgSalary: Math.round(
          ((cat._avg.minSalary || 0) + (cat._avg.maxSalary || 0)) / 2
        ),
      })),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}