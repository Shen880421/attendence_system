# Use official OpenJDK image
FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY ./backend /app

RUN chmod +x mvnw && ./mvnw clean package

CMD ["java", "-jar", "target/*.jar"]