@echo off

echo 開始部署前端到 Railway...

if "%1"=="" (
    echo 使用方式: deploy-frontend.bat ^<BACKEND_URL^>
    echo 例如: deploy-frontend.bat https://your-backend.railway.app
    pause
    exit /b 1
)

set BACKEND_URL=%1

REM 檢查是否已安裝 Railway CLI
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo 請先安裝 Railway CLI: npm install -g @railway/cli
    pause
    exit /b 1
)

echo 請確保已登入 Railway...
railway login

echo 正在部署前端服務...

REM 設置環境變數
railway variables set NODE_ENV=production
railway variables set VITE_API_BASE_URL=%BACKEND_URL%/api/

REM 複製前端專用配置
copy nixpacks.frontend.toml nixpacks.toml
copy railway.frontend.toml railway.toml

REM 部署前端
railway up --detach

echo 前端部署完成！
echo 後端 API: %BACKEND_URL%
echo 前端將會自動連接到後端 API
pause
