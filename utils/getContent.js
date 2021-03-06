export default async ($content, app, params, error) => {
  const currentPage = parseInt(params.page);

  const perPage = 5;

  const allArticles = await $content(`${app.i18n.locale}/articles`).fetch();

  const totalArticles = allArticles.length;

  // use Math.ceil to round up to the nearest whole number
  const lastPage = Math.ceil(totalArticles / perPage);

  // use the % (modulus) operator to get a whole remainder
  const lastPageCount = totalArticles % perPage;

  const skipNumber = () => {
    if (currentPage === 1) {
      return 0;
    }
    if (currentPage === lastPage) {
      return totalArticles - lastPageCount;
    }
    return (currentPage - 1) * perPage;
  };

  const paginatedArticles = await $content(`${app.i18n.locale}/articles`)
    .only(['title', 'description', 'image', 'slug', 'published', 'author'])
    .sortBy('published', 'desc')
    .limit(perPage)
    .skip(skipNumber())
    .fetch();

  if (currentPage === 0 || !paginatedArticles.length) {
    return error({ statusCode: 404, message: 'No articles found!' });
  }

  return {
    allArticles,
    paginatedArticles,
  };
};
