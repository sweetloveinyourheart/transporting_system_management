FROM eclipse-temurin:17-jdk-focal
 
WORKDIR /app
 
COPY .mvn/ .mvn
COPY mvnw pom.xml ./
RUN chmod +x mvnw && \
    ./mvnw dependency:go-offline
 
COPY src ./src
 
CMD ["./mvnw", "spring-boot:run"]