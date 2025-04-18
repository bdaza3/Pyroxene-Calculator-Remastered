
export function navbuttons(){
  //Press About button to show the About popup
  const aboutPopup = document.getElementById('about-popup');
  const aboutNav = document.getElementById('about-nav');
  const aboutBtn = document.getElementById('about-btn');
  aboutNav.addEventListener('click', () => {
    aboutPopup.classList.add('active');
  });
  aboutBtn.addEventListener('click', () => {
    aboutPopup.classList.add('active');
  }
  );

  // Hide the about popup when close button is clicked
  const closeAboutBtn = document.getElementById('close-about');
  closeAboutBtn.addEventListener('click', () => {
    aboutPopup.classList.remove('active');
  }
  );

  // Hide popup when clicking outside the About popup content
  window.addEventListener('click', (event) => {
    if (event.target === aboutPopup) {
      aboutPopup.classList.remove('active');
    }
  });

  const contactPopup = document.getElementById('contact-popup');
  const contactNav = document.getElementById('contact-nav');
  const contactBtn = document.getElementById('contact-btn');
  contactNav.addEventListener('click', () => {
    contactPopup.classList.add('active');
  });
  contactBtn.addEventListener('click', () => {
    contactPopup.classList.add('active');
  }
  );

  // Hide the Contact popup when close button is clicked
  const closeContactBtn = document.getElementById('close-contact');
  closeContactBtn.addEventListener('click', () => {
    contactPopup.classList.remove('active');
  }
  );

  // Hide popup when clicking outside the Contact popup content
  window.addEventListener('click', (event) => {
    if (event.target === contactPopup) {
      contactPopup.classList.remove('active');
    }
  });
}

export function menuDropdown(){
  const menuIcon = document.getElementById('menu-icon');
  const dropdownMenu = document.getElementById('dropdown-menu');
  //const darkModeToggle = document.getElementById('dark-mode-toggle');
  
  // Toggle the dropdown menu visibility
  menuIcon.addEventListener('click', () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'block' ? 'none' : 'block';
  });
  
  // Close the dropdown menu if clicked outside
  document.addEventListener('click', (event) => {
    if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
      dropdownMenu.style.display = 'none';
    }
  });
}

