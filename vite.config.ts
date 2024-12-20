import { defineConfig, loadEnv } from 'vite';
import type { UserConfig, ConfigEnv } from 'vite';
import {visualizer} from 'rollup-plugin-visualizer'; 
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { viteMockServe } from "vite-plugin-mock";
import path from "path";
import AutoImport from "unplugin-auto-import/vite";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import IconsResolver from "unplugin-icons/resolver";
import ElementPlus from "unplugin-element-plus/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ViteCompression from "vite-plugin-compression";
import brotli from 'rollup-plugin-brotli';
import {createHtmlPlugin} from 'vite-plugin-html';
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  // 获取当前工作目录
  const root = process.cwd();
  function resolve(dir) {
    return path.join(__dirname, '.', dir)
  }
  // 获取环境变量
  const env = loadEnv(mode, root);
  console.log(env)
  return {
    // 项目根目录 
    root,
    // 项目部署的基础路径
    base: '/',
    publicDir: fileURLToPath(new URL('./public', import.meta.url)), // 无需处理的静态资源位置
    assetsInclude: fileURLToPath(new URL('./src/assets', import.meta.url)), // 需要处理的静态资源位置
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "@/styles/variable.less";`
        },
      },
    },
    plugins: [
      createHtmlPlugin({
        inject:{
          data:{
            momentscript:'<script src="//cdn.jsdelivr.net/npm/moment@2.29.1/min/moment-with-locales.min.js"></script>', 
            echartscript:'<script src="//cdn.bootcss.com/echarts/4.2.1-rc1/echarts.min.js"></script>'
          }
        }
      }),
      brotli({}),
      // 压缩配置
      // ViteCompression({
      //    threshold: 20*1024,//超过20kb才压缩 
      //    ext: '.gz',//压缩后缀 
      //    algorithm: 'gzip',//压缩算法
      // }),
      // Vue模板文件编译插件
      vue(),
      // jsx文件编译插件
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        //在 vite-plugin-mock 的新版本中，localEnabled 属性已经被 enable 所取代。
        enable: mode === 'development',  // 仅在开发环境启用,
      }),
         // 开启ElementPlus自动引入CSS
    ElementPlus({}),
    // 自动引入组件及ICON
    AutoImport({
      //定义需要自动引入的框架 
        imports: ['vue','vue-router'],
        eslintrc: { enabled: true  },
        resolvers: [ ElementPlusResolver(),IconsResolver()],

        dts: fileURLToPath(new URL("./types/auto-imports.d.ts", import.meta.url),),
      
    }),
    // 自动注册组件
    Components({
        resolvers: [ ElementPlusResolver(),IconsResolver()],
        // 生成 `components.d.ts` 全局声明，
        // 还接受自定义文件名的路径
        // 默认值：如果安装了包 typescript，则为“true”
        dts: fileURLToPath(new URL("./types/components.d.ts", import.meta.url),),
          // 要搜索组件的目录的相对路径。
          dirs: [ fileURLToPath(new URL("./src/components", import.meta.url), ),],
    }),
    // 自动安装图标
    Icons({
        autoInstall: true,
    }),
    ],
    // 运行后本地预览的服务器
    server: {
      // 是否开启https
      // https: {},
      // 指定服务器应该监听哪个 IP 地址。 如果将此设置为 0.0.0.0 或者 true 将监听所有地址，包括局域网和公网地址。
      host: true,
      // 开发环境预览服务器端口
      port: 3000,
      // 启动后是否自动打开浏览器
      open: false,
      // 是否开启CORS跨域
      cors: true,
      // 代理服务器
      // 帮助我们开发时解决跨域问题
      proxy: {
        // 这里的意思是 以/api开头发送的请求都会被转发到 http://xxx:3000
        '/api': {
          target: 'http://xxx:9000',
          // 改变 Host Header
          changeOrigin: true,
          // 发起请求时将 '/api' 替换为 ''
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },  
    // 打包配置  
    // vite打包基于rollup
    build: {
      // 关闭 sorcemap 报错不会映射到源码
      sourcemap: false,
      // 打包大小超出 400kb 提示警告
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        // 打包入口文件 根目录下的 index.html
        // 也就是项目从哪个文件开始打包
        input: {
          index: fileURLToPath(new URL('./index.html', import.meta.url)),
        },
        plugins:[
          visualizer({open:true}), 
        ], 
        // 静态资源分类打包
        output: {
          //该选项用于为代码分割设置一个以字节为单位的最小 chunk 大小
          experimentalMinChunkSize: 20 * 1024, 
          // 该选项允许你创建自定义的公共 chunk （可以为对象形式也可以为函数形式，为函数形式时每个被解析的模块都会经过该函数处理）
          manualChunks: (id: string) => {
              if (id.includes('html-canvans')) {
                  return 'html-canvans';
              }
              if (id.includes('node_modules')) {
                  return 'vendor';
              }
              // return 'index';
          },
          format: 'esm',
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
   // 配置别名
   resolve: {
    alias: {
      '@': resolve('src'),
      static: resolve('public/static'),
    },
    // 忽略后缀名的配置选项, 添加 .vue 选项时要记得原本默认忽略的选项也要手动写入
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  };
});