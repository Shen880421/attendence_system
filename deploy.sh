#!/bin/bash

# 停止並移除舊的容器
echo "停止現有的容器..."
docker-compose down

# 清理舊的鏡像（可選）
echo "清理舊的鏡像..."
docker image prune -f

# 重新構建並啟動服務
echo "構建並啟動服務..."
docker-compose up --build -d

# 顯示容器狀態
echo "容器狀態："
docker-compose ps

echo "部署完成！"
echo "前端: http://localhost"
echo "後端 API: http://localhost:8080"
echo "資料庫: localhost:5432"
