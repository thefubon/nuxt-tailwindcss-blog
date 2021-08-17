<template>
  <div class="pt-[80px]">
    <h1>Author: {{ article[0].author.name }}</h1>
    <p>Bio: {{ article[0].author.bio }}</p>
    <h3>Here are a list of articles by {{ article[0].author.name }}:</h3>
    <ul>
      <li v-for="article in articles" :key="article.slug">
        <NuxtLink :to="localePath({ name: 'articles-slug', params: { slug: article.slug } })">
          <img :src="article.img" :alt="article.alt" />
          <div>
            <h2>{{ article.title }}</h2>
            <p>{{ article.description }}</p>
            <p>{{ formatDate(article.updatedAt) }}</p>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'ArticleList',
  props: {
    articles: {
      type: Array,
      default: Array,
    },
  },
  async asyncData({ $content, app, params }) {
      const source = `${app.i18n.locale}/articles`;
      const article = await $content(source, params.slug)
        .where({
          'author.name': {
            $regex: [params.author, 'i']
          }
        })
        .without('body')
        .sortBy('createdAt', 'asc')
        .fetch()

      return {
        article
      }
    },
    methods: {
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString('ru', options)
      }
    }
};
</script>