export function checkBoxes(){
//Select pvp checkbox and dropdown
const pvpCheckbox = document.getElementById('pvp');
const pvpDropdown = document.getElementById('pvp-rank');

let pvpRank = pvpDropdown.value; // Initialize with default selected value
// Event listener for checkbox toggle
pvpCheckbox.addEventListener('change', () => {
  if (pvpCheckbox.checked) {
    pvpDropdown.style.display = 'block'; // Show dropdown
  } else {
    pvpDropdown.style.display = 'none'; // Hide dropdown
    pvpRank = ""; // Reset rank when checkbox is unchecked
  }
});

// Event listener for dropdown rank selection
pvpDropdown.addEventListener('change', () => {
  pvpRank = pvpDropdown.value; // Update selected rank
  console.log("Selected Rank:", pvpDropdown.options[pvpDropdown.selectedIndex].text); // Show the text
});

window.addEventListener('DOMContentLoaded', () => {
  pvpDropdown.style.display = 'none'; // Correctly hide the dropdown
});

//Select total assault checkbox and dropdown
const tcheckbox = document.getElementById('totalcheck');
const tdropdown = document.getElementById('total-rank');

let TACheck = false;
let totalAssaultRank = tdropdown.value; //initial rank set to bronze

tcheckbox.addEventListener('change', () => {
  if (tcheckbox.checked) {
    tdropdown.style.display = 'block'; // Show dropdown
    TACheck = true;
  } else {
    tdropdown.style.display = 'none'; // Hide dropdown
    totalAssaultRank = ""; // Reset rank when checkbox is unchecked
    TACheck = false;
  }
});

tdropdown.addEventListener('change', () => {
  totalAssaultRank = tdropdown.value; // Update selected rank
  console.log("Selected Rank:", tdropdown.options[tdropdown.selectedIndex].text); // Show the text
}
);


window.addEventListener('DOMContentLoaded', () => {
tdropdown.style.display = 'none';});


//Select grand assault checkbox and dropdown
const gcheckbox = document.getElementById('grand');
const gtickets = document.getElementById('ticketsdiv');
const gticketsbox = document.getElementById('tickets');

let GACheck = false;
let GATickets = false;

// Event listener for the grand assault checkbox
gcheckbox.addEventListener('change', () => {
  if (gcheckbox.checked) {
    GACheck = true;
    gtickets.style.display = 'block'; // Show tickets checkbox
  } else {
    gtickets.style.display = 'none'; // Hide tickets
    GACheck = false;
    GATickets = false;
  }
});

// Event listener for the tickets checkbox
gticketsbox.addEventListener('change', () => {
  if (gticketsbox.checked) {
    GATickets = true;
  } else {
    GATickets = false;
  }
});

// Hide the tickets checkbox on page load
window.addEventListener('DOMContentLoaded', () => {
  gtickets.style.display = 'none';
});


const currentPyroxenesInput = document.getElementById('current-pyroxenes');
let value = 0;

// Add an event listener to validate the input dynamically
currentPyroxenesInput.addEventListener('input', () => {
  value = parseInt(currentPyroxenesInput.value, 10);

  // Ensure the value is not negative
  if (value < 0) {
    currentPyroxenesInput.value = 0;
  }

  // Ensure the value does not exceed 1,000,000
  if (value > 1000000) {
    currentPyroxenesInput.value = 1000000;
  }

  // Ensure the value is a number (mobile issue)
  if (isNaN(value)) {
    currentPyroxenesInput.value = 0;
  }
}
);

//}

//Storage for the number of days from today to the start date of the selected banner
let selectedDays = 0;

//Storage for the start date of the selected banner
let selectedStartDate = 0;

//export function banners(){

            // Get elements
    const banners = document.querySelectorAll('.selectable-box');
    const checkboxes = document.querySelectorAll('.check-inputs input[type="checkbox"]');
    const calculateBtn = document.getElementById('calculate-btn');
    const amountBoxTop = document.getElementById('amount-box-top');

    //Select banner popup button
    const popup = document.getElementById('popup');
    const openPopupBtn = document.getElementById('upcoming-banner-btn');
    const closePopupBtn = document.getElementById('close-popup');
    const boxes = document.querySelectorAll('.selectable-box');
  
    // Show popup when button is clicked
    openPopupBtn.addEventListener('click', () => {
      console.log("Popup opened");
      popup.classList.add('active');
    });
  
    // Hide popup when clicking outside the popup content
    window.addEventListener('click', (event) => {
      if (event.target === popup) {
        popup.classList.remove('active');
      }
    });
  
    // Hide popup when close button is clicked
    closePopupBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });

  const gapReductionStartDate = new Date("2025-02-08"); // Date of banner start when the gap reduction started
  let today = new Date(); // Get today's date
  const daysSinceReductionStarted = Math.floor((today - gapReductionStartDate) / (1000 * 60 * 60 * 24));
  const reductionRate = 7 / 51; // Days reduced per day (lost 9 days in 52 days since start)
  const daysReduced = daysSinceReductionStarted * reductionRate; // Total days reduced since gap reduction started
  const originalGap = 180; // 6 months in days
  const adjustedGap = originalGap - daysReduced; // Adjusted gap based on reduction rate


