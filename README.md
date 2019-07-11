# conveyal-analysis-docker

Quick and easy install of Conveyal Analysis on any modern operating system, using Docker.

## Presentation

[Conveyal Analysis](https://www.conveyal.com/analysis/) is a tool used to make public transport scenarios and evaluate them in terms of accessibility, using [OpenStreetMap](http://openstreetmap.org/) data and [GTFS datasets](https://git.digitaltransport4africa.org/data).

[Docker](docker.com) is a tool to run a program in a self-contained container which will work on any operating system.

This "dockerisation" of Conveyal Analysis was made possible by [Jailbreak](http://jailbreak.paris/) as part of the [Digital Transport for Africa project](http://digitaltransport4africa.org/) funded by [Agence française de développement](https://www.afd.fr/).

## Run on your system

👉 _See [the complete installation guide](/INSTALL.md)_ 

Quickstart:

```
git clone https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker.git
cd conveyal-analysis-docker
docker-compose up
```
Then navigate to [http://localhost:9966/](http://localhost:9966/)

## Build images

This repo contains the Dockerfiles of [Conveyal Analysis](https://www.conveyal.com/analysis/), which is composed of two parts:
- a [backend](https://github.com/conveyal/analysis-backend)
- a [UI](https://github.com/conveyal/analysis-ui)

Docker images are hosted on Docker Hub:
- [`analysis-ui`](https://cloud.docker.com/u/jailbreakparis/repository/docker/jailbreakparis/analysis-ui)
- [`analysis-backend`](https://cloud.docker.com/u/jailbreakparis/repository/docker/jailbreakparis/analysis-backend)

The following guide is to create new images, typically when a new version of the software is available:

1. Clone the repos
```
git clone https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker.git
git clone https://github.com/conveyal/analysis-backend
git clone https://github.com/conveyal/analysis-ui
```
2. Rebuild backend image
```
cd analysis-backend
git reset --hard <version>  # replace <version> by something like v5.4.0
rm -f target/*.jar
```
3. Start a Mongo server then
```
mvn package  # this will generate target/analisys.jar file
docker build -f ../analysis-docker/backend/Dockerfile -t analysis-backend .
cd ../
```
4. Rebuild UI image
```
cd analysis-ui
git reset --hard <version>  # replace <version> by something like v4.7.0
docker build -f ../analysis-docker/ui/Dockerfile -t analysis-ui .
cd ../
```
5. Run the stack. You probably need to adapt
images tags to use local ones
```
cd conveyal-analysis-docker
docker-compose up
```
