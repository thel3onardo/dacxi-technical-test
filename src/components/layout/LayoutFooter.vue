<template>
  <footer class="w-full flex justify-center py-9 relative">
    <div class="absolute top-0 z-10">
      <img src="/footer-glow.png" />
    </div>
    <Transition name="footer" appear>
      <div class="px-6 py-3 bg-[#D9D9D9]/5 rounded-3xl font-dm-sans relative z-20 backdrop-blur-xl">
        <p class="text-light font-medium text-sm">
          built with love by
          <a
            href="https://github.com/thel3onardo/"
            target="_blank"
            class="font-semibold text-primary hover:underline"
            >thel3onardo</a
          >
        </p>
      </div>
    </Transition>
  </footer>
</template>

<style scoped>
.footer-enter-active,
.footer-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.footer-enter-from,
.footer-leave-to {
  transform: translateY(40px);
  opacity: 0;
}
</style>
