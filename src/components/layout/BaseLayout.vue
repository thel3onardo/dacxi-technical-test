<script lang="ts" setup>
import LayoutFooter from '@/components/layout/LayoutFooter.vue'
import LayoutHeader from '@/components/layout/LayoutHeader.vue'
</script>

<template>
  <div class="w-full h-full min-h-screen bg-surface flex flex-col overflow-hidden">
    <!-- glow -->
    <div class="absolute left-0 top-0 z-10">
      <img src="/glow-top.png" alt="Glow effect" class="select-none" />
    </div>

    <LayoutHeader class="relative z-20" />

    <div class="grow w-full max-w-content mx-auto relative z-20 md:mt-16">
      <slot />
    </div>

    <LayoutFooter class="relative z-20" />

    <div class="absolute right-0 bottom-0 z-10 invisible md:visible">
      <img src="/glow-bottom.png" alt="Glow effect" class="select-none" />
    </div>
  </div>
</template>
