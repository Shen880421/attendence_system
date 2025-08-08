# 使用 Java 21 的 base image
FROM eclipse-temurin:21-jdk

# 切換工作目錄
WORKDIR /app

# 複製 Maven wrapper 和 backend 專案進容器
COPY ./backend /app

# 賦予執行權限給 mvnw
RUN chmod +x mvnw

# 打包 Spring Boot 專案
RUN ./mvnw clean package -DskipTests

# Debug 用：列出 target 目錄內容，確認 jar 是否存在
RUN ls -al target

# 設定環境變數
ENV PORT=8080

# 執行 jar 檔（注意路徑！）
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]