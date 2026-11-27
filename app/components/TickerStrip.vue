<script setup lang="ts">
import { cmsList } from '~/utils/cms'

const fallbackItems = [
  'Arena di Verona',
  'Cultural Center of the Philippines',
  'NSCR Malolos–Clark',
  'Our Habitas AlUla',
  'Benetton Group',
  'JW Marriott Jeju',
  'CCLEX Phase 2',
  'Bellaroca Island Resort',
]

const props = defineProps<{
  items?: string[]
}>()

const list = computed(() => cmsList(props.items, fallbackItems))
</script>

<template>
  <div class="marquee overflow-hidden border-b border-ink/10 bg-gallery py-4">
    <div class="marquee-track items-center">
      <div v-for="copy in 2" :key="copy" class="flex items-center">
        <div v-for="item in list" :key="copy + item" class="flex items-center gap-8 px-7">
          <span class="label whitespace-nowrap text-mineral">{{ item }}</span>
          <span class="h-1 w-1 shrink-0 rounded-full bg-bronze" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  </div>
</template>
