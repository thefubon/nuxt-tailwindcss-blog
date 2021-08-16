---
title: Nuxt Content + TailwindCSS Typography
description: Description
---

### EN/Home

```js[content/en/index.md]
export default {
  nuxt: 'is the best'
}
```

## This is a heading

This is some more info

### This is a sub heading

This is some more info

### This is another sub heading

This is some more info

<div class="bg-blue-500 text-white p-4 mb-4">
  This is HTML inside markdown that has a class of note
</div>

<info-box>
  <template #info-box>
    Это компонент vue внутри markdown с использованием слотов
  </template>
  <template #info-slide>
    <div>text1</div>
	<div>text2</div>
	<div>text3</div>
  </template>
</info-box>

```js
export default {
  nuxt: 'is the best'
}
```
```html
<p>code styling is easy</p>
```

## my-first-blog-post

This is some more info

```js[my-first-blog-post.md]
export default {
  nuxt: 'is the best'
}
```
