<template>
  <div
    class="min-h-[1024px] bg-gradient-to-b from-[#E6F7F5] to-white font-['Microsoft YaHei']"
  >
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
              @click="activeTabIMG"
            >
              <font-awesome-icon :icon="['fas', 'image']" />
              <span>图像创作</span>
            </button>

            <button
              class="px-10 py-2 rounded-full flex items-center gap-2 transition-all"
              :style="activeTab === 'video' ? 
                'background-color: #0ea5e9; color: white; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);' : 
                'color: #4b5563;'"
              @click="activeTabVideo"
            >
              <font-awesome-icon :icon="['fas', 'video']" />
              <span>视频创作</span>
            </button>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            class="text-gray-500 p-2 rounded-xl hover:bg-white/50 transition-all !rounded-button whitespace-nowrap"
          >
            <font-awesome-icon :icon="['fas', 'gear']" class="text-xl" />
          </button>
          <button
            class="text-gray-500 p-2 rounded-xl hover:bg-white/50 transition-all !rounded-button whitespace-nowrap"
          >
            <font-awesome-icon
              :icon="['fas', 'question-circle']"
              class="text-xl"
            />
          </button>
        </div>
      </div>

      <div class="flex gap-6 items-stretch" v-if="activeTab === 'image'">
        <div class="w-[330px] flex flex-col">
          <div class="content-area p-4 mb-4">
            <h2 class="text-xl font-bold mb-2">手绘创作</h2>
            <div
              class="bg-gray-50 rounded-xl w-full aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all group relative"
              @click="triggerFileInput"
            >
              <input
                ref="fileInput"
                type="file"
                class="hidden"
                accept="image/*"
                @change="handleFileChange"
              />
              <div v-if="!previewUrl" class="text-center">
                <font-awesome-icon
                  :icon="['fas', 'upload']"
                  class="text-4xl text-gray-400 mb-4 group-hover:text-primary transition-all"
                />
                <p
                  class="text-gray-500 group-hover:text-primary transition-all"
                >
                  点击上传你的手绘作品
                </p>
                <p class="text-xs text-gray-400 mt-2">
                  支持 JPG、PNG、SVG 格式
                </p>
              </div>
              <img
                v-if="previewUrl"
                :src="previewUrl"
                class="absolute inset-0 w-full h-full object-cover rounded-xl object-center"
                @click.stop="triggerFileInput"
              />
            </div>
          </div>

          <div class="content-area p-4 flex-1">
            <h2 class="text-xl font-bold mb-4">风格参考</h2>
            <div class="grid grid-cols-1 gap-2">
              <div
                class="bg-gray-50 rounded-xl w-full aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all group relative"
                @click="triggerStyleFileInput"
              >
                <input
                  ref="styleFileInput"
                  type="file"
                  class="hidden"
                  accept="image/*"
                  @change="handleStyleFileChange"
                />
                <div v-if="!stylePreviewUrl" class="text-center">
                  <font-awesome-icon
                    :icon="['fas', 'upload']"
                    class="text-4xl text-gray-400 mb-4 group-hover:text-primary transition-all"
                  />
                  <p
                    class="text-gray-500 group-hover:text-primary transition-all"
                  >
                    上传风格图片
                  </p>
                  <p class="text-xs text-gray-400 mt-2">推荐尺寸 1024×1024</p>
                </div>
                <img
                  v-if="stylePreviewUrl"
                  :src="stylePreviewUrl"
                  class="absolute inset-0 w-full h-full object-cover rounded-xl object-center"
                  @click.stop="triggerStyleFileInput"
                />
              </div>
              
              <h2 class="text-lg font-bold mt-2 text-left">系统风格</h2>
              <div class="flex flex-wrap" style="justify-content:space-between">
                <div v-for="(style, index) in styles" :key="index">                
                  <img
                  :src="style.url"
                  :alt="style.alt"
                  class="rounded-lg w-[70px] h-[70px] object-cover hover:ring-2 hover:ring-blue-400 transition-all cursor-pointer"
                  @click="selectStyle(style,index)"
                  />
                  <p style="text-align:center;line-height:15px;margin-top:8px;color:rgb(75, 85, 141)">{{style.alt}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex-1 content-area p-6 flex flex-col">
          <h2 class="text-xl font-bold mb-4">AI 创作结果</h2>
          <div
            v-loading="isLoading"
            class="bg-gray-50 rounded-xl flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 relative"
          >
            <img
              v-if="aiResult"
              :src="aiResult"
              alt="AI创作结果"
              class="absolute w-full h-full rounded-xl object-cover"
            >
            <div v-else class="text-center gentext">
              <font-awesome-icon
                :icon="['fas', 'image']"
                class="text-6xl text-gray-400 mb-2 group-hover:text-primary transition-all"
              />
              <p class="text-gray-400">生成的艺术作品将显示在这里</p>
            </div>
          </div>
          <div class="mt-14 flex justify-end gap-4">
            <button @click="downloadImage" class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-all shadow-sm hover:shadow !rounded-button whitespace-nowrap">
              <font-awesome-icon :icon="['fas', 'download']" />
              <span>下载作品</span>
            </button>
            <button @click="generateArtwork" class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg !rounded-button whitespace-nowrap">
              <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" />
              <span>开始创作</span>
            </button>
          </div>
        </div>
        
        <div class="w-[250px] max-h-[900px]">
          <div class="content-area p-6">
            <h2 class="text-xl font-bold mb-4">创作历史</h2>
            <div class="space-y-4 overflow-y-auto max-h-[410px] scrollbar min-h-[400px]">
              <div v-for="(history, index) in historyList" :key="index" class="bg-gray-50 rounded-xl p-4">
                <img
                  :src="history?.imageUrl"
                  :alt="`历史记录${index + 1}`"
                  class="w-full h-[150px] object-cover rounded-lg mb-2"
                >
                <p class="text-sm text-gray-600">{{ history?.date }}</p>
              </div>
            </div>
          </div>
          <div class="content-area p-6 transition-all duration-1000 ease-in-out overflow-hidden"  style="margin-top:20px;" :class="{
            'opacity-0 max-h-0': !selectId,
            'opacity-100 max-h-[500px]': selectId}">
            <h2 class="text-xl font-bold mb-2 text-center">艺术学习</h2>
            <div class="space-y-4 overflow-y-auto h-[300px] scrollbar">
              <p style="text-indent:2em;background-color:rgb(243, 244, 246);border-radius:10px" >{{styles[selectId]?.description}}</p>
            </div> 
          </div>
        </div>
      </div>
      <!-- 视频界面 -->
      <div class="flex gap-6 items-stretch" v-else>
        <div class="w-[330px] flex flex-col">
          <div class="content-area p-4 mb-4">
            <h2 class="text-xl font-bold mb-2">视频参考图</h2>
            <div class="bg-gray-50 rounded-xl w-full aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all group relative" @click="triggerVideoFileInput">
              <input
                  ref="videoFileInput"
                  type="file"
                  class="hidden"
                  accept="image/*" 
                  @change="handleVideoChange"
                >
              <div class="text-center" v-if="!videoPreviewUrl">
                <font-awesome-icon :icon="['fas', 'cloud-arrow-up']" class="text-4xl text-gray-400 mb-4 group-hover:text-primary transition-all" />
                <p class="text-gray-500 group-hover:text-primary transition-all">点击上传参考图片</p>
                <p class="text-xs text-gray-400 mt-2">支持 JPG、PNG、SVG 格式</p>
              </div>
              <img 
                v-if="videoPreviewUrl" 
                :src="videoPreviewUrl" 
                class="absolute inset-0 w-full h-full object-cover rounded-xl object-center"
                @click.stop="triggerVideoFileInput"
              >
            </div>
          </div>
          <div class="max-h-[460px]">
            <div class="content-area p-6">
              <h2 class="text-xl font-bold mb-6">图像创作历史</h2>
              <div class="space-y-4 overflow-y-auto max-h-[420px] min-h-[360px]">
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
        
        <div class="flex-1 content-area p-6 flex flex-col">
          <h2 class="text-xl font-bold mb-4">AI 创作结果</h2>
          <div class="bg-gray-50 rounded-xl flex-1 flex items-center justify-center border-2 border-dashed border-gray-300 relative" v-loading="isLoading">
            <video
              v-if="aiVideo"
              :src="aiVideo"
              controls
              autoplay
              muted
              class="absolute w-full h-full rounded-xl object-cover"
            ></video>
            <div v-else class="text-center gentext">
              <font-awesome-icon :icon="['fas', 'film']" class="text-6xl text-gray-400 mb-2 group-hover:text-primary transition-all" />
              <p class="text-gray-400">生成的视频作品将显示在这里</p>
            </div>
          </div>
          <div class="mt-14 flex justify-end gap-4">
            <button class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-200 transition-all shadow-sm hover:shadow !rounded-button whitespace-nowrap">
              <font-awesome-icon :icon="['fas', 'download']" />
              <span>下载作品</span>
            </button>
            <button
              class="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-md hover:shadow-lg !rounded-button whitespace-nowrap"
              @click="generateArtwork"
            >
              <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" />
              <span>开始创作</span>
            </button>
          </div>
        </div>
        
        <div class="w-[300px] max-h-[902px]">
          <div class="content-area p-6">
            <h2 class="text-xl font-bold mb-4">视频创作历史</h2>
            <div class="space-y-4 overflow-y-auto max-h-[810px] scrollbar min-h-[400px]">
              <div v-for="(history, index) in historyList" :key="index" class="bg-gray-50 rounded-xl p-4">
                <p class="text-sm text-gray-600"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '~/components/layout/Navbar.vue'
