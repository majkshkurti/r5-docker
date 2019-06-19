# Conveyal analysis Dockerisation

This repo contains the dockerisation of [Conveyal analysis](https://www.conveyal.com/analysis/) software. This software is composed of two parts:

- a [backend](https://github.com/conveyal/analysis-backend)
- a [UI](https://github.com/conveyal/analysis-ui)

## Run the stack

- clone this repo
- cd [the dir where you just clonse this repo]
- `docker-compose up`
- navigate to `http://localhost:9966/`

## Make the images

This is only needed to update backend and UI images; typically when a new version of the software is available.

    # Clone repos, if needed
    git clone [this repo]
    git clone https://github.com/conveyal/analysis-backend
    git clone https://github.com/conveyal/analysis-ui
    # Rebuild backend image
    cd analysis-backend
    git reset --hard <version>  # replace <version> by something like v5.4.0
    docker build -f ../analysis-docker/backend/Dockerfile -t analysis-backend .
    cd ../
    # Rebuild UI image
    cd analysis-ui
    git reset --hard <version>  # replace <version> by something like v4.7.0
    docker build -f ../analysis-docker/ui/Dockerfile -t analysis-ui .
    cd ../
    # Run the stack. You probably need to adapt images tags to use local ones
    cd analysis-docker
    docker-compose up
