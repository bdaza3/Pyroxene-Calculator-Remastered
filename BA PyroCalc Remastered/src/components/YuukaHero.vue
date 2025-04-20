<script setup lang="ts">
defineProps<{
  msg: string
}>()

import {onMounted} from 'vue'
import {navbuttons, menuDropdown} from '@/assets/script.js'

onMounted(() => {
  navbuttons();
  menuDropdown();
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="arona-img" src="@/assets/arona.png"/>
    <h6>"These mystical gems can be purchased with Sensei's credit card. Trade them for various products."</h6>
    <div class = "nav-bar">
      <ul class ="nav-links">
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
  <div class ="popup" id = "about-popup">
  <div class = "about-popup-content">
    <span class="close-btn" id="close-about">&times;</span>
    <h2>About</h2>
    <div class = "about-section">
      <h3>What is Pyroxene Calculator?</h3>
      <p>Pyroxene Calculator is a free to use tool to help players
        gauge and estimate their Pyroxene earnings for future banners in Nexon's Epic Anime RPG mobile game, Blue Archive.</p>
      <h3>How does it work?</h3>
      <p>Simply select the upcoming banner, check off the sources of Pyroxenes you plan to earn, and the calculator will
        estimate your total Pyroxene earnings up until the banner. </p>
      <h3>What are Pyroxenes?</h3>
      <p>Pyroxenes are the premium currency in Blue Archive, primarily used to obtain students during their banners.</p>
    </div>

    <div class = "about-section">
      <h2>Data Sources & Attribution</h2>
      <p>Content and banner information on this site is sourced from the 
        <a href="https://bluearchive.wiki/wiki/Main_Page" target="_blank" style="color: aqua">Blue Archive Wiki</a>
      </p>
    </div>
  </div>  
</div>

<div class = "popup" id = "contact-popup">
  <div class = "contact-popup-content">
    <span class="close-btn" id="close-contact">&times;</span>
    <h2>Contact</h2>
    <p>Questions or Issues?</p>
    <p>Contact at BET.AD.inquiry@gmail.com</p>
    <p>More features and updates coming soon!</p>
    <h2>Privacy</h2>
    <p>This website does not collect or store any personal data, and is hosted by Cloudflare.</p>
  </div>
</div>

  <div class="greetings">
    <img src = "@/assets/pyrocalclogo.png" class = "calculator-image">
    <h3 class="description">Easy to use tool to accurately estimate your Pyroxene earnings for upcoming banners!</h3>
  </div>

  <div class = "video">
  <video autoplay loop muted playsinline class="background-video">
      <source src="@/assets/yuuka-video.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style scoped>

.calculator-image{
  animation: fadeInTranslateUp 1.5s ease-in-out;
}

p,h2,h3{
  animation: fadeIn 3s ease-in-out;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3{
  font-size: 1.2rem;
  color: white;
  font-style: italic;
}

h6{
  font-size: 1.5vh;
  color: white;
  font-style: italic;
}

.logo{
  display: block;
  margin-left: 9rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
  color: white;
  font-style: italic;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
.background-video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 70%;
  object-fit: fill;
  z-index: -2; /* Ensure the video is behind the text */
}
/* Add a gradient overlay to make the bottom half transparent */
.video::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1));
  z-index: -1; /* Ensure the gradient is above the video but below the text */
}


}

@keyframes fadeInTranslateUp {
  0% {
    opacity: 0; /* Fully transparent */
    transform: translateY(20px); /* Start 20px below */
  }
  100% {
    opacity: 1; /* Fully visible */
    transform: translateY(0); /* End at original position */
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0; /* Fully transparent */
  }
  100% {
    opacity: 1; /* Fully visible */
  } 
}

@media (max-width: 1024px) { /* smaller screens aka iphone*/
.calculator-image {
  animation: fadeInTranslateUp 1.5s ease-in-out;
  width: 100%;
  height: auto;
  max-width: 100%;
  margin-left: 0;
}
p, h2, h3{
  animation: fadeIn 3s ease-in-out;
  font-size: 1.5vh;
  color: white;
  font-style: italic;
}
h6{
  font-size: 0.9vh;
  color: white;
  font-style: italic;
}
.background-video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
  object-fit: fill;
  z-index: -2; /* Ensure the video is behind the text */
}
/* Add a gradient overlay to make the bottom half transparent */
.video::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 1));
  z-index: -1; /* Ensure the gradient is above the video but below the text */
}
}
</style>
