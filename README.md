# spark_image_demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
运行后先点击上传图片，选择图片后再进行文本对话。
### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
在src目录下，创建config.js文件，填写以下内容:
```
export const app_id = "xxxxxx"
export const api_secret = "xxxxxxxxx"
export const api_key = "xxxxxxxxxxx"
export const host = "xxxxxxxxxxxxx"
export const path = "xxxxxxxxxxxx"

```
具体见官方文档鉴权部分。<br>
See [Configuration Reference](https://www.xfyun.cn/doc/spark/ImageUnderstanding.html).