//Gets banner data from the Blue Archive Wiki
async function getBanners() {
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Banner%20List&format=json&origin=*";

  try {
      const response = await fetch(url);
      const data = await response.json();

      // Extract the HTML content of the page
      const bannerHtml = data.parse.text["*"];

      // Create a temporary DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(bannerHtml, "text/html");

      // Select the banner table
      const table = doc.querySelector(".bannertable");

      if (!table) {
          console.error("No banner table found!");
          return;
      }

      let banners = [];
      let today = new Date(); // Get today's date

      // Extract rows from the table
      table.querySelectorAll("tr").forEach((row, index) => {
          if (index === 0) return; // Skip header row

          const columns = row.querySelectorAll("td");
          if (columns.length > 2) {
              let image = columns[0].querySelector("img")?.src || "No Image"; //formatted as https://bluearchive.wiki/File:Azusa_Swimsuit.png
              let character = columns[1].innerText.trim();
              let period = columns[2].innerText.trim(); //JP format 02/04/2021 12:00 — 02/11/2021 12:00
              let startDate = new Date(period.split("—")[0].trim()); // Get the start date of the banner
              let endDate = new Date(period.split("—")[1].trim()); // Get the end date of the banner

          // If the character contains "anniversary", truncate everything after the ')'
          if (character.toLowerCase().includes("anniversary")) {
            const closingParenIndex = character.indexOf(')');
            if (closingParenIndex !== -1) {
              character = character.substring(0, closingParenIndex + 1).trim();
            }
          }

          if (character.includes("Rio")) { //Special case for Rio (temporary until the character banner passes)
            character = "Rio";
          }

              //add adjusted gap to the start date for global timings
              startDate.setDate(startDate.getDate() + adjustedGap);
              endDate.setDate(endDate.getDate() + adjustedGap);
              if (startDate < today) return;
              //only show banners that are after today's date
              //update the period to show the global timings +6 months (NOT ACCURATE AS TIMINGS ARE SHORTENING)
              period = `${startDate.toLocaleDateString()} — ${endDate.toLocaleDateString()}`;
              
              //if character is a rerun, add a space before the character name
              if (character.includes("rerun")) {
                character = character.replace("rerun", " rerun");
              }

              let isLimited = row.classList.contains("limited");

              //associate number of days from today to the start date to each banner for calculation
              const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
              const numDays = Math.round(Math.abs((today - startDate) / oneDay));
              
              // Only keep banners that start in the future
              if (startDate >= today) {
                  banners.push({image, character, period, startDate, isLimited, numDays});
              }
          }
      });

      // Display banners dynamically in the popup
      const popupScrollable = document.querySelector('.popup-scrollable');
      banners.forEach((banner) => {//EVERY BANNER
          const box = document.createElement('div');
          box.classList.add('selectable-box');
          if (banner.isLimited) {
              box.style.backgroundColor = '#ff9245';
          }
          box.innerHTML = `
            <img src="${banner.image}" alt="${banner.character}">
            <span><strong>${banner.character}</strong></span>
            <span>${banner.period}</span>
          `;
          // Add click event to each banner (IF THE BANNER IS SELECTED)
          box.addEventListener('click', () => {
            console.log("Selected Banner:", banner.character);
            //selectedBoxContent = `${banner.character} (${banner.period})`;
            popup.classList.remove('active'); // Close the popup
            //if limited, change the button color to orange
            if (banner.isLimited) {
              openPopupBtn.style.backgroundColor = '#ff9245';
            } else {
              openPopupBtn.style.backgroundColor = '#8acaff';
            }

            //store the number of days from today to the start date of the selected banner
            selectedDays = banner.numDays;
            selectedStartDate = banner.startDate;

            //show the number of days in the button
            const daysHeader = document.getElementById('days-header');
            daysHeader.style.display = 'block'; // Show the header
            if (selectedDays === 1) {
              daysHeader.textContent = `${selectedDays} Day until selected banner starts on ${selectedStartDate.toLocaleDateString()}.`;
            }
            else
              daysHeader.textContent = `${selectedDays} Days until selected banner starts on ${selectedStartDate.toLocaleDateString()}.`;

            //show the selected banner in the button
            openPopupBtn.innerHTML = `
              <div style="display: flex; align-items: center; justify-content: center;">
                <img src="${banner.image}" alt="Selected Banner" style="height: 20px; margin-right: 8px;">
                <span>${banner.character}</span>
              </div>
            `;
            calculateBtn.disabled = false; // Enable the calculate button
            calculateBtn.classList.add('yellow-glow'); // Add a glowing effect
          });
          popupScrollable.appendChild(box);
      });


  } catch (error) {
      console.error("Error fetching banner data:", error);
  }
}

//immediately call the function to get the banners
getBanners();
//}

//export function calculatePyroxene(){

//Storage for output
let numTotalAssaults = 0;
let numGrandAssaults = 0;
let numEvents = 0;

