<template>
  <div class="min-h-[1024px] bg-gradient-to-b from-[#E6F7F5] to-white font-['Microsoft YaHei']">
    <Navbar />
    <div class="max-w-[1440px] mx-auto px-8">
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
        <div class="w-[330px]">
          <div class="content-area p-4 mb-4">
            <h2 class="text-xl font-bold mb-2">手绘创作</h2>
            <div class="bg-gray-50 rounded-xl h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all group relative " @click="triggerFileInput">
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
          <div class="content-area p-4 relative" >
            <!-- 导航栏 -->
            <div class="absolute left-[-130px] top-0 w-[120px] h-full  border-r border-gray-200 content-area">
              <div class="p-2">
                <h2 class="text-lg font-bold mb-2 mt-1 text-center">系统风格</h2>
                <div class="space-y-3">
                  <div 
                    v-for="(style, index) in styles" :key="index"
                    class="bg-gray-50 rounded-lg py-2  px-4 hover:bg-gray-100 transition-colors"
                  >
                  <img
                    :src="style.url"
                    :alt="style.alt"
                    class="rounded-lg w-[80px] h-[80px] object-cover"
                    style="cursor: pointer"
                    @click="selectStyle(style)"
                  >
                  </div>
                </div>
              </div>
            </div>
            <h2 class="text-xl font-bold mb-4">风格参考</h2>
            <div class="grid grid-cols-1 gap-4">
              <div class="bg-gray-50 rounded-xl h-[300px] flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all group relative"  @click="triggerStyleFileInput">
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
            </div>
          </div>
        </div>
        <div class="flex-1 content-area p-6">
          <h2 class="text-xl font-bold mb-4">AI 创作结果</h2>
          <div class="bg-gray-50 rounded-xl h-[600px] flex items-center justify-center border-2 border-dashed border-gray-300 relative" v-loading="isLoading">
            <img
              v-if="aiResult"
              :src="aiResult"
              alt="AI创作结果"
              class="max-h-full rounded-xl"
            >
            <div v-else class="text-center gentext">
              <font-awesome-icon :icon="['fas', 'image']" class="text-6xl text-gray-400 mb- group-hover:text-primary transition-all mb-2" />
               <p class="text-gray-400">生成的艺术作品将显示在这里</p>
            </div>
          </div>
          <div class="mt-4 flex justify-end gap-4">
            <button class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-all shadow-sm hover:shadow !rounded-button whitespace-nowrap">
              <font-awesome-icon :icon="['fas', 'download']" />
              <span>下载作品</span>
            </button>
            <button  @click="generateArtwork" class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg !rounded-button whitespace-nowrap">
              <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" />
              <span>开始创作</span>
            </button>
          </div>
        </div>
        <div class="w-[250px] max-h-[750px]">
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
import request from '~/api/generate';
import { vLoading } from '@/directives/loading'
import { set } from '~/node_modules/nuxt/dist/app/compat/capi';

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

// const aiResult = ref('/images/examples/example4.png');
const aiResult = ref<string | null>(null)

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

//系统风格图片
const selectStyle = async (style: { url: string, alt: string }) => {
  try {
    // 获取图片数据
    const response = await fetch(style.url);
    const blob = await response.blob();
    
    // 创建真实 File 对象
    stylePreviewFile.value = new File([blob], style.alt, {
      type: blob.type || 'image/*',
      lastModified: Date.now()
    });
    
    // 生成预览URL
    stylePreviewUrl.value = URL.createObjectURL(blob);
  } catch (error) {
    console.error('图片加载失败:', error);
  }
};

//生成艺术作品
//加载状态
const isLoading = ref(false)
const timer = ref<number | null>(null)
const generateArtwork = async () => {
  if (!previewUrl.value || !stylePreviewUrl.value) {
    alert('请先上传手绘作品和风格参考图片');
    return;
  }
  if (isLoading.value) return
  try {
    isLoading.value = true
    // // 准备 FormData（适合文件上传）
    // const formData = new FormData();
    // formData.append('contentImage', previewFile.value!);  // 手绘图片文件
    // formData.append('styleImage', stylePreviewFile.value!); // 风格图片文件

    // // 发送请求
    // const response = await request.post('YOUR_API_URL', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'  // 重要：文件上传必须用 multipart
    //   }
    // });

    // // 处理响应结果（假设返回的AI结果URL在 response.data.result）
    // aiResult.value = response.data.result;

    // 试验axios
    console.log(previewUrl.value, stylePreviewUrl.value);
    await new Promise((reject)=>setTimeout(reject, 5000))
    const res = await request({
        url:'http://smart-shop.itheima.net/index.php?s=/api/captcha/image'
      })      
    console.log(res)


  } catch (error) {
    console.error('生成失败:', error);
    alert('生成失败，请重试');
  } finally{
    isLoading.value = false
  }
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
.gentext {
  font-size: 1.2rem;
  color: #9ca3af;
  text-align: center;
  margin-top: 20px;
}

.loading:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff url('/images/loading.gif') no-repeat center;
}
</style>
