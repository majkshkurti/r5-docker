# conveyal-analysis-docker

Quick and easy install of Conveyal Analysis on any modern operating system, using Docker.

**Documentation**: [commons.digitaltransport.io/conveyal-analysis-docker/](http://commons.digitaltransport.io/conveyal-analysis-docke:latestr/)

## Presentation
npm run build:latest

[Docker](docker.com) is a tool to run a program in a self-contained container which will work on any operating system.

This "dockerisation" of Conveyal Analysis was made possible by [Jailbreak](http://jailbreak.paris/) as part of the [Digital Transport for Africa project](http://digitaltransport4africa.org/) funded by [Agence française de développement](https://www.afd.fr/).

## Run on your system

👉 _See [the complete installation guide](/INSTALL.md)_

Quickstart:

```
cd conveyal-analysis:latest-docker
docker-compose up
```
Then navigate to [http://localhost:9966/](http://localhost:9966/)

## Build images (⚠ only for developers)

This repo contains the Dockerfiles of [Conveyal Analysis](https://www.conveyal.com/analysis/), which is composed of two parts:
- a [backend](https://github.com/conveyal/analysis-backend)
- a [UI](https://github.com/conveyal/analysis-ui)

Docker images are hosted on Docker Hub:
- [`analysis-ui`](https://hub.docker.com/r/jailbreakparis/analysis-ui)
- [`analysis-backend`](https://hub.docker.com/r/jailbreakparis/analysis-backend)

The following guide is to create new images, typically when a new version of the software is available:

### 1. Clone the repos

```
git clone https://github.com/conveyal/r5
git clone https://github.com/conveyal/analysis-ui
git clone https://git.digitaltransport4africa.org/commons/conveyal-analysis-docker.git
```

### 2. Build backend (r5) image

#### 2.1. Get fresh Gradle version

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
./gradle shadowJar   # this will generate build/libs/r5-[version_number].jar file
ln -s build/libs/r5-*.jar r5.jar
```

#### 2.4 Build Docker r5 image

```
# Determine current r5 version
VERSION=$(cat build/version.txt)
# Build Docker image
docker build -f ../conveyal-analysis-docker/backend/Dockerfile -t analysis-backend:${VERSION%.dirty} --build-arg r5version=$VERSION .
# Tag this image as "latest"
docker tag analysis-backend:${VERSION%.dirty} analysis-backend:latest
```

### 4. Build UI image
```
cd analysis-ui
docker build -f ../conveyal-analysis-docker/ui/Dockerfile -t analysis-ui:latest .
cd ../
```

### 5. Run the stack

You'll probably need to adapt images tags to use local ones

```
cd conveyal-analysis-docker
docker-compose up
```
