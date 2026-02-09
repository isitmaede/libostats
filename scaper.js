const puppeteer = require('puppeteer');
const fs = require('fs');


const CONFIG = {
    START_PAGE: 1,      
    END_PAGE: 178,     
    OUTPUT_FILE: 'libostats_database.json',
    ERROR_LOG: 'scraping_errors.log',
    BATCH_SAVE: 10, 
};


const randomSleep = (min = 1000, max = 3000) => 
    new Promise(r => setTimeout(r, Math.floor(Math.random() * (max - min + 1) + min)));

async function runUltimateScraper() {
    console.log("🚀 جاري تشغيل محرك LiboStats العملاق...");
    
    const browser = await puppeteer.launch({ 
        headless: "new", 
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] 
    });

   
    const listPage = await browser.newPage();
    const detailPage = await browser.newPage();

    
    await listPage.setViewport({ width: 1366, height: 768 });
    await listPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    let allJobs = [];
    
    
    if (fs.existsSync(CONFIG.OUTPUT_FILE)) {
        try {
            const rawData = fs.readFileSync(CONFIG.OUTPUT_FILE);
            allJobs = JSON.parse(rawData);
            console.log(`📦 تم العثور على قاعدة بيانات سابقة تحتوي على ${allJobs.length} وظيفة. سنكمل عليها.`);
        } catch (e) {
            console.log("⚠️ ملف البيانات السابق تالف، سنبدأ من جديد.");
        }
    }

    try {
        
        for (let currentPage = CONFIG.START_PAGE; currentPage <= CONFIG.END_PAGE; currentPage++) {
            console.log(`\n📄 [PAGE ${currentPage}/${CONFIG.END_PAGE}] جاري سحب القائمة...`);
            
            try {
                await listPage.goto(`https://libyanjobs.ly/jobs/page/${currentPage}/`, { waitUntil: 'domcontentloaded', timeout: 60000 });
            } catch (err) {
                console.error(`❌ فشل تحميل الصفحة ${currentPage}: ${err.message}`);
                continue; 
            }

            
            const jobLinks = await listPage.evaluate(() => {
                const links = [];
                
                const items = document.querySelectorAll('.noo-job-item h3 a, .noo-job-list-row h3 a, article h3 a');
                items.forEach(a => {
                    if (a.href) links.push(a.href);
                });
                return links;
            });

            if (jobLinks.length === 0) {
                console.log("🛑 الصفحة فارغة أو لا تحتوي وظائف. ربما وصلنا للنهاية.");
                break;
            }

            console.log(`   found عثرنا على ${jobLinks.length} وظيفة في هذه الصفحة. جاري سحب تفاصيلهم...`);

            
            for (const link of jobLinks) {
               
                if (allJobs.some(job => job.url === link)) {
                    process.stdout.write(".");
                    continue;
                }

                try {
                    await detailPage.goto(link, { waitUntil: 'domcontentloaded', timeout: 45000 });
                    
                   
                    const jobData = await detailPage.evaluate(() => {
                        const getText = (s) => document.querySelector(s)?.innerText.trim() || "";
                        
                        
                        let rawLocation = getText('.job-location') || getText('.location');
                        let cleanLocation = rawLocation.split('/')[0].trim(); 

                        
                        let rawDesc = getText('.job-desc') || getText('.noo-main-content');
                        
                        return {
                            title: getText('.job-title') || getText('h1'),
                            company: getText('.item-brand') || getText('.company-name') || "Confidential",
                            location: cleanLocation || "Libya",
                            fullLocation: rawLocation, 
                            category: getText('.job-category') || "General",
                            type: getText('.job-type'),
                            datePosted: getText('.job-date') || new Date().toISOString().split('T')[0],
                            description: rawDesc,
                            scrapedAt: new Date().toISOString()
                        };
                    });

                  
                    jobData.url = link;

                    allJobs.push(jobData);
                    console.log(`   ✅ تم سحب: ${jobData.title.substring(0, 30)}...`);

                    
                    if (allJobs.length % CONFIG.BATCH_SAVE === 0) {
                        fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(allJobs, null, 2));
                        console.log(`   💾 [Auto-Save] تم حفظ التقدم (${allJobs.length} وظيفة حتى الآن).`);
                    }

                    
                    await randomSleep(500, 1500);

                } catch (jobError) {
                    console.error(`   ⚠️ فشل سحب الوظيفة (${link}): ${jobError.message}`);
                    fs.appendFileSync(CONFIG.ERROR_LOG, `${new Date().toISOString()} - ${link} - ${jobError.message}\n`);
                }
            }
        }

        
        fs.writeFileSync(CONFIG.OUTPUT_FILE, JSON.stringify(allJobs, null, 2));
        console.log(`\n🎉 تمت المهمة بنجاح! إجمالي الوظائف في القاعدة: ${allJobs.length}`);
        console.log(`📁 الملف جاهز: ${CONFIG.OUTPUT_FILE}`);

    } catch (globalError) {
        console.error("🔥 خطأ كارثي في المحرك:", globalError);
    } finally {
        await browser.close();
    }
}

runUltimateScraper();