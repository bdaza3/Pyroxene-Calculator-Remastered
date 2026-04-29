import { getEventList, getTotalAssaultList, getGrandAssaultList } from './calculations.js';
import { computeAdjustedGap } from './banners.js';

export function initCalculations() {
  const calculateBtn = document.getElementById('calculate-btn');
  if (!calculateBtn) return;

  calculateBtn.addEventListener('click', async () => {
    const resultDisplay = document.getElementById('result');
    if (resultDisplay) resultDisplay.textContent = 'Total Pyroxene: 0';

    let totalPyroxene = 0;
    let dailyPvp = 0;
    let numTotalAssaults = 0;
    let numGrandAssaults = 0;
    let numEvents = 0;

    const selectedDays = window.__selectedDays || 0;
    if (selectedDays === 0) { alert('Please select a banner before calculating!'); return; }

    const amountBoxTop = document.getElementById('amount-box-top');
    amountBoxTop?.classList.add('glowing');
    amountBoxTop?.scrollIntoView({ behavior: 'smooth' });

    // helpers to safely read inputs/selects
    const isCheckedById = (id) => {
      const e = document.getElementById(id);
      return e instanceof HTMLInputElement && e.checked;
    };
    const getSelectValueById = (id) => {
      const e = document.getElementById(id);
      return e instanceof HTMLSelectElement ? e.value : null;
    };

    //Clear outputs for unchecked checkboxes
    const idsToClear = ['daily','daily-task','weekly','maintenance','event','pvp','totalcheck','grand','bimonthly-pyropack','monthly-pyropack'];
    idsToClear.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (!(el instanceof HTMLInputElement && el.checked)) {
          const out = document.getElementById(`${id.replace(/-/g,'')}-calc`) || document.getElementById(`${id}-calc`);
          if (out) out.textContent = 'x0';
        }
      }
    });

    calculateBtn.disabled = true;
    calculateBtn.textContent = 'Calculating...';
    const cooldown = 3000; //3 second cooldown to prevent spamming the calculate button, which can cause multiple overlapping fetches and calculations

    const adjustedGap = computeAdjustedGap();
    const events = await getEventList(selectedDays, adjustedGap);
    numEvents = events.length;
    // render events
    const eventList = document.getElementById('eventList');
    if (eventList) {
      if (events.length === 0) eventList.innerHTML = '<p>No upcoming events found.</p>';
      else {
        let html = '<h2>Upcoming Events</h2><table border="1" style="background-color: #343434;"><tr><th>Event Name</th><th>Anticipated Schedule</th><th>Pyroxene Amount</th></tr>';
        events.forEach(e => { html += `<tr><td>${e.eventName}</td><td>${e.schedule}</td><td>${e.amount}</td></tr>` });
        html += '</table>';
        eventList.innerHTML = html; eventList.style.color = 'white';
      }
    }

    const totalRankSelect = document.getElementById('total-rank');
    const totalAssaultRank = (totalRankSelect?.value) || 'bronze';
    const totalAssaults = await getTotalAssaultList(selectedDays, adjustedGap, totalAssaultRank);
    numTotalAssaults = totalAssaults.length;
    const totalAssaultEl = document.getElementById('totalAssault');
    if (totalAssaultEl) {
      if (totalAssaults.length === 0) totalAssaultEl.innerHTML = '<p>No Total Assaults found.</p>';
      else {
        let html = '<h2>Total Assault List</h2><table border="1" style="background-color: #343434;"><tr><th>Boss Name</th><th>Anticipated Schedule</th><th>Pyroxene Amount</th></tr>';
        totalAssaults.forEach(b => { html += `<tr><td>${b.bossName}</td><td>${b.schedule}</td><td>${b.amount}</td></tr>`});
        html += '</table>';
        totalAssaultEl.innerHTML = html; totalAssaultEl.style.color = 'white';
      }
    }

    const gticketsBox = document.getElementById('tickets');
    const GATickets = !!(gticketsBox && gticketsBox instanceof HTMLInputElement && gticketsBox.checked);
    const grandAssaults = await getGrandAssaultList(selectedDays, adjustedGap, GATickets);
    numGrandAssaults = grandAssaults.length;
    const grandAssaultEl = document.getElementById('grandAssault');
    if (grandAssaultEl) {
      if (grandAssaults.length === 0) grandAssaultEl.innerHTML = '<p>No Grand Assaults found.</p>';
      else {
        let html = '<h2>Grand Assault List</h2><table border="1" style="background-color: #343434;"><tr><th>Boss Name</th><th>Anticipated Schedule</th><th>Pyroxene Amount</th></tr>';
        grandAssaults.forEach(b => { html += `<tr><td>${b.bossName}</td><td>${b.schedule}</td><td>${GATickets ? 1850 : 650}</td></tr>`});
        html += '</table>';
        grandAssaultEl.innerHTML = html; grandAssaultEl.style.color = 'white';
      }
    }

    // Compute totals by reading DOM selections
    if (isCheckedById('daily')) { totalPyroxene += Math.floor(selectedDays / 10) * 150; const el = document.getElementById('daily-calc'); if (el) el.textContent = `x${Math.floor(selectedDays / 10) * 150}`; }
    if (isCheckedById('daily-task')) { totalPyroxene += selectedDays * 20; const el = document.getElementById('daily-task-calc'); if (el) el.textContent = `x${selectedDays * 20}`; }
    if (isCheckedById('weekly')) { totalPyroxene += Math.floor(selectedDays / 7) * 120; const el = document.getElementById('weekly-calc'); if (el) el.textContent = `x${Math.floor(selectedDays / 7) * 120}`; }
    if (isCheckedById('maintenance')) { totalPyroxene += numEvents * 840; const el = document.getElementById('maintenance-calc'); if (el) el.textContent = `x${numEvents * 840}`; }
    if (isCheckedById('event')) { totalPyroxene += numEvents * 1650; const el = document.getElementById('event-calc'); if (el) el.textContent = `x${numEvents * 1650}`; }

    if (isCheckedById('pvp')) {
      const pvpRank = getSelectValueById('pvp-rank');
      switch (pvpRank) { case 'rank15000': dailyPvp = 10; break; case 'rank8000': dailyPvp = 12; break; case 'rank4000': dailyPvp = 14; break; case 'rank2000': dailyPvp = 16; break; case 'rank1000': dailyPvp = 18; break; case 'rank500': dailyPvp = 20; break; case 'rank200': dailyPvp = 25; break; case 'rank100': dailyPvp = 30; break; case 'rank10': dailyPvp = 35; break; case 'rank2': dailyPvp = 40; break; case 'rank1': dailyPvp = 45; break; default: dailyPvp = 0; }
      const pvpDisplay = document.getElementById('pvp-calc'); const pvpDisplayRate = document.getElementById('pvp-calc-rate'); if (pvpDisplay) pvpDisplay.textContent = `x${selectedDays * dailyPvp}`; if (pvpDisplayRate) pvpDisplayRate.textContent = `x${dailyPvp}`; totalPyroxene += selectedDays * dailyPvp;
    }

    if (isCheckedById('totalcheck')) {
      const rate = getSelectValueById('total-rank') || 'bronze';
      let per = 650; if (rate === 'bronze') per = 600 + 650; if (rate === 'silver') per = 800 + 650; if (rate === 'gold') per = 1000 + 650; if (rate === 'platinum') per = 1200 + 650;
      totalPyroxene += per * numTotalAssaults; const totalDisplayRate = document.getElementById('total-calc-rate'); const totalDisplay = document.getElementById('total-calc'); if (totalDisplayRate) totalDisplayRate.textContent = `x${per}`; if (totalDisplay) totalDisplay.textContent = `x${per * numTotalAssaults}`;
    }

    if (isCheckedById('grand')) {
      const per = GATickets ? 1850 : 650; totalPyroxene += per * numGrandAssaults; const grandDisplayRate = document.getElementById('grand-calc-rate'); const grandDisplay = document.getElementById('grand-calc'); if (grandDisplayRate) grandDisplayRate.textContent = `x${per}`; if (grandDisplay) grandDisplay.textContent = `x${per * numGrandAssaults}`;
    }

    if (isCheckedById('bimonthly-pyropack')) { const bimonthly = (selectedDays * 20) + 176; totalPyroxene += bimonthly; const el = document.getElementById('bimonthly-calc'); if (el) el.textContent = `x${bimonthly}`; }
    if (isCheckedById('monthly-pyropack')) { const monthly = (selectedDays * 40) + 392; totalPyroxene += monthly; const el = document.getElementById('monthly-calc'); if (el) el.textContent = `x${monthly}`; }

    setTimeout(() => { calculateBtn.disabled = false; calculateBtn.textContent = 'Calculate'; }, cooldown);

    const currentInput = document.getElementById('current-pyroxenes');
    const currentValue = (currentInput instanceof HTMLInputElement) ? parseInt(currentInput.value || '0', 10) : 0;
    const final = totalPyroxene + (isNaN(currentValue) ? 0 : currentValue);
    if (resultDisplay) resultDisplay.textContent = `Total Pyroxenes: x${final}`;
    const calcResult = document.getElementById('result-popup'); if (calcResult) calcResult.style.display = 'block'; const resultPyro = document.getElementById('resultpyro'); if (resultPyro) resultPyro.textContent = `x${final}`;
  });
}
