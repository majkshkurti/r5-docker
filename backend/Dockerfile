# See README.md for preparing pre-requises for this DOckerfile to run
# Usage:
#   docker build . --build-arg r5version=$VERSION

FROM openjdk:11

ARG r5version
# Check that r5version arg have been provided
RUN test -n $r5version

EXPOSE 7070
ENV JVM_HEAP_GB=2

WORKDIR /r5
COPY build/libs/r5-$r5version-all.jar .
COPY analysis.properties.docker analysis.properties

## Add wait tool, to wait for Mongo to be up
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

CMD /wait && java -Xmx${JVM_HEAP_GB}g -cp r5-$r5version-all.jar com.conveyal.analysis.BackendMain
