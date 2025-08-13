@echo off

echo 開始部署後端到 Railway...

REM 檢查是否已安裝 Railway CLI
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo 請先安裝 Railway CLI: npm install -g @railway/cli
    pause
    exit /b 1
)

echo 請確保已登入 Railway...
railway login

echo 正在部署後端服務...

REM 設置環境變數
railway variables set NODE_ENV=production
railway variables set JAVA_OPTS="-Xmx512m"

REM 複製後端專用配置
copy nixpacks.toml nixpacks.backend.backup.toml
copy railway.backend.toml railway.toml

REM 部署後端
railway up --detach

echo 後端部署完成！
echo 請記下後端 URL，前端需要用到
pause
