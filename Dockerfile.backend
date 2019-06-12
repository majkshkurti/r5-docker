FROM openjdk:8
WORKDIR /app
COPY target/analysis.jar analysis.properties ./
EXPOSE 7070

# ## Compile and initialize DB
# RUN npx mvn package

## Add wait tool, to wait for Mongo to be up
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

## Wait for Mongo to be up and lunch backend
CMD /wait && java -Xmx2g -jar analysis.jar
