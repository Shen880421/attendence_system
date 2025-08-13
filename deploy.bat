@echo off

echo 停止現有的容器...
docker-compose down

echo 清理舊的鏡像...
docker image prune -f

echo 構建並啟動服務...
docker-compose up --build -d

echo 容器狀態：
docker-compose ps

echo.
echo 部署完成！
echo 前端: http://localhost
echo 後端 API: http://localhost:8080
echo 資料庫: localhost:5432
echo.
pause
