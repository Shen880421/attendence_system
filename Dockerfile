# 使用官方 OpenJDK 17 映像
FROM eclipse-temurin:17-jdk

# 設定工作目錄
WORKDIR /app

# 複製 backend 專案
COPY ./backend /app

# Maven wrapper 執行權限
RUN chmod +x mvnw

# 編譯並略過測試
RUN ./mvnw clean package -DskipTests

# 設定埠（Railway 會自動提供環境變數 PORT）
ENV PORT=8080

# 啟動 Spring Boot 應用（建議寫死 .jar 檔名）
CMD ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]