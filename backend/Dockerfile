# See README.md for preparing pre-requises for this DOckerfile to run
# Usage:
#   docker build . --build-arg r5version=$VERSION

# FROM openjdk:11-slim
FROM openjdk:11

ARG r5version
# Check that r5version arg have been provided
RUN test -n $r5version


WORKDIR /r5
# Add wait tool, to wait for Mongo to be up
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

COPY r5.jar .
COPY analysis.properties.docker analysis.properties

# Assert that file to run actually exists (as java won't explicitly ecpress the error)
RUN test -e r5.jar
EXPOSE 7070
ENV JVM_HEAP_GB=2
CMD /wait && java -Xmx${JVM_HEAP_GB}g -cp r5.jar com.conveyal.analysis.BackendMain