//Gets the event data from the Blue Archive Wiki
async function getEventList() {
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Events&format=json&origin=*";

  try {
      const response = await fetch(url);
      const data = await response.json();

      // Extract the raw HTML content
      const htmlContent = data.parse.text["*"];

      // Create a temporary DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      // Locate the first table inside the "Japanese version" tab
      const jpEventTable = doc.querySelector(".wikitable");
      if (!jpEventTable) {
          console.error("Event table not found!");
          document.getElementById("eventList").innerHTML = "<p>Error: Could not find event data.</p>";
          return;
      }

      let events = [];
      let today = new Date(); // Get today's date

      // Extract event rows, skipping the header row
      jpEventTable.querySelectorAll("tr").forEach((row, index) => {//EVERY RAID
        if (index === 0) return; // Skip table header

        const columns = row.querySelectorAll("td");
        if (columns.length > 1) {
          // Extract event name
          let eventName = columns[0]?.innerText.trim() || "Unknown Event";
          let startDate = columns[2]?.innerText.trim() || "Unknown";
          let endDate = columns[3]?.innerText.trim() || "Unknown";

          //approximately 8-11 stories, each story gives about 15-20 pyroxenes, so we can average to 10 stories with 15 each = 150 pyroxenes
          //always 12 missions, each mission gives 30 pyroxenes
          //always (mostly) 3 challenges, each challenge gives 60 pyroxenes fully completed
          //event shops give about 1200 to 600 pyroxenes, so we can average to 900 pyroxenes

          let amount = (150) + (12 * 30) + (3 * 60) + 60;
          amount += 900; //approximate amount of Pyroxene each event exchange/shop
          //so far average of events is about 1700 pyroxenes, so we'll just do 1650

          // Convert dates to Date objects
          startDate = new Date(startDate);
          endDate = new Date(endDate);

          //add adjusted gap to the start date for global timings
          startDate.setDate(startDate.getDate() + adjustedGap);
          endDate.setDate(endDate.getDate() + adjustedGap);

          // Format the schedule string
          let schedule = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;

          // Calculate days from today to event start
          const oneDay = 24 * 60 * 60 * 1000;
          const numDays = Math.round(Math.abs((today - new Date(startDate)) / oneDay));

          // Only show upcoming events
          if (startDate < today || numDays > selectedDays) return;

          events.push({ eventName, schedule, numDays, amount});
          numEvents++;
        }
      });

      // Sort events by start date (earliest first)
      events.sort((a, b) => a.numDays - b.numDays);

      // Display the event data in the website
      const eventList = document.getElementById('eventList');

      let tableHTML = `
          <h2>Upcoming Events</h2>
          <table border="1" style="background-color: #343434;">
              <tr>
                  <th>Event Name</th>
                  <th>Anticipated Schedule</th>
                  <th>Pyroxene Amount</th>
              </tr>
      `;

      events.forEach(event => {
          tableHTML += `
              <tr>
                  <td>${event.eventName}</td>
                  <td>${event.schedule}</td>
                  <td>${event.amount}</td>
              </tr>
          `;
      });

      tableHTML += `</table>`;
      eventList.innerHTML = tableHTML;
      eventList.style.color = "white"; // Change text color to white

      if (events.length === 0) {
          eventList.innerHTML = "<p>No upcoming events found.</p>";
          eventList.style.color = "white"; // Change text color to white
      }

  } catch (error) {
      console.error("Error fetching Event data:", error);
      document.getElementById("eventList").innerHTML = "<p>Failed to load event data.</p>";
  }
}

