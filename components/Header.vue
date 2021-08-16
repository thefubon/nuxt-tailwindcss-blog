<template>
  <nav class="flex fixed w-full items-center justify-between px-6 h-16 bg-white text-gray-700 border-b border-gray-200 z-10">

    <div class="flex items-center">
      <button class="mr-2 focus:outline-none" aria-label="Open Menu" @click="drawer">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-8 h-8"
        >
          <path d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <LangSwitcher v-if="availableLocales.length" class="inline-flex">
      <template #trigger="{ open, toggle }">
        <button
          class="rounded-md hover:text-primary-500 focus:outline-none"
          :class="{ 'text-primary-500': open }"
          @touchstart.stop.prevent="toggle"
        >
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clip-rule="evenodd"></path></svg>
        </button>
      </template>

      <ul class="py-2">
        <li v-for="locale in availableLocales" :key="locale.code">
          <NuxtLink
            v-if="$i18n.locale !== locale.code"
            :to="switchLocalePath(locale.code)"
            class="flex px-4 items-center hover:text-primary-500 leading-7 whitespace-no-wrap"
            active-class="active"
          >{{ locale.name }}</NuxtLink>
        </li>
      </ul>
    </LangSwitcher>

    <div class="relative">
      <button class="focus:outline-none bg-indigo-500 text-white py-2 px-4 rounded" v-on-clickaway="away" @click="drop">Dropdown</button>
      <transition
        enter-class="opacity-0"
        enter-active-class="ease-out transition-medium duration-300"
        enter-to-class="opacity-100"
        leave-class="opacity-100"
        leave-active-class="ease-out transition-medium duration-300"
        leave-to-class="opacity-0"
      >
        <div v-show="isDrop" class="absolute top-12 inset-x-0 transition-opacity">
          <ul class="transition-opacity flex flex-col bg-white rounded shadow-lg overflow-hidden">
            <li><NuxtLink class="flex items-center p-4 hover:text-indigo-500" active-class="nav-active" :to="localePath('/')" exact>Home</NuxtLink></li>
            <li><NuxtLink class="flex items-center p-4 hover:text-indigo-500" active-class="nav-active" :to="localePath('/about')">About</NuxtLink></li>
          </ul>
        </div>
      </transition>
    </div>


    <transition
      enter-class="opacity-0"
      enter-active-class="ease-out transition-medium"
      enter-to-class="opacity-100"
      leave-class="opacity-100"
      leave-active-class="ease-out transition-medium"
      leave-to-class="opacity-0"
    >
      <div
        @keydown.esc="isOpen = false"
        v-show="isOpen"
        class="z-10 fixed inset-0 transition-opacity"
      >
        <div
          @click="isOpen = false"
          class="absolute inset-0 bg-black opacity-50"
          tabindex="0"
        ></div>
      </div>
    </transition>



    <aside class="transform top-0 left-0 w-64 bg-white fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <span
        @click="isOpen = false"
        class="flex w-full items-center p-4 border-b"
      >
        <img src="/logos/fox-hub.png" alt="Logo" class="h-auto w-32 mx-auto" />
      </span>

      <ul @click="isOpen = false">
        <li><NuxtLink class="flex items-center p-4 hover:text-red-500" active-class="active" :to="localePath('/')" exact>Home</NuxtLink></li>
        <li><NuxtLink class="flex items-center p-4 hover:text-red-500" active-class="active" :to="localePath('/about')">About</NuxtLink></li>
      </ul>

    </aside>
  </nav>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
export default {
  mixins: [ clickaway ],
  data() {
    return {
      isOpen: false,
      isDrop: false
    };
  },
  // Opne/Clode Sidebar
  methods: {
    drawer() {
      this.isOpen = !this.isOpen;
    },
    drop() {
      this.isDrop = !this.isDrop;
    },
    away () {
      this.isDrop = false;
    }
  },
  // No Scroll Page
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        if (process.client) {
          if (isOpen) document.body.style.setProperty("overflow", "hidden");
          else document.body.style.removeProperty("overflow");
        }
      }
    }
  },
  // ESC Button
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.keyCode == 27 && this.isOpen) this.isOpen = false;
    });
  },
  computed: {
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    }
  }
};
</script>

<style scoped>
  .active {
    @apply bg-red-500 text-white;
  }
  .nav-active {
    @apply bg-indigo-500 text-white;
  }
</style>
