const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const TITLE_CLEAN_REGEX = /^\d+\s*views\s*\n/i;

const SALARY_REGEX = /(\d{4,})\s*(?:الي|إلى|-|–|الى)\s*(\d{4,})/;

async function main() {
  const filePath = path.join(__dirname, "./libostats_database.json");

  if (!fs.existsSync(filePath)) {
    console.error(
      "❌ Error: 'libostats_database.json' not found in root directory.",
    );
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(filePath, "utf8"));
  console.log(`🚀 Starting ingestion of ${rawData.length} job records...`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of rawData) {
    try {
      const cleanTitle = item.title.replace(TITLE_CLEAN_REGEX, "").trim();

      const dateParts = item.datePosted ? item.datePosted.split(" - ") : [];
      const startDate = dateParts[0] ? new Date(dateParts[0].trim()) : null;
      const endDate = dateParts[1] ? new Date(dateParts[1].trim()) : null;

      let minSalary = null;
      let maxSalary = null;

      const salaryMatch = item.description.match(SALARY_REGEX);
      if (salaryMatch) {
        const val1 = parseFloat(salaryMatch[1]);
        const val2 = parseFloat(salaryMatch[2]);
        minSalary = Math.min(val1, val2);
        maxSalary = Math.max(val1, val2);
      }

      await prisma.job.upsert({
        where: { url: item.url },
        update: {
          title: cleanTitle,
          minSalary: minSalary,
          maxSalary: maxSalary,
          description: item.description,
          endDate: isNaN(endDate?.getTime()) ? null : endDate,
        },
        create: {
          title: cleanTitle,
          originalTitle: item.title,
          company: item.company || "Confidential",
          location: item.location,
          fullLocation: item.fullLocation,
          category: item.category.split("-")[0].trim(),
          type: item.type.split("-")[0].trim(),
          startDate: isNaN(startDate?.getTime()) ? null : startDate,
          endDate: isNaN(endDate?.getTime()) ? null : endDate,
          description: item.description,
          minSalary: minSalary,
          maxSalary: maxSalary,
          url: item.url,
          scrapedAt: new Date(item.scrapedAt),
        },
      });

      successCount++;
      if (successCount % 100 === 0)
        console.log(`قيد المعالجة: ${successCount}...`);
    } catch (err) {
      errorCount++;
      console.error(`⚠️ Failed to process: ${item.url}`, err.message);
    }
  }

  console.log(`
  ✅ Ingestion Completed!
  -----------------------
  Total Processed: ${successCount}
  Errors: ${errorCount}
  `);
}

main()
  .catch((e) => {
    console.error("🔴 Fatal Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
