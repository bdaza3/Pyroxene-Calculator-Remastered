const gapReductionStartDate = new Date("2025-02-08"); //Date when gap reduction started, possibly outdated

export function computeAdjustedGap() {//Calculates the adjusted gap based on the time elapsed since the reduction started
  const today = new Date();
  const daysSinceReductionStarted = Math.floor((today - gapReductionStartDate) / (1000 * 60 * 60 * 24));
  const reductionRate = 7 / 53; //7 days reduced every 53 days, need to alter as reduction progresses
  const daysReduced = daysSinceReductionStarted * reductionRate;
  const originalGap = 180; //Original gap in days
  return originalGap - daysReduced;
}

export async function getBanners() {//Fetches banner data from the wiki, applies gap reduction, and returns an array of banner objects
  const adjustedGap = computeAdjustedGap();
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Banner%20List&format=json&origin=*";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const bannerHtml = data.parse.text["*"];
    const parser = new DOMParser();
    const doc = parser.parseFromString(bannerHtml, "text/html");
    const table = doc.querySelector(".bannertable");
    if (!table) return [];
    const banners = [];
    const today = new Date();
    table.querySelectorAll("tr").forEach((row, index) => {
      if (index === 0) return;
      const columns = row.querySelectorAll("td");
      if (columns.length > 2) {//Ensure there are enough columns to extract data
        let image = columns[0].querySelector("img")?.src || "";
        let character = columns[1].innerText.trim();
        let period = columns[2].innerText.trim();
        let startDate = new Date(period.split("—")[0].trim());
        let endDate = new Date(period.split("—")[1].trim());

        startDate.setDate(startDate.getDate() + adjustedGap);
        endDate.setDate(endDate.getDate() + adjustedGap);
        
        if (startDate < today) return;
        period = `${startDate.toLocaleDateString()} — ${endDate.toLocaleDateString()}`;
        if (character.includes("rerun")) character = character.replace("rerun", " rerun");
        const isLimited = row.classList.contains("limited");
        const oneDay = 24 * 60 * 60 * 1000;
        const numDays = Math.round(Math.abs((today - startDate) / oneDay));
        banners.push({ image, character, period, startDate, isLimited, numDays });
      }
    });
    return banners;
  } catch (e) {
    console.error(e);
    return [];
  }
}
