FROM openjdk:8-jdk-alpine

ARG JAR_FILE=./target/time-sheet-0.0.1-SNAPSHOT.jar

VOLUME /tmp

RUN mkdir -p /home

COPY Bangkok /etc/localtime
RUN echo Asia/Bangkok > /etc/timezone

ADD ${JAR_FILE} /home/app.jar

WORKDIR /home

EXPOSE 8091
ENTRYPOINT exec java -jar -Xms128m -Xmx256m -Dlogback.timezone=Asia/Bangkok  /home/app.jar