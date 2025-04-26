<template>
  <div
    class="min-h-[1024px] bg-gradient-to-b from-[#E6F7F5] to-white font-['Microsoft YaHei']"
  >
    <section
      class="pt-6 min-h-[600px] flex items-center relative bg-cover bg-center banner"
    >
      <div class="max-w-[1440px] mx-auto px-8 py-16 relative z-10">
        <div class="">
          <h1 class="text-5xl font-bold text-gray-800 mb-6">智绘创艺</h1>
          <p class="text-xl text-gray-600 mb-8" style="color:rgb(31, 41, 55)">
            使用先进的 AI
            技术，轻松创作独特的插画作品，让创意自由绽放。
          </p>
          <NuxtLink
            to="/generate"
            class="inline-flex items-center px-8 py-3 bg-primary text-gray-800 font-medium rounded-xl hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg border-2 border-blue-200"
            :style="{fontSize:'20px'}"
            >
            开始创作
            <font-awesome-icon :icon="['fas', 'arrow-right']" class="ml-2" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-8">精选案例</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6" >
          <div class="rounded-lg overflow-hidden transition-all curb" v-for="(item,index) in 21">
            <div class="w-full h-[300px] card-inner">
              <img :src="`/images/results/result${index+1}.png`" alt="案例1" class="w-full h-[300px] object-cover imgrotate card-face">
              <div class="w-full h-[300px] textrotate card-face">
                <p>{{ textList[index]?.title }}</p>
                <span>{{ textList[index]?.content }}</span> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const textList = [
  {
    title:'《彩虹孔雀》',
    content:'《彩虹孔雀》是一幅充满童趣和色彩的艺术作品，描绘了一只美丽的孔雀。画中的孔雀羽毛色彩斑斓，主要以橙色、黄色和绿色为主，尾羽上点缀着圆形的图案，仿佛是彩虹的颜色在舞动。背景采用了紫色调，与孔雀的鲜艳色彩形成了鲜明的对比，使得孔雀更加突出和生动。'
  },
  {
    title:'《小小霸王龙》',
    content:'《小小霸王龙》是一幅充满活力和色彩的艺术作品，描绘了一只卡通风格的霸王龙。这只恐龙被赋予了非常鲜艳的颜色，身体主要是蓝色和黄色的条纹，背部有一排绿色的尖刺，头部则有紫色和粉色的斑块，整体看起来既可爱又生动。。'
  },
  {
    title:'《我爱我家》',
    content:'《我爱我家》是一幅充满温暖和爱的艺术作品，描绘了一家四口的幸福时刻。画面中有四位家庭成员：一位戴眼镜的爷爷、一位金发妈妈、一个戴着黄色花朵的小男孩和一个头戴蓝色帽子的小女孩。每个人物都面带微笑，眼神中透露出快乐和满足，营造出一种和谐的家庭氛围。'
  }
]
</script>

<style scoped>
.hero-section {
  background-image: url('/images/hero-bg.jpg');
  background-size: cover;
  background-position: center;
}
.banner::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1)),
    url('@/public/images/background.jpg');
  background-size: cover;
  background-position: center;
}
.curb {
  width: 100%;
  height: 300px;
  position: relative;
  overflow: hidden;
}

.card-inner {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.curb:hover .card-inner {
  transform: rotateY(180deg);
}

.imgrotate {
  transform: rotateY(0deg);
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
}

.textrotate {
  transform: rotateY(180deg);
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  top: 0;
  left: 0;
  background-color:rgb(243, 244, 246);
  padding:15px 20px;
}
.textrotate p{
  text-align:center;
  font-weight:700;
  font-size: 25px;
}
.textrotate span{
  display:block;
  text-indent:2em;
  font-size: 18px;
}

</style>
