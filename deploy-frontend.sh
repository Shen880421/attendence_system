#!/bin/bash

# Frontend 部署腳本
echo "開始部署前端到 Railway..."

# 檢查後端 URL
if [ -z "$1" ]; then
    echo "使用方式: ./deploy-frontend.sh <BACKEND_URL>"
    echo "例如: ./deploy-frontend.sh https://your-backend.railway.app"
    exit 1
fi

BACKEND_URL=$1

# 檢查是否已安裝 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "請先安裝 Railway CLI: npm install -g @railway/cli"
    exit 1
fi

# 登入 Railway (如果尚未登入)
echo "請確保已登入 Railway..."
railway login

# 創建新的專案
echo "正在部署前端服務..."

# 設置環境變數
railway variables set NODE_ENV=production
railway variables set VITE_API_BASE_URL="${BACKEND_URL}/api/"

# 複製前端專用配置
cp nixpacks.frontend.toml nixpacks.toml
cp railway.frontend.toml railway.toml

# 部署前端
railway up --detach

echo "前端部署完成！"
echo "後端 API: ${BACKEND_URL}"
echo "前端將會自動連接到後端 API"
