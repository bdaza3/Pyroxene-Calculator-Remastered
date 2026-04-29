export async function getEventList(selectedDays, adjustedGap) {
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Events&format=json&origin=*";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const htmlContent = data.parse.text["*"];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const jpEventTable = doc.querySelector(".wikitable");
    if (!jpEventTable) return [];
    const events = [];
    const today = new Date();
    jpEventTable.querySelectorAll("tr").forEach((row, index) => {
      if (index === 0) return;
      const columns = row.querySelectorAll("td");
      if (columns.length > 1) {
        let eventName = columns[0]?.innerText.trim() || "Unknown Event";
        let startDate = new Date(columns[2]?.innerText.trim() || "");
        let endDate = new Date(columns[3]?.innerText.trim() || "");
        startDate.setDate(startDate.getDate() + adjustedGap);
        endDate.setDate(endDate.getDate() + adjustedGap);

        const oneDay = 24 * 60 * 60 * 1000;
        const numDays = Math.round(Math.abs((today - startDate) / oneDay));
        if (startDate < today || numDays > selectedDays) return; //Do not include past events or those too far in the future
        const amount = 1650; //Assuming all events give 1650 Pyroxene
        const schedule = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
        events.push({ eventName, schedule, numDays, amount }); 
      }
    });
    events.sort((a, b) => a.numDays - b.numDays);
    return events;
  } catch (e) {
    console.error(e);
    return [];
  }
}


//Banners, Total Assault, and Grand Assault functions follow a similar pattern to getEventList, fetching data from the wiki, applying gap reduction, and filtering based on selected days.
export async function getTotalAssaultList(selectedDays, adjustedGap, totalAssaultRank) {
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Total_Assault&format=json&origin=*";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const htmlContent = data.parse.text["*"];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const table = doc.querySelector(".wikitable");
    if (!table) return [];


    const bosses = [];
    const today = new Date();
    table.querySelectorAll("tr").forEach((row, index) => {
      if (index === 0) return;
      const columns = row.querySelectorAll("td");
      if (columns.length > 1) {
        let bossName = columns[0].innerText.trim();
        let scheduleRaw = columns[2]?.innerText.trim() || "";
        let startDate = new Date(scheduleRaw.split("~")[0].trim());
        let endDate = new Date(scheduleRaw.split("~")[1].trim());

        startDate.setDate(startDate.getDate() + adjustedGap);
        endDate.setDate(endDate.getDate() + adjustedGap);

        const oneDay = 24 * 60 * 60 * 1000;
        const numDays = Math.round(Math.abs((today - startDate) / oneDay));
        if (startDate < today || numDays > selectedDays) return;

        let amount = 650; //Base pyroxene amount for Total Assault assuming full points earned
        if (totalAssaultRank === 'bronze') amount = 600 + 650;
        if (totalAssaultRank === 'silver') amount = 800 + 650;
        if (totalAssaultRank === 'gold') amount = 1000 + 650;
        if (totalAssaultRank === 'platinum') amount = 1200 + 650;

        const schedule = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
        bosses.push({ bossName, schedule, startDate, numDays, amount });
      }
    });
    return bosses;
  } catch (e) {
    console.error(e);
    return [];
  }
}

//Fetches from the Grand Assault page and has a different base amount for Pyroxene rewards.
export async function getGrandAssaultList(selectedDays, adjustedGap, GATickets) {
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Grand_Assault&format=json&origin=*";
  try {
    const response = await fetch(url);
    const data = await response.json();
    const htmlContent = data.parse.text["*"];
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const table = doc.querySelector(".raidtable");
    if (!table) return [];
    const bosses = [];
    const today = new Date();
    table.querySelectorAll("tr").forEach((row, index) => {
      if (index === 0) return;
      const columns = row.querySelectorAll("td");
      if (columns.length > 1) {
        let bossName = columns[0].innerText.trim().replace(" (Grand Assault)", "");
        let schedule = columns[3]?.innerText.trim() || "";
        let startDate = new Date(schedule.split("~")[0].trim());
        let endDate = new Date(schedule.split("~")[1].trim());
        startDate.setDate(startDate.getDate() + adjustedGap);
        endDate.setDate(endDate.getDate() + adjustedGap);

        const oneDay = 24 * 60 * 60 * 1000;
        const numDays = Math.round(Math.abs((today - startDate) / oneDay));
        if (startDate < today || numDays > selectedDays) return;

        let amount = GATickets ? 1850 : 650; //Base pyroxene amount for Grand Assault assuming full points earned, and additional dependent on whether the user has selected tickets or not
        const scheduleStr = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
        bosses.push({ bossName, schedule: scheduleStr, startDate, numDays, amount });
      }
    });
    return bosses;
  } catch (e) {
    console.error(e);
    return [];
  }
}
