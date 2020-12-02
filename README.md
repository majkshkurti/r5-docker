# conveyal-analysis-docker

Quick and easy install of Conveyal Analysis on any modern operating system, using Docker.

**Repository**: [git.digitaltransport4africa.org/commons/conveyal-analysis-docker](https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker)  
**Documentation**: [commons.digitaltransport.io/conveyal-analysis-docker/](http://commons.digitaltransport.io/conveyal-analysis-docker/)

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
Then navigate to [http://localhost:3000/](http://localhost:3000/)

## Build images (⚠ only for developers)

This repo contains the Dockerfiles of [Conveyal Analysis](https://www.conveyal.com/analysis/), which is composed of two parts:
- [R5](https://github.com/conveyal/r5): a routing engine which acts as the backend
- [Analysis UI](https://github.com/conveyal/analysis-ui): the user interface

Docker images built by Jailbreak are hosted on Docker Hub:
- [`r5`](https://hub.docker.com/r/jailbreakparis/r5)
- [`analysis-ui`](https://hub.docker.com/r/jailbreakparis/analysis-ui)

The following guide is to create new images, typically when a new version of the software is available:

### 1. Clone the repos

```
git clone https://github.com/conveyal/r5
git clone https://github.com/conveyal/analysis-ui
git clone https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker.git
```

### 2. Build the R5 image

#### 2.1. Get a fresh version of Gradle

(6.7.1 in this example, but you may adapt)

```
wget https://services.gradle.org/distributions/gradle-6.7.1-bin.zip
unzip gradle-6.7.1-bin.zip
```

#### 2.2 Use gradle to build r5

```
cd r5
ln -s ../gradle/gradle-6.7.1/bin/gradle .
cp analysis.properties.docker analysis.properties
```

#### 2.3 Build r5 jar image

```
./gradle shadowJar # this will generate build/libs/r5-[version_number].jar file
ln -s build/libs/r5-*.jar r5.jar
```

#### 2.4 Build Docker r5 image

```
# Determine the current r5 version
VERSION=$(cat build/version.txt)
# Build Docker image
docker build -f ../conveyal-analysis-docker/backend/Dockerfile -t analysis-backend:${VERSION%.dirty} --build-arg r5version=$VERSION .
# Tag this image as "latest"
docker tag analysis-backend:${VERSION%.dirty} jailbreakparis/analysis-backend:latest
```

### 4. Build the Analysis UI image

This process needs approx 5GB of free space and have been tested with the [version 3071865ccf01 of analysis-ui](https://github.com/conveyal/analysis-ui/commit/3071865ccf01e1b03011fb3b7a7c2afa81e461ca) (Nov 4, 2020). If you encounter problems, reset to this particular commit: `git reset --hard 3071865ccf01`.

```
cd [the directory where you cloned all the repos, ie the directory at step 1]
cp conveyal-analysis-docker/ui/.env analysis-ui/
cd analysis-ui
# If you want to customize the Mapbox API token you can edit the .env file and set NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN
# in that case you'll also need to remove the line that sets this variable in ../conveyal-analysis-docker/ui/Dockerfile
docker build -f ../conveyal-analysis-docker/ui/Dockerfile -t analysis-ui:latest .
cd ../
```

### 5. Run the stack

You'll probably need to adapt images tags to use local ones.

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
