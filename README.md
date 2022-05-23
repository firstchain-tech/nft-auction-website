# HUOBI NFT WEB

### 使用create react app创建

* 技术栈:`react` `react-router` `redux`  `react-redux` `prettier` `i18next` 

### 常用命令

* `yarn start:dev` 运行dev环境

* `yarn start:uat` 运行uat环境

* `yarn start:prd` 运行正式(prd)环境

* `yarn build:dev` 编译dev测试包，将用于生产的应用程序构建到 `build` 文件夹

* `yarn build:uat` 编译uat测试包，将用于生产的应用程序构建到 `build` 文件夹

* `yarn build:prd` 编译正式包，将用于生产的应用程序构建到 `build` 文件夹

* `yarn prettier` 格式化代码，用于代码美化、配置文件如下

  ```
  .prettierignore 忽略文件
  .prettierrc 美化基础配置
  ```

* `yarn test`

  在交互式观察模式下启动测试运行器。
  有关更多信息，请参阅有关 [运行测试](https://facebook.github.io/create-react-app/docs/running-tests) 的部分。

* `yarn eject`

  **Note: this is a one-way operation. Once you `eject`, you can’t go back!**

  如果您对构建工具和配置选择不满意，您可以随时“弹出”。 此命令将从您的项目中删除单个构建依赖项。

  相反，它会将所有配置文件和可传递依赖项（webpack、Babel、ESLint 等）复制到您的项目中，以便您可以完全控制它们。 除了“eject”之外的所有命令仍然有效，但它们将指向复制的脚本，以便您可以调整它们。 在这一点上，你是靠自己的。

  你不必使用 `eject`。 精选功能集适用于中小型部署，您不应该觉得有义务使用此功能。 但是我们知道，如果您在准备好时无法对其进行自定义，则此工具将没有用处。

### 目录

```
|-- HUOBI NFT WEB
    |-- .gitignore  #git忽略文件
    |-- .prettierignore #prettier忽略文件
    |-- .prettierrc #prettier配置
    |-- Configuration.md #项目前端 配置文档
    |-- package.json
    |-- README.md
    |-- tsconfig.json
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico     #ico图标
    |   |-- index.html      #index.html
    |-- src
        |-- App.less        #全局css样式入口
        |-- App.test.tsx    
        |-- App.tsx         #样式入口
        |-- index.tsx       #App、index样式入口
        |-- react-app-env.d.ts
        |-- reportWebVitals.ts
        |-- setupTests.ts
        |-- api             #api接口入口
        |   |-- index.ts
        |-- assets          #静态目录
        |-- common          #公共方法目录
        |   |-- data.d.ts   #声明文件
        |   |-- index.ts	#通用方法
        |   |-- limit.ts	#axios请求分组
        |   |-- styled.ts	#公用样式入口
        |-- components         #全局组件
        |   |-- AuctionModal   #Auction模块组件
        |   |-- ConnectWallet  #wallet组件
        |   |-- CountDown      #倒计时组件
        |   |-- Footer         #底部栏
        |   |-- HooksProvider  #全局入口处理web3js实例化后组件
        |   |-- RewardModal    #Reward组件
        |   |-- SelectNetWork  #网络切换（备用）
        |   |-- SwitchLanguage #language组件
        |   |-- TopBar         #topbar栏
        |   |-- Web3Provider   #web3实现实例化组件
        |-- contracts            #合约目录
        |   |-- constant.dev.ts  #dev配置
        |   |-- constant.prd.ts  #prd配置
        |   |-- constant.ts      #合约入口
        |   |-- constant.uat.ts  #uat配置
        |   |-- constantInit.ts  #初始化变量
        |   |-- init.ts          #初始化变量
        |   |-- limitPromise.ts  #axios请求分组
        |   |-- abis             #abi文件
        |-- hooks                
        |   |-- useAuctionHooks.ts  
        |   |-- useChainIdHooks.ts
        |   |-- useDataHooks.ts
        |   |-- useErrorHooks.ts
        |   |-- useHomeHooks.ts
        |   |-- useWeb3Hooks.ts
        |   |-- useWindowSizeHooks.ts
        |-- Import                   #详情页面刷新数据处理
        |   |-- reduxDataLocal.ts
        |-- layout                  
        |   |-- index.tsx
        |   |-- styled.ts
        |-- locales    #语言包
        |   |-- en-us.ts
        |   |-- en-us
        |       |-- auction.ts
        |       |-- footer.ts
        |       |-- home.ts
        |-- pages      #页面目录
        |   |-- 404.tsx
        |   |-- Auction 
        |   |-- Home
        |-- router     #路由目录
        |   |-- index.tsx
        |-- store      #redux
        |   |-- index.ts
        |   |-- reducers.ts
        |   |-- connector
        |   |-- info
        |   |-- theme
        |   |-- user
        |   |-- wallet
        |-- theme          #theme主题配置
        |   |-- index.less
        |   |-- index.tsx
        |   |-- styled.d.ts
        |   |-- font
        |-- utils          #其他配置
            |-- i18n.tsx   #语言包
            |-- index.ts   
            |-- request.ts #合约相关请求
            |-- requestApi.ts #api请求
```



### Learn More

