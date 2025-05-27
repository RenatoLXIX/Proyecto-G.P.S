FROM eclipse-temurin:21-jdk

EXPOSE 8080

WORKDIR /app

COPY ./pom.xml /app
COPY ./.mvn /app/.mvn
COPY ./mvnw /app

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

COPY ./src /app/src

RUN ./mvnw clean install -DskipTests

ENTRYPOINT [ "java", "-jar", "/app/target/backendBasica-0.0.1-SNAPSHOT.jar" ]

