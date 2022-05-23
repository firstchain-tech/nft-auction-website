# NFT Box Web 配置文档

## 1.Contract配置

### (1)环境变量(prd、uat)

* uat: 表示测试链环境，目录`src/contracts/constant.uat.ts`

```tsx
# 示例
export const useConstant = {
  42: {
    CHAIN_ID: 42,
    RPC_URL: 'https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    Auction_ADDRESS: '',
    USDT_ADDRESS: '0x329DfE37F866367f0652786848885F3AFC90cCC6',
    apiUrl: '',
    apiKey: '',
  },
}
# 参数说明
  `CHAIN_ID: 对应节点的chainId
   RPC_URL: rpc_url地址
   Auction_ADDRESS: Auction 合约地址
   USDT_ADDRESS: usdt 合约地址
   apiUrl： 只是针对类似于bnb
   apiKey： 只是针对类似于bnb
   ...
  `
```

* prd: 表示正式环境，目录`src/contracts/constant.prd.ts`

`备注：参数如上所示`

### (2)入口文件

* 合约整体入口文件：`src/contracts/constant.ts`

  ```tsx
  选择不懂得编译环境 获得不同环境下的数据
  ```
  
* web3初始化入口：`src/contracts/constantInit.ts`

  ```tsx
  web3: 更具不同模式下对web3进行初始化，可用它作用于对合约的初始化、以及pages页面的使用
  ContractAuction: 不同合约的初始化
  ...
  toWeiFromWei: 将得到的参数去掉18个0,并保留4位小数返回
  ```

## 2.Store配置

目录：`src/store`

* info数据

  目录：`src/store/info` 

  用于存储动态的拍卖商品上架数据

* theme
  目录：`src/store/theme`
  作用于css样式、主题颜色等信息

* user

  目录：`src/store/theme`

  用于存储 账号地址
  
* wallt

  目录：`src/store/wallt`

  用于存储 链接 钱包 的 状态、网络id、是否链接

## 4.router配置

  目录：`src/router/index.tsx`

默认访问页面自动陪重定向到/home

## 5.其他配置

### (1)语言配置入口

目录：`src/utils/i18n.tsx`

```
默认英语选择
```



### (2)其他配置

目录：`src/utils/index.tsx`

```tsx
Adapth5：区分web端还是手机端,默认值是750px。 >750px 表示web端 <=750px 表示H5端
```

### (3)主题配置

目录：`src/theme`

配置系统的主题颜色，现在配置的是`themeColor`为主题颜色：`#5927EF`


