#!/bin/sh
mvnw clean install -DSkipTests
docker rmi $(docker images | grep 'target/time-sheet')
docker build . -t time-sheet:$1
# docker push asia.gcr.io/krungthai-nhso-dev/nhso-claim:$1

docker run -d --name time-sheet -p 8091:8091 time-sheet:1.0