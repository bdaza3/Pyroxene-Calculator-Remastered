export function checkBoxes(){
  const pvpCheckbox = document.getElementById('pvp');
  const pvpDropdown = document.getElementById('pvp-rank');
  if (pvpCheckbox && pvpDropdown) {
    let pvpRank = pvpDropdown.value;
    pvpCheckbox.addEventListener('change', () => {
      pvpDropdown.style.display = pvpCheckbox.checked ? 'block' : 'none';
      if (!pvpCheckbox.checked) pvpRank = '';
    });
    pvpDropdown.addEventListener('change', () => {
      pvpRank = pvpDropdown.value;
    });
    pvpDropdown.style.display = 'none';
  }

  const tcheckbox = document.getElementById('totalcheck');
  const tdropdown = document.getElementById('total-rank');
  if (tcheckbox && tdropdown) {
    let totalAssaultRank = tdropdown.value;
    tcheckbox.addEventListener('change', () => {
      tdropdown.style.display = tcheckbox.checked ? 'block' : 'none';
      if (!tcheckbox.checked) totalAssaultRank = '';
    });
    tdropdown.addEventListener('change', () => { totalAssaultRank = tdropdown.value; });
    tdropdown.style.display = 'none';
  }

  const gcheckbox = document.getElementById('grand');
  const gtickets = document.getElementById('ticketsdiv');
  const gticketsbox = document.getElementById('tickets');
  if (gcheckbox && gtickets && gticketsbox) {
    let GATickets = false;
    gcheckbox.addEventListener('change', () => {
      gtickets.style.display = gcheckbox.checked ? 'block' : 'none';
      if (!gcheckbox.checked) GATickets = false;
    });
    gticketsbox.addEventListener('change', () => { GATickets = gticketsbox.checked; });
    gtickets.style.display = 'none';
  }

  const currentPyroxenesInput = document.getElementById('current-pyroxenes');
  if (currentPyroxenesInput) {
    currentPyroxenesInput.addEventListener('input', () => {
      let value = parseInt(currentPyroxenesInput.value, 10);
      if (value < 0 || isNaN(value)) currentPyroxenesInput.value = 0;
      if (value > 1000000) currentPyroxenesInput.value = 1000000;
    });
  }
}
