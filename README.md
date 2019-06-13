## Run the image

- clone this repo
- cd [the dir where you just clonse this repo]
- `docker-compose up`
- navigate to `http://localhost:9966/`

## Make the images

    cd analysis-ui
    docker build -f ../analysis-docker/Dockerfile.ui -t analysis-ui .
    cd ../
    # to be continued ...
