<script setup>
import { onMounted } from 'vue'
import { navbuttons, menuDropdown } from '@/scripts/nav.js'

onMounted(() => {
  navbuttons()
  menuDropdown()
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="arona-img" src="@/assets/arona.png" />
    <h6>"These mystical gems can be purchased with Sensei's credit card. Trade them for various products."</h6>
    <div className="bg-white-500">
      <ul class="nav-links">
        <li>
          <a>
            <button id="about-nav" style="background-color: transparent; border-width: 0; font-size: 2vh; color: white;">About</button>
          </a>
        </li>
        <li>
          <a>
            <button id="contact-nav" style="background-color: transparent; border-width: 0; font-size: 2vh; color: white;">Contact</button>
          </a>
        </li>
      </ul>
      <i class="fa-solid fa-list" id="menu-icon"></i>
      <div class="dropdown-menu" id="dropdown-menu">
        <button id="about-btn">About</button>
        <button id="contact-btn">Contact</button>
      </div>
    </div>
  </header>

  <div class="popup" id="about-popup">
    <div class="about-popup-content">
      <span class="close-btn" id="close-about">&times;</span>
      <h2>About</h2>
      <div class="about-section">
        <h3>What is Pyroxene Calculator?</h3>
        <p>Pyroxene Calculator is a free to use tool to help players gauge and estimate their Pyroxene earnings for future banners in Nexon's Epic Anime RPG mobile game, Blue Archive.</p>
        <h3>How does it work?</h3>
        <p>Simply select the upcoming banner, check off the sources of Pyroxenes you plan to earn, and the calculator will estimate your total Pyroxene earnings up until the banner.</p>
        <h3>What are Pyroxenes?</h3>
        <p>Pyroxenes are the premium currency in Blue Archive, primarily used to obtain students during their banners.</p>
      </div>

      <div class="about-section">
        <h2>Data Sources & Attribution</h2>
        <p>Content and banner information on this site is sourced from the <a href="https://bluearchive.wiki/wiki/Main_Page" target="_blank" style="color: aqua">Blue Archive Wiki</a></p>
      </div>
    </div>
  </div>

  <div class="popup" id="contact-popup">
    <div class="contact-popup-content">
      <span class="close-btn" id="close-contact">&times;</span>
      <h2>Contact</h2>
      <p>Questions or Issues?</p>
      <p>Contact at BET.AD.inquiry@gmail.com</p>
      <p>More features and updates coming soon!</p>
      <h2>Privacy</h2>
      <p>This website does not collect or store any personal data, and is hosted by Cloudflare.</p>
    </div>
  </div>
</template>

<!-- styles are now provided by Tailwind; component-specific CSS removed -->
