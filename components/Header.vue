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

    <div class="flex justify-center items-center">
      <NuxtLink class="flex items-center p-4 hover:text-indigo-500" active-class="nav-active" :to="localePath('/')" exact>Home</NuxtLink>
      <NuxtLink class="flex items-center p-4 hover:text-indigo-500" active-class="nav-active" :to="localePath('/about')">About</NuxtLink>
      <NuxtLink class="flex items-center p-4 hover:text-indigo-500" active-class="nav-active" :to="localePath('/post')">Contenful</NuxtLink>
      <NuxtLink class="flex items-center p-4 hover:text-indigo-500" active-class="nav-active" :to="localePath('/articles')">Articles</NuxtLink>
    </div>

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
const data = () => ({
  title: 'Nuxt-i18n Blog',
})

const computed = {
  isContentPage() {
    return this.$route.name.includes('slug')
  },
}

import { mixin as clickaway } from 'vue-clickaway'
export default {
  name: 'Header',
  data,
  computed,
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
