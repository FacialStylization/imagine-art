<template>
  <div class="min-h-[1024px] bg-gradient-to-b from-[#E6F7F5] to-white font-['Microsoft YaHei']">
    <Navbar />
    <div class="max-w-[1440px] mx-auto px-8 py-4">
      <div class="mb-4 flex justify-between items-center">
        <div class="bg-white rounded-full p-1 inline-flex">
          <div class="flex">
            <button
              class="px-10 py-2 rounded-full flex items-center gap-2 transition-all"
              :style="activeTab === 'image' ? 
                'background-color: #0ea5e9; color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);' : 
                'color: #4b5563;'"
              @click="activeTab = 'image'"
            >
              <font-awesome-icon :icon="['fas', 'image']" />
              <span>图像创作</span>
            </button>
            
            <button
              class="px-10 py-2 rounded-full flex items-center gap-2 transition-all"
              :style="activeTab === 'video' ? 
                'background-color: #0ea5e9; color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);' : 
                'color: #4b5563;'"
              @click="activeTab = 'video'"
            >
              <font-awesome-icon :icon="['fas', 'video']" />
              <span>视频创作</span>
            </button>
          </div>
        </div>
        <div class="flex gap-2">
          <button class="text-gray-500 p-2 rounded-xl hover:bg-white/50 transition-all !rounded-button whitespace-nowrap">
            <font-awesome-icon :icon="['fas', 'gear']" class="text-xl" />
          </button>
          <button class="text-gray-500 p-2 rounded-xl hover:bg-white/50 transition-all !rounded-button whitespace-nowrap">
            <font-awesome-icon :icon="['fas', 'question-circle']" class="text-xl" />
          </button>
        </div>
      </div>
      <div class="flex gap-6">
        <div class="w-[400px]">
          <div class="content-area p-6 mb-6">
            <h2 class="text-xl font-bold mb-4">手绘创作</h2>
            <div class="bg-gray-50 rounded-xl h-[340px] flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all group relative " @click="triggerFileInput">
              <input
                  ref="fileInput"
                  type="file"
                  class="hidden"
                  accept="image/*" 
                  @change="handleFileChange"
                >
              <div class="text-center" v-if="!previewUrl">
                <font-awesome-icon :icon="['fas', 'upload']" class="text-4xl text-gray-400 mb-4 group-hover:text-primary transition-all" />
                <p class="text-gray-500 group-hover:text-primary transition-all">点击上传你的手绘作品</p>
                <p class="text-xs text-gray-400 mt-2">支持 JPG、PNG、SVG 格式</p>
              </div>
              <img 
                v-if="previewUrl" 
                :src="previewUrl" 
                class="absolute inset-0 w-full h-full object-cover rounded-xl object-center"
                @click.stop="triggerFileInput"
              >
            </div>
          </div>
          <div class="content-area pl-6 pr-6 pt-6 pb-6">
            <h2 class="text-xl font-bold mb-4">风格参考</h2>
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-gray-50 rounded-xl h-[200px] flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all group relative"  @click="triggerStyleFileInput">
                  <input
                    ref="styleFileInput"
                    type="file"
                    class="hidden"
                    accept="image/*"
                    @change="handleStyleFileChange"
                  >
                <div class="text-center" v-if="!stylePreviewUrl">
                  <font-awesome-icon :icon="['fas', 'upload']" class="text-4xl text-gray-400 mb-4 group-hover:text-primary transition-all" />
                  <p class="text-gray-500 group-hover:text-primary transition-all">上传风格图片</p>
                  <p class="text-xs text-gray-400 mt-2">推荐尺寸 1024×1024</p>
                </div>
                <img 
                  v-if="stylePreviewUrl" 
                  :src="stylePreviewUrl" 
                  class="absolute inset-0 w-full h-full object-cover rounded-xl object-center"
                  @click.stop="triggerStyleFileInput"
                >
              </div>
              <div class="bg-gray-50 rounded-xl h-[200px] flex flex-col">
                <h3 class="text-lg font-medium mb-2">系统风格</h3>
                <div class="flex-1  overflow-hidden">
                  <div class="cursor-pointer hover:opacity-80 w-full h-full">
                    <img
                      :src="styles[2].url"
                      :alt="styles[0].alt"
                      class="rounded-lg object-cover w-full h-full"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 content-area p-6">
          <h2 class="text-xl font-bold mb-4">AI 创作结果</h2>
          <div class="bg-gray-50 rounded-xl h-[600px] flex items-center justify-center">
            <img
              v-if="aiResult"
              :src="aiResult"
              alt="AI创作结果"
              class="max-h-full rounded-xl"
            >
            <p v-else class="text-gray-400">生成的艺术作品将显示在这里</p>
          </div>
          <div class="mt-4 flex justify-end gap-4">
            <button class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-all shadow-sm hover:shadow !rounded-button whitespace-nowrap">
              <font-awesome-icon :icon="['fas', 'download']" />
              <span>下载作品</span>
            </button>
            <button class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg !rounded-button whitespace-nowrap">
              <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" />
              <span>开始创作</span>
            </button>
          </div>
        </div>
        <div class="w-[300px] max-h-[750px]">
          <div class="content-area p-6">
            <h2 class="text-xl font-bold mb-4">创作历史</h2>
            <div class="space-y-4 overflow-y-auto max-h-[700px] scrollbar">
              <div v-for="(history, index) in historyList" :key="index" class="bg-gray-50 rounded-xl p-4">
                <img
                  :src="history.imageUrl"
                  :alt="`历史记录${index + 1}`"
                  class="w-full h-[150px] object-cover rounded-lg mb-2"
                >
                <p class="text-sm text-gray-600">{{ history.date }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Navbar from '~/components/layout/Navbar.vue';

const activeTab = ref('image');

const styles = ref([
  {
    url: '/images/examples/example1.png',
    alt: '风格1'
  },
  {
    url: '/images/examples/example2.png',
    alt: '风格2'
  },
  {
    url: '/images/examples/example3.png',
    alt: '风格3'
  }
]);

const aiResult = ref('/images/examples/example4.png');

const historyList = ref([
  {
    imageUrl: '/images/examples/example5.png',
    date: '2024-01-20 10:30'
  },
  {
    imageUrl: '/images/examples/example6.png',
    date: '2024-01-19 15:45'
  },
  {
    imageUrl: '/images/examples/example7.png',
    date: '2024-01-18 09:15'
  }
]);
//上传手绘
const fileInput = ref<HTMLInputElement | null>(null);
//存储原始文件对象
const previewFile = ref<File | null>(null); 
// 预览图片的URL
const previewUrl = ref<string | null>(null); 

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click();
};

// 处理文件选择
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    // 验证是否为图片
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    previewFile.value = file
    // 生成预览URL
    previewUrl.value = URL.createObjectURL(file);
    // console.log(previewFile.value)
    // 这里可以添加实际的上传逻辑
    // uploadToServer(file);
  }

  // 清空input值，允许重复选择同一文件
  target.value = '';
};
//上传风格图片
const styleFileInput = ref<HTMLInputElement | null>(null);
const stylePreviewFile = ref<File | null>(null);
const stylePreviewUrl = ref<string | null>(null);

// 触发风格图片文件选择
const triggerStyleFileInput = () => {
  styleFileInput.value?.click();
};

// 处理风格图片文件选择
const handleStyleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    stylePreviewFile.value = file;
    stylePreviewUrl.value = URL.createObjectURL(file);
    // 这里可以添加实际上传逻辑
    
  }
  
  target.value = '';
};
</script>

<style scoped>
.content-area {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.content-area:hover {
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

:deep(.fas) {
  transition: all 0.3s ease;
}

button:hover :deep(.fas) {
  transform: scale(1.1);
}

/* 添加按钮悬停效果 */
button:not([style*="background-color"]):hover {
  background-color: #f3f4f6;
}
</style>
