# npm、pnpm 和 yarn 的区别

## 1. 简介
npm (Node Package Manager) 是 Node.js 官⽅提供的包管理⼯具，发布于 2010 年。 npm 的特点是： 
+ 与 Node.js 捆绑，安装 Node.js 后⾃动安装；
+ 使⽤⼴泛，是 JavaScript 社区的默认选择； 
+ 提供强⼤的命令⾏⼯具，⽀持安装、发布和管理包。 

pnpm 是⼀个⾼效的包管理⼯具，特别注重磁盘空间的利⽤率和安装速度。 pnpm 的全称是 "Performant npm"：

+ 最⼤的特点是使⽤硬链接和符号链接来共享依赖，从⽽减少磁盘占⽤； 
+ ⽀持 npm 和 Yarn 的命令格式，但有显著性能优势； 
+ 适合⼤型项⽬和 monorepo 管理。 

yarn 是由 Facebook 于 2016 年发布的包管理⼯具，旨在解决 npm ⼀些早期版本的性能和 ⼀致性问题： 

+ 具有更快的安装速度和稳定性； 
+ 使⽤锁⽂件（ yarn.lock ）来确保不同环境中安装的依赖⼀致； 
+ 具有并⾏化安装和离线安装的能⼒。
## 2. 安装与初始化  

npm、pnpm、yarn的安装：

```bash
# npm自动安装

npm install -g pnpm
# 或者
yarn global add pnpm

npm install -g yarn
```

验证安装：

```bash
npm -v
pnpm -v
yarn -v
```

初始化项目：

```bash
npm init
# 或者使⽤快捷⽅式
npm init -y

pnpm init

yarn init
```

## 3. 基本命令对比
|  功能   |  npm命令 |  pnpm 命令   |  yarn 命令   |
| --- | --- | --- | --- |
|  初始化项⽬   |  npm init   |  pnpm init   |  yarn init   |
|  安装依赖   |  npm install   |  pnpm install   |  yarn install   |
|  添加依赖包   |  npm install pkg   |  pnpm add pkg   |  yarn add pkg   |
|  删除依赖包 |  npm uninstall pkg  |  pnpm remove pkg  |  yarn remove pk   |
|  更新依赖   |  npm update   |  pnpm update   |  yarn upgrade   |
|  安装全局包   | npm install -g pkg   |  pnpm add -g pkg   |  yarn global add pkg   |
|  执⾏脚本   |   npm run script   |  pnpm run script   |  yarn run script   |
|  清理缓存   |  npm cache clean   |  pnpm store prune   |  yarn cache clean   |

## 4. 性能与特点对比
### 4.1. 磁盘空间占用
npm：每个项⽬都会有⾃⼰的 node_modules ，即使不同项⽬中使⽤相同的依赖包，也会 重复下载和存储，导致磁盘空间浪费；

pnpm：通过硬链接和符号链接来共享依赖包，依赖只会在本地存储⼀次，⼤⼤减少了磁盘空 间的占⽤； 

yarn：与 npm 类似，项⽬之间不会共享 node_modules ，但通过 yarn cache 能减少 重复下载。  

### 4.2. 安装速度
npm：在 5.x 版本之后，npm 通过引⼊ package-lock.json 和并⾏化下载，安装速度 有所提升，但对于⼤型项⽬，速度仍然偏慢； 

pnpm：因为 pnpm 使⽤硬链接，安装速度⾮常快，并且会缓存已安装的包，下次安装相同 的包时⼏乎是即时完成； 

yarn：通过并⾏下载、离线模式和缓存机制，安装速度相较于 npm 快，特别是在使⽤ yar n.lock 确保⼀致性时。  

### 4.3. 项目一致性
npm：通过 package-lock.json ⽂件确保依赖版本的⼀致性； 

pnpm：同样⽣成 pnpm-lock.yaml ⽂件，保证项⽬在不同环境下的依赖⼀致性； 

yarn： yarn.lock ⽂件确保每次安装的包版本完全⼀致，是 Yarn 的⼀⼤优势。  

### 4.5. Monorepo 支持
npm：⽀持 monorepo 结构，但并不是最优选择； 

pnpm： pnpm 的结构和⼯作流⾮常适合 monorepo，具有天然的⽀持和优化； 

yarn：Yarn ⽀持 monorepo，通过 Yarn Workspaces 可以管理多个包，⾮常⽅便。  

## 5. 锁文件比较
锁⽂件的作⽤是确保项⽬在不同环境下安装的依赖完全⼀致。

三者的锁⽂件如下： 

+ npm： package-lock.json 
+ pnpm： pnpm-lock.yaml 
+ yarn： yarn.lock 

锁⽂件记录了每个依赖的精确版本号及其⼦依赖树，保证项⽬在不同设备或团队成员之间拥有相同 的依赖环境。  

## 6. 选择不同工具的场景
### 6.1. 选择 npm 的场景  
如果已经熟悉并使⽤ npm ，它是 Node.js 的默认包管理器，更新较为频繁且有良好的社区 ⽀持； 

如果需要快速开始⼀个项⽬，但⼜不想安装额外的⼯具。  

###  6.2. 选择 pnpm 的场景  
如果关⼼磁盘空间使⽤，特别是想维护多个项⽬时； 

适合⼤型项⽬或 monorepo 项⽬， pnpm 的依赖管理⽅式能显著提升性能和降低磁盘占 ⽤。  

###  6.3. 选择 yarn 的场景  
如果需要更快的包安装速度，并且想确保在不同机器上的包版本完全⼀致； 

Yarn Workspaces 使其成为 monorepo 项⽬的优秀选择。