<script setup>

</script>

<template>
  <div class="absolute z-20 top-0">
    <!-- <LoadingAnimation /> -->
  </div>
  <!-- <div class="relative z-10 mb-10"> -->
    <!-- <NavBar /> -->
  <!-- </div> -->

  <div class="relative min-h-screen md:mt-44 sm:mt-24 pb-footer">
    <slot />
  </div>

  <div class="relative -mt-footer">
    <!-- <FootBar /> -->
  </div>
</template>
