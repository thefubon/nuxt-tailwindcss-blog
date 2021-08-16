<template>
  <div class="bg-blue-500 text-white p-4">
    <p><slot name="info-box">default</slot></p>
    <div class="grid grid-cols-3 gap-4"><slot name="info-slide">Slide1</slot></div>
  </div>
</template>
