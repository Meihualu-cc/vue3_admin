### 项目目录结构

```
project-template # 项目名称
├── .vscode # vscode配置文件
├── public  # 静态文件(不会被编译)
├── src # 源码
│   ├── api # 接口文件 
│   ├── http # 网络请求文件(接口拦截器)
│   ├── assets # 静态文件(会被编译)
│   ├── components # 通用组件（业务提炼组件）
│   ├── router # 路由
│   ├── styles # 全局样式
│   ├── store # 全局状态管理
│   ├── utils # 工具库
│   ├── App.vue # 根组件
│   ├── main.ts # 入口文件
│   └── views # 页面
├── types # 类型声明文件
├──.env # 环境变量文件
├──.env.development # 开发环境变量文件
├──.env.production # 生产环境变量文件
├── .gitignore # git忽略文件
├── index.html # 入口文件
├── package.json # 项目配置文件(项目名称,版本,依赖,构建指令等)
├── pnpm-lock.yaml # pnpm 锁文件
├── tsconfig.json # ts配置文件
├── vite.config.js # vite配置文件
└── README.md # 项目说明
```


### 项目使用的依赖：

- 使用 Vite 进行项目构建
- 使用 TypeScript
- 使用 less 编写样式
- 对 pinia，vue-router，axios 进行模块化封装
- 使用 CommitLint，ESLint，StyleLint，Prettier，LintStage 进行团队项目规范
- 使用 ElementPlus 组件库

### 依赖作用
- vue：这个应该不用多说
- axios：vue官方推荐http请求库
- pinia：vue官方推荐状态管理工具
- pinia-plugin-persistedstate：pinia数据持久化插件
- vue-router：路由管理工具
- typescript：使用TS语言
- less：css预处理
- element-plus：亲民老牌组件库
- nprogres：简洁美观的进度加载条组件
  
### vite 构建工具
- @vitejs/plugin-vue：使vite能够编译vue组件
- @vitejs/plugin-vue-jsx：使vite能够编译jsx组件
- @types/node：node类型包，使ts支持node
- @types/nprogress：nprogress的类型支持
- vue-tsc：vue文件的类型检查工具

### .env 环境变量配置
- .env：所有情况下都会加载
- .env.[mode]：只在指定模式下加载
:::warning
npm run dev 会加载 .env 和 .env.development 内的配置
npm run build 会加载 .env 和 .env.production 内的配置
mode 可以通过命令行 --mode 选项来重写。
:::
