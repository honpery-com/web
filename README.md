## web
> web端，主要包括home和blog。

#### 技术选型
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://facebook.github.io/react/)
- [koa](https://github.com/koajs/koa)

#### 起步
```
git clone git@github.com:honpery-com/web.git honpery-com-web
cd honpery-com-web && yarn
```

#### 目录结构
```
honpery-com-web
    |- src                  # 源码
        |- components       # 公共组件
        |- fetch            # 请求封装
        |- pages            # 界面组件
        |- client.ts        # 客户端入口文件
        |- server.ts        # 服务器端入口文件
        |- router.ts        # 路由
        |- index.html       # 初始模板
    |- scripts              # 项目脚本
        |- build.ts         # 构建
        |- bundle.ts        # 打包
        |- run.ts           # 执行脚本
        |- server.ts        # 服务器
```

#### 模块
- [ ] `home`: /
- `articles`
    - [ ] `list`: /articles
    - [ ] `detail`: /articles/:_id
- [ ] `about`: /about
- [ ] `archive`: /archive
