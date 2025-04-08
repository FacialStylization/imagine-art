# Imagine-Art: 儿童AI艺术创作平台

一个专为低龄儿童设计的美术启蒙教育平台，通过AI风格迁移技术赋能儿童艺术创作。

## 📌 项目愿景

在创作中学习，在学习中创作。让每个孩子都能体验艺术创作的乐趣，同时学习艺术知识和培养审美能力。

## 🌟 核心功能

- **简易绘画**: 适合低龄儿童的直观绘画界面
- **AI风格迁移**: 将孩子的涂鸦转化为艺术大师风格的作品
- **艺术学习**: 在创作过程中了解不同的艺术风格和知识
- **作品收藏**: 保存和展示孩子的创作历程

## 💻 技术栈

| 技术类别     | 技术选型             | 优化理由                                        |
| ------------ | -------------------- | ----------------------------------------------- |
| **前端框架** | Nuxt 3               | 提供更好的SEO、自动代码分割和优化的初始加载速度 |
| **构建工具** | Vite                 | 快速开发体验和高效构建                          |
| **UI组件**   | NuxtUI/PrimeVue      | 轻量级且高度可定制，适合创建儿童友好界面        |
| **CSS方案**  | TailwindCSS + UnoCSS | 按需加载CSS，减少包体积；快速构建一致性设计     |
| **状态管理** | Pinia                | Vue 3官方推荐的轻量级状态管理                   |
| **绘图功能** | Konva.js             | 轻量级Canvas库，适合儿童绘图应用                |
| **动画效果** | GSAP                 | 流畅动画提升儿童体验，文件小，性能好            |
| **图像优化** | Nuxt Image           | 自动优化图像加载，儿童友好的加载体验            |
| **应用类型** | PWA                  | 提供离线功能，类原生应用体验                    |
| **部署平台** | Vercel               | 简单部署，高性能CDN                             |
| **CI/CD**    | GitHub Actions       | 自动测试、构建和部署流程                        |

## 🚀 快速开始

```bash
# 克隆项目
git clone https://github.com/your-username/imagine-art.git

# 安装依赖
cd imagine-art
npm install

# 本地开发
npm run dev
```

## 🌐 部署指南

### 使用Vercel部署

1. 确保已安装[Vercel CLI](https://vercel.com/docs/cli)：

   ```bash
   npm install -g vercel
   ```

2. 登录Vercel账户：

   ```bash
   vercel login
   ```

3. 部署项目：

   ```bash
   vercel
   ```

4. 配置GitHub Actions自动部署：

   - 在GitHub仓库的`Settings > Secrets and variables > Actions`中添加以下Secrets：
     - `VERCEL_TOKEN`：从Vercel账户获取的API Token
     - `VERCEL_ORG_ID`：Vercel组织ID
     - `VERCEL_PROJECT_ID`：Vercel项目ID

5. 推送代码到`main`分支后，GitHub Actions会自动触发部署流程。

## 📊 性能优化

- 使用Nuxt 3的自动代码分割和静态生成功能，提升页面加载速度
- 集成Lighthouse CI，自动检测性能和可访问性问题
- 使用PWA支持离线访问，提高用户体验
