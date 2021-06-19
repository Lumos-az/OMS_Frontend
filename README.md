# 6.10 更新--yarn大法好
B组新增录音功能，其中所需的`react-mic`和本环境下的`React`版本有冲突，npm解决该冲突（确实烂），所以转用`yarn`来代替`npm`。使用操作大致如下：
1. 安装yarn
```shell
npm install -g yarn
```
2. 进行软件包下载/更新
```shell
yarn
```
3. 部署开发环境
```shell
yarn start
```



# 整合相关
## 整合要求
1. 将本组src文件加内的文件上传至仓库的src中的GroupX（X为本组的组号），注意不需要上传`App.js`, `index.js`, `index.css`。
2. 在`App.js`中import本组的组件并修改路径，路径格式例：url/bbs(小组负责的内容)/mainPage(组内界面的名字).
3. 检查本组的`package.json`和在线仓库的内容，将仓库`package.json`中缺少的内容，复制上。
4. 按照下方的接口说明调试本组的内容，确保前端功能实现正常。
5. 请不要上传`node_modules`, `package-lock.json`, `.git`等文件。
6. 请不要修改其他小组的内容。
7. 在确保整个前端可以正常运行的情况下再进行push操作。


---
## 接口说明
> 请各组将需要共用的接口信息按照格式写在下方
### Group E 基础信息
#### MainPage

The page occurs when user opens the website

#### Login_Register

Incude the login and register page



#### UserCenter

Provide different personal center pages according to user identity

#### 使用说明

用户登录后相关信息会存储在window.localStorage中，TopBar组件会验证用户的登录状态，storage['islogin']中存储了用户的登录状态。

可以通过storage['user'] 获取uid，storage['nickname']获取昵称，storage['identity']获取用户身份类型等。

