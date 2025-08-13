#!/bin/bash

# Backend 部署腳本
echo "開始部署後端到 Railway..."

# 檢查是否已安裝 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "請先安裝 Railway CLI: npm install -g @railway/cli"
    exit 1
fi

# 登入 Railway (如果尚未登入)
echo "請確保已登入 Railway..."
railway login

# 創建或選擇專案
echo "正在部署後端服務..."

# 設置環境變數
railway variables set NODE_ENV=production
railway variables set JAVA_OPTS="-Xmx512m"

# 複製後端專用配置
cp nixpacks.toml nixpacks.backend.backup.toml
cp railway.backend.toml railway.toml

# 部署後端
railway up --detach

echo "後端部署完成！"
echo "請記下後端 URL，前端需要用到"
