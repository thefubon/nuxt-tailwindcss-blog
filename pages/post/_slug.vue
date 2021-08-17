<template>
  <section class="container mx-auto pt-[80px]">
    <div class="container">
      <div class="columns">
        <div class="column is-offset-2 is-8">
          <p class="subtitle is-6">
            <NuxtLink to="/post">Back to Posts</NuxtLink>
          </p>
          <h1 class="title is-2">
            {{ post.fields.title }}
          </h1>

          <hr>
          <div class="content" v-html="$md.render(post.fields.content)"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import client from '~/plugins/contentful';
export default {
  asyncData({ params, error, payload }) {
    if (payload) return { post: payload };

    return client
      .getEntries({
        content_type: 'post',
        'fields.slug': params.slug,
      })
      .then(entries => {
        return { post: entries.items[0] };
      })
      .catch(err => {
        error({ statusCode: 404, message: "Page not found" });
      });

  },
  head() {
    return {
      title: this.post.fields.title,
    };
  },
};
</script>
