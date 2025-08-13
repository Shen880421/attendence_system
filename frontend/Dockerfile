# 多階段構建 - 第一階段：構建應用程式
FROM node:18-alpine AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package 文件
COPY frontend/package*.json ./

# 安裝依賴
RUN npm ci

# 複製源代碼
COPY frontend/ ./

# 構建應用程式
RUN npm run build

# 第二階段：運行時環境
FROM nginx:alpine

# 複製構建好的文件到 nginx 目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 複製自定義 nginx 配置
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]
