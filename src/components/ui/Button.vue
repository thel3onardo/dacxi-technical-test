<script setup lang="ts">
const variants = {
  primary: 'bg-gradient-to-b from-[#8E50DE] to-[#421183] ring-[#9E66E7] text-[#D9D9D9]',
  default: 'bg-gradient-to-b from-[#171718] to-[#0F0F12] ring-[#292929]'
}

const roundOptions = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full'
}

type Variant = keyof typeof variants
type RoundOption = keyof typeof roundOptions

type Props = {
  variant: Variant
  rounded: RoundOption
  icon?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  rounded: 'lg'
})
</script>

<template>
  <!-- TODO: iprove this simple logic -->
  <button
    :class="`py-2 px-5 rounded-lg font-medium text-light ${variants[variant]} ${roundOptions[rounded]}`"
  >
    <slot />
  </button>
</template>
