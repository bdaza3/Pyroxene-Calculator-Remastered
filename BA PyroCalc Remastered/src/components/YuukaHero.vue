<template>
  <div class="greetings">
    <img src="@/assets/pyrocalclogo.png" class="calculator-image" />
    <h3 class="description">Easy to use tool to accurately estimate your Pyroxene earnings for upcoming banners!</h3>
  </div>

  <div class="video">
    <video autoplay loop muted playsinline class="background-video">
      <source src="@/assets/yuuka-video.mp4" type="video/mp4" />
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
