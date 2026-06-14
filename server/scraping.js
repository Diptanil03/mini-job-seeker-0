import puppeteer from "puppeteer";

export const scrapJobBySkill=async(skill)=>{
  const urlString=skill.join(',')
    const browser=await puppeteer.launch({
        headless:'new',
        args:['--no-sandbox', '--disable-setuid-sandbox']
    })
    const page=await browser.newPage()
    // Set a realistic User-Agent so the site doesn't immediately block you as a bot
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
  try {
    
    const searchUrl=`https://internshala.com/jobs/${encodeURIComponent(urlString)}-jobs`
    await page.goto(searchUrl,{waitUntil:'domcontentloaded',timeout:60000})
    await page.waitForSelector('.internship_list_container',{timeout:10000})
    const jobs=await page.evaluate(()=>{
        const cardElements=document.querySelectorAll('.individual_internship')
        const results=[]
     cardElements.forEach(card => {
            const title=card.querySelector('.job-internship-name')?.innerText.trim()|| 'N/A'
            const company=card.querySelector('.company-name')?.innerText.trim()|| 'N/A'
            const location=card.querySelector('.locations')?.innerText.trim()|| 'N/A'
            const link = card.querySelector('a.job-title-href')?.href || '';
            const dynamicTags=Array.from(card.querySelectorAll('.job_skill'))?.map(tag=>tag.innerText.trim())
            results.push({title,company,location,link,skillFound:dynamicTags})
        });

       return results;
    })
    await browser.close();
    return jobs;
  } catch (error) {
    console.error(`Scraping process failed for keyword [${skill}]:`, error);
    await browser.close();
    return [];
  }
}