# Railway 部署指南

## 前置需求

1. **安裝 Railway CLI**：
   ```bash
   npm install -g @railway/cli
   ```

2. **註冊 Railway 帳號**：
   - 訪問 [railway.app](https://railway.app)
   - 註冊並驗證帳號

3. **登入 Railway**：
   ```bash
   railway login
   ```

## 部署步驟

### 第一步：部署後端

1. **Windows 用戶**：
   ```bash
   deploy-backend.bat
   ```

2. **Linux/Mac 用戶**：
   ```bash
   chmod +x deploy-backend.sh
   ./deploy-backend.sh
   ```

3. **手動部署**：
   ```bash
   # 設置環境變數
   railway variables set NODE_ENV=production
   railway variables set JAVA_OPTS="-Xmx512m"
   
   # 使用後端配置
   cp railway.backend.toml railway.toml
   cp nixpacks.toml nixpacks.backend.backup.toml
   
   # 部署
   railway up --detach
   ```

4. **記錄後端 URL**：
   - 部署完成後，從 Railway 控制台獲取後端 URL
   - 格式類似：`https://your-backend-xxx.railway.app`

### 第二步：部署前端

1. **使用腳本**（推薦）：
   ```bash
   # Windows
   deploy-frontend.bat https://your-backend-xxx.railway.app
   
   # Linux/Mac
   ./deploy-frontend.sh https://your-backend-xxx.railway.app
   ```

2. **手動部署**：
   ```bash
   # 設置環境變數（替換為實際的後端 URL）
   railway variables set NODE_ENV=production
   railway variables set VITE_API_BASE_URL=https://your-backend-xxx.railway.app/api/
   
   # 使用前端配置
   cp railway.frontend.toml railway.toml
   cp nixpacks.frontend.toml nixpacks.toml
   
   # 部署
   railway up --detach
   ```

## 環境變數設定

### 後端環境變數

- `NODE_ENV=production`
- `JAVA_OPTS=-Xmx512m`
- `PGHOST` - PostgreSQL 主機（Railway 自動提供）
- `PGPORT` - PostgreSQL 端口（Railway 自動提供）
- `PGDATABASE` - 資料庫名稱（Railway 自動提供）
- `PGUSER` - 資料庫用戶（Railway 自動提供）
- `PGPASSWORD` - 資料庫密碼（Railway 自動提供）
- `PORT` - 應用程式端口（Railway 自動提供）

### 前端環境變數

- `NODE_ENV=production`
- `VITE_API_BASE_URL` - 後端 API URL（例如：`https://your-backend.railway.app/api/`）

## 資料庫設定

Railway 會自動為你的後端服務提供 PostgreSQL 資料庫。你需要在 Railway 控制台中：

1. 進入後端專案
2. 點擊 "Add Service" → "Database" → "PostgreSQL"
3. 資料庫連線資訊會自動設定為環境變數

## 自定義域名（可選）

1. 在 Railway 控制台中選擇你的服務
2. 進入 "Settings" → "Domains"
3. 點擊 "Add Domain" 添加自定義域名

## 監控和日誌

- **查看日誌**：在 Railway 控制台的 "Deployments" 頁面
- **監控服務**：在 "Metrics" 頁面查看 CPU、記憶體使用情況
- **重新部署**：推送新代碼到 Git 倉庫會自動觸發重新部署

## 故障排除

### 常見問題

1. **構建失敗**：
   - 檢查 `nixpacks.toml` 配置
   - 確保依賴版本正確
   - 查看構建日誌

2. **API 連接問題**：
   - 確認 `VITE_API_BASE_URL` 設定正確
   - 檢查 CORS 設定
   - 確認後端服務正在運行

3. **資料庫連接失敗**：
   - 確認 PostgreSQL 服務已添加
   - 檢查環境變數是否正確設定

### 有用的指令

```bash
# 查看服務狀態
railway status

# 查看日誌
railway logs

# 查看環境變數
railway variables

# 連接到服務 shell
railway shell

# 重新部署
railway up --detach
```

## 成本考量

- Railway 提供免費額度，超出後按使用量計費
- 建議監控資源使用情況
- 可以設置使用限制來控制成本
