<template>
  <section>
    <div class="bg-pattern bg-orange-500">
      <div class="pt-48 container mx-auto flex items-end justify-center">
        <img class="h-48" src="/sidebar/hippies.svg" alt="" />
      </div>
    </div>
    <div class="bg-blue-600">
      <div class="py-2 container mx-auto flex items-center justify-center">
        <p class="text-4xl text-white font-bold text-center" v-text="$t('index')"></p>
      </div>
    </div>

    <div class="mt-4 p-4 bg-gray-200 mb-4 rounded container max-w-4xl mx-auto">
      <nuxt-link class="py-2 px-4 bg-gray-500 text-white rounded" active-class="active" exact :to="switchLocalePath('en')">English</nuxt-link>
      <nuxt-link class="py-2 px-4 bg-gray-500 text-white rounded" active-class="active" :to="switchLocalePath('ru')">Русский</nuxt-link>
      <nuxt-link class="py-2 px-4 bg-gray-500 text-white rounded" active-class="active" :to="switchLocalePath('de')">Deutsh</nuxt-link>
    </div>

    <div class="container max-w-4xl mx-auto">
      <div class="my-4">
        <h1 v-if="page.title">{{ page.title }}</h1>
        <h2 v-if="page.description">{{ page.description }}</h2>
      </div>

      <h3 class="font-bold mb-2">Table of Contents </h3>
      <scrollactive active-class="scrollactive" :modifyUrl="false" :offset="45" :duration="800" bezier-easing-value=".5,0,.35,1" tag="ul">
        <li v-for="link of page.toc" :key="link.id">
          <a
            class="scrollactive-item"
            :class="{ 'bg-indigo-500': link.depth === 2, 'bg-green-600': link.depth === 3 }"
            :href="`#${link.id}`
          ">{{ link.text }}</a>
        </li>
      </scrollactive>
    </div>

    <div class="mt-10 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
      <NuxtContent :document="page"/>
    </div>

    <section class="w-full md:w-2/3 flex flex-col items-center px-3">
      LASTPOST
      <ArticleList :articles="paginatedArticles" :total="allArticles.length" />
    </section>
  </section>
</template>

<script>
import getContent from '@/utils/getContent';
import ArticleList from '@/components/ArticleList';

export default {
  name: 'HomePage',
  components: {
    ArticleList,
  },
  async asyncData({ $content, app, params, error }) {
    const slug = params.slug || "index";
    const page = await $content(`${app.i18n.locale}`, slug)
    .fetch()
    if (!page) {
      return error({ statusCode: 404, message: '404! Page not found' })
    }

    const content = await getContent($content, app, params, error);

    return {
      page,

      allArticles: content.allArticles,
      paginatedArticles: content.paginatedArticles,
    };
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('ru', options)
    }
  },
  head () {
    return {
      title: this.page.title,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.page.title },
        { hid: 'og:description', property: 'og:description', content: this.page.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.page.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.page.description }
      ]
    }
  }
};
</script>

<style>
  .scrollactive {
    @apply bg-red-400;
  }

  .nuxt-content h1 {
    @apply font-bold;
  }
  .icon.icon-link {
    background-image: url('~svg/icon-hashtag.svg');
    display: inline-block;
    width: 20px;
    height: 20px;
    background-size: 20px 20px;
  }
  .active {
    @apply bg-[#00c58e] border-none text-white;
  }

  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f6f6f6' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E");
  }
</style>
