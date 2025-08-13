# Docker 部署指南

## 系統要求

- Docker
- Docker Compose

## 快速開始

### 生產環境部署

1. 運行部署腳本：

```bash
# Linux/Mac
./deploy.sh

# Windows
deploy.bat
```

或手動運行：

```bash
docker-compose up --build -d
```

### 開發環境部署

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

## 服務訪問

- **前端**: http://localhost
- **後端 API**: http://localhost:8080
- **資料庫**: localhost:5432

## 常用指令

### 查看日誌

```bash
# 查看所有服務日誌
docker-compose logs

# 查看特定服務日誌
docker-compose logs frontend
docker-compose logs backend
docker-compose logs db
```

### 停止服務

```bash
docker-compose down
```

### 重啟服務

```bash
docker-compose restart
```

### 進入容器

```bash
# 進入後端容器
docker-compose exec backend bash

# 進入前端容器
docker-compose exec frontend sh

# 進入資料庫容器
docker-compose exec db psql -U attendance_user -d attendance_db
```

## 環境變數

可以創建 `.env` 文件來覆蓋預設設定：

```env
# 資料庫設定
POSTGRES_DB=attendance_db
POSTGRES_USER=attendance_user
POSTGRES_PASSWORD=your_secure_password

# 端口設定
FRONTEND_PORT=80
BACKEND_PORT=8080
DB_PORT=5432
```

## 故障排除

1. **端口衝突**: 如果端口已被占用，請修改 `docker-compose.yml` 中的端口映射
2. **權限問題**: 在 Linux/Mac 上可能需要使用 `sudo`
3. **構建失敗**: 檢查 Docker 和 Docker Compose 版本
4. **資料持久化**: 資料庫資料會保存在 Docker volume 中，刪除 volume 會丟失資料

## 資料備份

```bash
# 備份資料庫
docker-compose exec db pg_dump -U attendance_user attendance_db > backup.sql

# 還原資料庫
docker-compose exec -T db psql -U attendance_user attendance_db < backup.sql
```
