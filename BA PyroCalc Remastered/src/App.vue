<script setup lang="ts">
import YuukaHero from './components/YuukaHero.vue'
import PyroCalc from './components/PyroCalc.vue'
import MomoTalk from './components/MomoTalk.vue'
</script>

<template>
  <main class = "page">
    <YuukaHero msg="Pyroxene Calculator"/>
    <!--<MomoTalk msg="Bruh moment"/>-->
    <MomoTalk msg="Bruh moment"/>
    <PyroCalc/>
  </main>
</template>
<style scoped>

.page{
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>