//Gets the Total Assault data from the Blue Archive Wiki
async function getTotalAssaultList() {
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Total_Assault&format=json&origin=*";

  try {
      const response = await fetch(url);
      const data = await response.json();

      // Extract the raw HTML content
      const htmlContent = data.parse.text["*"];

      // Create a temporary DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      // Find the Total Assault table (check class names in inspect element)
      const table = doc.querySelector(".wikitable"); // Try .wikitable if .raidtable doesn't exist

      if (!table) {
          console.error("No Total Assault table found!");
          document.getElementById("totalAssault").innerHTML += policy.createHTML("<p>Error: Could not find table.</p>");
          return;
      }

      let bosses = [];
      let today = new Date(); // Get today's date

      // Loop through table rows (skip the header row)
      table.querySelectorAll("tr").forEach((row, index) => {//EVERY RAID
          if (index === 0) return; // Skip table header

          const columns = row.querySelectorAll("td");
          if (columns.length > 1) {
              let bossName = columns[0].innerText.trim();
              let schedule = columns[2]?.innerText.trim() || "Unknown";
              let startDate = new Date(schedule.split("~")[0].trim()); // Get the start date of the Total Assault
              let endDate = new Date(schedule.split("~")[1].trim()); // Get the end date of the Total Assault
              let amount = 650; //Default amount of Pyroxene 

              if (totalAssaultRank === 'bronze') {
                amount = 600 + 650; // Bronze
              } else if (totalAssaultRank === 'silver') {
                amount = 800 + 650; // Silver
              } else if (totalAssaultRank === 'gold') {
                amount = 1000 + 650; // Gold
              } else if (totalAssaultRank === 'platinum') {
                amount = 1200 + 650; // Platinum
              }

              //add adjusted gap to the start date for global timings
              startDate.setDate(startDate.getDate() + adjustedGap);
              endDate.setDate(endDate.getDate() + adjustedGap);

              //associate number of days from today to the start date to each banner for calculation
              const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
              const numDays = Math.round(Math.abs((today - startDate) / oneDay));

              //only show bosses that are after today's date and before the selected banner's start date using numDays
              if (startDate < today || numDays > selectedDays) return;

              //further calculations for when banner is in middle of total assault (no rank rewards included) aka numDays < selectedDays and endDate (in days) > selectedDays
              const endNumDays = Math.round(Math.abs((today - endDate) / oneDay));
              if (endNumDays > selectedDays) {//if the banner is in the middle of the total assault and the end date is after the selected banner's start date
                amount = 650; // Default amount of Pyroxene
              }

              //update the schedule to show the global timings +6 months (NOT ACCURATE AS TIMINGS ARE SHORTENING)
              schedule = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
              bosses.push({ bossName, schedule, startDate, numDays, amount}); // Add boss to the list
              numTotalAssaults++;
          }
      });

      // Display the Total Assault data in the website
      const totalAssaultList = document.getElementById('totalAssault');
      
      let tableHTML = `
          <h2>Total Assault List</h2>
          <table border="1" style="background-color: #343434;">
            <tr>
              <th>Boss Name</th>
              <th>Anticipated Schedule</th>
              <th>Pyroxene Amount</th>
            </tr>
      `;

      bosses.forEach(boss => {
          tableHTML += `
            <tr>
              <td>${boss.bossName}</td>
              <td>${boss.schedule}</td>
              <td>${boss.amount}</td>
            </tr>
          `;
      });

      tableHTML += `</table>`;
      totalAssaultList.innerHTML = tableHTML; // Update page
      totalAssaultList.style.color = "white"; // Change text color to white

      if (numTotalAssaults === 0) {
          totalAssaultList.innerHTML = "<p>No Total Assaults found.</p>"; 
          totalAssaultList.style.color = "white"; // Change text color to white
      }

  } catch (error) {
      console.error("Error fetching Total Assault data:", error);
      document.getElementById("totalAssault").innerHTML = "<p>Failed to load data.</p>";
  }
}


