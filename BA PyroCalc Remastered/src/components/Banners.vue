<template>
  <!-- Popup for upcoming banners -->
  <div id="popup" class="popup">
    <div class="popup-content">
      <span class="close-btn" id="close-popup">&times;</span>
      <h2>Upcoming Banners</h2>
      <h3>Select a banner to estimate your Pyroxene earnings for.</h3>
      <div class="popup-scrollable"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { getBanners } from '@/scripts/banners.js'

onMounted(async () => {
  const popup = document.getElementById('popup');
  const openPopupBtn = document.getElementById('upcoming-banner-btn');
  const closePopupBtn = document.getElementById('close-popup');
  const popupScrollable = document.querySelector('.popup-scrollable');

  if (openPopupBtn && popup) {
    openPopupBtn.addEventListener('click', () => popup.classList.add('active'));
  }
  if (closePopupBtn && popup) closePopupBtn.addEventListener('click', () => popup.classList.remove('active'));
  window.addEventListener('click', (event) => { if (event.target === popup) popup.classList.remove('active'); });

  const banners = await getBanners();
  if (!popupScrollable) return;
  banners.forEach((banner) => {
    //create banner box with image, character name, and period, and add click event to select banner and close popup
    const box = document.createElement('div');
    box.classList.add('selectable-box');
    if (banner.isLimited) box.style.backgroundColor = '#ff9245';
    box.innerHTML = `
      <img src="${banner.image}" alt="${banner.character}">
      <span><strong>${banner.character}</strong></span>
      <span>${banner.period}</span>
    `;
    box.addEventListener('click', () => {
      popup.classList.remove('active');
      const openBtn = document.getElementById('upcoming-banner-btn');
      if (openBtn) openBtn.style.backgroundColor = banner.isLimited ? '#ff9245' : '#8acaff';
      const daysHeader = document.getElementById('days-header');
      if (daysHeader) {
        daysHeader.style.display = 'block';
        daysHeader.textContent = `${banner.numDays} ${banner.numDays === 1 ? 'Day' : 'Days'} until selected banner starts on ${new Date(banner.startDate).toLocaleDateString()}.`;
      }
      const openPopupBtn = document.getElementById('upcoming-banner-btn');
      if (openPopupBtn) openPopupBtn.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center;">
          <img src="${banner.image}" alt="Selected Banner" style="height: 20px; margin-right: 8px;">
          <span>${banner.character}</span>
        </div>
      `;
      const calculateBtn = document.getElementById('calculate-btn');
      if (calculateBtn) { calculateBtn.disabled = false; calculateBtn.classList.add('yellow-glow'); }
      // store selectedDays/startDate on window for access by calculations handler
      window.__selectedDays = banner.numDays;
      window.__selectedStartDate = banner.startDate;
    });
    popupScrollable.appendChild(box);
  });
});
</script>