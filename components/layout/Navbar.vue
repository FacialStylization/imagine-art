<template>
  <header class="w-full bg-transparent z-50">
    <div class="max-w-[1440px] mx-auto px-8 flex justify-between items-center">
      <NuxtLink to="/" class="font-['Pacifico'] text-4xl text-primary hover:opacity-80 transition-all">
        <img src="/images/logo.png" alt="Logo" class="w-16 h-16 mr-2 inline-block" />
      </NuxtLink>
      
      <nav class="flex gap-8">
        <NuxtLink to="/" class="text-gray-600 hover:text-primary transition-all">首页</NuxtLink>
        <NuxtLink to="/generate" class="text-gray-600 hover:text-primary transition-all">生成页</NuxtLink>
        <NuxtLink to="#" class="text-gray-600 hover:text-primary transition-all">设置</NuxtLink>
        <NuxtLink to="#" class="text-gray-600 hover:text-primary transition-all">帮助中心</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
// 不需要导入图片
</script>

<style scoped>
.router-link-active {
  color: var(--color-primary, #0ea5e9);
  font-weight: 500;
}
</style>