import { request } from '~/api/generate'
import { vLoading } from '~/directives/loading'
import type { resolve } from 'path'
const activeTab = ref('image')
const styles = ref([
  {
    url: '/images/examples/style1.jpg',
    alt: '印象派',
    description:'《星空月夜》是荷兰后印象派画家文森特·梵高于1889年创作的一幅著名油画。画面中，巨大的柏树像火焰一样向上伸展，星月璀璨的夜空以漩涡状的笔触描绘，给人以无限遐想的空间。梵高通过此作品表达了他对自然美景的独特感受以及内心的激情与孤独。'
  },
  {
    url: '/images/examples/style2.jpg',
    alt: '浪漫派',
    description:'这张图片展示了一幅充满浪漫主义色彩的艺术作品，画面中以柔和的色调描绘了天空与草地的景象前景中的黄色花朵和绿色草丛则为画面增添了生机与活力，象征着自然界的美好与希望。浪漫主义艺术家们常常通过这样的作品来唤起观者内心深处的情感共鸣，鼓励人们去感受生活中的诗意与美好'
  },
  {
    url: '/images/examples/style3.jpg',
    alt: '卡通风',
    description:'画面中是一只可爱的猴子，它正用尾巴挂在树上，脸上带着开心的笑容。背景是简单的绿色和蓝色渐变，给人一种轻松愉快的感觉。这幅插画被标记为“卡通风”，通常这种风格的作品以夸张、简洁和富有表现力的形象来传达信息或讲述故事，激发大家的想象力和创造力'
  }
]);