//Gets the Grand Assault data from the Blue Archive Wiki
async function getGrandAssaultList() {
  const url = "https://bluearchive.wiki/w/api.php?action=parse&page=Grand_Assault&format=json&origin=*";

  try {
      const response = await fetch(url);
      const data = await response.json();

      // Extract the raw HTML content
      const htmlContent = data.parse.text["*"];

      // Create a temporary DOM parser
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");

      // Select the table (update this if the class is different)
      const table = doc.querySelector(".raidtable"); 

      if (!table) {
          console.error("No Grand Assault table found!");
          return;
      }

      let bosses = [];
      let today = new Date(); // Get today's date

      // Loop through table rows (skip the header row)
      table.querySelectorAll("tr").forEach((row, index) => {
          if (index === 0) return; // Skip table header

          const columns = row.querySelectorAll("td");
          if (columns.length > 1) {
              let bossName = columns[0].innerText.trim().replace(" (Grand Assault)", "");
              let schedule = columns[3]?.innerText.trim() || "Unknown";
              let startDate = new Date(schedule.split("~")[0].trim()); // Get the start date of the Grand Assault
              let endDate = new Date(schedule.split("~")[1].trim()); // Get the end date of the Grand Assault
              let amount = 650; //Default amount of Pyroxene

              //add adjusted gap to the start date for global timings
              startDate.setDate(startDate.getDate() + adjustedGap);
              endDate.setDate(endDate.getDate() + adjustedGap);

                if (GATickets === true) {
                  console.log("Grand Assault Tickets Checked");
                  amount = 1850; // Grand Assault (with tickets)
                } else {
                  console.log("Grand Assault Tickets Unchecked");
                  amount = 650; // Grand Assault (without tickets)
                }

              //associate number of days from today to the start date to each banner for calculation
              const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
              const numDays = Math.round(Math.abs((today - startDate) / oneDay));

              //only show bosses that are after today's date and before the selected banner's start date using numDays
              if (startDate < today || numDays > selectedDays) return;

              //further calculations for when banner is in middle of grand assault (no rank rewards included) aka numDays < selectedDays and endDate (in days) > selectedDays
              const endNumDays = Math.round(Math.abs((today - endDate) / oneDay));
              if (endNumDays > selectedDays) {//if the banner is in the middle of the grand assault and the end date is after the selected banner's start date
                  amount = 650; // Default amount of Pyroxene
              }

              //update the schedule to show the global timings (NOT ACCURATE AS TIMINGS ARE SHORTENING)
              schedule = `${startDate.toLocaleDateString()} ~ ${endDate.toLocaleDateString()}`;
              bosses.push({ bossName, schedule, startDate, numDays, amount}); // Add boss to the list
              numGrandAssaults++;
          }
      });

      // Display the Grand Assault data in the website
      const grandAssaultList = document.getElementById('grandAssault');

      let tableHTML = `
          <h2>Grand Assault List</h2>
          <table border="1" style="background-color: #343434;">
            <tr>
              <th>Boss Name</th>
              <th>Anticipated Schedule</th>
              <th>Pyroxene Amount</th>
            </tr>
      `;

      bosses.forEach(boss => {
          tableHTML += `
            <tr>
              <td>${boss.bossName}</td>
              <td>${boss.schedule}</td>
              <td>${boss.amount}</td>
            </tr>
          `;
      });

      tableHTML += `</table>`;
      grandAssaultList.innerHTML = tableHTML; // Update page
      grandAssaultList.style.color = "white"; // Change text color to white

      if (numGrandAssaults === 0) {
          grandAssaultList.innerHTML = "<p>No Grand Assaults found.</p>";
          grandAssaultList.style.color = "white"; // Change text color to white
      }

  } catch (error) {
      console.error("Error fetching Grand Assault data:", error);
  }
}

