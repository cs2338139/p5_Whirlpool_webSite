<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import * as PIXI from 'pixi.js';
// import p5 from 'p5'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, EaselPlugin);
</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