// const historyList = ref([] as Array<{ imageUrl: string; date: string }>)
const historyList = ref([
  {
    imageUrl: '/images/examples/response4.png',
    date: '2025-04-08 18:07',
  }])
//上传手绘
const fileInput = ref<HTMLInputElement | null>(null);
// 存储原始文件对象
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
    previewFile.value = file;
    // 生成预览URL
    previewUrl.value = URL.createObjectURL(file);
    // console.log(previewFile.value)
    // 这里可以添加实际的上传逻辑
    // uploadToServer(file);
  }

  // 清空input值，允许重复选择同一文件
  target.value = '';
};
// 上传风格图片
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
    selectId.value = null
    stylePreviewFile.value = file;
    stylePreviewUrl.value = URL.createObjectURL(file);
    // 这里可以添加实际上传逻辑
  }

  target.value = '';
};

// 系统风格图片
const selectId = ref<string | null>(null)
const selectStyle = async (style: { url: string; alt: string },index:number) => {
  try {
    // 获取图片数据
    const response = await fetch(style.url);
    const blob = await response.blob();
    selectId.value = String(index)
    // 创建真实 File 对象
    stylePreviewFile.value = new File([blob], style.alt, {
      type: blob.type || 'image/*',
      lastModified: Date.now(),
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
const aiResult = ref<string | null>(null)
const aiVideo = ref<string | null>(null)
const generateArtwork = async () => {
  if (isLoading.value) return
  //图片生成
  if(activeTab.value === 'image'){
    if (!previewUrl.value || !stylePreviewUrl.value) {
      alert('请先上传手绘作品和风格参考图片');
      return;
    }
    try {
      aiResult.value = null
      isLoading.value = true;
      const formData = new FormData();
      formData.append('content', previewFile.value!);
      formData.append('style', stylePreviewFile.value!);
      const response = await request.post('https://coupons-map-denied-rejected.trycloudflare.com/api/ipadapter_scribble', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer'
      });
      // 处理响应结果
      const blob = new Blob([response.data], { type: 'image/png' });
      const blobUrl = URL.createObjectURL(blob);

      
      // 设置结果图片
      aiResult.value = blobUrl;
      
      // 添加到历史记录
      historyList.value.unshift({
        imageUrl: blobUrl,
        date: new Date().toLocaleString('zh-CN')
      });
    } catch (error) {
      console.error('生成失败:', error)
      alert('生成失败，请重试')
    } finally{
      isLoading.value = false
    }
  }
  //图片生成
  else{
    if (!videoPreviewUrl.value) {
      alert('请先上传参考图片');
      return;
    }
    try {
      isLoading.value = true;
      const formData = new FormData();
      formData.append('image', videoPreviewUrl.value!);
      // const response = await request.post('https://shirt-round-aluminium-cable.trycloudflare.com/api/ipadapter_scribble', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      // console.log(response)
      await new Promise<void>(resolve => { setTimeout(() => resolve(), 5000) });
    } catch (error) {
      console.error('生成失败:', error)
      alert('生成失败，请重试')
    } finally{
      isLoading.value = false
    }
  }
};

//下载图片
// 在setup()或<script setup>中添加：
const downloadImage = () => {
  if (!aiResult.value) return;
  // 如果是Blob URL（blob:http://...）
  if (aiResult.value.startsWith('blob:')) {
    const link = document.createElement('a')
    link.href = aiResult.value
    link.download = `智绘创艺.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    return
  }
}
const activeTabIMG = () => {
  videoPreviewFile.value = null
  videoPreviewUrl.value = null
  activeTab.value='image'
}
const activeTabVideo = () =>{
  previewUrl.value = null
  previewFile.value = null
  stylePreviewFile.value = null
  stylePreviewUrl.value = null
  activeTab.value='video'
}
//生成视频图片上传
const videoFileInput = ref<HTMLInputElement | null>(null);
const videoPreviewFile = ref<File | null>(null);
const videoPreviewUrl = ref<string | null>(null);
  const triggerVideoFileInput = () => {
    videoFileInput.value?.click();
};
const handleVideoChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];

  if (file) {
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }
    videoPreviewFile.value = file;
    videoPreviewUrl.value = URL.createObjectURL(file);
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
button:not([style*='background-color']):hover {
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