//Calculate Pyroxene button

          // Get elements
          //const banners = document.querySelectorAll('.selectable-box');
          //const checkboxes = document.querySelectorAll('.check-inputs input[type="checkbox"]');
          //const calculateBtn = document.getElementById('calculate-btn');
          //const amountBoxTop = document.getElementById('amount-box-top');

              // Add click event to the calculate button
              calculateBtn.addEventListener('click', async () => {

              // Reset the result display
              const resultDisplay = document.getElementById('result');
              resultDisplay.textContent = 'Total Pyroxene: 0';

              let totalPyroxene = 0;
              let dailyPvp = 0
              numTotalAssaults = 0;
              numGrandAssaults = 0;
              numEvents = 0;

              if (totalPyroxene > 0) {
                totalPyroxene = 0;
              }

              //Make sure a banner is selected before calculating
              if (selectedDays === 0) {
                alert('Please select a banner before calculating!');
                return;
              }

              amountBoxTop.classList.add('glowing');  
              amountBoxTop.scrollIntoView({ behavior: 'smooth' });
 

                // Clear outputs for unchecked checkboxes
                if (!document.getElementById('daily').checked) {
                  const dailyCalc = document.getElementById('daily-calc');
                  if (dailyCalc) dailyCalc.textContent = 'x0';
                }
                if (!document.getElementById('daily-task').checked) {
                  const dailyTaskCalc = document.getElementById('daily-task-calc');
                  if (dailyTaskCalc) dailyTaskCalc.textContent = 'x0';
                }
                if (!document.getElementById('weekly').checked) {
                  const weeklyCalc = document.getElementById('weekly-calc');
                  if (weeklyCalc) weeklyCalc.textContent = 'x0';
                }
                if (!document.getElementById('maintenance').checked) {
                  const maintenanceCalc = document.getElementById('maintenance-calc');
                  if (maintenanceCalc) maintenanceCalc.textContent = 'x0';
                }
                if (!document.getElementById('event').checked) {
                  const eventCalc = document.getElementById('event-calc');
                  if (eventCalc) eventCalc.textContent = 'x0';
                }
                if (!document.getElementById('pvp').checked) {
                  const pvpCalc = document.getElementById('pvp-calc');
                  if (pvpCalc) pvpCalc.textContent = 'x0';
                }
                if (!document.getElementById('totalcheck').checked) {
                  const totalCalc = document.getElementById('total-calc');
                  if (totalCalc) totalCalc.textContent = 'x0';
                }
                if (!document.getElementById('grand').checked) {
                  const grandCalc = document.getElementById('grand-calc');
                  if (grandCalc) grandCalc.textContent = 'x0';
                }
                if (!document.getElementById('bimonthly-pyropack').checked) {
                  const bimonthlyCalc = document.getElementById('bimonthly-calc');
                  if (bimonthlyCalc) bimonthlyCalc.textContent = 'x0';
                }
                if (!document.getElementById('monthly-pyropack').checked) {
                  const monthlyCalc = document.getElementById('monthly-calc');
                  if (monthlyCalc) monthlyCalc.textContent = 'x0';
                }

              //Add cooldown to the calculate button
              calculateBtn.disabled = true;
              calculateBtn.textContent = 'Calculating...';
              const cooldown = 3000;

              //wait for the event list to be fetched
              await getEventList(); // Get Event data and display it

              //wait for the total assault list to be fetched
              await getTotalAssaultList(); // Get Total Assault data and display it
              console.log("Total Assaults:", numTotalAssaults); //num of total assaults

              //wait for the grand assault list to be fetched
              await getGrandAssaultList(); // Get Grand Assault data and display
              console.log("Grand Assaults:", numGrandAssaults); //num of grand assaults

              const raidsList = document.getElementById('raidslist');
              raidsList.style.display = 'block';

              // Add Pyroxene amounts from selected checkboxes and show calculations
              if (document.getElementById('daily').checked) {//Daily login
                totalPyroxene += Math.floor(selectedDays / 10) * 150;
                const dailyDisplay = document.getElementById('daily-calc');
                dailyDisplay.textContent = `x${Math.floor(selectedDays / 10) * 150}`;
              }
              if (document.getElementById('daily-task').checked) {//Daily tasks
                const dailyTaskDisplay = document.getElementById('daily-task-calc');
                dailyTaskDisplay.textContent = `x${selectedDays * 20}`;
                totalPyroxene += selectedDays * 20;
              }
              if (document.getElementById('weekly').checked) {//Weekly tasks
                const weeklyDisplay = document.getElementById('weekly-calc');
                weeklyDisplay.textContent = `x${Math.floor(selectedDays / 7) * 120}`;
                totalPyroxene += Math.floor(selectedDays / 7) * 120;
              }
              if (document.getElementById('maintenance').checked) {
                const maintenanceDisplay = document.getElementById('maintenance-calc');
                //Maintenance rewards usually given every event release or minor fix, and events range from 720 to 960. We'll average to 840 per maintenance. 
                maintenanceDisplay.textContent = `x${numEvents * 840}`;
                totalPyroxene += numEvents * 840; // Maintenance Rewards
              }
              if (document.getElementById('event').checked) {
                const eventDisplay = document.getElementById('event-calc');
                eventDisplay.textContent = `x${numEvents * 1650}`;
                totalPyroxene += numEvents * 1650; // Event Rewards
              }
              if (document.getElementById('pvp').checked) {
                switch (pvpRank) {
                    case 'rank15000': dailyPvp = 10; break; // Rank 8001 - 15000
                    case 'rank8000': dailyPvp = 12; break; // Rank 4001 - 8000
                    case 'rank4000': dailyPvp = 14; break; // Rank 2001 - 4000
                    case 'rank2000': dailyPvp = 16; break; // Rank 1001 - 2000
                    case 'rank1000': dailyPvp = 18; break; // Rank 501 - 1000
                    case 'rank500': dailyPvp = 20; break; // Rank 201 - 500
                    case 'rank200': dailyPvp = 25; break; // Rank 101 - 200
                    case 'rank100': dailyPvp = 30; break; // Rank 11 - 100
                    case 'rank10': dailyPvp = 35; break; // Rank 3 - 10
                    case 'rank2': dailyPvp = 40; break; // Rank 2
                    case 'rank1': dailyPvp = 45; break; // Rank 1
                }
                const pvpDisplay = document.getElementById('pvp-calc');
                const pvpDisplayRate = document.getElementById('pvp-calc-rate');
                pvpDisplay.textContent = `x${selectedDays * dailyPvp}`;
                pvpDisplayRate.textContent = `x${dailyPvp}`;
                totalPyroxene += selectedDays * dailyPvp;
              }
              if (document.getElementById('totalcheck').checked) {
                const totalDisplay = document.getElementById('total-calc');
                const totalDisplayRate = document.getElementById('total-calc-rate');
                switch (totalAssaultRank) {
                  case 'bronze':
                    totalPyroxene += (600 + 650) * numTotalAssaults; // Bronze
                    totalDisplayRate.textContent = `x${600 + 650}`;
                    totalDisplay.textContent = `x${(600 + 650) * numTotalAssaults}`;
                    break;
                  case 'silver':
                    totalPyroxene += (800 + 650) * numTotalAssaults; // Silver
                    totalDisplayRate.textContent = `x${800 + 650}`;
                    totalDisplay.textContent = `x${(800 + 650) * numTotalAssaults}`;
                    break;
                  case 'gold':
                    totalPyroxene += (1000 + 650) * numTotalAssaults; // Gold
                    totalDisplayRate.textContent = `x${1000 + 650}`;
                    totalDisplay.textContent = `x${(1000 + 650) * numTotalAssaults}`;
                    break;
                  case 'platinum':
                    totalPyroxene += (1200 + 650) * numTotalAssaults; // Platinum
                    totalDisplayRate.textContent = `x${1200 + 650}`;
                    totalDisplay.textContent = `x${(1200 + 650) * numTotalAssaults}`;
                    break;
                  }
              }
              if (document.getElementById('grand').checked) {
                if (GATickets === true){//if grand assault tickets are checked
                  const grandDisplay = document.getElementById('grand-calc');
                  const grandDisplayRate = document.getElementById('grand-calc-rate');
                  grandDisplay.textContent = `x${(1200 + 650) * numGrandAssaults}`;
                  grandDisplayRate.textContent = `x${1200 + 650}`;
                  totalPyroxene += 1850 * numGrandAssaults; // Grand Assault (with tickets)
                }
                else{
                  const grandDisplay = document.getElementById('grand-calc');
                  const grandDisplayRate = document.getElementById('grand-calc-rate');
                  grandDisplay.textContent = `x${(650) * numGrandAssaults}`;
                  grandDisplayRate.textContent = `x${650}`;
                  totalPyroxene += 650 * numGrandAssaults; // Grand Assault (without tickets)
                }
              }
              if (document.getElementById('bimonthly-pyropack').checked) {
                const bimonthlyDisplay = document.getElementById('bimonthly-calc');
                bimonthlyDisplay.textContent = `x${(selectedDays * 20) + 176}`;
                totalPyroxene += (selectedDays * 20) + 176; // Bimonthly Pyroxene Pack
              }
              if (document.getElementById('monthly-pyropack').checked) {
                const monthlyDisplay = document.getElementById('monthly-calc');
                monthlyDisplay.textContent = `x${(selectedDays * 40) + 392}`;
                totalPyroxene += (selectedDays * 40) + 392; // Monthly Pyroxene Pack
              }
              // Reset the button after the cooldown
              setTimeout(() => {
                calculateBtn.disabled = false;
                calculateBtn.textContent = 'Calculate';
              }, cooldown);

              // Display the result
              resultDisplay.textContent = `Total Pyroxenes: x${totalPyroxene + value}`;
              const calcResult = document.getElementById('result-popup');
              calcResult.style.display = 'block';
              const resultPyro = document.getElementById('resultpyro');
              resultPyro.textContent = `x${totalPyroxene + value}`;
              const resultPyro2 = document.getElementById('resultpyro2');
              resultPyro2.textContent = `x${totalPyroxene + value}`;
            }
            );
          }