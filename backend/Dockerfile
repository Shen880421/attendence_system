# 使用官方 OpenJDK 21 作為基礎鏡像
FROM openjdk:21-jdk-slim

# 設定工作目錄
WORKDIR /app

# 複製 Maven 配置文件
COPY backend/pom.xml ./
COPY backend/mvnw ./
COPY backend/mvnw.cmd ./
COPY backend/.mvn .mvn

# 賦予執行權限
RUN chmod +x ./mvnw

# 下載依賴（利用 Docker 緩存層）
RUN ./mvnw dependency:go-offline -B

# 複製源代碼
COPY backend/src ./src

# 編譯應用程式
RUN ./mvnw clean package -DskipTests

# 暴露端口
EXPOSE 8080

# 運行應用程式
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
