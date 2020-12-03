# conveyal-analysis-docker

Quick and easy install of Conveyal Analysis on any modern operating system, using Docker.

**Repository**: [git.digitaltransport4africa.org/commons/conveyal-analysis-docker](https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker)
**Documentation**: [commons.digitaltransport.io/conveyal-analysis-docker/](http://commons.digitaltransport.io/conveyal-analysis-docker/)

## Presentation

[Conveyal Analysis](https://www.conveyal.com/analysis/) is a tool used to make public transport scenarios and evaluate them in terms of accessibility, using [OpenStreetMap](http://openstreetmap.org/) data and [GTFS datasets](https://git.digitaltransport4africa.org/data).

[Docker](docker.com) is a tool to run a program in a self-contained container which will work on any operating system.

This "dockerisation" of Conveyal Analysis was initiated in 2018 by [Jailbreak](http://jailbreak.paris/) as part of the [Digital Transport for Africa project](http://digitaltransport4africa.org/) funded by [Agence française de développement](https://www.afd.fr/) in partnership with [Fabrique des mobilités](http://lafabriquedesmobilites.fr/). In November 2020, an upgrade was made possible with financial support by [ADEUS](http://www.adeus.org/).

Thanks to Conveyal for creating and maintaining this great piece of software!

## Run on your system

👉 _See [the complete installation guide](/INSTALL.md)_

Quickstart:

```
git clone https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker.git
cd conveyal-analysis-docker
docker-compose up
```
Then navigate to [http://localhost:3000/](http://localhost:3000/)

## Build images (⚠ only for developers)

This repo contains the Dockerfiles of [Conveyal Analysis](https://www.conveyal.com/analysis/), which is composed of two parts:
- [R5](https://github.com/conveyal/r5): a routing engine which acts as the backend
- [Analysis UI](https://github.com/conveyal/analysis-ui): the user interface

Docker images built by Jailbreak are hosted on Docker Hub:
- [`R5`](https://hub.docker.com/r/jailbreakparis/r5) (the backend)
- [`Analysis-ui`](https://hub.docker.com/r/jailbreakparis/analysis-ui) (the ui)

The following guide is to create new images, typically when a new version of the software is available, or if you want to use a custom Mapbox API key (API key not read at runtime, but added in the UI code at build time).

Note that you can independently build backend or ui, you do not need to build both (if local image doesn't exists, `docker-compose` will pull and use image from dockerhub)

### 1. Clone the repo

```
git clone --depth=1 https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker.git
```

### 2. Build the R5 image

### 2.1. CLone R5 source code

Image creation have done tested with R5 v6.0.0-19-g6a985e9

```
git clone --depth=1 https://github.com/conveyal/r5
```

#### 2.2. Get a fresh version of Gradle

(6.7.1 in this example, but you may adapt)

```
wget https://services.gradle.org/distributions/gradle-6.7.1-bin.zip
unzip gradle-6.7.1-bin.zip
rm -f gradle-6.7.1-bin.zip
```

#### 2.3 Use gradle to build R5

```
cd r5
ln -s ../gradle-6.7.1/bin/gradle .
cp analysis.properties.docker analysis.properties
```

#### 2.4 Build R5 jar image

```
./gradle shadowJar # this will generate build/libs/r5-[version_number].jar file
ln -s build/libs/r5-*.jar r5.jar
```

#### 2.5 Build Docker R5 image

```
# Determine the current R5 version
VERSION=$(cat build/version.txt)
# Build Docker image
docker build -f ../conveyal-analysis-docker/backend/Dockerfile -t jailbreakparis/r5:${VERSION%.dirty} --build-arg r5version=$VERSION .
# Tag this image as "latest"
docker tag jailbreakparis/r5:${VERSION%.dirty} jailbreakparis/r5:latest
```

### 4. Build the Analysis UI image

This process needs approx 5GB of free space and have been tested with the [version 3071865ccf01 of analysis-ui](https://github.com/conveyal/analysis-ui/commit/3071865ccf01e1b03011fb3b7a7c2afa81e461ca) (Nov 4, 2020). (that particular commit version is hardcoded in ui/Dockerfile).

Before building the ui, you can change `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` value in `ui/.env` file to use a custom Mapbox token. For the moment this needs to be done before building the image.

To build the analysis-ui using the same version used by Jailbreak to build `jailbreakparis/analysis-ui` image, just run:

```
./build-ui.sh
```

To change the version of analysis-ui used, add `--build-arg COMMIT_SHA=xxxxxxxxx` to the build command used in `build-ui.sh` script (or edit `ui/Dockerfile`).

### 5. Run the stack

```
cd conveyal-analysis-docker
docker-compose up
```

The app is then available at `http://localhost:3000`

#### Optional: save disk space

You can potentially same a lot of disk space by removing temporary Docker images used to build (but not needed anymore now that images are built):

```
docker system prune --force
```
