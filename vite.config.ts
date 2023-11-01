/*
 * @Author: dushuai
 * @Date: 2023-04-24 18:31:36
 * @LastEditors: dushuai
 * @LastEditTime: 2023-11-01 15:01:42
 * @description: vite.config
 */
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Component from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import visualizer from 'rollup-plugin-visualizer'
import vueJsx from '@vitejs/plugin-vue-jsx'
import ElementPlus from 'unplugin-element-plus/vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env: Record<string, string> = loadEnv(mode, process.cwd(), '') // 环境变量
  const isDev: boolean = env.VITE_APP_ENV === 'development'
  const isSit: boolean = env.VITE_APP_ENV === 'sit'
  const isUat: boolean = env.VITE_APP_ENV === 'uat'
  const isProd: boolean = env.VITE_APP_ENV === 'production'
  const isHideLog: boolean = env.VITE_APP_LOG === 'true'
  const isTiny: boolean = env.VITE_APP_TINY === 'true'

  // 非本地环境删除dist文件夹
  if (!isDev) {
    const fs = require('fs')
    function delDir(path: string) {
      let files: string[] = []
      if (fs.existsSync(path)) {
        files = fs.readdirSync(path)
        files.forEach(file => {
          let curPath: string = path + '/' + file
          // 判断是否是文件夹
          if (fs.statSync(curPath).isDirectory()) {
            delDir(curPath) //递归删除文件夹
          } else {
            // 是文件的话说明是最后一层不需要递归
            fs.unlinkSync(curPath) //删除文件
          }
        })
        fs.rmdirSync(path)
      } else {
        return false
      }
    }

    // 删除目录
    delDir('./dist')
    delDir('./mobile')
  }

  // 区分测试和生产的打包环境
  let publicPath: string = ''
  let outputDir: string = ''

  // 测试使用dist打包
  if (isSit || isProd || isUat) {
    publicPath = env.VITE_APP_RESOURCE_URL as string
    outputDir = 'dist'
  }

  // 生产/预生产使用时间戳
  // if (isProd || isUat) {
  //   // 前端打包解决缓存问题
  //   const formatDate = (): string => {
  //     const time: Date = new Date()
  //     let y: string = time.getFullYear().toString()
  //     let m: string = (time.getMonth() + 1).toString()
  //     let d: string = time.getDate().toString()
  //     let h: string = time.getHours().toString()
  //     let mm: string = time.getMinutes().toString()
  //     let ss: string = time.getSeconds().toString()
  //     m = Number(m) < 10 ? `0${m}` : m
  //     d = Number(d) < 10 ? `0${d}` : d
  //     h = Number(h) < 10 ? `0${h}` : h
  //     mm = Number(mm) < 10 ? `0${mm}` : mm
  //     return `${y}${m}${d}${h}${mm}${ss}`
  //   }
  //   const dirName: string = formatDate()
  //   publicPath = `${env.VITE_APP_RESOURCE_URL}${dirName}`
  //   if (isProd || isUat) {
  //     outputDir = `./admin/${dirName}`
  //   }
  //   if (isSit) {
  //     outputDir = dirName
  //   }
  // }

  return {
    // root: process.cwd(), // 项目根目录（index.html 文件所在的位置） 默认process.cwd()
    base: publicPath, // 默认/ 配置文件的根目录为相对路径
    // publicDir: 'public', // 静态资源服务的文件夹 默认public
    plugins: [
      vue(),

      vueJsx(),

      ElementPlus({}), // 解决jsx内import导入组件样式丢失问题

      // 插件自动按需引入
      AutoImport({
        dts: 'src/auto-imports.d.ts', // 会在根目录生成auto-imports.d.ts
        include: [/\.[tj]sx?$/, /\.vue$/], // 匹配的文件，也就是哪些后缀的文件需要自动引入
        imports: ['vue', 'pinia', 'vue-router', '@vueuse/head'], // 自动引入的api从这里找
        eslintrc: { // 根据项目情况配置eslintrc，默认是不开启的
          enabled: true, // @default false
          // 下面两个是其他配置，默认即可
          // 输出一份json文件，默认输出路径为./.eslintrc-auto-import.json
          // filepath: './.eslintrc-auto-import.json', // @default './.eslintrc-auto-import.json'
          // globalsPropValue: true, // @default true 可设置 boolean | 'readonly' | 'readable' | 'writable' | 'writeable'
        },
        resolvers: [ElementPlusResolver()],
      }),

      // 组件自动按需引入
      Component({
        dts: 'src/components.d.ts',
        dirs: ['src/components'],
        extensions: ['vue'],
        resolvers: [ElementPlusResolver()],
        deep: true
      }),

      // 生产环境下开启gzip压缩
      isProd && viteCompression({
        verbose: true,
        disable: false,// 开启压缩(不禁用)，默认false即可
        deleteOriginFile: false, // 删除源文件
        threshold: 1024 * 10, // 4kb以上压缩
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 文件类型
      }),

      // 生产环境下开启图片压缩
      isProd && isTiny && viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      }),

      // 打包后展示性能面板
      isProd && visualizer({
        open: true, // 自动开启分析页面
      })

    ],

    build: {
      outDir: outputDir, // 指定输出路径 默认dist
      assetsDir: 'assets', // 指定生成静态文件目录 默认assets
      assetsInlineLimit: 1024 * 10, // 小于此阈值的导入或引用资源将内联为 base64 编码 默认4096
      cssCodeSplit: true, // 启用 CSS 代码拆分 默认true
      // chunkSizeWarningLimit: 1024, // 打包文件超过此阈值将会报警
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console.log调试代码 生产环境时移除
          drop_console: isHideLog,
          drop_debugger: isHideLog
        }
      },
      rollupOptions: {
        output: { // 对打包的静态资源做处理
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks(id) { // 超大静态资源拆分
            if (id.includes('node_modules')) {
              const list = id.toString().split('node_modules/')
              return list[list.length - 1].split('/')[0].toString()
            }
          }
        }
      }
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@img': `${fileURLToPath(new URL('./src', import.meta.url))}\\assets\\img`,
        '@components': `${fileURLToPath(new URL('./src', import.meta.url))}\\components`
      }
    },

    // 自定义代理规则
    server: {
      port: 8899,
      host: '0.0.0.0', // 使用ip能访问
      open: true,
      https: false,
      hmr: true, // hmr热更新
      strictPort: false, // 为true若端口已被占用则会直接退出
      proxy: {
        '/api': {
          target: env.VITE_APP_SERVE_URl,
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '')
        }
      }
    }
    // css
    // css: {
    //   // css预处理器
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData: '@import "@/assets/style/reset.scss";'
    //     }
    //   }
    // }
  }
})
